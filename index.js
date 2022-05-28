
/**
  * 
  *  Prepares html files for use with Polymer elements. 
  *  (e.g. html`<div>Hi</div>`).
  *
  *  This loader allows compliance with Polymer 3.5's support for
  *  Trusted Types, which protects against XSS attacks, when 
  *  consuming seperate html files.
  *
  *  Calling Polymer's 'html' as a function is no longer allowed 
  *  (e.g. html([template])).
  * 
  *  A Polymer Template element is returned by this loader, ready
  *  for use in Polymer Element's 'template' class method.
  * 
  *  Example:
  * 
  *     import {PolymerElement} from '@polymer/polymer-element.js';
  *     import template from './my-template.html';
  * 
  *     class MyElement extends PolymerElement {
  *
  *       static get is() { return 'my-element'; }
  *
  *       static get template() {
  *         return template;
  *       }
  * 
  *       ...
  * 
  *     }
  * 
  *     window.customElements.define(MyElement.is, MyElement);
  *
  **/

// See an explanation: https://webpack.js.org/api/loaders/#examples
const {getOptions}    = require('loader-utils');
const {skip, include} = require('./src/skipParser');
const template        = require('./src/template');


module.exports = function (source) {

  // So Far no need for async since the whole computation is performed in CPU.
  // The loader is cacheable by default.

  // Get the options from webpack.config.js
  const options = getOptions(this) || {};
  const query   = this.resourceQuery;
  
  // If 'defaultSkip' is set to true,then the source will 
  // be skipped unless the developer explicitly chooses to 
  // include it (e.g './my-template.html?include').
  //
  // Or, if the developer has specified to skip it, it will 
  // not be processed (e.g. './my-template.html?skip').
  if ((options.defaultSkip && !include(query)) || skip(query)) {

    return `export default ${JSON.stringify(source)}`;
  }
  
  // Generates the JavaScript required for Polymer Web Components.
  return template(source, options);
};
