const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const projects = result.data.allMarkdownRemark.edges
    projects.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
        }
      })
    })
  })
}

const adjustImagePath = nodePath => image => {
  if (_.isString(image)) {
    if (image.indexOf('/img') === 0) {
      const nextImage = path.relative(
        path.dirname(nodePath),
        path.join(
          __dirname,
          'static/img',
          image.substr('/img'.length)
        )
      )
      console.log('Adjusted image path', nextImage)
      return nextImage
    }
  }
  return image
}

exports.onCreateNode = ({
  node,
  getNode,
  boundActionCreators
}) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
    const { frontmatter } = node
    if (frontmatter) {
      const adjust = adjustImagePath(node.fileAbsolutePath)
      const { featured, heading, slideshow } = frontmatter
      // Image location string -> ImageSharp objects
      if (featured) {
        node.frontmatter.featured = adjust(featured)
      }
      if (heading) {
        node.frontmatter.heading = adjust(heading)
      }
      if (slideshow) {
        node.frontmatter.slideshow.forEach(slide => {
          slide.slideImage = adjust(slide.slideImage)
        })
      }
    }
  }
}

exports.sourceNodes = ({ boundActionCreators, getNodes }) => {
  const { createNodeField } = boundActionCreators;

  getNodes()
    .filter(node => node.internal.type === "MarkdownRemark")
    .forEach(node => {
      if (node.frontmatter.projects) {
        const projectIds = node.frontmatter.projects.map(projectItem => {
          const projectNode = getNodes().find(node2 => node2.internal.type === "MarkdownRemark" && node2.frontmatter.title === projectItem.project);
          if (projectNode) {
            return projectNode.id
          } else {
            return
          }
        })

        createNodeField({
          node,
          name: "projects",
          value: projectIds,
        })
      }
    })
}
