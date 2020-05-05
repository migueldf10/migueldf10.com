import React from 'react'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'

const HeaderContainer = styled.header`
	width: 100%;
	background: ${props => props.theme.bg};
	padding: 16px;
	h1 {
		margin: 0;
		padding: 0;
		font-family: 'Amstelvar';
		position: relative;
		font-variation-settings: 'wdth' 120, 'wght' 440, 'XOPQ' 200, 'YOPQ' 69,
			'YTAS' 900, 'YTUC' 900, 'YTLC' 420;
		color: ${props => props.theme.bgLight};
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		text-align: center;
		text-shadow: -1px 2px 1px #a0a0a0, -2px 4px 2px #a0a0a0,
			-3px 6px 3px #a0a0a099, -4px 8px 4px #a0a0a077,
			-5px 10px 5px #a0a0a066, -6px 12px 6px #a0a0a055,
			-7px 13px 7px #a0a0a044, -8px 15px 8px #a0a0a044,
			-9px 17px 9px #a0a0a044, -10px 19px 10px #a0a0a033,
			-11px 20px 11px #a0a0a022, -12px 22px 12px #a0a0a022,
			-15px 28px 15px #a0a0a022, -16px 30px 16px #a0a0a022,
			-19px 36px 19px #a0a0a022, -20px 38px 20px #a0a0a022,
			-21px 39px 21px #a0a0a022, 1px -1px 1px #00ee0066,
			3px -3px 6px #00ee0022;
	}
	@keyframes weight {
		0% {
			font-variation-settings: 'wdth' 200, 'wght' 300;
		}
		35% {
			font-variation-settings: 'wdth' 200, 'wght' 900;
		}
		50% {
			font-variation-settings: 'wdth' 200, 'wght' 300;
		}
		85% {
			font-variation-settings: 'wdth' 200, 'wght' 900;
		}
		100% {
			font-variation-settings: 'wdth' 200, 'wght' 300;
		}
	}

	p {
		text-align: center;
		font-size: 1.4rem;
		line-height: 1;
		margin: 0px;
		padding: 80px 0 0 0;
		font-variation-settings: 'wght' 700;
	}
	h1 {
		font-size: 1.9rem;
	}
	${MEDIA.MIN_MINIPHONE`
		h1{
			font-size: 2.5rem;
		}
	`}

	${MEDIA.MIN_TABLET`

		.column {
			padding-top: 10px;
			max-width: 80%;
			
		}


		h1 {
			font-size: 7rem;
			//animation-name: weight;
			//animation-duration: 8s;
			//animation-iteration-count: infinite;
			padding: 0;
			
		}
		p {
			padding: 80px 0;
			font-size: 2.8rem;

		}
		`}
	padding-top: 60px;
	.column {
		margin: auto;
	}
`
class Header extends React.Component {
	render() {
		const { title, children } = this.props
		return (
			<HeaderContainer>
				<div className="column">
					<h1>{title}</h1>
					<div>{children}</div>
				</div>
			</HeaderContainer>
		)
	}
}

export default Header
