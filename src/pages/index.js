import React from "react"
import Layout from "../components/Layout"
import aboutStyle from "./About.module.scss"
import Img from "gatsby-image"
import { graphql } from "gatsby"

export const query = graphql`
  query {
    file(relativePath: { eq: "images/about.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.

        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const About = props => {
  console.log(query)
  return (
    <Layout>
      <div className={aboutStyle.main}>
        <div className={aboutStyle.izquierda}>
          <div className={aboutStyle.imagen}>
            {" "}
            <Img
              className={aboutStyle.img}
              fluid={props.data.file.childImageSharp.fluid}
            />
          </div>
          <div className={aboutStyle.texto}>
            <div className={aboutStyle.iconos}>
              <i className="fas fa-map-marker-alt fa-sm"></i>
              <p>&nbsp; New York, New York</p>
            </div>
            <div className={aboutStyle.iconos}>
              <i className="fas fa-graduation-cap fa-sm"></i>
              <p>Cornell, UC Davis, Rutgers</p>
            </div>
            <div className={aboutStyle.iconos}>
              <i className="fas fa-code fa-sm"></i>
              <p>Python, Javascript</p>
            </div>
          </div>
        </div>
        <div className={aboutStyle.derecha}>
          <p>
            <strong>Email:</strong> csuh dot web at gmail dot com
            <br />
            <strong>Resume:</strong> <a href="/resume.html">html</a>{" "}
            <a href="/resume.pdf">pdf</a>
          </p>
          <p>
            Currently I work at a commercial bank developing Python-based tools
            for data scientists and engineers. Previously I was mainly wrangling
            with backend stuff in Python and Django. I spent several years
            working on{" "}
            <a href="https://en.wikipedia.org/wiki/Wall_Street">Wall Street</a>,
            supporting{" "}
            <a href="https://en.wikipedia.org/wiki/Trader_(finance)">trading</a>{" "}
            in various capacities. Before that, I was a full-fledged academic,
            spending a lot of time{" "}
            <a href="https://en.wikipedia.org/wiki/Topology">
              turning things inside-out.
            </a>
          </p>
          <p>
            In my spare time, I enjoy working on Bitcoin and Ethereum
            development.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
