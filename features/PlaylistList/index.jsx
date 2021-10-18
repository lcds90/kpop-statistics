import { useEffect, useMemo, useRef } from 'react';
import Card from './Card';
import styles from 'styles/PlaylistList.module.css';
import { gsap } from 'gsap';

// LINK https://javascript.plainenglish.io/react-functions-gsap-timelines-and-hooks-oh-my-ec7620b6bdc6

const PlaylistList = ({ list }) => {
  const cardsRef = useRef(0);
  const listItem = [];
  const timeline = useMemo(() => gsap.timeline({ paused: true }), []);
  useEffect(() => {
    timeline.from(cardsRef.current.childNodes, {
      x: -50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1
    })
    timeline.play();
  }, [list]);

  return (
    <section ref={cardsRef} className={styles.section}>
      {list.map((playlist) => <Card playlist={playlist} key={playlist.id} />)}
    </section>
  );
};

export default PlaylistList;
