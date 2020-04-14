import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const ArticleGridItemContainer = styled.article`
	max-width: 100%;
	border-bottom: 1px solid ${props => props.theme.fgLight};
	padding: 18px 16px 16px;
	&:last-child {
		border: none;
	}
	a {
		display: inline-block;
		color: ${props => props.theme.ctaFg};
		background-color: ${props => props.theme.ctaBg};
		padding: 10px 20px;
		border-radius: 20px;
		text-transform: none;
		text-decoration: none;
		font-variation-settings: 'wdth' 100, 'wght' 600;
		letter-spacing: 1px;
		transition: 0.5s;
		:hover {
			font-variation-settings: 'wdth' 140, 'wght' 900;
			letter-spacing: -1px;
		}
	}
	h3 {
		font-size: 30px;
		font-variation-settings: 'wdth' 160, 'wght' 600;
		letter-spacing: -2px;
		margin: 0.3rem 0 1rem;
		line-height: 1;
	}
	.button {
		color: ${props => props.theme.fg};
		font-weight: 700;
	}
	p {
		margin: 0px;
		padding-bottom: 1rem;
		line-height: 1.2;
	}

	${MEDIA.PHONE`
    	padding: 18px 0px 16px;
		h3{
			font-variation-settings: 'wdth' 80, 'wght' 600;
			letter-spacing: 0px;
		}
  	`}
`
const Header = styled.div`
	text-transform: uppercase;
	margin: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	span {
		color: ${props => props.theme.fgLight};
		font-size: 0.8rem;
		margin-right: 16px;
		display: inline-block;
		font-variation-settings: 'wdth' 110, 'wght' 300;
	}
	.tagContainer {
		margin: 0;
		padding: 0;
		span {
			margin: 0;
			margin-left: 0.5rem;
			padding: 0;
			line-height: 1;
			color: ${props => props.theme.fgLight};
		}
	}
	${MEDIA.PHONE`
		padding-bottom:3px;
		span{
			font-size:0.6rem;
		}
		.tagContainer{
			span{
				margin-left: 0.5rem;
				font-size:0.6rem;
			}
		}
  	`}
`
export default class ArticleGridElement extends React.Component {
	render() {
		const { node } = this.props
		const title = node.frontmatter.title || node.fields.slug

		return (
			<ArticleGridItemContainer>
				<Header>
					<div className="dateContainer">
						<span>{node.frontmatter.date}</span>
					</div>
					{node.frontmatter.tags ? (
						<div className="tagContainer">
							{node.frontmatter.tags.map((tag, index) => (
								<span key={index}>{tag}</span>
							))}
						</div>
					) : null}
				</Header>
				<h3>{title}</h3>
				<section>
					<p
						dangerouslySetInnerHTML={{
							__html:
								node.frontmatter.description || node.excerpt,
						}}
					/>
				</section>
				<Link to={node.fields.slug}>Read Article</Link>
			</ArticleGridItemContainer>
		)
	}
}
