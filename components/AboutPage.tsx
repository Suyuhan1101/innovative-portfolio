"use client";

import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { aboutMe, aboutMedia } from "@/content/about-me";
import { slides } from "@/content/media";
import { PageId, pageHref } from "@/content/sections";
import RevealText from "./RevealText";
import { MusicPlayer } from "./MusicPlayer";

type Props = { onNavigate: (page: PageId, element: HTMLElement) => void; onHome: (element: HTMLElement) => void; onGraphic: (element: HTMLElement) => void };

export default function AboutPage({ onNavigate, onHome, onGraphic }: Props) {
  const linkTo = (page: PageId, label: string) => <a className="text-link" href={pageHref(page)} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate(page, event.currentTarget); }}>{label}<ArrowRightIcon size={20} weight="light" /></a>;
  return <div className="about-content">
    <div className="about-top">
      <div className="about-profile">
        <div className="about-greeting" data-reveal><h2>{aboutMe.greeting}</h2><p>{aboutMe.introduction}</p></div>
        <dl className="about-facts" data-reveal>{aboutMe.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        <div className="about-symbols" data-reveal>
          <div className="about-symbol"><Image src={aboutMedia.scorpio} alt="Scorpio constellation against a starry sky" width={640} height={638} sizes="84px" /><div><span>Zodiac sign</span><strong>Scorpio</strong></div></div>
          <div className="about-symbol"><Image src={aboutMedia.yinYang} alt="Yin and yang symbol" width={250} height={250} sizes="64px" /><div><span>My element</span><strong>Wood · 木</strong><button className="about-graphic-link" aria-haspopup="dialog" onClick={(event) => onGraphic(event.currentTarget)}>Five elements <ArrowUpRightIcon size={15} /></button></div></div>
        </div>
        <div className="about-instruments" data-reveal><span>On the keys, and learning.</span><p>Piano <span>· Guitar, drums & marimba — beginner</span></p></div>
        <a className="about-email" href={`mailto:${aboutMe.email}`} data-reveal><span>Say hello</span><span>{aboutMe.email}<ArrowUpRightIcon size={18} /></span></a>
      </div>
      <MusicPlayer />
    </div>
    <section className="about-story">
      <div className="about-story-copy"><h2 data-reveal>It started with a little robot.</h2>{aboutMe.coding.map((text) => <RevealText text={text} key={text} />)}<div className="about-links" data-reveal>{linkTo("projects", "Explore my projects")}</div></div>
      <figure className="about-robot" data-reveal><Image src={aboutMedia.ev3} alt="Reference example of a LEGO EV3 sumo robot" width={1280} height={960} sizes="(max-width: 900px) 80vw, 360px" /><figcaption>LEGO EV3 sumo robot · reference image</figcaption></figure>
    </section>
    <section className="about-outside">
      <div className="about-outside-copy"><h2 data-reveal>Outside the screen.</h2>{aboutMe.outside.map((text) => <RevealText text={text} key={text} />)}<div className="about-links" data-reveal>{linkTo("hobby", "Explore my hobbies")}{linkTo("community", "Community")}</div></div>
      <figure className="about-travel" data-reveal><Image src={slides[0].src} alt={slides[0].alt} width={slides[0].width} height={slides[0].height} sizes="(max-width: 900px) 90vw, 420px" /><figcaption>High places, a different perspective.</figcaption></figure>
    </section>
    <a href="/" className="text-link back-home" data-reveal onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onHome(event.currentTarget); }}>Back to my world <ArrowRightIcon size={23} weight="light" /></a>
  </div>;
}
