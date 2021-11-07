import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { fetchMusics } from 'apis/youtube';
import { fetchInfo } from 'apis/wikipedia';

import styles from './Playlist.module.css';
import Music from './Music';
import Statistics from './Statistics';

const Playlist = ({ playlistId }) => {
  const router = useRouter();
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [artistInfo, setArtist] = useState(null);
  const [artistAverage, setArtistAverage] = useState({});

  const { id } = router.query;

  useEffect(() => {
    if (!playlistId) router.push('/');

    const fetch = () => {
      fetchMusics(playlistId).then((data) => {
        if (!Array.isArray(data)) return;
        axios
          .get('/api/playlist', { params: { id } })
          .then(async ({ data: { informations } }) => {
            if (!informations) return setPlaylistInfo(data);
            const { musics, info } = informations;
            // NOTE expect to match from api to retrieve statistcs or return empty object
            const dataHandling = data.map((playObj) => {
              const statistics = musics
                .find((music) => music.id === playObj.snippet.resourceId.videoId) || {};
              return { ...playObj, statistics };
            });
            const wikipediaInfo = await fetchInfo(info.wikiQuery);
            setArtist(wikipediaInfo.split('<h2><span id="Discography">')[0]);
            setArtistAverage({ ...info.average });
            return setPlaylistInfo(dataHandling);
          });
      });
    };

    fetch();
  }, [id]);
  return (
    <main className={styles.main}>
      <section className={styles.info}>
        <h1>{id}</h1>
        {artistInfo
        && (
        <article
          className={styles.artistInfo}
          dangerouslySetInnerHTML={{ __html: artistInfo }}
        />
        )}
        {artistAverage && <Statistics average={artistAverage} />}
      </section>
      {playlistInfo.map((playlist) => <Music key={playlist.id} music={playlist} />)}
    </main>
  );
};

export async function getServerSideProps(context) {
  // LINK https://stackoverflow.com/a/67096806
  return {
    props: {
      playlistId: context.query.playlistId || null,
    },
  };
}

export default Playlist;
