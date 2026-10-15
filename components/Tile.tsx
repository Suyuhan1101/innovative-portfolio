"use client";

import { UserIcon, BookOpenIcon, CodeIcon, WrenchIcon, ImagesIcon, HeadphonesIcon, UsersThreeIcon, HouseIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { PageId, pageTitle } from "@/content/sections";

const icons = { home: HouseIcon, "about-me": UserIcon, academic: BookOpenIcon, projects: CodeIcon, skills: WrenchIcon, gallery: ImagesIcon, music: HeadphonesIcon, community: UsersThreeIcon };

function TileContent({ page }: { page: PageId }) {
  const Icon = icons[page];
  return <><Icon className="tile-icon" weight="light" aria-hidden="true" /><span className={page === "community" ? "tile-label tile-label-community" : "tile-label"}>{pageTitle(page)}</span><ArrowRightIcon className="tile-arrow" weight="light" aria-hidden="true" /></>;
}

export function TileFace({ page, interactive = false }: { page: PageId; interactive?: boolean }) {
  if (!interactive) return <TileContent page={page} />;
  return <><div className="tile-rest-face"><TileContent page={page} /></div><div className="tile-fill-face" aria-hidden="true"><TileContent page={page} /></div></>;
}
