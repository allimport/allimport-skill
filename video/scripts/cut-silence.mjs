#!/usr/bin/env node
// Detecta y elimina silencios de un archivo de video/audio manteniendo
// video y audio sincronizados (un único filter_complex, sin pipelines separados).
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const args = { threshold: -30, minSilence: 0.5, padding: 0.15 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" || a === "-i") args.input = argv[++i];
    else if (a === "--output" || a === "-o") args.output = argv[++i];
    else if (a === "--threshold") args.threshold = Number(argv[++i]);
    else if (a === "--min-silence") args.minSilence = Number(argv[++i]);
    else if (a === "--padding") args.padding = Number(argv[++i]);
    else if (!args.input && !a.startsWith("-")) args.input = a;
  }
  return args;
}

function run(cmd, cmdArgs) {
  const result = spawnSync(cmd, cmdArgs, { encoding: "utf8", maxBuffer: 1024 * 1024 * 64 });
  if (result.error) throw result.error;
  return result;
}

function requireTool(name) {
  const check = spawnSync(name, ["-version"]);
  if (check.error) {
    console.error(`Falta "${name}" en el PATH. Instalalo (ej. apt-get install ffmpeg) y reintentá.`);
    process.exit(1);
  }
}

function getDuration(input) {
  const r = run("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "csv=p=0",
    input,
  ]);
  return parseFloat(r.stdout.trim());
}

function hasVideoStream(input) {
  const r = run("ffprobe", [
    "-v", "error",
    "-select_streams", "v",
    "-show_entries", "stream=index",
    "-of", "csv=p=0",
    input,
  ]);
  return r.stdout.trim().length > 0;
}

function detectSilence(input, threshold, minSilence) {
  const r = run("ffmpeg", [
    "-i", input,
    "-af", `silencedetect=noise=${threshold}dB:d=${minSilence}`,
    "-f", "null",
    "-",
  ]);
  const log = r.stderr;
  const starts = [...log.matchAll(/silence_start:\s*(-?\d+\.?\d*)/g)].map((m) => parseFloat(m[1]));
  const ends = [...log.matchAll(/silence_end:\s*(-?\d+\.?\d*)/g)].map((m) => parseFloat(m[1]));
  const intervals = starts.map((start, i) => ({
    start,
    end: ends[i] !== undefined ? ends[i] : null, // null = silencio corre hasta EOF
  }));
  return intervals;
}

function computeKeepSegments(silences, duration, padding) {
  // Encoge cada tramo de silencio por `padding` en ambos extremos para no
  // comerse el arranque/final de la palabra pegada al silencio.
  const shrunk = silences
    .map(({ start, end }) => {
      const e = end === null ? duration : end;
      const s2 = start + padding;
      const e2 = e - padding;
      return s2 < e2 ? { start: s2, end: e2 } : null;
    })
    .filter(Boolean);

  const keep = [];
  let cursor = 0;
  for (const { start, end } of shrunk) {
    if (start > cursor) keep.push({ start: cursor, end: start });
    cursor = Math.max(cursor, end);
  }
  if (cursor < duration) keep.push({ start: cursor, end: duration });
  return keep.filter((seg) => seg.end - seg.start > 0.01);
}

function buildFilterComplex(keepSegments, withVideo) {
  const parts = [];
  const labels = [];
  keepSegments.forEach((seg, i) => {
    if (withVideo) {
      parts.push(`[0:v]trim=start=${seg.start}:end=${seg.end},setpts=PTS-STARTPTS[v${i}]`);
    }
    parts.push(`[0:a]atrim=start=${seg.start}:end=${seg.end},asetpts=PTS-STARTPTS[a${i}]`);
    labels.push(withVideo ? `[v${i}][a${i}]` : `[a${i}]`);
  });
  const n = keepSegments.length;
  const outLabels = withVideo ? "[outv][outa]" : "[outa]";
  parts.push(`${labels.join("")}concat=n=${n}:v=${withVideo ? 1 : 0}:a=1${outLabels}`);
  return parts.join(";");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) {
    console.error(
      "Uso: node cut-silence.mjs --input <archivo> [--output <archivo>] " +
        "[--threshold -30] [--min-silence 0.5] [--padding 0.15]"
    );
    process.exit(1);
  }
  if (!existsSync(args.input)) {
    console.error(`No existe el archivo de entrada: ${args.input}`);
    process.exit(1);
  }

  requireTool("ffmpeg");
  requireTool("ffprobe");

  const withVideo = hasVideoStream(args.input);
  const duration = getDuration(args.input);
  const ext = withVideo ? path.extname(args.input) || ".mp4" : path.extname(args.input) || ".m4a";
  const base = path.basename(args.input, path.extname(args.input));
  const output = args.output || path.join("out", `${base}-cut${ext}`);
  mkdirSync(path.dirname(output), { recursive: true });

  console.log(
    `Analizando "${args.input}" (${duration.toFixed(2)}s, ${withVideo ? "video+audio" : "solo audio"}) ` +
      `umbral=${args.threshold}dB min-silencio=${args.minSilence}s padding=${args.padding}s`
  );

  const silences = detectSilence(args.input, args.threshold, args.minSilence);
  if (silences.length === 0) {
    console.log("No se detectaron silencios por encima del umbral configurado. Copiando el archivo tal cual.");
    run("ffmpeg", ["-y", "-i", args.input, "-c", "copy", output]);
    console.log(`Listo: ${output}`);
    return;
  }

  const keep = computeKeepSegments(silences, duration, args.padding);
  const filterComplex = buildFilterComplex(keep, withVideo);

  const ffmpegArgs = ["-y", "-i", args.input, "-filter_complex", filterComplex];
  if (withVideo) {
    ffmpegArgs.push("-map", "[outv]", "-map", "[outa]", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18");
  } else {
    ffmpegArgs.push("-map", "[outa]");
  }
  ffmpegArgs.push("-c:a", "aac", "-b:a", "192k", output);

  const result = run("ffmpeg", ffmpegArgs);
  if (result.status !== 0) {
    console.error(result.stderr);
    console.error("ffmpeg falló al renderizar el corte final.");
    process.exit(1);
  }

  const keptDuration = keep.reduce((acc, s) => acc + (s.end - s.start), 0);
  const removed = duration - keptDuration;
  console.log(
    `Cortes aplicados: ${silences.length}. Tiempo removido: ${removed.toFixed(2)}s ` +
      `de ${duration.toFixed(2)}s (${((removed / duration) * 100).toFixed(1)}%).`
  );
  console.log(`Listo: ${output}`);
}

main();
