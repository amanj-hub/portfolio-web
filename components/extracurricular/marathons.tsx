import {
  Activity as ActivityIcon,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Flag,
  Flame,
  MapPin,
  Medal,
  Milestone,
  Shield,
  Target,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import type { ActivityItem, ActivityPillar } from "@/config/extracurricular";
import { ActivityMediaGallery } from "./activity-media";

type SubSectionProps = {
  activity: ActivityItem;
  embedded?: boolean;
};

// Map pillar icons for Marathons & Running
function getRunningPillarIcon(iconName?: ActivityPillar["iconName"], index = 0) {
  switch (iconName) {
    case "target":
      return Timer;
    case "activity":
      return ActivityIcon;
    case "compass":
      return Zap;
    case "shield":
      return Compass;
    case "check":
      return Flag;
    default: {
      const fallbackList = [Timer, ActivityIcon, Zap, Compass, Flag];
      return fallbackList[index % fallbackList.length];
    }
  }
}

// Map achievement category to icon
function getRunningAchievementIcon(category?: string) {
  const cat = (category || "").toLowerCase();
  if (cat.includes("medal")) return Medal;
  if (cat.includes("marathon")) return Flag;
  if (cat.includes("best") || cat.includes("pb")) return Trophy;
  return Award;
}

export function MarathonsSection({ activity, embedded = false }: SubSectionProps) {
  const hasRaces = Boolean(activity.races && activity.races.length > 0);
  const hasAchievements = Boolean(activity.achievements && activity.achievements.length > 0);
  const hasRunningTimeline = Boolean(activity.runningTimeline && activity.runningTimeline.length > 0);
  const hasLegacyTimeline = Boolean(activity.timeline && activity.timeline.length > 0);

  return (
    <article
      id="extracurricular-marathons"
      className={`activity-card activity-card--marathons ${
        embedded ? "activity-card--embedded" : ""
      }`}
      aria-labelledby="activity-marathons-title"
    >
      {/* 1. Marathons & Running Header */}
      <header className="activity-card__header">
        <div className="activity-card__title-group">
          <div className="activity-badge activity-badge--marathons">
            <Timer size={14} aria-hidden="true" />
            <span>{activity.badge}</span>
          </div>
          <h3 id="activity-marathons-title" className="activity-card__title">
            {activity.title}
          </h3>
          <p className="activity-card__subtitle">{activity.subtitle}</p>
        </div>
      </header>

      <div className="activity-card__body">
        {/* 2. Short Introduction */}
        <section className="activity-card__intro-block" aria-label="Running & Endurance Overview">
          <p className="activity-card__intro">{activity.description}</p>
        </section>

        {/* 3. Running Highlights */}
        {activity.pillars && activity.pillars.length > 0 && (
          <section className="marathons-section-block" aria-labelledby="marathons-highlights-title">
            <div className="marathons-block-header">
              <h4 id="marathons-highlights-title" className="marathons-block-title">
                Running Highlights
              </h4>
              <span className="marathons-block-subtitle">
                Core disciplines, pacing strategy & endurance mindset
              </span>
            </div>

            <div className="activity-pillars activity-pillars--marathons">
              {activity.pillars.map((pillar, idx) => {
                const IconComponent = getRunningPillarIcon(pillar.iconName, idx);
                return (
                  <div
                    className="activity-pillar activity-pillar--marathons"
                    key={pillar.title}
                  >
                    <div className="activity-pillar__header">
                      {pillar.category ? (
                        <span className="activity-pillar__category activity-pillar__category--marathons">
                          {pillar.category}
                        </span>
                      ) : null}
                      <div className="activity-pillar__icon activity-pillar__icon--marathons">
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

        {/* 4. Optional Races / Running Log (Only renders if user provides data) */}
        {hasRaces && (
          <section className="marathons-section-block" aria-labelledby="marathons-races-title">
            <div className="marathons-block-header">
              <h4 id="marathons-races-title" className="marathons-block-title">
                Races & Competitive Events
              </h4>
              <span className="marathons-block-subtitle">
                Official marathons, distance runs & event results
              </span>
            </div>

            <div className="marathons-races-grid">
              {activity.races!.map((race, idx) => (
                <div className="marathon-race-card" key={`${race.name}-${idx}`}>
                  <div className="marathon-race-card__header">
                    <div className="marathon-race-card__badges">
                      {race.distance && (
                        <span className="marathon-race-card__distance-badge">
                          {race.distance}
                        </span>
                      )}
                      {race.personalBest && (
                        <span className="marathon-race-card__pb-badge">
                          <Trophy size={11} aria-hidden="true" />
                          <span>PB</span>
                        </span>
                      )}
                    </div>
                    {race.date && (
                      <span className="marathon-race-card__date">{race.date}</span>
                    )}
                  </div>

                  <h5 className="marathon-race-card__name">{race.name}</h5>

                  {race.event && race.event !== race.name && (
                    <p className="marathon-race-card__event">{race.event}</p>
                  )}

                  <div className="marathon-race-card__meta">
                    {race.location && (
                      <span className="marathon-race-card__location">
                        <MapPin size={12} aria-hidden="true" />
                        <span>{race.location}</span>
                      </span>
                    )}
                    {race.finishTime && (
                      <span className="marathon-race-card__time">
                        <Clock size={12} aria-hidden="true" />
                        <span>{race.finishTime}</span>
                      </span>
                    )}
                    {race.position && (
                      <span className="marathon-race-card__pos">
                        <Medal size={12} aria-hidden="true" />
                        <span>{race.position}</span>
                      </span>
                    )}
                  </div>

                  {race.notes && (
                    <p className="marathon-race-card__notes">{race.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Optional Achievements & Medals (Only renders if user provides data) */}
        {hasAchievements && (
          <section className="marathons-section-block" aria-labelledby="marathons-achievements-title">
            <div className="marathons-block-header">
              <h4 id="marathons-achievements-title" className="marathons-block-title">
                Achievements & Medals
              </h4>
              <span className="marathons-block-subtitle">
                Finisher medals, distance milestones & verified accomplishments
              </span>
            </div>

            <div className="marathons-achievements-grid">
              {activity.achievements!.map((ach, idx) => {
                const AchIcon = getRunningAchievementIcon(ach.category);
                return (
                  <div className="marathon-achievement-card" key={`${ach.title}-${idx}`}>
                    <div className="marathon-achievement-card__header">
                      <span className="marathon-achievement-card__badge">
                        <AchIcon size={12} aria-hidden="true" />
                        <span>{ach.category || "Achievement"}</span>
                      </span>
                      {ach.date && (
                        <span className="marathon-achievement-card__date">{ach.date}</span>
                      )}
                    </div>
                    <h5 className="marathon-achievement-card__title">{ach.title}</h5>
                    {ach.description && (
                      <p className="marathon-achievement-card__desc">{ach.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. Optional Running Journey Timeline (Year → Event → Distance → Result) */}
        {hasRunningTimeline && (
          <section className="marathons-section-block" aria-labelledby="marathons-timeline-title">
            <div className="marathons-block-header">
              <h4 id="marathons-timeline-title" className="marathons-block-title">
                Running Journey Timeline
              </h4>
              <span className="marathons-block-subtitle">
                Chronological progression (Year → Event → Distance → Result)
              </span>
            </div>

            <div className="marathons-timeline">
              {activity.runningTimeline!.map((item, idx) => (
                <div className="marathons-timeline__row" key={`${item.event}-${idx}`}>
                  <span className="marathons-timeline__year">{item.year}</span>
                  <div className="marathons-timeline__content">
                    <div className="marathons-timeline__heading-group">
                      <h5 className="marathons-timeline__event">{item.event}</h5>
                      <span className="marathons-timeline__dist">{item.distance}</span>
                      {item.result && (
                        <span className="marathons-timeline__result">{item.result}</span>
                      )}
                    </div>
                    {item.note && (
                      <p className="marathons-timeline__note">{item.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Legacy generic timeline fallback if provided */}
        {hasLegacyTimeline && !hasRunningTimeline && (
          <div className="activity-timeline">
            {activity.timeline!.map((item) => (
              <div className="activity-timeline__item" key={item.title}>
                <span className="activity-timeline__period">{item.period}</span>
                <h5 className="activity-timeline__heading">{item.title}</h5>
                <p className="activity-timeline__desc">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* 7. Race / Event Photo Gallery with Fullscreen Lightbox */}
        <section className="marathons-section-block" aria-labelledby="marathons-gallery-title">
          <div className="marathons-block-header">
            <h4 id="marathons-gallery-title" className="marathons-block-title">
              Race & Training Gallery
            </h4>
            <span className="marathons-block-subtitle">
              Race days, training runs, medals & event moments
            </span>
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
