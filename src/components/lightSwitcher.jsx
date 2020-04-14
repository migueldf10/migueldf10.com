import React, { Component } from 'react'
import styled from 'styled-components'
import MEDIA from '../utils/mediaTemplates'
const SwitcherContainer = styled.button`
	position: fixed;
	right: 16px;
	bottom: 16px;
	background: none;
	border: none;
	box-shadow: none;
	z-index: 9;
	color: ${props => props.theme.fgLight};
	/*text-decoration: underline;*/
	transform: translateX(50%) rotateZ(-90deg) translateX(50%);
	font-size: 1rem;
	font-variation-settings: 'wdth' 100, 'wght' 200;
	transition: 0.3s;
	:hover {
		color: ${props => props.theme.fg};
		font-variation-settings: 'wdth' 120, 'wght' 600;
	}
	:focus {
		outline: none;
	}
	${MEDIA.PHONE`
		font-size:0.7rem;
	`}
`

export default class LightSwitcher extends Component {
	render() {
		const { switcher } = this.props
		return (
			<SwitcherContainer onClick={switcher}>
				Switch The Lights
			</SwitcherContainer>
		)
	}
}
