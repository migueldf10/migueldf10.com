---
title: How to do technical SEO in Gatsby, and (almost) get to not miss Yoast.
date: '2020-04-12'
description: In a system where freedom is the stongest point, compliance with google algorithm might be tricky. This post is my way of fixing it!
img: './DSC_0407.jpg'
type: normal
tags:
    - growth hacking
    - digital product
---

Besides the great advantage of the speed and the granular control over every aspect of the site, there are some key differences in SEO handling between monotlyths, such as Wordpress and distributed systems, for example Gatsby, the system we are going to use for the comparisons and examples, although most of the logic can be used for other SSG anyway.

The advantages and dissadvantages are both connected with the same concept, the freedom. As you probably know, Google doesn't like freedom and in order to make your content understandable and well ranked you need to follow certain rules and standards. let's start!

## Duplicated content is automatically generated

By default gatsby pages \*doesn't matter if they are created via page or via node, are created with a

the slash character at the end and without. And thats a problem.

I found the solution via using this plugin and also using Netlify prettify urls, that automatically redirects with a 301 redirect to the preferred url.

## Internal link mess.

Let's face it. Monoliths have their advantage here, wordpress is great at internal linking between content but we can do it too!

Since here I didnt find a plugin for it I built it myself.

Sample code here!

You simply create a routing component that accepts the ID and more parameters (in case you have a multiligual site for example) to do all the routing, same for creating the pages from gatsby node and for including internal links along the content creation.

## Seo content audits.

If you use a CMS such as Contentful, they provide great input validation, so the content team know exactly what to do when creating content, but some problems may arise, when you store your own content as markup everything may be a mess.

Since for this i didn't find a plugin I also built mine myself.

Only on development you can create a table that gathers all the content, giving an overview of Slug structure, title, descriptions, wheter or not you have rich snippets, Headings hierachry...

## Rich Snippets.

By default when you are in the top positions of the rankings, Rich Snippets may mean the
