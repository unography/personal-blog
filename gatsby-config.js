module.exports = {
  siteMetadata: {
    title: `Dhruv`,
    name: `Dhruv Karan`,
    siteUrl: `https://dhruvkaran.com`,
    description: `Writings on AI, Art, and making Art with AI`,
    hero: {
      heading: `Hi! I'm Dhruv`,
      subheading: `<br>I'm a Data Scientist, currently solving Machine Learning ∩ Design problems at <a href="http://hellosivi.com/">HelloSivi</a>.<br>
      When not building ML models at my day job, I build ML models to make some <a href="http://instagram.com/uno.labs">weird art</a>, <a href="http://instagram.com/unography">photograph</a> life around me, and sift through my <a href="https://www.notion.so/curiosity-list-4c9e025e07734e37bdbd0f00bfbb98c9">curiosity list</a>.<br><br>
      I also create/curate art and aesthetics for <a href="https://www.unographymag.com/">The Unography Mag</a>, a place best described as ~ <i>your local internet art gallery</i>.`,
      maxWidth: 800,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/unography`,
      },
      {
        name: `github`,
        url: `https://github.com/unography`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/unography`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/karandhruv`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-65985040-7`
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dhruv Karan`,
        short_name: `Dhruv`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
  ],
};
