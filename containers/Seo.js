import React, { useMemo } from 'react';
import Head from 'next/head';
import SEO_DATA from '../assets/data/seo.json';
import { useRouter } from 'next/router'

const Seo = ({
  title = null,
  description = null,
  shouldAppend = true,
  ogImageText = null,
  shouldGenerateImage = true,
}) => {
  const computedTitle = useMemo(() => {
    if (title && shouldAppend) return `${title} - ${SEO_DATA.title}`;
    if (title) return `${title}`
    return SEO_DATA.title;
  },
    [title, shouldAppend]);

  const { asPath } = useRouter()

  // generates image from title, or ogImageText or default
  const computedImg = useMemo(() => {
    const text = ogImageText || `**${title}**` || SEO_DATA.ogImageText
    const textEncoded = encodeURI(text);
    const generatedImg = `https://voluntarios-og-image.now.sh/${textEncoded}.png?theme=light&md=1&fontSize=80px&images=https://voluntarios.app/voluntarios-dark.svg`;
    const defaultImg = SEO_DATA.url + SEO_DATA.image.src;
    return shouldGenerateImage ? generatedImg : defaultImg;
  }, [title, ogImageText, shouldGenerateImage]);

  return (
    <Head>
      <title>{computedTitle}</title>
      <meta name="description" key="description" content={description || SEO_DATA.description} />
      <meta name="keywords" key="keywords" content={SEO_DATA.keywords.join(' ')} />
      {/* Facebook & search engines */}
      <meta property="og:url" key="og:url" content={`${SEO_DATA.url}${asPath}`} />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:title" key="og:title" content={computedTitle} />
      <meta property="og:description" key="og:description" content={description || SEO_DATA.description} />
      <meta property="og:site_name" key="og:site_name" content={computedTitle} />
      <meta property="og:image" key="og:image" content={computedImg} />
      <meta property="og:image:width" key="og:image:width" content={SEO_DATA.image.width} />
      <meta property="og:image:height" key="og:image:height" content={SEO_DATA.image.height} />
      {/* Twitter */}
      <meta property="twitter:card" key="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" key="twitter:url" content={`${SEO_DATA.url}${asPath}`} />
      <meta property="twitter:title" key="twitter:title" content={computedTitle} />
      <meta property="twitter:description" key="twitter:description" content={description || SEO_DATA.description} />
      <meta property="twitter:image" key="twitter:image" content={computedImg} />
      {SEO_DATA["fb-app-id"] && (<meta property="fb:app_id" content={SEO_DATA["fb-app-id"]}/>)}
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default Seo;
