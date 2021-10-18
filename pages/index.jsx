import { fetchPlaylists } from 'apis/youtube';
import { Header } from 'components';
import { PlaylistList } from 'features';
import { useEffect, useState } from 'react';
import styles from 'styles/Home.module.css';

const Home = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    fetchPlaylists().then((data) => {
      setPlaylist(data);
    });
  }, []);
  return (
    <div className={styles.container}>
      <Header />
      <PlaylistList list={playlist} />
    </div>
  );
};

export default Home;
