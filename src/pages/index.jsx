import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Header from '../components/header'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'
import ArticleGridItem from '../components/articleGridItem'
import {
	mapEdgesToNodes,
	filterOutDocsWithoutSlugs,
	filterOutDocsPublishedInTheFuture,
} from '../lib/helpers'
import ProjectPreviewGrid from '../components/project-preview-grid'

const Container = styled.div`
	padding: 100px 1rem;
	background: ${props => props.theme.bg};
	${MEDIA.TABLET`
		/*margin: 100px 3rem;*/
		padding: 50px 3rem 0;
	`}
	${MEDIA.PHONE`
		margin: 0;
	`}
`

const BlogWrapper = styled.div`
	max-width: 50rem;
	margin: 32px auto;
	padding: 2rem 4rem;
	display: flex;
	flex-direction: column;
	background-color: ${props => props.theme.bgLight};
	${MEDIA.TABLET`
		padding: 1rem;
	`}
`

const SectionTitle = styled.div`
	padding: 0 32px;
	h2 {
		text-align: center;
		margin: 0px;
		font-size: 2rem;
		font-variation-settings: 'wdth' 200, 'wght' 300, 'XOPQ' 200, 'YOPQ' 94,
			'YTAS' 900, 'YTUC' 900, 'YTLC' 420;
		color: ${props => props.theme.fgLight};
	}
	${MEDIA.PHONE`
		h2{
			font-size: 1.6rem;

		}
	`}
`

class BlogIndex extends React.Component {
	render() {
		const { data } = this.props
		const siteTitle = data.site.siteMetadata.title

		const projectNodes = (data || {}).projects
			? mapEdgesToNodes(data.projects)
					.filter(filterOutDocsWithoutSlugs)
					.filter(filterOutDocsPublishedInTheFuture)
			: []
		const articleNodes = (data || {}).articles
			? mapEdgesToNodes(data.articles)
					.filter(filterOutDocsWithoutSlugs)
					.filter(filterOutDocsPublishedInTheFuture)
			: []

		return (
			<Layout location={this.props.location} type="fullwidth">
				<SEO title="migueldf10's freelance website" />
				<Header title="Hello, it's Miguel Domenech">
					<p>
						A freelance web designer, developer and marketer living
						in Amsterdam.
					</p>
				</Header>
				<Container>
					<SectionTitle>
						<h2>Latest Projects</h2>
					</SectionTitle>
					<ProjectPreviewGrid
						nodes={projectNodes}
						browseMoreHref="/archive/"
					/>
				</Container>
				<Container>
					<SectionTitle>
						<h2>Latest Articles</h2>
					</SectionTitle>
					<BlogWrapper>
						{articleNodes &&
							articleNodes.map((node, index) => (
								<ArticleGridItem key={index} {...node} />
							))}
					</BlogWrapper>
				</Container>
			</Layout>
		)
	}
}

export default BlogIndex

export const pageQuery = graphql`
	query {
		icon: file(relativePath: { eq: "cursor+.png" }) {
			relativePath
		}
		profileImg: file(relativePath: { eq: "Miguel-Domenech.jpg" }) {
			relativePath
			childImageSharp {
				fluid(maxWidth: 960) {
					...GatsbyImageSharpFluid
				}
			}
		}
		site {
			siteMetadata {
				title
			}
		}

		projects: allSanityProject(
			limit: 6
			sort: { fields: [publishedAt], order: DESC }
			filter: {
				slug: { current: { ne: null } }
				publishedAt: { ne: null }
			}
		) {
			edges {
				node {
					id
					categories {
						_id
						title
					}
					mainImage {
						crop {
							_key
							_type
							top
							bottom
							left
							right
						}
						hotspot {
							_key
							_type
							x
							y
							height
							width
						}
						asset {
							_id
						}
						alt
					}
					title
					_rawExcerpt
					slug {
						current
					}
				}
			}
		}
		articles: allSanityArticle(
			limit: 4
			sort: { fields: [publishedAt], order: DESC }
			filter: {
				slug: { current: { ne: null } }
				publishedAt: { ne: null }
			}
		) {
			edges {
				node {
					id
					_rawExcerpt
					categories {
						_id
						title
					}
					mainImage {
						crop {
							_key
							_type
							top
							bottom
							left
							right
						}
						hotspot {
							_key
							_type
							x
							y
							height
							width
						}
						asset {
							_id
						}
						alt
					}
					title
					_rawExcerpt
					publishedAt
					slug {
						current
					}
				}
			}
		}
	}
`
