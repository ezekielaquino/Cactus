import React from 'react';
import Helmet from 'react-helmet';
import { init as httpInit } from 'providers/Http';
import { ContextProvider } from 'providers/Context';
import 'components/reset.css';
import 'components/base.css';


export const wrapRootElement = ({ element }) => {
  return (
    <ContextProvider>
      <Helmet title="Cactus">
        <meta name="description" content="Cactus app" />
        {/* <meta name="twitter:site" content={siteMeta.author} />
        <meta name="twitter:creator" content={siteMeta.author} />
        <meta property="og:title" content={siteMeta.title} />
        <meta property="og:description" content={siteMeta.description} /> */}
      </Helmet>

      { element }
    </ContextProvider>
  )
};

export const onClientEntry = () => {
  httpInit();
}