import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'

const BioContainer = styled.div`
	border-top: 1px solid ${props => props.theme.fgLight};
	padding: 60px 0px;
`

export const Content = styled.div`
	padding: 0px 20px 140px;
	max-width: 60rem;
	margin: auto;
	display: flex;
	justify-content: space-around;
	align-items: center;
	.column {
		max-width: 60%;
		p {
			font-size: 1.1rem;
			font-variation-settings: 'wdth' 120, 'wght' 500;
			line-height: 1.4;
			letter-spacing: -0.5px;
		}
	}
	${MEDIA.PHONE`
		flex-direction: column;
		align-items: start;
		padding: 10px 20px;
		.column{
			max-width: 100%;
			p{
				font-size:.8rem;
				letter-spacing:0px;
				font-variation-settings: 'wdth' 120, 'wght' 500;

			}
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
		font-variation-settings: 'wdth' 120, 'wght' 240, 'XOPQ' 300, 'YOPQ' 99;
		color: ${props => props.theme.fgLight};
	}
	padding-top: 42px;
`

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
				childImageSharp {
					fixed(width: 150, height: 150) {
						...GatsbyImageSharpFixed
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
					}
				}
			}
		}
	`)

	const { author, social, contact } = data.site.siteMetadata
	return (
		<BioContainer id="profileBio">
			<Content>
				<div className="column">
					<Image
						fixed={data.avatar.childImageSharp.fixed}
						alt={author}
						imgStyle={{
							borderRadius: `50%`,
						}}
					/>
				</div>
				<div className="column ">
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
					<a href={`mailto:${contact.email}?subject=Hey!`}>
						<span className="title">Email</span> -{' '}
					</a>
					<u>{contact.email}</u>
					<br />
					<a href={`https://linkedin.com/in/${social.linkedin}`}>
						<span className="title">LinkedIn</span> -{' '}
					</a>
					<u>@{social.linkedin}</u>
				</div>
			</Content>
		</BioContainer>
	)
}

export default Bio
