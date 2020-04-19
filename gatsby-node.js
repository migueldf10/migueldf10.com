const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
var slugify = require('slugify')

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	const blogPost = path.resolve(`./src/templates/blog-post.jsx`)
	const photobook = path.resolve(`./src/templates/photobook.jsx`)

	const result = await graphql(
		`
      {
        posts: allMarkdownRemark(
			filter: { frontmatter: { 
				type: { ne: "photobook" }
				published: { ne: false }
		 } }
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
			portfolios: allMdx(
				filter: { frontmatter: { 
					type: { eq: "photobook" }
					published: { ne: false }
				} }
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
	const posts = result.data.posts.edges
	const portfolios = result.data.portfolios.edges

	posts.forEach((post, index) => {
		const previous = index === posts.length - 1 ? null : posts[index + 1].node
		const next = index === 0 ? null : posts[index - 1].node

		createPage({
			path: post.node.fields.slug,
			component: blogPost,
			context: {
				slug: post.node.fields.slug,
				previous,
				next,
			},
		})
	})
	portfolios.forEach((portfolio, index) => {
		const previous = index === portfolios.length - 1 ? null : portfolios[index + 1].node
		const next = index === 0 ? null : portfolios[index - 1].node
		createPage({
			path: portfolio.node.fields.slug,
			component: photobook,
			context: {
				slug: portfolio.node.fields.slug,
				previous,
				next,
			},
		})
	})
}

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		let value = createFilePath({ node, getNode, trailingSlash: false })
		if (node.frontmatter && node.frontmatter.slug) {
			value = "/" + node.frontmatter.slug
		}
		value = slugify("/articles" + value, { remove: /[*+~.()'"!:?@]/g, lower: true })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
	if (node.internal.type === `Mdx`) {
		let value = createFilePath({ node, getNode, trailingSlash: false })

		if (node.frontmatter && node.frontmatter.slug) {
			value = "/" + node.frontmatter.slug
		}

		value = slugify("/projects" + value, { remove: /[*+~.()'"!:@]/g, lower: true })

		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}
