import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Aside, Header, Layout } from 'components';
import { PlaylistList } from 'features';
import { gridGenerator } from 'helpers';

const layoutProps: LayoutProps = {
  isMaxHeight: true,
  isMaxWidth: true,
  hasBackground: true,
  grid: {
    mobile: gridGenerator(["max-content", "1fr"], 1),
    tablet: gridGenerator(1, ["1fr", "3fr"]),
  },
};

const mainProps: LayoutProps = {
  as: "main",
  isMaxHeight: true,
  grid: {
    mobile: gridGenerator( ["0.1fr", "1fr"], 1),
    tablet: gridGenerator(["0.1fr", "1fr"], 1),
  },
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
      <Layout {...mainProps}>
        <PlaylistList />
      </Layout>
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
