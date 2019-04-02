const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Cactus`,
    description: `Little web app to compose summaries`,
    author: `@ezekielaquino`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-137038206-1`,
        head: false,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'assets'),
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/components'),
        providers: path.join(__dirname, 'src/providers'),
        services: path.join(__dirname, 'src/services'),
        utils: path.join(__dirname, 'src/utils'),
      }
    },
  ],
}
