import PropTypes from 'prop-types'
import React from 'react'
import { ProjectTemplate } from '../../templates/project'

const ProjectPreview = ({ entry }) => (
  <ProjectTemplate
    title={entry.getIn(['data', 'title'])}
    description={entry.getIn(['data', 'description'])}
    date={entry.getIn(['data', 'date'])}
    tags={entry.getIn(['data', 'tags'])}
    featured={entry.getIn(['data', 'featured'])}
    slideshow={entry.getIn(['data', 'slideshow'])}
  />
)

ProjectPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  })
}

export default ProjectPreview
