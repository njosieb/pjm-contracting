import React from 'react'
import PropTypes from 'prop-types'

// TODO: Add tags
export const PortfolioPageTemplate = ({ title, heading, intro, projects }) => {
  return (
    <section className="portfolio-main">
      <div
        className="portfolio-header pt6 pb5"
        style={{
          backgroundImage: heading
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
          {/* {% for tag in site.data.config.tags %}
      <div data-tagname="{{ tag | lower }}" class="project-filter clickable underline-hover mh3 pointer f4">{{ tag }}</div>
      {% endfor %} */}
        </div>
        <div className="portfolio-container flex flex-wrap justify-center pb4 pt4">
          {projects.map((project, id) => (
            <div
              key={id}
              id={project.id}
              className="project pointer relative mb4 mh4 {{ project.tags | string | replace(',', ' ') | lower }}"
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
                <div className="tags tc pb2">
                  {/* {% for tag in project.tags %}
                <a href="/portfolio#{{tag | lower}}" data-tagname="{{ tag | lower }}" class="filter-tag blue-darker underline-hover">{{ tag }}</a>{% if not loop.last %}<span>, </span>{% endif %}
              {% endfor %} */}
                </div>
              </div>
              <div className="image-container center hover-shadow">
                <img className="db" src={project.image} />
              </div>
            </div>
            // {% else %}
            // <div>Projects Coming Soon!!</div>
          ))}
        </div>
      </div>
    </section>
  )
}

PortfolioPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  projects: PropTypes.array
}

const PortfolioPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <PortfolioPageTemplate
      title={frontmatter.title}
      heading={frontmatter.heading}
      intro={frontmatter.intro}
      projects={frontmatter.projects}
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
      }
    }
  }
`
