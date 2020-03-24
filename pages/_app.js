import NProgress from 'nprogress';
import Router from 'next/router';
import App from 'next/app';
import { Nav } from 'components/organisms'
import 'assets/styles/bootstrap-grid.css'
import { CSSBaseline, ZEITUIProvider } from '@zeit-ui/react'
import 'assets/styles/global.scss'

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ZEITUIProvider theme={{ type: 'light' }}>
      <CSSBaseline />
        <Nav />
      <Component {...pageProps} />
    </ZEITUIProvider>
  );

}

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
