import React from "react"
import { graphql } from "gatsby"
import Header from '../components/Header/Header';
import Sidenav from "../components/Sidenav/Sidenav";
import "@lukes-design-system/css/src/index.scss"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="d-flex flex-column">
      <Header />
      <div className="d-flex">
        <Sidenav />
        <div className="markdown-body p-5">
          <h1>{frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
