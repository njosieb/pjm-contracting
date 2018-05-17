import format from 'date-fns/format'
import Link from 'gatsby-link'
import capitalize from 'lodash/capitalize'
import uniq from 'lodash/uniq'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

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
    window.history.pushState(null, null, `#${tag.toLowerCase()}`)
    const projectsToSet = tag
      ? this.props.projects.filter(proj => proj.frontmatter.tags.includes(tag))
      : this.props.projects
    this.setState({
      filteringTag: tag,
      filteredProjects: projectsToSet
    })
  }

  render() {
    const { title, heading, intro, tags } = this.props
    const { filteredProjects, filteringTag } = this.state

    return (
      <section className="portfolio-main">
        <div
          className="portfolio-header pt6 pb5"
          style={{
            backgroundImage: `url(${heading})`
          }}
        >
          <h1 className="mw7 f-5 center white mv0">{title}</h1>
        </div>
        <div className="portfoilo-body">
          <p className="mw6 center tc pv3">{intro}</p>
          <div className="filtering-tags mw7 center flex justify-center">
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
                  className="project pointer relative mb4 mh4" // {{ project.tags | string | replace(',', ' ') | lower }}
                >
                  <div className="project-info absolute w-100">
                    <h3 className="project-title tc pt3 ma0 flex items-center justify-center">
                      <span className="project-title-text blue-darker underline-hover lh-copy">
                        {project.frontmatter.title}
                      </span>
                      <div className="project-date tc f5 lh-copy">
                        &nbsp;&mdash; {projectDate}
                      </div>
                    </h3>
                  </div>
                  <div className="image-container center hover-shadow">
                    <img className="db" src={project.frontmatter.featured} />
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
  heading: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  currentTag: PropTypes.string
}

const PortfolioPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark
  const { edges } = data.allMarkdownRemark
  const projectRaws = edges.map(edge => edge.node)
  frontmatter.projects = frontmatter.projects.map(projectNode =>
    projectRaws.find(proj => proj.frontmatter.title === projectNode.project)
  )
  const tags = uniq(
    frontmatter.projects.reduce(
      (tagList, project) => [...tagList, ...project.frontmatter.tags],
      []
    )
  )

  return (
    <PortfolioPageTemplate
      title={frontmatter.title}
      heading={frontmatter.heading}
      intro={frontmatter.intro}
      projects={frontmatter.projects}
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
      frontmatter {
        title
        heading
        intro
        projects {
          project
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "project" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
            featured
          }
        }
      }
    }
  }
`
