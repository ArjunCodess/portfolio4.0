import "dotenv/config";

import fs from "fs";
import path from "path";

const USERNAME = "ArjunCodess";
const CACHE_TTL_HOURS = Number(process.env.PROJECTS_CACHE_TTL_HOURS ?? 24);
const FORCE_REFRESH = process.argv.includes("--refresh");
const CACHE_ONLY = process.argv.includes("--cache-only");
let authDisabled = false;

const REPOS_TO_FETCH = [
  "WebCrawlAI",
  "analyzr",
  "storyblok-mcp",
  "men2-predictor",
  "getpilot/app",
  "getpilot/website",
  "VendX-Admin",
  "VendX-Store",
  "typethelyrics",
  "starfall",
  "astroscope",
  "chemistrycheck",
  "algorithm_visualizer_pygame",
  "FlashReels",
  "tbh",
  "NGTA",
  "MINTS",
  "audion",
];

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

interface RepoDetails {
  name: string;
  full_name: string;
  description: string;
  url: string;
  homepage: string;
  stars: number;
  forks: number;
  topics: string[];
  languages: string[];
  readme: string;
}

interface CacheEntry {
  fetchedAt: string;
  data: RepoDetails | null;
  error?: string;
}

type ProjectsCache = Record<string, CacheEntry>;

const UNAUTHENTICATED_HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "Portfolio-Script",
};

const HEADERS: HeadersInit = {
  ...UNAUTHENTICATED_HEADERS,
};

if (GITHUB_TOKEN) {
  HEADERS.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

const cachePath = path.join(process.cwd(), ".cache", "github-projects.json");

function getFullName(repoName: string) {
  return repoName.includes("/") ? repoName : `${USERNAME}/${repoName}`;
}

function readCache(): ProjectsCache {
  if (!fs.existsSync(cachePath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(cachePath, "utf-8")) as ProjectsCache;
  } catch {
    console.warn("Could not read project cache. Starting with an empty cache.");
    return {};
  }
}

function writeCache(cache: ProjectsCache) {
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), "utf-8");
}

function isFresh(entry: CacheEntry) {
  const fetchedAt = new Date(entry.fetchedAt).getTime();
  const maxAgeMs = CACHE_TTL_HOURS * 60 * 60 * 1000;

  return Date.now() - fetchedAt < maxAgeMs;
}

function getRateLimitMessage(response: Response) {
  const remaining = response.headers.get("x-ratelimit-remaining");
  const reset = response.headers.get("x-ratelimit-reset");

  if (!remaining || !reset) {
    return `${response.status} ${response.statusText}`;
  }

  const resetAt = new Date(Number(reset) * 1000).toLocaleString();
  return `${response.status} ${response.statusText}; remaining=${remaining}; resets at ${resetAt}`;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  let response = await fetch(url, {
    headers: authDisabled ? UNAUTHENTICATED_HEADERS : HEADERS,
  });

  if (response.status === 401 && GITHUB_TOKEN && !authDisabled) {
    console.warn(
      "GitHub token was rejected. Disabling token auth for this run and retrying public requests unauthenticated.",
    );
    authDisabled = true;
    response = await fetch(url, { headers: UNAUTHENTICATED_HEADERS });
  }

  if (response.status === 403 || response.status === 429) {
    throw new Error(`GitHub rate limit hit: ${getRateLimitMessage(response)}`);
  }

  if (!response.ok) {
    console.warn(
      `Request failed: ${url} (${response.status} ${response.statusText})`,
    );
    return null;
  }

  return (await response.json()) as T;
}

async function getRepoDetails(repoName: string): Promise<RepoDetails | null> {
  const fullName = getFullName(repoName);

  console.log(`Fetching ${fullName}...`);

  type RepoResponse = {
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    topics?: string[];
    languages_url: string;
  };

  type ReadmeResponse = {
    content: string;
  };

  const data = await fetchJson<RepoResponse>(
    `https://api.github.com/repos/${fullName}`,
  );

  if (!data) {
    return null;
  }

  const languagesData = await fetchJson<Record<string, number>>(
    data.languages_url,
  );
  const topLangs = Object.keys(languagesData ?? {}).slice(0, 3);

  let readmeContent = "";
  const readmeData = await fetchJson<ReadmeResponse>(
    `https://api.github.com/repos/${fullName}/readme`,
  );

  if (readmeData?.content) {
    readmeContent = Buffer.from(readmeData.content, "base64").toString("utf-8");
  } else {
    console.warn(`No README found for ${fullName}`);
  }

  return {
    name: data.name,
    full_name: data.full_name,
    description: data.description || "No description provided.",
    url: data.html_url,
    homepage: data.homepage || "",
    stars: data.stargazers_count,
    forks: data.forks_count,
    topics: data.topics || [],
    languages: topLangs,
    readme: readmeContent,
  };
}

