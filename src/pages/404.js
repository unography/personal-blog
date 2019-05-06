import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { Link } from "gatsby"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        
        <h1>0O0O.ps</h1>
        <p>Oh, the sadness...You just hit a route that doesn&#39;t exist.</p>
        <Link
            style={{
              boxShadow: `none`,
              textDecoration: `underline`,
              color: `inherit`,
            }}
            to={`/`}
          >
            <p><i>let's go back home?</i></p>
          </Link>
        
      </Layout>
      
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
