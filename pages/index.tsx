import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Header } from 'components';
import { PlaylistList } from 'features';
import { Aside, Layout, Main } from 'components';

const Home = () => {
  const { t } = useTranslation('common');
 
  return (
    <Layout>
      <Aside>
        <Header />
        <h2>{t('welcome.title')}</h2>
        <p>{t('welcome.disclaimer')}</p>
      </Aside>
      <Main>
        <PlaylistList />
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
