import {
  Award,
  Calendar,
  CheckCircle2,
  Compass,
  FileCheck,
  Flag,
  Medal,
  Shield,
  Target,
  Users,
} from "lucide-react";
import type { ActivityItem, ActivityPillar } from "@/config/extracurricular";
import { ActivityMediaGallery } from "./activity-media";

type SubSectionProps = {
  activity: ActivityItem;
  embedded?: boolean;
};

// Map icon names to Lucide icon components
function getPillarIcon(iconName?: ActivityPillar["iconName"], index = 0) {
  switch (iconName) {
    case "shield":
      return Shield;
    case "compass":
      return Compass;
    case "users":
      return Users;
    case "target":
      return Target;
    case "check":
      return CheckCircle2;
    case "award":
      return Award;
    default: {
      const fallbackList = [Shield, Compass, Users, Target, CheckCircle2];
      return fallbackList[index % fallbackList.length];
    }
  }
}

// Map achievement category to icon
function getAchievementIcon(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("certificate")) return FileCheck;
  if (cat.includes("camp")) return Flag;
  if (cat.includes("rank") || cat.includes("award")) return Medal;
  return Award;
}

export function NccSection({ activity, embedded = false }: SubSectionProps) {
  const hasAchievements = Boolean(activity.achievements && activity.achievements.length > 0);
  const hasTimeline = Boolean(activity.timeline && activity.timeline.length > 0);

  return (
    <article
      id="extracurricular-ncc"
      className={`activity-card activity-card--ncc ${embedded ? "activity-card--embedded" : ""}`}
      aria-labelledby="activity-ncc-title"
    >
      {/* 1. NCC Header */}
      <header className="activity-card__header">
        <div className="activity-card__title-group">
          <div className="activity-badge activity-badge--ncc">
            <Shield size={14} aria-hidden="true" />
            <span>{activity.badge}</span>
          </div>
          <h3 id="activity-ncc-title" className="activity-card__title">
            {activity.title}
          </h3>
          <p className="activity-card__subtitle">{activity.subtitle}</p>
        </div>
      </header>

      <div className="activity-card__body">
        {/* 2. Short Introduction */}
        <section className="activity-card__intro-block" aria-label="NCC Journey Overview">
          <p className="activity-card__intro">{activity.description}</p>
        </section>

        {/* 3. NCC Highlights */}
        {activity.pillars && activity.pillars.length > 0 && (
          <section className="ncc-section-block" aria-labelledby="ncc-highlights-title">
            <div className="ncc-block-header">
              <h4 id="ncc-highlights-title" className="ncc-block-title">
                Experience Highlights
              </h4>
              <span className="ncc-block-subtitle">Core qualities & training disciplines</span>
            </div>

            <div className="activity-pillars activity-pillars--ncc">
              {activity.pillars.map((pillar, idx) => {
                const IconComponent = getPillarIcon(pillar.iconName, idx);
                return (
                  <div className="activity-pillar activity-pillar--ncc" key={pillar.title}>
                    <div className="activity-pillar__header">
                      {pillar.category ? (
                        <span className="activity-pillar__category">{pillar.category}</span>
                      ) : null}
                      <div className="activity-pillar__icon">
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

        {/* 4. Optional Achievements & Certifications (Only renders if user provides them) */}
        {hasAchievements && (
          <section className="ncc-section-block" aria-labelledby="ncc-achievements-title">
            <div className="ncc-block-header">
              <h4 id="ncc-achievements-title" className="ncc-block-title">
                Achievements & Credentials
              </h4>
              <span className="ncc-block-subtitle">Recognized certifications, camps & ranks</span>
            </div>

            <div className="activity-achievements-grid">
              {activity.achievements!.map((ach, idx) => {
                const AchIcon = getAchievementIcon(ach.category);
                return (
                  <div className="activity-achievement-card" key={`${ach.title}-${idx}`}>
                    <div className="activity-achievement-card__header">
                      <span className="activity-achievement-card__badge">
                        <AchIcon size={12} aria-hidden="true" />
                        <span>{ach.category}</span>
                      </span>
                      {ach.date && (
                        <span className="activity-achievement-card__date">{ach.date}</span>
                      )}
                    </div>
                    <h5 className="activity-achievement-card__title">{ach.title}</h5>
                    {ach.issuer && (
                      <p className="activity-achievement-card__issuer">{ach.issuer}</p>
                    )}
                    {ach.description && (
                      <p className="activity-achievement-card__desc">{ach.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. Optional Timeline (Only renders if user provides them) */}
        {hasTimeline && (
          <section className="ncc-section-block" aria-labelledby="ncc-timeline-title">
            <div className="ncc-block-header">
              <h4 id="ncc-timeline-title" className="ncc-block-title">
                Cadet Timeline & Milestones
              </h4>
              <span className="ncc-block-subtitle">Chronological progression</span>
            </div>

            <div className="activity-timeline">
              {activity.timeline!.map((item, idx) => (
                <div className="activity-timeline__item" key={`${item.title}-${idx}`}>
                  <div className="activity-timeline__marker">
                    <Calendar size={13} aria-hidden="true" />
                    <span className="activity-timeline__period">{item.period}</span>
                  </div>
                  <h5 className="activity-timeline__heading">{item.title}</h5>
                  <p className="activity-timeline__desc">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Photo Gallery with Fullscreen Lightbox */}
        <section className="ncc-section-block" aria-labelledby="ncc-gallery-title">
          <div className="ncc-block-header">
            <h4 id="ncc-gallery-title" className="ncc-block-title">
              Photo Gallery
            </h4>
            <span className="ncc-block-subtitle">Drill sessions, camps & training moments</span>
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
