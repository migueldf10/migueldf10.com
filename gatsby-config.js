const path = require('path')
// Load variables from `.env` as soon as possible
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'
module.exports = {
	siteMetadata: {
		title: `Migueldf10.com`,
		author: `Miguel Domenech`,
		description: `A personal blog trying to deliver some quality content to the world!.`,
		siteUrl: `https://migueldf10.com/`,
		social: {
			twitter: `migueldf10`,
			linkedin: `migueldf10`,
		},
		contact: {
			email: `hi@migueldf10.com`,
			phone: `0686482708`
		},
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/portfolio`,
				name: `portfolio`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `images`,
			},
		},
		{
			resolve: "gatsby-plugin-web-font-loader",
			options: {
				custom: {
					families: ["Amstelvar"],
					urls: ["/fonts/fonts.css"],
				},
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 2600,
							linkImagesToOriginal: true,
							quality: 90,
							backgroundColor: `none`,

						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				gatsbyRemarkPlugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 2600,
							linkImagesToOriginal: true,
							quality: 90,
							backgroundColor: `none`,
						},
					},
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		//`gatsby-plugin-feed`,
		`gatsby-plugin-remove-trailing-slashes`,

		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Migueldf's blog`,
				short_name: `migueldf10.com`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `content/assets/favicon.png`,
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-styled-components`,
		{
			resolve: 'gatsby-source-sanity',
			options: {
				...clientConfig.sanity,
				token,
				watchMode: !isProd,
				overlayDrafts: !isProd && token
			}
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: `GTM-NNHS2J2`,
				includeInDevelopment: true,
			},
		},
	],
}
