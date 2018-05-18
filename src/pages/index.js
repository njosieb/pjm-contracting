import Img from 'gatsby-image'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import React from 'react'
import logo from '../img/logo.png'

export class IndexPageTemplate extends React.Component {
  render() {
    const {
      tagline,
      heading,
      aboutSection,
      whatSection,
      contactSection
    } = this.props

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
              <h3 className="tc white pv4">{tagline}</h3>
              <Link
                to={{ pathname: '/', hash: '#contact' }}
                className="action-button f3 pb3 fw7"
              >
                Get An Estimate!
              </Link>
            </div>
          </div>
        </section>
        <section id="about-us" className="relative pv4 bg-white">
          <div className="mw6 center">
            <h2 className="off-black">{aboutSection.aboutHeading}</h2>
            <p dangerouslySetInnerHTML={{ __html: aboutSection.aboutText }} />
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
            <h2 className="mw6 center pb2">{whatSection.whatHeading}</h2>
            <p
              className="mw6 center pb3"
              dangerouslySetInnerHTML={{ __html: whatSection.whatText }}
            />
            <div className="mw7 center flex flex-wrap w-100 justify-center ml0 pl0">
              {whatSection.whatBoxes.map((box, id) => (
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
                      resolutions={box.boxImage.childImageSharp.resolutions}
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
            <h2>{contactSection.contactHeading}</h2>
            <p
              dangerouslySetInnerHTML={{ __html: contactSection.contactText }}
            />
          </div>
        </section>
      </main>
    )
  }
}

IndexPageTemplate.propTypes = {
  tagline: PropTypes.string.isRequired,
  heading: PropTypes.object.isRequired,
  aboutSection: PropTypes.object.isRequired,
  whatSection: PropTypes.object.isRequired,
  contactSection: PropTypes.object.isRequired
}

const IndexPage = ({ data }) => {
  const {
    tagline,
    heading,
    aboutSection,
    whatSection,
    contactSection
  } = data.markdownRemark.frontmatter

  return (
    <IndexPageTemplate
      tagline={tagline}
      heading={heading}
      aboutSection={aboutSection}
      whatSection={whatSection}
      contactSection={contactSection}
    />
  )
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
        tagline
        heading {
          childImageSharp {
            sizes(maxWidth: 1280) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        aboutSection {
          aboutHeading
          aboutText
        }
        whatSection {
          whatHeading
          whatText
          whatBoxes {
            tag
            boxImage {
              childImageSharp {
                resolutions(width: 200, height: 200) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
        contactSection {
          contactHeading
          contactText
        }
      }
    }
  }
`
