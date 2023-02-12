import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Card, Layout, OrderSelect } from "components";
import { fetchPlaylists } from "apis/youtube";
import { orderPlaylistBy } from "./utils";
import { Transition, TransitionGroup } from "react-transition-group";

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
  overflow: {
    y: true,
  }
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

const animate = (timeline: GSAPTimeline, selector) => {
  timeline.clear();
  timeline.from(selector, {
    opacity: 0,
    duration: 1,
    x: 50,
  });
  timeline.set(selector, {
    clearProps: "all",
  });
  timeline.set(selector.childNodes, {
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
        defaults: {
          duration: 0.5,
          stagger: 0.25,
        }
      }),
    []
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchPlaylists();
      // setTimeout(() => {
      setPlaylists(
        data.map((d) => ({
          ...d,
          nodeRef: createRef(),
        }))
      );
      // }, 100000);
      // animate(timeline, cardsRef.current);
    };
    fetch();
  }, []);

  const handleOrder = ({ target: { value } }) => {
    setOrder(value);
    setPlaylists(orderPlaylistBy[value](playlists));
  };

  // use effect to handle order of playlists
  useEffect(() => {
    if (order === "ascDate") {
      setPlaylists(orderPlaylistBy.ascDate(playlists));
    } else if (order === "descDate") {
      setPlaylists(orderPlaylistBy.descDate(playlists));
    } else if (order === "ascName") {
      setPlaylists(orderPlaylistBy.asc(playlists));
    } else if (order === "descName") {
      setPlaylists(orderPlaylistBy.desc(playlists));
    }
    animate(timeline, cardsRef.current);
  }, [order]);

  const onPageEnter = (element, i) => {
    const tl = gsap.timeline();
    tl.from(element, {
      y: 50,
      autoAlpha: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: i / 10,
    });
    tl.set(element, { clearProps: "all" });
  };

  const onPageExit = (element, i) => {
    const tl = gsap.timeline();
    tl.clear();
    tl.to(element, {
      y: -50,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power3.inOut",
      delay: i / 10,
    });
    tl.set(element, { clearProps: "all" });
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
          <TransitionGroup component={null}>
            {playlists.map((playlist, i) => (
              <Transition
                key={playlist.id}
                appear
                timeout={500}
                in={true}
                mountOnEnter={true}
                unmountOnExit={true}
                onEnter={(node) => onPageEnter(node, i)}
                onExit={(node) => onPageExit(node, i)}
              >
                <Card playlist={playlist} />
              </Transition>
            ))}
          </TransitionGroup>
        )}
      </Layout>
    </>
  );
};

export default PlaylistList;
