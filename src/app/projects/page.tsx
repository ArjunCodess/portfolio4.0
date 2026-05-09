import { SectionHeader } from "@/components/section-header";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { ProjectsBrowser } from "../../components/projects-browser";

const BLUR_FADE_DELAY = 0.04;

export const metadata: Metadata = {
  title: "Projects",
  description: `All projects by ${DATA.name}, including research, AI/ML, web, data science, developer tools, and games.`,
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10">
      <section id="projects">
        <div className="w-full space-y-8 py-8">
          <SectionHeader
            badge="Projects"
            title="Everything I've Built"
            description="A browsable archive of my research, AI/ML work, web apps, data projects, tools, and games."
            delay={BLUR_FADE_DELAY}
          />
          <ProjectsBrowser />
        </div>
      </section>
    </main>
  );
}
