<div align="center">
  <img width="180" height="180" vspace="20"
    src="https://www.polymer-project.org/images/logos/p-logo.png">
  <img width="180" height="180" vspace="20"
    src="https://cdn.worldvectorlogo.com/logos/html-1.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

<blockquote>
This is still an alpha release. While this may have worked well in <i>my</i> machine, there may still be unforeseen bugs and the API may change in the future.
</blockquote>

# polymer-html-loader
A loader for webpack that lets you "just import" the HTML into your JavaScript, and automatically create the Polymer Template for you. This is intended for Polymer 3.

# Install:
```
npm install save-dev polymer-html-loader extract-loader
```
Or
``` 
yarn add polymer-html-loader extract-loader -D
```


# Requirements
* Polymer 3+ only!
* Webpack 5

# How this works:
1. Include it in your Webpack Config. Include it "last" or after all the loaders. You will need to use extract-loader if you're using html-loader.

```javascript
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
     {
        test: /\.(html)$/,
        use: [{
          loader: 'polymer-html-loader',
          options: {
            minify: true, // defaults to false
          },
        }, 'extract-loader', 'html-loader'],
      },
    ],
  },
};
```
2. Include your .html file in your JavaScript:
```javascript
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import template from './my-element.html';


class MyElement extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'polymer3-app',
      },
    };
  }
}

window.customElements.define('my-element', MyElement);
```

# Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`minify`](#minify)**|`{Boolean}`|`false`|When true, it will minify both the HTML and JavaScript output.
|**[`defaultSkip`](#minify)**|`{Boolean}`|`false`|When true, it will not process files, unless explicitly included.

# Files Parameters
These are appended at the end of the HTML imports in your JavaScript file (Where the component is declared);
E.g: 

```javascript
import htmlString from './my-element.html?skip';
```

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`skip`](#minify)**|`{boolean}`|`N/A`|Setting this parameter will skip processing altogether. This may be useful if you're using React and Polymer or you'd like to include the HTML without. E.g: `import htmlString from './my-element.html?skip'`
|**[`include`](#minify)**|`{boolean}`|`N/A`|Setting this parameter will include the file for processing, even when defaultSkip is on. This may be useful if you just want to "polymerize" or "web-componentize" an .html file. E.g:  `import template from './my-element.html?include'`. **Note**: `include` will take preference over `defaultSkip`.

# Need an example? 
Navigate to [test-app](./test-app), and execute: `npm start`. It will launch an express server @ localhost:3000. Then, run `webpack`. (Remember to have installed webpack-cli)


# Why this loader
Writing HTML inside a JavaScript file is cumbersome and we lose autocomplete, and static analysis from our Text Editors and IDEs. Why not have an automatic way that creates these Polymer Templates for us? 

Also, as of Polymer v3.5, using the 'html' template function as a regular javascript function (e.g html([htmlString])) is prohibited. This is due to v3.5's support for Trusted Types, which help prevent XSS attacks.

With this, you just include your .html template in your Polymer component, and you're set! The loader takes care for creating the file for you!

# Ideas? Feedback?
Open a Github issue now! 😊
