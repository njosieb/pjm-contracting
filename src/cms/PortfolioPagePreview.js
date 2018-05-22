import uniq from 'lodash/uniq'
import PropTypes from 'prop-types'
import React from 'react'
import { PortfolioPageTemplate } from '../templates/portfolio-page'

const PortfolioPagePreview = ({ entry }) => {
  const entryProjects = entry.getIn(['data', 'projects'])
  const projects = entryProjects ? entryProjects.toJS() : []
  const tags = uniq(
    projects.reduce(
      (tagList, project) => [...tagList, ...project.frontmatter.tags],
      []
    )
  )

  return (
    <PortfolioPageTemplate
      title={entry.getIn(['data', 'title'])}
      heading={entry.getIn(['data', 'heading'])}
      intro={entry.getIn(['data', 'intro'])}
      projects={projects}
      tags={tags}
    />
  )
}

PortfolioPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
}

export default PortfolioPagePreview
