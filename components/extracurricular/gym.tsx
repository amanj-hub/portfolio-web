import {
  Activity,
  CalendarCheck,
  CheckCircle2,
  Compass,
  Dumbbell,
  Flame,
  HeartPulse,
  Shield,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import type { ActivityItem, ActivityMilestone, ActivityPillar } from "@/config/extracurricular";
import { ActivityMediaGallery } from "./activity-media";

type SubSectionProps = {
  activity: ActivityItem;
  embedded?: boolean;
};

// Map pillar icons for Gym & Fitness
function getGymPillarIcon(iconName?: ActivityPillar["iconName"], index = 0) {
  switch (iconName) {
    case "target":
      return CalendarCheck;
    case "compass":
      return Flame;
    case "shield":
      return Dumbbell;
    case "activity":
      return HeartPulse;
    case "check":
      return CheckCircle2;
    default: {
      const fallbackList = [Dumbbell, Flame, TrendingUp, HeartPulse, Target];
      return fallbackList[index % fallbackList.length];
    }
  }
}

// Map milestone category to icon
function getMilestoneIcon(category?: string) {
  const cat = (category || "").toLowerCase();
  if (cat.includes("record") || cat.includes("pr")) return Trophy;
  if (cat.includes("challenge")) return Zap;
  if (cat.includes("goal")) return Target;
  return TrendingUp;
}

export function GymSection({ activity, embedded = false }: SubSectionProps) {
  const hasMilestones = Boolean(activity.milestones && activity.milestones.length > 0);
  const hasStats = Boolean(activity.stats && activity.stats.length > 0);

  return (
    <article
      id="extracurricular-gym"
      className={`activity-card activity-card--gym ${embedded ? "activity-card--embedded" : ""}`}
      aria-labelledby="activity-gym-title"
    >
      {/* 1. Gym & Fitness Header */}
      <header className="activity-card__header">
        <div className="activity-card__title-group">
          <div className="activity-badge activity-badge--gym">
            <Dumbbell size={14} aria-hidden="true" />
            <span>{activity.badge}</span>
          </div>
          <h3 id="activity-gym-title" className="activity-card__title">
            {activity.title}
          </h3>
          <p className="activity-card__subtitle">{activity.subtitle}</p>
        </div>
      </header>

      <div className="activity-card__body">
        {/* 2. Short Personal Introduction */}
        <section className="activity-card__intro-block" aria-label="Gym & Fitness Overview">
          <p className="activity-card__intro">{activity.description}</p>
        </section>

        {/* 3. Fitness Highlights */}
        {activity.pillars && activity.pillars.length > 0 && (
          <section className="gym-section-block" aria-labelledby="gym-highlights-title">
            <div className="gym-block-header">
              <h4 id="gym-highlights-title" className="gym-block-title">
                Fitness Highlights
              </h4>
              <span className="gym-block-subtitle">Core principles, training focus & routine</span>
            </div>

            <div className="activity-pillars activity-pillars--gym">
              {activity.pillars.map((pillar, idx) => {
                const IconComponent = getGymPillarIcon(pillar.iconName, idx);
                return (
                  <div className="activity-pillar activity-pillar--gym" key={pillar.title}>
                    <div className="activity-pillar__header">
                      {pillar.category ? (
                        <span className="activity-pillar__category activity-pillar__category--gym">
                          {pillar.category}
                        </span>
                      ) : null}
                      <div className="activity-pillar__icon activity-pillar__icon--gym">
                        <IconComponent size={16} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="activity-pillar__content">
                      <h5 className="activity-pillar__title">{pillar.title}</h5>
                      <p className="activity-pillar__text">{pillar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 4. Optional Milestones, Personal Records & Statistics (Only renders if user provides them) */}
        {hasMilestones && (
          <section className="gym-section-block" aria-labelledby="gym-milestones-title">
            <div className="gym-block-header">
              <h4 id="gym-milestones-title" className="gym-block-title">
                Milestones & Progress
              </h4>
              <span className="gym-block-subtitle">Personal records, training goals & progress markers</span>
            </div>

            <div className="gym-milestones-grid">
              {activity.milestones!.map((item, idx) => {
                const MilestoneIcon = getMilestoneIcon(item.category);
                return (
                  <div className="gym-milestone-card" key={`${item.title}-${idx}`}>
                    <div className="gym-milestone-card__header">
                      <span className="gym-milestone-card__badge">
                        <MilestoneIcon size={12} aria-hidden="true" />
                        <span>{item.category || "Milestone"}</span>
                      </span>
                      {item.date && (
                        <span className="gym-milestone-card__date">{item.date}</span>
                      )}
                    </div>
                    <h5 className="gym-milestone-card__title">{item.title}</h5>
                    {item.metric && (
                      <div className="gym-milestone-card__metric">{item.metric}</div>
                    )}
                    {item.note && (
                      <p className="gym-milestone-card__note">{item.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Optional verified stats if provided */}
        {hasStats && (
          <div className="activity-stats">
            {activity.stats!.map((stat) => (
              <div className="activity-stat" key={stat.label}>
                <strong className="activity-stat__val">{stat.value}</strong>
                <span className="activity-stat__lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* 5. Photo Gallery with Fullscreen Lightbox */}
        <section className="gym-section-block" aria-labelledby="gym-gallery-title">
          <div className="gym-block-header">
            <h4 id="gym-gallery-title" className="gym-block-title">
              Photo Gallery
            </h4>
            <span className="gym-block-subtitle">Training sessions, conditioning & routine moments</span>
          </div>

          <ActivityMediaGallery
            media={activity.media}
            placeholderText={activity.mediaPlaceholderText}
            folderPath={activity.folderPath}
            activityTitle={activity.title}
          />
        </section>
      </div>
    </article>
  );
}
