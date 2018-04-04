import React from 'react'
import PropTypes from 'prop-types'

export const ProjectTemplate = ({
  title,
  description,
  date,
  tags,
  featured,
  slideshow
}) => {
  return (
    <section className="modal relative">
      <div className="modal-header">
        <h3>{title}</h3>
      </div>
      <div className="modal-body">
        <div className="project-date">{date}</div>
        <div className="project-tags">
          {tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <p className="project-description">{description}</p>
        <div className="project-images">
          {slideshow.map((image, id) => (
            <div key={id} className="image-container">
              <a href={image.slideImage} data-lightbox={id}>
                <img className="project-image" src={image.slideImage} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

ProjectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.array,
  featured: PropTypes.string,
  slideshow: PropTypes.array
}

export const projectQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM, YYYY")
        tags
        featured
        slideshow {
          slideImage
        }
      }
    }
  }
`

const Project = ({ data }) => {
  const { markdownRemark: project } = data

  return (
    <ProjectTemplate
      title={project.frontmatter.title}
      description={project.frontmatter.description}
      date={project.frontmatter.date}
      tags={project.frontmatter.tags}
      featured={project.frontmatter.featured}
      slideshow={project.frontmatter.slideshow}
    />
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default Project