function generateMarkdown(projects: RepoDetails[]): string {
  let mdOutput = `# ${USERNAME} Projects Knowledge Base\n\n`;
  mdOutput += `> Auto-generated from GitHub API on ${new Date().toDateString()}. Use this file to train the RAG model.\n\n`;

  projects.forEach((p) => {
    mdOutput += `## Project: ${p.name}\n\n`;
    mdOutput += `**Description:** ${p.description}\n\n`;
    mdOutput += `**Key Stats:** ${p.stars} Stars | ${p.forks} Forks\n`;
    mdOutput += `**Tech Stack:** ${p.languages.join(", ")}\n`;

    if (p.homepage) {
      mdOutput += `**Live Demo:** ${p.homepage}\n`;
    }

    mdOutput += `**Repository:** ${p.url}\n`;

    if (p.topics.length > 0) {
      mdOutput += `**Topics:** ${p.topics.join(", ")}\n\n`;
    } else {
      mdOutput += `\n`;
    }

    mdOutput += `### README Content\n`;
    mdOutput += "```markdown\n";
    mdOutput += p.readme;
    mdOutput += "\n```\n\n";
    mdOutput += "---\n\n";
  });

  return mdOutput;
}

async function main() {
  const cache = readCache();
  const projectsData: RepoDetails[] = [];
  const missingRepos: string[] = [];
  let blockedByRateLimit = false;

  if (!GITHUB_TOKEN) {
    console.warn(
      "GITHUB_TOKEN is not set. Unauthenticated GitHub API calls are limited to 60/hour.",
    );
  }

  for (const repo of REPOS_TO_FETCH) {
    const fullName = getFullName(repo);
    const cached = cache[fullName];

    if (cached && !FORCE_REFRESH && (CACHE_ONLY || isFresh(cached))) {
      if (cached.data) {
        console.log(`Using cached ${fullName}`);
        projectsData.push(cached.data);
      } else {
        console.log(`Using cached miss for ${fullName}`);
      }
      continue;
    }

    if (CACHE_ONLY) {
      console.warn(`Skipping ${fullName}; no cached data available.`);
      continue;
    }

    try {
      const details = await getRepoDetails(repo);

      if (details) {
        cache[fullName] = {
          fetchedAt: new Date().toISOString(),
          data: details,
        };
        projectsData.push(details);
      } else if (cached?.data) {
        console.warn(`Using stale cache for ${fullName}`);
        projectsData.push(cached.data);
      } else {
        cache[fullName] = {
          fetchedAt: new Date().toISOString(),
          data: null,
          error: "Repository metadata unavailable",
        };
        missingRepos.push(fullName);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : `Failed to fetch ${fullName}: ${String(error)}`;

      if (message.includes("rate limit")) {
        blockedByRateLimit = true;
      }

      console.error(
        error instanceof Error
          ? error.message
          : `Failed to fetch ${fullName}: ${String(error)}`,
      );

      if (cached?.data) {
        console.warn(`Using stale cache for ${fullName}`);
        projectsData.push(cached.data);
      } else {
        console.warn(`No cache available for ${fullName}; skipping.`);
        missingRepos.push(fullName);
      }
    }
  }

  writeCache(cache);

  if (projectsData.length === 0) {
    console.error(
      "No project data available. Leaving src/data/rag/projects.md unchanged.",
    );
    process.exitCode = 1;
    return;
  }

  if (blockedByRateLimit && missingRepos.length > 0) {
    console.error(
      `GitHub rate limiting prevented ${missingRepos.length} uncached repos from being fetched: ${missingRepos.join(", ")}`,
    );
    console.error("Leaving src/data/rag/projects.md unchanged.");
    process.exitCode = 1;
    return;
  }

  const ragDir = path.join(process.cwd(), "src/data/rag");
  if (!fs.existsSync(ragDir)) {
    fs.mkdirSync(ragDir, { recursive: true });
  }

  const outputPath = path.join(ragDir, "projects.md");
  fs.writeFileSync(outputPath, generateMarkdown(projectsData), "utf-8");

  console.log(`\nDone. Data saved to '${outputPath}'`);
  console.log(`Cache saved to '${cachePath}'`);
}

main();
