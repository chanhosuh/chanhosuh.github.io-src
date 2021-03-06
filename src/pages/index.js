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
        <div className={aboutStyle.left}>
          <div className={aboutStyle.imagen}>
            <Img
              className={aboutStyle.img}
              fluid={props.data.file.childImageSharp.fluid}
            />
          </div>
        </div>
        <div className={aboutStyle.right}>
          <div>
            <i class="fas fa-envelope"></i> csuh.web at gmail
            <i class="fas fa-file"></i>
            <a href="/resume.html">html</a> | <a href="/resume.pdf">pdf</a>
          </div>
          <div>
            <p>
              Currently I work at <a href="https://apy.finance">APY.Finance</a>, developing smart contracts and
              doing whatever else needs to be done.
            </p>
            <p>
              I spent several years working on{" "}
              <a href="https://en.wikipedia.org/wiki/Wall_Street">
                Wall Street
              </a>
              , supporting{" "}
              <a href="https://en.wikipedia.org/wiki/Trader_(finance)">
                trading
              </a>{" "}
              in various capacities. Before that, I was a full-fledged academic,
              spending a lot of time{" "}
              <a href="https://en.wikipedia.org/wiki/Topology">
                turning things inside-out.
              </a>
            </p>
            <p>
              In my spare time, I enjoy reading and hanging out with the folks at{" "}
              <a href="https://www.meetup.com/nyc-blockchain-devs/">NYC Blockchain Devs</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
