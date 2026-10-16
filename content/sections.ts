import { caseStudyFromPath } from "./case-studies";

export const sections = [
  { id: "about-me", title: "About Me", intro: "A few little things about me.", paragraphs: [], pending: "" },
  { id: "academic", title: "Academic", intro: "Summit Country Day School · Class of 2027", paragraphs: [], pending: "" },
  { id: "projects", title: "Projects", intro: "Research, software and experiments.", paragraphs: [], pending: "" },
  { id: "skills", title: "Skills", intro: "Learning by making things.", paragraphs: [], pending: "" },
  { id: "gallery", title: "Gallery", intro: "Through my lens.", paragraphs: [], pending: "" },
  { id: "hobby", title: "Hobby", intro: "Music, swimming, robotics and LEGO.", paragraphs: [], pending: "" },
  { id: "community", title: "Community", intro: "People, connection and shared experiences.", paragraphs: [], pending: "" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export type PageId = "home" | SectionId;
export const menuPages: PageId[] = ["home", ...sections.map((section) => section.id)];
export const pageTitle = (id: PageId) => id === "home" ? "Home" : sections.find((section) => section.id === id)!.title;
export const pageHref = (id: PageId) => id === "home" ? "/" : `/${id}`;
export function pageFromPath(path: string): PageId {
  return caseStudyFromPath(path)?.section ?? sections.find((section) => path === `/${section.id}`)?.id ?? "home";
}
