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
import '../css/bio.css'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div class="bio">
            <p>
              <p class="self">hi, i'm</p>
              <h1 class="rootHeader">{author}</h1>
              <p class="self">i work as a data scientist. sometimes i make art with code. </p>
              <p class="self">i'm also a photographer and co-creator/curator of <a href="https://unographymag.com">unographymag</a> ~ a curator collective, running something akin to an art gallery on the internet.</p>
              <div class="socialLinks">
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
              </div> 
              
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
