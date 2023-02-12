import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Card, Layout, OrderSelect } from "components";
import { fetchPlaylists } from "apis/youtube";
import { orderPlaylistBy } from "./utils";

const playlistListProps: LayoutProps = {
  as: "section",
  padding: {
    mobile: "small",
    tablet: "medium",
  },
  gap: {
    mobile: "small",
    tablet: "medium",
  },
  grid: {
    autofit: {
      minSize: "20rem",
      maxSize: "1fr",
    },
  },
};

const selectContainerProps: LayoutProps = {
  as: "article",
  flex: {
    align: "center",
    justify: "center",
  },
  padding: {
    mobile: "small",
    tablet: "medium",
  },
};

const animate = (timeline, selector) => {
  timeline.from(selector, {
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
  });
  timeline.set(selector, {
    clearProps: "all",
  });
  timeline.play();
};

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

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPlaylists();
      // setTimeout(() => {
      setPlaylists(data);
      // }, 100000);
      animate(timeline, cardsRef.current.childNodes);
    };

    fetch();
  }, []);

  const handleOrder = ({ target: { value } }) => {
    setOrder(value);
    setPlaylists(orderPlaylistBy[value](playlists));
  };

  return (
    <>
      <Layout {...selectContainerProps}>
        <OrderSelect
          disabled={!playlists.length}
          handler={handleOrder}
          value={order}
        />
      </Layout>
      <Layout {...playlistListProps} ref={cardsRef}>
        {!playlists.length ? (
          <div>Carregando...</div>
        ) : (
          playlists.map((playlist: any) => (
            <Card playlist={playlist} key={playlist.id} />
          ))
        )}
      </Layout>
    </>
  );
};

export default PlaylistList;
