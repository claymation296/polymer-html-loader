
/**
  * 
  *  Main Template file that generates either a minified
  *  or uncompressed template.
  * 
  **/

const {minify}                        = require('html-minifier-terser');
const {generateTemplate, minTemplate} = require('./templateGenerator');

// Match 'html-loader' default 'minimize' config.
// Pulled from 'html-loader':
//    https://github.com/webpack-contrib/html-loader/blob/master/src/utils.js
const defaultMinimizerOptions = {
  caseSensitive: true,
  // `collapseBooleanAttributes` is not always safe, since this can break CSS attribute selectors and not safe for XHTML
  collapseWhitespace: true,
  conservativeCollapse: true,
  keepClosingSlash: true,
  minifyCSS: true,
  minifyJS: true,
  // `minifyURLs` is unsafe, because we can't guarantee what the base URL is
  // `removeAttributeQuotes` is not safe in some rare cases, also HTML spec recommends against doing this
  removeComments: true,
  // `removeEmptyAttributes` is not safe, can affect certain style or script behavior, look at https://github.com/webpack-contrib/html-loader/issues/323
  // `removeRedundantAttributes` is not safe, can affect certain style or script behavior, look at https://github.com/webpack-contrib/html-loader/issues/323
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  // `useShortDoctype` is not safe for XHTML
};

/**
  *
  *  @param {string} source  The actual HTML content
  *  @param {object} options The Options from webpack config.js
  * 
  **/

const minifiedTemplate = async source => {

  const minified = await minify(source, defaultMinimizerOptions);

  return minTemplate(minified);
};


module.exports = function (source, options) { 

  return !options.minify ? 
           generateTemplate(source) :
           minifiedTemplate(source);
};
