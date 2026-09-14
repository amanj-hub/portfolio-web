import { Award, Shield, Users } from "lucide-react";
import type { ActivityItem } from "@/config/extracurricular";
import { ActivityMediaGallery } from "./activity-media";

type SubSectionProps = {
  activity: ActivityItem;
  embedded?: boolean;
};

const pillarIcons = [Shield, Award, Users];

export function NccSection({ activity, embedded = false }: SubSectionProps) {
  return (
    <article
      id="extracurricular-ncc"
      className={`activity-card activity-card--ncc ${embedded ? "activity-card--embedded" : ""}`}
      aria-labelledby="activity-ncc-title"
    >
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
        <p className="activity-card__intro">{activity.description}</p>

        <div className="activity-pillars">
          {activity.pillars.map((pillar, idx) => {
            const IconComponent = pillarIcons[idx % pillarIcons.length];
            return (
              <div className="activity-pillar" key={pillar.title}>
                <div className="activity-pillar__icon">
                  <IconComponent size={16} aria-hidden="true" />
                </div>
                <div className="activity-pillar__content">
                  <h4 className="activity-pillar__title">{pillar.title}</h4>
                  <p className="activity-pillar__text">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {activity.stats && activity.stats.length > 0 ? (
          <div className="activity-stats">
            {activity.stats.map((stat) => (
              <div className="activity-stat" key={stat.label}>
                <strong className="activity-stat__val">{stat.value}</strong>
                <span className="activity-stat__lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        {activity.timeline && activity.timeline.length > 0 ? (
          <div className="activity-timeline">
            {activity.timeline.map((item) => (
              <div className="activity-timeline__item" key={item.title}>
                <span className="activity-timeline__period">{item.period}</span>
                <h5 className="activity-timeline__heading">{item.title}</h5>
                <p className="activity-timeline__desc">{item.description}</p>
              </div>
            ))}
          </div>
        ) : null}

        <ActivityMediaGallery
          media={activity.media}
          placeholderText={activity.mediaPlaceholderText}
          folderPath={activity.folderPath}
          activityTitle={activity.title}
        />
      </div>
    </article>
  );
}
