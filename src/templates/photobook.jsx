import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
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
	margin-bottom: 4px;

	small {
		margin: 0px;
		text-transform: uppercase;
		font-size: 0.7rem;
		line-height: 0.7rem;
		padding: 1px;
		margin-right: 4px;
		display: inline-block;
		word-break: break-word;
		&.tag {
			background: ${props => props.theme.bgLight};
		}
	}
	${MEDIA.PHONE`
		small{
			font-size: 0.6rem;
			margin-right: 0.3rem;
		}
	`}
`

const Article = styled.article`
	padding: 32px;

	background-color: ${props => props.theme.bg};
	img {
		width: auto;
		height: auto;
	}
	font-size: 1rem;

	${MEDIA.PHONE`
		padding:16px;
	`}
`

class PhotobookTemplate extends React.Component {
	render() {
		const { excerpt, body } = this.props.data.post
		const {
			title,
			tags,
			description,
			tech,
			date,
		} = this.props.data.post.frontmatter
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
							{date && (
								<>
									<TagContainer>
										<small>Published on: </small>
										<small className="tag">{date}</small>
									</TagContainer>
								</>
							)}

							{tech ? (
								<>
									<TagContainer>
										<small>Tech stack:</small>
										{tech.map((techu, index) => (
											<small key={index} className="tag">
												{techu}
											</small>
										))}
									</TagContainer>
								</>
							) : null}
							{tags ? (
								<TagContainer>
									<small>Topics:</small>
									{tags.map((tag, index) => (
										<small key={index} className="tag">
											{tag}
										</small>
									))}
								</TagContainer>
							) : null}
						</Title>
						<Meta>{description || excerpt}</Meta>
					</PhotoBookHeader>
					<MDXRenderer>{body}</MDXRenderer>
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
				date(formatString: "DD/MM/YY")
				description
				tags
				tech
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
