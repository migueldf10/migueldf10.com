import Figure from './figure'
import React from 'react'
import { Link } from 'gatsby'
const serializers = {
	types: {
		figure: Figure
	},
	marks: {
		internalLink: ({ mark, children }) => {
			const { slug = {} } = mark
			const href = `/${slug.current}`
			return <Link to={href}>
				{JSON.stringify(mark, null, 2)}
				{children}

			</Link>
		},
		link: ({ mark, children }) => {
			const { href = "", showOnNewTab = false } = mark
			return showOnNewTab ?
				<a href={href} target="_blank" rel="noopener noreferrer" >
					{children}
				</a>
				:
				<a href={href} >
					{children}
				</a>
		},
	}
}

export default serializers
