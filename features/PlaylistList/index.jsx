import React from 'react';
import styles from 'styles/PlaylistList.module.css';
import Card from './Card';

const PlaylistList = ({ list }) => (
  <section className={styles.section}>
    {list.map(
      (playlist) => <Card key={playlist.id} playlist={playlist} />,
    )}
  </section>
);

export default PlaylistList;
