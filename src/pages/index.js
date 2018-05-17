import Link from 'gatsby-link'
import React from 'react'
import logo from '../img/logo.png'

export default class IndexPage extends React.Component {
  render() {
    // const { data } = this.props
    // const { edges: projects } = data.allMarkdownRemark;

    return (
      <main className="home-main">
        <section id="top-splash" className="transparent-section">
          <div className="parallax">
            <div
              className="parallax-image"
              style={{
                backgroundImage: 'url(/img/painter_1.jpg)'
              }}
            />
          </div>
          <div className="hero-container pt5 pb5">
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
              {/* TODO: picture boxes that filter */}
              <div className="portfolio-filter overflow-hidden mh3 mb4 relative pointer hover-shadow">
                <Link
                  className="db"
                  to={{ pathname: '/portfolio', hash: '#interior' }}
                >
                  <img className="db" src="/img/fendler_1.jpg" />
                  <h3 className="absolute w-100 tc blue-darker">Interior</h3>
                </Link>
              </div>
              <div className="portfolio-filter overflow-hidden mh3 mb4 relative pointer hover-shadow">
                <Link
                  className="db"
                  to={{ pathname: '/portfolio', hash: '#bath' }}
                >
                  <img className="db" src="/img/brady_gilmore_8.jpg" />
                  <h3 className="absolute w-100 tc blue-darker">Bath</h3>
                </Link>
              </div>
              <div className="portfolio-filter overflow-hidden mh3 mb4 relative pointer hover-shadow">
                <Link
                  className="db"
                  to={{ pathname: '/portfolio', hash: '#kitchen' }}
                >
                  <img className="db" src="/img/fendler_4.jpg" />
                  <h3 className="absolute w-100 tc blue-darker">Kitchen</h3>
                </Link>
              </div>
              <div className="portfolio-filter overflow-hidden mh3 mb4 relative pointer hover-shadow">
                <Link
                  className="db"
                  to={{ pathname: '/portfolio', hash: '#basement' }}
                >
                  <img className="db" src="/img/teahan_4.jpg" />
                  <h3 className="absolute w-100 tc blue-darker">Basement</h3>
                </Link>
              </div>
              <div className="portfolio-filter overflow-hidden mh3 mb4 relative pointer hover-shadow">
                <Link
                  className="db"
                  to={{ pathname: '/portfolio', hash: '#exterior' }}
                >
                  <img className="db" src="/img/mach_deck_1.jpg" />
                  <h3 className="absolute w-100 tc blue-darker">Exterior</h3>
                </Link>
              </div>
              <div className="portfolio-filter overflow-hidden mh3 mb4 relative pointer hover-shadow">
                <Link
                  className="db"
                  to={{ pathname: '/portfolio', hash: '#deck' }}
                >
                  <img className="db" src="/img/klapmeyer_1.jpg" />
                  <h3 className="absolute w-100 tc blue-darker">Deck</h3>
                </Link>
              </div>
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

// IndexPage.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       edges: PropTypes.array
//     })
//   })
// }

// export const pageQuery = graphql`
//   query IndexQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       edges {
//         node {
//           excerpt(pruneLength: 400)
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//             templateKey
//             date(formatString: "MMMM DD, YYYY")
//           }
//         }
//       }
//     }
//   }
// `
