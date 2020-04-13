import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const ArticleNavigationContainer = styled.div`
	border-top: 1px solid ${props => props.theme.fgLight};
	padding: 10px 0px;
	ul {
		padding: 0px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	li {
		list-style: none;
		margin: 0px;
	}
	a {
		background: ${props => props.theme.bgLight};
		margin: 10px 0px;
		padding: 10px 20px;
		transition: 0.2s;
		font-variation-settings: 'wdth' 100, 'wght' 700;
		letter-spacing: 0px;
		display: block;
		width: 100%;
		border-radius: 30px;
		box-shadow: -1px -1px 0px rgba(255, 255, 255, 0.5),
			1px -1px 0px rgba(255, 255, 255, 0.5),
			-1px 1px 0px rgba(255, 255, 255, 0.5),
			1px 1px 0px rgba(255, 255, 255, 0.5), -1px 2px 1px #a0a0a044,
			-4px 8px 4px #a0a0a022, -5px 6px 5px #a0a0a022,
			-6px 12px 6px #a0a0a022, -7px 13px 7px #a0a0a044,
			-8px 15px 8px #a0a0a022, -9px 14px 6px #a0a0a022,
			-10px 19px 10px #a0a0a022, -11px 12px 7px #a0a0a022,
			-12px 22px 12px #a0a0a011, -21px 39px 21px #a0a0a011,
			1px -1px 1px #00ee00ee, 3px -3px 3px #00ee0022;
		:hover {
			font-variation-settings: 'wdth' 130, 'wght' 300;
			letter-spacing: -2px;
		}
	}
	${MEDIA.PHONE`
		ul{
			flex-direction: column;
			align-items: stretch;
		}
	`}
`
class ArticleNavigation extends React.Component {
	render() {
		const { previous, next } = this.props
		return (
			<ArticleNavigationContainer as="nav">
				<ul>
					<li>
						{previous && (
							<Link to={previous.fields.slug} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={next.fields.slug} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</ArticleNavigationContainer>
		)
	}
}

export default ArticleNavigation
