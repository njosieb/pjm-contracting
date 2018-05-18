import Img from 'gatsby-image'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import React from 'react'
import logo from '../img/logo.png'

export class IndexPageTemplate extends React.Component {
  render() {
    const { heading, whatIDo } = this.props

    return (
      <main className="home-main">
        <section id="top-splash" className="transparent-section relative">
          <Img
            sizes={heading.childImageSharp.sizes}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }}
          />
          <div className="hero-container pt5 pb5 relative">
            <div className="image-container">
              <img id="logo-background" src={logo} />
            </div>
            <div id="site-slogan">
              <h3 className="tc white pv4">
                'Big project, small job, I'll manage'
              </h3>
              <Link
                to={{ pathname: '/', hash: '#contact' }}
                className="action-button f3 pb3 fw7"
              >
                Contact Us!
              </Link>
            </div>
          </div>
        </section>
        <section id="about-us" className="relative pv4 bg-white">
          <div className="mw6 center">
            <h2 className="off-black">About Us</h2>
            {/* TODO: insert stuff about him here */}
            <p>
              Operating in the St. Louis and Kansas City areas, Peter McGaughey
              is the handyman for all residential and commercial needs.
            </p>
          </div>
          <div className="awesome-icons mw7 center flex justify-around blue-darker pv5">
            <i className="fa fa-home f-5" />
            <i className="fa fa-bath f-5" />
            <i className="fa fa-handshake-o f-5" />
            <i className="fa fa-cutlery f-5" />
            <i className="fa fa-building f-5" />
          </div>
        </section>
        <section
          id="work"
          className="relative white bg-green overflow-auto pv4"
        >
          <div className="">
            <h2 className="mw6 center pb2">What I Do</h2>
            <p className="mw6 center pb3">
              Click on any of these to see my portfolio
            </p>
            <div className="mw7 center flex flex-wrap w-100 justify-center ml0 pl0">
              {whatIDo.map((box, id) => (
                <div
                  key={id}
                  className="portfolio-filter overflow-hidden mh3 mb4 relative pointer hover-shadow"
                >
                  <Link
                    className="flex items-center h-100 w-100"
                    to={{
                      pathname: '/portfolio',
                      hash: `#${box.tag.toLowerCase()}`
                    }}
                  >
                    <Img
                      resolutions={box.slideImage.childImageSharp.resolutions}
                      style={{
                        display: 'block',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <h3 className="relative w-100 tc blue-darker">{box.tag}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="contact-us"
          className="relative overflow-auto pv4 bg-white"
        >
          <div className="mw6 center">
            <h2>Contact Us</h2>
            <p>12345 Hire Us Today Drive</p>
            <p>
              Email Us Today at
              <a
                className="blue-darker underline pl2"
                href="mailto:pjm966@gmail.com"
              >
                pjm966@gmail.com
              </a>
            </p>
          </div>
        </section>
      </main>
    )
  }
}

IndexPageTemplate.propTypes = {
  heading: PropTypes.object.isRequired,
  whatIDo: PropTypes.array.isRequired
}

const IndexPage = ({ data }) => {
  const { heading, slideshow } = data.markdownRemark.frontmatter

  return <IndexPageTemplate heading={heading} whatIDo={slideshow} />
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
}

export default IndexPage

export const indexPageQuery = graphql`
  query IndexPage {
    markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
      frontmatter {
        heading {
          childImageSharp {
            sizes(maxWidth: 1280) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        slideshow {
          tag
          slideImage {
            childImageSharp {
              resolutions(width: 200, height: 200) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }
  }
`
