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

### Files
* /app
	* Authenticators
        * Makes request for authentication token from the server.
        * Makes request when user logs in, page is reloaded or token expires.
    * Authorizers
        * Authorizes a block of code to send to the server.
        * Used in ajax utils.
    * Controllers
        * Handles function interaction after the initial model is loaded.
    * Helpers
        * Functions to be called inside template files.
    * Routes
        * Loads initial data model with information from the server.
        * Uses ajax utils to make calls.
        * index.js
            * Default route to be loaded
        * login.js
            * Route to be loaded if user is not logged in.
    * Styles
        * CSS files.
    * Templates
        * HTML (Handlebars) files for corresponding route.
        * application.hbs
            * Will appear in all routes.
            * Contains menu bar.
        * loading.hbs
            * Loading screen to be displayed when transitioning between routes.
    * Utils
        * Functions to be called from JS files
        * Use `import FUNCTION_NAME from "gordon360/utils/FILE_NAME"`
        * Asynchronous ajax calls
            * Uses authorizer to authorize call.
            * delete, get, post and put.
    * app.js
        * Standard boilerplate.
    * index.html
        * Basic HTML file to go along with all routes.
    * resolver.js
        * Standard boilerplate.
    * router.js
        * Paths and parameters to each route are specified here.
        * Any new page needs to have an associated route with it.
    * Any application file, e.g.(application.hbs), is applied to the other files as well, e.g.(application.html is visible on every other html file along with what is in that file).
* /config
    * environment.js
    	* app configuration
    	* api urls are specified here
    		* 360ApiTest.gordon.edu for development environmet.
    		* 360Api.gordon.edu for production environmet.
* /public
    * /images
        * Location for images.
    * crossdomain.xml and robots.txt
        * Boilerplate
    * web.config
        * Redirects http to https.
* /tests
    * Not Implemented
* /vendor
    * Ember addons
* Other Boilerplate
	* .bowerrc
	* .editorconfig
	* .jshintrc
	* .travis.yml
	* .watchmancinfig
	* bower.json
	* ember-cli-build.js
	* package.JSON
	* testem.js

### Creating New Routes
* Run `ember generate route ROUTE_NAME`
	* Will generate template, route, test and add appropriate line to app/router.js.
	* Each route can also have a controller.
	* File are linked with similar same (e.g. login.hbs and login.js).

## Further Reading and Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
