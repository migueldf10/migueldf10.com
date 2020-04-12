import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const ArticleGridItemContainer = styled.article`
	max-width: 100%;
	a {
		color: ${props => props.theme.fg};
		text-transform: none;
		text-decoration: none;
	}
	h3 {
		font-size: 30px;
		font-weight: 600;
	}
	.button {
		color: ${props => props.theme.fg};
		font-weight: 700;
	}
	p {
		margin: 0px;
		margin-bottom: 12px;
		line-height: 1.2;
	}
	border-bottom: 1px solid #999;
	margin-bottom: 18px;
	padding: 16px;
	${MEDIA.PHONE`
    padding: 0px;
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
        margin-right: 8px;

    `}
	}
	margin-bottom: 5px;
`
export default class ArticleGridElement extends React.Component {
	render() {
		const { node } = this.props
		const title = node.frontmatter.title || node.fields.slug

		return (
			<ArticleGridItemContainer>
				<Link style={{ boxShadow: `none` }} to={node.fields.slug}>
					{/* <header> */}
					<Header>
						<small>{node.frontmatter.date}</small>
						{node.frontmatter.tags
							? node.frontmatter.tags.map((tag, index) => (
									<small key={index}>{tag}</small>
							  ))
							: null}
					</Header>
					<h3>{title}</h3>
					{/* </header> */}
					<section>
						<p
							dangerouslySetInnerHTML={{
								__html:
									node.frontmatter.description ||
									node.excerpt,
							}}
						/>
					</section>
					<span className="button">Read Article</span>
				</Link>
			</ArticleGridItemContainer>
		)
	}
}
