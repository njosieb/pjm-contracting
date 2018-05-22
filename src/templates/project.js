import Img from 'gatsby-image';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ProjectTemplate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewingImageIndex: 0
    }
  }

  updateViewingImage = index => {
    this.setState({
      viewingImageIndex: index
    })
  }

  slideRight = () => {
    const currentIndex = this.state.viewingImageIndex
    const lastIndex = this.props.slideshow.length - 1
    const newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
    this.setState({
      viewingImageIndex: newIndex
    })
  }

  slideLeft = () => {
    const currentIndex = this.state.viewingImageIndex
    const lastIndex = this.props.slideshow.length - 1
    const newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
    this.setState({
      viewingImageIndex: newIndex
    })
  }

  render() {
    const { title, description, date, tags, slideshow } = this.props
    const currentImage = slideshow[this.state.viewingImageIndex]

    return (
      <section className="project-page-container flex-auto relative pt5 bg-green-light">
        <div className="project-info-sidebar bg-white">
          <h3 className="project-info-title f2 f3-ns ph3">{title}</h3>
          <div className="project-date ph3 pt3">{date}</div>
          <div className="project-tags ph3 pb3 flex items-center">
            {tags.map((tag, i) => (
              <Link
                key={i}
                className="project-tag f5 ph2 green-light"
                to={{ pathname: '/portfolio', hash: `#${tag.toLowerCase()}` }}
              >
                {tag}
              </Link>
            ))}
          </div>
          {description && (
            <p className="project-description pa3 mb0">{description}</p>
          )}
          <div className="project-image-thumbnails flex flex-wrap pt3 ph3">
            {slideshow.map((image, id) => (
              <div
                key={id}
                onClick={() => this.updateViewingImage(id)}
                className="image-thumbnail pointer mr2 mb2"
              >
                <Img
                  resolutions={image.slideImage.childImageSharp.resolutions}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="project-slide-viewer flex-auto flex items-center bg-white">
          <div className="project-single-slide flex-auto relative">
            <Img sizes={currentImage.slideImage.childImageSharp.sizes} />
            <div
              className="slide-left pointer w-50 absolute h-100 top-0 left-0 flex items-center pl3"
              onClick={() => this.slideLeft()}
            >
              <i className="fa fa-angle-left black f-5" />
            </div>
            <div
              className="slide-right pointer w-50 absolute h-100 top-0 right-0 flex items-center justify-end pr3"
              onClick={() => this.slideRight()}
            >
              <i className="fa fa-angle-right black f-5" />
            </div>
            <a
              className="view-full-image b--gray ba br2 flex items-center justify-center absolute bottom-2"
              href={currentImage.slideImage.childImageSharp.sizes.originalImg}
            >
              <i className="fa fa-search-plus black" />
            </a>
          </div>
        </div>
      </section>
    )
  }
}

ProjectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.string.isRequired,
  tags: PropTypes.array,
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
        slideshow {
          slideImage {
            childImageSharp {
              sizes(maxWidth: 1200, quality: 90) {
                originalImg
                ...GatsbyImageSharpSizes_withWebp
              }
              resolutions(height: 100, width: 100) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }
  }
`

export default Project
