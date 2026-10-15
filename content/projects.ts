import ardsMetrics from "@/public/media/projects/ards/metrics.json";

export { ardsMetrics };

export type ProjectImage = { src: string; width: number; height: number; alt: string; caption: string };
export type ProjectCase = {
  id: string;
  title: string;
  context: string;
  role: string;
  dates: string;
  status: string;
  technologies: string[];
  summary: string;
  preview: ProjectImage;
  sections: { heading: string; paragraphs: string[] }[];
  detailImage?: ProjectImage;
};

export const projectCases: ProjectCase[] = [
  {
    id: "ards",
    title: "ARDS chest imaging extraction",
    context: "Cincinnati Children's Hospital",
    role: "Researcher · Mentored by Eneida Mendonca, MD, PhD",
    dates: "Jun 2026–Present",
    status: "Research in progress",
    technologies: ["Python", "JSON schema", "LLM annotation", "LLM judge"],
    summary: "Identifying ARDS-related chest imaging findings in free-text radiology reports through schema rules, explicit exclusions and an independent judge prompt.",
    preview: { src: "/media/projects/ards/pipeline.png", width: 3000, height: 1350, alt: "ARDS research workflow from report selection to annotation, independent judging and schema refinement", caption: "The extraction and evaluation workflow." },
    sections: [
      { heading: "My contribution", paragraphs: [
        "Through my school's Schiff Family Science Research Institute, I joined a research team studying how LLMs could identify pulmonary findings in MIMIC-IV radiology reports.",
        "My mentor provided an annotation tool that turns notes into BioXML annotations. I designed the schema, wrote database-filtering steps and built the pipeline connecting to that tool. My mentor handled the oxygenation filtering.",
        "I also built the evaluation pipeline using a judge prompt independent of the extraction schema, and carried out the metrics analysis. My mentor supplied the model API and helped adapt both pipelines from a single-label schema to a multi-label schema.",
      ] },
      { heading: "How I refined the rules", paragraphs: [
        "I began with the Berlin chest imaging criterion, then refined the definitions through published research, mentor feedback and error analysis. Inclusion rules were followed by explicit exclusions for findings that should not count.",
        "The saved schema versions document a tradeoff: stricter exclusions reduced false positives but also filtered out relevant bibasilar findings. I revised the rules to allow those patterns while continuing to refine the exclusions.",
      ] },
      { heading: "Evaluation", paragraphs: [
        "The selected Stage II run evaluated 1,997 reports. Metrics use 1,984 reports with determinate LLM judge labels; 13 uncertain judgments were excluded. This is report-level classification of the chest imaging criterion, with LLM judge labels as the reference.",
        "The saved runs evaluated different numbers of reports, so the comparison figure shows separate run results. Clinician validation remains future work.",
        "I independently presented the findings to Cincinnati Children's Division of Biomedical Informatics at an all-staff meeting.",
      ] },
    ],
    detailImage: { src: "/media/projects/ards/evaluation.png", width: 3000, height: 1900, alt: "Saved Stage II precision, recall, F1 and error-count comparison across four schema runs", caption: "Saved Stage II comparison. The selected run is labeled Test 3 in the poster; evaluated report counts differ between runs." },
  },
  {
    id: "clinic",
    title: "Jing Cheng Yi An Hospital Information System",
    context: "Remote / Beijing, China",
    role: "Independent System Developer",
    dates: "Jun 2025–Present",
    status: "Administrator testing",
    technologies: ["React", "TypeScript", "Java / Spring Boot", "PostgreSQL", "Electron"],
    summary: "A clinic management system connecting patient records, appointments, diagnoses, prescriptions, pharmacy workflows and billing in one application.",
    preview: { src: "/media/projects/clinic/overview.png", width: 1600, height: 900, alt: "Clinic administrator dashboard with empty activity totals and module shortcuts", caption: "Administrator dashboard with empty activity data." },
    sections: [
      { heading: "Connecting the clinic workflow", paragraphs: [
        "I built the system with React and TypeScript, a Spring Boot backend and PostgreSQL. Role-based employee accounts provide access to the tools and information needed for different responsibilities. The project also includes an Electron Windows client.",
        "The prescription workflow connects physician order entry, medication pricing, inventory tracking, dispensing and delivery. Shared records connect these steps across the application's modules.",
      ] },
      { heading: "Testing and revision", paragraphs: [
        "I've revised the system through several versions and deployed the current build on the system administrator's computer for testing ahead of final delivery.",
        "The feedback covers prescription editing, appointment details, pharmacy workflows, printing and finance. Most requested changes have been completed, including work on order formats. The finance module is still being refined.",
      ] },
    ],
    detailImage: { src: "/media/projects/clinic/prescription-form.png", width: 1600, height: 900, alt: "Blank clinic diagnosis form with patient selection, doctor selection and examination fields", caption: "Diagnosis and prescription entry interface. The form is empty." },
  },
  {
    id: "muon",
    title: "Muon Lab Analysis Platform",
    context: "School Cosmic Club · Summit Country Day School",
    role: "Backend Developer",
    dates: "Jan 2026–Present",
    status: "Developer testing",
    technologies: ["Python / FastAPI", "Supabase", "R2", "Parquet", "Polars"],
    summary: "Turning raw QuarkNet detector files into structured datasets and analysis outputs, with a backend workflow for file processing, parsing and scientific analysis.",
    preview: { src: "/media/projects/muon/workflow-concept.png", width: 1536, height: 1024, alt: "Muon platform concept diagram showing raw detector files, parsed metadata and planned analysis modules", caption: "Concept diagram with illustrative plots; future features are marked." },
    sections: [
      { heading: "From detector files to datasets", paragraphs: [
        "I developed the backend for processing QuarkNet detector files, extracting event timing, detector channels and experimental metadata. The code writes structured Parquet datasets for downstream analysis.",
        "FastAPI provides the backend interface. Supabase handles project and run metadata, and the storage layer supports R2 with a local development fallback.",
      ] },
      { heading: "Analysis and current progress", paragraphs: [
        "The analysis code covers run quality, event rates, channel and time-over-threshold behavior, environmental metadata and coincidence analysis.",
        "I've run the file-processing, parsing and analysis workflow and am currently testing it myself. The diagram illustrates the platform concept and includes future work; its example plots are not measured outcomes from this project.",
      ] },
    ],
  },
];

