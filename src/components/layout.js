import React from "react";
import { Link } from "gatsby";

import '../css/layout.css';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1 class="rootHeader">
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {/* {title} */}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h4>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            ↺ home
          </Link>
        </h4>
      )
    }
    return (
      <div class="layout">
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          {/* ~ 42 ~ */}
        </footer>
      </div>
    )
  }
}

export default Layout
