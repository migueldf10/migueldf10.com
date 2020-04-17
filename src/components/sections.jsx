import React, { Component } from 'react'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'

const ColumnContainer = styled.div`
	max-width: 50%;
	padding: 32px;
	${MEDIA.TABLET`
		max-width: 100%;
		
	`}
`

const RowContainer = styled.div`
	p {
		display: flex;
		flex-direction: row;
		margin: 0px;
		.gatsby-resp-image-wrapper {
			width: 100%;
			margin: 10px !important;
		}

		${MEDIA.TABLET`
			flex-direction: column;
			
			.gatsby-resp-image-wrapper {
				width: 100%;
				margin: 10px 0px !important;
			}
		`}
	}
`
const RowStickyContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	div {
		display: inline-block;
		position: sticky;
		margin: 0px;
		top: 20%;
		width: 100%;
		margin-bottom: 100px;
	}
	.gatsby-resp-image-wrapper {
		width: 100%;
		margin: 10px !important;
	}

	${MEDIA.TABLET`
			flex-direction: column;
			
		`}
`
export class Row extends Component {
	render() {
		const { children } = this.props
		return <RowContainer>{children}</RowContainer>
	}
}
export class RowSticky extends Component {
	render() {
		const { children } = this.props
		return <RowStickyContainer>{children}</RowStickyContainer>
	}
}

export class Column extends Component {
	render() {
		const { children } = this.props
		return <ColumnContainer>{children}</ColumnContainer>
	}
}

export class TextBlock extends Component {
	render() {
		const TextBlockContainer = styled.div`
			font-size: 1.4rem;
			padding: 2rem 30% 2rem 0;
			font-variation-settings: 'wdth' 100, 'wght' 400;
			letter-spacing: -1px;
			${MEDIA.TABLET`
				padding: 2rem 0;
				font-size: 1.1rem;
			`}
		`
		const { children } = this.props
		return <TextBlockContainer>{children}</TextBlockContainer>
	}
}
