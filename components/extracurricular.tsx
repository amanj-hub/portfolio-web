"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity as ActivityIcon, Dumbbell, LayoutGrid, Shield } from "lucide-react";
import { useState } from "react";
import { extracurricularConfig } from "@/config/extracurricular";
import { SectionHeading } from "@/components/ui/section-heading";
import { GymSection } from "./extracurricular/gym";
import { MarathonsSection } from "./extracurricular/marathons";
import { NccSection } from "./extracurricular/ncc";

type TabId = "all" | "ncc" | "gym" | "marathons";

const tabs: { id: TabId; label: string; icon: typeof LayoutGrid }[] = [
  { id: "all", label: "All Activities", icon: LayoutGrid },
  { id: "ncc", label: "NCC", icon: Shield },
  { id: "gym", label: "Gym & Fitness", icon: Dumbbell },
  { id: "marathons", label: "Marathons & Running", icon: ActivityIcon },
];

export function ExtraCurricular() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const { sectionTitle, eyebrow, intro, activities } = extracurricularConfig;

  const nccActivity = activities.find((a) => a.id === "ncc")!;
  const gymActivity = activities.find((a) => a.id === "gym")!;
  const marathonsActivity = activities.find((a) => a.id === "marathons")!;

  return (
    <section id="activities" className="section extracurricular-section" aria-labelledby="activities-title">
      <div className="shell">
        <SectionHeading
          index="07"
          eyebrow={eyebrow}
          title={<span id="activities-title">{sectionTitle}</span>}
          description={intro}
        />

        {/* Sub-section Segmented Navigation */}
        <div className="activity-nav-wrapper">
          <nav
            className="activity-tabs"
            role="tablist"
            aria-label="Extra-curricular activity filters"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`activity-tabpanel-${tab.id}`}
                  className={`activity-tab ${isActive ? "activity-tab--active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Display with Framer Motion */}
        <div
          id={`activity-tabpanel-${activeTab}`}
          role="tabpanel"
          className="activity-tabpanel"
        >
          <AnimatePresence mode="wait">
            {activeTab === "all" && (
              <motion.div
                key="all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="activity-all-grid"
              >
                <NccSection activity={nccActivity} embedded={false} />
                <GymSection activity={gymActivity} embedded={false} />
                <MarathonsSection activity={marathonsActivity} embedded={false} />
              </motion.div>
            )}

            {activeTab === "ncc" && (
              <motion.div
                key="ncc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <NccSection activity={nccActivity} />
              </motion.div>
            )}

            {activeTab === "gym" && (
              <motion.div
                key="gym"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <GymSection activity={gymActivity} />
              </motion.div>
            )}

            {activeTab === "marathons" && (
              <motion.div
                key="marathons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <MarathonsSection activity={marathonsActivity} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
