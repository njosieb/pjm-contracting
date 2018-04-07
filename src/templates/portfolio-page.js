import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uniq from 'lodash/uniq'

export class PortfolioPageTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredProjects: [],
      activeTag: ''
    }

    this.filterProjects = this.filterProjects.bind(this)
  }

  componentDidMount() {
    this.filterProjects(this.state.activeTag)
  }

  filterProjects(filteringTag) {
    let newFiltered = []
    if (filteringTag === '') {
      newFiltered = this.props.projects
    } else {
      newFiltered = this.props.projects.filter(project =>
        project.tags.includes(filteringTag)
      )
    }

    this.setState({
      filteredProjects: newFiltered,
      activeTag: filteringTag
    })
  }

  render() {
    const { heading, title, intro, tags } = this.props
    const { activeTag, filteredProjects } = this.state
    return (
      <section className="portfolio-main">
        <div
          className="portfolio-header pt6 pb5"
          style={{
            backgroundImage: `url(${heading}`
          }}
        >
          <h1 className="mw7 f-5 center white mv0">{title}</h1>
        </div>
        <div className="portfoilo-body">
          <p className="mw6 center tc pv3">{intro}</p>
          <div className="filtering-tags mw7 center flex justify-center">
            <div
              className={
                activeTag === ''
                  ? 'project-filter clickable underline-hover mh3 pointer f4 active'
                  : 'project-filter clickable underline-hover mh3 pointer f4'
              }
              onClick={() => this.filterProjects('')}
            >
              All
            </div>
            {tags.map((tag, i) => (
              <div
                key={i}
                onClick={() => this.filterProjects(tag)}
                className={
                  activeTag === tag
                    ? 'project-filter clickable underline-hover mh3 pointer f4 active'
                    : 'project-filter clickable underline-hover mh3 pointer f4'
                }
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="portfolio-container flex flex-wrap justify-center pb4 pt4">
            {filteredProjects.map((project, id) => (
              <div
                key={id}
                id={project.id}
                className="project pointer relative mb4 mh4"
              >
                <div className="project-info absolute w-100">
                  <h3 className="project-title tc pt3 ma0 flex items-center justify-center">
                    <span className="project-title-text blue-darker underline-hover lh-copy">
                      {project.title}
                    </span>
                    <div className="project-date tc f5 lh-copy">
                      &nbsp;&mdash; {project.date}
                    </div>
                  </h3>
                </div>
                <div className="image-container center hover-shadow">
                  <img className="db" src={project.featured} />
                </div>
              </div>
            ))}
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
  projects: PropTypes.array,
  tags: PropTypes.array
}

const PortfolioPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const projects = data.allMarkdownRemark.edges
  const portfolioProjects = frontmatter.projects.map(item => item.project)

  frontmatter.projects = projects
    .filter(project =>
      portfolioProjects.includes(project.node.frontmatter.title)
    )
    .map(project => {
      return {
        id: project.node.id,
        title: project.node.frontmatter.title,
        tags: project.node.frontmatter.tags,
        featured: project.node.frontmatter.featured,
        date: project.node.frontmatter.date
      }
    })
  const tags = uniq(
    frontmatter.projects
      .map(project => project.tags)
      .reduce((tags, tagArray) => {
        return [...tags, ...tagArray]
      }, [])
  )

  return (
    <PortfolioPageTemplate
      title={frontmatter.title}
      heading={frontmatter.heading}
      intro={frontmatter.intro}
      projects={frontmatter.projects}
      tags={tags}
    />
  )
}

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired
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
