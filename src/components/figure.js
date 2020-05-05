import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'
import clientConfig from '../../client-config'


export default ({ node }) => {
	if (!node.asset) {
		return null
	}

	const fluidProps = getFluidGatsbyImage(node.asset.id, { maxWidth: 1600 }, clientConfig.sanity)
	console.log(node)

	return (
		<figure   >
			<Img fluid={fluidProps} alt={node.alt} />
			{node.caption && <figcaption>{node.caption}</figcaption>}
		</figure>
	)
}
