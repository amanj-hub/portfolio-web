export type Project = {
  name: string;
  eyebrow: string;
  description: string;
  problem: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  visual: "orbit" | "ledger" | "pulse";
  accent: "violet" | "cyan" | "lime";
};

export const siteConfig = {
  name: "Aman Kumar",
  initials: "AK",
  role: "Computer Science & Engineering Student | Full-Stack Developer | AI Enthusiast",
  location: "Keshopur Pura, Janakpur Road, Bihar 843329",
  availability: "Available for internships and software development opportunities",
  description:
    "Computer Science and Engineering student building full-stack and AI-powered applications that solve practical problems.",
  email: "aman20244@lpu.in",
  resumeUrl: "/Aman-Kumar-Resume.pdf",
  profileImage: "/images/aman-kumar-profile.png",
  profileImageAlt: "Aman Kumar in a dark suit and tie",
  url: "https://your-domain.com",
  hero: {
    headline: "Full-stack developer building practical AI-powered solutions.",
    description:
      "Computer Science and Engineering student with hands-on experience in MERN applications, REST APIs, AI chatbots, and intelligent platforms for real-world problems.",
  },
  contact: {
    description:
      "I’m available for internships and software development opportunities where I can contribute to practical full-stack and AI-powered products.",
  },
  social: {
    github: "https://github.com/amanj-hub",
    linkedin: "https://www.linkedin.com/in/aman-kumar-8b6143262/",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievements", href: "#achievements" },
    { label: "Activities", href: "#activities" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const stats = [
  { value: 3, suffix: "+", label: "full-stack projects" },
  { value: 20, suffix: "+", label: "technologies explored" },
  { value: 4, suffix: "", label: "professional certificates" },
  { value: 2, suffix: "+", label: "years building" },
];

export const about = {
  lead: "I build full-stack products that make complex work simpler, from AI-assisted recruitment workflows to accessible legal-awareness tools.",
  body: "I work across React, Node.js, Express.js, and MongoDB to turn an idea into a dependable end-to-end application. I’m most interested in combining practical backend systems with artificial intelligence to create useful, user-focused solutions.",
  currently: [
    { label: "Currently building", value: "Practical full-stack and AI-powered web applications" },
    { label: "Currently learning", value: "Generative AI, REST APIs, and backend systems" },
    { label: "Open to", value: "Internships and software development opportunities" },
  ],
} as const;

export const skillGroups = [
  {
    title: "Frontend",
    icon: "Layout",
    skills: ["React", "JavaScript", "HTML", "CSS", "Redux Toolkit"],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "MERN Stack"],
  },
  {
    title: "Data & AI",
    icon: "Database",
    skills: ["MongoDB", "Google Gemini", "AI/ML", "PDF Processing", "Web Speech API"],
  },
  {
    title: "Languages & Tools",
    icon: "Wrench",
    skills: ["C++", "Python", "C", "Java", "Git", "GitHub", "Linux"],
  },
] as const;

export const projects: Project[] = [
  {
    name: "Smart Recruitment Portal",
    eyebrow: "Enterprise recruitment platform",
    description:
      "An enterprise-grade recruitment portal that automates resume parsing and candidate shortlisting while giving recruiters, candidates, and administrators dedicated workflows.",
    problem:
      "Recruitment teams needed a structured way to evaluate applications by skills, experience, education, and keywords instead of manually reviewing every resume.",
    stack: ["MERN Stack", "Redux Toolkit", "JWT", "PDF Processing", "Chart.js"],
    visual: "orbit",
    accent: "violet",
  },
  {
    name: "LegalBot India",
    eyebrow: "Generative AI legal awareness",
    description:
      "A Hinglish AI chatbot that helps people understand Indian laws and women’s safety resources through text and voice interaction.",
    problem:
      "Legal information and safety resources can be difficult to understand or access quickly in urgent situations.",
    stack: ["Node.js", "Express.js", "Google Gemini", "JavaScript", "Web Speech API"],
    liveUrl: "https://legalbot-ai-chatbot.onrender.com/",
    githubUrl: "https://github.com/Yash-Yadav0/LEGALBOT-AI-CHATBOT",
    visual: "ledger",
    accent: "cyan",
  },
  {
    name: "Lessons Learned Management System",
    eyebrow: "Knowledge management platform",
    description:
      "A full-stack workspace for documenting project insights and learning resources, with AI-powered recommendations to make knowledge easier to reuse.",
    problem:
      "Project lessons and resources were hard to find, filter, and connect to the work people were doing.",
    stack: ["JavaScript", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT"],
    githubUrl: "https://github.com/amanj-hub/llms-project",
    visual: "pulse",
    accent: "lime",
  },
];

export const featuredProject = {
  name: "Smart Recruitment Portal",
  type: "Featured project · 2026",
  headline: "Making candidate evaluation more structured and efficient.",
  summary:
    "A full-stack recruitment platform that brings resume parsing, rule-based shortlisting, interview coordination, and application tracking into one workflow.",
  problem:
    "Reviewing candidate resumes across skills, experience, education, and job-specific keywords takes time and can be difficult to keep consistent.",
  solution:
    "I built dedicated recruiter, candidate, and administrator dashboards around an automated resume-parsing and suitability-evaluation flow.",
  features: ["Rule-based AI candidate shortlisting", "Resume parsing and CSV export", "Interview scheduling and analytics"],
  stack: ["React", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "JWT"],
  outcome:
    "A centralized recruitment workflow with application tracking, suitability evaluation, and clear role-specific dashboards.",
};

export const experiences = [
  {
    period: "Jun 2026 — Jul 2026",
    role: "MERN Stack Development with Artificial Intelligence",
    organization: "Centre for Professional Enhancement, Lovely Professional University",
    description:
      "Completed hands-on training in full-stack development and AI-enabled application workflows.",
    technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    contributions: [
      "Developed web applications using JavaScript, Node.js, Express.js, and MongoDB.",
      "Implemented RESTful APIs, server-side routing, middleware, authentication, and database integration.",
    ],
  },
] as const;

export const achievements = [
  {
    title: "MERN Stack with AI",
    type: "Certificate · Jul 2026",
    description: "Centre for Professional Enhancement, Lovely Professional University.",
    icon: "Award",
  },
  {
    title: "Database Management System",
    type: "Certificate · Jul 2026",
    description: "Completed certification with Infosys.",
    icon: "Database",
  },
  {
    title: "Introduction to AI & ML",
    type: "Certificate · Mar 2025",
    description: "Completed foundational artificial intelligence and machine learning training with Skillera.",
    icon: "BrainCircuit",
  },
  {
    title: "Ethical Hacking",
    type: "Certificate · Jan 2025",
    description: "Completed certification with Rising Tech Pro.",
    icon: "ShieldCheck",
  },
] as const;

export const education = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    school: "Lovely Professional University, Phagwara, Punjab",
    period: "Aug 2024 — Present",
    note: "CGPA: 6.99",
    coursework: ["Computer science", "Full-stack development", "AI-powered applications"],
  },
  {
    degree: "Intermediate",
    school: "Hellens Public School, Sitamarhi, Bihar",
    period: "Mar 2023 — May 2024",
    note: "Percentage: 69.9%",
    coursework: ["Higher secondary education"],
  },
  {
    degree: "Matriculation",
    school: "S.R.D.A.V Public School, Sitamarhi, Bihar",
    period: "Mar 2021 — May 2022",
    note: "Percentage: 77.9%",
    coursework: ["Secondary education"],
  },
] as const;

export const repositoryHighlights = [
  {
    name: "llms-project",
    language: "JavaScript",
    description: "Lessons Learned Management System with AI-powered recommendations.",
    url: "https://github.com/amanj-hub/llms-project",
  },
  {
    name: "LEGALBOT-AI-CHATBOT",
    language: "JavaScript",
    description: "Generative AI legal-awareness chatbot for Indian laws and women’s safety.",
    url: "https://github.com/Yash-Yadav0/LEGALBOT-AI-CHATBOT",
  },
] as const;
