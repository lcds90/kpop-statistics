import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Aside, Header, Layout, LayoutMain } from 'components';
import { PlaylistList } from 'features';
import { gridGenerator } from 'helpers';

const layoutProps: LayoutProps = {
  isMaxHeight: true,
  hasBackground: true,
  grid: {
    mobile: gridGenerator(["max-content", "1fr"], 1),
    tablet: gridGenerator(1, ["1fr", "3fr"]),
  },
};

const mainProps: LayoutProps = {
  isMaxHeight: true,
  grid: {
    mobile: gridGenerator(1, ["0.1fr", "1fr"]),
    tablet: gridGenerator(1, ["1fr", "3fr"]),
  }
}

const Home = () => {
  const { t } = useTranslation('common');
  
  return (
    <Layout {...layoutProps}>
      <Aside>
        <Header />
        <h2>{t('welcome.title')}</h2>
        <p>{t('welcome.disclaimer')}</p>
      </Aside>
      <LayoutMain {...mainProps}>
        <PlaylistList />
      </LayoutMain>
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
