import React from 'react'
import { Link } from 'gatsby'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const ArticleNavigationContainer = styled.div`
	border-top: 1px solid ${props => props.theme.fgLight};
	margin-top: 3rem;
	a {
		transition: 0.5s;
		font-variation-settings: 'wdth' 100, 'wght' 700;
		letter-spacing: 0px;
		:hover {
			font-variation-settings: 'wdth' 130, 'wght' 300;
			letter-spacing: -2px;
		}
	}
`
class ArticleNavigation extends React.Component {
	render() {
		const { previous, next } = this.props
		return (
			<ArticleNavigationContainer as="nav">
				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
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
