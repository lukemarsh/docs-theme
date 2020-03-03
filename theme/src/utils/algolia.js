const pageQuery = `{
  content: allMarkdownRemark {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          path  
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`
const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => {
      return flatten(data.content.edges)
    },
    indexName: process.env.ALGOLIA_INDEX_NAME,
    settings,
  },
]
module.exports = queries
