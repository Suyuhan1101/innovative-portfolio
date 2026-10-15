"use client";

import { useLayoutEffect, useRef, useState } from "react";

export default function RevealText({ text }: { text: string }) {
  const measure = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState([text]);
  useLayoutEffect(() => {
    const element = measure.current;
    if (!element) return;
    let alive = true;
    const split = () => {
      const node = element.firstChild;
      if (!node || element.clientWidth === 0) return;
      const range = document.createRange();
      const result: string[] = [];
      let lastTop = -1;
      for (const match of text.matchAll(/\S+/g)) {
        range.setStart(node, match.index!);
        range.setEnd(node, match.index! + match[0].length);
        const top = Math.round(range.getBoundingClientRect().top);
        if (top !== lastTop) { result.push(match[0]); lastTop = top; }
        else result[result.length - 1] += ` ${match[0]}`;
      }
      if (alive && result.length) setLines((current) => current.join("\n") === result.join("\n") ? current : result);
    };
    split();
    const observer = new ResizeObserver(split);
    observer.observe(element);
    void document.fonts.ready.then(() => { if (alive) split(); });
    return () => { alive = false; observer.disconnect(); };
  }, [text]);
  return <p className="reveal-paragraph"><span ref={measure} className="line-measure" aria-hidden="true">{text}</span>{lines.map((line, index) => <span className="text-line" data-reveal key={`${index}-${line}`}>{line}{index < lines.length - 1 ? " " : ""}</span>)}</p>;
}
