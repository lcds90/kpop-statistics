import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { fetchMusics } from "apis/youtube";
import { fetchInfo } from "apis/wikipedia";

import styles from "./Playlist.module.css";
import Music from "./Music";
import Statistics from "./Statistics";

function Playlist({ playlistId }) {
  const router = useRouter();
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [artistInfo, setArtist] = useState(null);
  const [artistAverage, setArtistAverage] = useState({});

  const { id } = router.query;

  useEffect(() => {
    if (!playlistId) router.push("/");

    const fetch = async () => {
      const data = await fetchMusics(playlistId);
      if (!Array.isArray(data)) return;

      const {
        data: { informations },
      } = await axios.get("/api/playlist", { params: { id } });
      if (!informations) return setPlaylistInfo(data as any);

      const { musics, info } = informations;
      const dataHandling = data.map((playObj) => {
        const statistics =
          musics.find(
            (music) => music.id === playObj.snippet.resourceId.videoId
          ) || {};
        return { ...playObj, statistics };
      });

      const wikipediaInfo = await fetchInfo(info.wikiQuery, router.locale);
      setArtist(wikipediaInfo);
      setArtistAverage({ ...info.average });
      setPlaylistInfo(dataHandling as any);
    };

    fetch();
  }, [id]);
  return (
    <main className={styles.main}>
      <section className={styles.info}>
        <h1>{id}</h1>
        {artistInfo && (
          <article
            className={styles.artistInfo}
            dangerouslySetInnerHTML={{ __html: artistInfo }}
          />
        )}
        {artistAverage && <Statistics average={artistAverage} />}
      </section>
      {playlistInfo.map((playlist: any) => (
        <Music key={playlist.id} music={playlist} />
      ))}
    </main>
  );
}

export async function getServerSideProps(context) {
  // LINK https://stackoverflow.com/a/67096806
  return {
    props: {
      playlistId: context.query.playlistId || null,
    },
  };
}

export default Playlist;
