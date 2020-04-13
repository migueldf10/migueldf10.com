import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'
import Img from 'gatsby-image'

const PortfolioGridItemContainer = styled(Link)`
	width: 50%;
	h3 {
		font-size: 30px;
		font-variation-settings: 'wdth' 160, 'wght' 600;
		letter-spacing: -2px;
		margin: 1rem 0 1rem;
	}
	.button {
		color: ${props => props.theme.fg};
		font-weight: 700;
	}
	p {
		margin: 0px;
		padding-bottom: 12px;
		line-height: 1.2;
	}
	border-bottom: 1px solid ${props => props.theme.fgLight};
	padding: 18px 32px 16px;
	&:hover {
		background: ${props => props.theme.fgAccent};
	}
	&:last-child {
		border: none;
	}
	${MEDIA.PHONE`
		padding: 18px 0px 16px;
		width: 100%;
		h3{
			font-variation-settings: 'wdth' 80, 'wght' 600;
			letter-spacing: 0px;
		}
	  `}
`

const Header = styled.div`
	text-transform: uppercase;
	small {
		margin-right: 16px;
		display: inline-block;
		font-weight: 700;
		&:first-child {
			color: #777;
		}
		&:last-child {
			font-weight: 300;
		}
		${MEDIA.PHONE`
        	font-size: 12px;
    	`}
	}
	margin-bottom: 5px;
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
					<small>{node.frontmatter.date}</small>
					{node.frontmatter.tags
						? node.frontmatter.tags.map((tag, index) => (
								<small key={index}>{tag}</small>
						  ))
						: null}
				</Header>
				<h3>{title}</h3>
			</PortfolioGridItemContainer>
		)
	}
}
