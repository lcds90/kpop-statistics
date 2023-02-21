import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { fetchMusics } from "apis/youtube";
import { fetchInfo } from "apis/wikipedia";
import { gridGenerator, storage } from "helpers";

import styles from "./Playlist.module.css";
import Music from "./Music";
import Statistics from "./Statistics";
import { Layout } from "@/components";
import { Info } from "./styleds";

const mainProps: LayoutProps = {
  as: "main",
  hasBackground: true,
  isMaxHeight: true,
  grid: {
    mobile: gridGenerator(1, 1),
    tablet: gridGenerator(1, 1),
  },
};

const infoProps: LayoutProps = {
  as: "section",
  isMaxHeight: true,
  padding: {
    mobile: "small",
    tablet: "medium",
  },
  grid: {
    mobile: gridGenerator(1, 1),
    tablet: gridGenerator(1, 1),
  },
  overflow: {
    y: true,
    x: true,
  },
};

function Playlist({ playlistId }) {
  const router = useRouter();
  const [playlistInfo, setPlaylistInfo] = useState({
    data: [] as any[],
    loading: true,
  });
  const [artistInfo, setArtist] = useState({
    data: "",
    loading: true,
  });
  const [artistAverage, setArtistAverage] = useState({
    data: {} as any,
    loading: true,
  });

  const { id: artist } = router.query;

  useEffect(() => {
    const id = playlistId || storage.get("playlistId");
    if (!id) router.push("/");
    const fetch = async () => {
      const data = await fetchMusics(id);
      if (!Array.isArray(data)) return;

      const {
        data: { informations },
      } = await axios.get("/api/playlist", { params: { id: artist } });
      if (!informations) return setPlaylistInfo({ data, loading: false });

      const { musics, info } = informations;
      const dataHandling = data.map((playObj) => {
        const statistics =
          musics.find(
            (music) => music.id === playObj.snippet.resourceId.videoId
          ) || {};
        return { ...playObj, statistics };
      });

      const wikipediaInfo = await fetchInfo(info.wikiQuery, router.locale);
      setArtist({ data: wikipediaInfo, loading: false });
      setArtistAverage({ data: info.average, loading: false });
      setPlaylistInfo({ data: dataHandling, loading: false });
    };

    fetch();
  }, []);

  return (
    <Layout {...mainProps}>
      <Layout {...infoProps}>
        <h1>{artist}</h1>
        {!artistInfo.loading && (
          <Info dangerouslySetInnerHTML={{ __html: artistInfo.data }} />
        )}
        {!artistAverage.loading && <Statistics average={artistAverage.data} />}
      </Layout>
      {/* {playlistInfo.data.map((playlist: any) => (
        <Music key={playlist.id} music={playlist} />
      ))} */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      playlistId: context.query.playlistId || null,
    },
  };
}

export default Playlist;
