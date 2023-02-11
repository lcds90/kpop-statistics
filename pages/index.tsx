import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchPlaylists } from 'apis/youtube';
import { Header } from 'components';
import { PlaylistList } from 'features';
import { Aside, Layout, Main } from 'components';

const Home = () => {
  const [playlist, setPlaylist] = useState([]);
  const { t } = useTranslation('common');

  useEffect(() => {
    fetchPlaylists().then((data) => {
      setPlaylist(data);
    });
  }, []);

  return (
    <Layout>
      <Aside>
        <Header />
        <h2>{t('welcome.title')}</h2>
        <p>{t('welcome.disclaimer')}</p>
      </Aside>
      <Main>
        <PlaylistList list={playlist} />
      </Main>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: { 
  locale: string;
 }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Home;
