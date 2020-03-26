import NProgress from 'nprogress';
import Router from 'next/router';
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
      <Component {...pageProps} />
    </ZEITUIProvider>
  );

}

export default MyApp;
