import IntroExperience from "@/components/intro/IntroExperience";
import SectionsScaffold from "@/components/sections";

export default function Home() {
  return (
    <main>
      {/* Fixed living scene: intro → hero → first-scroll transition */}
      <IntroExperience />

      {/* Scroll runway: drives the cinematic transition (150vh) and lands
          on the bracket-framed stage (100vh) where sections will live */}
      <div className="scroll-space" aria-hidden />

      {/* Structure reserved for upcoming sections — no content yet */}
      <SectionsScaffold />
    </main>
  );
}
