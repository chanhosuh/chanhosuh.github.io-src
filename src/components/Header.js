import React from "react"
import "./header.styles.scss"
import { Link, graphql, useStaticQuery } from "gatsby"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Anonymous+Pro|Open+Sans&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossorigin="anonymous"
      />

      <div className="header-main">
        <div className="dev">
          <h1>{data.site.siteMetadata.title}</h1>
          <span className="attr">Software Engineer</span>
          <span className="dot">•</span>
          <span className="attr">Mathematician</span>
          <span className="dot">•</span>
          <span className="attr">Flaneur</span>
        </div>
        <div className="icons">
          <a href="https://github.com/chanhosuh">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://stackoverflow.com/users/story/1175053?view=Cv">
            <i className="fab fa-stack-overflow"></i>
          </a>
          <a href="https://twitter.com/chanhosuh">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/in/chanhosuh/">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <hr />
      </div>
    </div>
  )
}

export default Header
