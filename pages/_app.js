import NProgress from 'nprogress';
import Router from 'next/router';
import App from 'next/app';
import { Nav } from 'components/organisms'
import 'normalize.css'
import 'assets/styles/bootstrap-grid.css'
import 'assets/styles/global.scss'

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Nav />
      <Component {...pageProps} />
    </div>
  );

}

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
