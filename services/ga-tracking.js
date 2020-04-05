
import ReactGA from 'react-ga';
import SEO_DATA from '../assets/data/seo.json'

const registerGoogleTracking = (router) => {
  const handleRouteChange = (url) => ReactGA.pageview(url);

  ReactGA.initialize(SEO_DATA["google-analytics"]);
  ReactGA.pageview(router.asPath);

  router.events.on('routeChangeComplete', handleRouteChange);

  return () => {
    router.events.off('routeChangeComplete', handleRouteChange);
  };
};

export default registerGoogleTracking;
