# Gordon360

Gordon College Co-Curricular Transcript System

##Contents
  * [Indroduction](#introduction)
  * [Sites](#sites)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running and Development](#running-and-development)
    * [Code Generators](#code-generators)
    * [Running Tests](#running-tests)
    * [Building](#building)
    * [Deploying](#deploying)
  * [Addons](#addons)
  * [Source Code Guide](#source-code-guide)
  * [Further Reading and Useful Links](#further-reading-and-useful-links)

##Introduction

* Poject running at https://360.gordon.edu
* Using [EmberJS](http://emberjs.com/) Framework
* Makes calls to JSON Server at https://360api.gordon.edu
  * [Resopitory](https://github.com/gordon-cs/Project-Raymond)

##Sites

* Testing Sites
  * Client: https://360train.gordon.edu
  * Server: https://360apitrain.gordon.edu
* Production Sites
  * Client: https://360.gordon.edu
  * Server: https://360api.gordon.edu

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running and Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* Currently running on PC `ccttrain.gordon.edu`
* After `ember build --environment production` Copy contents of `dist/` into `\F:\Sites\site_name`

### Addons

* [Ember Simple Auth](https://ember-simple-auth.com/)
* [jsPDF](https://parall.ax/products/jspdf)
* [File Saver](https://github.com/eligrey/FileSaver.js/)

## Source Code Guide

* Ember framework files are under the [app](https://github.com/gordon-cs/Project-Bernard/tree/master/app) sub-directory
  * Template files are the HTML (Handlebars) files with corresponding Style files (css).
  * Route files (JavaScript) dictate what API calls (util functions) are being made for each controller and template to then display    to the user. It creates a data model in the emper application to store the information recieved from any API call.
  * Controller files (JavaScript) handle function interaction within a specific page.
  * Util files (JavaScript) are asynchronous calls to the API for post, put, get, and delete HTTP functions.
  * Authorizers and Authenticators (JavaScript) are used to log a user in with their Gordon credentials via the server using LDAP,      handles security, page timeouts, and what each user has access to view/change.
  * Any application file, e.g.(application.hbs), is applied to the other files as well, e.g.(application.html is visible on every       other html file along with what is in that file).
  * resolver.js is standard boilerplate.
  * route.js is where all paths to different pages are listed with any and all parameters needed.  Any new page needs to have an        associated route with it.

## Further Reading and Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
