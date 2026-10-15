import type { CSSProperties } from "react";

export default function HomeHeading({ hidden = false, style }: { hidden?: boolean; style?: CSSProperties }) {
  return <h1 className="home-title" tabIndex={-1} style={{ ...style, visibility: hidden ? "hidden" : "visible" }}><span>I'm Yuhan Su.</span><span>I build and explore.</span></h1>;
}
