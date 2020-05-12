import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'
import Img from 'gatsby-image'

const BioContainer = styled.div`
	border-top: 1px solid ${props => props.theme.fgLight};
	padding: 60px 0px;
`

export const Content = styled.div`
	padding: 0px 20px;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: start;
	max-width: 60%;
	p {
		font-size: 1.1rem;
		font-variation-settings: 'wdth' 120, 'wght' 500;
		line-height: 1.4;
		letter-spacing: -0.5px;
	}

	${MEDIA.PHONE`
		align-items: start;
		padding: 10px 20px;
		max-width: 100%;
		p{
			font-size:.8rem;
			letter-spacing:0px;
			font-variation-settings: 'wdth' 120, 'wght' 500;
		}
	`}

	a {
		.title {
			font-weight: 700;
			text-decoration: underline;
			background-color: ${props => props.theme.ctaBg};
			color: ${props => props.theme.ctaFg};
			padding: 10px 14px;
			border-radius: 30px;
			display: inline-block;
			margin-bottom: 20px;
			font-variation-settings: 'wdth' 100, 'wght' 600;
			letter-spacing: 1px;
			transition: 0.5s;
			:hover {
				font-variation-settings: 'wdth' 140, 'wght' 900;
				letter-spacing: -1px;
			}
		}
	}
`

const SectionTitle = styled.div`
	h2 {
		text-align: left;
		margin: 0px;
		font-variation-settings: 'wdth' 120, 'wght' 340, 'XOPQ' 300, 'YOPQ' 99;
		color: ${props => props.theme.fgLight};
	}
	padding-top: 42px;
`

const BlogWrapper = styled.div`
	max-width: 60rem;
	padding: 2rem;
	margin: auto;
	position: relative;
	display: flex;
	flex-direction: row;
	background-color: ${props => props.theme.bgLight};

	${MEDIA.TABLET`
		.blogPosts{
			padding:16px;
			width: auto;
			box-sizing: border-box;
		}
	`}
	${MEDIA.PHONE`
		flex-direction: column;
		padding: 0
	`}
`

const ImageWrapper = styled.div`
	.gatsby-image-wrapper {
		height: 80vh;
	}
	width: 40%;
	position: sticky;
	top: 32px;
	margin: 0 0 auto 0;
	${MEDIA.TABLET`

  	`}
	${MEDIA.PHONE`
		display: block;
		width: 100%;
		padding:16px;
		position: static;
		text-align: center;
		margin: 0px auto;
		.gatsby-image-wrapper {
			height: 60vh;
		}

  	`}
`

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
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
					author
					social {
						twitter
						linkedin
					}
					contact {
						email
						phone
					}
				}
			}
		}
	`)

	const { author, social, contact } = data.site.siteMetadata
	return (
		<BioContainer id="profileBio">
			<BlogWrapper>
				<ImageWrapper>
					<Img fluid={data.profileImg.childImageSharp.fluid} />
				</ImageWrapper>
				<Content>
					<SectionTitle>
						<h2>About me</h2>
					</SectionTitle>
					<p>
						My name is Miguel Domenech and I'm a freelance marketer,
						web designer & developer with passion for solving
						complex problems through simple design.
					</p>
					<p>
						Currently I work & live in Amsterdam and I'm looking for
						ambitious (and fun) projects where I could make a
						difference.
					</p>
					<SectionTitle>
						<h2 id="contactBio">Contact information</h2>
					</SectionTitle>
					<p>
						In case you have an idea or proposal, send me an email
						and we can share impressions!
					</p>
					<div className="contactSection">
						<a href={`mailto:${contact.email}?subject=Hey!`}>
							<span className="title">Email</span> -{' '}
						</a>
						<u>{contact.email}</u>
						<br />
						<a href={`tel:${contact.phone}`}>
							<span className="title">Phone</span>
						</a>
						<u> (+31) {contact.phone}</u> <br />
						<a href={`https://linkedin.com/in/${social.linkedin}`}>
							<span className="title">LinkedIn</span> -{' '}
						</a>
						<u>@{social.linkedin}</u>
					</div>
				</Content>
			</BlogWrapper>
		</BioContainer>
	)
}

export default Bio
