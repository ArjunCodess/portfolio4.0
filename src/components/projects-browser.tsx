"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const BLUR_FADE_DELAY = 0.04;

function toggleSelection(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function ProjectsBrowser() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = useMemo(
    () => Array.from(new Set(DATA.projects.map((project) => project.category))),
    [],
  );

  const hasFilters = selectedCategories.length > 0;

  const visibleProjects = useMemo(() => {
    if (!hasFilters) {
      return DATA.projects;
    }

    return DATA.projects.filter((project) =>
      selectedCategories.includes(project.category),
    );
  }, [hasFilters, selectedCategories]);

  return (
    <div className="mx-auto max-w-[800px] space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Categories</h2>
            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategories([])}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => {
              const selected = selectedCategories.includes(category);

              return (
                <Button
                  key={category}
                  type="button"
                  size="sm"
                  variant={selected ? "default" : "outline"}
                  className={cn(
                    "h-7 rounded-md px-2 text-xs",
                    selected ? "" : "bg-background",
                  )}
                  onClick={() =>
                    setSelectedCategories((current) =>
                      toggleSelection(current, category),
                    )
                  }
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {visibleProjects.length} of {DATA.projects.length} projects
      </p>

      {visibleProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {visibleProjects.map((project, id) => {
            const isLastOdd =
              visibleProjects.length % 2 === 1 &&
              id === visibleProjects.length - 1;

            return (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                className={
                  isLastOdd
                    ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%_-_0.375rem)]"
                    : ""
                }
              >
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={"image" in project ? project.image : undefined}
                  links={project.links}
                />
              </BlurFade>
            );
          })}
        </div>
      ) : (
        <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          No projects match the selected filters.
        </div>
      )}
    </div>
  );
}
