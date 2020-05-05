import { Link } from 'gatsby'
import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import MEDIA from '../utils/mediaTemplates'
import styled from 'styled-components'


const PortfolioGridItemContainer = styled(Link)`
	width: 50%;
	padding: 1rem;
	img{max-width:100%;}
	${MEDIA.PHONE`
		padding: 0.5rem 0rem;
		width:100%; 
	`}
`
const Header = styled.div`
	transition: 0.5s;
	background: ${props => props.theme.bgLight};
	padding: 18px;

	h3 {
		font-size: 20px;
		font-variation-settings: 'wdth' 120, 'wght' 240, 'XOPQ' 100, 'YOPQ' 59;
		margin: 1rem 0;
		transition: 0.7s;
	}
	small {
		text-transform: uppercase;
		font-variation-settings: 'wdth' 100, 'wght' 300;
		transition: 0.9s;
		font-family: 'League Spartan';
		font-variation-settings: 'wght' 400;


	}

	&:hover {
		background: ${props => props.theme.bgAccent};
		h3 {
			font-variation-settings: 'wdth' 90, 'wght' 840, 'XOPQ' 200, 'YOPQ' 59;
		}
		small {
			font-variation-settings: 'wdth' 100, 'wght' 700;
			font-family: 'League Spartan';
		font-variation-settings: 'wght' 200;
		}
	}

`
const TagContainer = styled.div`
	overflow: auto;
	display: flex;
	::-webkit-scrollbar {
		height: 2px;
	}
	::-webkit-scrollbar-track {
		background-color: ${props => props.theme.bgLight};
	}

	::-webkit-scrollbar-thumb {
		background-color: ${props => props.theme.bgAccent};
	}
	small {
		margin: 0px;
		margin-right: 1rem;
		white-space: nowrap;
		display: inline-block;
		padding-bottom: 0.5rem;
	}
`


function ProjectPreview(props) {
	return (
		<PortfolioGridItemContainer to={`/project/${props.slug.current}`}>
			<Header>
				{props.mainImage && props.mainImage.asset && (
					<img
						src={imageUrlFor(buildImageObj(props.mainImage))
							.width(600)
							.height(Math.floor((9 / 16) * 600))
							.url()}
						alt={props.mainImage.alt}
					/>
				)}
				<h3   >{props.title}</h3>
				{props.categories && props.categories.length > 0 && (
					<TagContainer>
						{props.categories.map(category => (
							<small
								key={category._id}
								className="tag"
							>
								{category.title}
							</small>
						))}
					</TagContainer>
				)}
			</Header>
		</PortfolioGridItemContainer>
	)
}

export default ProjectPreview
