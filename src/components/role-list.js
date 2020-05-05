import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import { ucfirst } from '../lib/string-utils'


function RoleList({ items, title }) {
	return (
		<div >
			<h2 >{title}</h2>
			<ul >
				{items.map(item => (
					<li key={item._key} >
						<div>
							<div >
								{item.person && item.person.image && item.person.image.asset && (
									<img
										src={imageUrlFor(buildImageObj(item.person.image))
											.width(100)
											.height(100)
											.fit('crop')
											.url()}
										alt=''
									/>
								)}
							</div>
						</div>
						<div>
							<div>
								<strong>{(item.person && item.person.name) || <em>Missing name</em>}</strong>
							</div>
							{item.roles && (
								<div>
									{item.roles.map((role, idx) => {
										switch (true) {
											case idx === 0:
												return <span key={role}>{ucfirst(role)}</span>
											case idx === item.roles.length - 1:
												return <span key={role}> & {role}</span>
											default:
												return <span key={role}>, {role}</span>
										}
									})}
								</div>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default RoleList
