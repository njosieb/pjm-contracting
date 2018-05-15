import format from 'date-fns/format'
import uniq from 'lodash/uniq'
import PropTypes from 'prop-types'
import React from 'react'

export const PortfolioPageTemplate = ({
  title,
  heading,
  intro,
  projects,
  tags
}) => {
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
            className="project-filter underline-hover mh3 pointer f4"
          >
            All
          </div>
          {tags.map((tag, i) => (
            <div
              key={i}
              className="project-filter clickable underline-hover mh3 pointer f4"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="portfolio-container flex flex-wrap justify-center pb4 pt4">
          {/* <div>Projects Coming Soon!!</div> */}
          {projects.map((project, id) => {
            const projectDate = format(project.date, 'MMM YYYY')
            return (
              <div
                key={id}
                id={project.id}
                className="project pointer relative mb4 mh4" // {{ project.tags | string | replace(',', ' ') | lower }}
              >
                <div className="project-info absolute w-100">
                  <h3 className="project-title tc pt3 ma0 flex items-center justify-center">
                    <span className="project-title-text blue-darker underline-hover lh-copy">
                      {project.title}
                    </span>
                    <div className="project-date tc f5 lh-copy">
                      &nbsp;&mdash; {projectDate}
                    </div>
                  </h3>
                </div>
                <div className="image-container center hover-shadow">
                  <img className="db" src={project.featured} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

PortfolioPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired
}

const PortfolioPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { edges } = data.allMarkdownRemark
  const projectRaws = edges.map(edge => edge.node.frontmatter)
  frontmatter.projects = frontmatter.projects.map(projectNode =>
    projectRaws.find(proj => proj.title === projectNode.project)
  )
  const tags = uniq(
    frontmatter.projects.reduce(
      (tagList, project) => [...tagList, ...project.tags],
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
