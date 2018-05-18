import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'

export const ProjectTemplate = ({
  title,
  description,
  date,
  tags,
  featured,
  slideshow
}) => {
  return (
    <section className="relative">
      <div className="">
        <h3>{title}</h3>
      </div>
      <div className="">
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
                <Img sizes={image.slideImage.childImageSharp.sizes} />
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
  featured: PropTypes.object,
  slideshow: PropTypes.array
}

const Project = ({ data }) => {
  const { frontmatter: project } = data.markdownRemark

  return (
    <ProjectTemplate
      title={project.title}
      description={project.description}
      date={project.date}
      tags={project.tags}
      featured={project.featured}
      slideshow={project.slideshow}
    />
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export const projectQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM, YYYY")
        tags
        featured {
          childImageSharp {
            sizes(maxWidth: 700, quality: 80) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        slideshow {
          slideImage {
            childImageSharp {
              sizes(maxWidth: 700, quality: 95) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`

export default Project
