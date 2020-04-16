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
		.gatsby-resp-image-wrapper {
			width: 100%;
			margin: 10px !important;
		}

		${MEDIA.TABLET`
			flex-direction: column;
			
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
