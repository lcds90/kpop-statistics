import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

import { fetchPlaylists } from 'apis/youtube';
import { Header } from 'components';
import { PlaylistList } from 'features';
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
      <aside className={styles.aside}>
        <Header />
        <h2>Welcome to kpop statistics</h2>
        <p>
          This site has no intention of denigrating any artist or company,
          <br />
          having only as a proposal of information to the public that consumes
          the products offered by them.
        </p>
      </aside>
      <main>
        <PlaylistList list={playlist} />
      </main>
    </div>
  );
};

export default Home;
