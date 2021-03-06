var plugins = [{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-plugin-typography/gatsby-ssr'),
      options: {"plugins":[],"pathToConfigModule":"src/utils/typography"},
    },{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-plugin-emotion/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-plugin-layout/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"GatsbyJS","short_name":"GatsbyJS","start_url":"/","background_color":"#ffffff","theme_color":"#663399","display":"minimal-ui","icon":"src/assets/gatsby-icon.png"},
    },{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-93349937-5"},
    },{
      plugin: require('/home/prajwal/gatsby/www/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"feeds":[{"query":"\n              {\n                allMarkdownRemark(\n                  sort: { order: DESC, fields: [frontmatter___date] }\n                  filter: {\n                    frontmatter: { draft: { ne: true } }\n                    fileAbsolutePath: { regex: \"/docs.blog/\" }\n                  }\n                ) {\n                  edges {\n                    node {\n                      excerpt\n                      html\n                      frontmatter {\n                        title\n                        date\n                        excerpt\n                        author {\n                          id\n                        }\n                      }\n                      fields {\n                        slug\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/blog/rss.xml"}]},
    },{
      plugin: require('/home/prajwal/gatsby/www/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
