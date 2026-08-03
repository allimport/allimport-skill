#!/usr/bin/env node
// Genera un clip sintético con tramos de audio (tonos) separados por silencios
// de duración conocida, para poder probar cut-silence.mjs sin necesitar
// material real. Un silencio queda deliberadamente por debajo del umbral
// mínimo (0.3s < 0.5s por defecto) para verificar que NO se corta.
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const OUT = process.argv[2] || path.join("samples", "test-fixture.mp4");
mkdirSync(path.dirname(OUT), { recursive: true });
const tmp = path.join(os.tmpdir(), "cut-silence-fixture");
mkdirSync(tmp, { recursive: true });

function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr);
    throw new Error(`Fallo: ${cmd} ${args.join(" ")}`);
  }
}

// Segmentos: tono(2s) - silencio(1.2s) - tono(2s) - silencio(0.3s, corto a propósito) - tono(2s)
const totalDuration = 2 + 1.2 + 2 + 0.3 + 2;
const audioPath = path.join(tmp, "audio.wav");
const videoPath = path.join(tmp, "video.mp4");

run("ffmpeg", [
  "-y",
  "-f", "lavfi", "-i", "sine=frequency=440:duration=2",
  "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono:d=1.2",
  "-f", "lavfi", "-i", "sine=frequency=880:duration=2",
  "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono:d=0.3",
  "-f", "lavfi", "-i", "sine=frequency=1320:duration=2",
  "-filter_complex", "[0][1][2][3][4]concat=n=5:v=0:a=1[aout]",
  "-map", "[aout]",
  audioPath,
]);

run("ffmpeg", [
  "-y",
  "-f", "lavfi",
  "-i", `testsrc=size=640x360:rate=30:duration=${totalDuration}`,
  "-pix_fmt", "yuv420p",
  "-c:v", "libx264",
  videoPath,
]);

run("ffmpeg", [
  "-y",
  "-i", videoPath,
  "-i", audioPath,
  "-c:v", "copy",
  "-c:a", "aac",
  "-shortest",
  OUT,
]);

console.log(`Fixture generado en ${OUT} (${totalDuration.toFixed(1)}s: tono 2s / silencio 1.2s / tono 2s / silencio 0.3s / tono 2s).`);
console.log("El silencio de 0.3s es intencionalmente corto: con --min-silence 0.5 (default) NO debe cortarse.");
