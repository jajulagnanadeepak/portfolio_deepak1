export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    title: "Health Record System",
    description: "Health record management application.",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://health-record-system-eight.vercel.app/",
    githubUrl: "https://github.com/jajulagnanadeepak/health_system",
    imageUrl: "https://scx2.b-cdn.net/gfx/news/2025/new-health-record-syst.jpg",
  },
  {
    title: "Fresh & Healthy Fruit Bowls Website",
    description: "Fresh and healthy fruit bowl website.",
    technologies: ["React", "CSS"],
    liveUrl: "https://www.sd-fruits-bowl.site/",
    githubUrl: "https://github.com/jajulagnanadeepak/fruit-bowl",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw4JiWHfZJvn301SBFAVsVHVBOLaadJEiOzhs0O337eg&s=10",
  },
  {
    title: "CatalogIQ AI",
    description:
      "AI-powered product discovery and recommendation engine.",
    technologies: [
      "React",
      "FastAPI",
      "MongoDB",
      "Sentence Transformers",
      "FAISS",
      "Gemini",
    ],
    liveUrl: "",
    githubUrl: "",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvHvd7KTtG8Bkyi0srQ4JHqqqvlrBgE-mBjvzyk_rikKc_HTDfNsirCih&s=10",
  },
  {
    title: "Power BI Sales Intelligence Dashboard",
    description:
      "Business intelligence dashboard for sales and profitability analysis.",
    technologies: [
      "Power BI",
      "DAX",
      "Data Analysis",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/jajulagnanadeepak/PowerBI_Business_Intelligence_Project-26_Sep_2026-SalesPerformance_Business_Dashboard.pbix.git",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3zFC8jkq8J1HuVpUBqOY4-8MaCML0LJS0sCRZO3jkA&s=10",
  },
];