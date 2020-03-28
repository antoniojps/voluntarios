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
        @import "assets/styles/global.scss";

        html,
        body {
          font-family: var(--font);
          width: 100%;
          height: 100%;
          font-size: 16px;
          background-color: var(--bg) !important;
          color: var(--base);
        }
      `}</style>
    </ZEITUIProvider>
  );

}

export default MyApp;
