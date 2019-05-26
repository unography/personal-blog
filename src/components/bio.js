/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import { rhythm } from "../utils/typography";

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              personal blog of <strong>{author}</strong>.<br></br>
              data scientist. photographer. artist (&iquest;?)<br></br>
              i dabble in ai, art, and making art with ai.
              <br></br>
              <br></br>
              creator/curator at <a href="https://unographymag.com/">unographymag</a>.
              <br></br>
              <br></br> 
              {` `}
              <a href={`https://instagram.com/${social.instagram}`}>
                instagram
              </a>
              {` `}
              <a href={`https://twitter.com/${social.twitter}`}>
                twitter
              </a>
              {` `}
              <a href={`https://github.com/${social.github}`}>
                github
              </a>
              {` `}
              <a href={`https://www.linkedin.com/in/${social.linkedin}`}>
                linkedin
              </a>
              {` `}
              <a href={`https://glitch.com/@${social.glitch}`}>
                glitch
              </a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter,
          instagram,
          github,
          linkedin,
          glitch
        }
      }
    }
  }
`

export default Bio
