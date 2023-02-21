import React from "react";
import Link from "next/link";
import styles from "./Card.module.css";
import { useTranslation } from "react-i18next";
import { storage } from "helpers";

const PlaylistCard = ({ playlist, ...props }) => {
  const { t } = useTranslation("common");
  const {
    id,
    snippet: {
      channelTitle,
      description,
      publishedAt,
      thumbnails: {
        high: { url: thumbnail },
      },
      title,
    },
  } = playlist;
  const published = () => {
    const date = new Date(publishedAt);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  };
  return (
    <Link
      {...props}
      href={{
        pathname: "playlist/[id]",
        query: { playlistId: id },
      }}
      as={`playlist/${title.toLowerCase().replace(/\s/g, "-")}`}
      onClick={() => storage.set("playlistId", id)}
    >
      <section
        style={{ backgroundImage: `url(${thumbnail})` }}
        className={styles.card}
        title={title}
      >
        <h3>{title}</h3>
        <article>
          <p>{description}</p>
          <h4>{`${t("playlist.by")} ${channelTitle} `}</h4>
          <h5>{`${t("playlist.at")} ${published()}`}</h5>
        </article>
      </section>
    </Link>
  );
};

export default PlaylistCard;
