import React, { Fragment } from 'react'
import ProjectPreview from './project-preview'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'

const PortfolioGrid = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 32px;
	${MEDIA.PHONE`
		padding:0;
	`}
`
function ProjectPreviewGrid(props) {
	return (
		<Fragment   >
			<PortfolioGrid   >
				{props.nodes &&
					props.nodes.map(node => (
						<ProjectPreview {...node} key={node.id} />
					))}
			</PortfolioGrid>

		</Fragment>
	)
}

ProjectPreviewGrid.defaultProps = {
	title: '',
	nodes: [],
	browseMoreHref: ''
}

export default ProjectPreviewGrid
