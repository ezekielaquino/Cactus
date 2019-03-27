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
  ],
}
