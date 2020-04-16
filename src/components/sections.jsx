import React from 'react'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'

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
			.gatsby-resp-image-wrapper {
				width: 100%;
				margin: 10px 0px !important;
			}
		`}
	}
`
export class Row extends React.Component {
	render() {
		const { children } = this.props
		return <RowContainer>{children}</RowContainer>
	}
}
