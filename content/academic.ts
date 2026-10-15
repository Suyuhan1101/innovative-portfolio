export type AcademicCourse = {
  id: string;
  abbreviation: string;
  prefix: string;
  name: string;
  group: string;
  status: "Completed" | "In progress";
  note?: string;
};

export const academic = {
  school: "Summit Country Day School",
  classYear: "Class of 2027",
  introduction: "I'm Yuhan Su, a high school student interested in computer science, data science and applied mathematics. Mathematics and computer science are the subjects I enjoy most.",
  mathematics: "I studied AP Calculus BC independently and completed Calculus III through Johns Hopkins University, studying online and taking examinations.",
  learning: [
    "When studying AP Calculus BC independently, I used a textbook, online teaching videos and a formula sheet. I focused on understanding the definitions and ideas behind the formulas, looking for different explanations through MIT open lectures and Khan Academy. I also asked my teacher for additional study resources.",
    "I was used to seeing limits at the beginning of calculus. In one MIT lecture series I watched, limits were discussed after an introduction to differentiation and integration. I found that order interesting, and it gave me another perspective on the concept of a limit.",
  ],
  research: {
    title: "Using LLMs to Identify Pulmonary Findings in Radiology Reports",
    institution: "Cincinnati Children's Hospital",
    dates: "Jun 2026–Present",
    mentor: "Eneida Mendonca, MD, PhD",
    paragraphs: [
      "Through my school's Schiff Family Science Research Institute, I gained an opportunity to join a research team at Cincinnati Children's Hospital. I've worked on using LLMs to identify ARDS-related chest imaging findings in MIMIC-IV radiology reports.",
      "I built a schema-guided pipeline to identify bilateral opacities and distinguish relevant findings from common exclusions. I evaluated approximately 2,000 reports with an LLM judge using a prompt independent of the extraction schema. Error analysis helped me refine the rules and prompts, with a focus on reducing false positives.",
      "I independently presented my findings to Cincinnati Children's Division of Biomedical Informatics at an all-staff meeting.",
    ],
    presentation: "https://www.youtube.com/watch?v=zc97gzaXZJo&t=50",
  },
} as const;

export const academicCourses: AcademicCourse[] = [
  { id: "calculus-bc", prefix: "AP", abbreviation: "Calc BC", name: "AP Calculus BC", group: "Mathematics", status: "Completed", note: "Studied independently using a textbook, teaching videos and additional resources from my teacher." },
  { id: "calculus-iii", prefix: "JHU", abbreviation: "Calc III", name: "Calculus III — Johns Hopkins University", group: "Mathematics", status: "Completed", note: "December 2025 · A+ · 4.0 credits. Online study and examinations." },
  { id: "statistics", prefix: "AP", abbreviation: "Stats", name: "AP Statistics", group: "Mathematics & statistics", status: "In progress" },
  { id: "cs-principles", prefix: "AP", abbreviation: "CSP", name: "AP Computer Science Principles", group: "Computer science", status: "Completed" },
  { id: "cs-a", prefix: "AP", abbreviation: "CSA", name: "AP Computer Science A", group: "Computer science", status: "Completed" },
  { id: "physics-mechanics", prefix: "AP", abbreviation: "Mech", name: "AP Physics C Mechanics", group: "Physics", status: "Completed" },
  { id: "physics-em", prefix: "AP", abbreviation: "E&M", name: "AP Physics C E&M", group: "Physics", status: "Completed" },
  { id: "research-institute", prefix: "School", abbreviation: "SRI", name: "Schiff Family Science Research Institute", group: "Research", status: "In progress", note: "A school program that helped me apply to a research team and find an opportunity at Cincinnati Children's Hospital." },
  { id: "microeconomics", prefix: "AP", abbreviation: "Micro", name: "AP Microeconomics", group: "Economics", status: "Completed" },
  { id: "macroeconomics", prefix: "AP", abbreviation: "Macro", name: "AP Macroeconomics", group: "Economics", status: "Completed" },
  { id: "music-theory", prefix: "AP", abbreviation: "Music", name: "AP Music Theory", group: "Music", status: "Completed" },
  { id: "english-language", prefix: "AP", abbreviation: "Lang", name: "AP English Language and Composition", group: "English", status: "Completed" },
  { id: "us-government", prefix: "AP", abbreviation: "Gov", name: "AP US Government", group: "Social sciences", status: "In progress" },
  { id: "psychology", prefix: "AP", abbreviation: "Psych", name: "AP Psychology", group: "Social sciences", status: "In progress" },
  { id: "english-literature", prefix: "AP", abbreviation: "Lit", name: "AP English Literature and Composition", group: "English", status: "In progress" },
];
