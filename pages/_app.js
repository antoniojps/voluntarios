import { ThemeProvider } from 'styled-components';
import theme from 'services/theme';
import GlobalStyle from 'services/GlobalStyle';
import NProgress from 'nprogress';
import Router from 'next/router';
import App from 'next/app';
import { BaseCSS } from 'styled-bootstrap-grid';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BaseCSS />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
