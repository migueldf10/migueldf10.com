const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
var slugify = require('slugify')
const { isFuture, parseISO } = require('date-fns')

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions
	const result = await graphql(
		`
		{
			articles: allSanityArticle(
				filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
			) {
				edges {
					node {
						id
						publishedAt
						slug {
							current
						}
					}
				}
			}
			
			projects: allSanityProject(
				filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
			) {
				edges {
					node {
						id
						publishedAt
						slug {
							current
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

	const articleEdges = (result.data.articles || {}).edges || []
	const projectEdges = (result.data.projects || {}).edges || []

	projectEdges
		.filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
		.forEach(edge => {
			const id = edge.node.id
			const slug = edge.node.slug.current
			const path = `/project/${slug}`

			reporter.info(`Creating project page: ${path}`)

			createPage({
				path,
				component: require.resolve('./src/templates/project.jsx'),
				context: { id }
			})
		})
	articleEdges
		.filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
		.forEach(edge => {
			const id = edge.node.id
			const slug = edge.node.slug.current
			const path = `/article/${slug}`

			reporter.info(`Creating project page: ${path}`)

			createPage({
				path,
				component: require.resolve('./src/templates/article.jsx'),
				context: { id }
			})
		})


}

//exports.onCreateNode = ({ node, actions, getNode }) => {
//	const { createNodeField } = actions

//	if (node.internal.type === `MarkdownRemark`) {
//		let value = createFilePath({ node, getNode, trailingSlash: false })
//		if (node.frontmatter && node.frontmatter.slug) {
//			value = "/" + node.frontmatter.slug
//		}
//		value = slugify("/articles" + value, { remove: /[*+~.()'"!:?@]/g, lower: true })
//		createNodeField({
//			name: `slug`,
//			node,
//			value,
//		})
//	}
//	if (node.internal.type === `Mdx`) {
//		let value = createFilePath({ node, getNode, trailingSlash: false })

//		if (node.frontmatter && node.frontmatter.slug) {
//			value = "/" + node.frontmatter.slug
//		}

//		value = slugify("/projects" + value, { remove: /[*+~.()'"!:@]/g, lower: true })

//		createNodeField({
//			name: `slug`,
//			node,
//			value,
//		})
//	}
//}


