import type { PageId } from "./sections";

export type ToolkitTool = {
  id: string;
  name: string;
  summary: string;
  examples: { title: string; detail: string; page?: PageId }[];
  destination?: PageId;
  linkLabel?: string;
};

export const toolkitTools: ToolkitTool[] = [
  {
    id: "java", name: "Java", summary: "A foundation in programming, built through coursework.",
    examples: [
      { title: "AP Computer Science A", detail: "Learning Java through school coursework.", page: "academic" },
      { title: "Clinic information system", detail: "A Spring Boot backend developed with AI assistance; currently in administrator testing.", page: "projects" },
    ], destination: "academic", linkLabel: "More about my coursework",
  },
  {
    id: "python", name: "Python", summary: "Scripts, pipelines and scientific data.",
    examples: [
      { title: "ARDS report evaluation", detail: "Connecting extraction and evaluation workflows, then analysing classification errors.", page: "projects" },
      { title: "Muon data processing", detail: "Parsing detector files and running analyses; currently in developer testing.", page: "projects" },
    ], destination: "projects", linkLabel: "See the projects",
  },
  {
    id: "react", name: "React", summary: "Turning interface ideas into applications with AI assistance.",
    examples: [
      { title: "Clinic information system", detail: "Interfaces for records, appointments, prescriptions and pharmacy workflows.", page: "projects" },
      { title: "This portfolio", detail: "Developing a Figma draft through iteration on layout, responsive type and transitions.", page: "home" },
    ], destination: "projects", linkLabel: "See the projects",
  },
  {
    id: "typescript", name: "TypeScript", summary: "Structured interfaces and application workflows, developed with AI assistance.",
    examples: [
      { title: "Clinic information system", detail: "Connecting interface actions with the application's records and workflows.", page: "projects" },
      { title: "This portfolio", detail: "Typed content and interactive components.", page: "home" },
    ], destination: "projects", linkLabel: "See the projects",
  },
  {
    id: "postgresql", name: "PostgreSQL", summary: "Thinking through records and how they relate.",
    examples: [
      { title: "Clinic information system", detail: "Connected patient, prescription, pharmacy and billing records; finance tools are still being refined.", page: "projects" },
      { title: "Muon platform", detail: "Project and run metadata stored through Supabase.", page: "projects" },
    ], destination: "projects", linkLabel: "See the projects",
  },
  {
    id: "supabase", name: "Supabase", summary: "Accounts and metadata for a scientific workspace.",
    examples: [
      { title: "Muon analysis platform", detail: "Organizing project and run metadata for the detector-data workflow.", page: "projects" },
      { title: "Files and records", detail: "Keeping metadata separate from files stored in R2; the platform is in developer testing.", page: "projects" },
    ], destination: "projects", linkLabel: "See the project",
  },
  {
    id: "figma", name: "Figma", summary: "Visual drafts that give an interface a starting point.",
    examples: [
      { title: "This portfolio", detail: "Starting with a visual draft, then refining the layout through specific instructions.", page: "home" },
      { title: "From draft to interface", detail: "Using written requirements and AI-assisted implementation to develop the design." },
    ], destination: "home", linkLabel: "Back to my world",
  },
  {
    id: "onshape", name: "Onshape", summary: "Design work with my robotics team.",
    examples: [
      { title: "Logos & wood-cutting layouts", detail: "Preparing designs with the robotics team." },
      { title: "Prototype design", detail: "Developing ideas into models for prototypes." },
    ],
  },
  {
    id: "github", name: "GitHub", summary: "A home for code and the projects I build.",
    examples: [{ title: "This portfolio", detail: "Maintaining the website's repository and preparing it for web publishing.", page: "home" }],
    destination: "home", linkLabel: "Explore my world",
  },
  {
    id: "codex", name: "Codex", summary: "AI-assisted development guided by requirements and iteration.",
    examples: [
      { title: "Specs & agent skills", detail: "Using written instructions and reusable skills to guide implementation." },
      { title: "Check & refine", detail: "Reviewing results and refining the work through specific feedback." },
    ], destination: "projects", linkLabel: "See what I've been building",
  },
  {
    id: "vercel", name: "Vercel", summary: "Preparing this portfolio for web publishing.",
    examples: [{ title: "This portfolio", detail: "Setting up the repository's Vercel project.", page: "home" }],
    destination: "home", linkLabel: "Explore my world",
  },
  {
    id: "cloudflare", name: "Cloudflare", summary: "Domain and DNS setup for my website.",
    examples: [
      { title: "yhansu.com", detail: "Managing the portfolio's domain and DNS settings." },
      { title: "Muon file storage", detail: "Using R2 for detector-data files; currently in developer testing.", page: "projects" },
    ], destination: "projects", linkLabel: "See the projects",
  },
];

export const toolkitGroups = [
  { id: "programming", title: "Programming", toolIds: ["java", "python"] },
  { id: "interfaces", title: "Interfaces", toolIds: ["react", "typescript"] },
  { id: "data", title: "Data", toolIds: ["postgresql", "supabase"] },
  { id: "design", title: "Design", toolIds: ["figma", "onshape"] },
  { id: "along-the-way", title: "Along the way", toolIds: ["github", "codex", "vercel", "cloudflare"] },
];
