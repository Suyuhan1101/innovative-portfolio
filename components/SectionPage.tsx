"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { sections, SectionId, PageId } from "@/content/sections";
import { TileFace } from "./Tile";
import RevealText from "./RevealText";
import AboutPage from "./AboutPage";
import AcademicPage from "./AcademicPage";
import { type CaseStudyEntry } from "@/content/case-studies";
import CaseStudyPage from "./CaseStudyPage";
import ProjectsPage, { ProjectCaseStudy } from "./ProjectsPage";
import SkillsPage from "./SkillsPage";
import GalleryPage from "./GalleryPage";
import HobbyPage from "./HobbyPage";
import CommunityPage, { CommunityCaseStudy } from "./CommunityPage";

type Props = { caseStudy?: CaseStudyEntry; onCaseStudy: (entry: CaseStudyEntry, element: HTMLElement) => void; onCaseStudyBack: (element: HTMLElement) => void; page: SectionId; targetRef: React.RefObject<HTMLDivElement | null>; hideTile: boolean; onHome: (element: HTMLElement) => void; onPhoto: (index: number) => void; onGalleryPhoto: (index: number, ids: string[]) => void; onOutreachPhoto: (index: number) => void; onNavigate: (page: PageId, element: HTMLElement) => void; onGraphic: (element: HTMLElement) => void };

export default function SectionPage({ caseStudy, onCaseStudy, onCaseStudyBack, page, targetRef, hideTile, onHome, onPhoto, onGalleryPhoto, onOutreachPhoto, onNavigate, onGraphic }: Props) {
  if (caseStudy) return <CaseStudyPage entry={caseStudy} onBack={onCaseStudyBack}>{caseStudy.section === "projects" ? <ProjectCaseStudy id={caseStudy.id} onPhoto={onPhoto} /> : <CommunityCaseStudy id={caseStudy.id} onOutreachPhoto={onOutreachPhoto} />}</CaseStudyPage>;
  const section = sections.find(({ id }) => id === page)!;
  return <article className="section-page">
    <div className="section-heading"><div ref={targetRef} className="tile section-tile active" style={{ visibility: hideTile ? "hidden" : "visible" }} aria-hidden="true"><TileFace page={page} /></div><div className="section-heading-copy" data-page-title><h1 tabIndex={-1}>{section.title}</h1><p>{section.intro}</p></div></div>
    {page === "about-me" ? <AboutPage onNavigate={onNavigate} onHome={onHome} onGraphic={onGraphic} /> : page === "academic" ? <AcademicPage onNavigate={onNavigate} onHome={onHome} onPhoto={onPhoto} /> : page === "projects" ? <ProjectsPage onHome={onHome} onPhoto={onPhoto} onCaseStudy={onCaseStudy} /> : page === "skills" ? <SkillsPage onNavigate={onNavigate} onHome={onHome} /> : page === "gallery" ? <GalleryPage onHome={onHome} onPhoto={onGalleryPhoto} /> : page === "hobby" ? <HobbyPage onHome={onHome} onPhoto={onPhoto} /> : page === "community" ? <CommunityPage onHome={onHome} onNavigate={onNavigate} onCaseStudy={onCaseStudy} /> : <div className="section-body">
      <div className="section-prose">{section.paragraphs.map((text) => <RevealText text={text} key={text} />)}
        <div className="content-pending" data-reveal><p>{section.pending}</p></div>
        <a href="/" className="text-link back-home" data-reveal onClick={(event) => { event.preventDefault(); onHome(event.currentTarget); }}>Back to my world <ArrowRightIcon size={23} weight="light" /></a>
      </div>
    </div>}
  </article>;
}
