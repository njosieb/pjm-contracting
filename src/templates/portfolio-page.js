import format from 'date-fns/format'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import capitalize from 'lodash/capitalize'
import uniq from 'lodash/uniq'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const window = global.window

export class PortfolioPageTemplate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteringTag: '',
      filteredProjects: []
    }
  }

  componentWillMount() {
    this.filterProjects(this.props.currentTag)
  }

  filterProjects = tag => {
    try {
      window.history.pushState(null, null, `#${tag.toLowerCase()}`)
    } catch (e) {
      console.error(e) // eslint-disable-line
    }
    const projectsToSet = tag
      ? this.props.projects.filter(proj => proj.frontmatter.tags.includes(tag))
      : this.props.projects
    this.setState({
      filteringTag: tag,
      filteredProjects: projectsToSet
    })
  }

  render() {
    const { title, intro, tags } = this.props
    const { filteredProjects, filteringTag } = this.state

    return (
      <section className="portfolio-main flex-auto">
        <div className="portfolio-header relative pt5 bg-green-light" />
        <h1 className="relative ph5 pt4 f1 lh-copy center z-2 mv0">{title}</h1>
        <div className="portfoilo-body">
          <p className="mw6 center tc pa3">{intro}</p>
          <div className="filtering-tags mw7 center flex flex-wrap flex-nowrap-ns justify-center">
            <div
              id="all-projects"
              className={`project-filter underline-hover mh3 pointer f4 ${
                filteringTag === '' ? 'active-tag' : ''
              }`}
              onClick={() => this.filterProjects('')}
            >
              All
            </div>
            {tags.map((tag, i) => (
              <div
                key={i}
                className={`project-filter clickable underline-hover mh3 pointer f4 ${
                  filteringTag === tag ? 'active-tag' : ''
                }`}
                onClick={() => this.filterProjects(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="portfolio-container flex flex-wrap justify-center pb4 pt4">
            {/* <div>Projects Coming Soon!!</div> */}
            {filteredProjects.map(project => {
              const projectDate = format(project.frontmatter.date, 'MMM YYYY')
              return (
                <Link
                  key={project.id}
                  to={project.fields.slug}
                  className="project pointer relative mb4 mh4"
                >
                  <div className="project-info blue-darker absolute w-100 z-5">
                    <h3 className="project-title tc pt3 ma0 flex items-center justify-center">
                      <span className="project-title-text underline-hover lh-copy">
                        {project.frontmatter.title}
                      </span>
                      <div className="project-date tc f5 lh-copy">
                        &nbsp;&mdash; {projectDate}
                      </div>
                    </h3>
                    <div className="project-tags flex justify-center pb2">
                      {project.frontmatter.tags.map((tag, i) => (
                        <span key={i}>
                          <span className="blue-darker">{tag}</span>
                          {i + 1 < project.frontmatter.tags.length && (
                            <span>,&nbsp;</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="image-container center hover-shadow">
                    <Img
                      className="db"
                      title="featured-image"
                      alt="featured image"
                      sizes={project.frontmatter.featured.childImageSharp.sizes}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

PortfolioPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  currentTag: PropTypes.string
}

const PortfolioPage = ({ data, location }) => {
  const { title, intro } = data.markdownRemark.frontmatter
  const { projects } = data.markdownRemark.fields

  const tags = uniq(
    projects.reduce(
      (tagList, project) => [...tagList, ...project.frontmatter.tags],
      []
    )
  )

  return (
    <PortfolioPageTemplate
      title={title}
      intro={intro}
      projects={projects}
      tags={tags}
      currentTag={capitalize(location.hash.replace('#', ''))}
    />
  )
}

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default PortfolioPage

export const portfolioPageQuery = graphql`
  query PortfolioPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        projects {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
            featured {
              childImageSharp {
                sizes(maxWidth: 700, quality: 95) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
      frontmatter {
        title
        intro
        projects {
          project
        }
      }
    }
  }
`
