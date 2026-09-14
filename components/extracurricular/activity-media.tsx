import Image from "next/image";
import { FolderPlus, Image as ImageIcon } from "lucide-react";
import type { ActivityMedia } from "@/config/extracurricular";

type ActivityMediaProps = {
  media: ActivityMedia[];
  placeholderText: string;
  folderPath: string;
  activityTitle: string;
};

export function ActivityMediaGallery({
  media,
  placeholderText,
  folderPath,
  activityTitle,
}: ActivityMediaProps) {
  if (!media || media.length === 0) {
    return (
      <div className="activity-media-empty">
        <div className="activity-media-empty__icon">
          <ImageIcon size={22} aria-hidden="true" />
        </div>
        <div className="activity-media-empty__content">
          <span className="activity-media-empty__title">Photo Gallery</span>
          <p className="activity-media-empty__text">{placeholderText}</p>
        </div>
        <div className="activity-media-empty__hint">
          <FolderPlus size={14} aria-hidden="true" />
          <code>{folderPath}</code>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-gallery">
      {media.map((item, index) => (
        <figure className="activity-gallery__item" key={`${item.src}-${index}`}>
          <div className="activity-gallery__frame">
            <Image
              src={item.src}
              alt={item.alt || `${activityTitle} photograph ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="activity-gallery__image"
            />
          </div>
          {item.caption ? (
            <figcaption className="activity-gallery__caption">{item.caption}</figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
