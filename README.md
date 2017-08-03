# Gordon360

Gordon College Co-Curricular Transcript System <br>
Front-end for [Project Raymond](https://github.com/gordon-cs/Project-Raymond)

## Contents
  * [Indroduction](#introduction)
  * [Sites](#sites)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running and Development](#running-and-development)
    * [Code Generators](#code-generators)
    * [Running Tests](#running-tests)
    * [Building](#building)
    * [Deploying](#deploying)
  * [Running Front And Back End Together](#running-front-and-back-end-together)
  * [Addons](#addons)
  * [Source Code Guide](#source-code-guide)
  * [Styling](#styling)
  * [Further Reading and Useful Links](#further-reading-and-useful-links)

## Introduction

* Project running at https://360.gordon.edu
* Using [EmberJS](http://emberjs.com/) Framework
* Makes calls to JSON Server at https://360api.gordon.edu
  * [Repository](https://github.com/gordon-cs/Project-Raymond)

## Sites

* Development Sites
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
* See [ember installation guides](https://guides.emberjs.com/v2.12.0/getting-started/) for the steps to install ember

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
  * For deploying to development site: this means copying contents of `dist/` to `\F:\Sites\360Train`
  * For deploying to production site: this means copying contents of `dist/` to `\F:\Sites\360`

### Addons

* [Ember Simple Auth](https://ember-simple-auth.com/)
* [jsPDF](https://parall.ax/products/jspdf)
* [File Saver](https://github.com/eligrey/FileSaver.js/)

## Running Front And Back End Together

* In order to connect the front end (Bernard) to the back end (Raymond) over local host, follow these steps:
  * Log onto remote desktop virtual machine
  * Open command prompt, git clone project Bernard and project Raymond
  * Inside of Project Bernard folder, npm install && bower install
    * (If Bower isn't already installed, install it with: npm install -g bower)
  * Open Project-Raymond/Gordon360.sln in Visual Studio 2017
  * Right click on Gordon360, select Properties and then Web, change Project URL to your desired localhost:####
  * Create Virtual Directory. Remember this number. Start Project Raymond 
  * Open Project Bernard. Open environment.js under config folder in a text editor.
    * edit these three lines with back end localhost:####
    * apiUrl: 'https://360ApiTrain.gordon.edu/api' to apiUrl: 'http://localhost:####/api'
    * baseUrl: 'https://360ApiTrain.gordon.edu' to baseUrl: 'http://localhost:####'   
    * serverTokenEndpoint: 'https://360ApiTrain.gordon.edu/token' to serverTokenEndpoint: 'http://localhost:####/token' 
  * Save file. Open command prompt, ember server --live-reload-port #### --port ####
  * For these two ports, you can choose any random number higher than 4000. This number has to be different from everyone else's port number.
  
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
    * Components
        * Acts as a small unit of a page with its own javascript (e.g. a slider)
        * [Read more about ember components](https://guides.emberjs.com/v2.13.0/components/the-component-lifecycle/)
        * Note - the component for the slider was actually added because it was the simplest way to add some
        3rd-party javascript that was also used on the gordon.edu home page.
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
        * /components 
            * The html for the component
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
    * /royalslider
        * Images and styles used for the slider on the dashboard (home) page. 
        This was taken from the gordon.edu home page, courtesy of Steve Dagley.
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

## Styling
The site uses a blend of Bootrap components (referenced as `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">` in the `index.html` file) and customized styling, found in the `/styles` folder in the ember app. <br>
Bootstrap has pretty thorough documentation, which can be found [here](https://v4-alpha.getbootstrap.com/getting-started/introduction/).

## Further Reading and Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
