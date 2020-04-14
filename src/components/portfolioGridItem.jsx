import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
import Img from 'gatsby-image'

const PortfolioGridItemContainer = styled(Link)`
	width: 50%;
	padding: 1rem;
	${MEDIA.PHONE`
		padding: 0.5rem 0rem;
		width:100%;
	`}
`

const Header = styled.div`
	transition: 0.5s;
	background: ${props => props.theme.bgLight};
	padding: 18px;

	h3 {
		font-size: 20px;
		font-variation-settings: 'wdth' 100, 'wght' 700;
		letter-spacing: 2px;
		margin: 1rem 0;
		transition: 0.7s;
	}
	small {
		text-transform: uppercase;
		font-variation-settings: 'wdth' 100, 'wght' 300;
		transition: 0.9s;
	}

	&:hover {
		background: ${props => props.theme.bgAccent};
		h3 {
			font-variation-settings: 'wdth' 200, 'wght' 900;
			letter-spacing: -4px;
		}
		small {
			font-variation-settings: 'wdth' 100, 'wght' 700;
		}
	}
	${MEDIA.PHONE`
		h3{
			font-variation-settings: 'wdth' 80, 'wght' 600;
			letter-spacing: 0px;
		}
	`}
`
const TagContainer = styled.div`
	overflow: auto;
	display: flex;
	::-webkit-scrollbar {
		height: 2px;
	}
	::-webkit-scrollbar-track {
		background-color: ${props => props.theme.bgLight};
	}

	::-webkit-scrollbar-thumb {
		background-color: ${props => props.theme.bgAccent};
	}
	small {
		margin: 0px;
		margin-right: 1rem;
		white-space: nowrap;
		display: inline-block;
		padding-bottom: 0.5rem;
	}
`
export default class PortfolioGridItem extends React.Component {
	render() {
		const { node } = this.props
		const title = node.frontmatter.title || node.fields.slug

		return (
			<PortfolioGridItemContainer to={node.fields.slug}>
				<Header>
					{node.frontmatter.img && (
						<Img
							fluid={node.frontmatter.img.childImageSharp.fluid}
						/>
					)}
					<h3>{title}</h3>

					{node.frontmatter.tags ? (
						<TagContainer>
							{node.frontmatter.tags.map((tag, index) => (
								<small key={index}>{tag}</small>
							))}
						</TagContainer>
					) : null}
				</Header>
			</PortfolioGridItemContainer>
		)
	}
}
