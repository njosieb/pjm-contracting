import React from 'react'
import PropTypes from 'prop-types'
import { PortfolioPageTemplate } from '../templates/portfolio-page'

const PortfolioPagePreview = ({ entry }) => {
  const entryProjects = entry.getIn(['data', 'projects'])
  const projects = entryProjects ? entryProjects.toJS() : []

  return (
    <PortfolioPageTemplate
      title={entry.getIn(['data', 'title'])}
      heading={entry.getIn(['data', 'heading'])}
      intro={entry.getIn(['data', 'intro'])}
      projects={projects}
    />
  )
}

PortfolioPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
}

export default PortfolioPagePreview
