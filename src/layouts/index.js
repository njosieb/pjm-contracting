import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.scss'

const TemplateWrapper = ({ children, data }) => {
  const {
    instagram,
    facebook,
    email
  } = data.markdownRemark.frontmatter.contactSection
  return (
    <div id="page-body" className="flex-ns flex-column-ns">
      <Helmet
        titleTemplate="PJM Contracting, LLC. - %s"
        defaultTitle="PJM Contracting, LLC."
      />
      <Navbar />
      <div className="flex-auto flex">{children()}</div>
      <Footer instagram={instagram} facebook={facebook} email={email} />
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
}

export default TemplateWrapper

export const LayoutQuery = graphql`
  query LayoutQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
      frontmatter {
        contactSection {
          instagram
          facebook
          email
        }
      }
    }
  }
`
