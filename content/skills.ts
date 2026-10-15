import type { PageId } from "./sections";

type SkillExample = { title: string; detail: string };
type SkillArea = {
  id: string;
  title: string;
  preview: string;
  tools: string[];
  description: string;
  applications: string[];
  examples: SkillExample[];
  destination: PageId;
  linkLabel: string;
};

export const skills = {
  foundation: "Java and Python are the languages I know best. I learned HTML, CSS and JavaScript in school, and have used AI assistance to develop interfaces and systems in my projects.",
  areas: [
    {
      id: "programming",
      title: "Programming",
      preview: "Java & Python",
      tools: ["Java", "Python"],
      description: "School coursework gave me a foundation in programming. Research projects have given me a reason to turn that foundation into scripts, pipelines and working tools.",
      applications: [
        "Writing scripts to filter and process data.",
        "Connecting existing tools into a multi-step pipeline.",
        "Working with structured inputs and outputs.",
      ],
      examples: [
        { title: "Computer science coursework", detail: "Java in AP Computer Science A, alongside school programming classes." },
        { title: "ARDS & Muon", detail: "Python workflows for radiology report extraction, evaluation and detector data processing." },
      ],
      destination: "projects",
      linkLabel: "Explore the projects",
    },
    {
      id: "web-systems",
      title: "Web & systems",
      preview: "Interfaces & workflows",
      tools: ["HTML & CSS", "JavaScript", "React", "TypeScript", "Spring Boot", "Electron"],
      description: "I use AI-assisted development to turn layout ideas and workflow requirements into applications. Figma helps me plan interfaces, while a written spec helps guide implementation. My clinic project connects those interfaces with the records and actions behind them.",
      applications: [
        "Developing interfaces from a visual draft and specific requirements.",
        "Connecting records, appointments, prescriptions and pharmacy workflows.",
        "Revising order formats in response to administrator feedback.",
      ],
      examples: [
        { title: "Clinic information system", detail: "React and TypeScript, with a Spring Boot backend and an Electron Windows client; currently in administrator testing." },
        { title: "This portfolio", detail: "A Figma draft developed through AI-assisted iteration on layout, responsive typography and transitions." },
      ],
      destination: "projects",
      linkLabel: "Explore the projects",
    },
    {
      id: "data-storage",
      title: "Data & storage",
      preview: "Records & datasets",
      tools: ["SQL / PostgreSQL", "Supabase", "R2", "Parquet", "Polars"],
      description: "I start by thinking through what data a system needs and how the pieces relate. My projects involve both connected clinic records and structured scientific datasets.",
      applications: [
        "Organizing data shared across clinic modules.",
        "Parsing raw QuarkNet files into structured Parquet datasets.",
        "Separating project and run metadata from stored data files.",
      ],
      examples: [
        { title: "Clinic information system", detail: "PostgreSQL connects the application's clinical and operational records." },
        { title: "Muon analysis platform", detail: "Supabase stores metadata, R2 handles files, and Parquet datasets support analysis with Polars. The workflow is in developer testing." },
      ],
      destination: "projects",
      linkLabel: "Explore the projects",
    },
    {
      id: "research-evaluation",
      title: "Research & evaluation",
      preview: "Rules, errors & metrics",
      tools: ["JSON schema", "LLM judge prompts", "Error analysis", "Precision / recall / F1", "TensorFlow / Keras"],
      description: "My ARDS work involves defining what should count, checking predictions and revising rules after inspecting errors. I have also reproduced a CNN to learn more about machine learning.",
      applications: [
        "Writing inclusion and exclusion rules for imaging findings.",
        "Evaluating report-level predictions with an independent judge prompt.",
        "Using false positives, false negatives and metrics to guide revisions.",
      ],
      examples: [
        { title: "ARDS extraction & evaluation", detail: "Schema iteration and metrics analysis, using LLM judge labels as the evaluation reference." },
        { title: "Handwritten digit recognition", detail: "CNN reproduction code with preprocessing, a validation split, data augmentation and error-analysis tools." },
      ],
      destination: "projects",
      linkLabel: "Explore the projects",
    },
  ] satisfies SkillArea[],
  workspaceIntroduction: "With my robotics team, I use Onshape for logo designs, wood-cutting layouts and prototypes. I use Figma to draft web interfaces.",
  workspace: [
    { title: "Design & modelling", tools: ["Figma", "Onshape"] },
    { title: "Development environments", tools: ["Android Studio", "Visual Studio", "JetBrains / PyCharm"] },
    { title: "AI & specifications", tools: ["Codex", "Agent skills", "Spec-driven development", "Vibe coding"] },
    { title: "Code & publishing", tools: ["GitHub", "Vercel", "Cloudflare"] },
  ],
  process: [
    { title: "Understand the logic", text: "I work out the requirements and data relationships first. For interfaces, I start with a visual draft and refine the layout through specific instructions." },
    { title: "Build with AI assistance", text: "I use written specs, Codex and agent skills to guide AI-assisted implementation and iteration. This is part of my approach to building interfaces and systems." },
    { title: "Check and refine", text: "In research, I use metrics and error analysis to revise rules. In the clinic project, administrator feedback guides changes such as order formats." },
  ],
};
