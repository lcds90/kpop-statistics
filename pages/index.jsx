import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

import { fetchPlaylists } from 'apis/youtube';
import { Header } from 'components';
import { PlaylistList } from 'features';
import styles from 'styles/Home.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => {
  const [playlist, setPlaylist] = useState([]);
  const { t } = useTranslation('common');

  useEffect(() => {
    fetchPlaylists().then((data) => {
      setPlaylist(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <Header />
        <h2>{t('welcome.title')}</h2>
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default Home;
