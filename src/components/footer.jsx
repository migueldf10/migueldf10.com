import React, { Component } from 'react'
import Bio from './bio'
import styled from 'styled-components'

const FooterContainer = styled.footer`
	background: ${props => props.theme.bg};
	* {
		color: ${props => props.theme.fg};
	}
`
export default class Footer extends Component {
	render() {
		return (
			<FooterContainer>
				<Bio />
				<hr />
				<div
					style={{
						padding: '5px 20px 14px',
						textAlign: 'center',
						fontSize: '.8rem',
					}}
				>
					<span>
						Miguel Domenech© {new Date().getFullYear()}, All rights
						reserved.
					</span>
				</div>
			</FooterContainer>
		)
	}
}
