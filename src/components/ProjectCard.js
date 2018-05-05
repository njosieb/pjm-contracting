import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const ProjectCard = ({ project }) => {
  return (
    <div id={project.id} className="project pointer relative mb4 mh4">
      <div className="project-info absolute w-100">
        <h3 className="project-title tc pt3 ma0 flex items-center justify-center">
          <span className="project-title-text blue-darker underline-hover lh-copy">
            {project.title}
          </span>
          <div className="project-date tc f5 lh-copy">
            &nbsp;&mdash; {project.date}
          </div>
        </h3>
        <div className="project-tag-list tc pb2">
          {project.tags.map((tag, i) => (
            <Link
              key={i}
              to={{
                pathname: '/portfolio',
                hash: `#${tag.toLowerCase()}`
              }}
              className="filter-tag ph2 blue-darker underline-hover">
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <div className="image-container center hover-shadow">
        <img className="db" src={project.featured} />
      </div>
    </div>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  })
}
