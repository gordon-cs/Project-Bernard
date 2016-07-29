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

## Further Reading and Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
