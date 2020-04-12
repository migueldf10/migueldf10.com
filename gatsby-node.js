const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	const blogPost = path.resolve(`./src/templates/blog-post.jsx`)
	const photobook = path.resolve(`./src/templates/photobook.jsx`)
	const result = await graphql(
		`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                type
              }
            }
          }
        }
      }
    `
	)

	if (result.errors) {
		throw result.errors
	}

	// Create blog posts pages.
	const posts = result.data.allMarkdownRemark.edges

	posts.forEach((post, index) => {
		const previous = index === posts.length - 1 ? null : posts[index + 1].node
		const next = index === 0 ? null : posts[index - 1].node
		if (post.node.frontmatter.type === "photobook") {
			createPage({
				path: post.node.fields.slug,
				component: photobook,
				context: {
					slug: post.node.fields.slug,
					previous,
					next,
				},
			})
		} else {
			createPage({
				path: post.node.fields.slug,
				component: blogPost,
				context: {
					slug: post.node.fields.slug,
					previous,
					next,
				},
			})
		}
	})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}
