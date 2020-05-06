import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import Container from '../components/container'
import Layout from '../components/layout'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from '../components/block-content'
import RoleList from '../components/role-list'
import { format, formatDistance, differenceInDays } from 'date-fns'
import SEO from '../components/seo'

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

const RelatedProjects = styled.div`
	padding: 2rem 0;
	margin: auto;
	width: fit-content;
	* {
		text-align: center;
	}
	ul {
		padding: 0px;
	}
	li {
		list-style: none;
	}
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
		font-variation-settings: 'wght' 300;
		font-family: 'League Spartan';
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

const ArticleBody = styled.div`
	max-width: 26em;
	margin: auto;
	font-size: 1.4rem;
	p,
	ul,
	li,
	a,
	figure {
		font-family: 'League Spartan';
	}
	figure {
		margin: 0;
		max-width: 1600px;
		@media (min-width: 26em) {
			margin-left: calc(50% - 50vw);
			margin-right: calc(50% - 50vw);
		}
		@media (min-width: 1600px) {
			margin-left: calc(50% - 800px);
			margin-right: calc(50% - 800px);
		}
	}
	figcaption {
		font-size: 0.7rem;
		color: ${props => props.theme.fgLight};
		margin: 0.5em 0 0 0.5em;
	}
	li {
		margin-bottom: 1em;
	}
	border-bottom: 1px solid ${props => props.theme.fgLight};
	padding-bottom: 4rem;
`

export const query = graphql`
	query ProjectTemplateQuery($id: String!) {
		sampleProject: sanityProject(id: { eq: $id }) {
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
			seo {
				seo_title
				meta_description
			}
		}
	}
`

const ProjectTemplate = props => {
	const { data, errors } = props
	const project = data && data.sampleProject
	const {
		_rawBody,
		_rawExcerpt,
		title,
		categories,
		mainImage,
		members,
		publishedAt,
		relatedProjects,
		seo,
	} = project
	let seoTitle = title
	let seoMeta = ''
	if (seo) {
		seoTitle = seo.seo_title
		seoMeta = seo.meta_description
	}
	return (
		<Layout location={props.location} type="fullwidth">
			<SEO title={seoTitle} description={seoMeta} />

			{errors && (
				<Container>
					<GraphQLErrorList errors={errors} />
				</Container>
			)}
			{project && (
				<Article>
					<PhotoBookHeader>
						<Title>
							{props.mainImage && mainImage.asset && (
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
							)}
							<h1>{title}</h1>

							{publishedAt && (
								<TagContainer>
									<small>Published on: </small>
									<small className="tag">
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
								</TagContainer>
							)}
							{members && members.length > 1 && (
								<RoleList
									items={members}
									title="Project members"
								/>
							)}
							{categories && categories.length > 0 && (
								<TagContainer>
									<small>Categories</small>
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
						</Title>
						{_rawExcerpt && (
							<Meta>
								<BlockContent blocks={_rawExcerpt || []} />
							</Meta>
						)}
					</PhotoBookHeader>

					{_rawBody && (
						<ArticleBody>
							<BlockContent blocks={_rawBody || []} />
						</ArticleBody>
					)}

					{relatedProjects && relatedProjects.length > 0 && (
						<RelatedProjects>
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
						</RelatedProjects>
					)}
				</Article>
			)}
		</Layout>
	)
}

export default ProjectTemplate
