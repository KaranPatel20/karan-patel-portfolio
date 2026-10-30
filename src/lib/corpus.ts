import {
  aboutText,
  certifications,
  education,
  groups,
  projects,
  roles,
  site,
} from "@/data/portfolio";
import { resumeText } from "@/data/resume";

// Plain-text corpus the assistant answers from. Built from the same data module the page renders,
// so the two cannot drift apart. The content is small, so the whole thing goes into every prompt:
// this is context stuffing, not retrieval. Only content that is already public on the site or the
// resume goes in. No phone number and no street address.
let cached: string | null = null;

export function buildCorpus(): string {
  if (cached) return cached;

  const out: string[] = [];

  out.push(
    "## Profile",
    `${site.name}, ${site.title}. Based in ${site.location}.`,
    `Email: ${site.email}`,
    `LinkedIn: ${site.links.linkedin}`,
    `GitHub: ${site.links.github}`,
    `Medium: ${site.links.medium}`,
    "",
    "## About",
    aboutText,
    "",
    "## Experience",
  );
  for (const role of roles) {
    out.push(`- ${role.title}, ${role.company} (${role.period})`);
    if (role.note) out.push(`  Note: ${role.note}`);
    for (const bullet of role.bullets) out.push(`  * ${bullet}`);
  }

  out.push("", "## Projects");
  for (const project of projects) {
    out.push(`- ${project.name} (${project.period}; ${project.tag})`, `  Stack: ${project.stack}`);
    for (const point of project.points) out.push(`  * ${point}`);
    if (project.links?.length) {
      out.push(`  Links: ${project.links.map((l) => `${l.label} ${l.href}`).join("; ")}`);
    }
  }

  out.push("", "## Skills");
  for (const group of groups) out.push(`- ${group.title}: ${group.items.join(", ")}`);

  out.push("", "## Education");
  for (const entry of education) {
    out.push(`- ${entry.degree}, ${entry.school} (${entry.period}; ${entry.detail})`);
  }

  out.push("", "## Certifications");
  for (const cert of certifications) {
    out.push(`- ${cert.name}, ${cert.issuer} (${cert.date}) ${cert.href}`);
  }

  out.push(
    "",
    "## Resume (supplementary)",
    "The text below is from an older PDF resume. The website content above is authoritative: if the",
    "resume disagrees with the website (titles, dates, numbers, links), use the website's version.",
    "",
    resumeText,
  );

  cached = out.join("\n");
  return cached;
}

// ---------------------------------------------------------------------------------------------
// Retrieval mode (n8n AI agent + vector store). Same data, different shapes:
//   buildProfile(): a short always-in-prompt summary (about 1.5K characters).
//   buildChunks():  small self-contained pieces for the vector store, each starting with its own
//                   title so it still makes sense when retrieved alone.
// ---------------------------------------------------------------------------------------------

export type Chunk = { id: string; type: string; title: string; text: string };

const MAX_CHUNK_CHARS = 800;

let cachedProfile: string | null = null;

export function buildProfile(): string {
  if (cachedProfile) return cachedProfile;
  const lines: string[] = [
    `${site.name}, ${site.title}. Based in ${site.location}.`,
    `Email: ${site.email}`,
    `LinkedIn: ${site.links.linkedin}  GitHub: ${site.links.github}  Medium: ${site.links.medium}`,
    "",
    "Roles:",
    ...roles.map((r) => `- ${r.title}, ${r.company} (${r.period})`),
    "",
    "Projects:",
    ...projects.map((p) => `- ${p.name} (${p.period}). Stack: ${p.stack}`),
    "",
    `Skill areas: ${groups.map((g) => g.title).join("; ")}.`,
    "",
    "Education:",
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`),
    "",
    `Certifications: ${certifications.length} (details come from the search tool).`,
  ];
  cachedProfile = lines.join("\n");
  return cachedProfile;
}

// Splits `lines` into chunks of at most MAX_CHUNK_CHARS, repeating `header` at the top of each so
// every chunk carries its own title.
function pack(id: string, type: string, title: string, header: string, lines: string[]): Chunk[] {
  const chunks: Chunk[] = [];
  let current: string[] = [];
  const size = () => header.length + current.join("\n").length + 1;
  const flush = () => {
    if (!current.length) return;
    const n = chunks.length + 1;
    chunks.push({
      id: `${id}-${n}`,
      type,
      title,
      text: `${header}\n${current.join("\n")}`,
    });
    current = [];
  };
  for (const line of lines) {
    if (current.length && size() + line.length + 1 > MAX_CHUNK_CHARS) flush();
    current.push(line);
  }
  flush();
  return chunks;
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

let cachedChunks: Chunk[] | null = null;

export function buildChunks(): Chunk[] {
  if (cachedChunks) return cachedChunks;
  const out: Chunk[] = [];

  out.push(
    ...pack("profile", "profile", "Profile and about", `Profile: ${site.name}, ${site.title}, ${site.location}.`, [
      `Email: ${site.email}`,
      `LinkedIn: ${site.links.linkedin}`,
      `GitHub: ${site.links.github}`,
      `Medium: ${site.links.medium}`,
      aboutText,
    ]),
  );

  for (const role of roles) {
    const title = `${role.title}, ${role.company}`;
    out.push(
      ...pack(`role-${slug(title)}`, "experience", title, `Experience: ${title} (${role.period}).`, [
        ...(role.note ? [`Note: ${role.note}`] : []),
        ...role.bullets.map((b) => `- ${b}`),
      ]),
    );
  }

  for (const project of projects) {
    out.push(
      ...pack(`project-${slug(project.name)}`, "project", project.name, `Project: ${project.name} (${project.period}; ${project.tag}). Stack: ${project.stack}.`, [
        ...project.points.map((p) => `- ${p}`),
        ...(project.links?.length ? [`Links: ${project.links.map((l) => `${l.label} ${l.href}`).join("; ")}`] : []),
      ]),
    );
  }

  for (const group of groups) {
    out.push(
      ...pack(`skills-${slug(group.title)}`, "skills", group.title, `Skills: ${group.title}.`, [group.items.join(", ")]),
    );
  }

  out.push(
    ...pack(
      "education",
      "education",
      "Education",
      "Education:",
      education.map((e) => `- ${e.degree}, ${e.school} (${e.period}; ${e.detail})`),
    ),
  );

  out.push(
    ...pack(
      "certifications",
      "certifications",
      "Certifications",
      "Certifications:",
      certifications.map((c) => `- ${c.name}, ${c.issuer} (${c.date})`),
    ),
  );

  // The older resume, split on blank lines. Labelled so the assistant knows the website wins.
  const blocks = resumeText.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  out.push(
    ...pack(
      "resume",
      "resume",
      "Older resume (supplementary)",
      "Older resume text (supplementary; the website content is authoritative if they disagree):",
      blocks,
    ),
  );

  cachedChunks = out;
  return out;
}
