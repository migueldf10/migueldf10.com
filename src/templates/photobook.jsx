import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
import ArticleNavigation from '../components/articleNavigation'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const PhotoBookHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 32px 0;

	${MEDIA.PHONE`
		flex-direction: column;

		h1{
			width: 100%;
		}
	`}
`

const Meta = styled.div`
	font-size: 1.3rem;
`

const Title = styled.div`
	width: 50%;
	h1 {
		font-variation-settings: 'wdth' 140, 'wght' 900;
		letter-spacing: -1px;
		margin: 0px;
		padding-bottom: 1rem;
	}

	${MEDIA.PHONE`
		width:100%;
		padding: 0 0 32px;
		h1{
			width: 100%;
		}
	`}
`

const TagContainer = styled.div`
	overflow: auto;
	display: flex;
	flex-wrap: wrap;

	small {
		margin: 0px;
		text-transform: uppercase;

		font-size: 0.7rem;
		margin-right: 1rem;
		display: inline;
		word-break: break-word;
		padding-bottom: 0.5rem;
	}
`

const Article = styled.article`
	padding: 32px;

	background-color: ${props => props.theme.bg};
	img {
		width: auto;
		height: auto;
	}
	font-size: 0.7rem;

	${MEDIA.PHONE`
		padding:16px;
	`}
`

class PhotobookTemplate extends React.Component {
	render() {
		const { excerpt, body } = this.props.data.post
		const { title, tags, description } = this.props.data.post.frontmatter
		const siteTitle = this.props.data.site.siteMetadata.title
		const { previous, next } = this.props.pageContext

		return (
			<Layout
				location={this.props.location}
				title={siteTitle}
				type="fullwidth"
			>
				<SEO title={title} description={description || excerpt} />
				<Article>
					<PhotoBookHeader>
						<Title>
							<h1>{title}</h1>
							{tags ? (
								<TagContainer>
									{tags.map((tag, index) => (
										<small key={index}>{tag}</small>
									))}
								</TagContainer>
							) : null}
						</Title>
						<Meta>{description || excerpt}</Meta>
					</PhotoBookHeader>
					<MDXRenderer>{body}</MDXRenderer>
					<ArticleNavigation previous={previous} next={next} />
				</Article>
			</Layout>
		)
	}
}

export default PhotobookTemplate

export const photoboookQuery = graphql`
	query PhotobookBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		post: mdx(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			body
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
				tags
				img {
					childImageSharp {
						fluid(maxWidth: 1200) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`
