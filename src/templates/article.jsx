import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
import GraphQLErrorList from '../components/graphql-error-list'
import Container from '../components/container'
import { Link } from 'gatsby'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from '../components/block-content'
import { format, formatDistance, differenceInDays } from 'date-fns'

const ArticleContainer = styled.article`
	background: ${props => props.theme.bg};
	padding: 0.5rem 1rem;
`

const Header = styled.header`
	margin-bottom: 3rem;
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
	width: 100%;
	box-sizing: border-box;
	background: ${props => props.theme.bgLight};
	h1 {
		font-variation-settings: 'wdth' 160, 'wght' 700;
		letter-spacing: -4px;
		font-size: 1.9rem;
	}
	.column {
		display: block;
		height: auto;
		width: 50%;
		&.column-one {
			padding: 0 1rem;
		}
		&.column-two {
			padding-right: 0;
		}
		img {
			max-width: 100%;
		}
	}
	.meta {
		padding: 1rem 0;
		font-size: 1rem;
		font-variation-settings: 'wdth' 80, 'wght' 700;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		small {
			font-variation-settings: 'wght' 300;
			font-family: 'League Spartan';
		}
	}
	${MEDIA.TABLET`
		flex-direction: column;
		.column{
			width: 100%;
			
		}
		h1{
			font-size:1.6rem;
		}
	`};
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

export const query = graphql`
	query ArticleTemplateQuery($id: String!) {
		article: sanityArticle(id: { eq: $id }) {
			id
			publishedAt
			categories {
				_id
				title
			}
			relatedProjects {
				title
				_id
				slug {
					current
				}
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
			slug {
				current
			}
			_rawBody(resolveReferences: { maxDepth: 2 })
			_rawExcerpt

			members {
				_key
				person {
					image {
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
					}
					name
				}
				roles
			}
		}
	}
`

const BlogPostTemplate = props => {
	const { data, errors } = props
	const project = data && data.article
	const {
		_rawBody,
		_rawExcerpt,
		title,
		categories,
		mainImage,
		publishedAt,
		relatedProjects,
	} = project
	return (
		<Layout location={props.location} type="fullwidth">
			{errors && (
				<Container>
					<GraphQLErrorList errors={errors} />
				</Container>
			)}
			{project && (
				<ArticleContainer>
					<Header>
						<div className="column column-one">
							<h1>{title}</h1>
							{_rawExcerpt && (
								<blockquote>
									<BlockContent blocks={_rawExcerpt || []} />
								</blockquote>
							)}
							<div className="meta">
								{publishedAt && (
									<small>
										Published on:
										{differenceInDays(
											new Date(publishedAt),
											new Date()
										) > 3
											? formatDistance(
													new Date(publishedAt),
													new Date()
											  )
											: format(
													new Date(publishedAt),
													'MMMM dd yyyy'
											  )}
									</small>
								)}
								{categories && categories.length > 0 && (
									<TagContainer>
										{categories.map(category => (
											<small
												key={category._id}
												className="tag"
											>
												{category.title}
											</small>
										))}
									</TagContainer>
								)}
							</div>
						</div>
						{mainImage && mainImage.asset && (
							<div className="column column-two">
								<div>
									<img
										src={imageUrlFor(
											buildImageObj(mainImage)
										)
											.width(1200)
											.height(Math.floor((9 / 16) * 1200))
											.fit('crop')
											.url()}
										alt={mainImage.alt}
									/>
								</div>
							</div>
						)}
					</Header>
					{_rawBody && (
						<ArticleContainer>
							<BlockContent blocks={_rawBody || []} />
						</ArticleContainer>
					)}

					{relatedProjects && relatedProjects.length > 0 && (
						<div>
							<h3>Related projects</h3>
							<ul>
								{relatedProjects.map(project => (
									<li key={`related_${project._id}`}>
										{project.slug ? (
											<Link
												to={`/project/${project.slug.current}`}
											>
												{project.title}
											</Link>
										) : (
											<span>{project.title}</span>
										)}
									</li>
								))}
							</ul>
						</div>
					)}
				</ArticleContainer>
			)}
		</Layout>
	)
}

export default BlogPostTemplate
