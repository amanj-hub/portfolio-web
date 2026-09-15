export type ActivityMedia = {
  src: string;
  alt: string;
  caption?: string;
};

export type ActivityPillar = {
  category?: string;
  title: string;
  description: string;
  iconName?: "shield" | "award" | "users" | "target" | "compass" | "activity" | "check";
};

export type ActivityAchievement = {
  title: string;
  category: "Certificate" | "Camp" | "Event" | "Competition" | "Rank" | "Award" | string;
  issuer?: string;
  date?: string;
  description?: string;
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

export type ActivityMilestone = {
  title: string;
  category?: "Milestone" | "Personal Record" | "Challenge" | "Goal" | "Progress" | string;
  metric?: string;
  date?: string;
  note?: string;
};

export type RunningRace = {
  name: string;
  distance?: string;
  event?: string;
  date?: string;
  location?: string;
  finishTime?: string;
  personalBest?: boolean;
  position?: string;
  notes?: string;
};

export type RunningTimelineItem = {
  year: string;
  event: string;
  distance: string;
  result?: string;
  note?: string;
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
  // Optional achievements, milestones, races, runningTimeline, stats and timeline (empty by default - no fake entries)
  achievements?: ActivityAchievement[];
  milestones?: ActivityMilestone[];
  races?: RunningRace[];
  runningTimeline?: RunningTimelineItem[];
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
      subtitle: "Cadet Training, Leadership & Character Building",
      badge: "Discipline · Leadership · Resilience",
      themeAccent: "ncc",
      description:
        "My involvement in the National Cadet Corps (NCC) has been a cornerstone in developing unshakeable discipline, situational leadership, and mutual accountability. Through structured drill protocol, squad coordination, and rigorous training routines, the cadet experience instilled the mental resilience to remain composed under pressure, execute team responsibilities with precision, and lead with clarity.",
      pillars: [
        {
          category: "Discipline",
          title: "Standards & Precision",
          description:
            "Practicing uncompromising punctuality, drill coordination, uniform etiquette, and high personal standards of order.",
          iconName: "shield",
        },
        {
          category: "Leadership",
          title: "Command & Decision-Making",
          description:
            "Guiding squads through synchronized movements, communicating with clarity, and maintaining poise in fast-paced scenarios.",
          iconName: "compass",
        },
        {
          category: "Teamwork",
          title: "Unit Cohesion & Trust",
          description:
            "Operating with mutual reliance across diverse teams, prioritizing group objectives, and supporting peers through demanding tasks.",
          iconName: "users",
        },
        {
          category: "Training",
          title: "Drills & Physical Readiness",
          description:
            "Participating in rigorous physical conditioning, endurance drills, obstacle handling, and institutional field protocol.",
          iconName: "target",
        },
        {
          category: "Responsibility",
          title: "Duty & Accountability",
          description:
            "Carrying out institutional duties with integrity, honoring commitments, and stepping up with dependability whenever needed.",
          iconName: "check",
        },
      ],
      // Optional Achievements & Certifications (Empty by default - no invented entries)
      // Add your verified certificates, camps, ranks, or awards here:
      achievements: [
        /*
        {
          title: "Combined Annual Training Camp (CATC)",
          category: "Camp",
          issuer: "NCC Directorate",
          date: "2023",
          description: "Completed intensive residential camp training focusing on weapon training, drill, and field craft.",
        },
        {
          title: "NCC 'A' / 'B' / 'C' Certificate Examination",
          category: "Certificate",
          issuer: "Ministry of Defence",
          date: "2024",
          description: "Qualified certificate examination demonstrating proficiency in cadet training and leadership.",
        },
        */
      ],
      // Optional Timeline (Empty by default - no invented entries)
      timeline: [
        /*
        {
          period: "2022 — Present",
          title: "Senior Division Cadet",
          description: "Active cadet participating in regular parades, ceremonial drills, and community service initiatives.",
        },
        */
      ],
      // Add your NCC photographs placed in /public/extracurricular/ncc/ here:
      media: [
        /*
        {
          src: "/extracurricular/ncc/parade-drill.jpg",
          alt: "NCC drill parade in uniform",
          caption: "Morning squad drill during annual camp training",
        },
        */
      ],
      mediaPlaceholderText:
        "Add your NCC parade, camp, drill, or uniform photos to /public/extracurricular/ncc/",
      folderPath: "public/extracurricular/ncc/",
    },
    {
      id: "gym",
      tabLabel: "Gym & Fitness",
      title: "Gym & Fitness",
      subtitle: "Lifestyle Conditioning, Discipline & Everyday Consistency",
      badge: "Consistency · Self-Discipline · Personal Growth",
      themeAccent: "gym",
      description:
        "For me, fitness is an essential anchor for everyday discipline, mental clarity, and sustainable energy. Consistent physical training demands showing up on ordinary days, executing deliberate movements with precision, and embracing incremental progression. That steady process directly fuels daily stamina, reinforces personal accountability, and builds the patience required to solve difficult engineering problems.",
      pillars: [
        {
          category: "Routine",
          title: "Structured Daily Regimen",
          description:
            "Maintaining scheduled training blocks throughout the week to protect physical readiness and mental focus.",
          iconName: "target",
        },
        {
          category: "Consistency",
          title: "Process Over Motivation",
          description:
            "Prioritizing repeatable habits and disciplined follow-through over fleeting emotional motivation.",
          iconName: "compass",
        },
        {
          category: "Strength",
          title: "Deliberate Functional Work",
          description:
            "Focusing on compound movements, clean form, and progressive physical capability built over time.",
          iconName: "shield",
        },
        {
          category: "Conditioning",
          title: "Stamina & Daily Vitality",
          description:
            "Balancing strength workouts with cardiovascular endurance to sustain high work capacity and daily energy.",
          iconName: "activity",
        },
        {
          category: "Recovery",
          title: "Sustainable Longevity",
          description:
            "Valuing restful sleep, disciplined nutrition, and active recovery to prevent burnout and maintain long-term health.",
          iconName: "check",
        },
      ],
      // Optional Milestones, Personal Records & Goals (Empty by default - no fake numbers or invented statistics)
      // Add your verified fitness milestones or training goals here:
      milestones: [
        /*
        {
          title: "Consistent Weekly Training Schedule",
          category: "Milestone",
          metric: "4-5 sessions / week",
          note: "Maintained steady training adherence alongside academic and development deadlines",
        },
        {
          title: "Clean Form on Compound Lifts",
          category: "Personal Record",
          metric: "Form Mastery",
          note: "Prioritizing injury prevention, controlled tempo, and functional mechanics",
        },
        */
      ],
      // Add your gym photographs placed in /public/extracurricular/gym/ here:
      media: [
        {
          src: "/extracurricular/gym/gym-silhouette-flex.png",
          alt: "Gym physique conditioning silhouette double biceps pose",
          caption: "Strength conditioning & physique silhouette — Consistency and dedication",
        },
        {
          src: "/extracurricular/gym/gym-workout-mirror.png",
          alt: "Gym workout mirror training focus",
          caption: "Gym training focus — Everyday discipline, routine workouts and steady progression",
        },
      ],
      mediaPlaceholderText:
        "Add your workout, gym, conditioning, or training photos to /public/extracurricular/gym/",
      folderPath: "public/extracurricular/gym/",
    },
    {
      id: "marathons",
      tabLabel: "Marathons & Running",
      title: "Marathons & Distance Running",
      subtitle: "Endurance Training, Pacing Strategy & Mental Grit",
      badge: "Endurance · Resilience · Goal Execution",
      themeAccent: "marathons",
      description:
        "Distance running has been a profound practice in pacing, cardiovascular endurance, and mental grit. Whether logging early morning training miles or pushing through late fatigue barriers, distance running reinforces the discipline to sustain effort when comfort fades, manage energy splits deliberately, and remain committed to long-term physical goals. The resilience forged on the road translates directly into how I navigate complex engineering challenges.",
      pillars: [
        {
          category: "Pacing",
          title: "Split & Energy Management",
          description:
            "Carefully balancing energy output, respecting split paces, and developing the discipline to sustain performance over long mileage.",
          iconName: "target",
        },
        {
          category: "Endurance",
          title: "Cardiovascular Stamina",
          description:
            "Building aerobic threshold, respiratory health, and the physical stamina to power through demanding distances.",
          iconName: "activity",
        },
        {
          category: "Mental Grit",
          title: "Fatigue Threshold Resilience",
          description:
            "Conditioning the mind to break through psychological fatigue walls and keep strong forward momentum.",
          iconName: "compass",
        },
        {
          category: "Consistency",
          title: "Structured Mileage Blocks",
          description:
            "Accumulating steady weekly training mileage through disciplined scheduling, rain or shine.",
          iconName: "shield",
        },
        {
          category: "Goal Execution",
          title: "Race-Day Preparation & Focus",
          description:
            "Setting clear event targets, sticking to training periodization, and seeing demanding races through to the finish.",
          iconName: "check",
        },
      ],
      // Optional Running Highlights / Race Log (Empty by default - no fake race results or invented statistics)
      // Add your real races, runs, or events here:
      races: [
        /*
        {
          name: "City Half Marathon",
          distance: "21.1 km",
          event: "Annual City Marathon",
          date: "October 2024",
          location: "New Delhi",
          finishTime: "1h 52m",
          personalBest: true,
          position: "Top 15%",
          notes: "Maintained even 5:18/km splits throughout",
        },
        */
      ],
      // Optional Achievements & Medals (Empty by default - no fake entries)
      achievements: [
        /*
        {
          title: "Half Marathon Official Finisher Medal",
          category: "Medal",
          date: "2024",
          description: "Completed full 21.1 km course under official timing guidelines.",
        },
        */
      ],
      // Optional Running Timeline (Empty by default - no fake entries)
      runningTimeline: [
        /*
        {
          year: "2024",
          event: "Delhi Half Marathon",
          distance: "21.1 km",
          result: "Official Finisher",
          note: "First sub-2h official half marathon",
        },
        */
      ],
      // Add your marathon/running photographs placed in /public/extracurricular/marathons/ here:
      media: [
        {
          src: "/extracurricular/marathons/surya-spiti-challenge-run.jpg",
          alt: "Surya Spiti Challenge high-altitude marathon run along the Sumdo route",
          caption: "Surya Spiti Challenge — High-altitude endurance run passing Sumdo in Spiti Valley",
        },
        {
          src: "/extracurricular/marathons/surya-spiti-challenge-flag.jpg",
          alt: "Surya Spiti Challenge finishers holding the Indian National Flag",
          caption: "Surya Spiti Challenge — Finishers holding the Indian Tricolour at the high-altitude finish",
        },
        {
          src: "/extracurricular/marathons/raftaar-marathon-timed-run.jpg",
          alt: "Raftaar 2.0 Timed Run finishers squad displaying official medals and bibs",
          caption: "Raftaar 2.0 Timed Run — Finisher celebration with team medals and official race bibs",
        },
      ],
      mediaPlaceholderText:
        "Add your race-day, running, medal, or event photos to /public/extracurricular/marathons/",
      folderPath: "public/extracurricular/marathons/",
    },
  ],
};
