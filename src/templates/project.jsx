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
		line-break: anywhere;
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
	} = project
	return (
		<Layout location={props.location} type="fullwidth">
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

					{_rawBody && <BlockContent blocks={_rawBody || []} />}

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
				</Article>
			)}
		</Layout>
	)
}

export default ProjectTemplate
