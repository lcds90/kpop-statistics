import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import {
	createGlobalStyle,
	DefaultTheme,
	ThemeProvider,
} from 'styled-components';
import GlobalStyle from '../components/GlobalStyles';
import 'fonts/fonts.css'

interface IAppProps {
	Component: React.FC;
	pageProps: any;
}

interface Theme {
	colors: {
		background: string;
		primary: string;
		secondary: string;
	};
}

const theme: Theme = {
	colors: {
		background: '#274472',
		primary: '#C3E0E5',
		secondary: '#5885AF',
	},
};

const App = ({ Component, pageProps }: IAppProps) => (
	<>
		<Head>
			<title>KPOP Statistics</title>
			<meta
				name='viewport'
				content='initial-scale=1.0, width=device-width'
			/>
		</Head>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Component {...pageProps} />
		</ThemeProvider>
	</>
);

export default appWithTranslation(App as any);
