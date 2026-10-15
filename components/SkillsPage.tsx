"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRightIcon, CaretDownIcon, FileTextIcon, OpenAiLogoIcon, SparkleIcon } from "@phosphor-icons/react";
import { skills } from "@/content/skills";
import { toolkitGroups, toolkitTools } from "@/content/skill-toolbench";
import { pageHref, type PageId } from "@/content/sections";
import RevealText from "./RevealText";
import styles from "./SkillsPage.module.css";

type Props = {
  onNavigate: (page: PageId, element: HTMLElement) => void;
  onHome: (element: HTMLElement) => void;
};

function ToolMark({ id, large = false }: { id: string; large?: boolean }) {
  const size = large ? 88 : 56;
  return <span className={styles.mark} data-large={large} data-tool={id} aria-hidden="true">
    {id === "codex" ? <OpenAiLogoIcon size={size} weight="regular" /> : <Image src={id === "onshape" ? "/media/skills/onshape-icon.png" : `/media/skills/${id}.svg`} alt="" width={size} height={size} unoptimized />}
  </span>;
}

export default function SkillsPage({ onNavigate, onHome }: Props) {
  const [selectedId, setSelectedId] = useState("python");
  const detailRef = useRef<HTMLDivElement>(null);
  const selected = toolkitTools.find((tool) => tool.id === selectedId)!;
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, page: PageId) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(page, event.currentTarget);
  };
  const linkTo = (page: PageId, label: string) => <a className="text-link" href={pageHref(page)} onClick={(event) => navigate(event, page)}>{label}<ArrowRightIcon size={20} weight="light" aria-hidden="true" /></a>;
  const selectTool = (id: string) => {
    setSelectedId(id);
    if (window.matchMedia("(max-width: 700px)").matches) {
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      }));
    }
  };

  return <div className={styles.content}>
    <section className={styles.toolkit} aria-labelledby="skills-toolkit-title">
      <div className={styles.introduction}>
        <div data-reveal>
          <p className={styles.eyebrow}>My toolkit</p>
          <h2 id="skills-toolkit-title">The Open Toolbench</h2>
          <p className={styles.foundation}>{skills.foundation}</p>
        </div>
        <p className={styles.aiNote} data-reveal><SparkleIcon size={25} weight="light" aria-hidden="true" /><span>AI-assisted development<br className={styles.desktopBreak} /> is part of how I build.</span></p>
      </div>
      <div className={styles.explorer}>
        <div className={styles.toolGroups}>
          {toolkitGroups.map((group) => <div key={group.id} className={styles.toolGroup} data-wide={group.id === "along-the-way"} role="group" aria-labelledby={`toolkit-${group.id}`} data-reveal>
            <h3 id={`toolkit-${group.id}`}>{group.title}</h3>
            <div className={styles.toolButtons}>
              {group.toolIds.map((id) => {
                const tool = toolkitTools.find((item) => item.id === id)!;
                return <button key={id} id={`tool-${id}`} className={styles.toolButton} type="button" aria-pressed={selectedId === id} aria-controls="skill-tool-details" onClick={() => selectTool(id)}>
                  <ToolMark id={id} /><span className={styles.toolName}>{tool.name}</span>
                </button>;
              })}
            </div>
          </div>)}
        </div>
        <div ref={detailRef} id="skill-tool-details" className={styles.detailPanel} role="region" aria-labelledby="skill-detail-title" data-reveal>
          <div key={selectedId} className={styles.detailContent}>
            <ToolMark id={selectedId} large />
            <h3 id="skill-detail-title">{selected.name}</h3>
            <p className={styles.summary}>{selected.summary}</p>
            <div className={styles.examples}>
              <h4>In practice</h4>
              <ul>{selected.examples.map((example) => <li key={example.title}>
                {example.page ? <a className={styles.exampleLink} href={pageHref(example.page)} onClick={(event) => navigate(event, example.page!)}>
                  <FileTextIcon size={23} weight="light" aria-hidden="true" /><span><span className={styles.exampleTitle}>{example.title}</span><span className={styles.exampleDetail}>{example.detail}</span></span><ArrowRightIcon size={20} weight="light" aria-hidden="true" />
                </a> : <div className={styles.exampleText}><FileTextIcon size={23} weight="light" aria-hidden="true" /><span><span className={styles.exampleTitle}>{example.title}</span><span className={styles.exampleDetail}>{example.detail}</span></span></div>}
              </li>)}</ul>
            </div>
            {selected.destination && selected.linkLabel && linkTo(selected.destination, selected.linkLabel)}
          </div>
        </div>
      </div>
      <p className={styles.selectionStatus} role="status">Showing {selected.name}: {selected.summary}</p>
    </section>
    <details className={styles.moreTools} data-reveal>
      <summary>More tools &amp; methods<CaretDownIcon size={21} weight="light" aria-hidden="true" /></summary>
      <div className={styles.moreContent}>
        <dl className={styles.moreGroups}>
          {skills.areas.slice(1).map((group) => <div key={group.id}><dt>{group.title}</dt><dd>{group.tools.join(" · ")}</dd></div>)}
          {skills.workspace.slice(1, 3).map((group) => <div key={group.title}><dt>{group.title}</dt><dd>{group.tools.join(" · ")}</dd></div>)}
        </dl>
      </div>
    </details>
    <section className={styles.process} aria-labelledby="skills-process-title">
      <div className={styles.processHeading} data-reveal><h2 id="skills-process-title">How I work</h2><p>The tools change with the problem.</p></div>
      <ol className={styles.processSteps}>{skills.process.map((step) => <li key={step.title}><h3 data-reveal>{step.title}</h3><RevealText text={step.text} /></li>)}</ol>
      <div className={styles.learningLink} data-reveal>{linkTo("academic", "More about how I learn")}</div>
    </section>
    <a href="/" className={`text-link back-home ${styles.backHome}`} data-reveal onClick={(event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); onHome(event.currentTarget);
    }}>Back to my world<ArrowRightIcon size={23} weight="light" aria-hidden="true" /></a>
  </div>;
}
