import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Card } from "components";
import styles from "./PlaylistList.module.css";
import { fetchPlaylists } from "apis/youtube";
import { orderPlaylistBy } from "./utils";

const PlaylistList = () => {
  const [order, setOrder] = useState("ascDate");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const cardsRef = useRef<any>();
  const timeline = useMemo(
    () =>
      gsap.timeline({
        paused: true,
        repeat: 0,
      }),
    []
  );

  const animate = () => {
    timeline.from(cardsRef.current.childNodes, {
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
    });
    timeline.set(cardsRef.current.childNodes, {
      clearProps: "all",
    }); 
    timeline.play();
  }

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPlaylists();
      setPlaylists(data);
      animate();
    };

    fetch();
  }, []);

  const handleOrder = ({ target: { value } }) => {
    setOrder(value);
    setPlaylists(orderPlaylistBy[value](playlists));
  };

  return (
    <>
      <article className={styles.div}>
        <select
          disabled={!playlists.length}
          onChange={handleOrder}
          value={order}
        >
          <option value="ascDate">Por mais novo</option>
          <option value="descDate">Por mais antigo</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </article>
      <article className={styles.section} ref={cardsRef}>
        {!playlists.length ? (
          <div>Carregando...</div>
        ) : (
          playlists.map((playlist: any) => (
            <Card playlist={playlist} key={playlist.id} />
          ))
        )}
      </article>
    </>
  );
};

export default PlaylistList;
