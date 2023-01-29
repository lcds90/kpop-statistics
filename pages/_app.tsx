import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';

interface IAppProps {
  Component: React.FC;
  pageProps: any;
}

const App = ({ Component, pageProps }: IAppProps) =>  (
    <>
      <Component {...pageProps} />
      <Head>
        <title>KPOP Statistics</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
);


export default appWithTranslation(App as any);
