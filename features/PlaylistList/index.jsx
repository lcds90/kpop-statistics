import { useEffect, useMemo, useRef, useState } from 'react';
import styles from 'styles/PlaylistList.module.css';
import { gsap } from 'gsap';
import Card from './Card';

// LINK https://javascript.plainenglish.io/react-functions-gsap-timelines-and-hooks-oh-my-ec7620b6bdc6

const PlaylistList = ({ list }) => {
  const [order, setOrder] = useState('ascDate');
  const [items, setItems] = useState([]);
  const cardsRef = useRef(0);
  const timeline = useMemo(() => gsap.timeline({ paused: true }), []);
  useEffect(() => {
    setItems(list);
    timeline.from(cardsRef.current.childNodes, {
      y: -500,
      opacity: 0,
      duration: 0.7,
      stagger: 0.25,
    });
    timeline.play();
  }, [list]);

  const handleOrder = ({ target: { value }}) => {
    const verifyOrder = {
      ascDate: () => list.sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)),
      descDate: () => list.sort((a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt)),
      asc: () => list.sort((a, b) => a.snippet.title.localeCompare(b.snippet.title)),
      desc: () => list.sort((a, b) => b.snippet.title.localeCompare(a.snippet.title)),
    };
    setOrder(value);
    setItems(verifyOrder[value]());
  }

  return (
    <>
    <section ref={cardsRef} className={styles.section}>
    <div className={styles.div}>
      <select onChange={handleOrder} value={order}>
        <option value="ascDate">Por mais novo</option>
        <option value="descDate">Por mais antigo</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>
      </div>
      {
      order === 'original'
      ? list.map((playlist) => <Card playlist={playlist} key={playlist.id} />)
      : items.map((playlist) => <Card playlist={playlist} key={playlist.id} />)}
    </section>
    </>
  );
};

export default PlaylistList;
