import NProgress from 'nprogress';
import Router from 'next/router';
import 'assets/styles/bootstrap-grid.css'
import { CSSBaseline, ZEITUIProvider } from '@zeit-ui/react'

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
      <style jsx global>{`
        @import "assets/styles/global.scss"
      `}</style>
    </ZEITUIProvider>
  );

}

export default MyApp;
