import { projectCases } from "./projects";
import { communityOutreach, communityTutoring } from "./community";

export type CaseStudySection = "projects" | "community";
export type CaseStudyEntry = {
  id: string;
  section: CaseStudySection;
  slug: string;
  title: string;
  description: string;
  image: { src: string; alt: string; fit?: "contain" | "cover"; position?: string };
};
const projectSlugs: Record<string, string> = {
  clinic: "hospital-information-system", ards: "ards-imaging-extraction", muon: "muon-lab",
};
export const caseStudies: CaseStudyEntry[] = [
  ...["clinic", "ards", "muon"].map((id): CaseStudyEntry => {
    const project = projectCases.find((item) => item.id === id)!;
    return { id, section: "projects", slug: projectSlugs[id], title: project.title, description: project.summary, image: { ...project.preview, fit: id === "clinic" ? "cover" : "contain" } };
  }),
  { id: "clinic", section: "community", slug: "clinic-internship", title: "Jing Cheng Yi An clinic internship", description: "Two summers learning the daily work of a traditional Chinese medicine clinic in Beijing.", image: { src: "/media/gallery/herb-preparation-poster.jpg", alt: "Preparing herbs during my traditional Chinese medicine internship" } },
  { id: "tutoring", section: "community", slug: "nths-upchieve", title: "NTHS & UPchieve tutoring", description: communityTutoring.introduction, image: { ...communityTutoring.image, fit: "cover", position: "left top" } },
  { id: "outreach", section: "community", slug: "tibet-outreach", title: "The clinic's outreach in Tibet", description: communityOutreach.description, image: { ...communityOutreach.photos[0], position: "50% 70%" } },
];
export const caseStudyHref = (entry: CaseStudyEntry) => `/${entry.section}/${entry.slug}`;
export const caseStudiesFor = (section: CaseStudySection) => caseStudies.filter((entry) => entry.section === section);
export const caseStudyFromPath = (path: string) => caseStudies.find((entry) => caseStudyHref(entry) === path);
