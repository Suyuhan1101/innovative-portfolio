import outreachManifest from "@/public/media/community/manifest.json";

export const communityTutoring = {
  title: "Summit Country Day NTHS Chapter",
  role: "Founder & President",
  dates: "Jan 2026–Present",
  location: "Remote",
  introduction: "I founded our school's National Tutoring Honor Society (NTHS) chapter to bring student volunteers together for online tutoring through UPchieve.",
  experiences: [
    {
      heading: "Bringing tutors together",
      text: "I recruited six student volunteers through personal outreach and school communities. I created a Discord server to coordinate tutors, share information and organize the chapter's tutoring activities.",
    },
    {
      heading: "Tutoring and team support",
      text: "I tutored five students and completed more than 60 hours of platform service. Alongside that service, I spent additional time each week managing and supporting our volunteer team.",
    },
  ],
  image: {
    src: "/media/community/nths-upchieve-chapter.png",
    width: 3048,
    height: 1095,
    alt: "UPchieve chapter dashboard headed Summit Country Day NTHS Chapter, with chapter navigation and member invitation tools",
    caption: "Our Summit Country Day NTHS chapter on UPchieve.",
  },
} as const;

export const communityPage = {
  clinic: { name: "Jing Cheng Yi An", type: "Traditional Chinese Clinic" },
  role: "Clinic intern",
  location: "Beijing, China",
  dates: "Summers 2024 & 2025",
  duration: "Two months each summer",
  introduction: "I spent two summers learning the daily work of a traditional Chinese medicine clinic, from preparing herbal prescriptions to observing a physician.",
  experiences: [
    {
      heading: "Preparing prescriptions",
      paragraphs: [
        "I prepared approximately 40–50 traditional Chinese herbal prescriptions each day. I measured ingredients using traditional weighing methods and electronic scales for larger quantities, carefully following the prescribed formulas.",
      ],
    },
    {
      heading: "Learning alongside a physician",
      paragraphs: [
        "I shadowed a physician, learning common acupuncture points, massage techniques and the basic uses of frequently prescribed Chinese herbs.",
        "Under direct physician supervision, I practiced introductory acupuncture techniques on a silicone model and on myself.",
      ],
    },
    {
      heading: "Recognizing medicinal herbs",
      paragraphs: [
        "I learned to distinguish common medicinal herbs, including dang gui (Chinese angelica), by observing their appearance, smell and other identifying characteristics.",
      ],
    },
  ],
  video: {
    id: "SGG76XnPxqo",
    title: "A look inside the clinic",
    label: "Jing Cheng Yi An clinic introduction",
    description: "I produced this introduction to the clinic, documenting my daily work preparing and organizing herbal prescriptions.",
    thumbnail: "https://i.ytimg.com/vi/SGG76XnPxqo/hqdefault.jpg",
  },
} as const;

const outreachDescriptions = {
  "team-in-tibet": { title: "The team in Tibet", alt: "A group posing beside a winding road through green mountain slopes in Tibet" },
  "outreach-consultation": { title: "Consultations at the outreach clinic", alt: "A seated visitor and members of the outreach team during a consultation, with a blood pressure monitor on the table" },
  "visit-conversation": { title: "Conversations during a visit", alt: "A team member writing notes beside people seated together during an outreach visit" },
  "clinic-corridor": { title: "Visitors waiting at the clinic", alt: "Visitors gathered in a sunlit corridor outside the clinic rooms" },
  "outside-clinic": { title: "Outside the outreach clinic", alt: "An adult in a white coat and a child standing beneath a clinic sign" },
  "dispensary-visit": { title: "At the dispensary", alt: "A visitor holding boxes of medicine and a walking stick" },
  "during-visit": { title: "A moment during the visit", alt: "People gathered around a table while one person writes calligraphy on a sheet of paper" },
} as const;

export const communityOutreach = {
  title: "The clinic's outreach in Tibet",
  location: "Tibet",
  schedule: "Every July–September",
  description: "Jing Cheng Yi An organizes free medical outreach activities in Tibet each year, from July through September. These photographs document the clinic's team and scenes from the outreach.",
  photos: (Object.keys(outreachDescriptions) as (keyof typeof outreachDescriptions)[]).map((id) => {
    const image = outreachManifest.images.find((photo) => photo.id === id);
    if (!image) throw new Error(`Missing outreach photograph: ${id}`);
    const description = outreachDescriptions[id];
    return { ...image, ...description, label: id === "team-in-tibet" ? description.title : `${description.title} · Tibet` };
  }),
};
