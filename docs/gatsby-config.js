module.exports = {
  siteMetadata: {
    title: 'Doctocat',
    shortName: 'Doctocat',
    description: 'A Gatsby theme for creating Primer documentation sites',
    menuLinks:[
      {
        name:'Index',
        link:'/',
        children: [
          {
            name: '',
            link: ''
          }
        ]
      }
    ]
  },
  pathPrefix: '/doctocat',
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: '@lukes-design-system/docs-theme',
      options: {
        repoRootPath: '..',
      },
    },
  ],
}
