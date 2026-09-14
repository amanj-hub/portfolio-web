export type ActivityMedia = {
  src: string;
  alt: string;
  caption?: string;
};

export type ActivityPillar = {
  title: string;
  description: string;
};

export type ActivityStat = {
  label: string;
  value: string;
};

export type ActivityTimelineItem = {
  period: string;
  title: string;
  description: string;
};

export type ActivityItem = {
  id: "ncc" | "gym" | "marathons";
  tabLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  themeAccent: "ncc" | "gym" | "marathons";
  description: string;
  pillars: ActivityPillar[];
  // Optional stats and timeline (empty by default - no fake entries)
  stats?: ActivityStat[];
  timeline?: ActivityTimelineItem[];
  media: ActivityMedia[];
  mediaPlaceholderText: string;
  folderPath: string;
};

export const extracurricularConfig: {
  sectionTitle: string;
  eyebrow: string;
  intro: string;
  activities: ActivityItem[];
} = {
  sectionTitle: "Extra-Curricular Activities",
  eyebrow: "Personal Growth & Discipline",
  intro:
    "Activities outside academics and software engineering that shape mindset, cultivate rigorous discipline, physical endurance, teamwork, leadership under pressure, and continuous personal development.",
  activities: [
    {
      id: "ncc",
      tabLabel: "NCC",
      title: "National Cadet Corps (NCC)",
      subtitle: "Cadet Training & Civic Duty",
      badge: "Discipline · Leadership · Teamwork",
      themeAccent: "ncc",
      description:
        "Training with the National Cadet Corps provides a strong grounding in institutional discipline, structured drill, chain of command, and collaborative leadership. It emphasizes self-reliance, physical readiness, and dedication to collective responsibility.",
      pillars: [
        {
          title: "Discipline & Protocol",
          description:
            "Upholding strict standards of punctuality, drill coordination, and personal responsibility in uniform.",
        },
        {
          title: "Leadership Under Pressure",
          description:
            "Guiding squads, maintaining composure in fast-paced scenarios, and making clear, accountable decisions.",
        },
        {
          title: "Teamwork & Camaraderie",
          description:
            "Fostering mutual trust and seamless coordination across diverse teams working toward unified objectives.",
        },
      ],
      media: [],
      mediaPlaceholderText:
        "Add parade, camp, or field training photos to /public/extracurricular/ncc/",
      folderPath: "public/extracurricular/ncc/",
    },
    {
      id: "gym",
      tabLabel: "Gym & Fitness",
      title: "Gym & Strength Training",
      subtitle: "Physical Conditioning & Everyday Consistency",
      badge: "Consistency · Strength · Mental Focus",
      themeAccent: "gym",
      description:
        "Strength training serves as a daily practice of consistency, incremental progress, and mental resilience. The commitment required to show up regularly and execute deliberate reps mirrors the patience needed to architect and debug complex software systems.",
      pillars: [
        {
          title: "Daily Consistency",
          description:
            "Building high-performance routines and executing training regimens regardless of short-term motivation.",
        },
        {
          title: "Progressive Overload",
          description:
            "Focusing on steady, measurable, incremental advancements through disciplined tracking and technique.",
        },
        {
          title: "Mental Fortitude",
          description:
            "Developing focus, resilience against physical exhaustion, and prioritizing holistic physical recovery.",
        },
      ],
      media: [],
      mediaPlaceholderText:
        "Add workout, training, or fitness photos to /public/extracurricular/gym/",
      folderPath: "public/extracurricular/gym/",
    },
    {
      id: "marathons",
      tabLabel: "Marathons & Running",
      title: "Marathons & Distance Running",
      subtitle: "Endurance, Pacing Strategy & Mental Grit",
      badge: "Endurance · Resilience · Goal Execution",
      themeAccent: "marathons",
      description:
        "Distance running is an exercise in pacing, energy distribution, and pushing past fatigue thresholds. It demands clear goal-setting, cardiovascular conditioning, and the mental grit to stay focused over long, solitary miles.",
      pillars: [
        {
          title: "Pacing Strategy",
          description:
            "Carefully balancing energy output and managing splits to sustain performance over long distances.",
        },
        {
          title: "Endurance & Resilience",
          description:
            "Conditioning the mind and body to break through mental fatigue barriers and keep forward momentum.",
        },
        {
          title: "Goal-Oriented Mileage",
          description:
            "Planning training blocks, accumulating steady mileage, and seeing demanding physical challenges through to the finish.",
        },
      ],
      media: [],
      mediaPlaceholderText:
        "Add marathon, marathon bib, run route, or event photos to /public/extracurricular/marathons/",
      folderPath: "public/extracurricular/marathons/",
    },
  ],
};
