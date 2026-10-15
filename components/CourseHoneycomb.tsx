"use client";

import { useId, useState, type CSSProperties } from "react";
import { academicCourses } from "@/content/academic";
import styles from "./AcademicPage.module.css";

export default function CourseHoneycomb() {
  const [activeId, setActiveId] = useState(academicCourses[0].id);
  const detailId = useId();
  const active = academicCourses.find((course) => course.id === activeId)!;

  return <section className={styles.coursework} aria-labelledby="coursework-heading">
    <div className={styles.courseworkHeader} data-reveal>
      <div><h2 id="coursework-heading">Coursework</h2><p>Hover, focus or tap a course to see more.</p></div>
      <div className={styles.legend} aria-label="Course status legend">
        <span><i className={styles.completedMark} aria-hidden="true" />Completed</span>
        <span><i className={styles.progressMark} aria-hidden="true" />In progress</span>
      </div>
    </div>
    <div className={styles.courseExplorer}>
      <div className={styles.hiveContainer} data-reveal>
        <ul className={styles.honeycomb} aria-label="Courses">
          {academicCourses.map((course, index) => {
            const wideRow = Math.floor(index / 5);
            const narrowRow = Math.floor(index / 3);
            const position = {
              "--wide-column": (index % 5) * 2 + 1 + wideRow % 2,
              "--wide-row": wideRow + 1,
              "--narrow-column": (index % 3) * 2 + 1 + narrowRow % 2,
              "--narrow-row": narrowRow + 1,
            } as CSSProperties;
            return <li className={styles.hexPosition} style={position} key={course.id}>
              <button type="button" className={styles.hexCourse} data-current={course.id === activeId} data-status={course.status === "Completed" ? "completed" : "progress"}
                aria-label={`${course.name}, ${course.status}`} aria-pressed={course.id === activeId} aria-controls={detailId} title={`${course.name} — ${course.status}`}
                onPointerEnter={(event) => { if (event.pointerType !== "touch") setActiveId(course.id); }} onFocus={() => setActiveId(course.id)} onClick={() => setActiveId(course.id)}>
                <span className={styles.hexFace} aria-hidden="true"><span className={styles.hexPrefix}>{course.prefix}</span><span className={styles.hexAbbreviation}>{course.abbreviation}</span><i className={course.status === "Completed" ? styles.completedMark : styles.progressMark} /></span>
              </button>
            </li>;
          })}
        </ul>
      </div>
      <div className={styles.courseDetail} data-reveal>
        <div id={detailId} role="status" aria-live="polite" aria-atomic="true">
          <div className={styles.detailContent} key={active.id}>
            <p className={styles.courseGroup}>{active.group}</p>
            <h3>{active.name}</h3>
            <p className={styles.courseStatus}><i className={active.status === "Completed" ? styles.completedMark : styles.progressMark} aria-hidden="true" />{active.status}</p>
            {active.note && <p className={styles.courseNote}>{active.note}</p>}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
