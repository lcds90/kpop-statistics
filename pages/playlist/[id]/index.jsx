import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { fetchMusics } from 'apis/youtube';
import styles from 'styles/Playlist.module.css';
import Music from './Music';

const Playlist = ({ playlistId }) => {
  const router = useRouter();
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const { id } = router.query;

  useEffect(() => {
    if (!playlistId) router.push('/');
    const fetch = () => {
      fetchMusics(playlistId).then((data) => {
        if (!Array.isArray(data)) return;
        axios
          .get('/api/playlist', { params: { id } })
          .then(({ data: { informations } }) => {
            if (!informations) return setPlaylistInfo(data);
            // NOTE expect to match from api to retrieve statistcs or return empty object
            const dataHandling = data.map((playObj) => {
              const statistics = informations
                .find((info) => info.id === playObj.snippet.resourceId.videoId) || {};
              return { ...playObj, statistics };
            });
            return setPlaylistInfo(dataHandling);
          });
      });
    };
    
    fetch();
  }, [id]);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        Sobre o artista
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
