import React from 'react';
import Link from 'next/link';
import styles from 'styles/PlaylistList.module.css';

const PlaylistCard = ({ playlist }) => {
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
    href={{
      pathname: 'playlist/[id]',
      query: { playlistId: id }
    }} as={`playlist/${title.toLowerCase().replace(/\s/g, '-')}`}>
      <section className={styles.card}>
        <h3>{title}</h3>
        <article>
          <div
            className={styles.cardBackground}
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
          {description}
          <h4>Published</h4>
          <h5>{`by ${channelTitle} `}</h5>
          <h6>{`at ${published()}`}</h6>
        </article>
      </section>
    </Link>
  );
};

export default PlaylistCard;