export const additionalProjects = [
  {
    id: "microneedle",
    title: "Microneedle sensor image analysis",
    context: "Neuroneedle Networkers · Conrad Challenge project",
    role: "Image Algorithm & Data Analysis Architect",
    dates: "Oct 2025–Jan 2026",
    status: "Untested prototype",
    technologies: ["ImageJ-inspired analysis", "RGB signals"],
    paragraphs: [
      "I developed an image-analysis prototype inspired by ImageJ for a proposed wearable microneedle sensor, and reviewed depression-related biomarker research to inform the team's design.",
      "The proposed workflow extracts RGB values from optical signals and uses them to estimate biomarker concentrations, as part of a depression-screening concept. Experimental testing and validation remain future work.",
    ],
  },
  {
    id: "digit-recognition",
    title: "Handwritten digit recognition",
    context: "Kaggle Digit Recognizer",
    role: "CNN reproduction",
    dates: "May–Aug 2026",
    status: "Learning project",
    technologies: ["Python", "TensorFlow / Keras", "scikit-learn"],
    paragraphs: [
      "I reproduced a CNN for classifying MNIST handwritten digits from 0 to 9. My notebook implements pixel normalization, a 90/10 training–validation split, convolutional layers and data augmentation.",
      "It includes code for training curves, a confusion matrix, misclassified-image inspection and prediction export for Kaggle submissions.",
    ],
    link: { href: "https://www.kaggle.com/competitions/digit-recognizer", label: "View the competition" },
  },
  {
    id: "ai-dependency",
    title: "Teen emotional dependency on ChatGPT",
    context: "Independent research",
    role: "Independent Researcher",
    dates: "Apr 2026–Present",
    status: "Study design & pilot",
    technologies: ["Literature review", "Survey design", "Mixed methods"],
    paragraphs: [
      "I'm developing a mixed-method study of teenagers' emotional reliance on ChatGPT and its relationship with offline connections, drawing on Media System Dependency Theory and Uses and Gratifications Theory.",
      "I designed a 15-question survey and piloted it with eight respondents to check question clarity. The research plan combines broader survey collection with follow-up interviews.",
    ],
  },
] as const;
