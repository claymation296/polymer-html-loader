
/**
 * 
 *  Generates the code that is required for Polymer's 'template' method, ex:
 * 
 *    import {html} from '@polymer/polymer/polymer-element.js';
 *
 *    export default const template = html`
 *      <style>
 *        div {
 *          height:500px;
 *          width:100px;
 *          background-color: red;
 *        }
 *      </style>
 * 
 *      <div>Hello World</div>
 *    `;
 * 
 */

// Guard against XSS by having webpack inject the string
// from each .hmtl file directly into Polymer's 'html' tagged
// template function, rather than calling it as a normal js function.
// Calling 'html' as a function is not allowed as of Polymer v3.5.
module.exports.generateTemplate = source => `
    import {html} from '@polymer/polymer/polymer-element.js';

    export default html\`${source}\`;
  `;


module.exports.minTemplate = source => 
  `import{html}from'@polymer/polymer/polymer-element.js';export default html\`${source}\`;`;

