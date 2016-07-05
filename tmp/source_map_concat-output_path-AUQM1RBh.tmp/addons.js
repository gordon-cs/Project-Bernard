define('ember-ajax/ajax-request', ['exports', 'ember', 'ember-ajax/mixins/ajax-request'], function (exports, _ember, _emberAjaxMixinsAjaxRequest) {
  'use strict';

  exports['default'] = _ember['default'].Object.extend(_emberAjaxMixinsAjaxRequest['default']);
});
define('ember-ajax/errors', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.AjaxError = AjaxError;
  exports.InvalidError = InvalidError;
  exports.UnauthorizedError = UnauthorizedError;
  exports.ForbiddenError = ForbiddenError;
  exports.BadRequestError = BadRequestError;
  exports.NotFoundError = NotFoundError;
  exports.TimeoutError = TimeoutError;
  exports.AbortError = AbortError;
  exports.ServerError = ServerError;
  exports.isAjaxError = isAjaxError;
  exports.isUnauthorizedError = isUnauthorizedError;
  exports.isForbiddenError = isForbiddenError;
  exports.isInvalidError = isInvalidError;
  exports.isBadRequestError = isBadRequestError;
  exports.isNotFoundError = isNotFoundError;
  exports.isTimeoutError = isTimeoutError;
  exports.isAbortError = isAbortError;
  exports.isServerError = isServerError;
  exports.isSuccess = isSuccess;

  var EmberError = _ember['default'].Error;

  /**
   * @class AjaxError
   * @private
   */

  function AjaxError(errors) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'Ajax operation failed' : arguments[1];

    EmberError.call(this, message);

    this.errors = errors || [{
      title: 'Ajax Error',
      detail: message
    }];
  }

  AjaxError.prototype = Object.create(EmberError.prototype);

  /**
   * @class InvalidError
   * @public
   */

  function InvalidError(errors) {
    AjaxError.call(this, errors, 'Request was rejected because it was invalid');
  }

  InvalidError.prototype = Object.create(AjaxError.prototype);

  /**
   * @class UnauthorizedError
   * @public
   */

  function UnauthorizedError(errors) {
    AjaxError.call(this, errors, 'Ajax authorization failed');
  }

  UnauthorizedError.prototype = Object.create(AjaxError.prototype);

  /**
   * @class ForbiddenError
   * @public
   */

  function ForbiddenError(errors) {
    AjaxError.call(this, errors, 'Request was rejected because user is not permitted to perform this operation.');
  }

  ForbiddenError.prototype = Object.create(AjaxError.prototype);

  /**
   * @class BadRequestError
   * @public
   */

  function BadRequestError(errors) {
    AjaxError.call(this, errors, 'Request was formatted incorrectly.');
  }

  BadRequestError.prototype = Object.create(AjaxError.prototype);

  /**
   * @class NotFoundError
   * @public
   */

  function NotFoundError(errors) {
    AjaxError.call(this, errors, 'Resource was not found.');
  }

  NotFoundError.prototype = Object.create(AjaxError.prototype);

  /**
   * @class TimeoutError
   * @public
   */

  function TimeoutError() {
    AjaxError.call(this, null, 'The ajax operation timed out');
  }

  TimeoutError.prototype = Object.create(AjaxError.prototype);

  /**
   * @class AbortError
   * @public
   */

  function AbortError() {
    AjaxError.call(this, null, 'The ajax operation was aborted');
  }

  AbortError.prototype = Object.create(AjaxError.prototype);

  /**
   * @class ServerError
   * @public
   */

  function ServerError(errors) {
    AjaxError.call(this, errors, 'Request was rejected due to server error');
  }

  ServerError.prototype = Object.create(AjaxError.prototype);

  /**
   * Checks if the given error is or inherits from AjaxError
   * @method isAjaxError
   * @public
   * @param  {Error} error
   * @return {Boolean}
   */

  function isAjaxError(error) {
    return error instanceof AjaxError;
  }

  /**
   * Checks if the given status code or AjaxError object represents an
   * unauthorized request error
   * @method isUnauthorizedError
   * @public
   * @param  {Number | AjaxError} error
   * @return {Boolean}
   */

  function isUnauthorizedError(error) {
    if (isAjaxError(error)) {
      return error instanceof UnauthorizedError;
    } else {
      return error === 401;
    }
  }

  /**
   * Checks if the given status code or AjaxError object represents a forbidden
   * request error
   * @method isForbiddenError
   * @public
   * @param  {Number | AjaxError} error
   * @return {Boolean}
   */

  function isForbiddenError(error) {
    if (isAjaxError(error)) {
      return error instanceof ForbiddenError;
    } else {
      return error === 403;
    }
  }

  /**
   * Checks if the given status code or AjaxError object represents an invalid
   * request error
   * @method isInvalidError
   * @public
   * @param  {Number | AjaxError} error
   * @return {Boolean}
   */

  function isInvalidError(error) {
    if (isAjaxError(error)) {
      return error instanceof InvalidError;
    } else {
      return error === 422;
    }
  }

  /**
   * Checks if the given status code or AjaxError object represents a bad request
   * error
   * @method isBadRequestError
   * @public
   * @param  {Number | AjaxError} error
   * @return {Boolean}
   */

  function isBadRequestError(error) {
    if (isAjaxError(error)) {
      return error instanceof BadRequestError;
    } else {
      return error === 400;
    }
  }

  /**
   * Checks if the given status code or AjaxError object represents a
   * "not found" error
   * @method isNotFoundError
   * @public
   * @param  {Number | AjaxError} error
   * @return {Boolean}
   */

  function isNotFoundError(error) {
    if (isAjaxError(error)) {
      return error instanceof NotFoundError;
    } else {
      return error === 404;
    }
  }

  /**
   * Checks if the given status code or AjaxError object represents a
   * "timeout" error
   * @method isTimeoutError
   * @public
   * @param  {AjaxError} error
   * @return {Boolean}
   */

  function isTimeoutError(error) {
    return error instanceof TimeoutError;
  }

  /**
   * Checks if the given status code or AjaxError object represents an
   * "abort" error
   * @method isAbortError
   * @public
   * @param  {AjaxError} error
   * @return {Boolean}
   */

  function isAbortError(error) {
    return error instanceof AbortError;
  }

  /**
   * Checks if the given status code or AjaxError object represents a server error
   * @method isServerError
   * @public
   * @param  {Number | AjaxError} error
   * @return {Boolean}
   */

  function isServerError(error) {
    if (isAjaxError(error)) {
      return error instanceof ServerError;
    } else {
      return error >= 500 && error < 600;
    }
  }

  /**
   * Checks if the given status code represents a successful request
   * @method isSuccess
   * @public
   * @param  {Number} status
   * @return {Boolean}
   */

  function isSuccess(status) {
    var s = parseInt(status, 10);
    return s >= 200 && s < 300 || s === 304;
  }
});
define('ember-ajax/index', ['exports', 'ember-ajax/request'], function (exports, _emberAjaxRequest) {
  'use strict';

  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxRequest['default'];
    }
  });
});
define('ember-ajax/mixins/ajax-request', ['exports', 'ember', 'ember-ajax/errors', 'ember-ajax/utils/parse-response-headers', 'ember-ajax/utils/url-helpers', 'ember-ajax/utils/ajax'], function (exports, _ember, _emberAjaxErrors, _emberAjaxUtilsParseResponseHeaders, _emberAjaxUtilsUrlHelpers, _emberAjaxUtilsAjax) {
  'use strict';

  var $ = _ember['default'].$;
  var EmberError = _ember['default'].Error;
  var Mixin = _ember['default'].Mixin;
  var Promise = _ember['default'].RSVP.Promise;
  var get = _ember['default'].get;
  var isNone = _ember['default'].isNone;
  var merge = _ember['default'].merge;
  var run = _ember['default'].run;
  var Test = _ember['default'].Test;
  var testing = _ember['default'].testing;

  var JSONAPIContentType = 'application/vnd.api+json';

  function isJSONAPIContentType(header) {
    if (isNone(header)) {
      return false;
    }
    return header.indexOf(JSONAPIContentType) === 0;
  }

  function startsWithSlash(string) {
    return string.charAt(0) === '/';
  }

  function endsWithSlash(string) {
    return string.charAt(string.length - 1) === '/';
  }

  function stripSlashes(path) {
    // make sure path starts with `/`
    if (startsWithSlash(path)) {
      path = path.substring(1);
    }

    // remove end `/`
    if (endsWithSlash(path)) {
      path = path.slice(0, -1);
    }
    return path;
  }

  var pendingRequestCount = 0;
  if (testing) {
    Test.registerWaiter(function () {
      return pendingRequestCount === 0;
    });
  }

  exports['default'] = Mixin.create({

    request: function request(url, options) {
      var _this = this;

      var hash = this.options(url, options);
      return new Promise(function (resolve, reject) {
        _this.raw(url, hash).then(function (_ref) {
          var response = _ref.response;

          resolve(response);
        })['catch'](function (_ref2) {
          var response = _ref2.response;

          reject(response);
        });
      }, 'ember-ajax: ' + hash.type + ' ' + hash.url + ' response');
    },

    raw: function raw(url, options) {
      var _this2 = this;

      var hash = this.options(url, options);
      var requestData = {
        type: hash.type,
        url: hash.url
      };

      if (isJSONAPIContentType(hash.headers['Content-Type']) && requestData.type !== 'GET') {
        if (typeof hash.data === 'object') {
          hash.data = JSON.stringify(hash.data);
        }
      }

      return new Promise(function (resolve, reject) {
        hash.success = function (payload, textStatus, jqXHR) {
          var response = _this2.handleResponse(jqXHR.status, (0, _emberAjaxUtilsParseResponseHeaders['default'])(jqXHR.getAllResponseHeaders()), payload, requestData);

          pendingRequestCount--;

          if ((0, _emberAjaxErrors.isAjaxError)(response)) {
            run.join(null, reject, { payload: payload, textStatus: textStatus, jqXHR: jqXHR, response: response });
          } else {
            run.join(null, resolve, { payload: payload, textStatus: textStatus, jqXHR: jqXHR, response: response });
          }
        };

        hash.error = function (jqXHR, textStatus, errorThrown) {
          var payload = _this2.parseErrorResponse(jqXHR.responseText) || errorThrown;
          var response = undefined;

          if (errorThrown instanceof Error) {
            response = errorThrown;
          } else if (textStatus === 'timeout') {
            response = new _emberAjaxErrors.TimeoutError();
          } else if (textStatus === 'abort') {
            response = new _emberAjaxErrors.AbortError();
          } else {
            response = _this2.handleResponse(jqXHR.status, (0, _emberAjaxUtilsParseResponseHeaders['default'])(jqXHR.getAllResponseHeaders()), payload, requestData);
          }

          pendingRequestCount--;

          run.join(null, reject, { payload: payload, textStatus: textStatus, jqXHR: jqXHR, errorThrown: errorThrown, response: response });
        };

        pendingRequestCount++;

        (0, _emberAjaxUtilsAjax['default'])(hash);
      }, 'ember-ajax: ' + hash.type + ' ' + hash.url);
    },

    /**
     * calls `request()` but forces `options.type` to `POST`
     * @public
     */
    post: function post(url, options) {
      return this.request(url, this._addTypeToOptionsFor(options, 'POST'));
    },

    /**
     * calls `request()` but forces `options.type` to `PUT`
     * @public
     */
    put: function put(url, options) {
      return this.request(url, this._addTypeToOptionsFor(options, 'PUT'));
    },

    /**
     * calls `request()` but forces `options.type` to `PATCH`
     * @public
     */
    patch: function patch(url, options) {
      return this.request(url, this._addTypeToOptionsFor(options, 'PATCH'));
    },

    /**
     * calls `request()` but forces `options.type` to `DELETE`
     * @public
     */
    del: function del(url, options) {
      return this.request(url, this._addTypeToOptionsFor(options, 'DELETE'));
    },

    /**
     * calls `request()` but forces `options.type` to `DELETE`
     * alias for `del()`
     * @public
     */
    'delete': function _delete() {
      return this.del.apply(this, arguments);
    },

    /**
     * Wrap the `.get` method so that we issue a warning if
     *
     * Since `.get` is both an AJAX pattern _and_ an Ember pattern, we want to try
     * to warn users when they try using `.get` to make a request
     *
     * @method get
     * @public
     */
    get: function get(url) {
      if (arguments.length > 1 || url.charAt(0) === '/') {
        throw new EmberError('It seems you tried to use `.get` to make a request! Use the `.request` method instead.');
      }
      return this._super.apply(this, arguments);
    },

    // forcibly manipulates the options hash to include the HTTP method on the type key
    _addTypeToOptionsFor: function _addTypeToOptionsFor(options, method) {
      options = options || {};
      options.type = method;
      return options;
    },

    /**
     * @method _getFullHeadersHash
     * @private
     * @param {Object} headers
     * @return {Object}
     */
    _getFullHeadersHash: function _getFullHeadersHash(headers) {
      var classHeaders = get(this, 'headers') || {};
      var _headers = merge({}, classHeaders);
      return merge(_headers, headers);
    },

    /**
     * @method options
     * @private
     * @param {String} url
     * @param {Object} options
     * @return {Object}
     */
    options: function options(url) {
      var _options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _options.url = this._buildURL(url, _options);
      _options.type = _options.type || 'GET';
      _options.dataType = _options.dataType || 'json';

      if (this._shouldSendHeaders(_options)) {
        _options.headers = this._getFullHeadersHash(_options.headers);
      } else {
        _options.headers = _options.headers || {};
      }

      return _options;
    },

    /**
     * Build a URL for a request
     *
     * If the provided `url` is deemed to be a complete URL, it will be returned
     * directly.  If it is not complete, then the segment provided will be combined
     * with the `host` and `namespace` options of the request class to create the
     * full URL.
     *
     * @private
     * @param {string} url the url, or url segment, to request
     * @param {object} [options] the options for the request being made
     * @param {object.host} [host] the host to use for this request
     * @returns {string} the URL to make a request to
     */
    _buildURL: function _buildURL(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var urlObject = new _emberAjaxUtilsUrlHelpers.RequestURL(url);

      // If the URL passed is not relative, return the whole URL
      if (urlObject.isComplete) {
        return urlObject.href;
      }

      var host = options.host || get(this, 'host');
      var namespace = get(this, 'namespace');
      if (namespace) {
        namespace = stripSlashes(namespace);
      }

      var fullUrl = '';
      // Add the host, if it exists
      if (host) {
        fullUrl += host;
      }
      // Add the namespace, if it exists
      if (namespace) {
        if (!endsWithSlash(fullUrl)) {
          fullUrl += '/';
        }
        fullUrl += namespace;
      }
      // Add the URL segment, if it exists
      if (url) {
        if (!startsWithSlash(url)) {
          fullUrl += '/';
        }
        fullUrl += url;
      }

      return fullUrl;
    },

    _normalizePath: function _normalizePath(path) {
      if (path) {
        // make sure path starts with `/`
        if (path.charAt(0) !== '/') {
          path = '/' + path;
        }

        // remove end `/`
        if (path.charAt(path.length - 1) === '/') {
          path = path.slice(0, -1);
        }
      }
      return path;
    },

    /**
     * Takes an ajax response, and returns the json payload or an error.
     *
     * By default this hook just returns the json payload passed to it.
     * You might want to override it in two cases:
     *
     * 1. Your API might return useful results in the response headers.
     *    Response headers are passed in as the second argument.
     *
     * 2. Your API might return errors as successful responses with status code
     *    200 and an Errors text or object.
     *
     * @method handleResponse
     * @private
     * @param  {Number} status
     * @param  {Object} headers
     * @param  {Object} payload
     * @param  {Object} requestData the original request information
     * @return {Object | AjaxError} response
     */
    handleResponse: function handleResponse(status, headers, payload, requestData) {
      payload = payload || {};
      var errors = this.normalizeErrorResponse(status, headers, payload);

      if (this.isSuccess(status, headers, payload)) {
        return payload;
      } else if (this.isUnauthorizedError(status, headers, payload)) {
        return new _emberAjaxErrors.UnauthorizedError(errors);
      } else if (this.isForbiddenError(status, headers, payload)) {
        return new _emberAjaxErrors.ForbiddenError(errors);
      } else if (this.isInvalidError(status, headers, payload)) {
        return new _emberAjaxErrors.InvalidError(errors);
      } else if (this.isBadRequestError(status, headers, payload)) {
        return new _emberAjaxErrors.BadRequestError(errors);
      } else if (this.isNotFoundError(status, headers, payload)) {
        return new _emberAjaxErrors.NotFoundError(errors);
      } else if (this.isServerError(status, headers, payload)) {
        return new _emberAjaxErrors.ServerError(errors);
      }

      var detailedMessage = this.generateDetailedMessage(status, headers, payload, requestData);
      return new _emberAjaxErrors.AjaxError(errors, detailedMessage);
    },

    /**
     * Match the host to a provided array of strings or regexes that can match to a host
     *
     * @method matchHosts
     * @private
     * @param {String} host the host you are sending too
     * @param {RegExp | String} matcher a string or regex that you can match the host to.
     * @returns {Boolean} if the host passed the matcher
     */
    _matchHosts: function _matchHosts(host, matcher) {
      if (matcher.constructor === RegExp) {
        return matcher.test(host);
      } else if (typeof matcher === 'string') {
        return matcher === host;
      } else {
        _ember['default'].Logger.warn('trustedHosts only handles strings or regexes.', matcher, 'is neither.');
        return false;
      }
    },

    /**
     * Determine whether the headers should be added for this request
     *
     * This hook is used to help prevent sending headers to every host, regardless
     * of the destination, since this could be a security issue if authentication
     * tokens are accidentally leaked to third parties.
     *
     * To avoid that problem, subclasses should utilize the `headers` computed
     * property to prevent authentication from being sent to third parties, or
     * implement this hook for more fine-grain control over when headers are sent.
     *
     * By default, the headers are sent if the host of the request matches the
     * `host` property designated on the class.
     *
     * @method _shouldSendHeaders
     * @private
     * @property {Object} hash request options hash
     * @returns {Boolean} whether or not headers should be sent
     */
    _shouldSendHeaders: function _shouldSendHeaders(_ref3) {
      var _this3 = this;

      var url = _ref3.url;
      var host = _ref3.host;

      url = url || '';
      host = host || get(this, 'host') || '';

      var urlObject = new _emberAjaxUtilsUrlHelpers.RequestURL(url);
      var trustedHosts = get(this, 'trustedHosts') || _ember['default'].A();

      // Add headers on relative URLs
      if (!urlObject.isComplete) {
        return true;
      } else if (trustedHosts.find(function (matcher) {
        return _this3._matchHosts(urlObject.hostname, matcher);
      })) {
        return true;
      }

      // Add headers on matching host
      var hostObject = new _emberAjaxUtilsUrlHelpers.RequestURL(host);
      return urlObject.sameHost(hostObject);
    },

    /**
     * Generates a detailed ("friendly") error message, with plenty
     * of information for debugging (good luck!)
     * @method generateDetailedMessage
     * @private
     * @param  {Number} status
     * @param  {Object} headers
     * @param  {Object} payload
     * @param  {Object} requestData the original request information
     * @return {Object} request information
     */
    generateDetailedMessage: function generateDetailedMessage(status, headers, payload, requestData) {
      var shortenedPayload = undefined;
      var payloadContentType = headers['Content-Type'] || 'Empty Content-Type';

      if (payloadContentType === 'text/html' && payload.length > 250) {
        shortenedPayload = '[Omitted Lengthy HTML]';
      } else {
        shortenedPayload = JSON.stringify(payload);
      }

      var requestDescription = requestData.type + ' ' + requestData.url;
      var payloadDescription = 'Payload (' + payloadContentType + ')';

      return ['Ember Data Request ' + requestDescription + ' returned a ' + status, payloadDescription, shortenedPayload].join('\n');
    },

    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a an authorized error.
     * @method isUnauthorizedError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isUnauthorizedError: function isUnauthorizedError(status) {
      return (0, _emberAjaxErrors.isUnauthorizedError)(status);
    },

    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a forbidden error.
     * @method isForbiddenError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isForbiddenError: function isForbiddenError(status) {
      return (0, _emberAjaxErrors.isForbiddenError)(status);
    },

    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a an invalid error.
     * @method isInvalidError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isInvalidError: function isInvalidError(status) {
      return (0, _emberAjaxErrors.isInvalidError)(status);
    },

    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a bad request error.
     * @method isBadRequestError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isBadRequestError: function isBadRequestError(status) {
      return (0, _emberAjaxErrors.isBadRequestError)(status);
    },

    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a "not found" error.
     * @method isNotFoundError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isNotFoundError: function isNotFoundError(status) {
      return (0, _emberAjaxErrors.isNotFoundError)(status);
    },

    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a server error.
     * @method isServerError
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isServerError: function isServerError(status) {
      return (0, _emberAjaxErrors.isServerError)(status);
    },

    /**
     * Default `handleResponse` implementation uses this hook to decide if the
     * response is a success.
     * @method isSuccess
     * @private
     * @param {Number} status
     * @param {Object} headers
     * @param {Object} payload
     * @return {Boolean}
     */
    isSuccess: function isSuccess(status) {
      return (0, _emberAjaxErrors.isSuccess)(status);
    },

    /**
     * @method parseErrorResponse
     * @private
     * @param {String} responseText
     * @return {Object}
     */
    parseErrorResponse: function parseErrorResponse(responseText) {
      var json = responseText;

      try {
        json = $.parseJSON(responseText);
      } catch (e) {}

      return json;
    },

    /**
     * @method normalizeErrorResponse
     * @private
     * @param  {Number} status
     * @param  {Object} headers
     * @param  {Object} payload
     * @return {Array} errors payload
     */
    normalizeErrorResponse: function normalizeErrorResponse(status, headers, payload) {
      if (payload && typeof payload === 'object' && payload.errors) {
        if (!_ember['default'].isArray(payload.errors)) {
          return payload.errors;
        }

        return payload.errors.map(function (error) {
          var ret = merge({}, error);

          if (typeof ret.status === 'number') {
            ret.status = '' + ret.status;
          }

          return ret;
        });
      } else {
        return [{
          status: '' + status,
          title: 'The backend responded with an error',
          detail: payload
        }];
      }
    }
  });
});
define('ember-ajax/raw', ['exports', 'ember-ajax/ajax-request'], function (exports, _emberAjaxAjaxRequest) {
  'use strict';

  exports['default'] = raw;

  /**
   * Same as `request` except it resolves an object with
   *
   *   {response, textStatus, jqXHR}
   *
   * Useful if you need access to the jqXHR object for headers, etc.
   *
   * @public
   */
  function raw() {
    var ajax = new _emberAjaxAjaxRequest['default']();
    return ajax.raw.apply(ajax, arguments);
  }
});
define('ember-ajax/request', ['exports', 'ember-ajax/ajax-request'], function (exports, _emberAjaxAjaxRequest) {
  'use strict';

  exports['default'] = request;

  /**
   * Helper function that allows you to use the default `ember-ajax` to make
   * requests without using the service.
   *
   * Note: Unlike `ic-ajax`'s `request` helper function, this will *not* return a
   * jqXHR object in the error handler.  If you need jqXHR, you can use the `raw`
   * function instead.
   *
   * @public
   */
  function request() {
    var ajax = new _emberAjaxAjaxRequest['default']();
    return ajax.request.apply(ajax, arguments);
  }
});
define('ember-ajax/services/ajax', ['exports', 'ember', 'ember-ajax/mixins/ajax-request'], function (exports, _ember, _emberAjaxMixinsAjaxRequest) {
  'use strict';

  var Service = _ember['default'].Service;

  /**
   * ### Headers customization
   *
   * Some APIs require HTTP headers, e.g. to provide an API key. Arbitrary
   * headers can be set as key/value pairs on the `RESTAdapter`'s `headers`
   * object and Ember Data will send them along with each ajax request.
   *
   * ```app/services/ajax
   * import AjaxService from 'ember-ajax/services/ajax';
   *
   * export default AjaxService.extend({
   *   headers: {
   *     "API_KEY": "secret key",
   *     "ANOTHER_HEADER": "Some header value"
   *   }
   * });
   * ```
   *
   * `headers` can also be used as a computed property to support dynamic
   * headers.
   *
   * ```app/services/ajax.js
   * import Ember from 'ember';
   * import AjaxService from 'ember-ajax/services/ajax';
   *
   * export default AjaxService.extend({
   *   session: Ember.inject.service(),
   *   headers: Ember.computed("session.authToken", function() {
   *     return {
   *       "API_KEY": this.get("session.authToken"),
   *       "ANOTHER_HEADER": "Some header value"
   *     };
   *   })
   * });
   * ```
   *
   * In some cases, your dynamic headers may require data from some
   * object outside of Ember's observer system (for example
   * `document.cookie`). You can use the
   * [volatile](/api/classes/Ember.ComputedProperty.html#method_volatile)
   * function to set the property into a non-cached mode causing the headers to
   * be recomputed with every request.
   *
   * ```app/services/ajax.js
   * import Ember from 'ember';
   * import AjaxService from 'ember-ajax/services/ajax';
   *
   * export default AjaxService.extend({
   *   session: Ember.inject.service(),
   *   headers: Ember.computed("session.authToken", function() {
   *     return {
   *       "API_KEY": Ember.get(document.cookie.match(/apiKey\=([^;]*)/), "1"),
   *       "ANOTHER_HEADER": "Some header value"
   *     };
   *   }).volatile()
   * });
   * ```
   * @public
   */
  exports['default'] = Service.extend(_emberAjaxMixinsAjaxRequest['default']);
});
define('ember-ajax/utils/ajax', ['exports', 'ember', 'ember-ajax/utils/is-fastboot'], function (exports, _ember, _emberAjaxUtilsIsFastboot) {
  /* global najax */
  'use strict';

  var $ = _ember['default'].$;

  exports['default'] = _emberAjaxUtilsIsFastboot['default'] ? najax : $.ajax;
});
define('ember-ajax/utils/is-fastboot', ['exports'], function (exports) {
  /* global FastBoot */
  'use strict';

  var isFastBoot = typeof FastBoot !== 'undefined';
  exports['default'] = isFastBoot;
});
define('ember-ajax/utils/parse-response-headers', ['exports'], function (exports) {
  'use strict';

  exports['default'] = parseResponseHeaders;

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  var CLRF = '\r\n';
  function parseResponseHeaders(headersString) {
    var headers = {};

    if (!headersString) {
      return headers;
    }

    var headerPairs = headersString.split(CLRF);

    headerPairs.forEach(function (header) {
      var _header$split = header.split(':');

      var _header$split2 = _toArray(_header$split);

      var field = _header$split2[0];

      var value = _header$split2.slice(1);

      field = field.trim();
      value = value.join(':').trim();

      if (value) {
        headers[field] = value;
      }
    });

    return headers;
  }
});
define('ember-ajax/utils/url-helpers', ['exports', 'ember-ajax/utils/is-fastboot'], function (exports, _emberAjaxUtilsIsFastboot) {
  'use strict';

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  })();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  /* global require, module, URL */

  var completeUrlRegex = /^(http|https)/;

  /*
   * Isomorphic URL parsing
   * Borrowed from
   * http://www.sitepoint.com/url-parsing-isomorphic-javascript/
   */
  var isNode = typeof module === 'object' && module.exports;
  var url = getUrlModule();

  /**
   * Get the node url module or an anchor element
   *
   * @private
   * @return {Object|HTMLAnchorElement} Object to parse urls
   */
  function getUrlModule() {
    if (_emberAjaxUtilsIsFastboot['default']) {
      // ember-fastboot-server provides the node url module as URL global
      return URL;
    }

    if (isNode) {
      return require('url');
    }

    return document.createElement('a');
  }

  /**
   * Parse a URL string into an object that defines its structure
   *
   * The returned object will have the following properties:
   *
   *   href: the full URL
   *   protocol: the request protocol
   *   hostname: the target for the request
   *   port: the port for the request
   *   pathname: any URL after the host
   *   search: query parameters
   *   hash: the URL hash
   *
   * @private
   * @return {Object} URL structure
   */
  function parseUrl(str) {
    var fullObject = undefined;
    if (isNode || _emberAjaxUtilsIsFastboot['default']) {
      fullObject = url.parse(str);
    } else {
      url.href = str;
      fullObject = url;
    }
    var desiredProps = {};
    desiredProps.href = fullObject.href;
    desiredProps.protocol = fullObject.protocol;
    desiredProps.hostname = fullObject.hostname;
    desiredProps.port = fullObject.port;
    desiredProps.pathname = fullObject.pathname;
    desiredProps.search = fullObject.search;
    desiredProps.hash = fullObject.hash;
    return desiredProps;
  }

  /**
   * RequestURL
   *
   * Converts a URL string into an object for easy comparison to other URLs
   *
   * @public
   */

  var RequestURL = (function () {
    function RequestURL(url) {
      _classCallCheck(this, RequestURL);

      this.url = url;
    }

    _createClass(RequestURL, [{
      key: 'sameHost',
      value: function sameHost(other) {
        var _this = this;

        return ['protocol', 'hostname', 'port'].reduce(function (previous, prop) {
          return previous && _this[prop] === other[prop];
        }, true);
      }
    }, {
      key: 'url',
      get: function get() {
        return this._url;
      },
      set: function set(value) {
        this._url = value;

        var explodedUrl = parseUrl(value);
        for (var prop in explodedUrl) {
          this[prop] = explodedUrl[prop];
        }

        return this._url;
      }
    }, {
      key: 'isComplete',
      get: function get() {
        return this.url.match(completeUrlRegex);
      }
    }]);

    return RequestURL;
  })();

  exports.RequestURL = RequestURL;
});
define('ember-basic-dropdown/components/basic-dropdown/content', ['exports', 'ember-component', 'ember-basic-dropdown/templates/components/basic-dropdown/content', 'ember-get-config', 'jquery', 'ember', 'ember-basic-dropdown/utils/computed-fallback-if-undefined', 'ember-runloop'], function (exports, _emberComponent, _emberBasicDropdownTemplatesComponentsBasicDropdownContent, _emberGetConfig, _jquery, _ember, _emberBasicDropdownUtilsComputedFallbackIfUndefined, _emberRunloop) {
  'use strict';

  var defaultDestination = _emberGetConfig['default']['ember-basic-dropdown'] && _emberGetConfig['default']['ember-basic-dropdown'].destination || 'ember-basic-dropdown-wormhole';
  var testing = _ember['default'].testing;

  var MutObserver = self.window.MutationObserver || self.window.WebKitMutationObserver;
  function waitForAnimations(element, callback) {
    var computedStyle = self.window.getComputedStyle(element);
    if (computedStyle.transitionDuration && computedStyle.transitionDuration !== '0s') {
      (function () {
        var eventCallback = function eventCallback() {
          element.removeEventListener('transitionend', eventCallback);
          callback();
        };
        element.addEventListener('transitionend', eventCallback);
      })();
    } else if (computedStyle.animationName !== 'none' && computedStyle.animationPlayState === 'running') {
      (function () {
        var eventCallback = function eventCallback() {
          element.removeEventListener('animationend', eventCallback);
          callback();
        };
        element.addEventListener('animationend', eventCallback);
      })();
    } else {
      callback();
    }
  }

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberBasicDropdownTemplatesComponentsBasicDropdownContent['default'],
    tagName: '',
    to: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])(testing ? 'ember-testing' : defaultDestination),
    animationEnabled: !testing,
    isTouchDevice: !!self.window && 'ontouchstart' in self.window,
    hasMoved: false,
    animationClass: '',

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      this.handleRootMouseDown = this.handleRootMouseDown.bind(this);
      this.touchStartHandler = this.touchStartHandler.bind(this);
      this.touchMoveHandler = this.touchMoveHandler.bind(this);
      var dropdown = this.get('dropdown');
      this.triggerId = 'ember-basic-dropdown-trigger-' + dropdown._id;
      this.dropdownId = 'ember-basic-dropdown-content-' + dropdown._id;
      if (this.get('animationEnabled')) {
        this.set('animationClass', 'ember-basic-dropdown--transitioning-in');
      }
      this.runloopAwareReposition = function () {
        (0, _emberRunloop.join)(dropdown.actions.reposition);
      };
    },

    // Actions
    actions: {
      didOpen: function didOpen() {
        var appRoot = this.get('appRoot');
        var dropdown = this.get('dropdown');
        this.dropdownElement = document.getElementById(this.dropdownId);
        var triggerId = this.get('triggerId');
        if (triggerId) {
          this.triggerElement = document.getElementById(this.triggerId);
        }
        appRoot.addEventListener('mousedown', this.handleRootMouseDown, true);
        if (this.get('isTouchDevice')) {
          appRoot.addEventListener('touchstart', this.touchStartHandler, true);
          appRoot.addEventListener('touchend', this.handleRootMouseDown, true);
        }

        var onFocusIn = this.get('onFocusIn');
        if (onFocusIn) {
          this.dropdownElement.addEventListener('focusin', function (e) {
            return onFocusIn(dropdown, e);
          });
        }
        var onFocusOut = this.get('onFocusOut');
        if (onFocusOut) {
          this.dropdownElement.addEventListener('focusout', function (e) {
            return onFocusOut(dropdown, e);
          });
        }

        if (!this.get('renderInPlace')) {
          this.addGlobalEvents();
        }
        dropdown.actions.reposition();
        if (this.get('animationEnabled')) {
          (0, _emberRunloop.scheduleOnce)('afterRender', this, this.animateIn);
        }
      },

      willClose: function willClose() {
        var appRoot = this.get('appRoot');
        this.removeGlobalEvents();
        appRoot.removeEventListener('mousedown', this.handleRootMouseDown, true);
        if (this.get('isTouchDevice')) {
          appRoot.removeEventListener('touchstart', this.touchStartHandler, true);
          appRoot.removeEventListener('touchend', this.handleRootMouseDown, true);
        }
        if (this.get('animationEnabled')) {
          this.animateOut(this.dropdownElement);
        }
        this.dropdownElement = this.triggerElement = null;
      }
    },

    // Methods
    handleRootMouseDown: function handleRootMouseDown(e) {
      if (this.hasMoved || this.dropdownElement.contains(e.target) || this.triggerElement && this.triggerElement.contains(e.target)) {
        this.hasMoved = false;
        return;
      }

      var closestDropdown = (0, _jquery['default'])(e.target).closest('.ember-basic-dropdown-content').get(0);
      if (closestDropdown) {
        var trigger = document.querySelector('[aria-controls=' + closestDropdown.attributes.id.value + ']');
        var parentDropdown = (0, _jquery['default'])(trigger).closest('.ember-basic-dropdown-content').get(0);
        if (parentDropdown && parentDropdown.attributes.id.value === this.dropdownId) {
          this.hasMoved = false;
          return;
        }
      }

      this.get('dropdown').actions.close(e, true);
    },

    addGlobalEvents: function addGlobalEvents() {
      var _this = this;

      self.window.addEventListener('scroll', this.runloopAwareReposition);
      self.window.addEventListener('resize', this.runloopAwareReposition);
      self.window.addEventListener('orientationchange', this.runloopAwareReposition);
      if (MutObserver) {
        this.mutationObserver = new MutObserver(function (mutations) {
          if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
            _this.runloopAwareReposition();
          }
        });
        this.mutationObserver.observe(this.dropdownElement, { childList: true, subtree: true });
      } else {
        this.dropdownElement.addEventListener('DOMNodeInserted', this.runloopAwareReposition, false);
        this.dropdownElement.addEventListener('DOMNodeRemoved', this.runloopAwareReposition, false);
      }
    },

    removeGlobalEvents: function removeGlobalEvents() {
      self.window.removeEventListener('scroll', this.runloopAwareReposition);
      self.window.removeEventListener('resize', this.runloopAwareReposition);
      self.window.removeEventListener('orientationchange', this.runloopAwareReposition);
      if (MutObserver) {
        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
          this.mutationObserver = null;
        }
      } else {
        this.dropdownElement.removeEventListener('DOMNodeInserted', this.runloopAwareReposition);
        this.dropdownElement.removeEventListener('DOMNodeRemoved', this.runloopAwareReposition);
      }
    },

    animateIn: function animateIn() {
      var _this2 = this;

      waitForAnimations(this.dropdownElement, function () {
        _this2.set('animationClass', 'ember-basic-dropdown--transitioned-in');
      });
    },

    animateOut: function animateOut(dropdownElement) {
      var parentElement = this.get('renderInPlace') ? dropdownElement.parentElement.parentElement : dropdownElement.parentElement;
      var clone = dropdownElement.cloneNode(true);
      clone.id = clone.id + '--clone';
      var $clone = (0, _jquery['default'])(clone);
      $clone.removeClass('ember-basic-dropdown--transitioned-in');
      $clone.removeClass('ember-basic-dropdown--transitioning-in');
      $clone.addClass('ember-basic-dropdown--transitioning-out');
      parentElement.appendChild(clone);
      this.set('animationClass', 'ember-basic-dropdown--transitioning-in');
      waitForAnimations(clone, function () {
        parentElement.removeChild(clone);
      });
    },

    touchStartHandler: function touchStartHandler() {
      this.get('appRoot').addEventListener('touchmove', this.touchMoveHandler, true);
    },

    touchMoveHandler: function touchMoveHandler() {
      this.hasMoved = true;
      this.get('appRoot').removeEventListener('touchmove', this.touchMoveHandler, true);
    }
  });
});
define('ember-basic-dropdown/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/templates/components/basic-dropdown/trigger', 'jquery', 'ember-component', 'ember-computed'], function (exports, _emberBasicDropdownTemplatesComponentsBasicDropdownTrigger, _jquery, _emberComponent, _emberComputed) {
  'use strict';

  var isTouchDevice = !!self.window && 'ontouchstart' in self.window;

  function trueStringIfPresent(path) {
    return (0, _emberComputed['default'])(path, function () {
      if (this.get(path)) {
        return 'true';
      } else {
        return null;
      }
    });
  }

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberBasicDropdownTemplatesComponentsBasicDropdownTrigger['default'],
    isTouchDevice: isTouchDevice,
    classNames: ['ember-basic-dropdown-trigger'],
    role: 'button',
    tabindex: 0,
    'aria-haspopup': true,
    classNameBindings: ['inPlaceClass', 'hPositionClass', 'vPositionClass'],
    attributeBindings: ['role', 'tabIndex:tabindex', 'dropdownId:aria-controls', 'ariaLabel:aria-label', 'ariaLabelledBy:aria-labelledby', 'ariaDescribedBy:aria-describedby', 'aria-disabled', 'aria-expanded', 'aria-haspopup', 'aria-invalid', 'aria-pressed', 'aria-required'],

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      var dropdown = this.get('dropdown');
      this.elementId = 'ember-basic-dropdown-trigger-' + dropdown._id;
      this.dropdownId = this.dropdownId || 'ember-basic-dropdown-content-' + dropdown._id;
      this._touchMoveHandler = this._touchMoveHandler.bind(this);
    },

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.addMandatoryHandlers();
      this.addOptionalHandlers();
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this.get('appRoot').removeEventListener('touchmove', this._touchMoveHandler);
    },

    // CPs
    'aria-disabled': trueStringIfPresent('dropdown.disabled'),
    'aria-expanded': trueStringIfPresent('dropdown.isOpen'),
    'aria-invalid': trueStringIfPresent('ariaInvalid'),
    'aria-pressed': trueStringIfPresent('dropdown.isOpen'),
    'aria-required': trueStringIfPresent('ariaRequired'),

    tabIndex: (0, _emberComputed['default'])('dropdown.disabled', 'tabIndex', function () {
      return this.get('dropdown.disabled') ? -1 : this.get('tabindex') || 0;
    }),

    inPlaceClass: (0, _emberComputed['default'])('renderInPlace', function () {
      if (this.get('renderInPlace')) {
        return 'ember-basic-dropdown-trigger--in-place';
      }
    }),

    hPositionClass: (0, _emberComputed['default'])('hPosition', function () {
      var hPosition = this.get('hPosition');
      if (hPosition) {
        return 'ember-basic-dropdown-trigger--' + hPosition;
      }
    }),

    vPositionClass: (0, _emberComputed['default'])('vPosition', function () {
      var vPosition = this.get('vPosition');
      if (vPosition) {
        return 'ember-basic-dropdown-trigger--' + vPosition;
      }
    }),

    // Actions
    actions: {
      handleMousedown: function handleMousedown(e) {
        var dropdown = this.get('dropdown');
        if (e && e.defaultPrevented || dropdown.disabled) {
          return;
        }
        this.stopTextSelectionUntilMouseup();
        dropdown.actions.toggle(e);
      },

      handleTouchEnd: function handleTouchEnd(e) {
        var dropdown = this.get('dropdown');
        if (e && e.defaultPrevented || dropdown.disabled) {
          return;
        }
        if (!this.hasMoved) {
          dropdown.actions.toggle(e);
        }
        this.hasMoved = false;
      },

      handleKeydown: function handleKeydown(e) {
        var dropdown = this.get('dropdown');
        if (dropdown.disabled) {
          return;
        }
        var onKeydown = this.get('onKeydown');
        if (onKeydown && onKeydown(dropdown, e) === false) {
          return;
        }
        if (e.keyCode === 13) {
          // Enter
          dropdown.actions.toggle(e);
        } else if (e.keyCode === 32) {
          // Space
          e.preventDefault(); // prevents the space to trigger a scroll page-next
          dropdown.actions.toggle(e);
        } else if (e.keyCode === 27) {
          dropdown.actions.close(e);
        }
      }
    },

    // Methods
    _touchMoveHandler: function _touchMoveHandler() {
      this.hasMoved = true;
      this.get('appRoot').removeEventListener('touchmove', this._touchMoveHandler);
    },

    stopTextSelectionUntilMouseup: function stopTextSelectionUntilMouseup() {
      var $appRoot = (0, _jquery['default'])(this.get('appRoot'));
      var mouseupHandler = function mouseupHandler() {
        $appRoot[0].removeEventListener('mouseup', mouseupHandler, true);
        $appRoot.removeClass('ember-basic-dropdown-text-select-disabled');
      };
      $appRoot[0].addEventListener('mouseup', mouseupHandler, true);
      $appRoot.addClass('ember-basic-dropdown-text-select-disabled');
    },

    addMandatoryHandlers: function addMandatoryHandlers() {
      var _this = this;

      if (this.get('isTouchDevice')) {
        this.element.addEventListener('touchstart', function () {
          _this.get('appRoot').addEventListener('touchmove', _this._touchMoveHandler);
        });
        this.element.addEventListener('touchend', function (e) {
          _this.send('handleTouchEnd', e);
          e.preventDefault(); // Prevent synthetic click
        });
      }
      this.element.addEventListener('mousedown', function (e) {
        return _this.send('handleMousedown', e);
      });
      this.element.addEventListener('keydown', function (e) {
        return _this.send('handleKeydown', e);
      });
    },

    addOptionalHandlers: function addOptionalHandlers() {
      var dropdown = this.get('dropdown');
      var onMouseEnter = this.get('onMouseEnter');
      if (onMouseEnter) {
        this.element.addEventListener('mouseenter', function (e) {
          return onMouseEnter(dropdown, e);
        });
      }
      var onMouseLeave = this.get('onMouseLeave');
      if (onMouseLeave) {
        this.element.addEventListener('mouseleave', function (e) {
          return onMouseLeave(dropdown, e);
        });
      }
      var onFocus = this.get('onFocus');
      if (onFocus) {
        this.element.addEventListener('focus', function (e) {
          return onFocus(dropdown, e);
        });
      }
      var onBlur = this.get('onBlur');
      if (onBlur) {
        this.element.addEventListener('blur', function (e) {
          return onBlur(dropdown, e);
        });
      }
      var onFocusIn = this.get('onFocusIn');
      if (onFocusIn) {
        this.element.addEventListener('focusin', function (e) {
          return onFocusIn(dropdown, e);
        });
      }
      var onFocusOut = this.get('onFocusOut');
      if (onFocusOut) {
        this.element.addEventListener('focusout', function (e) {
          return onFocusOut(dropdown, e);
        });
      }
    }
  });
});
define('ember-basic-dropdown/components/basic-dropdown/wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  'use strict';

  exports['default'] = _emberWormholeComponentsEmberWormhole['default'].extend({
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      var didInsert = this.getAttr('didInsert');
      if (didInsert) {
        didInsert();
      }
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      var willRemove = this.getAttr('willRemove');
      if (willRemove) {
        willRemove();
      }
    }
  });
});
define('ember-basic-dropdown/components/basic-dropdown', ['exports', 'ember', 'ember-component', 'ember-computed', 'ember-metal/set', 'jquery', 'ember-basic-dropdown/templates/components/basic-dropdown', 'ember-runloop', 'ember-basic-dropdown/utils/computed-fallback-if-undefined'], function (exports, _ember, _emberComponent, _emberComputed, _emberMetalSet, _jquery, _emberBasicDropdownTemplatesComponentsBasicDropdown, _emberRunloop, _emberBasicDropdownUtilsComputedFallbackIfUndefined) {
  'use strict';

  var testing = _ember['default'].testing;
  var getOwner = _ember['default'].getOwner;

  var instancesCounter = 0;

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberBasicDropdownTemplatesComponentsBasicDropdown['default'],
    tagName: '',
    renderInPlace: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])(false),
    verticalPosition: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])('auto'), // above | below
    horizontalPosition: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])('auto'), // right | center | left
    matchTriggerWidth: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])(false),
    triggerComponent: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])('basic-dropdown/trigger'),
    contentComponent: (0, _emberBasicDropdownUtilsComputedFallbackIfUndefined['default'])('basic-dropdown/content'),
    classNames: ['ember-basic-dropdown'],

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      if (this.get('renderInPlace') && this.get('tagName') === '') {
        this.set('tagName', 'div');
      }
      instancesCounter++;

      this.publicAPI = {
        _id: instancesCounter++,
        isOpen: this.get('initiallyOpened') || false,
        disabled: this.get('disabled') || false,
        actions: {
          open: this.open.bind(this),
          close: this.close.bind(this),
          toggle: this.toggle.bind(this),
          reposition: this.reposition.bind(this)
        }
      };

      this.triggerId = this.triggerId || 'ember-basic-dropdown-trigger-' + this.publicAPI._id;
      this.dropdownId = this.dropdownId || 'ember-basic-dropdown-content-' + this.publicAPI._id;

      var registerAPI = this.get('registerAPI');
      if (registerAPI) {
        registerAPI(this.publicAPI);
      }
    },

    willDestroy: function willDestroy() {
      this._super.apply(this, arguments);
      (0, _emberRunloop.cancel)(this.updatePositionsTimer);
    },

    didUpdateAttrs: function didUpdateAttrs() {
      this._super.apply(this, arguments);
      var disabled = this.get('disabled');
      if (disabled !== this.publicAPI.disabled) {
        (0, _emberMetalSet['default'])(this.publicAPI, 'disabled', disabled);
      }
    },

    // CPs
    appRoot: (0, _emberComputed['default'])(function () {
      var rootSelector = testing ? '#ember-testing' : getOwner(this).lookup('application:main').rootElement;
      return self.document.querySelector(rootSelector);
    }),

    // Actions
    actions: {
      handleFocus: function handleFocus(e) {
        var onFocus = this.get('onFocus');
        if (onFocus) {
          onFocus(this.publicAPI, e);
        }
      }
    },

    // Methods
    open: function open(e) {
      if (this.publicAPI.disabled || this.publicAPI.isOpen) {
        return;
      }
      var onOpen = this.get('onOpen');
      if (onOpen && onOpen(this.publicAPI, e) === false) {
        return;
      }
      (0, _emberMetalSet['default'])(this.publicAPI, 'isOpen', true);
    },

    close: function close(e, skipFocus) {
      if (this.publicAPI.disabled || !this.publicAPI.isOpen) {
        return;
      }
      var onClose = this.get('onClose');
      if (onClose && onClose(this.publicAPI, e) === false) {
        return;
      }
      (0, _emberMetalSet['default'])(this.publicAPI, 'isOpen', false);
      this.setProperties({ hPosition: null, vPosition: null });
      this.previousVerticalPosition = this.previousHorizontalPosition = null;
      if (skipFocus) {
        return;
      }
      var trigger = document.getElementById(this.triggerId);
      if (trigger && trigger.tabIndex > -1) {
        trigger.focus();
      }
    },

    toggle: function toggle(e) {
      if (this.publicAPI.isOpen) {
        this.close(e);
      } else {
        this.open(e);
      }
    },

    reposition: function reposition() {
      if (!this.publicAPI.isOpen) {
        return;
      }
      var dropdownElement = self.document.getElementById(this.dropdownId);
      var triggerElement = self.document.getElementById(this.triggerId);
      if (!dropdownElement || !triggerElement) {
        return;
      }

      var renderInPlace = this.get('renderInPlace');
      if (renderInPlace) {
        this.performNaiveReposition(triggerElement, dropdownElement);
      } else {
        this.performFullReposition(triggerElement, dropdownElement);
      }
    },

    performNaiveReposition: function performNaiveReposition(trigger, dropdown) {
      var horizontalPosition = this.get('horizontalPosition');
      if (horizontalPosition === 'auto') {
        var triggerRect = trigger.getBoundingClientRect();
        var dropdownRect = dropdown.getBoundingClientRect();
        var viewportRight = (0, _jquery['default'])(self.window).scrollLeft() + self.window.innerWidth;
        horizontalPosition = triggerRect.left + dropdownRect.width > viewportRight ? 'right' : 'left';
      }
      this.applyReposition(trigger, dropdown, { horizontalPosition: horizontalPosition });
    },

    performFullReposition: function performFullReposition(trigger, dropdown) {
      var _getProperties = this.getProperties('horizontalPosition', 'verticalPosition', 'matchTriggerWidth');

      var horizontalPosition = _getProperties.horizontalPosition;
      var verticalPosition = _getProperties.verticalPosition;
      var matchTriggerWidth = _getProperties.matchTriggerWidth;

      var $window = (0, _jquery['default'])(self.window);
      var scroll = { left: $window.scrollLeft(), top: $window.scrollTop() };

      var _trigger$getBoundingClientRect = trigger.getBoundingClientRect();

      var triggerLeft = _trigger$getBoundingClientRect.left;
      var triggerTop = _trigger$getBoundingClientRect.top;
      var triggerWidth = _trigger$getBoundingClientRect.width;
      var triggerHeight = _trigger$getBoundingClientRect.height;

      var _dropdown$getBoundingClientRect = dropdown.getBoundingClientRect();

      var dropdownHeight = _dropdown$getBoundingClientRect.height;
      var dropdownWidth = _dropdown$getBoundingClientRect.width;

      var dropdownLeft = triggerLeft;
      var dropdownTop = undefined;
      dropdownWidth = matchTriggerWidth ? triggerWidth : dropdownWidth;

      if (horizontalPosition === 'auto') {
        var viewportRight = scroll.left + self.window.innerWidth;
        var roomForRight = viewportRight - triggerLeft;
        var roomForLeft = triggerLeft;
        horizontalPosition = roomForRight > roomForLeft ? 'left' : 'right';
      } else if (horizontalPosition === 'right') {
        dropdownLeft = triggerLeft + triggerWidth - dropdownWidth;
      } else if (horizontalPosition === 'center') {
        dropdownLeft = triggerLeft + (triggerWidth - dropdownWidth) / 2;
      }

      var triggerTopWithScroll = triggerTop + scroll.top;
      if (verticalPosition === 'above') {
        dropdownTop = triggerTopWithScroll - dropdownHeight;
      } else if (verticalPosition === 'below') {
        dropdownTop = triggerTopWithScroll + triggerHeight;
      } else {
        var viewportBottom = scroll.top + self.window.innerHeight;
        var enoughRoomBelow = triggerTopWithScroll + triggerHeight + dropdownHeight < viewportBottom;
        var enoughRoomAbove = triggerTop > dropdownHeight;

        if (this.previousVerticalPosition === 'below' && !enoughRoomBelow && enoughRoomAbove) {
          verticalPosition = 'above';
        } else if (this.previousVerticalPosition === 'above' && !enoughRoomAbove && enoughRoomBelow) {
          verticalPosition = 'below';
        } else if (!this.previousVerticalPosition) {
          verticalPosition = enoughRoomBelow ? 'below' : 'above';
        } else {
          verticalPosition = this.previousVerticalPosition;
        }
        dropdownTop = triggerTopWithScroll + (verticalPosition === 'below' ? triggerHeight : -dropdownHeight);
      }

      var style = { top: dropdownTop + 'px', left: dropdownLeft + 'px' };
      if (matchTriggerWidth) {
        style.width = dropdownWidth + 'px';
      }
      this.applyReposition(trigger, dropdown, { horizontalPosition: horizontalPosition, verticalPosition: verticalPosition, style: style });
    },

    applyReposition: function applyReposition(trigger, dropdown, positions) {
      this.updatePositionsTimer = (0, _emberRunloop.scheduleOnce)('actions', this, this.updatePositions, positions);
      if (positions.style) {
        Object.keys(positions.style).forEach(function (key) {
          return dropdown.style[key] = positions.style[key];
        });
      }
    },

    updatePositions: function updatePositions(positions) {
      this.setProperties({ hPosition: positions.horizontalPosition, vPosition: positions.verticalPosition });
      this.previousHorizontalPosition = positions.horizontalPosition;
      this.previousVerticalPosition = positions.verticalPosition;
    }
  });
});
define("ember-basic-dropdown/templates/components/basic-dropdown/content", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 9,
                "column": 2
              }
            },
            "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown/content.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createAttrMorph(element0, 'id');
            morphs[1] = dom.createAttrMorph(element0, 'class');
            morphs[2] = dom.createAttrMorph(element0, 'dir');
            morphs[3] = dom.createMorphAt(element0, 1, 1);
            return morphs;
          },
          statements: [["attribute", "id", ["get", "dropdownId", ["loc", [null, [4, 11], [4, 21]]]]], ["attribute", "class", ["concat", ["ember-basic-dropdown-content ", ["get", "class", ["loc", [null, [5, 44], [5, 49]]]], " ", ["subexpr", "if", [["get", "renderInPlace", ["loc", [null, [5, 57], [5, 70]]]], "ember-basic-dropdown-content--in-place"], [], ["loc", [null, [5, 52], [5, 113]]]], " ", ["subexpr", "if", [["get", "hPosition", ["loc", [null, [5, 119], [5, 128]]]], ["subexpr", "concat", ["ember-basic-dropdown-content--", ["get", "hPosition", ["loc", [null, [5, 170], [5, 179]]]]], [], ["loc", [null, [5, 129], [5, 180]]]]], [], ["loc", [null, [5, 114], [5, 182]]]], " ", ["subexpr", "if", [["get", "vPosition", ["loc", [null, [5, 188], [5, 197]]]], ["subexpr", "concat", ["ember-basic-dropdown-content--", ["get", "vPosition", ["loc", [null, [5, 239], [5, 248]]]]], [], ["loc", [null, [5, 198], [5, 249]]]]], [], ["loc", [null, [5, 183], [5, 251]]]], " ", ["get", "animationClass", ["loc", [null, [5, 254], [5, 268]]]]]]], ["attribute", "dir", ["get", "dir", ["loc", [null, [6, 12], [6, 15]]]]], ["content", "yield", ["loc", [null, [7, 6], [7, 15]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown/content.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "basic-dropdown/wormhole", [], ["to", ["subexpr", "@mut", [["get", "to", ["loc", [null, [2, 32], [2, 34]]]]], [], []], "renderInPlace", ["subexpr", "@mut", [["get", "renderInPlace", ["loc", [null, [2, 49], [2, 62]]]]], [], []], "didInsert", ["subexpr", "action", ["didOpen"], [], ["loc", [null, [2, 73], [2, 91]]]], "willRemove", ["subexpr", "action", ["willClose"], [], ["loc", [null, [2, 103], [2, 123]]]]], 0, null, ["loc", [null, [2, 2], [9, 30]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 7
          }
        },
        "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown/content.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "dropdown.isOpen", ["loc", [null, [1, 6], [1, 21]]]]], [], 0, null, ["loc", [null, [1, 0], [10, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-basic-dropdown/templates/components/basic-dropdown/trigger", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown/trigger.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-basic-dropdown/templates/components/basic-dropdown", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "modules/ember-basic-dropdown/templates/components/basic-dropdown.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "yield", [["subexpr", "hash", [], ["isOpen", ["get", "publicAPI.isOpen", ["loc", [null, [2, 9], [2, 25]]]], "disabled", ["get", "publicAPI.disabled", ["loc", [null, [3, 11], [3, 29]]]], "actions", ["get", "publicAPI.actions", ["loc", [null, [4, 10], [4, 27]]]], "trigger", ["subexpr", "component", [["get", "triggerComponent", ["loc", [null, [5, 21], [5, 37]]]]], ["appRoot", ["subexpr", "readonly", [["get", "appRoot", ["loc", [null, [6, 22], [6, 29]]]]], [], ["loc", [null, [6, 12], [6, 30]]]], "dropdown", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [7, 23], [7, 32]]]]], [], ["loc", [null, [7, 13], [7, 33]]]], "hPosition", ["subexpr", "readonly", [["get", "hPosition", ["loc", [null, [8, 24], [8, 33]]]]], [], ["loc", [null, [8, 14], [8, 34]]]], "onFocus", ["subexpr", "action", ["handleFocus"], [], ["loc", [null, [9, 12], [9, 34]]]], "renderInPlace", ["subexpr", "readonly", [["get", "renderInPlace", ["loc", [null, [10, 28], [10, 41]]]]], [], ["loc", [null, [10, 18], [10, 42]]]], "vPosition", ["subexpr", "readonly", [["get", "vPosition", ["loc", [null, [11, 24], [11, 33]]]]], [], ["loc", [null, [11, 14], [11, 34]]]]], ["loc", [null, [5, 10], [12, 3]]]], "content", ["subexpr", "component", [["get", "contentComponent", ["loc", [null, [13, 21], [13, 37]]]]], ["appRoot", ["subexpr", "readonly", [["get", "appRoot", ["loc", [null, [14, 22], [14, 29]]]]], [], ["loc", [null, [14, 12], [14, 30]]]], "dropdown", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [15, 23], [15, 32]]]]], [], ["loc", [null, [15, 13], [15, 33]]]], "hPosition", ["subexpr", "readonly", [["get", "hPosition", ["loc", [null, [16, 24], [16, 33]]]]], [], ["loc", [null, [16, 14], [16, 34]]]], "renderInPlace", ["subexpr", "readonly", [["get", "renderInPlace", ["loc", [null, [17, 28], [17, 41]]]]], [], ["loc", [null, [17, 18], [17, 42]]]], "vPosition", ["subexpr", "readonly", [["get", "vPosition", ["loc", [null, [18, 24], [18, 33]]]]], [], ["loc", [null, [18, 14], [18, 34]]]]], ["loc", [null, [13, 10], [19, 3]]]]], ["loc", [null, [1, 8], [20, 1]]]]], [], ["loc", [null, [1, 0], [20, 3]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('ember-basic-dropdown/utils/computed-fallback-if-undefined', ['exports', 'ember-computed'], function (exports, _emberComputed) {
  'use strict';

  exports['default'] = computedFallbackIfUndefined;

  function computedFallbackIfUndefined(fallback) {
    return (0, _emberComputed['default'])({
      get: function get() {
        return fallback;
      },
      set: function set(_, v) {
        return v === undefined ? fallback : v;
      }
    });
  }
});
define('ember-cli-app-version/components/app-version', ['exports', 'ember', 'ember-cli-app-version/templates/app-version'], function (exports, _ember, _emberCliAppVersionTemplatesAppVersion) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'span',
    layout: _emberCliAppVersionTemplatesAppVersion['default']
  });
});
define('ember-cli-app-version/initializer-factory', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = initializerFactory;

  var classify = _ember['default'].String.classify;

  function initializerFactory(name, version) {
    var registered = false;

    return function () {
      if (!registered && name && version) {
        var appName = classify(name);
        _ember['default'].libraries.register(appName, version);
        registered = true;
      }
    };
  }
});
define("ember-cli-app-version/templates/app-version", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "modules/ember-cli-app-version/templates/app-version.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "version", ["loc", [null, [1, 0], [1, 11]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('ember-data/-private/adapters/build-url-mixin', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var get = _ember['default'].get;

  /**
  
    WARNING: This interface is likely to change in order to accomodate https://github.com/emberjs/rfcs/pull/4
  
    ## Using BuildURLMixin
  
    To use url building, include the mixin when extending an adapter, and call `buildURL` where needed.
    The default behaviour is designed for RESTAdapter.
  
    ### Example
  
    ```javascript
    export default DS.Adapter.extend(BuildURLMixin, {
      findRecord: function(store, type, id, snapshot) {
        var url = this.buildURL(type.modelName, id, snapshot, 'findRecord');
        return this.ajax(url, 'GET');
      }
    });
    ```
  
    ### Attributes
  
    The `host` and `namespace` attributes will be used if defined, and are optional.
  
    @class BuildURLMixin
    @namespace DS
  */
  exports['default'] = _ember['default'].Mixin.create({
    /**
      Builds a URL for a given type and optional ID.
       By default, it pluralizes the type's name (for example, 'post'
      becomes 'posts' and 'person' becomes 'people'). To override the
      pluralization see [pathForType](#method_pathForType).
       If an ID is specified, it adds the ID to the path generated
      for the type, separated by a `/`.
       When called by RESTAdapter.findMany() the `id` and `snapshot` parameters
      will be arrays of ids and snapshots.
       @method buildURL
      @param {String} modelName
      @param {(String|Array|Object)} id single id or array of ids or query
      @param {(DS.Snapshot|Array)} snapshot single snapshot or array of snapshots
      @param {String} requestType
      @param {Object} query object of query parameters to send for query requests.
      @return {String} url
    */
    buildURL: function buildURL(modelName, id, snapshot, requestType, query) {
      switch (requestType) {
        case 'findRecord':
          return this.urlForFindRecord(id, modelName, snapshot);
        case 'findAll':
          return this.urlForFindAll(modelName, snapshot);
        case 'query':
          return this.urlForQuery(query, modelName);
        case 'queryRecord':
          return this.urlForQueryRecord(query, modelName);
        case 'findMany':
          return this.urlForFindMany(id, modelName, snapshot);
        case 'findHasMany':
          return this.urlForFindHasMany(id, modelName, snapshot);
        case 'findBelongsTo':
          return this.urlForFindBelongsTo(id, modelName, snapshot);
        case 'createRecord':
          return this.urlForCreateRecord(modelName, snapshot);
        case 'updateRecord':
          return this.urlForUpdateRecord(id, modelName, snapshot);
        case 'deleteRecord':
          return this.urlForDeleteRecord(id, modelName, snapshot);
        default:
          return this._buildURL(modelName, id);
      }
    },

    /**
      @method _buildURL
      @private
      @param {String} modelName
      @param {String} id
      @return {String} url
    */
    _buildURL: function _buildURL(modelName, id) {
      var url = [];
      var host = get(this, 'host');
      var prefix = this.urlPrefix();
      var path;

      if (modelName) {
        path = this.pathForType(modelName);
        if (path) {
          url.push(path);
        }
      }

      if (id) {
        url.push(encodeURIComponent(id));
      }
      if (prefix) {
        url.unshift(prefix);
      }

      url = url.join('/');
      if (!host && url && url.charAt(0) !== '/') {
        url = '/' + url;
      }

      return url;
    },

    /**
     * @method urlForFindRecord
     * @param {String} id
     * @param {String} modelName
     * @param {DS.Snapshot} snapshot
     * @return {String} url
     */
    urlForFindRecord: function urlForFindRecord(id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },

    /**
     * @method urlForFindAll
     * @param {String} modelName
     * @param {DS.SnapshotRecordArray} snapshot
     * @return {String} url
     */
    urlForFindAll: function urlForFindAll(modelName, snapshot) {
      return this._buildURL(modelName);
    },

    /**
     * @method urlForQuery
     * @param {Object} query
     * @param {String} modelName
     * @return {String} url
     */
    urlForQuery: function urlForQuery(query, modelName) {
      return this._buildURL(modelName);
    },

    /**
     * @method urlForQueryRecord
     * @param {Object} query
     * @param {String} modelName
     * @return {String} url
     */
    urlForQueryRecord: function urlForQueryRecord(query, modelName) {
      return this._buildURL(modelName);
    },

    /**
     * @method urlForFindMany
     * @param {Array} ids
     * @param {String} modelName
     * @param {Array} snapshots
     * @return {String} url
     */
    urlForFindMany: function urlForFindMany(ids, modelName, snapshots) {
      return this._buildURL(modelName);
    },

    /**
     * @method urlForFindHasMany
     * @param {String} id
     * @param {String} modelName
     * @param {DS.Snapshot} snapshot
     * @return {String} url
     */
    urlForFindHasMany: function urlForFindHasMany(id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },

    /**
     * @method urlForFindBelongsTo
     * @param {String} id
     * @param {String} modelName
     * @param {DS.Snapshot} snapshot
     * @return {String} url
     */
    urlForFindBelongsTo: function urlForFindBelongsTo(id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },

    /**
     * @method urlForCreateRecord
     * @param {String} modelName
     * @param {DS.Snapshot} snapshot
     * @return {String} url
     */
    urlForCreateRecord: function urlForCreateRecord(modelName, snapshot) {
      return this._buildURL(modelName);
    },

    /**
     * @method urlForUpdateRecord
     * @param {String} id
     * @param {String} modelName
     * @param {DS.Snapshot} snapshot
     * @return {String} url
     */
    urlForUpdateRecord: function urlForUpdateRecord(id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },

    /**
     * @method urlForDeleteRecord
     * @param {String} id
     * @param {String} modelName
     * @param {DS.Snapshot} snapshot
     * @return {String} url
     */
    urlForDeleteRecord: function urlForDeleteRecord(id, modelName, snapshot) {
      return this._buildURL(modelName, id);
    },

    /**
      @method urlPrefix
      @private
      @param {String} path
      @param {String} parentURL
      @return {String} urlPrefix
    */
    urlPrefix: function urlPrefix(path, parentURL) {
      var host = get(this, 'host');
      var namespace = get(this, 'namespace');

      if (!host || host === '/') {
        host = '';
      }

      if (path) {
        // Protocol relative url
        if (/^\/\//.test(path) || /http(s)?:\/\//.test(path)) {
          // Do nothing, the full host is already included.
          return path;

          // Absolute path
        } else if (path.charAt(0) === '/') {
            return '' + host + path;
            // Relative path
          } else {
              return parentURL + '/' + path;
            }
      }

      // No path provided
      var url = [];
      if (host) {
        url.push(host);
      }
      if (namespace) {
        url.push(namespace);
      }
      return url.join('/');
    },

    /**
      Determines the pathname for a given type.
       By default, it pluralizes the type's name (for example,
      'post' becomes 'posts' and 'person' becomes 'people').
       ### Pathname customization
       For example if you have an object LineItem with an
      endpoint of "/line_items/".
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.RESTAdapter.extend({
        pathForType: function(modelName) {
          var decamelized = Ember.String.decamelize(modelName);
          return Ember.String.pluralize(decamelized);
        }
      });
      ```
       @method pathForType
      @param {String} modelName
      @return {String} path
    **/
    pathForType: function pathForType(modelName) {
      var camelized = _ember['default'].String.camelize(modelName);
      return _ember['default'].String.pluralize(camelized);
    }
  });
});
define("ember-data/-private/adapters", ["exports", "ember-data/adapters/json-api", "ember-data/adapters/rest"], function (exports, _emberDataAdaptersJsonApi, _emberDataAdaptersRest) {
  /**
    @module ember-data
  */

  "use strict";

  exports.JSONAPIAdapter = _emberDataAdaptersJsonApi["default"];
  exports.RESTAdapter = _emberDataAdaptersRest["default"];
});
define('ember-data/-private/core', ['exports', 'ember', 'ember-data/version'], function (exports, _ember, _emberDataVersion) {
  'use strict';

  /**
    @module ember-data
  */

  /**
    All Ember Data methods and functions are defined inside of this namespace.
  
    @class DS
    @static
  */

  /**
    @property VERSION
    @type String
    @static
  */
  var DS = _ember['default'].Namespace.create({
    VERSION: _emberDataVersion['default']
  });

  if (_ember['default'].libraries) {
    _ember['default'].libraries.registerCoreLibrary('Ember Data', DS.VERSION);
  }

  exports['default'] = DS;
});
define('ember-data/-private/debug', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.assert = assert;
  exports.debug = debug;
  exports.deprecate = deprecate;
  exports.info = info;
  exports.runInDebug = runInDebug;
  exports.warn = warn;
  exports.debugSeal = debugSeal;
  exports.assertPolymorphicType = assertPolymorphicType;

  function assert() {
    return _ember['default'].assert.apply(_ember['default'], arguments);
  }

  function debug() {
    return _ember['default'].debug.apply(_ember['default'], arguments);
  }

  function deprecate() {
    return _ember['default'].deprecate.apply(_ember['default'], arguments);
  }

  function info() {
    return _ember['default'].info.apply(_ember['default'], arguments);
  }

  function runInDebug() {
    return _ember['default'].runInDebug.apply(_ember['default'], arguments);
  }

  function warn() {
    return _ember['default'].warn.apply(_ember['default'], arguments);
  }

  function debugSeal() {
    return _ember['default'].debugSeal.apply(_ember['default'], arguments);
  }

  function checkPolymorphic(typeClass, addedRecord) {
    if (typeClass.__isMixin) {
      //TODO Need to do this in order to support mixins, should convert to public api
      //once it exists in Ember
      return typeClass.__mixin.detect(addedRecord.type.PrototypeMixin);
    }
    if (_ember['default'].MODEL_FACTORY_INJECTIONS) {
      typeClass = typeClass.superclass;
    }
    return typeClass.detect(addedRecord.type);
  }

  /**
    Assert that `addedRecord` has a valid type so it can be added to the
    relationship of the `record`.
  
    The assert basically checks if the `addedRecord` can be added to the
    relationship (specified via `relationshipMeta`) of the `record`.
  
    This utility should only be used internally, as both record parameters must
    be an InternalModel and the `relationshipMeta` needs to be the meta
    information about the relationship, retrieved via
    `record.relationshipFor(key)`.
  
    @method assertPolymorphicType
    @param {InternalModel} record
    @param {RelationshipMeta} relationshipMeta retrieved via
           `record.relationshipFor(key)`
    @param {InternalModel} addedRecord record which
           should be added/set for the relationship
  */

  function assertPolymorphicType(record, relationshipMeta, addedRecord) {
    var addedType = addedRecord.type.modelName;
    var recordType = record.type.modelName;
    var key = relationshipMeta.key;
    var typeClass = record.store.modelFor(relationshipMeta.type);

    var assertionMessage = 'You cannot add a record of type \'' + addedType + '\' to the \'' + recordType + '.' + key + '\' relationship (only \'' + typeClass.modelName + '\' allowed)';

    assert(assertionMessage, checkPolymorphic(typeClass, addedRecord));
  }
});
define('ember-data/-private/ext/date', ['exports', 'ember'], function (exports, _ember) {
  /**
    @module ember-data
  */

  'use strict';

  /**
    Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
  
    © 2011 Colin Snover <http://zetafleet.com>
  
    Released under MIT license.
  
    @class Date
    @namespace Ember
    @static
  */
  _ember['default'].Date = _ember['default'].Date || {};

  var origParse = Date.parse;
  var numericKeys = [1, 4, 5, 6, 7, 10, 11];

  /**
    @method parse
    @param {Date} date
    @return {Number} timestamp
  */
  _ember['default'].Date.parse = function (date) {
    var timestamp, struct;
    var minutesOffset = 0;

    // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
    // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
    // implementations could be faster
    //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
    if (struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date)) {
      // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
      for (var i = 0, k; k = numericKeys[i]; ++i) {
        struct[k] = +struct[k] || 0;
      }

      // allow undefined days and months
      struct[2] = (+struct[2] || 1) - 1;
      struct[3] = +struct[3] || 1;

      if (struct[8] !== 'Z' && struct[9] !== undefined) {
        minutesOffset = struct[10] * 60 + struct[11];

        if (struct[9] === '+') {
          minutesOffset = 0 - minutesOffset;
        }
      }

      timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    } else {
      timestamp = origParse ? origParse(date) : NaN;
    }

    return timestamp;
  };

  if (_ember['default'].EXTEND_PROTOTYPES === true || _ember['default'].EXTEND_PROTOTYPES.Date) {
    Date.parse = _ember['default'].Date.parse;
  }
});
define('ember-data/-private/features', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = isEnabled;

  function isEnabled() {
    var _Ember$FEATURES;

    return (_Ember$FEATURES = _ember['default'].FEATURES).isEnabled.apply(_Ember$FEATURES, arguments);
  }
});
define("ember-data/-private/initializers/data-adapter", ["exports", "ember-data/-private/system/debug/debug-adapter"], function (exports, _emberDataPrivateSystemDebugDebugAdapter) {
  "use strict";

  exports["default"] = initializeDebugAdapter;

  /**
    Configures a registry with injections on Ember applications
    for the Ember-Data store. Accepts an optional namespace argument.
  
    @method initializeStoreInjections
    @param {Ember.Registry} registry
  */
  function initializeDebugAdapter(registry) {
    registry.register('data-adapter:main', _emberDataPrivateSystemDebugDebugAdapter["default"]);
  }
});
define('ember-data/-private/initializers/store-injections', ['exports'], function (exports) {
  'use strict';

  exports['default'] = initializeStoreInjections;

  /**
    Configures a registry with injections on Ember applications
    for the Ember-Data store. Accepts an optional namespace argument.
  
    @method initializeStoreInjections
    @param {Ember.Registry} registry
  */
  function initializeStoreInjections(registry) {
    // registry.injection for Ember < 2.1.0
    // application.inject for Ember 2.1.0+
    var inject = registry.inject || registry.injection;
    inject.call(registry, 'controller', 'store', 'service:store');
    inject.call(registry, 'route', 'store', 'service:store');
    inject.call(registry, 'data-adapter', 'store', 'service:store');
  }
});
define("ember-data/-private/initializers/store", ["exports", "ember-data/-private/system/store", "ember-data/-private/serializers", "ember-data/-private/adapters"], function (exports, _emberDataPrivateSystemStore, _emberDataPrivateSerializers, _emberDataPrivateAdapters) {
  "use strict";

  exports["default"] = initializeStore;

  function has(applicationOrRegistry, fullName) {
    if (applicationOrRegistry.has) {
      // < 2.1.0
      return applicationOrRegistry.has(fullName);
    } else {
      // 2.1.0+
      return applicationOrRegistry.hasRegistration(fullName);
    }
  }

  /**
    Configures a registry for use with an Ember-Data
    store. Accepts an optional namespace argument.
  
    @method initializeStore
    @param {Ember.Registry} registry
  */
  function initializeStore(registry) {
    // registry.optionsForType for Ember < 2.1.0
    // application.registerOptionsForType for Ember 2.1.0+
    var registerOptionsForType = registry.registerOptionsForType || registry.optionsForType;
    registerOptionsForType.call(registry, 'serializer', { singleton: false });
    registerOptionsForType.call(registry, 'adapter', { singleton: false });

    registry.register('serializer:-default', _emberDataPrivateSerializers.JSONSerializer);
    registry.register('serializer:-rest', _emberDataPrivateSerializers.RESTSerializer);
    registry.register('adapter:-rest', _emberDataPrivateAdapters.RESTAdapter);

    registry.register('adapter:-json-api', _emberDataPrivateAdapters.JSONAPIAdapter);
    registry.register('serializer:-json-api', _emberDataPrivateSerializers.JSONAPISerializer);

    if (!has(registry, 'service:store')) {
      registry.register('service:store', _emberDataPrivateSystemStore["default"]);
    }
  }
});
define('ember-data/-private/initializers/transforms', ['exports', 'ember-data/-private/transforms'], function (exports, _emberDataPrivateTransforms) {
  'use strict';

  exports['default'] = initializeTransforms;

  /**
    Configures a registry for use with Ember-Data
    transforms.
  
    @method initializeTransforms
    @param {Ember.Registry} registry
  */
  function initializeTransforms(registry) {
    registry.register('transform:boolean', _emberDataPrivateTransforms.BooleanTransform);
    registry.register('transform:date', _emberDataPrivateTransforms.DateTransform);
    registry.register('transform:number', _emberDataPrivateTransforms.NumberTransform);
    registry.register('transform:string', _emberDataPrivateTransforms.StringTransform);
  }
});
define('ember-data/-private/instance-initializers/initialize-store-service', ['exports'], function (exports) {
  'use strict';

  exports['default'] = initializeStoreService;

  /**
   Configures a registry for use with an Ember-Data
   store.
  
   @method initializeStore
   @param {Ember.ApplicationInstance} applicationOrRegistry
   */
  function initializeStoreService(application) {
    var container = application.lookup ? application : application.container;
    // Eagerly generate the store so defaultStore is populated.
    container.lookup('service:store');
  }
});
define("ember-data/-private/serializers", ["exports", "ember-data/serializers/json-api", "ember-data/serializers/json", "ember-data/serializers/rest"], function (exports, _emberDataSerializersJsonApi, _emberDataSerializersJson, _emberDataSerializersRest) {
  /**
    @module ember-data
  */

  "use strict";

  exports.JSONAPISerializer = _emberDataSerializersJsonApi["default"];
  exports.JSONSerializer = _emberDataSerializersJson["default"];
  exports.RESTSerializer = _emberDataSerializersRest["default"];
});
define("ember-data/-private/system/clone-null", ["exports", "ember-data/-private/system/empty-object"], function (exports, _emberDataPrivateSystemEmptyObject) {
  "use strict";

  exports["default"] = cloneNull;

  function cloneNull(source) {
    var clone = new _emberDataPrivateSystemEmptyObject["default"]();
    for (var key in source) {
      clone[key] = source[key];
    }
    return clone;
  }
});
define('ember-data/-private/system/coerce-id', ['exports'], function (exports) {
  'use strict';

  exports['default'] = coerceId;

  // Used by the store to normalize IDs entering the store.  Despite the fact
  // that developers may provide IDs as numbers (e.g., `store.findRecord('person', 1)`),
  // it is important that internally we use strings, since IDs may be serialized
  // and lose type information.  For example, Ember's router may put a record's
  // ID into the URL, and if we later try to deserialize that URL and find the
  // corresponding record, we will not know if it is a string or a number.

  function coerceId(id) {
    return id == null || id === '' ? null : id + '';
  }
});
define('ember-data/-private/system/container-proxy', ['exports', 'ember-data/-private/debug'], function (exports, _emberDataPrivateDebug) {
  'use strict';

  exports['default'] = ContainerProxy;

  /*
    This is used internally to enable deprecation of container paths and provide
    a decent message to the user indicating how to fix the issue.
  
    @class ContainerProxy
    @namespace DS
    @private
  */
  function ContainerProxy(container) {
    this.container = container;
  }

  ContainerProxy.prototype.aliasedFactory = function (path, preLookup) {
    var _this = this;

    return {
      create: function create() {
        if (preLookup) {
          preLookup();
        }

        return _this.container.lookup(path);
      }
    };
  };

  ContainerProxy.prototype.registerAlias = function (source, dest, preLookup) {
    var factory = this.aliasedFactory(dest, preLookup);

    return this.container.register(source, factory);
  };

  ContainerProxy.prototype.registerDeprecation = function (deprecated, valid) {
    var preLookupCallback = function preLookupCallback() {
      (0, _emberDataPrivateDebug.deprecate)('You tried to look up \'' + deprecated + '\', but this has been deprecated in favor of \'' + valid + '\'.', false, {
        id: 'ds.store.deprecated-lookup',
        until: '2.0.0'
      });
    };

    return this.registerAlias(deprecated, valid, preLookupCallback);
  };

  ContainerProxy.prototype.registerDeprecations = function (proxyPairs) {
    var i, proxyPair, deprecated, valid;

    for (i = proxyPairs.length; i > 0; i--) {
      proxyPair = proxyPairs[i - 1];
      deprecated = proxyPair['deprecated'];
      valid = proxyPair['valid'];

      this.registerDeprecation(deprecated, valid);
    }
  };
});
define('ember-data/-private/system/debug/debug-adapter', ['exports', 'ember', 'ember-data/model'], function (exports, _ember, _emberDataModel) {
  /**
    @module ember-data
  */
  'use strict';

  var get = _ember['default'].get;
  var capitalize = _ember['default'].String.capitalize;
  var underscore = _ember['default'].String.underscore;
  var assert = _ember['default'].assert;

  /*
    Extend `Ember.DataAdapter` with ED specific code.
  
    @class DebugAdapter
    @namespace DS
    @extends Ember.DataAdapter
    @private
  */
  exports['default'] = _ember['default'].DataAdapter.extend({
    getFilters: function getFilters() {
      return [{ name: 'isNew', desc: 'New' }, { name: 'isModified', desc: 'Modified' }, { name: 'isClean', desc: 'Clean' }];
    },

    detect: function detect(typeClass) {
      return typeClass !== _emberDataModel['default'] && _emberDataModel['default'].detect(typeClass);
    },

    columnsForType: function columnsForType(typeClass) {
      var columns = [{
        name: 'id',
        desc: 'Id'
      }];
      var count = 0;
      var self = this;
      get(typeClass, 'attributes').forEach(function (meta, name) {
        if (count++ > self.attributeLimit) {
          return false;
        }
        var desc = capitalize(underscore(name).replace('_', ' '));
        columns.push({ name: name, desc: desc });
      });
      return columns;
    },

    getRecords: function getRecords(modelClass, modelName) {
      if (arguments.length < 2) {
        // Legacy Ember.js < 1.13 support
        var containerKey = modelClass._debugContainerKey;
        if (containerKey) {
          var match = containerKey.match(/model:(.*)/);
          if (match) {
            modelName = match[1];
          }
        }
      }
      assert("Cannot find model name. Please upgrade to Ember.js >= 1.13 for Ember Inspector support", !!modelName);
      return this.get('store').peekAll(modelName);
    },

    getRecordColumnValues: function getRecordColumnValues(record) {
      var _this = this;

      var count = 0;
      var columnValues = { id: get(record, 'id') };

      record.eachAttribute(function (key) {
        if (count++ > _this.attributeLimit) {
          return false;
        }
        var value = get(record, key);
        columnValues[key] = value;
      });
      return columnValues;
    },

    getRecordKeywords: function getRecordKeywords(record) {
      var keywords = [];
      var keys = _ember['default'].A(['id']);
      record.eachAttribute(function (key) {
        return keys.push(key);
      });
      keys.forEach(function (key) {
        return keywords.push(get(record, key));
      });
      return keywords;
    },

    getRecordFilterValues: function getRecordFilterValues(record) {
      return {
        isNew: record.get('isNew'),
        isModified: record.get('hasDirtyAttributes') && !record.get('isNew'),
        isClean: !record.get('hasDirtyAttributes')
      };
    },

    getRecordColor: function getRecordColor(record) {
      var color = 'black';
      if (record.get('isNew')) {
        color = 'green';
      } else if (record.get('hasDirtyAttributes')) {
        color = 'blue';
      }
      return color;
    },

    observeRecord: function observeRecord(record, recordUpdated) {
      var releaseMethods = _ember['default'].A();
      var keysToObserve = _ember['default'].A(['id', 'isNew', 'hasDirtyAttributes']);

      record.eachAttribute(function (key) {
        return keysToObserve.push(key);
      });
      var adapter = this;

      keysToObserve.forEach(function (key) {
        var handler = function handler() {
          recordUpdated(adapter.wrapRecord(record));
        };
        _ember['default'].addObserver(record, key, handler);
        releaseMethods.push(function () {
          _ember['default'].removeObserver(record, key, handler);
        });
      });

      var release = function release() {
        releaseMethods.forEach(function (fn) {
          return fn();
        });
      };

      return release;
    }
  });
});
define('ember-data/-private/system/debug/debug-info', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({

    /**
      Provides info about the model for debugging purposes
      by grouping the properties into more semantic groups.
       Meant to be used by debugging tools such as the Chrome Ember Extension.
       - Groups all attributes in "Attributes" group.
      - Groups all belongsTo relationships in "Belongs To" group.
      - Groups all hasMany relationships in "Has Many" group.
      - Groups all flags in "Flags" group.
      - Flags relationship CPs as expensive properties.
       @method _debugInfo
      @for DS.Model
      @private
    */
    _debugInfo: function _debugInfo() {
      var attributes = ['id'];
      var relationships = { belongsTo: [], hasMany: [] };
      var expensiveProperties = [];

      this.eachAttribute(function (name, meta) {
        return attributes.push(name);
      });

      this.eachRelationship(function (name, relationship) {
        relationships[relationship.kind].push(name);
        expensiveProperties.push(name);
      });

      var groups = [{
        name: 'Attributes',
        properties: attributes,
        expand: true
      }, {
        name: 'Belongs To',
        properties: relationships.belongsTo,
        expand: true
      }, {
        name: 'Has Many',
        properties: relationships.hasMany,
        expand: true
      }, {
        name: 'Flags',
        properties: ['isLoaded', 'hasDirtyAttributes', 'isSaving', 'isDeleted', 'isError', 'isNew', 'isValid']
      }];

      return {
        propertyInfo: {
          // include all other mixins / properties (not just the grouped ones)
          includeOtherProperties: true,
          groups: groups,
          // don't pre-calculate unless cached
          expensiveProperties: expensiveProperties
        }
      };
    }
  });
});
define("ember-data/-private/system/debug", ["exports", "ember-data/-private/system/debug/debug-adapter"], function (exports, _emberDataPrivateSystemDebugDebugAdapter) {
  /**
    @module ember-data
  */

  "use strict";

  exports["default"] = _emberDataPrivateSystemDebugDebugAdapter["default"];
});
define("ember-data/-private/system/empty-object", ["exports"], function (exports) {
  "use strict";

  exports["default"] = EmptyObject;

  // This exists because `Object.create(null)` is absurdly slow compared
  // to `new EmptyObject()`. In either case, you want a null prototype
  // when you're treating the object instances as arbitrary dictionaries
  // and don't want your keys colliding with build-in methods on the
  // default object prototype.
  var proto = Object.create(null, {
    // without this, we will always still end up with (new
    // EmptyObject()).constructor === Object
    constructor: {
      value: undefined,
      enumerable: false,
      writable: true
    }
  });
  function EmptyObject() {}

  EmptyObject.prototype = proto;
});
define('ember-data/-private/system/is-array-like', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = isArrayLike;

  /*
    We're using this to detect arrays and "array-like" objects.
  
    This is a copy of the `isArray` method found in `ember-runtime/utils` as we're
    currently unable to import non-exposed modules.
  
    This method was previously exposed as `Ember.isArray` but since
    https://github.com/emberjs/ember.js/pull/11463 `Ember.isArray` is an alias of
    `Array.isArray` hence removing the "array-like" part.
   */
  function isArrayLike(obj) {
    if (!obj || obj.setInterval) {
      return false;
    }
    if (Array.isArray(obj)) {
      return true;
    }
    if (_ember['default'].Array.detect(obj)) {
      return true;
    }

    var type = _ember['default'].typeOf(obj);
    if ('array' === type) {
      return true;
    }
    if (obj.length !== undefined && 'object' === type) {
      return true;
    }
    return false;
  }
});
define("ember-data/-private/system/many-array", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/promise-proxies", "ember-data/-private/system/store/common"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemPromiseProxies, _emberDataPrivateSystemStoreCommon) {
  /**
    @module ember-data
  */
  "use strict";

  var get = _ember["default"].get;
  var set = _ember["default"].set;

  /**
    A `ManyArray` is a `MutableArray` that represents the contents of a has-many
    relationship.
  
    The `ManyArray` is instantiated lazily the first time the relationship is
    requested.
  
    ### Inverses
  
    Often, the relationships in Ember Data applications will have
    an inverse. For example, imagine the following models are
    defined:
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      comments: DS.hasMany('comment')
    });
    ```
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      post: DS.belongsTo('post')
    });
    ```
  
    If you created a new instance of `App.Post` and added
    a `App.Comment` record to its `comments` has-many
    relationship, you would expect the comment's `post`
    property to be set to the post that contained
    the has-many.
  
    We call the record to which a relationship belongs the
    relationship's _owner_.
  
    @class ManyArray
    @namespace DS
    @extends Ember.Object
    @uses Ember.MutableArray, Ember.Evented
  */
  exports["default"] = _ember["default"].Object.extend(_ember["default"].MutableArray, _ember["default"].Evented, {
    init: function init() {
      this._super.apply(this, arguments);
      this.currentState = _ember["default"].A([]);
    },

    record: null,

    canonicalState: null,
    currentState: null,

    length: 0,

    objectAt: function objectAt(index) {
      //Ember observers such as 'firstObject', 'lastObject' might do out of bounds accesses
      if (!this.currentState[index]) {
        return undefined;
      }
      return this.currentState[index].getRecord();
    },

    flushCanonical: function flushCanonical() {
      //TODO make this smarter, currently its plenty stupid
      var toSet = this.canonicalState.filter(function (internalModel) {
        return !internalModel.isDeleted();
      });

      //a hack for not removing new records
      //TODO remove once we have proper diffing
      var newRecords = this.currentState.filter(
      // only add new records which are not yet in the canonical state of this
      // relationship (a new record can be in the canonical state if it has
      function (internalModel) {
        return internalModel.isNew() && toSet.indexOf(internalModel) === -1;
      });
      toSet = toSet.concat(newRecords);
      var oldLength = this.length;
      this.arrayContentWillChange(0, this.length, toSet.length);
      // It’s possible the parent side of the relationship may have been unloaded by this point
      if ((0, _emberDataPrivateSystemStoreCommon._objectIsAlive)(this)) {
        this.set('length', toSet.length);
      }
      this.currentState = toSet;
      this.arrayContentDidChange(0, oldLength, this.length);
      //TODO Figure out to notify only on additions and maybe only if unloaded
      this.relationship.notifyHasManyChanged();
      this.record.updateRecordArrays();
    },
    /**
      `true` if the relationship is polymorphic, `false` otherwise.
       @property {Boolean} isPolymorphic
      @private
    */
    isPolymorphic: false,

    /**
      The loading state of this array
       @property {Boolean} isLoaded
    */
    isLoaded: false,

    /**
      The relationship which manages this array.
       @property {ManyRelationship} relationship
      @private
    */
    relationship: null,

    /**
      Metadata associated with the request for async hasMany relationships.
       Example
       Given that the server returns the following JSON payload when fetching a
      hasMany relationship:
       ```js
      {
        "comments": [{
          "id": 1,
          "comment": "This is the first comment",
        }, {
          // ...
        }],
         "meta": {
          "page": 1,
          "total": 5
        }
      }
      ```
       You can then access the metadata via the `meta` property:
       ```js
      post.get('comments').then(function(comments) {
        var meta = comments.get('meta');
         // meta.page => 1
        // meta.total => 5
      });
      ```
       @property {Object} meta
      @public
    */
    meta: null,

    internalReplace: function internalReplace(idx, amt, objects) {
      if (!objects) {
        objects = [];
      }
      this.arrayContentWillChange(idx, amt, objects.length);
      this.currentState.splice.apply(this.currentState, [idx, amt].concat(objects));
      this.set('length', this.currentState.length);
      this.arrayContentDidChange(idx, amt, objects.length);
      if (objects) {
        //TODO(Igor) probably needed only for unloaded records
        this.relationship.notifyHasManyChanged();
      }
      this.record.updateRecordArrays();
    },

    //TODO(Igor) optimize
    internalRemoveRecords: function internalRemoveRecords(records) {
      var index;
      for (var i = 0; i < records.length; i++) {
        index = this.currentState.indexOf(records[i]);
        this.internalReplace(index, 1);
      }
    },

    //TODO(Igor) optimize
    internalAddRecords: function internalAddRecords(records, idx) {
      if (idx === undefined) {
        idx = this.currentState.length;
      }
      this.internalReplace(idx, 0, records);
    },

    replace: function replace(idx, amt, objects) {
      var records;
      if (amt > 0) {
        records = this.currentState.slice(idx, idx + amt);
        this.get('relationship').removeRecords(records);
      }
      if (objects) {
        this.get('relationship').addRecords(objects.map(function (obj) {
          return obj._internalModel;
        }), idx);
      }
    },
    /**
      Used for async `hasMany` arrays
      to keep track of when they will resolve.
       @property {Ember.RSVP.Promise} promise
      @private
    */
    promise: null,

    /**
      @method loadingRecordsCount
      @param {Number} count
      @private
    */
    loadingRecordsCount: function loadingRecordsCount(count) {
      this.loadingRecordsCount = count;
    },

    /**
      @method loadedRecord
      @private
    */
    loadedRecord: function loadedRecord() {
      this.loadingRecordsCount--;
      if (this.loadingRecordsCount === 0) {
        set(this, 'isLoaded', true);
        this.trigger('didLoad');
      }
    },

    /**
      @method reload
      @public
    */
    reload: function reload() {
      return this.relationship.reload();
    },

    /**
      Saves all of the records in the `ManyArray`.
       Example
       ```javascript
      store.findRecord('inbox', 1).then(function(inbox) {
        inbox.get('messages').then(function(messages) {
          messages.forEach(function(message) {
            message.set('isRead', true);
          });
          messages.save()
        });
      });
      ```
       @method save
      @return {DS.PromiseArray} promise
    */
    save: function save() {
      var manyArray = this;
      var promiseLabel = "DS: ManyArray#save " + get(this, 'type');
      var promise = _ember["default"].RSVP.all(this.invoke("save"), promiseLabel).then(function (array) {
        return manyArray;
      }, null, "DS: ManyArray#save return ManyArray");

      return _emberDataPrivateSystemPromiseProxies.PromiseArray.create({ promise: promise });
    },

    /**
      Create a child record within the owner
       @method createRecord
      @private
      @param {Object} hash
      @return {DS.Model} record
    */
    createRecord: function createRecord(hash) {
      var store = get(this, 'store');
      var type = get(this, 'type');
      var record;

      (0, _emberDataPrivateDebug.assert)("You cannot add '" + type.modelName + "' records to this polymorphic relationship.", !get(this, 'isPolymorphic'));
      record = store.createRecord(type.modelName, hash);
      this.pushObject(record);

      return record;
    }
  });
});
// been 'acknowleged' to be in the relationship via a store.push)
define("ember-data/-private/system/model/attr", ["exports", "ember", "ember-data/-private/debug"], function (exports, _ember, _emberDataPrivateDebug) {
  "use strict";

  var get = _ember["default"].get;
  var Map = _ember["default"].Map;

  /**
    @module ember-data
  */

  /**
    @class Model
    @namespace DS
  */

  var AttrClassMethodsMixin = _ember["default"].Mixin.create({
    /**
      A map whose keys are the attributes of the model (properties
      described by DS.attr) and whose values are the meta object for the
      property.
       Example
       ```app/models/person.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        firstName: attr('string'),
        lastName: attr('string'),
        birthday: attr('date')
      });
      ```
       ```javascript
      import Ember from 'ember';
      import Person from 'app/models/person';
       var attributes = Ember.get(Person, 'attributes')
       attributes.forEach(function(meta, name) {
        console.log(name, meta);
      });
       // prints:
      // firstName {type: "string", isAttribute: true, options: Object, parentType: function, name: "firstName"}
      // lastName {type: "string", isAttribute: true, options: Object, parentType: function, name: "lastName"}
      // birthday {type: "date", isAttribute: true, options: Object, parentType: function, name: "birthday"}
      ```
       @property attributes
      @static
      @type {Ember.Map}
      @readOnly
    */
    attributes: _ember["default"].computed(function () {
      var _this = this;

      var map = Map.create();

      this.eachComputedProperty(function (name, meta) {
        if (meta.isAttribute) {
          (0, _emberDataPrivateDebug.assert)("You may not set `id` as an attribute on your model. Please remove any lines that look like: `id: DS.attr('<type>')` from " + _this.toString(), name !== 'id');

          meta.name = name;
          map.set(name, meta);
        }
      });

      return map;
    }).readOnly(),

    /**
      A map whose keys are the attributes of the model (properties
      described by DS.attr) and whose values are type of transformation
      applied to each attribute. This map does not include any
      attributes that do not have an transformation type.
       Example
       ```app/models/person.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        firstName: attr(),
        lastName: attr('string'),
        birthday: attr('date')
      });
      ```
       ```javascript
      import Ember from 'ember';
      import Person from 'app/models/person';
       var transformedAttributes = Ember.get(Person, 'transformedAttributes')
       transformedAttributes.forEach(function(field, type) {
        console.log(field, type);
      });
       // prints:
      // lastName string
      // birthday date
      ```
       @property transformedAttributes
      @static
      @type {Ember.Map}
      @readOnly
    */
    transformedAttributes: _ember["default"].computed(function () {
      var map = Map.create();

      this.eachAttribute(function (key, meta) {
        if (meta.type) {
          map.set(key, meta.type);
        }
      });

      return map;
    }).readOnly(),

    /**
      Iterates through the attributes of the model, calling the passed function on each
      attribute.
       The callback method you provide should have the following signature (all
      parameters are optional):
       ```javascript
      function(name, meta);
      ```
       - `name` the name of the current property in the iteration
      - `meta` the meta object for the attribute property in the iteration
       Note that in addition to a callback, you can also pass an optional target
      object that will be set as `this` on the context.
       Example
       ```javascript
      import DS from 'ember-data';
       var Person = DS.Model.extend({
        firstName: attr('string'),
        lastName: attr('string'),
        birthday: attr('date')
      });
       Person.eachAttribute(function(name, meta) {
        console.log(name, meta);
      });
       // prints:
      // firstName {type: "string", isAttribute: true, options: Object, parentType: function, name: "firstName"}
      // lastName {type: "string", isAttribute: true, options: Object, parentType: function, name: "lastName"}
      // birthday {type: "date", isAttribute: true, options: Object, parentType: function, name: "birthday"}
     ```
       @method eachAttribute
      @param {Function} callback The callback to execute
      @param {Object} [binding] the value to which the callback's `this` should be bound
      @static
    */
    eachAttribute: function eachAttribute(callback, binding) {
      get(this, 'attributes').forEach(function (meta, name) {
        callback.call(binding, name, meta);
      });
    },

    /**
      Iterates through the transformedAttributes of the model, calling
      the passed function on each attribute. Note the callback will not be
      called for any attributes that do not have an transformation type.
       The callback method you provide should have the following signature (all
      parameters are optional):
       ```javascript
      function(name, type);
      ```
       - `name` the name of the current property in the iteration
      - `type` a string containing the name of the type of transformed
        applied to the attribute
       Note that in addition to a callback, you can also pass an optional target
      object that will be set as `this` on the context.
       Example
       ```javascript
      import DS from 'ember-data';
       var Person = DS.Model.extend({
        firstName: attr(),
        lastName: attr('string'),
        birthday: attr('date')
      });
       Person.eachTransformedAttribute(function(name, type) {
        console.log(name, type);
      });
       // prints:
      // lastName string
      // birthday date
     ```
       @method eachTransformedAttribute
      @param {Function} callback The callback to execute
      @param {Object} [binding] the value to which the callback's `this` should be bound
      @static
    */
    eachTransformedAttribute: function eachTransformedAttribute(callback, binding) {
      get(this, 'transformedAttributes').forEach(function (type, name) {
        callback.call(binding, name, type);
      });
    }
  });

  exports.AttrClassMethodsMixin = AttrClassMethodsMixin;

  var AttrInstanceMethodsMixin = _ember["default"].Mixin.create({
    eachAttribute: function eachAttribute(callback, binding) {
      this.constructor.eachAttribute(callback, binding);
    }
  });
  exports.AttrInstanceMethodsMixin = AttrInstanceMethodsMixin;
});
define('ember-data/-private/system/model/errors', ['exports', 'ember', 'ember-data/-private/debug'], function (exports, _ember, _emberDataPrivateDebug) {
  'use strict';

  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var isEmpty = _ember['default'].isEmpty;
  var makeArray = _ember['default'].makeArray;

  var MapWithDefault = _ember['default'].MapWithDefault;

  /**
  @module ember-data
  */

  /**
    Holds validation errors for a given record, organized by attribute names.
  
    Every `DS.Model` has an `errors` property that is an instance of
    `DS.Errors`. This can be used to display validation error
    messages returned from the server when a `record.save()` rejects.
  
    For Example, if you had a `User` model that looked like this:
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      username: attr('string'),
      email: attr('string')
    });
    ```
    And you attempted to save a record that did not validate on the backend:
  
    ```javascript
    var user = store.createRecord('user', {
      username: 'tomster',
      email: 'invalidEmail'
    });
    user.save();
    ```
  
    Your backend would be expected to return an error response that described
    the problem, so that error messages can be generated on the app.
  
    API responses will be translated into instances of `DS.Errors` differently,
    depending on the specific combination of adapter and serializer used. You
    may want to check the documentation or the source code of the libraries
    that you are using, to know how they expect errors to be communicated.
  
    Errors can be displayed to the user by accessing their property name
    to get an array of all the error objects for that property. Each
    error object is a JavaScript object with two keys:
  
    - `message` A string containing the error message from the backend
    - `attribute` The name of the property associated with this error message
  
    ```handlebars
    <label>Username: {{input value=username}} </label>
    {{#each model.errors.username as |error|}}
      <div class="error">
        {{error.message}}
      </div>
    {{/each}}
  
    <label>Email: {{input value=email}} </label>
    {{#each model.errors.email as |error|}}
      <div class="error">
        {{error.message}}
      </div>
    {{/each}}
    ```
  
    You can also access the special `messages` property on the error
    object to get an array of all the error strings.
  
    ```handlebars
    {{#each model.errors.messages as |message|}}
      <div class="error">
        {{message}}
      </div>
    {{/each}}
    ```
  
    @class Errors
    @namespace DS
    @extends Ember.Object
    @uses Ember.Enumerable
    @uses Ember.Evented
   */
  exports['default'] = _ember['default'].ArrayProxy.extend(_ember['default'].Evented, {
    /**
      Register with target handler
       @method registerHandlers
      @param {Object} target
      @param {Function} becameInvalid
      @param {Function} becameValid
      @deprecated
    */
    registerHandlers: function registerHandlers(target, becameInvalid, becameValid) {
      (0, _emberDataPrivateDebug.deprecate)('Record errors will no longer be evented.', false, {
        id: 'ds.errors.registerHandlers',
        until: '3.0.0'
      });

      this._registerHandlers(target, becameInvalid, becameValid);
    },

    /**
      Register with target handler
       @method _registerHandlers
      @private
    */
    _registerHandlers: function _registerHandlers(target, becameInvalid, becameValid) {
      this.on('becameInvalid', target, becameInvalid);
      this.on('becameValid', target, becameValid);
    },

    /**
      @property errorsByAttributeName
      @type {Ember.MapWithDefault}
      @private
    */
    errorsByAttributeName: _ember['default'].computed(function () {
      return MapWithDefault.create({
        defaultValue: function defaultValue() {
          return _ember['default'].A();
        }
      });
    }),

    /**
      Returns errors for a given attribute
       ```javascript
      var user = store.createRecord('user', {
        username: 'tomster',
        email: 'invalidEmail'
      });
      user.save().catch(function(){
        user.get('errors').errorsFor('email'); // returns:
        // [{attribute: "email", message: "Doesn't look like a valid email."}]
      });
      ```
       @method errorsFor
      @param {String} attribute
      @return {Array}
    */
    errorsFor: function errorsFor(attribute) {
      return get(this, 'errorsByAttributeName').get(attribute);
    },

    /**
      An array containing all of the error messages for this
      record. This is useful for displaying all errors to the user.
       ```handlebars
      {{#each model.errors.messages as |message|}}
        <div class="error">
          {{message}}
        </div>
      {{/each}}
      ```
       @property messages
      @type {Array}
    */
    messages: _ember['default'].computed.mapBy('content', 'message'),

    /**
      @property content
      @type {Array}
      @private
    */
    content: _ember['default'].computed(function () {
      return _ember['default'].A();
    }),

    /**
      @method unknownProperty
      @private
    */
    unknownProperty: function unknownProperty(attribute) {
      var errors = this.errorsFor(attribute);
      if (isEmpty(errors)) {
        return null;
      }
      return errors;
    },

    /**
      Total number of errors.
       @property length
      @type {Number}
      @readOnly
    */

    /**
      @property isEmpty
      @type {Boolean}
      @readOnly
    */
    isEmpty: _ember['default'].computed.not('length').readOnly(),

    /**
      Adds error messages to a given attribute and sends
      `becameInvalid` event to the record.
       Example:
       ```javascript
      if (!user.get('username') {
        user.get('errors').add('username', 'This field is required');
      }
      ```
       @method add
      @param {String} attribute
      @param {(Array|String)} messages
      @deprecated
    */
    add: function add(attribute, messages) {
      (0, _emberDataPrivateDebug.warn)('Interacting with a record errors object will no longer change the record state.', false, {
        id: 'ds.errors.add'
      });

      var wasEmpty = get(this, 'isEmpty');

      this._add(attribute, messages);

      if (wasEmpty && !get(this, 'isEmpty')) {
        this.trigger('becameInvalid');
      }
    },

    /**
      Adds error messages to a given attribute without sending event.
       @method _add
      @private
    */
    _add: function _add(attribute, messages) {
      messages = this._findOrCreateMessages(attribute, messages);
      this.addObjects(messages);
      get(this, 'errorsByAttributeName').get(attribute).addObjects(messages);

      this.notifyPropertyChange(attribute);
    },

    /**
      @method _findOrCreateMessages
      @private
    */
    _findOrCreateMessages: function _findOrCreateMessages(attribute, messages) {
      var errors = this.errorsFor(attribute);
      var messagesArray = makeArray(messages);
      var _messages = new Array(messagesArray.length);

      for (var i = 0; i < messagesArray.length; i++) {
        var message = messagesArray[i];
        var err = errors.findBy('message', message);
        if (err) {
          _messages[i] = err;
        } else {
          _messages[i] = {
            attribute: attribute,
            message: message
          };
        }
      }

      return _messages;
    },

    /**
      Removes all error messages from the given attribute and sends
      `becameValid` event to the record if there no more errors left.
       Example:
       ```app/models/user.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        email: DS.attr('string'),
        twoFactorAuth: DS.attr('boolean'),
        phone: DS.attr('string')
      });
      ```
       ```app/routes/user/edit.js
      import Ember from 'ember';
       export default Ember.Route.extend({
        actions: {
          save: function(user) {
             if (!user.get('twoFactorAuth')) {
               user.get('errors').remove('phone');
             }
             user.save();
           }
        }
      });
      ```
       @method remove
      @param {String} attribute
      @deprecated
    */
    remove: function remove(attribute) {
      (0, _emberDataPrivateDebug.warn)('Interacting with a record errors object will no longer change the record state.', false, {
        id: 'ds.errors.remove'
      });

      if (get(this, 'isEmpty')) {
        return;
      }

      this._remove(attribute);

      if (get(this, 'isEmpty')) {
        this.trigger('becameValid');
      }
    },

    /**
      Removes all error messages from the given attribute without sending event.
       @method _remove
      @private
    */
    _remove: function _remove(attribute) {
      if (get(this, 'isEmpty')) {
        return;
      }

      var content = this.rejectBy('attribute', attribute);
      set(this, 'content', content);
      get(this, 'errorsByAttributeName')['delete'](attribute);

      this.notifyPropertyChange(attribute);
    },

    /**
      Removes all error messages and sends `becameValid` event
      to the record.
       Example:
       ```app/routes/user/edit.js
      import Ember from 'ember';
       export default Ember.Route.extend({
        actions: {
          retrySave: function(user) {
             user.get('errors').clear();
             user.save();
           }
        }
      });
      ```
       @method clear
      @deprecated
    */
    clear: function clear() {
      (0, _emberDataPrivateDebug.warn)('Interacting with a record errors object will no longer change the record state.', false, {
        id: 'ds.errors.clear'
      });

      if (get(this, 'isEmpty')) {
        return;
      }

      this._clear();
      this.trigger('becameValid');
    },

    /**
      Removes all error messages.
      to the record.
       @method _clear
      @private
    */
    _clear: function _clear() {
      if (get(this, 'isEmpty')) {
        return;
      }

      var errorsByAttributeName = get(this, 'errorsByAttributeName');
      var attributes = _ember['default'].A();

      errorsByAttributeName.forEach(function (_, attribute) {
        attributes.push(attribute);
      });

      errorsByAttributeName.clear();
      attributes.forEach(function (attribute) {
        this.notifyPropertyChange(attribute);
      }, this);

      _ember['default'].ArrayProxy.prototype.clear.call(this);
    },

    /**
      Checks if there is error messages for the given attribute.
       ```app/routes/user/edit.js
      import Ember from 'ember';
       export default Ember.Route.extend({
        actions: {
          save: function(user) {
             if (user.get('errors').has('email')) {
               return alert('Please update your email before attempting to save.');
             }
             user.save();
           }
        }
      });
      ```
       @method has
      @param {String} attribute
      @return {Boolean} true if there some errors on given attribute
    */
    has: function has(attribute) {
      return !isEmpty(this.errorsFor(attribute));
    }
  });
});
define("ember-data/-private/system/model/internal-model", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/model/states", "ember-data/-private/system/relationships/state/create", "ember-data/-private/system/snapshot", "ember-data/-private/system/empty-object", "ember-data/-private/features", "ember-data/-private/utils", "ember-data/-private/system/references"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemModelStates, _emberDataPrivateSystemRelationshipsStateCreate, _emberDataPrivateSystemSnapshot, _emberDataPrivateSystemEmptyObject, _emberDataPrivateFeatures, _emberDataPrivateUtils, _emberDataPrivateSystemReferences) {
  "use strict";

  var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  exports["default"] = InternalModel;

  var Promise = _ember["default"].RSVP.Promise;
  var get = _ember["default"].get;
  var set = _ember["default"].set;
  var copy = _ember["default"].copy;
  var assign = _ember["default"].assign || _ember["default"].merge;

  var _extractPivotNameCache = new _emberDataPrivateSystemEmptyObject["default"]();
  var _splitOnDotCache = new _emberDataPrivateSystemEmptyObject["default"]();

  function splitOnDot(name) {
    return _splitOnDotCache[name] || (_splitOnDotCache[name] = name.split('.'));
  }

  function extractPivotName(name) {
    return _extractPivotNameCache[name] || (_extractPivotNameCache[name] = splitOnDot(name)[0]);
  }

  function retrieveFromCurrentState(key) {
    return function () {
      return get(this.currentState, key);
    };
  }

  var guid = 0;
  /*
    `InternalModel` is the Model class that we use internally inside Ember Data to represent models.
    Internal ED methods should only deal with `InternalModel` objects. It is a fast, plain Javascript class.
  
    We expose `DS.Model` to application code, by materializing a `DS.Model` from `InternalModel` lazily, as
    a performance optimization.
  
    `InternalModel` should never be exposed to application code. At the boundaries of the system, in places
    like `find`, `push`, etc. we convert between Models and InternalModels.
  
    We need to make sure that the properties from `InternalModel` are correctly exposed/proxied on `Model`
    if they are needed.
  
    @private
    @class InternalModel
  */
  function InternalModel(type, id, store, _, data) {
    this.type = type;
    this.id = id;
    this.store = store;
    this._data = data || new _emberDataPrivateSystemEmptyObject["default"]();
    this.modelName = type.modelName;
    this.dataHasInitialized = false;
    //Look into making this lazy
    this._deferredTriggers = [];
    this._attributes = new _emberDataPrivateSystemEmptyObject["default"]();
    this._inFlightAttributes = new _emberDataPrivateSystemEmptyObject["default"]();
    this._relationships = new _emberDataPrivateSystemRelationshipsStateCreate["default"](this);
    this._recordArrays = undefined;
    this.currentState = _emberDataPrivateSystemModelStates["default"].empty;
    this.recordReference = new _emberDataPrivateSystemReferences.RecordReference(store, this);
    this.references = {};
    this.isReloading = false;
    this.isError = false;
    this.error = null;
    this.__ember_meta__ = null;
    this[_ember["default"].GUID_KEY] = guid++ + 'internal-model';
    /*
      implicit relationships are relationship which have not been declared but the inverse side exists on
      another record somewhere
      For example if there was
       ```app/models/comment.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        name: DS.attr()
      })
      ```
       but there is also
       ```app/models/post.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        name: DS.attr(),
        comments: DS.hasMany('comment')
      })
      ```
       would have a implicit post relationship in order to be do things like remove ourselves from the post
      when we are deleted
    */
    this._implicitRelationships = new _emberDataPrivateSystemEmptyObject["default"]();
  }

  InternalModel.prototype = {
    isEmpty: retrieveFromCurrentState('isEmpty'),
    isLoading: retrieveFromCurrentState('isLoading'),
    isLoaded: retrieveFromCurrentState('isLoaded'),
    hasDirtyAttributes: retrieveFromCurrentState('hasDirtyAttributes'),
    isSaving: retrieveFromCurrentState('isSaving'),
    isDeleted: retrieveFromCurrentState('isDeleted'),
    isNew: retrieveFromCurrentState('isNew'),
    isValid: retrieveFromCurrentState('isValid'),
    dirtyType: retrieveFromCurrentState('dirtyType'),

    constructor: InternalModel,
    materializeRecord: function materializeRecord() {
      (0, _emberDataPrivateDebug.assert)("Materialized " + this.modelName + " record with id:" + this.id + "more than once", this.record === null || this.record === undefined);

      // lookupFactory should really return an object that creates
      // instances with the injections applied
      var createOptions = {
        store: this.store,
        _internalModel: this,
        id: this.id,
        currentState: get(this, 'currentState'),
        isError: this.isError,
        adapterError: this.error
      };

      if (_ember["default"].setOwner) {
        // ensure that `Ember.getOwner(this)` works inside a model instance
        _ember["default"].setOwner(createOptions, (0, _emberDataPrivateUtils.getOwner)(this.store));
      } else {
        createOptions.container = this.store.container;
      }

      this.record = this.type._create(createOptions);

      this._triggerDeferredTriggers();
    },

    recordObjectWillDestroy: function recordObjectWillDestroy() {
      this.record = null;
    },

    deleteRecord: function deleteRecord() {
      this.send('deleteRecord');
    },

    save: function save(options) {
      var promiseLabel = "DS: Model#save " + this;
      var resolver = _ember["default"].RSVP.defer(promiseLabel);

      this.store.scheduleSave(this, resolver, options);
      return resolver.promise;
    },

    startedReloading: function startedReloading() {
      this.isReloading = true;
      if (this.record) {
        set(this.record, 'isReloading', true);
      }
    },

    finishedReloading: function finishedReloading() {
      this.isReloading = false;
      if (this.record) {
        set(this.record, 'isReloading', false);
      }
    },

    reload: function reload() {
      this.startedReloading();
      var record = this;
      var promiseLabel = "DS: Model#reload of " + this;
      return new Promise(function (resolve) {
        record.send('reloadRecord', resolve);
      }, promiseLabel).then(function () {
        record.didCleanError();
        return record;
      }, function (error) {
        record.didError(error);
        throw error;
      }, "DS: Model#reload complete, update flags")["finally"](function () {
        record.finishedReloading();
        record.updateRecordArrays();
      });
    },

    getRecord: function getRecord() {
      if (!this.record) {
        this.materializeRecord();
      }
      return this.record;
    },

    unloadRecord: function unloadRecord() {
      this.send('unloadRecord');
    },

    eachRelationship: function eachRelationship(callback, binding) {
      return this.type.eachRelationship(callback, binding);
    },

    eachAttribute: function eachAttribute(callback, binding) {
      return this.type.eachAttribute(callback, binding);
    },

    inverseFor: function inverseFor(key) {
      return this.type.inverseFor(key);
    },

    setupData: function setupData(data) {
      var changedKeys = this._changedKeys(data.attributes);
      assign(this._data, data.attributes);
      this.pushedData();
      if (this.record) {
        this.record._notifyProperties(changedKeys);
      }
      this.didInitalizeData();
    },

    becameReady: function becameReady() {
      _ember["default"].run.schedule('actions', this.store.recordArrayManager, this.store.recordArrayManager.recordWasLoaded, this);
    },

    didInitalizeData: function didInitalizeData() {
      if (!this.dataHasInitialized) {
        this.becameReady();
        this.dataHasInitialized = true;
      }
    },

    destroy: function destroy() {
      if (this.record) {
        return this.record.destroy();
      }
    },

    /*
      @method createSnapshot
      @private
    */
    createSnapshot: function createSnapshot(options) {
      return new _emberDataPrivateSystemSnapshot["default"](this, options);
    },

    /*
      @method loadingData
      @private
      @param {Promise} promise
    */
    loadingData: function loadingData(promise) {
      this.send('loadingData', promise);
    },

    /*
      @method loadedData
      @private
    */
    loadedData: function loadedData() {
      this.send('loadedData');
      this.didInitalizeData();
    },

    /*
      @method notFound
      @private
    */
    notFound: function notFound() {
      this.send('notFound');
    },

    /*
      @method pushedData
      @private
    */
    pushedData: function pushedData() {
      this.send('pushedData');
    },

    flushChangedAttributes: function flushChangedAttributes() {
      this._inFlightAttributes = this._attributes;
      this._attributes = new _emberDataPrivateSystemEmptyObject["default"]();
    },

    hasChangedAttributes: function hasChangedAttributes() {
      return Object.keys(this._attributes).length > 0;
    },

    /*
      Checks if the attributes which are considered as changed are still
      different to the state which is acknowledged by the server.
       This method is needed when data for the internal model is pushed and the
      pushed data might acknowledge dirty attributes as confirmed.
       @method updateChangedAttributes
      @private
     */
    updateChangedAttributes: function updateChangedAttributes() {
      var changedAttributes = this.changedAttributes();
      var changedAttributeNames = Object.keys(changedAttributes);

      for (var i = 0, _length = changedAttributeNames.length; i < _length; i++) {
        var attribute = changedAttributeNames[i];

        var _changedAttributes$attribute = _slicedToArray(changedAttributes[attribute], 2);

        var oldData = _changedAttributes$attribute[0];
        var newData = _changedAttributes$attribute[1];

        if (oldData === newData) {
          delete this._attributes[attribute];
        }
      }
    },

    /*
      Returns an object, whose keys are changed properties, and value is an
      [oldProp, newProp] array.
       @method changedAttributes
      @private
    */
    changedAttributes: function changedAttributes() {
      var oldData = this._data;
      var currentData = this._attributes;
      var inFlightData = this._inFlightAttributes;
      var newData = assign(copy(inFlightData), currentData);
      var diffData = new _emberDataPrivateSystemEmptyObject["default"]();

      var newDataKeys = Object.keys(newData);

      for (var i = 0, _length2 = newDataKeys.length; i < _length2; i++) {
        var key = newDataKeys[i];
        diffData[key] = [oldData[key], newData[key]];
      }

      return diffData;
    },

    /*
      @method adapterWillCommit
      @private
    */
    adapterWillCommit: function adapterWillCommit() {
      this.send('willCommit');
    },

    /*
      @method adapterDidDirty
      @private
    */
    adapterDidDirty: function adapterDidDirty() {
      this.send('becomeDirty');
      this.updateRecordArraysLater();
    },

    /*
      @method send
      @private
      @param {String} name
      @param {Object} context
    */
    send: function send(name, context) {
      var currentState = get(this, 'currentState');

      if (!currentState[name]) {
        this._unhandledEvent(currentState, name, context);
      }

      return currentState[name](this, context);
    },

    notifyHasManyAdded: function notifyHasManyAdded(key, record, idx) {
      if (this.record) {
        this.record.notifyHasManyAdded(key, record, idx);
      }
    },

    notifyHasManyRemoved: function notifyHasManyRemoved(key, record, idx) {
      if (this.record) {
        this.record.notifyHasManyRemoved(key, record, idx);
      }
    },

    notifyBelongsToChanged: function notifyBelongsToChanged(key, record) {
      if (this.record) {
        this.record.notifyBelongsToChanged(key, record);
      }
    },

    notifyPropertyChange: function notifyPropertyChange(key) {
      if (this.record) {
        this.record.notifyPropertyChange(key);
      }
    },

    rollbackAttributes: function rollbackAttributes() {
      var dirtyKeys = Object.keys(this._attributes);

      this._attributes = new _emberDataPrivateSystemEmptyObject["default"]();

      if (get(this, 'isError')) {
        this._inFlightAttributes = new _emberDataPrivateSystemEmptyObject["default"]();
        this.didCleanError();
      }

      //Eventually rollback will always work for relationships
      //For now we support it only out of deleted state, because we
      //have an explicit way of knowing when the server acked the relationship change
      if (this.isDeleted()) {
        //TODO: Should probably move this to the state machine somehow
        this.becameReady();
      }

      if (this.isNew()) {
        this.clearRelationships();
      }

      if (this.isValid()) {
        this._inFlightAttributes = new _emberDataPrivateSystemEmptyObject["default"]();
      }

      this.send('rolledBack');

      this.record._notifyProperties(dirtyKeys);
    },
    /*
      @method transitionTo
      @private
      @param {String} name
    */
    transitionTo: function transitionTo(name) {
      // POSSIBLE TODO: Remove this code and replace with
      // always having direct reference to state objects

      var pivotName = extractPivotName(name);
      var currentState = get(this, 'currentState');
      var state = currentState;

      do {
        if (state.exit) {
          state.exit(this);
        }
        state = state.parentState;
      } while (!state.hasOwnProperty(pivotName));

      var path = splitOnDot(name);
      var setups = [];
      var enters = [];
      var i, l;

      for (i = 0, l = path.length; i < l; i++) {
        state = state[path[i]];

        if (state.enter) {
          enters.push(state);
        }
        if (state.setup) {
          setups.push(state);
        }
      }

      for (i = 0, l = enters.length; i < l; i++) {
        enters[i].enter(this);
      }

      set(this, 'currentState', state);
      //TODO Consider whether this is the best approach for keeping these two in sync
      if (this.record) {
        set(this.record, 'currentState', state);
      }

      for (i = 0, l = setups.length; i < l; i++) {
        setups[i].setup(this);
      }

      this.updateRecordArraysLater();
    },

    _unhandledEvent: function _unhandledEvent(state, name, context) {
      var errorMessage = "Attempted to handle event `" + name + "` ";
      errorMessage += "on " + String(this) + " while in state ";
      errorMessage += state.stateName + ". ";

      if (context !== undefined) {
        errorMessage += "Called with " + _ember["default"].inspect(context) + ".";
      }

      throw new _ember["default"].Error(errorMessage);
    },

    triggerLater: function triggerLater() {
      var length = arguments.length;
      var args = new Array(length);

      for (var i = 0; i < length; i++) {
        args[i] = arguments[i];
      }

      if (this._deferredTriggers.push(args) !== 1) {
        return;
      }
      _ember["default"].run.scheduleOnce('actions', this, '_triggerDeferredTriggers');
    },

    _triggerDeferredTriggers: function _triggerDeferredTriggers() {
      //TODO: Before 1.0 we want to remove all the events that happen on the pre materialized record,
      //but for now, we queue up all the events triggered before the record was materialized, and flush
      //them once we have the record
      if (!this.record) {
        return;
      }
      for (var i = 0, l = this._deferredTriggers.length; i < l; i++) {
        this.record.trigger.apply(this.record, this._deferredTriggers[i]);
      }

      this._deferredTriggers.length = 0;
    },
    /*
      @method clearRelationships
      @private
    */
    clearRelationships: function clearRelationships() {
      var _this = this;

      this.eachRelationship(function (name, relationship) {
        if (_this._relationships.has(name)) {
          var rel = _this._relationships.get(name);
          rel.clear();
          rel.destroy();
        }
      });
      Object.keys(this._implicitRelationships).forEach(function (key) {
        _this._implicitRelationships[key].clear();
        _this._implicitRelationships[key].destroy();
      });
    },

    /*
      When a find request is triggered on the store, the user can optionally pass in
      attributes and relationships to be preloaded. These are meant to behave as if they
      came back from the server, except the user obtained them out of band and is informing
      the store of their existence. The most common use case is for supporting client side
      nested URLs, such as `/posts/1/comments/2` so the user can do
      `store.findRecord('comment', 2, { preload: { post: 1 } })` without having to fetch the post.
       Preloaded data can be attributes and relationships passed in either as IDs or as actual
      models.
       @method _preloadData
      @private
      @param {Object} preload
    */
    _preloadData: function _preloadData(preload) {
      var _this2 = this;

      //TODO(Igor) consider the polymorphic case
      Object.keys(preload).forEach(function (key) {
        var preloadValue = get(preload, key);
        var relationshipMeta = _this2.type.metaForProperty(key);
        if (relationshipMeta.isRelationship) {
          _this2._preloadRelationship(key, preloadValue);
        } else {
          _this2._data[key] = preloadValue;
        }
      });
    },

    _preloadRelationship: function _preloadRelationship(key, preloadValue) {
      var relationshipMeta = this.type.metaForProperty(key);
      var type = relationshipMeta.type;
      if (relationshipMeta.kind === 'hasMany') {
        this._preloadHasMany(key, preloadValue, type);
      } else {
        this._preloadBelongsTo(key, preloadValue, type);
      }
    },

    _preloadHasMany: function _preloadHasMany(key, preloadValue, type) {
      (0, _emberDataPrivateDebug.assert)("You need to pass in an array to set a hasMany property on a record", Array.isArray(preloadValue));
      var recordsToSet = new Array(preloadValue.length);

      for (var i = 0; i < preloadValue.length; i++) {
        var recordToPush = preloadValue[i];
        recordsToSet[i] = this._convertStringOrNumberIntoInternalModel(recordToPush, type);
      }

      //We use the pathway of setting the hasMany as if it came from the adapter
      //because the user told us that they know this relationships exists already
      this._relationships.get(key).updateRecordsFromAdapter(recordsToSet);
    },

    _preloadBelongsTo: function _preloadBelongsTo(key, preloadValue, type) {
      var recordToSet = this._convertStringOrNumberIntoInternalModel(preloadValue, type);

      //We use the pathway of setting the hasMany as if it came from the adapter
      //because the user told us that they know this relationships exists already
      this._relationships.get(key).setRecord(recordToSet);
    },

    _convertStringOrNumberIntoInternalModel: function _convertStringOrNumberIntoInternalModel(value, type) {
      if (typeof value === 'string' || typeof value === 'number') {
        return this.store._internalModelForId(type, value);
      }
      if (value._internalModel) {
        return value._internalModel;
      }
      return value;
    },

    /*
      @method updateRecordArrays
      @private
    */
    updateRecordArrays: function updateRecordArrays() {
      this._updatingRecordArraysLater = false;
      this.store.dataWasUpdated(this.type, this);
    },

    setId: function setId(id) {
      (0, _emberDataPrivateDebug.assert)('A record\'s id cannot be changed once it is in the loaded state', this.id === null || this.id === id || this.isNew());
      this.id = id;
      if (this.record.get('id') !== id) {
        this.record.set('id', id);
      }
    },

    didError: function didError(error) {
      this.error = error;
      this.isError = true;

      if (this.record) {
        this.record.setProperties({
          isError: true,
          adapterError: error
        });
      }
    },

    didCleanError: function didCleanError() {
      this.error = null;
      this.isError = false;

      if (this.record) {
        this.record.setProperties({
          isError: false,
          adapterError: null
        });
      }
    },
    /*
      If the adapter did not return a hash in response to a commit,
      merge the changed attributes and relationships into the existing
      saved data.
       @method adapterDidCommit
    */
    adapterDidCommit: function adapterDidCommit(data) {
      if (data) {
        data = data.attributes;
      }

      this.didCleanError();
      var changedKeys = this._changedKeys(data);

      assign(this._data, this._inFlightAttributes);
      if (data) {
        assign(this._data, data);
      }

      this._inFlightAttributes = new _emberDataPrivateSystemEmptyObject["default"]();

      this.send('didCommit');
      this.updateRecordArraysLater();

      if (!data) {
        return;
      }

      this.record._notifyProperties(changedKeys);
    },

    /*
      @method updateRecordArraysLater
      @private
    */
    updateRecordArraysLater: function updateRecordArraysLater() {
      // quick hack (something like this could be pushed into run.once
      if (this._updatingRecordArraysLater) {
        return;
      }
      this._updatingRecordArraysLater = true;
      _ember["default"].run.schedule('actions', this, this.updateRecordArrays);
    },

    addErrorMessageToAttribute: function addErrorMessageToAttribute(attribute, message) {
      var record = this.getRecord();
      get(record, 'errors')._add(attribute, message);
    },

    removeErrorMessageFromAttribute: function removeErrorMessageFromAttribute(attribute) {
      var record = this.getRecord();
      get(record, 'errors')._remove(attribute);
    },

    clearErrorMessages: function clearErrorMessages() {
      var record = this.getRecord();
      get(record, 'errors')._clear();
    },

    hasErrors: function hasErrors() {
      var record = this.getRecord();
      var errors = get(record, 'errors');

      return !_ember["default"].isEmpty(errors);
    },

    // FOR USE DURING COMMIT PROCESS

    /*
      @method adapterDidInvalidate
      @private
    */
    adapterDidInvalidate: function adapterDidInvalidate(errors) {
      var attribute;

      for (attribute in errors) {
        if (errors.hasOwnProperty(attribute)) {
          this.addErrorMessageToAttribute(attribute, errors[attribute]);
        }
      }

      this.send('becameInvalid');

      this._saveWasRejected();
    },

    /*
      @method adapterDidError
      @private
    */
    adapterDidError: function adapterDidError(error) {
      this.send('becameError');
      this.didError(error);
      this._saveWasRejected();
    },

    _saveWasRejected: function _saveWasRejected() {
      var keys = Object.keys(this._inFlightAttributes);
      for (var i = 0; i < keys.length; i++) {
        if (this._attributes[keys[i]] === undefined) {
          this._attributes[keys[i]] = this._inFlightAttributes[keys[i]];
        }
      }
      this._inFlightAttributes = new _emberDataPrivateSystemEmptyObject["default"]();
    },

    /*
      Ember Data has 3 buckets for storing the value of an attribute on an internalModel.
       `_data` holds all of the attributes that have been acknowledged by
      a backend via the adapter. When rollbackAttributes is called on a model all
      attributes will revert to the record's state in `_data`.
       `_attributes` holds any change the user has made to an attribute
      that has not been acknowledged by the adapter. Any values in
      `_attributes` are have priority over values in `_data`.
       `_inFlightAttributes`. When a record is being synced with the
      backend the values in `_attributes` are copied to
      `_inFlightAttributes`. This way if the backend acknowledges the
      save but does not return the new state Ember Data can copy the
      values from `_inFlightAttributes` to `_data`. Without having to
      worry about changes made to `_attributes` while the save was
      happenign.
        Changed keys builds a list of all of the values that may have been
      changed by the backend after a successful save.
       It does this by iterating over each key, value pair in the payload
      returned from the server after a save. If the `key` is found in
      `_attributes` then the user has a local changed to the attribute
      that has not been synced with the server and the key is not
      included in the list of changed keys.
    
      If the value, for a key differs from the value in what Ember Data
      believes to be the truth about the backend state (A merger of the
      `_data` and `_inFlightAttributes` objects where
      `_inFlightAttributes` has priority) then that means the backend
      has updated the value and the key is added to the list of changed
      keys.
       @method _changedKeys
      @private
    */
    _changedKeys: function _changedKeys(updates) {
      var changedKeys = [];

      if (updates) {
        var original, i, value, key;
        var keys = Object.keys(updates);
        var length = keys.length;

        original = assign(new _emberDataPrivateSystemEmptyObject["default"](), this._data);
        original = assign(original, this._inFlightAttributes);

        for (i = 0; i < length; i++) {
          key = keys[i];
          value = updates[key];

          // A value in _attributes means the user has a local change to
          // this attributes. We never override this value when merging
          // updates from the backend so we should not sent a change
          // notification if the server value differs from the original.
          if (this._attributes[key] !== undefined) {
            continue;
          }

          if (!_ember["default"].isEqual(original[key], value)) {
            changedKeys.push(key);
          }
        }
      }

      return changedKeys;
    },

    toString: function toString() {
      if (this.record) {
        return this.record.toString();
      } else {
        return "<" + this.modelName + ":" + this.id + ">";
      }
    }
  };

  if (true) {

    InternalModel.prototype.referenceFor = function (type, name) {
      var reference = this.references[name];

      if (!reference) {
        var relationship = this._relationships.get(name);

        if (type === "belongsTo") {
          reference = new _emberDataPrivateSystemReferences.BelongsToReference(this.store, this, relationship);
        } else if (type === "hasMany") {
          reference = new _emberDataPrivateSystemReferences.HasManyReference(this.store, this, relationship);
        }

        this.references[name] = reference;
      }

      return reference;
    };
  }
});
define("ember-data/-private/system/model/model", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/promise-proxies", "ember-data/-private/system/model/errors", "ember-data/-private/features", "ember-data/-private/system/debug/debug-info", "ember-data/-private/system/relationships/belongs-to", "ember-data/-private/system/relationships/has-many", "ember-data/-private/system/relationships/ext", "ember-data/-private/system/model/attr"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemPromiseProxies, _emberDataPrivateSystemModelErrors, _emberDataPrivateFeatures, _emberDataPrivateSystemDebugDebugInfo, _emberDataPrivateSystemRelationshipsBelongsTo, _emberDataPrivateSystemRelationshipsHasMany, _emberDataPrivateSystemRelationshipsExt, _emberDataPrivateSystemModelAttr) {
  "use strict";

  /**
    @module ember-data
  */

  var get = _ember["default"].get;

  function intersection(array1, array2) {
    var result = [];
    array1.forEach(function (element) {
      if (array2.indexOf(element) >= 0) {
        result.push(element);
      }
    });

    return result;
  }

  var RESERVED_MODEL_PROPS = ['currentState', 'data', 'store'];

  var retrieveFromCurrentState = _ember["default"].computed('currentState', function (key) {
    return get(this._internalModel.currentState, key);
  }).readOnly();

  /**
  
    The model class that all Ember Data records descend from.
    This is the public API of Ember Data models. If you are using Ember Data
    in your application, this is the class you should use.
    If you are working on Ember Data internals, you most likely want to be dealing
    with `InternalModel`
  
    @class Model
    @namespace DS
    @extends Ember.Object
    @uses Ember.Evented
  */
  var Model = _ember["default"].Object.extend(_ember["default"].Evented, {
    _internalModel: null,
    store: null,

    /**
      If this property is `true` the record is in the `empty`
      state. Empty is the first state all records enter after they have
      been created. Most records created by the store will quickly
      transition to the `loading` state if data needs to be fetched from
      the server or the `created` state if the record is created on the
      client. A record can also enter the empty state if the adapter is
      unable to locate the record.
       @property isEmpty
      @type {Boolean}
      @readOnly
    */
    isEmpty: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `loading` state. A
      record enters this state when the store asks the adapter for its
      data. It remains in this state until the adapter provides the
      requested data.
       @property isLoading
      @type {Boolean}
      @readOnly
    */
    isLoading: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `loaded` state. A
      record enters this state when its data is populated. Most of a
      record's lifecycle is spent inside substates of the `loaded`
      state.
       Example
       ```javascript
      var record = store.createRecord('model');
      record.get('isLoaded'); // true
       store.findRecord('model', 1).then(function(model) {
        model.get('isLoaded'); // true
      });
      ```
       @property isLoaded
      @type {Boolean}
      @readOnly
    */
    isLoaded: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `dirty` state. The
      record has local changes that have not yet been saved by the
      adapter. This includes records that have been created (but not yet
      saved) or deleted.
       Example
       ```javascript
      var record = store.createRecord('model');
      record.get('hasDirtyAttributes'); // true
       store.findRecord('model', 1).then(function(model) {
        model.get('hasDirtyAttributes'); // false
        model.set('foo', 'some value');
        model.get('hasDirtyAttributes'); // true
      });
      ```
       @property hasDirtyAttributes
      @type {Boolean}
      @readOnly
    */
    hasDirtyAttributes: _ember["default"].computed('currentState.isDirty', function () {
      return this.get('currentState.isDirty');
    }),
    /**
      If this property is `true` the record is in the `saving` state. A
      record enters the saving state when `save` is called, but the
      adapter has not yet acknowledged that the changes have been
      persisted to the backend.
       Example
       ```javascript
      var record = store.createRecord('model');
      record.get('isSaving'); // false
      var promise = record.save();
      record.get('isSaving'); // true
      promise.then(function() {
        record.get('isSaving'); // false
      });
      ```
       @property isSaving
      @type {Boolean}
      @readOnly
    */
    isSaving: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `deleted` state
      and has been marked for deletion. When `isDeleted` is true and
      `hasDirtyAttributes` is true, the record is deleted locally but the deletion
      was not yet persisted. When `isSaving` is true, the change is
      in-flight. When both `hasDirtyAttributes` and `isSaving` are false, the
      change has persisted.
       Example
       ```javascript
      var record = store.createRecord('model');
      record.get('isDeleted');    // false
      record.deleteRecord();
       // Locally deleted
      record.get('isDeleted');           // true
      record.get('hasDirtyAttributes');  // true
      record.get('isSaving');            // false
       // Persisting the deletion
      var promise = record.save();
      record.get('isDeleted');    // true
      record.get('isSaving');     // true
       // Deletion Persisted
      promise.then(function() {
        record.get('isDeleted');          // true
        record.get('isSaving');           // false
        record.get('hasDirtyAttributes'); // false
      });
      ```
       @property isDeleted
      @type {Boolean}
      @readOnly
    */
    isDeleted: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `new` state. A
      record will be in the `new` state when it has been created on the
      client and the adapter has not yet report that it was successfully
      saved.
       Example
       ```javascript
      var record = store.createRecord('model');
      record.get('isNew'); // true
       record.save().then(function(model) {
        model.get('isNew'); // false
      });
      ```
       @property isNew
      @type {Boolean}
      @readOnly
    */
    isNew: retrieveFromCurrentState,
    /**
      If this property is `true` the record is in the `valid` state.
       A record will be in the `valid` state when the adapter did not report any
      server-side validation failures.
       @property isValid
      @type {Boolean}
      @readOnly
    */
    isValid: retrieveFromCurrentState,
    /**
      If the record is in the dirty state this property will report what
      kind of change has caused it to move into the dirty
      state. Possible values are:
       - `created` The record has been created by the client and not yet saved to the adapter.
      - `updated` The record has been updated by the client and not yet saved to the adapter.
      - `deleted` The record has been deleted by the client and not yet saved to the adapter.
       Example
       ```javascript
      var record = store.createRecord('model');
      record.get('dirtyType'); // 'created'
      ```
       @property dirtyType
      @type {String}
      @readOnly
    */
    dirtyType: retrieveFromCurrentState,

    /**
      If `true` the adapter reported that it was unable to save local
      changes to the backend for any reason other than a server-side
      validation error.
       Example
       ```javascript
      record.get('isError'); // false
      record.set('foo', 'valid value');
      record.save().then(null, function() {
        record.get('isError'); // true
      });
      ```
       @property isError
      @type {Boolean}
      @readOnly
    */
    isError: false,

    /**
      If `true` the store is attempting to reload the record form the adapter.
       Example
       ```javascript
      record.get('isReloading'); // false
      record.reload();
      record.get('isReloading'); // true
      ```
       @property isReloading
      @type {Boolean}
      @readOnly
    */
    isReloading: false,

    /**
      All ember models have an id property. This is an identifier
      managed by an external source. These are always coerced to be
      strings before being used internally. Note when declaring the
      attributes for a model it is an error to declare an id
      attribute.
       ```javascript
      var record = store.createRecord('model');
      record.get('id'); // null
       store.findRecord('model', 1).then(function(model) {
        model.get('id'); // '1'
      });
      ```
       @property id
      @type {String}
    */
    id: null,

    /**
      @property currentState
      @private
      @type {Object}
    */

    /**
      When the record is in the `invalid` state this object will contain
      any errors returned by the adapter. When present the errors hash
      contains keys corresponding to the invalid property names
      and values which are arrays of Javascript objects with two keys:
       - `message` A string containing the error message from the backend
      - `attribute` The name of the property associated with this error message
       ```javascript
      record.get('errors.length'); // 0
      record.set('foo', 'invalid value');
      record.save().catch(function() {
        record.get('errors').get('foo');
        // [{message: 'foo should be a number.', attribute: 'foo'}]
      });
      ```
       The `errors` property us useful for displaying error messages to
      the user.
       ```handlebars
      <label>Username: {{input value=username}} </label>
      {{#each model.errors.username as |error|}}
        <div class="error">
          {{error.message}}
        </div>
      {{/each}}
      <label>Email: {{input value=email}} </label>
      {{#each model.errors.email as |error|}}
        <div class="error">
          {{error.message}}
        </div>
      {{/each}}
      ```
        You can also access the special `messages` property on the error
      object to get an array of all the error strings.
       ```handlebars
      {{#each model.errors.messages as |message|}}
        <div class="error">
          {{message}}
        </div>
      {{/each}}
      ```
       @property errors
      @type {DS.Errors}
    */
    errors: _ember["default"].computed(function () {
      var errors = _emberDataPrivateSystemModelErrors["default"].create();

      errors._registerHandlers(this._internalModel, function () {
        this.send('becameInvalid');
      }, function () {
        this.send('becameValid');
      });
      return errors;
    }).readOnly(),

    /**
      This property holds the `DS.AdapterError` object with which
      last adapter operation was rejected.
       @property adapterError
      @type {DS.AdapterError}
    */
    adapterError: null,

    /**
      Create a JSON representation of the record, using the serialization
      strategy of the store's adapter.
      `serialize` takes an optional hash as a parameter, currently
      supported options are:
      - `includeId`: `true` if the record's ID should be included in the
        JSON representation.
       @method serialize
      @param {Object} options
      @return {Object} an object whose values are primitive JSON values only
    */
    serialize: function serialize(options) {
      return this.store.serialize(this, options);
    },

    /**
      Use [DS.JSONSerializer](DS.JSONSerializer.html) to
      get the JSON representation of a record.
       `toJSON` takes an optional hash as a parameter, currently
      supported options are:
       - `includeId`: `true` if the record's ID should be included in the
        JSON representation.
       @method toJSON
      @param {Object} options
      @return {Object} A JSON representation of the object.
    */
    toJSON: function toJSON(options) {
      // container is for lazy transform lookups
      var serializer = this.store.serializerFor('-default');
      var snapshot = this._internalModel.createSnapshot();

      return serializer.serialize(snapshot, options);
    },

    /**
      Fired when the record is ready to be interacted with,
      that is either loaded from the server or created locally.
       @event ready
    */
    ready: _ember["default"].K,

    /**
      Fired when the record is loaded from the server.
       @event didLoad
    */
    didLoad: _ember["default"].K,

    /**
      Fired when the record is updated.
       @event didUpdate
    */
    didUpdate: _ember["default"].K,

    /**
      Fired when a new record is commited to the server.
       @event didCreate
    */
    didCreate: _ember["default"].K,

    /**
      Fired when the record is deleted.
       @event didDelete
    */
    didDelete: _ember["default"].K,

    /**
      Fired when the record becomes invalid.
       @event becameInvalid
    */
    becameInvalid: _ember["default"].K,

    /**
      Fired when the record enters the error state.
       @event becameError
    */
    becameError: _ember["default"].K,

    /**
      Fired when the record is rolled back.
       @event rolledBack
    */
    rolledBack: _ember["default"].K,

    /**
      @property data
      @private
      @type {Object}
    */
    data: _ember["default"].computed.readOnly('_internalModel._data'),

    //TODO Do we want to deprecate these?
    /**
      @method send
      @private
      @param {String} name
      @param {Object} context
    */
    send: function send(name, context) {
      return this._internalModel.send(name, context);
    },

    /**
      @method transitionTo
      @private
      @param {String} name
    */
    transitionTo: function transitionTo(name) {
      return this._internalModel.transitionTo(name);
    },

    /**
      Marks the record as deleted but does not save it. You must call
      `save` afterwards if you want to persist it. You might use this
      method if you want to allow the user to still `rollbackAttributes()`
      after a delete it was made.
       Example
       ```app/routes/model/delete.js
      import Ember from 'ember';
       export default Ember.Route.extend({
        actions: {
          softDelete: function() {
            this.controller.get('model').deleteRecord();
          },
          confirm: function() {
            this.controller.get('model').save();
          },
          undo: function() {
            this.controller.get('model').rollbackAttributes();
          }
        }
      });
      ```
       @method deleteRecord
    */
    deleteRecord: function deleteRecord() {
      this._internalModel.deleteRecord();
    },

    /**
      Same as `deleteRecord`, but saves the record immediately.
       Example
       ```app/routes/model/delete.js
      import Ember from 'ember';
       export default Ember.Route.extend({
        actions: {
          delete: function() {
            var controller = this.controller;
            controller.get('model').destroyRecord().then(function() {
              controller.transitionToRoute('model.index');
            });
          }
        }
      });
      ```
       @method destroyRecord
      @param {Object} options
      @return {Promise} a promise that will be resolved when the adapter returns
      successfully or rejected if the adapter returns with an error.
    */
    destroyRecord: function destroyRecord(options) {
      this.deleteRecord();
      return this.save(options);
    },

    /**
      @method unloadRecord
      @private
    */
    unloadRecord: function unloadRecord() {
      if (this.isDestroyed) {
        return;
      }
      this._internalModel.unloadRecord();
    },

    /**
      @method _notifyProperties
      @private
    */
    _notifyProperties: function _notifyProperties(keys) {
      _ember["default"].beginPropertyChanges();
      var key;
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        this.notifyPropertyChange(key);
      }
      _ember["default"].endPropertyChanges();
    },

    /**
      Returns an object, whose keys are changed properties, and value is
      an [oldProp, newProp] array.
       The array represents the diff of the canonical state with the local state
      of the model. Note: if the model is created locally, the canonical state is
      empty since the adapter hasn't acknowledged the attributes yet:
       Example
       ```app/models/mascot.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        name: attr('string'),
        isAdmin: attr('boolean', {
          defaultValue: false
        })
      });
      ```
       ```javascript
      var mascot = store.createRecord('mascot');
       mascot.changedAttributes(); // {}
       mascot.set('name', 'Tomster');
      mascot.changedAttributes(); // { name: [undefined, 'Tomster'] }
       mascot.set('isAdmin', true);
      mascot.changedAttributes(); // { isAdmin: [undefined, true], name: [undefined, 'Tomster'] }
       mascot.save().then(function() {
        mascot.changedAttributes(); // {}
         mascot.set('isAdmin', false);
        mascot.changedAttributes(); // { isAdmin: [true, false] }
      });
      ```
       @method changedAttributes
      @return {Object} an object, whose keys are changed properties,
        and value is an [oldProp, newProp] array.
    */
    changedAttributes: function changedAttributes() {
      return this._internalModel.changedAttributes();
    },

    //TODO discuss with tomhuda about events/hooks
    //Bring back as hooks?
    /**
      @method adapterWillCommit
      @private
    adapterWillCommit: function() {
      this.send('willCommit');
    },
     /**
      @method adapterDidDirty
      @private
    adapterDidDirty: function() {
      this.send('becomeDirty');
      this.updateRecordArraysLater();
    },
    */

    /**
      If the model `hasDirtyAttributes` this function will discard any unsaved
      changes. If the model `isNew` it will be removed from the store.
       Example
       ```javascript
      record.get('name'); // 'Untitled Document'
      record.set('name', 'Doc 1');
      record.get('name'); // 'Doc 1'
      record.rollbackAttributes();
      record.get('name'); // 'Untitled Document'
      ```
       @method rollbackAttributes
    */
    rollbackAttributes: function rollbackAttributes() {
      this._internalModel.rollbackAttributes();
    },

    /*
      @method _createSnapshot
      @private
    */
    _createSnapshot: function _createSnapshot() {
      return this._internalModel.createSnapshot();
    },

    toStringExtension: function toStringExtension() {
      return get(this, 'id');
    },

    /**
      Save the record and persist any changes to the record to an
      external source via the adapter.
       Example
       ```javascript
      record.set('name', 'Tomster');
      record.save().then(function() {
        // Success callback
      }, function() {
        // Error callback
      });
      ```
      @method save
      @param {Object} options
      @return {Promise} a promise that will be resolved when the adapter returns
      successfully or rejected if the adapter returns with an error.
    */
    save: function save(options) {
      var _this = this;

      return _emberDataPrivateSystemPromiseProxies.PromiseObject.create({
        promise: this._internalModel.save(options).then(function () {
          return _this;
        })
      });
    },

    /**
      Reload the record from the adapter.
       This will only work if the record has already finished loading.
       Example
       ```app/routes/model/view.js
      import Ember from 'ember';
       export default Ember.Route.extend({
        actions: {
          reload: function() {
            this.controller.get('model').reload().then(function(model) {
              // do something with the reloaded model
            });
          }
        }
      });
      ```
       @method reload
      @return {Promise} a promise that will be resolved with the record when the
      adapter returns successfully or rejected if the adapter returns
      with an error.
    */
    reload: function reload() {
      var _this2 = this;

      return _emberDataPrivateSystemPromiseProxies.PromiseObject.create({
        promise: this._internalModel.reload().then(function () {
          return _this2;
        })
      });
    },

    /**
      Override the default event firing from Ember.Evented to
      also call methods with the given name.
       @method trigger
      @private
      @param {String} name
    */
    trigger: function trigger(name) {
      var length = arguments.length;
      var args = new Array(length - 1);

      for (var i = 1; i < length; i++) {
        args[i - 1] = arguments[i];
      }

      _ember["default"].tryInvoke(this, name, args);
      this._super.apply(this, arguments);
    },

    willDestroy: function willDestroy() {
      //TODO Move!
      this._super.apply(this, arguments);
      this._internalModel.clearRelationships();
      this._internalModel.recordObjectWillDestroy();
      //TODO should we set internalModel to null here?
    },

    // This is a temporary solution until we refactor DS.Model to not
    // rely on the data property.
    willMergeMixin: function willMergeMixin(props) {
      var constructor = this.constructor;
      (0, _emberDataPrivateDebug.assert)('`' + intersection(Object.keys(props), RESERVED_MODEL_PROPS)[0] + '` is a reserved property name on DS.Model objects. Please choose a different property name for ' + constructor.toString(), !intersection(Object.keys(props), RESERVED_MODEL_PROPS)[0]);
      (0, _emberDataPrivateDebug.assert)("You may not set `id` as an attribute on your model. Please remove any lines that look like: `id: DS.attr('<type>')` from " + constructor.toString(), Object.keys(props).indexOf('id') === -1);
    },

    attr: function attr() {
      (0, _emberDataPrivateDebug.assert)("The `attr` method is not available on DS.Model, a DS.Snapshot was probably expected. Are you passing a DS.Model instead of a DS.Snapshot to your serializer?", false);
    },

    belongsTo: function belongsTo() {
      (0, _emberDataPrivateDebug.assert)("The `belongsTo` method is not available on DS.Model, a DS.Snapshot was probably expected. Are you passing a DS.Model instead of a DS.Snapshot to your serializer?", false);
    },

    hasMany: function hasMany() {
      (0, _emberDataPrivateDebug.assert)("The `hasMany` method is not available on DS.Model, a DS.Snapshot was probably expected. Are you passing a DS.Model instead of a DS.Snapshot to your serializer?", false);
    },

    setId: _ember["default"].observer('id', function () {
      this._internalModel.setId(this.get('id'));
    })
  });

  Model.reopenClass({
    /**
      Alias DS.Model's `create` method to `_create`. This allows us to create DS.Model
      instances from within the store, but if end users accidentally call `create()`
      (instead of `createRecord()`), we can raise an error.
       @method _create
      @private
      @static
    */
    _create: Model.create,

    /**
      Override the class' `create()` method to raise an error. This
      prevents end users from inadvertently calling `create()` instead
      of `createRecord()`. The store is still able to create instances
      by calling the `_create()` method. To create an instance of a
      `DS.Model` use [store.createRecord](DS.Store.html#method_createRecord).
       @method create
      @private
      @static
    */
    create: function create() {
      throw new _ember["default"].Error("You should not call `create` on a model. Instead, call `store.createRecord` with the attributes you would like to set.");
    },

    /**
     Represents the model's class name as a string. This can be used to look up the model through
     DS.Store's modelFor method.
      `modelName` is generated for you by Ember Data. It will be a lowercased, dasherized string.
     For example:
      ```javascript
     store.modelFor('post').modelName; // 'post'
     store.modelFor('blog-post').modelName; // 'blog-post'
     ```
      The most common place you'll want to access `modelName` is in your serializer's `payloadKeyFromModelName` method. For example, to change payload
     keys to underscore (instead of dasherized), you might use the following code:
      ```javascript
     export default var PostSerializer = DS.RESTSerializer.extend({
       payloadKeyFromModelName: function(modelName) {
         return Ember.String.underscore(modelName);
       }
     });
     ```
     @property modelName
     @type String
     @readonly
    */
    modelName: null
  });

  // if `Ember.setOwner` is defined, accessing `this.container` is
  // deprecated (but functional). In "standard" Ember usage, this
  // deprecation is actually created via an `.extend` of the factory
  // inside the container itself, but that only happens on models
  // with MODEL_FACTORY_INJECTIONS enabled :(
  if (_ember["default"].setOwner) {
    Object.defineProperty(Model.prototype, 'container', {
      configurable: true,
      enumerable: false,
      get: function get() {
        (0, _emberDataPrivateDebug.deprecate)('Using the injected `container` is deprecated. Please use the `getOwner` helper instead to access the owner of this object.', false, { id: 'ember-application.injected-container', until: '3.0.0' });

        return this.store.container;
      }
    });
  }

  if (true) {

    Model.reopen({

      /**
        Get the reference for the specified belongsTo relationship.
         Example
         ```javascript
        // models/blog.js
        export default DS.Model.extend({
          user: DS.belongsTo({ async: true })
        });
         var blog = store.push({
          type: 'blog',
          id: 1,
          relationships: {
            user: { type: 'user', id: 1 }
          }
        });
        var userRef = blog.belongsTo('user');
         // check if the user relationship is loaded
        var isLoaded = userRef.value() !== null;
         // get the record of the reference (null if not yet available)
        var user = userRef.value();
         // get the identifier of the reference
        if (userRef.remoteType() === "id") {
          var id = userRef.id();
        } else if (userRef.remoteType() === "link") {
          var link = userRef.link();
        }
         // load user (via store.findRecord or store.findBelongsTo)
        userRef.load().then(...)
         // or trigger a reload
        userRef.reload().then(...)
         // provide data for reference
        userRef.push({
          type: 'user',
          id: 1,
          attributes: {
            username: "@user"
          }
        }).then(function(user) {
          userRef.value() === user;
        });
        ```
         @method belongsTo
        @param {String} name of the relationship
        @return {BelongsToReference} reference for this relationship
      */
      belongsTo: function belongsTo(name) {
        return this._internalModel.referenceFor('belongsTo', name);
      },

      /**
        Get the reference for the specified hasMany relationship.
         Example
         ```javascript
        // models/blog.js
        export default DS.Model.extend({
          comments: DS.hasMany({ async: true })
        });
         var blog = store.push({
          type: 'blog',
          id: 1,
          relationships: {
            comments: {
              data: [
                { type: 'comment', id: 1 },
                { type: 'comment', id: 2 }
              ]
            }
          }
        });
        var commentsRef = blog.hasMany('comments');
         // check if the comments are loaded already
        var isLoaded = commentsRef.value() !== null;
         // get the records of the reference (null if not yet available)
        var comments = commentsRef.value();
         // get the identifier of the reference
        if (commentsRef.remoteType() === "ids") {
          var ids = commentsRef.ids();
        } else if (commentsRef.remoteType() === "link") {
          var link = commentsRef.link();
        }
         // load comments (via store.findMany or store.findHasMany)
        commentsRef.load().then(...)
         // or trigger a reload
        commentsRef.reload().then(...)
         // provide data for reference
        commentsRef.push([{ type: 'comment', id: 1 }, { type: 'comment', id: 2 }]).then(function(comments) {
          commentsRef.value() === comments;
        });
        ```
         @method hasMany
        @param {String} name of the relationship
        @return {HasManyReference} reference for this relationship
      */
      hasMany: function hasMany(name) {
        return this._internalModel.referenceFor('hasMany', name);
      }
    });
  }

  Model.reopenClass(_emberDataPrivateSystemRelationshipsExt.RelationshipsClassMethodsMixin);
  Model.reopenClass(_emberDataPrivateSystemModelAttr.AttrClassMethodsMixin);

  exports["default"] = Model.extend(_emberDataPrivateSystemDebugDebugInfo["default"], _emberDataPrivateSystemRelationshipsBelongsTo.BelongsToMixin, _emberDataPrivateSystemRelationshipsExt.DidDefinePropertyMixin, _emberDataPrivateSystemRelationshipsExt.RelationshipsInstanceMethodsMixin, _emberDataPrivateSystemRelationshipsHasMany.HasManyMixin, _emberDataPrivateSystemModelAttr.AttrInstanceMethodsMixin);
});
define('ember-data/-private/system/model/states', ['exports', 'ember', 'ember-data/-private/debug'], function (exports, _ember, _emberDataPrivateDebug) {
  /**
    @module ember-data
  */
  'use strict';

  var get = _ember['default'].get;
  /*
    This file encapsulates the various states that a record can transition
    through during its lifecycle.
  */
  /**
    ### State
  
    Each record has a `currentState` property that explicitly tracks what
    state a record is in at any given time. For instance, if a record is
    newly created and has not yet been sent to the adapter to be saved,
    it would be in the `root.loaded.created.uncommitted` state.  If a
    record has had local modifications made to it that are in the
    process of being saved, the record would be in the
    `root.loaded.updated.inFlight` state. (This state paths will be
    explained in more detail below.)
  
    Events are sent by the record or its store to the record's
    `currentState` property. How the state reacts to these events is
    dependent on which state it is in. In some states, certain events
    will be invalid and will cause an exception to be raised.
  
    States are hierarchical and every state is a substate of the
    `RootState`. For example, a record can be in the
    `root.deleted.uncommitted` state, then transition into the
    `root.deleted.inFlight` state. If a child state does not implement
    an event handler, the state manager will attempt to invoke the event
    on all parent states until the root state is reached. The state
    hierarchy of a record is described in terms of a path string. You
    can determine a record's current state by getting the state's
    `stateName` property:
  
    ```javascript
    record.get('currentState.stateName');
    //=> "root.created.uncommitted"
     ```
  
    The hierarchy of valid states that ship with ember data looks like
    this:
  
    ```text
    * root
      * deleted
        * saved
        * uncommitted
        * inFlight
      * empty
      * loaded
        * created
          * uncommitted
          * inFlight
        * saved
        * updated
          * uncommitted
          * inFlight
      * loading
    ```
  
    The `DS.Model` states are themselves stateless. What that means is
    that, the hierarchical states that each of *those* points to is a
    shared data structure. For performance reasons, instead of each
    record getting its own copy of the hierarchy of states, each record
    points to this global, immutable shared instance. How does a state
    know which record it should be acting on? We pass the record
    instance into the state's event handlers as the first argument.
  
    The record passed as the first parameter is where you should stash
    state about the record if needed; you should never store data on the state
    object itself.
  
    ### Events and Flags
  
    A state may implement zero or more events and flags.
  
    #### Events
  
    Events are named functions that are invoked when sent to a record. The
    record will first look for a method with the given name on the
    current state. If no method is found, it will search the current
    state's parent, and then its grandparent, and so on until reaching
    the top of the hierarchy. If the root is reached without an event
    handler being found, an exception will be raised. This can be very
    helpful when debugging new features.
  
    Here's an example implementation of a state with a `myEvent` event handler:
  
    ```javascript
    aState: DS.State.create({
      myEvent: function(manager, param) {
        console.log("Received myEvent with", param);
      }
    })
    ```
  
    To trigger this event:
  
    ```javascript
    record.send('myEvent', 'foo');
    //=> "Received myEvent with foo"
    ```
  
    Note that an optional parameter can be sent to a record's `send()` method,
    which will be passed as the second parameter to the event handler.
  
    Events should transition to a different state if appropriate. This can be
    done by calling the record's `transitionTo()` method with a path to the
    desired state. The state manager will attempt to resolve the state path
    relative to the current state. If no state is found at that path, it will
    attempt to resolve it relative to the current state's parent, and then its
    parent, and so on until the root is reached. For example, imagine a hierarchy
    like this:
  
        * created
          * uncommitted <-- currentState
          * inFlight
        * updated
          * inFlight
  
    If we are currently in the `uncommitted` state, calling
    `transitionTo('inFlight')` would transition to the `created.inFlight` state,
    while calling `transitionTo('updated.inFlight')` would transition to
    the `updated.inFlight` state.
  
    Remember that *only events* should ever cause a state transition. You should
    never call `transitionTo()` from outside a state's event handler. If you are
    tempted to do so, create a new event and send that to the state manager.
  
    #### Flags
  
    Flags are Boolean values that can be used to introspect a record's current
    state in a more user-friendly way than examining its state path. For example,
    instead of doing this:
  
    ```javascript
    var statePath = record.get('stateManager.currentPath');
    if (statePath === 'created.inFlight') {
      doSomething();
    }
    ```
  
    You can say:
  
    ```javascript
    if (record.get('isNew') && record.get('isSaving')) {
      doSomething();
    }
    ```
  
    If your state does not set a value for a given flag, the value will
    be inherited from its parent (or the first place in the state hierarchy
    where it is defined).
  
    The current set of flags are defined below. If you want to add a new flag,
    in addition to the area below, you will also need to declare it in the
    `DS.Model` class.
  
  
     * [isEmpty](DS.Model.html#property_isEmpty)
     * [isLoading](DS.Model.html#property_isLoading)
     * [isLoaded](DS.Model.html#property_isLoaded)
     * [isDirty](DS.Model.html#property_isDirty)
     * [isSaving](DS.Model.html#property_isSaving)
     * [isDeleted](DS.Model.html#property_isDeleted)
     * [isNew](DS.Model.html#property_isNew)
     * [isValid](DS.Model.html#property_isValid)
  
    @namespace DS
    @class RootState
  */

  function _didSetProperty(internalModel, context) {
    if (context.value === context.originalValue) {
      delete internalModel._attributes[context.name];
      internalModel.send('propertyWasReset', context.name);
    } else if (context.value !== context.oldValue) {
      internalModel.send('becomeDirty');
    }

    internalModel.updateRecordArraysLater();
  }

  // Implementation notes:
  //
  // Each state has a boolean value for all of the following flags:
  //
  // * isLoaded: The record has a populated `data` property. When a
  //   record is loaded via `store.find`, `isLoaded` is false
  //   until the adapter sets it. When a record is created locally,
  //   its `isLoaded` property is always true.
  // * isDirty: The record has local changes that have not yet been
  //   saved by the adapter. This includes records that have been
  //   created (but not yet saved) or deleted.
  // * isSaving: The record has been committed, but
  //   the adapter has not yet acknowledged that the changes have
  //   been persisted to the backend.
  // * isDeleted: The record was marked for deletion. When `isDeleted`
  //   is true and `isDirty` is true, the record is deleted locally
  //   but the deletion was not yet persisted. When `isSaving` is
  //   true, the change is in-flight. When both `isDirty` and
  //   `isSaving` are false, the change has persisted.
  // * isNew: The record was created on the client and the adapter
  //   did not yet report that it was successfully saved.
  // * isValid: The adapter did not report any server-side validation
  //   failures.

  // The dirty state is a abstract state whose functionality is
  // shared between the `created` and `updated` states.
  //
  // The deleted state shares the `isDirty` flag with the
  // subclasses of `DirtyState`, but with a very different
  // implementation.
  //
  // Dirty states have three child states:
  //
  // `uncommitted`: the store has not yet handed off the record
  //   to be saved.
  // `inFlight`: the store has handed off the record to be saved,
  //   but the adapter has not yet acknowledged success.
  // `invalid`: the record has invalid information and cannot be
  //   send to the adapter yet.
  var DirtyState = {
    initialState: 'uncommitted',

    // FLAGS
    isDirty: true,

    // SUBSTATES

    // When a record first becomes dirty, it is `uncommitted`.
    // This means that there are local pending changes, but they
    // have not yet begun to be saved, and are not invalid.
    uncommitted: {
      // EVENTS
      didSetProperty: _didSetProperty,

      //TODO(Igor) reloading now triggers a
      //loadingData event, though it seems fine?
      loadingData: _ember['default'].K,

      propertyWasReset: function propertyWasReset(internalModel, name) {
        if (!internalModel.hasChangedAttributes()) {
          internalModel.send('rolledBack');
        }
      },

      pushedData: function pushedData(internalModel) {
        internalModel.updateChangedAttributes();

        if (!internalModel.hasChangedAttributes()) {
          internalModel.transitionTo('loaded.saved');
        }
      },

      becomeDirty: _ember['default'].K,

      willCommit: function willCommit(internalModel) {
        internalModel.transitionTo('inFlight');
      },

      reloadRecord: function reloadRecord(internalModel, resolve) {
        resolve(internalModel.store.reloadRecord(internalModel));
      },

      rolledBack: function rolledBack(internalModel) {
        internalModel.transitionTo('loaded.saved');
      },

      becameInvalid: function becameInvalid(internalModel) {
        internalModel.transitionTo('invalid');
      },

      rollback: function rollback(internalModel) {
        internalModel.rollbackAttributes();
        internalModel.triggerLater('ready');
      }
    },

    // Once a record has been handed off to the adapter to be
    // saved, it is in the 'in flight' state. Changes to the
    // record cannot be made during this window.
    inFlight: {
      // FLAGS
      isSaving: true,

      // EVENTS
      didSetProperty: _didSetProperty,
      becomeDirty: _ember['default'].K,
      pushedData: _ember['default'].K,

      unloadRecord: assertAgainstUnloadRecord,

      // TODO: More robust semantics around save-while-in-flight
      willCommit: _ember['default'].K,

      didCommit: function didCommit(internalModel) {
        var dirtyType = get(this, 'dirtyType');

        internalModel.transitionTo('saved');
        internalModel.send('invokeLifecycleCallbacks', dirtyType);
      },

      becameInvalid: function becameInvalid(internalModel) {
        internalModel.transitionTo('invalid');
        internalModel.send('invokeLifecycleCallbacks');
      },

      becameError: function becameError(internalModel) {
        internalModel.transitionTo('uncommitted');
        internalModel.triggerLater('becameError', internalModel);
      }
    },

    // A record is in the `invalid` if the adapter has indicated
    // the the record failed server-side invalidations.
    invalid: {
      // FLAGS
      isValid: false,

      // EVENTS
      deleteRecord: function deleteRecord(internalModel) {
        internalModel.transitionTo('deleted.uncommitted');
      },

      didSetProperty: function didSetProperty(internalModel, context) {
        internalModel.removeErrorMessageFromAttribute(context.name);

        _didSetProperty(internalModel, context);

        if (!internalModel.hasErrors()) {
          this.becameValid(internalModel);
        }
      },

      becameInvalid: _ember['default'].K,
      becomeDirty: _ember['default'].K,
      pushedData: _ember['default'].K,

      willCommit: function willCommit(internalModel) {
        internalModel.clearErrorMessages();
        internalModel.transitionTo('inFlight');
      },

      rolledBack: function rolledBack(internalModel) {
        internalModel.clearErrorMessages();
        internalModel.transitionTo('loaded.saved');
        internalModel.triggerLater('ready');
      },

      becameValid: function becameValid(internalModel) {
        internalModel.transitionTo('uncommitted');
      },

      invokeLifecycleCallbacks: function invokeLifecycleCallbacks(internalModel) {
        internalModel.triggerLater('becameInvalid', internalModel);
      }
    }
  };

  // The created and updated states are created outside the state
  // chart so we can reopen their substates and add mixins as
  // necessary.

  function deepClone(object) {
    var clone = {};
    var value;

    for (var prop in object) {
      value = object[prop];
      if (value && typeof value === 'object') {
        clone[prop] = deepClone(value);
      } else {
        clone[prop] = value;
      }
    }

    return clone;
  }

  function mixin(original, hash) {
    for (var prop in hash) {
      original[prop] = hash[prop];
    }

    return original;
  }

  function dirtyState(options) {
    var newState = deepClone(DirtyState);
    return mixin(newState, options);
  }

  var createdState = dirtyState({
    dirtyType: 'created',
    // FLAGS
    isNew: true
  });

  createdState.invalid.rolledBack = function (internalModel) {
    internalModel.transitionTo('deleted.saved');
  };
  createdState.uncommitted.rolledBack = function (internalModel) {
    internalModel.transitionTo('deleted.saved');
  };

  var updatedState = dirtyState({
    dirtyType: 'updated'
  });

  function createdStateDeleteRecord(internalModel) {
    internalModel.transitionTo('deleted.saved');
    internalModel.send('invokeLifecycleCallbacks');
  }

  createdState.uncommitted.deleteRecord = createdStateDeleteRecord;

  createdState.invalid.deleteRecord = createdStateDeleteRecord;

  createdState.uncommitted.rollback = function (internalModel) {
    DirtyState.uncommitted.rollback.apply(this, arguments);
    internalModel.transitionTo('deleted.saved');
  };

  createdState.uncommitted.pushedData = function (internalModel) {
    internalModel.transitionTo('loaded.updated.uncommitted');
    internalModel.triggerLater('didLoad');
  };

  createdState.uncommitted.propertyWasReset = _ember['default'].K;

  function assertAgainstUnloadRecord(internalModel) {
    (0, _emberDataPrivateDebug.assert)("You can only unload a record which is not inFlight. `" + internalModel + "`", false);
  }

  updatedState.inFlight.unloadRecord = assertAgainstUnloadRecord;

  updatedState.uncommitted.deleteRecord = function (internalModel) {
    internalModel.transitionTo('deleted.uncommitted');
  };

  var RootState = {
    // FLAGS
    isEmpty: false,
    isLoading: false,
    isLoaded: false,
    isDirty: false,
    isSaving: false,
    isDeleted: false,
    isNew: false,
    isValid: true,

    // DEFAULT EVENTS

    // Trying to roll back if you're not in the dirty state
    // doesn't change your state. For example, if you're in the
    // in-flight state, rolling back the record doesn't move
    // you out of the in-flight state.
    rolledBack: _ember['default'].K,
    unloadRecord: function unloadRecord(internalModel) {
      // clear relationships before moving to deleted state
      // otherwise it fails
      internalModel.clearRelationships();
      internalModel.transitionTo('deleted.saved');
    },

    propertyWasReset: _ember['default'].K,

    // SUBSTATES

    // A record begins its lifecycle in the `empty` state.
    // If its data will come from the adapter, it will
    // transition into the `loading` state. Otherwise, if
    // the record is being created on the client, it will
    // transition into the `created` state.
    empty: {
      isEmpty: true,

      // EVENTS
      loadingData: function loadingData(internalModel, promise) {
        internalModel._loadingPromise = promise;
        internalModel.transitionTo('loading');
      },

      loadedData: function loadedData(internalModel) {
        internalModel.transitionTo('loaded.created.uncommitted');
        internalModel.triggerLater('ready');
      },

      pushedData: function pushedData(internalModel) {
        internalModel.transitionTo('loaded.saved');
        internalModel.triggerLater('didLoad');
        internalModel.triggerLater('ready');
      }
    },

    // A record enters this state when the store asks
    // the adapter for its data. It remains in this state
    // until the adapter provides the requested data.
    //
    // Usually, this process is asynchronous, using an
    // XHR to retrieve the data.
    loading: {
      // FLAGS
      isLoading: true,

      exit: function exit(internalModel) {
        internalModel._loadingPromise = null;
      },

      // EVENTS
      pushedData: function pushedData(internalModel) {
        internalModel.transitionTo('loaded.saved');
        internalModel.triggerLater('didLoad');
        internalModel.triggerLater('ready');
        //TODO this seems out of place here
        internalModel.didCleanError();
      },

      becameError: function becameError(internalModel) {
        internalModel.triggerLater('becameError', internalModel);
      },

      notFound: function notFound(internalModel) {
        internalModel.transitionTo('empty');
      }
    },

    // A record enters this state when its data is populated.
    // Most of a record's lifecycle is spent inside substates
    // of the `loaded` state.
    loaded: {
      initialState: 'saved',

      // FLAGS
      isLoaded: true,

      //TODO(Igor) Reloading now triggers a loadingData event,
      //but it should be ok?
      loadingData: _ember['default'].K,

      // SUBSTATES

      // If there are no local changes to a record, it remains
      // in the `saved` state.
      saved: {
        setup: function setup(internalModel) {
          if (internalModel.hasChangedAttributes()) {
            internalModel.adapterDidDirty();
          }
        },

        // EVENTS
        didSetProperty: _didSetProperty,

        pushedData: _ember['default'].K,

        becomeDirty: function becomeDirty(internalModel) {
          internalModel.transitionTo('updated.uncommitted');
        },

        willCommit: function willCommit(internalModel) {
          internalModel.transitionTo('updated.inFlight');
        },

        reloadRecord: function reloadRecord(internalModel, resolve) {
          resolve(internalModel.store.reloadRecord(internalModel));
        },

        deleteRecord: function deleteRecord(internalModel) {
          internalModel.transitionTo('deleted.uncommitted');
        },

        unloadRecord: function unloadRecord(internalModel) {
          // clear relationships before moving to deleted state
          // otherwise it fails
          internalModel.clearRelationships();
          internalModel.transitionTo('deleted.saved');
        },

        didCommit: function didCommit(internalModel) {
          internalModel.send('invokeLifecycleCallbacks', get(internalModel, 'lastDirtyType'));
        },

        // loaded.saved.notFound would be triggered by a failed
        // `reload()` on an unchanged record
        notFound: _ember['default'].K

      },

      // A record is in this state after it has been locally
      // created but before the adapter has indicated that
      // it has been saved.
      created: createdState,

      // A record is in this state if it has already been
      // saved to the server, but there are new local changes
      // that have not yet been saved.
      updated: updatedState
    },

    // A record is in this state if it was deleted from the store.
    deleted: {
      initialState: 'uncommitted',
      dirtyType: 'deleted',

      // FLAGS
      isDeleted: true,
      isLoaded: true,
      isDirty: true,

      // TRANSITIONS
      setup: function setup(internalModel) {
        internalModel.updateRecordArrays();
      },

      // SUBSTATES

      // When a record is deleted, it enters the `start`
      // state. It will exit this state when the record
      // starts to commit.
      uncommitted: {

        // EVENTS

        willCommit: function willCommit(internalModel) {
          internalModel.transitionTo('inFlight');
        },

        rollback: function rollback(internalModel) {
          internalModel.rollbackAttributes();
          internalModel.triggerLater('ready');
        },

        pushedData: _ember['default'].K,
        becomeDirty: _ember['default'].K,
        deleteRecord: _ember['default'].K,

        rolledBack: function rolledBack(internalModel) {
          internalModel.transitionTo('loaded.saved');
          internalModel.triggerLater('ready');
        }
      },

      // After a record starts committing, but
      // before the adapter indicates that the deletion
      // has saved to the server, a record is in the
      // `inFlight` substate of `deleted`.
      inFlight: {
        // FLAGS
        isSaving: true,

        // EVENTS

        unloadRecord: assertAgainstUnloadRecord,

        // TODO: More robust semantics around save-while-in-flight
        willCommit: _ember['default'].K,
        didCommit: function didCommit(internalModel) {
          internalModel.transitionTo('saved');

          internalModel.send('invokeLifecycleCallbacks');
        },

        becameError: function becameError(internalModel) {
          internalModel.transitionTo('uncommitted');
          internalModel.triggerLater('becameError', internalModel);
        },

        becameInvalid: function becameInvalid(internalModel) {
          internalModel.transitionTo('invalid');
          internalModel.triggerLater('becameInvalid', internalModel);
        }
      },

      // Once the adapter indicates that the deletion has
      // been saved, the record enters the `saved` substate
      // of `deleted`.
      saved: {
        // FLAGS
        isDirty: false,

        setup: function setup(internalModel) {
          internalModel.clearRelationships();
          var store = internalModel.store;
          store._dematerializeRecord(internalModel);
        },

        invokeLifecycleCallbacks: function invokeLifecycleCallbacks(internalModel) {
          internalModel.triggerLater('didDelete', internalModel);
          internalModel.triggerLater('didCommit', internalModel);
        },

        willCommit: _ember['default'].K,

        didCommit: _ember['default'].K
      },

      invalid: {
        isValid: false,

        didSetProperty: function didSetProperty(internalModel, context) {
          internalModel.removeErrorMessageFromAttribute(context.name);

          _didSetProperty(internalModel, context);

          if (!internalModel.hasErrors()) {
            this.becameValid(internalModel);
          }
        },

        becameInvalid: _ember['default'].K,
        becomeDirty: _ember['default'].K,
        deleteRecord: _ember['default'].K,
        willCommit: _ember['default'].K,

        rolledBack: function rolledBack(internalModel) {
          internalModel.clearErrorMessages();
          internalModel.transitionTo('loaded.saved');
          internalModel.triggerLater('ready');
        },

        becameValid: function becameValid(internalModel) {
          internalModel.transitionTo('uncommitted');
        }

      }
    },

    invokeLifecycleCallbacks: function invokeLifecycleCallbacks(internalModel, dirtyType) {
      if (dirtyType === 'created') {
        internalModel.triggerLater('didCreate', internalModel);
      } else {
        internalModel.triggerLater('didUpdate', internalModel);
      }

      internalModel.triggerLater('didCommit', internalModel);
    }
  };

  function wireState(object, parent, name) {
    /*jshint proto:true*/
    // TODO: Use Object.create and copy instead
    object = mixin(parent ? Object.create(parent) : {}, object);
    object.parentState = parent;
    object.stateName = name;

    for (var prop in object) {
      if (!object.hasOwnProperty(prop) || prop === 'parentState' || prop === 'stateName') {
        continue;
      }
      if (typeof object[prop] === 'object') {
        object[prop] = wireState(object[prop], object, name + "." + prop);
      }
    }

    return object;
  }

  RootState = wireState(RootState, null, "root");

  exports['default'] = RootState;
});
define("ember-data/-private/system/model", ["exports", "ember-data/-private/system/model/model", "ember-data/attr", "ember-data/-private/system/model/states", "ember-data/-private/system/model/errors"], function (exports, _emberDataPrivateSystemModelModel, _emberDataAttr, _emberDataPrivateSystemModelStates, _emberDataPrivateSystemModelErrors) {
  /**
    @module ember-data
  */

  "use strict";

  exports.RootState = _emberDataPrivateSystemModelStates["default"];
  exports.attr = _emberDataAttr["default"];
  exports.Errors = _emberDataPrivateSystemModelErrors["default"];
  exports["default"] = _emberDataPrivateSystemModelModel["default"];
});
define('ember-data/-private/system/normalize-link', ['exports'], function (exports) {
  'use strict';

  exports['default'] = _normalizeLink;

  /**
    This method normalizes a link to an "links object". If the passed link is
    already an object it's returned without any modifications.
  
    See http://jsonapi.org/format/#document-links for more information.
  
    @method _normalizeLink
    @private
    @param {String} link
    @return {Object|null}
    @for DS
  */
  function _normalizeLink(link) {
    switch (typeof link) {
      case 'object':
        return link;
      case 'string':
        return { href: link };
    }
    return null;
  }
});
define('ember-data/-private/system/normalize-model-name', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = normalizeModelName;

  /**
    All modelNames are dasherized internally. Changing this function may
    require changes to other normalization hooks (such as typeForRoot).
    @method normalizeModelName
    @public
    @param {String} modelName
    @return {String} if the adapter can generate one, an ID
    @for DS
  */
  function normalizeModelName(modelName) {
    return _ember['default'].String.dasherize(modelName);
  }
});
define('ember-data/-private/system/ordered-set', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = OrderedSet;

  var EmberOrderedSet = _ember['default'].OrderedSet;
  var guidFor = _ember['default'].guidFor;
  function OrderedSet() {
    this._super$constructor();
  }

  OrderedSet.create = function () {
    var Constructor = this;
    return new Constructor();
  };

  OrderedSet.prototype = Object.create(EmberOrderedSet.prototype);
  OrderedSet.prototype.constructor = OrderedSet;
  OrderedSet.prototype._super$constructor = EmberOrderedSet;

  OrderedSet.prototype.addWithIndex = function (obj, idx) {
    var guid = guidFor(obj);
    var presenceSet = this.presenceSet;
    var list = this.list;

    if (presenceSet[guid] === true) {
      return;
    }

    presenceSet[guid] = true;

    if (idx === undefined || idx == null) {
      list.push(obj);
    } else {
      list.splice(idx, 0, obj);
    }

    this.size += 1;

    return this;
  };
});
define('ember-data/-private/system/promise-proxies', ['exports', 'ember', 'ember-data/-private/debug'], function (exports, _ember, _emberDataPrivateDebug) {
  'use strict';

  var Promise = _ember['default'].RSVP.Promise;
  var get = _ember['default'].get;

  /**
    A `PromiseArray` is an object that acts like both an `Ember.Array`
    and a promise. When the promise is resolved the resulting value
    will be set to the `PromiseArray`'s `content` property. This makes
    it easy to create data bindings with the `PromiseArray` that will be
    updated when the promise resolves.
  
    For more information see the [Ember.PromiseProxyMixin
    documentation](/api/classes/Ember.PromiseProxyMixin.html).
  
    Example
  
    ```javascript
    var promiseArray = DS.PromiseArray.create({
      promise: $.getJSON('/some/remote/data.json')
    });
  
    promiseArray.get('length'); // 0
  
    promiseArray.then(function() {
      promiseArray.get('length'); // 100
    });
    ```
  
    @class PromiseArray
    @namespace DS
    @extends Ember.ArrayProxy
    @uses Ember.PromiseProxyMixin
  */
  var PromiseArray = _ember['default'].ArrayProxy.extend(_ember['default'].PromiseProxyMixin);

  /**
    A `PromiseObject` is an object that acts like both an `Ember.Object`
    and a promise. When the promise is resolved, then the resulting value
    will be set to the `PromiseObject`'s `content` property. This makes
    it easy to create data bindings with the `PromiseObject` that will
    be updated when the promise resolves.
  
    For more information see the [Ember.PromiseProxyMixin
    documentation](/api/classes/Ember.PromiseProxyMixin.html).
  
    Example
  
    ```javascript
    var promiseObject = DS.PromiseObject.create({
      promise: $.getJSON('/some/remote/data.json')
    });
  
    promiseObject.get('name'); // null
  
    promiseObject.then(function() {
      promiseObject.get('name'); // 'Tomster'
    });
    ```
  
    @class PromiseObject
    @namespace DS
    @extends Ember.ObjectProxy
    @uses Ember.PromiseProxyMixin
  */
  var PromiseObject = _ember['default'].ObjectProxy.extend(_ember['default'].PromiseProxyMixin);

  var promiseObject = function promiseObject(promise, label) {
    return PromiseObject.create({
      promise: Promise.resolve(promise, label)
    });
  };

  var promiseArray = function promiseArray(promise, label) {
    return PromiseArray.create({
      promise: Promise.resolve(promise, label)
    });
  };

  /**
    A PromiseManyArray is a PromiseArray that also proxies certain method calls
    to the underlying manyArray.
    Right now we proxy:
  
      * `reload()`
      * `createRecord()`
      * `on()`
      * `one()`
      * `trigger()`
      * `off()`
      * `has()`
  
    @class PromiseManyArray
    @namespace DS
    @extends Ember.ArrayProxy
  */

  function proxyToContent(method) {
    return function () {
      var content = get(this, 'content');
      return content[method].apply(content, arguments);
    };
  }

  var PromiseManyArray = PromiseArray.extend({
    reload: function reload() {
      //I don't think this should ever happen right now, but worth guarding if we refactor the async relationships
      (0, _emberDataPrivateDebug.assert)('You are trying to reload an async manyArray before it has been created', get(this, 'content'));
      return PromiseManyArray.create({
        promise: get(this, 'content').reload()
      });
    },

    createRecord: proxyToContent('createRecord'),

    on: proxyToContent('on'),

    one: proxyToContent('one'),

    trigger: proxyToContent('trigger'),

    off: proxyToContent('off'),

    has: proxyToContent('has')
  });

  var promiseManyArray = function promiseManyArray(promise, label) {
    return PromiseManyArray.create({
      promise: Promise.resolve(promise, label)
    });
  };

  exports.PromiseArray = PromiseArray;
  exports.PromiseObject = PromiseObject;
  exports.PromiseManyArray = PromiseManyArray;
  exports.promiseArray = promiseArray;
  exports.promiseObject = promiseObject;
  exports.promiseManyArray = promiseManyArray;
});
define("ember-data/-private/system/record-array-manager", ["exports", "ember", "ember-data/-private/system/record-arrays", "ember-data/-private/system/ordered-set"], function (exports, _ember, _emberDataPrivateSystemRecordArrays, _emberDataPrivateSystemOrderedSet) {
  /**
    @module ember-data
  */

  "use strict";

  var MapWithDefault = _ember["default"].MapWithDefault;var get = _ember["default"].get;

  /**
    @class RecordArrayManager
    @namespace DS
    @private
    @extends Ember.Object
  */
  exports["default"] = _ember["default"].Object.extend({
    init: function init() {
      var _this = this;

      this.filteredRecordArrays = MapWithDefault.create({
        defaultValue: function defaultValue() {
          return [];
        }
      });

      this.liveRecordArrays = MapWithDefault.create({
        defaultValue: function defaultValue(typeClass) {
          return _this.createRecordArray(typeClass);
        }
      });

      this.changedRecords = [];
      this._adapterPopulatedRecordArrays = [];
    },

    recordDidChange: function recordDidChange(record) {
      if (this.changedRecords.push(record) !== 1) {
        return;
      }

      _ember["default"].run.schedule('actions', this, this.updateRecordArrays);
    },

    recordArraysForRecord: function recordArraysForRecord(record) {
      record._recordArrays = record._recordArrays || _emberDataPrivateSystemOrderedSet["default"].create();
      return record._recordArrays;
    },

    /**
      This method is invoked whenever data is loaded into the store by the
      adapter or updated by the adapter, or when a record has changed.
       It updates all record arrays that a record belongs to.
       To avoid thrashing, it only runs at most once per run loop.
       @method updateRecordArrays
    */
    updateRecordArrays: function updateRecordArrays() {
      var _this2 = this;

      this.changedRecords.forEach(function (internalModel) {
        if (get(internalModel, 'record.isDestroyed') || get(internalModel, 'record.isDestroying') || get(internalModel, 'currentState.stateName') === 'root.deleted.saved') {
          _this2._recordWasDeleted(internalModel);
        } else {
          _this2._recordWasChanged(internalModel);
        }
      });

      this.changedRecords.length = 0;
    },

    _recordWasDeleted: function _recordWasDeleted(record) {
      var recordArrays = record._recordArrays;

      if (!recordArrays) {
        return;
      }

      recordArrays.forEach(function (array) {
        return array.removeInternalModel(record);
      });

      record._recordArrays = null;
    },

    _recordWasChanged: function _recordWasChanged(record) {
      var _this3 = this;

      var typeClass = record.type;
      var recordArrays = this.filteredRecordArrays.get(typeClass);
      var filter;
      recordArrays.forEach(function (array) {
        filter = get(array, 'filterFunction');
        _this3.updateFilterRecordArray(array, filter, typeClass, record);
      });
    },

    //Need to update live arrays on loading
    recordWasLoaded: function recordWasLoaded(record) {
      var _this4 = this;

      var typeClass = record.type;
      var recordArrays = this.filteredRecordArrays.get(typeClass);
      var filter;

      recordArrays.forEach(function (array) {
        filter = get(array, 'filterFunction');
        _this4.updateFilterRecordArray(array, filter, typeClass, record);
      });

      if (this.liveRecordArrays.has(typeClass)) {
        var liveRecordArray = this.liveRecordArrays.get(typeClass);
        this._addRecordToRecordArray(liveRecordArray, record);
      }
    },
    /**
      Update an individual filter.
       @method updateFilterRecordArray
      @param {DS.FilteredRecordArray} array
      @param {Function} filter
      @param {DS.Model} typeClass
      @param {InternalModel} record
    */
    updateFilterRecordArray: function updateFilterRecordArray(array, filter, typeClass, record) {
      var shouldBeInArray = filter(record.getRecord());
      var recordArrays = this.recordArraysForRecord(record);
      if (shouldBeInArray) {
        this._addRecordToRecordArray(array, record);
      } else {
        recordArrays["delete"](array);
        array.removeInternalModel(record);
      }
    },

    _addRecordToRecordArray: function _addRecordToRecordArray(array, record) {
      var recordArrays = this.recordArraysForRecord(record);
      if (!recordArrays.has(array)) {
        array.addInternalModel(record);
        recordArrays.add(array);
      }
    },

    populateLiveRecordArray: function populateLiveRecordArray(array, modelName) {
      var typeMap = this.store.typeMapFor(modelName);
      var records = typeMap.records;
      var record;

      for (var i = 0; i < records.length; i++) {
        record = records[i];

        if (!record.isDeleted() && !record.isEmpty()) {
          this._addRecordToRecordArray(array, record);
        }
      }
    },

    /**
      This method is invoked if the `filterFunction` property is
      changed on a `DS.FilteredRecordArray`.
       It essentially re-runs the filter from scratch. This same
      method is invoked when the filter is created in th first place.
       @method updateFilter
      @param {Array} array
      @param {String} modelName
      @param {Function} filter
    */
    updateFilter: function updateFilter(array, modelName, filter) {
      var typeMap = this.store.typeMapFor(modelName);
      var records = typeMap.records;
      var record;

      for (var i = 0; i < records.length; i++) {
        record = records[i];

        if (!record.isDeleted() && !record.isEmpty()) {
          this.updateFilterRecordArray(array, filter, modelName, record);
        }
      }
    },

    /**
      Get the `DS.RecordArray` for a type, which contains all loaded records of
      given type.
       @method liveRecordArrayFor
      @param {Class} typeClass
      @return {DS.RecordArray}
    */
    liveRecordArrayFor: function liveRecordArrayFor(typeClass) {
      return this.liveRecordArrays.get(typeClass);
    },

    /**
      Create a `DS.RecordArray` for a type.
       @method createRecordArray
      @param {Class} typeClass
      @return {DS.RecordArray}
    */
    createRecordArray: function createRecordArray(typeClass) {
      var array = _emberDataPrivateSystemRecordArrays.RecordArray.create({
        type: typeClass,
        content: _ember["default"].A(),
        store: this.store,
        isLoaded: true,
        manager: this
      });

      return array;
    },

    /**
      Create a `DS.FilteredRecordArray` for a type and register it for updates.
       @method createFilteredRecordArray
      @param {DS.Model} typeClass
      @param {Function} filter
      @param {Object} query (optional
      @return {DS.FilteredRecordArray}
    */
    createFilteredRecordArray: function createFilteredRecordArray(typeClass, filter, query) {
      var array = _emberDataPrivateSystemRecordArrays.FilteredRecordArray.create({
        query: query,
        type: typeClass,
        content: _ember["default"].A(),
        store: this.store,
        manager: this,
        filterFunction: filter
      });

      this.registerFilteredRecordArray(array, typeClass, filter);

      return array;
    },

    /**
      Create a `DS.AdapterPopulatedRecordArray` for a type with given query.
       @method createAdapterPopulatedRecordArray
      @param {DS.Model} typeClass
      @param {Object} query
      @return {DS.AdapterPopulatedRecordArray}
    */
    createAdapterPopulatedRecordArray: function createAdapterPopulatedRecordArray(typeClass, query) {
      var array = _emberDataPrivateSystemRecordArrays.AdapterPopulatedRecordArray.create({
        type: typeClass,
        query: query,
        content: _ember["default"].A(),
        store: this.store,
        manager: this
      });

      this._adapterPopulatedRecordArrays.push(array);

      return array;
    },

    /**
      Register a RecordArray for a given type to be backed by
      a filter function. This will cause the array to update
      automatically when records of that type change attribute
      values or states.
       @method registerFilteredRecordArray
      @param {DS.RecordArray} array
      @param {DS.Model} typeClass
      @param {Function} filter
    */
    registerFilteredRecordArray: function registerFilteredRecordArray(array, typeClass, filter) {
      var recordArrays = this.filteredRecordArrays.get(typeClass);
      recordArrays.push(array);

      this.updateFilter(array, typeClass, filter);
    },

    /**
      Unregister a RecordArray.
      So manager will not update this array.
       @method unregisterRecordArray
      @param {DS.RecordArray} array
    */
    unregisterRecordArray: function unregisterRecordArray(array) {
      var typeClass = array.type;

      // unregister filtered record array
      var recordArrays = this.filteredRecordArrays.get(typeClass);
      var removedFromFiltered = remove(recordArrays, array);

      // remove from adapter populated record array
      var removedFromAdapterPopulated = remove(this._adapterPopulatedRecordArrays, array);

      if (!removedFromFiltered && !removedFromAdapterPopulated) {

        // unregister live record array
        if (this.liveRecordArrays.has(typeClass)) {
          var liveRecordArrayForType = this.liveRecordArrayFor(typeClass);
          if (array === liveRecordArrayForType) {
            this.liveRecordArrays["delete"](typeClass);
          }
        }
      }
    },

    willDestroy: function willDestroy() {
      this._super.apply(this, arguments);

      this.filteredRecordArrays.forEach(function (value) {
        return flatten(value).forEach(destroy);
      });
      this.liveRecordArrays.forEach(destroy);
      this._adapterPopulatedRecordArrays.forEach(destroy);
    }
  });

  function destroy(entry) {
    entry.destroy();
  }

  function flatten(list) {
    var length = list.length;
    var result = _ember["default"].A();

    for (var i = 0; i < length; i++) {
      result = result.concat(list[i]);
    }

    return result;
  }

  function remove(array, item) {
    var index = array.indexOf(item);

    if (index !== -1) {
      array.splice(index, 1);
      return true;
    }

    return false;
  }
});
define("ember-data/-private/system/record-arrays/adapter-populated-record-array", ["exports", "ember", "ember-data/-private/system/record-arrays/record-array", "ember-data/-private/system/clone-null", "ember-data/-private/features"], function (exports, _ember, _emberDataPrivateSystemRecordArraysRecordArray, _emberDataPrivateSystemCloneNull, _emberDataPrivateFeatures) {
  "use strict";

  /**
    @module ember-data
  */

  var get = _ember["default"].get;

  /**
    Represents an ordered list of records whose order and membership is
    determined by the adapter. For example, a query sent to the adapter
    may trigger a search on the server, whose results would be loaded
    into an instance of the `AdapterPopulatedRecordArray`.
  
    @class AdapterPopulatedRecordArray
    @namespace DS
    @extends DS.RecordArray
  */
  exports["default"] = _emberDataPrivateSystemRecordArraysRecordArray["default"].extend({
    query: null,

    replace: function replace() {
      var type = get(this, 'type').toString();
      throw new Error("The result of a server query (on " + type + ") is immutable.");
    },

    _update: function _update() {
      var store = get(this, 'store');
      var modelName = get(this, 'type.modelName');
      var query = get(this, 'query');

      return store._query(modelName, query, this);
    },

    /**
      @method loadRecords
      @param {Array} records
      @param {Object} payload normalized payload
      @private
    */
    loadRecords: function loadRecords(records, payload) {
      var _this = this;

      //TODO Optimize
      var internalModels = _ember["default"].A(records).mapBy('_internalModel');
      this.setProperties({
        content: _ember["default"].A(internalModels),
        isLoaded: true,
        isUpdating: false,
        meta: (0, _emberDataPrivateSystemCloneNull["default"])(payload.meta)
      });

      if (false) {
        this.set('links', (0, _emberDataPrivateSystemCloneNull["default"])(payload.links));
      }

      internalModels.forEach(function (record) {
        _this.manager.recordArraysForRecord(record).add(_this);
      });

      // TODO: should triggering didLoad event be the last action of the runLoop?
      _ember["default"].run.once(this, 'trigger', 'didLoad');
    }
  });
});
define('ember-data/-private/system/record-arrays/filtered-record-array', ['exports', 'ember', 'ember-data/-private/system/record-arrays/record-array'], function (exports, _ember, _emberDataPrivateSystemRecordArraysRecordArray) {
  'use strict';

  /**
    @module ember-data
  */

  var get = _ember['default'].get;

  /**
    Represents a list of records whose membership is determined by the
    store. As records are created, loaded, or modified, the store
    evaluates them to determine if they should be part of the record
    array.
  
    @class FilteredRecordArray
    @namespace DS
    @extends DS.RecordArray
  */
  exports['default'] = _emberDataPrivateSystemRecordArraysRecordArray['default'].extend({
    /**
      The filterFunction is a function used to test records from the store to
      determine if they should be part of the record array.
       Example
       ```javascript
      var allPeople = store.peekAll('person');
      allPeople.mapBy('name'); // ["Tom Dale", "Yehuda Katz", "Trek Glowacki"]
       var people = store.filter('person', function(person) {
        if (person.get('name').match(/Katz$/)) { return true; }
      });
      people.mapBy('name'); // ["Yehuda Katz"]
       var notKatzFilter = function(person) {
        return !person.get('name').match(/Katz$/);
      };
      people.set('filterFunction', notKatzFilter);
      people.mapBy('name'); // ["Tom Dale", "Trek Glowacki"]
      ```
       @method filterFunction
      @param {DS.Model} record
      @return {Boolean} `true` if the record should be in the array
    */
    filterFunction: null,
    isLoaded: true,

    replace: function replace() {
      var type = get(this, 'type').toString();
      throw new Error("The result of a client-side filter (on " + type + ") is immutable.");
    },

    /**
      @method updateFilter
      @private
    */
    _updateFilter: function _updateFilter() {
      var manager = get(this, 'manager');
      manager.updateFilter(this, get(this, 'type'), get(this, 'filterFunction'));
    },

    updateFilter: _ember['default'].observer('filterFunction', function () {
      _ember['default'].run.once(this, this._updateFilter);
    })
  });
});
define("ember-data/-private/system/record-arrays/record-array", ["exports", "ember", "ember-data/-private/system/promise-proxies", "ember-data/-private/system/snapshot-record-array"], function (exports, _ember, _emberDataPrivateSystemPromiseProxies, _emberDataPrivateSystemSnapshotRecordArray) {
  /**
    @module ember-data
  */

  "use strict";

  var get = _ember["default"].get;
  var set = _ember["default"].set;

  /**
    A record array is an array that contains records of a certain type. The record
    array materializes records as needed when they are retrieved for the first
    time. You should not create record arrays yourself. Instead, an instance of
    `DS.RecordArray` or its subclasses will be returned by your application's store
    in response to queries.
  
    @class RecordArray
    @namespace DS
    @extends Ember.ArrayProxy
    @uses Ember.Evented
  */

  exports["default"] = _ember["default"].ArrayProxy.extend(_ember["default"].Evented, {
    /**
      The model type contained by this record array.
       @property type
      @type DS.Model
    */
    type: null,

    /**
      The array of client ids backing the record array. When a
      record is requested from the record array, the record
      for the client id at the same index is materialized, if
      necessary, by the store.
       @property content
      @private
      @type Ember.Array
    */
    content: null,

    /**
      The flag to signal a `RecordArray` is finished loading data.
       Example
       ```javascript
      var people = store.peekAll('person');
      people.get('isLoaded'); // true
      ```
       @property isLoaded
      @type Boolean
    */
    isLoaded: false,
    /**
      The flag to signal a `RecordArray` is currently loading data.
       Example
       ```javascript
      var people = store.peekAll('person');
      people.get('isUpdating'); // false
      people.update();
      people.get('isUpdating'); // true
      ```
       @property isUpdating
      @type Boolean
    */
    isUpdating: false,

    /**
      The store that created this record array.
       @property store
      @private
      @type DS.Store
    */
    store: null,

    /**
      Retrieves an object from the content by index.
       @method objectAtContent
      @private
      @param {Number} index
      @return {DS.Model} record
    */
    objectAtContent: function objectAtContent(index) {
      var content = get(this, 'content');
      var internalModel = content.objectAt(index);
      return internalModel && internalModel.getRecord();
    },

    /**
      Used to get the latest version of all of the records in this array
      from the adapter.
       Example
       ```javascript
      var people = store.peekAll('person');
      people.get('isUpdating'); // false
       people.update().then(function() {
        people.get('isUpdating'); // false
      });
       people.get('isUpdating'); // true
      ```
       @method update
    */
    update: function update() {
      if (get(this, 'isUpdating')) {
        return;
      }

      this.set('isUpdating', true);
      return this._update();
    },

    /*
      Update this RecordArray and return a promise which resolves once the update
      is finished.
     */
    _update: function _update() {
      var store = get(this, 'store');
      var modelName = get(this, 'type.modelName');

      return store.findAll(modelName, { reload: true });
    },

    /**
      Adds an internal model to the `RecordArray` without duplicates
       @method addInternalModel
      @private
      @param {InternalModel} internalModel
      @param {number} an optional index to insert at
    */
    addInternalModel: function addInternalModel(internalModel, idx) {
      var content = get(this, 'content');
      if (idx === undefined) {
        content.addObject(internalModel);
      } else if (!content.contains(internalModel)) {
        content.insertAt(idx, internalModel);
      }
    },

    /**
      Removes an internalModel to the `RecordArray`.
       @method removeInternalModel
      @private
      @param {InternalModel} internalModel
    */
    removeInternalModel: function removeInternalModel(internalModel) {
      get(this, 'content').removeObject(internalModel);
    },

    /**
      Saves all of the records in the `RecordArray`.
       Example
       ```javascript
      var messages = store.peekAll('message');
      messages.forEach(function(message) {
        message.set('hasBeenSeen', true);
      });
      messages.save();
      ```
       @method save
      @return {DS.PromiseArray} promise
    */
    save: function save() {
      var recordArray = this;
      var promiseLabel = "DS: RecordArray#save " + get(this, 'type');
      var promise = _ember["default"].RSVP.all(this.invoke("save"), promiseLabel).then(function (array) {
        return recordArray;
      }, null, "DS: RecordArray#save return RecordArray");

      return _emberDataPrivateSystemPromiseProxies.PromiseArray.create({ promise: promise });
    },

    _dissociateFromOwnRecords: function _dissociateFromOwnRecords() {
      var _this = this;

      this.get('content').forEach(function (record) {
        var recordArrays = record._recordArrays;

        if (recordArrays) {
          recordArrays["delete"](_this);
        }
      });
    },

    /**
      @method _unregisterFromManager
      @private
    */
    _unregisterFromManager: function _unregisterFromManager() {
      var manager = get(this, 'manager');
      manager.unregisterRecordArray(this);
    },

    willDestroy: function willDestroy() {
      this._unregisterFromManager();
      this._dissociateFromOwnRecords();
      set(this, 'content', undefined);
      this._super.apply(this, arguments);
    },

    createSnapshot: function createSnapshot(options) {
      var meta = this.get('meta');
      return new _emberDataPrivateSystemSnapshotRecordArray["default"](this, meta, options);
    }
  });
});
define("ember-data/-private/system/record-arrays", ["exports", "ember-data/-private/system/record-arrays/record-array", "ember-data/-private/system/record-arrays/filtered-record-array", "ember-data/-private/system/record-arrays/adapter-populated-record-array"], function (exports, _emberDataPrivateSystemRecordArraysRecordArray, _emberDataPrivateSystemRecordArraysFilteredRecordArray, _emberDataPrivateSystemRecordArraysAdapterPopulatedRecordArray) {
  /**
    @module ember-data
  */

  "use strict";

  exports.RecordArray = _emberDataPrivateSystemRecordArraysRecordArray["default"];
  exports.FilteredRecordArray = _emberDataPrivateSystemRecordArraysFilteredRecordArray["default"];
  exports.AdapterPopulatedRecordArray = _emberDataPrivateSystemRecordArraysAdapterPopulatedRecordArray["default"];
});
define('ember-data/-private/system/references/belongs-to', ['exports', 'ember-data/model', 'ember', 'ember-data/-private/system/references/reference', 'ember-data/-private/debug'], function (exports, _emberDataModel, _ember, _emberDataPrivateSystemReferencesReference, _emberDataPrivateDebug) {
  'use strict';

  var BelongsToReference = function BelongsToReference(store, parentInternalModel, belongsToRelationship) {
    this._super$constructor(store, parentInternalModel);
    this.belongsToRelationship = belongsToRelationship;
    this.type = belongsToRelationship.relationshipMeta.type;
    this.parent = parentInternalModel.recordReference;

    // TODO inverse
  };

  BelongsToReference.prototype = Object.create(_emberDataPrivateSystemReferencesReference['default'].prototype);
  BelongsToReference.prototype.constructor = BelongsToReference;
  BelongsToReference.prototype._super$constructor = _emberDataPrivateSystemReferencesReference['default'];

  BelongsToReference.prototype.remoteType = function () {
    if (this.belongsToRelationship.link) {
      return "link";
    }

    return "id";
  };

  BelongsToReference.prototype.id = function () {
    var inverseRecord = this.belongsToRelationship.inverseRecord;
    return inverseRecord && inverseRecord.id;
  };

  BelongsToReference.prototype.link = function () {
    return this.belongsToRelationship.link;
  };

  BelongsToReference.prototype.meta = function () {
    return this.belongsToRelationship.meta;
  };

  BelongsToReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return _ember['default'].RSVP.resolve(objectOrPromise).then(function (data) {
      var record;

      if (data instanceof _emberDataModel['default']) {
        record = data;
      } else {
        record = _this.store.push(data);
      }

      (0, _emberDataPrivateDebug.assertPolymorphicType)(_this.internalModel, _this.belongsToRelationship.relationshipMeta, record._internalModel);

      _this.belongsToRelationship.setCanonicalRecord(record._internalModel);

      return record;
    });
  };

  BelongsToReference.prototype.value = function () {
    var inverseRecord = this.belongsToRelationship.inverseRecord;

    if (inverseRecord && inverseRecord.record) {
      return inverseRecord.record;
    }

    return null;
  };

  BelongsToReference.prototype.load = function () {
    var _this2 = this;

    if (this.remoteType() === "id") {
      return this.belongsToRelationship.getRecord();
    }

    if (this.remoteType() === "link") {
      return this.belongsToRelationship.findLink().then(function (internalModel) {
        return _this2.value();
      });
    }
  };

  BelongsToReference.prototype.reload = function () {
    var _this3 = this;

    return this.belongsToRelationship.reload().then(function (internalModel) {
      return _this3.value();
    });
  };

  exports['default'] = BelongsToReference;
});
define('ember-data/-private/system/references/has-many', ['exports', 'ember', 'ember-data/-private/system/references/reference', 'ember-data/-private/debug'], function (exports, _ember, _emberDataPrivateSystemReferencesReference, _emberDataPrivateDebug) {
  'use strict';

  var get = _ember['default'].get;

  var HasManyReference = function HasManyReference(store, parentInternalModel, hasManyRelationship) {
    this._super$constructor(store, parentInternalModel);
    this.hasManyRelationship = hasManyRelationship;
    this.type = hasManyRelationship.relationshipMeta.type;
    this.parent = parentInternalModel.recordReference;

    // TODO inverse
  };

  HasManyReference.prototype = Object.create(_emberDataPrivateSystemReferencesReference['default'].prototype);
  HasManyReference.prototype.constructor = HasManyReference;
  HasManyReference.prototype._super$constructor = _emberDataPrivateSystemReferencesReference['default'];

  HasManyReference.prototype.remoteType = function () {
    if (this.hasManyRelationship.link) {
      return "link";
    }

    return "ids";
  };

  HasManyReference.prototype.link = function () {
    return this.hasManyRelationship.link;
  };

  HasManyReference.prototype.ids = function () {
    var members = this.hasManyRelationship.members;
    var ids = members.toArray().map(function (internalModel) {
      return internalModel.id;
    });

    return ids;
  };

  HasManyReference.prototype.meta = function () {
    return this.hasManyRelationship.manyArray.meta;
  };

  HasManyReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return _ember['default'].RSVP.resolve(objectOrPromise).then(function (payload) {
      var array = payload;
      if (typeof payload === "object" && payload.data) {
        array = payload.data;
      }

      var internalModels = array.map(function (obj) {
        var record = _this.store.push(obj);

        (0, _emberDataPrivateDebug.runInDebug)(function () {
          var relationshipMeta = _this.hasManyRelationship.relationshipMeta;
          (0, _emberDataPrivateDebug.assertPolymorphicType)(_this.internalModel, relationshipMeta, record._internalModel);
        });

        return record._internalModel;
      });

      _this.hasManyRelationship.computeChanges(internalModels);

      return _this.hasManyRelationship.manyArray;
    });
  };

  HasManyReference.prototype._isLoaded = function () {
    var hasData = get(this.hasManyRelationship, 'hasData');
    if (!hasData) {
      return false;
    }

    var members = this.hasManyRelationship.members.toArray();
    var isEveryLoaded = members.every(function (internalModel) {
      return internalModel.isLoaded() === true;
    });

    return isEveryLoaded;
  };

  HasManyReference.prototype.value = function () {
    if (this._isLoaded()) {
      return this.hasManyRelationship.manyArray;
    }

    return null;
  };

  HasManyReference.prototype.load = function () {
    if (!this._isLoaded()) {
      return this.hasManyRelationship.getRecords();
    }

    var manyArray = this.hasManyRelationship.manyArray;
    return _ember['default'].RSVP.resolve(manyArray);
  };

  HasManyReference.prototype.reload = function () {
    return this.hasManyRelationship.reload();
  };

  exports['default'] = HasManyReference;
});
define('ember-data/-private/system/references/record', ['exports', 'ember', 'ember-data/-private/system/references/reference'], function (exports, _ember, _emberDataPrivateSystemReferencesReference) {
  'use strict';

  var RecordReference = function RecordReference(store, internalModel) {
    this._super$constructor(store, internalModel);
    this.type = internalModel.modelName;
    this._id = internalModel.id;
  };

  RecordReference.prototype = Object.create(_emberDataPrivateSystemReferencesReference['default'].prototype);
  RecordReference.prototype.constructor = RecordReference;
  RecordReference.prototype._super$constructor = _emberDataPrivateSystemReferencesReference['default'];

  RecordReference.prototype.id = function () {
    return this._id;
  };

  RecordReference.prototype.remoteType = function () {
    return 'identity';
  };

  RecordReference.prototype.push = function (objectOrPromise) {
    var _this = this;

    return _ember['default'].RSVP.resolve(objectOrPromise).then(function (data) {
      var record = _this.store.push(data);
      return record;
    });
  };

  RecordReference.prototype.value = function () {
    return this.internalModel.record;
  };

  RecordReference.prototype.load = function () {
    return this.store.findRecord(this.type, this._id);
  };

  RecordReference.prototype.reload = function () {
    var record = this.value();
    if (record) {
      return record.reload();
    }

    return this.load();
  };

  exports['default'] = RecordReference;
});
define("ember-data/-private/system/references/reference", ["exports"], function (exports) {
  "use strict";

  var Reference = function Reference(store, internalModel) {
    this.store = store;
    this.internalModel = internalModel;
  };

  Reference.prototype = {
    constructor: Reference
  };

  exports["default"] = Reference;
});
define('ember-data/-private/system/references', ['exports', 'ember-data/-private/system/references/record', 'ember-data/-private/system/references/belongs-to', 'ember-data/-private/system/references/has-many'], function (exports, _emberDataPrivateSystemReferencesRecord, _emberDataPrivateSystemReferencesBelongsTo, _emberDataPrivateSystemReferencesHasMany) {
  'use strict';

  exports.RecordReference = _emberDataPrivateSystemReferencesRecord['default'];
  exports.BelongsToReference = _emberDataPrivateSystemReferencesBelongsTo['default'];
  exports.HasManyReference = _emberDataPrivateSystemReferencesHasMany['default'];
});
define('ember-data/-private/system/relationship-meta', ['exports', 'ember-inflector', 'ember-data/-private/system/normalize-model-name'], function (exports, _emberInflector, _emberDataPrivateSystemNormalizeModelName) {
  'use strict';

  exports.typeForRelationshipMeta = typeForRelationshipMeta;
  exports.relationshipFromMeta = relationshipFromMeta;

  function typeForRelationshipMeta(meta) {
    var modelName;

    modelName = meta.type || meta.key;
    if (meta.kind === 'hasMany') {
      modelName = (0, _emberInflector.singularize)((0, _emberDataPrivateSystemNormalizeModelName['default'])(modelName));
    }
    return modelName;
  }

  function relationshipFromMeta(meta) {
    return {
      key: meta.key,
      kind: meta.kind,
      type: typeForRelationshipMeta(meta),
      options: meta.options,
      parentType: meta.parentType,
      isRelationship: true
    };
  }
});
define("ember-data/-private/system/relationships/belongs-to", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/normalize-model-name"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemNormalizeModelName) {
  "use strict";

  exports["default"] = belongsTo;

  /**
    `DS.belongsTo` is used to define One-To-One and One-To-Many
    relationships on a [DS.Model](/api/data/classes/DS.Model.html).
  
  
    `DS.belongsTo` takes an optional hash as a second parameter, currently
    supported options are:
  
    - `async`: A boolean value used to explicitly declare this to be an async relationship.
    - `inverse`: A string used to identify the inverse property on a
      related model in a One-To-Many relationship. See [Explicit Inverses](#toc_explicit-inverses)
  
    #### One-To-One
    To declare a one-to-one relationship between two models, use
    `DS.belongsTo`:
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      profile: DS.belongsTo('profile')
    });
    ```
  
    ```app/models/profile.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      user: DS.belongsTo('user')
    });
    ```
  
    #### One-To-Many
    To declare a one-to-many relationship between two models, use
    `DS.belongsTo` in combination with `DS.hasMany`, like this:
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      comments: DS.hasMany('comment')
    });
    ```
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      post: DS.belongsTo('post')
    });
    ```
  
    You can avoid passing a string as the first parameter. In that case Ember Data
    will infer the type from the key name.
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      post: DS.belongsTo()
    });
    ```
  
    will lookup for a Post type.
  
    @namespace
    @method belongsTo
    @for DS
    @param {String} modelName (optional) type of the relationship
    @param {Object} options (optional) a hash of options
    @return {Ember.computed} relationship
  */
  function belongsTo(modelName, options) {
    var opts, userEnteredModelName;
    if (typeof modelName === 'object') {
      opts = modelName;
      userEnteredModelName = undefined;
    } else {
      opts = options;
      userEnteredModelName = modelName;
    }

    if (typeof userEnteredModelName === 'string') {
      userEnteredModelName = (0, _emberDataPrivateSystemNormalizeModelName["default"])(userEnteredModelName);
    }

    (0, _emberDataPrivateDebug.assert)("The first argument to DS.belongsTo must be a string representing a model type key, not an instance of " + _ember["default"].inspect(userEnteredModelName) + ". E.g., to define a relation to the Person model, use DS.belongsTo('person')", typeof userEnteredModelName === 'string' || typeof userEnteredModelName === 'undefined');

    opts = opts || {};

    var meta = {
      type: userEnteredModelName,
      isRelationship: true,
      options: opts,
      kind: 'belongsTo',
      key: null
    };

    return _ember["default"].computed({
      get: function get(key) {
        if (opts.hasOwnProperty('serialize')) {
          (0, _emberDataPrivateDebug.warn)("You provided a serialize option on the \"" + key + "\" property in the \"" + this._internalModel.modelName + "\" class, this belongs in the serializer. See DS.Serializer and it's implementations http://emberjs.com/api/data/classes/DS.Serializer.html", false, {
            id: 'ds.model.serialize-option-in-belongs-to'
          });
        }

        if (opts.hasOwnProperty('embedded')) {
          (0, _emberDataPrivateDebug.warn)("You provided an embedded option on the \"" + key + "\" property in the \"" + this._internalModel.modelName + "\" class, this belongs in the serializer. See DS.EmbeddedRecordsMixin http://emberjs.com/api/data/classes/DS.EmbeddedRecordsMixin.html", false, {
            id: 'ds.model.embedded-option-in-belongs-to'
          });
        }

        return this._internalModel._relationships.get(key).getRecord();
      },
      set: function set(key, value) {
        if (value === undefined) {
          value = null;
        }
        if (value && value.then) {
          this._internalModel._relationships.get(key).setRecordPromise(value);
        } else if (value) {
          this._internalModel._relationships.get(key).setRecord(value._internalModel);
        } else {
          this._internalModel._relationships.get(key).setRecord(value);
        }

        return this._internalModel._relationships.get(key).getRecord();
      }
    }).meta(meta);
  }

  /*
    These observers observe all `belongsTo` relationships on the record. See
    `relationships/ext` to see how these observers get their dependencies.
  */
  var BelongsToMixin = _ember["default"].Mixin.create({
    notifyBelongsToChanged: function notifyBelongsToChanged(key) {
      this.notifyPropertyChange(key);
    }
  });
  exports.BelongsToMixin = BelongsToMixin;
});
define("ember-data/-private/system/relationships/ext", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/relationship-meta", "ember-data/-private/system/empty-object"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemRelationshipMeta, _emberDataPrivateSystemEmptyObject) {
  "use strict";

  var get = _ember["default"].get;
  var Map = _ember["default"].Map;
  var MapWithDefault = _ember["default"].MapWithDefault;

  var relationshipsDescriptor = _ember["default"].computed(function () {
    if (_ember["default"].testing === true && relationshipsDescriptor._cacheable === true) {
      relationshipsDescriptor._cacheable = false;
    }

    var map = new MapWithDefault({
      defaultValue: function defaultValue() {
        return [];
      }
    });

    // Loop through each computed property on the class
    this.eachComputedProperty(function (name, meta) {
      // If the computed property is a relationship, add
      // it to the map.
      if (meta.isRelationship) {
        meta.key = name;
        var relationshipsForType = map.get((0, _emberDataPrivateSystemRelationshipMeta.typeForRelationshipMeta)(meta));

        relationshipsForType.push({
          name: name,
          kind: meta.kind
        });
      }
    });

    return map;
  }).readOnly();

  var relatedTypesDescriptor = _ember["default"].computed(function () {
    var _this = this;

    if (_ember["default"].testing === true && relatedTypesDescriptor._cacheable === true) {
      relatedTypesDescriptor._cacheable = false;
    }

    var modelName;
    var types = _ember["default"].A();

    // Loop through each computed property on the class,
    // and create an array of the unique types involved
    // in relationships
    this.eachComputedProperty(function (name, meta) {
      if (meta.isRelationship) {
        meta.key = name;
        modelName = (0, _emberDataPrivateSystemRelationshipMeta.typeForRelationshipMeta)(meta);

        (0, _emberDataPrivateDebug.assert)("You specified a hasMany (" + meta.type + ") on " + meta.parentType + " but " + meta.type + " was not found.", modelName);

        if (!types.contains(modelName)) {
          (0, _emberDataPrivateDebug.assert)("Trying to sideload " + name + " on " + _this.toString() + " but the type doesn't exist.", !!modelName);
          types.push(modelName);
        }
      }
    });

    return types;
  }).readOnly();

  var relationshipsByNameDescriptor = _ember["default"].computed(function () {
    if (_ember["default"].testing === true && relationshipsByNameDescriptor._cacheable === true) {
      relationshipsByNameDescriptor._cacheable = false;
    }

    var map = Map.create();

    this.eachComputedProperty(function (name, meta) {
      if (meta.isRelationship) {
        meta.key = name;
        var relationship = (0, _emberDataPrivateSystemRelationshipMeta.relationshipFromMeta)(meta);
        relationship.type = (0, _emberDataPrivateSystemRelationshipMeta.typeForRelationshipMeta)(meta);
        map.set(name, relationship);
      }
    });

    return map;
  }).readOnly();

  /**
    @module ember-data
  */

  /*
    This file defines several extensions to the base `DS.Model` class that
    add support for one-to-many relationships.
  */

  /**
    @class Model
    @namespace DS
  */
  var DidDefinePropertyMixin = _ember["default"].Mixin.create({

    /**
      This Ember.js hook allows an object to be notified when a property
      is defined.
       In this case, we use it to be notified when an Ember Data user defines a
      belongs-to relationship. In that case, we need to set up observers for
      each one, allowing us to track relationship changes and automatically
      reflect changes in the inverse has-many array.
       This hook passes the class being set up, as well as the key and value
      being defined. So, for example, when the user does this:
       ```javascript
      DS.Model.extend({
        parent: DS.belongsTo('user')
      });
      ```
       This hook would be called with "parent" as the key and the computed
      property returned by `DS.belongsTo` as the value.
       @method didDefineProperty
      @param {Object} proto
      @param {String} key
      @param {Ember.ComputedProperty} value
    */
    didDefineProperty: function didDefineProperty(proto, key, value) {
      // Check if the value being set is a computed property.
      if (value instanceof _ember["default"].ComputedProperty) {

        // If it is, get the metadata for the relationship. This is
        // populated by the `DS.belongsTo` helper when it is creating
        // the computed property.
        var meta = value.meta();

        meta.parentType = proto.constructor;
      }
    }
  });

  exports.DidDefinePropertyMixin = DidDefinePropertyMixin;

  /*
    These DS.Model extensions add class methods that provide relationship
    introspection abilities about relationships.
  
    A note about the computed properties contained here:
  
    **These properties are effectively sealed once called for the first time.**
    To avoid repeatedly doing expensive iteration over a model's fields, these
    values are computed once and then cached for the remainder of the runtime of
    your application.
  
    If your application needs to modify a class after its initial definition
    (for example, using `reopen()` to add additional attributes), make sure you
    do it before using your model with the store, which uses these properties
    extensively.
  */

  var RelationshipsClassMethodsMixin = _ember["default"].Mixin.create({

    /**
      For a given relationship name, returns the model type of the relationship.
       For example, if you define a model like this:
       ```app/models/post.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        comments: DS.hasMany('comment')
      });
     ```
       Calling `App.Post.typeForRelationship('comments')` will return `App.Comment`.
       @method typeForRelationship
      @static
      @param {String} name the name of the relationship
      @param {store} store an instance of DS.Store
      @return {DS.Model} the type of the relationship, or undefined
    */
    typeForRelationship: function typeForRelationship(name, store) {
      var relationship = get(this, 'relationshipsByName').get(name);
      return relationship && store.modelFor(relationship.type);
    },

    inverseMap: _ember["default"].computed(function () {
      return new _emberDataPrivateSystemEmptyObject["default"]();
    }),

    /**
      Find the relationship which is the inverse of the one asked for.
       For example, if you define models like this:
       ```app/models/post.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        comments: DS.hasMany('message')
      });
      ```
       ```app/models/message.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        owner: DS.belongsTo('post')
      });
      ```
       App.Post.inverseFor('comments') -> { type: App.Message, name: 'owner', kind: 'belongsTo' }
      App.Message.inverseFor('owner') -> { type: App.Post, name: 'comments', kind: 'hasMany' }
       @method inverseFor
      @static
      @param {String} name the name of the relationship
      @return {Object} the inverse relationship, or null
    */
    inverseFor: function inverseFor(name, store) {
      var inverseMap = get(this, 'inverseMap');
      if (inverseMap[name]) {
        return inverseMap[name];
      } else {
        var inverse = this._findInverseFor(name, store);
        inverseMap[name] = inverse;
        return inverse;
      }
    },

    //Calculate the inverse, ignoring the cache
    _findInverseFor: function _findInverseFor(name, store) {

      var inverseType = this.typeForRelationship(name, store);
      if (!inverseType) {
        return null;
      }

      var propertyMeta = this.metaForProperty(name);
      //If inverse is manually specified to be null, like  `comments: DS.hasMany('message', { inverse: null })`
      var options = propertyMeta.options;
      if (options.inverse === null) {
        return null;
      }

      var inverseName, inverseKind, inverse;

      //If inverse is specified manually, return the inverse
      if (options.inverse) {
        inverseName = options.inverse;
        inverse = _ember["default"].get(inverseType, 'relationshipsByName').get(inverseName);

        (0, _emberDataPrivateDebug.assert)("We found no inverse relationships by the name of '" + inverseName + "' on the '" + inverseType.modelName + "' model. This is most likely due to a missing attribute on your model definition.", !_ember["default"].isNone(inverse));

        inverseKind = inverse.kind;
      } else {
        //No inverse was specified manually, we need to use a heuristic to guess one
        if (propertyMeta.type === propertyMeta.parentType.modelName) {
          (0, _emberDataPrivateDebug.warn)("Detected a reflexive relationship by the name of '" + name + "' without an inverse option. Look at http://emberjs.com/guides/models/defining-models/#toc_reflexive-relation for how to explicitly specify inverses.", false, {
            id: 'ds.model.reflexive-relationship-without-inverse'
          });
        }

        var possibleRelationships = findPossibleInverses(this, inverseType);

        if (possibleRelationships.length === 0) {
          return null;
        }

        var filteredRelationships = possibleRelationships.filter(function (possibleRelationship) {
          var optionsForRelationship = inverseType.metaForProperty(possibleRelationship.name).options;
          return name === optionsForRelationship.inverse;
        });

        (0, _emberDataPrivateDebug.assert)("You defined the '" + name + "' relationship on " + this + ", but you defined the inverse relationships of type " + inverseType.toString() + " multiple times. Look at http://emberjs.com/guides/models/defining-models/#toc_explicit-inverses for how to explicitly specify inverses", filteredRelationships.length < 2);

        if (filteredRelationships.length === 1) {
          possibleRelationships = filteredRelationships;
        }

        (0, _emberDataPrivateDebug.assert)("You defined the '" + name + "' relationship on " + this + ", but multiple possible inverse relationships of type " + this + " were found on " + inverseType + ". Look at http://emberjs.com/guides/models/defining-models/#toc_explicit-inverses for how to explicitly specify inverses", possibleRelationships.length === 1);

        inverseName = possibleRelationships[0].name;
        inverseKind = possibleRelationships[0].kind;
      }

      function findPossibleInverses(type, inverseType, relationshipsSoFar) {
        var possibleRelationships = relationshipsSoFar || [];

        var relationshipMap = get(inverseType, 'relationships');
        if (!relationshipMap) {
          return possibleRelationships;
        }

        var relationships = relationshipMap.get(type.modelName);

        relationships = relationships.filter(function (relationship) {
          var optionsForRelationship = inverseType.metaForProperty(relationship.name).options;

          if (!optionsForRelationship.inverse) {
            return true;
          }

          return name === optionsForRelationship.inverse;
        });

        if (relationships) {
          possibleRelationships.push.apply(possibleRelationships, relationships);
        }

        //Recurse to support polymorphism
        if (type.superclass) {
          findPossibleInverses(type.superclass, inverseType, possibleRelationships);
        }

        return possibleRelationships;
      }

      return {
        type: inverseType,
        name: inverseName,
        kind: inverseKind
      };
    },

    /**
      The model's relationships as a map, keyed on the type of the
      relationship. The value of each entry is an array containing a descriptor
      for each relationship with that type, describing the name of the relationship
      as well as the type.
       For example, given the following model definition:
       ```app/models/blog.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
        posts: DS.hasMany('post')
      });
      ```
       This computed property would return a map describing these
      relationships, like this:
       ```javascript
      import Ember from 'ember';
      import Blog from 'app/models/blog';
       var relationships = Ember.get(Blog, 'relationships');
      relationships.get(App.User);
      //=> [ { name: 'users', kind: 'hasMany' },
      //     { name: 'owner', kind: 'belongsTo' } ]
      relationships.get(App.Post);
      //=> [ { name: 'posts', kind: 'hasMany' } ]
      ```
       @property relationships
      @static
      @type Ember.Map
      @readOnly
    */

    relationships: relationshipsDescriptor,

    /**
      A hash containing lists of the model's relationships, grouped
      by the relationship kind. For example, given a model with this
      definition:
       ```app/models/blog.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
         posts: DS.hasMany('post')
      });
      ```
       This property would contain the following:
       ```javascript
      import Ember from 'ember';
      import Blog from 'app/models/blog';
       var relationshipNames = Ember.get(Blog, 'relationshipNames');
      relationshipNames.hasMany;
      //=> ['users', 'posts']
      relationshipNames.belongsTo;
      //=> ['owner']
      ```
       @property relationshipNames
      @static
      @type Object
      @readOnly
    */
    relationshipNames: _ember["default"].computed(function () {
      var names = {
        hasMany: [],
        belongsTo: []
      };

      this.eachComputedProperty(function (name, meta) {
        if (meta.isRelationship) {
          names[meta.kind].push(name);
        }
      });

      return names;
    }),

    /**
      An array of types directly related to a model. Each type will be
      included once, regardless of the number of relationships it has with
      the model.
       For example, given a model with this definition:
       ```app/models/blog.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
         posts: DS.hasMany('post')
      });
      ```
       This property would contain the following:
       ```javascript
      import Ember from 'ember';
      import Blog from 'app/models/blog';
       var relatedTypes = Ember.get(Blog, 'relatedTypes');
      //=> [ App.User, App.Post ]
      ```
       @property relatedTypes
      @static
      @type Ember.Array
      @readOnly
    */
    relatedTypes: relatedTypesDescriptor,

    /**
      A map whose keys are the relationships of a model and whose values are
      relationship descriptors.
       For example, given a model with this
      definition:
       ```app/models/blog.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
         posts: DS.hasMany('post')
      });
      ```
       This property would contain the following:
       ```javascript
      import Ember from 'ember';
      import Blog from 'app/models/blog';
       var relationshipsByName = Ember.get(Blog, 'relationshipsByName');
      relationshipsByName.get('users');
      //=> { key: 'users', kind: 'hasMany', type: App.User }
      relationshipsByName.get('owner');
      //=> { key: 'owner', kind: 'belongsTo', type: App.User }
      ```
       @property relationshipsByName
      @static
      @type Ember.Map
      @readOnly
    */
    relationshipsByName: relationshipsByNameDescriptor,

    /**
      A map whose keys are the fields of the model and whose values are strings
      describing the kind of the field. A model's fields are the union of all of its
      attributes and relationships.
       For example:
       ```app/models/blog.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        users: DS.hasMany('user'),
        owner: DS.belongsTo('user'),
         posts: DS.hasMany('post'),
         title: DS.attr('string')
      });
      ```
       ```js
      import Ember from 'ember';
      import Blog from 'app/models/blog';
       var fields = Ember.get(Blog, 'fields');
      fields.forEach(function(kind, field) {
        console.log(field, kind);
      });
       // prints:
      // users, hasMany
      // owner, belongsTo
      // posts, hasMany
      // title, attribute
      ```
       @property fields
      @static
      @type Ember.Map
      @readOnly
    */
    fields: _ember["default"].computed(function () {
      var map = Map.create();

      this.eachComputedProperty(function (name, meta) {
        if (meta.isRelationship) {
          map.set(name, meta.kind);
        } else if (meta.isAttribute) {
          map.set(name, 'attribute');
        }
      });

      return map;
    }).readOnly(),

    /**
      Given a callback, iterates over each of the relationships in the model,
      invoking the callback with the name of each relationship and its relationship
      descriptor.
       @method eachRelationship
      @static
      @param {Function} callback the callback to invoke
      @param {any} binding the value to which the callback's `this` should be bound
    */
    eachRelationship: function eachRelationship(callback, binding) {
      get(this, 'relationshipsByName').forEach(function (relationship, name) {
        callback.call(binding, name, relationship);
      });
    },

    /**
      Given a callback, iterates over each of the types related to a model,
      invoking the callback with the related type's class. Each type will be
      returned just once, regardless of how many different relationships it has
      with a model.
       @method eachRelatedType
      @static
      @param {Function} callback the callback to invoke
      @param {any} binding the value to which the callback's `this` should be bound
    */
    eachRelatedType: function eachRelatedType(callback, binding) {
      var relationshipTypes = get(this, 'relatedTypes');

      for (var i = 0; i < relationshipTypes.length; i++) {
        var type = relationshipTypes[i];
        callback.call(binding, type);
      }
    },

    determineRelationshipType: function determineRelationshipType(knownSide, store) {
      var knownKey = knownSide.key;
      var knownKind = knownSide.kind;
      var inverse = this.inverseFor(knownKey, store);
      var key = undefined,
          otherKind = undefined;

      if (!inverse) {
        return knownKind === 'belongsTo' ? 'oneToNone' : 'manyToNone';
      }

      key = inverse.name;
      otherKind = inverse.kind;

      if (otherKind === 'belongsTo') {
        return knownKind === 'belongsTo' ? 'oneToOne' : 'manyToOne';
      } else {
        return knownKind === 'belongsTo' ? 'oneToMany' : 'manyToMany';
      }
    }

  });

  exports.RelationshipsClassMethodsMixin = RelationshipsClassMethodsMixin;

  var RelationshipsInstanceMethodsMixin = _ember["default"].Mixin.create({
    /**
      Given a callback, iterates over each of the relationships in the model,
      invoking the callback with the name of each relationship and its relationship
      descriptor.
        The callback method you provide should have the following signature (all
      parameters are optional):
       ```javascript
      function(name, descriptor);
      ```
       - `name` the name of the current property in the iteration
      - `descriptor` the meta object that describes this relationship
       The relationship descriptor argument is an object with the following properties.
      - **key** <span class="type">String</span> the name of this relationship on the Model
     - **kind** <span class="type">String</span> "hasMany" or "belongsTo"
     - **options** <span class="type">Object</span> the original options hash passed when the relationship was declared
     - **parentType** <span class="type">DS.Model</span> the type of the Model that owns this relationship
     - **type** <span class="type">DS.Model</span> the type of the related Model
       Note that in addition to a callback, you can also pass an optional target
      object that will be set as `this` on the context.
       Example
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        serialize: function(record, options) {
          var json = {};
           record.eachRelationship(function(name, descriptor) {
            if (descriptor.kind === 'hasMany') {
              var serializedHasManyName = name.toUpperCase() + '_IDS';
              json[serializedHasManyName] = record.get(name).mapBy('id');
            }
          });
           return json;
        }
      });
      ```
       @method eachRelationship
      @param {Function} callback the callback to invoke
      @param {any} binding the value to which the callback's `this` should be bound
    */
    eachRelationship: function eachRelationship(callback, binding) {
      this.constructor.eachRelationship(callback, binding);
    },

    relationshipFor: function relationshipFor(name) {
      return get(this.constructor, 'relationshipsByName').get(name);
    },

    inverseFor: function inverseFor(key) {
      return this.constructor.inverseFor(key, this.store);
    }

  });
  exports.RelationshipsInstanceMethodsMixin = RelationshipsInstanceMethodsMixin;
});
define("ember-data/-private/system/relationships/has-many", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/normalize-model-name", "ember-data/-private/system/is-array-like"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemNormalizeModelName, _emberDataPrivateSystemIsArrayLike) {
  "use strict";

  exports["default"] = hasMany;

  /**
    @module ember-data
  */

  /**
    `DS.hasMany` is used to define One-To-Many and Many-To-Many
    relationships on a [DS.Model](/api/data/classes/DS.Model.html).
  
    `DS.hasMany` takes an optional hash as a second parameter, currently
    supported options are:
  
    - `async`: A boolean value used to explicitly declare this to be an async relationship.
    - `inverse`: A string used to identify the inverse property on a related model.
  
    #### One-To-Many
    To declare a one-to-many relationship between two models, use
    `DS.belongsTo` in combination with `DS.hasMany`, like this:
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      comments: DS.hasMany('comment')
    });
    ```
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      post: DS.belongsTo('post')
    });
    ```
  
    #### Many-To-Many
    To declare a many-to-many relationship between two models, use
    `DS.hasMany`:
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      tags: DS.hasMany('tag')
    });
    ```
  
    ```app/models/tag.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      posts: DS.hasMany('post')
    });
    ```
  
    You can avoid passing a string as the first parameter. In that case Ember Data
    will infer the type from the singularized key name.
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      tags: DS.hasMany()
    });
    ```
  
    will lookup for a Tag type.
  
    #### Explicit Inverses
  
    Ember Data will do its best to discover which relationships map to
    one another. In the one-to-many code above, for example, Ember Data
    can figure out that changing the `comments` relationship should update
    the `post` relationship on the inverse because post is the only
    relationship to that model.
  
    However, sometimes you may have multiple `belongsTo`/`hasManys` for the
    same type. You can specify which property on the related model is
    the inverse using `DS.hasMany`'s `inverse` option:
  
    ```app/models/comment.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      onePost: DS.belongsTo('post'),
      twoPost: DS.belongsTo('post'),
      redPost: DS.belongsTo('post'),
      bluePost: DS.belongsTo('post')
    });
    ```
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      comments: DS.hasMany('comment', {
        inverse: 'redPost'
      })
    });
    ```
  
    You can also specify an inverse on a `belongsTo`, which works how
    you'd expect.
  
    @namespace
    @method hasMany
    @for DS
    @param {String} type (optional) type of the relationship
    @param {Object} options (optional) a hash of options
    @return {Ember.computed} relationship
  */
  function hasMany(type, options) {
    if (typeof type === 'object') {
      options = type;
      type = undefined;
    }

    (0, _emberDataPrivateDebug.assert)("The first argument to DS.hasMany must be a string representing a model type key, not an instance of " + _ember["default"].inspect(type) + ". E.g., to define a relation to the Comment model, use DS.hasMany('comment')", typeof type === 'string' || typeof type === 'undefined');

    options = options || {};

    if (typeof type === 'string') {
      type = (0, _emberDataPrivateSystemNormalizeModelName["default"])(type);
    }

    // Metadata about relationships is stored on the meta of
    // the relationship. This is used for introspection and
    // serialization. Note that `key` is populated lazily
    // the first time the CP is called.
    var meta = {
      type: type,
      isRelationship: true,
      options: options,
      kind: 'hasMany',
      key: null
    };

    return _ember["default"].computed({
      get: function get(key) {
        var relationship = this._internalModel._relationships.get(key);
        return relationship.getRecords();
      },
      set: function set(key, records) {
        (0, _emberDataPrivateDebug.assert)("You must pass an array of records to set a hasMany relationship", (0, _emberDataPrivateSystemIsArrayLike["default"])(records));
        (0, _emberDataPrivateDebug.assert)("All elements of a hasMany relationship must be instances of DS.Model, you passed " + _ember["default"].inspect(records), (function () {
          return _ember["default"].A(records).every(function (record) {
            return record.hasOwnProperty('_internalModel') === true;
          });
        })());

        var relationship = this._internalModel._relationships.get(key);
        relationship.clear();
        relationship.addRecords(_ember["default"].A(records).mapBy('_internalModel'));
        return relationship.getRecords();
      }
    }).meta(meta);
  }

  var HasManyMixin = _ember["default"].Mixin.create({
    notifyHasManyAdded: function notifyHasManyAdded(key) {
      //We need to notifyPropertyChange in the adding case because we need to make sure
      //we fetch the newly added record in case it is unloaded
      //TODO(Igor): Consider whether we could do this only if the record state is unloaded

      //Goes away once hasMany is double promisified
      this.notifyPropertyChange(key);
    }
  });
  exports.HasManyMixin = HasManyMixin;
});
define("ember-data/-private/system/relationships/state/belongs-to", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/promise-proxies", "ember-data/-private/system/relationships/state/relationship"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemPromiseProxies, _emberDataPrivateSystemRelationshipsStateRelationship) {
  "use strict";

  exports["default"] = BelongsToRelationship;

  function BelongsToRelationship(store, record, inverseKey, relationshipMeta) {
    this._super$constructor(store, record, inverseKey, relationshipMeta);
    this.record = record;
    this.key = relationshipMeta.key;
    this.inverseRecord = null;
    this.canonicalState = null;
  }

  BelongsToRelationship.prototype = Object.create(_emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype);
  BelongsToRelationship.prototype.constructor = BelongsToRelationship;
  BelongsToRelationship.prototype._super$constructor = _emberDataPrivateSystemRelationshipsStateRelationship["default"];

  BelongsToRelationship.prototype.setRecord = function (newRecord) {
    if (newRecord) {
      this.addRecord(newRecord);
    } else if (this.inverseRecord) {
      this.removeRecord(this.inverseRecord);
    }
    this.setHasData(true);
    this.setHasLoaded(true);
  };

  BelongsToRelationship.prototype.setCanonicalRecord = function (newRecord) {
    if (newRecord) {
      this.addCanonicalRecord(newRecord);
    } else if (this.canonicalState) {
      this.removeCanonicalRecord(this.canonicalState);
    }
    this.setHasData(true);
    this.setHasLoaded(true);
  };

  BelongsToRelationship.prototype._super$addCanonicalRecord = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.addCanonicalRecord;
  BelongsToRelationship.prototype.addCanonicalRecord = function (newRecord) {
    if (this.canonicalMembers.has(newRecord)) {
      return;
    }

    if (this.canonicalState) {
      this.removeCanonicalRecord(this.canonicalState);
    }

    this.canonicalState = newRecord;
    this._super$addCanonicalRecord(newRecord);
  };

  BelongsToRelationship.prototype._super$flushCanonical = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.flushCanonical;
  BelongsToRelationship.prototype.flushCanonical = function () {
    //temporary fix to not remove newly created records if server returned null.
    //TODO remove once we have proper diffing
    if (this.inverseRecord && this.inverseRecord.isNew() && !this.canonicalState) {
      return;
    }
    this.inverseRecord = this.canonicalState;
    this.record.notifyBelongsToChanged(this.key);
    this._super$flushCanonical();
  };

  BelongsToRelationship.prototype._super$addRecord = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.addRecord;
  BelongsToRelationship.prototype.addRecord = function (newRecord) {
    if (this.members.has(newRecord)) {
      return;
    }

    (0, _emberDataPrivateDebug.assertPolymorphicType)(this.record, this.relationshipMeta, newRecord);

    if (this.inverseRecord) {
      this.removeRecord(this.inverseRecord);
    }

    this.inverseRecord = newRecord;
    this._super$addRecord(newRecord);
    this.record.notifyBelongsToChanged(this.key);
  };

  BelongsToRelationship.prototype.setRecordPromise = function (newPromise) {
    var content = newPromise.get && newPromise.get('content');
    (0, _emberDataPrivateDebug.assert)("You passed in a promise that did not originate from an EmberData relationship. You can only pass promises that come from a belongsTo or hasMany relationship to the get call.", content !== undefined);
    this.setRecord(content ? content._internalModel : content);
  };

  BelongsToRelationship.prototype._super$removeRecordFromOwn = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.removeRecordFromOwn;
  BelongsToRelationship.prototype.removeRecordFromOwn = function (record) {
    if (!this.members.has(record)) {
      return;
    }
    this.inverseRecord = null;
    this._super$removeRecordFromOwn(record);
    this.record.notifyBelongsToChanged(this.key);
  };

  BelongsToRelationship.prototype._super$removeCanonicalRecordFromOwn = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.removeCanonicalRecordFromOwn;
  BelongsToRelationship.prototype.removeCanonicalRecordFromOwn = function (record) {
    if (!this.canonicalMembers.has(record)) {
      return;
    }
    this.canonicalState = null;
    this._super$removeCanonicalRecordFromOwn(record);
  };

  BelongsToRelationship.prototype.findRecord = function () {
    if (this.inverseRecord) {
      return this.store._findByInternalModel(this.inverseRecord);
    } else {
      return _ember["default"].RSVP.Promise.resolve(null);
    }
  };

  BelongsToRelationship.prototype.fetchLink = function () {
    var _this = this;

    return this.store.findBelongsTo(this.record, this.link, this.relationshipMeta).then(function (record) {
      if (record) {
        _this.addRecord(record);
      }
      return record;
    });
  };

  BelongsToRelationship.prototype.getRecord = function () {
    var _this2 = this;

    //TODO(Igor) flushCanonical here once our syncing is not stupid
    if (this.isAsync) {
      var promise;
      if (this.link) {
        if (this.hasLoaded) {
          promise = this.findRecord();
        } else {
          promise = this.findLink().then(function () {
            return _this2.findRecord();
          });
        }
      } else {
        promise = this.findRecord();
      }

      return _emberDataPrivateSystemPromiseProxies.PromiseObject.create({
        promise: promise,
        content: this.inverseRecord ? this.inverseRecord.getRecord() : null
      });
    } else {
      if (this.inverseRecord === null) {
        return null;
      }
      var toReturn = this.inverseRecord.getRecord();
      (0, _emberDataPrivateDebug.assert)("You looked up the '" + this.key + "' relationship on a '" + this.record.type.modelName + "' with id " + this.record.id + " but some of the associated records were not loaded. Either make sure they are all loaded together with the parent record, or specify that the relationship is async (`DS.belongsTo({ async: true })`)", toReturn === null || !toReturn.get('isEmpty'));
      return toReturn;
    }
  };

  BelongsToRelationship.prototype.reload = function () {
    // TODO handle case when reload() is triggered multiple times

    if (this.link) {
      return this.fetchLink();
    }

    // reload record, if it is already loaded
    if (this.inverseRecord && this.inverseRecord.record) {
      return this.inverseRecord.record.reload();
    }

    return this.findRecord();
  };
});
define("ember-data/-private/system/relationships/state/create", ["exports", "ember", "ember-data/-private/system/relationships/state/has-many", "ember-data/-private/system/relationships/state/belongs-to", "ember-data/-private/system/empty-object"], function (exports, _ember, _emberDataPrivateSystemRelationshipsStateHasMany, _emberDataPrivateSystemRelationshipsStateBelongsTo, _emberDataPrivateSystemEmptyObject) {
  "use strict";

  exports["default"] = Relationships;

  var get = _ember["default"].get;

  function shouldFindInverse(relationshipMeta) {
    var options = relationshipMeta.options;
    return !(options && options.inverse === null);
  }

  function createRelationshipFor(record, relationshipMeta, store) {
    var inverseKey = undefined;
    var inverse = null;
    if (shouldFindInverse(relationshipMeta)) {
      inverse = record.type.inverseFor(relationshipMeta.key, store);
    }

    if (inverse) {
      inverseKey = inverse.name;
    }

    if (relationshipMeta.kind === 'hasMany') {
      return new _emberDataPrivateSystemRelationshipsStateHasMany["default"](store, record, inverseKey, relationshipMeta);
    } else {
      return new _emberDataPrivateSystemRelationshipsStateBelongsTo["default"](store, record, inverseKey, relationshipMeta);
    }
  }
  function Relationships(record) {
    this.record = record;
    this.initializedRelationships = new _emberDataPrivateSystemEmptyObject["default"]();
  }

  Relationships.prototype.has = function (key) {
    return !!this.initializedRelationships[key];
  };

  Relationships.prototype.get = function (key) {
    var relationships = this.initializedRelationships;
    var relationshipsByName = get(this.record.type, 'relationshipsByName');
    if (!relationships[key] && relationshipsByName.get(key)) {
      relationships[key] = createRelationshipFor(this.record, relationshipsByName.get(key), this.record.store);
    }
    return relationships[key];
  };
});
define("ember-data/-private/system/relationships/state/has-many", ["exports", "ember-data/-private/debug", "ember-data/-private/system/promise-proxies", "ember-data/-private/system/relationships/state/relationship", "ember-data/-private/system/ordered-set", "ember-data/-private/system/many-array"], function (exports, _emberDataPrivateDebug, _emberDataPrivateSystemPromiseProxies, _emberDataPrivateSystemRelationshipsStateRelationship, _emberDataPrivateSystemOrderedSet, _emberDataPrivateSystemManyArray) {
  "use strict";

  exports["default"] = ManyRelationship;

  function ManyRelationship(store, record, inverseKey, relationshipMeta) {
    this._super$constructor(store, record, inverseKey, relationshipMeta);
    this.belongsToType = relationshipMeta.type;
    this.canonicalState = [];
    this.manyArray = _emberDataPrivateSystemManyArray["default"].create({
      canonicalState: this.canonicalState,
      store: this.store,
      relationship: this,
      type: this.store.modelFor(this.belongsToType),
      record: record
    });
    this.isPolymorphic = relationshipMeta.options.polymorphic;
    this.manyArray.isPolymorphic = this.isPolymorphic;
  }

  ManyRelationship.prototype = Object.create(_emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype);
  ManyRelationship.prototype.constructor = ManyRelationship;
  ManyRelationship.prototype._super$constructor = _emberDataPrivateSystemRelationshipsStateRelationship["default"];

  ManyRelationship.prototype.destroy = function () {
    this.manyArray.destroy();
  };

  ManyRelationship.prototype._super$updateMeta = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.updateMeta;
  ManyRelationship.prototype.updateMeta = function (meta) {
    this._super$updateMeta(meta);
    this.manyArray.set('meta', meta);
  };

  ManyRelationship.prototype._super$addCanonicalRecord = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.addCanonicalRecord;
  ManyRelationship.prototype.addCanonicalRecord = function (record, idx) {
    if (this.canonicalMembers.has(record)) {
      return;
    }
    if (idx !== undefined) {
      this.canonicalState.splice(idx, 0, record);
    } else {
      this.canonicalState.push(record);
    }
    this._super$addCanonicalRecord(record, idx);
  };

  ManyRelationship.prototype._super$addRecord = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.addRecord;
  ManyRelationship.prototype.addRecord = function (record, idx) {
    if (this.members.has(record)) {
      return;
    }
    this._super$addRecord(record, idx);
    this.manyArray.internalAddRecords([record], idx);
  };

  ManyRelationship.prototype._super$removeCanonicalRecordFromOwn = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.removeCanonicalRecordFromOwn;
  ManyRelationship.prototype.removeCanonicalRecordFromOwn = function (record, idx) {
    var i = idx;
    if (!this.canonicalMembers.has(record)) {
      return;
    }
    if (i === undefined) {
      i = this.canonicalState.indexOf(record);
    }
    if (i > -1) {
      this.canonicalState.splice(i, 1);
    }
    this._super$removeCanonicalRecordFromOwn(record, idx);
  };

  ManyRelationship.prototype._super$flushCanonical = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.flushCanonical;
  ManyRelationship.prototype.flushCanonical = function () {
    this.manyArray.flushCanonical();
    this._super$flushCanonical();
  };

  ManyRelationship.prototype._super$removeRecordFromOwn = _emberDataPrivateSystemRelationshipsStateRelationship["default"].prototype.removeRecordFromOwn;
  ManyRelationship.prototype.removeRecordFromOwn = function (record, idx) {
    if (!this.members.has(record)) {
      return;
    }
    this._super$removeRecordFromOwn(record, idx);
    if (idx !== undefined) {
      //TODO(Igor) not used currently, fix
      this.manyArray.currentState.removeAt(idx);
    } else {
      this.manyArray.internalRemoveRecords([record]);
    }
  };

  ManyRelationship.prototype.notifyRecordRelationshipAdded = function (record, idx) {
    (0, _emberDataPrivateDebug.assertPolymorphicType)(this.record, this.relationshipMeta, record);

    this.record.notifyHasManyAdded(this.key, record, idx);
  };

  ManyRelationship.prototype.reload = function () {
    var _this = this;

    var manyArrayLoadedState = this.manyArray.get('isLoaded');

    if (this._loadingPromise) {
      if (this._loadingPromise.get('isPending')) {
        return this._loadingPromise;
      }
      if (this._loadingPromise.get('isRejected')) {
        this.manyArray.set('isLoaded', manyArrayLoadedState);
      }
    }

    if (this.link) {
      this._loadingPromise = (0, _emberDataPrivateSystemPromiseProxies.promiseManyArray)(this.fetchLink(), 'Reload with link');
      return this._loadingPromise;
    } else {
      this._loadingPromise = (0, _emberDataPrivateSystemPromiseProxies.promiseManyArray)(this.store.scheduleFetchMany(this.manyArray.toArray()).then(function () {
        return _this.manyArray;
      }), 'Reload with ids');
      return this._loadingPromise;
    }
  };

  ManyRelationship.prototype.computeChanges = function (records) {
    var members = this.canonicalMembers;
    var recordsToRemove = [];
    var length;
    var record;
    var i;

    records = setForArray(records);

    members.forEach(function (member) {
      if (records.has(member)) {
        return;
      }

      recordsToRemove.push(member);
    });

    this.removeCanonicalRecords(recordsToRemove);

    // Using records.toArray() since currently using
    // removeRecord can modify length, messing stuff up
    // forEach since it directly looks at "length" each
    // iteration
    records = records.toArray();
    length = records.length;
    for (i = 0; i < length; i++) {
      record = records[i];
      this.removeCanonicalRecord(record);
      this.addCanonicalRecord(record, i);
    }
  };

  ManyRelationship.prototype.fetchLink = function () {
    var _this2 = this;

    return this.store.findHasMany(this.record, this.link, this.relationshipMeta).then(function (records) {
      if (records.hasOwnProperty('meta')) {
        _this2.updateMeta(records.meta);
      }
      _this2.store._backburner.join(function () {
        _this2.updateRecordsFromAdapter(records);
        _this2.manyArray.set('isLoaded', true);
      });
      return _this2.manyArray;
    });
  };

  ManyRelationship.prototype.findRecords = function () {
    var _this3 = this;

    var manyArray = this.manyArray.toArray();
    var internalModels = new Array(manyArray.length);

    for (var i = 0; i < manyArray.length; i++) {
      internalModels[i] = manyArray[i]._internalModel;
    }

    //TODO CLEANUP
    return this.store.findMany(internalModels).then(function () {
      if (!_this3.manyArray.get('isDestroyed')) {
        //Goes away after the manyArray refactor
        _this3.manyArray.set('isLoaded', true);
      }
      return _this3.manyArray;
    });
  };
  ManyRelationship.prototype.notifyHasManyChanged = function () {
    this.record.notifyHasManyAdded(this.key);
  };

  ManyRelationship.prototype.getRecords = function () {
    var _this4 = this;

    //TODO(Igor) sync server here, once our syncing is not stupid
    if (this.isAsync) {
      var promise;
      if (this.link) {
        if (this.hasLoaded) {
          promise = this.findRecords();
        } else {
          promise = this.findLink().then(function () {
            return _this4.findRecords();
          });
        }
      } else {
        promise = this.findRecords();
      }
      this._loadingPromise = _emberDataPrivateSystemPromiseProxies.PromiseManyArray.create({
        content: this.manyArray,
        promise: promise
      });
      return this._loadingPromise;
    } else {
      (0, _emberDataPrivateDebug.assert)("You looked up the '" + this.key + "' relationship on a '" + this.record.type.modelName + "' with id " + this.record.id + " but some of the associated records were not loaded. Either make sure they are all loaded together with the parent record, or specify that the relationship is async (`DS.hasMany({ async: true })`)", this.manyArray.isEvery('isEmpty', false));

      //TODO(Igor) WTF DO I DO HERE?
      if (!this.manyArray.get('isDestroyed')) {
        this.manyArray.set('isLoaded', true);
      }
      return this.manyArray;
    }
  };

  function setForArray(array) {
    var set = new _emberDataPrivateSystemOrderedSet["default"]();

    if (array) {
      for (var i = 0, l = array.length; i < l; i++) {
        set.add(array[i]);
      }
    }

    return set;
  }
});
define("ember-data/-private/system/relationships/state/relationship", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/ordered-set"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemOrderedSet) {
  "use strict";

  exports["default"] = Relationship;

  function Relationship(store, record, inverseKey, relationshipMeta) {
    var async = relationshipMeta.options.async;
    this.members = new _emberDataPrivateSystemOrderedSet["default"]();
    this.canonicalMembers = new _emberDataPrivateSystemOrderedSet["default"]();
    this.store = store;
    this.key = relationshipMeta.key;
    this.inverseKey = inverseKey;
    this.record = record;
    this.isAsync = typeof async === 'undefined' ? true : async;
    this.relationshipMeta = relationshipMeta;
    //This probably breaks for polymorphic relationship in complex scenarios, due to
    //multiple possible modelNames
    this.inverseKeyForImplicit = this.record.constructor.modelName + this.key;
    this.linkPromise = null;
    this.meta = null;
    this.hasData = false;
    this.hasLoaded = false;
  }

  Relationship.prototype = {
    constructor: Relationship,

    destroy: _ember["default"].K,

    updateMeta: function updateMeta(meta) {
      this.meta = meta;
    },

    clear: function clear() {
      var members = this.members.list;
      var member;

      while (members.length > 0) {
        member = members[0];
        this.removeRecord(member);
      }
    },

    removeRecords: function removeRecords(records) {
      var _this = this;

      records.forEach(function (record) {
        return _this.removeRecord(record);
      });
    },

    addRecords: function addRecords(records, idx) {
      var _this2 = this;

      records.forEach(function (record) {
        _this2.addRecord(record, idx);
        if (idx !== undefined) {
          idx++;
        }
      });
    },

    addCanonicalRecords: function addCanonicalRecords(records, idx) {
      for (var i = 0; i < records.length; i++) {
        if (idx !== undefined) {
          this.addCanonicalRecord(records[i], i + idx);
        } else {
          this.addCanonicalRecord(records[i]);
        }
      }
    },

    addCanonicalRecord: function addCanonicalRecord(record, idx) {
      if (!this.canonicalMembers.has(record)) {
        this.canonicalMembers.add(record);
        if (this.inverseKey) {
          record._relationships.get(this.inverseKey).addCanonicalRecord(this.record);
        } else {
          if (!record._implicitRelationships[this.inverseKeyForImplicit]) {
            record._implicitRelationships[this.inverseKeyForImplicit] = new Relationship(this.store, record, this.key, { options: {} });
          }
          record._implicitRelationships[this.inverseKeyForImplicit].addCanonicalRecord(this.record);
        }
      }
      this.flushCanonicalLater();
      this.setHasData(true);
    },

    removeCanonicalRecords: function removeCanonicalRecords(records, idx) {
      for (var i = 0; i < records.length; i++) {
        if (idx !== undefined) {
          this.removeCanonicalRecord(records[i], i + idx);
        } else {
          this.removeCanonicalRecord(records[i]);
        }
      }
    },

    removeCanonicalRecord: function removeCanonicalRecord(record, idx) {
      if (this.canonicalMembers.has(record)) {
        this.removeCanonicalRecordFromOwn(record);
        if (this.inverseKey) {
          this.removeCanonicalRecordFromInverse(record);
        } else {
          if (record._implicitRelationships[this.inverseKeyForImplicit]) {
            record._implicitRelationships[this.inverseKeyForImplicit].removeCanonicalRecord(this.record);
          }
        }
      }
      this.flushCanonicalLater();
    },

    addRecord: function addRecord(record, idx) {
      if (!this.members.has(record)) {
        this.members.addWithIndex(record, idx);
        this.notifyRecordRelationshipAdded(record, idx);
        if (this.inverseKey) {
          record._relationships.get(this.inverseKey).addRecord(this.record);
        } else {
          if (!record._implicitRelationships[this.inverseKeyForImplicit]) {
            record._implicitRelationships[this.inverseKeyForImplicit] = new Relationship(this.store, record, this.key, { options: {} });
          }
          record._implicitRelationships[this.inverseKeyForImplicit].addRecord(this.record);
        }
        this.record.updateRecordArraysLater();
      }
      this.setHasData(true);
    },

    removeRecord: function removeRecord(record) {
      if (this.members.has(record)) {
        this.removeRecordFromOwn(record);
        if (this.inverseKey) {
          this.removeRecordFromInverse(record);
        } else {
          if (record._implicitRelationships[this.inverseKeyForImplicit]) {
            record._implicitRelationships[this.inverseKeyForImplicit].removeRecord(this.record);
          }
        }
      }
    },

    removeRecordFromInverse: function removeRecordFromInverse(record) {
      var inverseRelationship = record._relationships.get(this.inverseKey);
      //Need to check for existence, as the record might unloading at the moment
      if (inverseRelationship) {
        inverseRelationship.removeRecordFromOwn(this.record);
      }
    },

    removeRecordFromOwn: function removeRecordFromOwn(record) {
      this.members["delete"](record);
      this.notifyRecordRelationshipRemoved(record);
      this.record.updateRecordArrays();
    },

    removeCanonicalRecordFromInverse: function removeCanonicalRecordFromInverse(record) {
      var inverseRelationship = record._relationships.get(this.inverseKey);
      //Need to check for existence, as the record might unloading at the moment
      if (inverseRelationship) {
        inverseRelationship.removeCanonicalRecordFromOwn(this.record);
      }
    },

    removeCanonicalRecordFromOwn: function removeCanonicalRecordFromOwn(record) {
      this.canonicalMembers["delete"](record);
      this.flushCanonicalLater();
    },

    flushCanonical: function flushCanonical() {
      this.willSync = false;
      //a hack for not removing new records
      //TODO remove once we have proper diffing
      var newRecords = [];
      for (var i = 0; i < this.members.list.length; i++) {
        if (this.members.list[i].isNew()) {
          newRecords.push(this.members.list[i]);
        }
      }
      //TODO(Igor) make this less abysmally slow
      this.members = this.canonicalMembers.copy();
      for (i = 0; i < newRecords.length; i++) {
        this.members.add(newRecords[i]);
      }
    },

    flushCanonicalLater: function flushCanonicalLater() {
      var _this3 = this;

      if (this.willSync) {
        return;
      }
      this.willSync = true;
      this.store._backburner.join(function () {
        return _this3.store._backburner.schedule('syncRelationships', _this3, _this3.flushCanonical);
      });
    },

    updateLink: function updateLink(link) {
      (0, _emberDataPrivateDebug.warn)("You have pushed a record of type '" + this.record.type.modelName + "' with '" + this.key + "' as a link, but the association is not an async relationship.", this.isAsync, {
        id: 'ds.store.push-link-for-sync-relationship'
      });
      (0, _emberDataPrivateDebug.assert)("You have pushed a record of type '" + this.record.type.modelName + "' with '" + this.key + "' as a link, but the value of that link is not a string.", typeof link === 'string' || link === null);
      if (link !== this.link) {
        this.link = link;
        this.linkPromise = null;
        this.setHasLoaded(false);
        this.record.notifyPropertyChange(this.key);
      }
    },

    findLink: function findLink() {
      if (this.linkPromise) {
        return this.linkPromise;
      } else {
        var promise = this.fetchLink();
        this.linkPromise = promise;
        return promise.then(function (result) {
          return result;
        });
      }
    },

    updateRecordsFromAdapter: function updateRecordsFromAdapter(records) {
      //TODO(Igor) move this to a proper place
      //TODO Once we have adapter support, we need to handle updated and canonical changes
      this.computeChanges(records);
      this.setHasData(true);
      this.setHasLoaded(true);
    },

    notifyRecordRelationshipAdded: _ember["default"].K,
    notifyRecordRelationshipRemoved: _ember["default"].K,

    /*
      `hasData` for a relationship is a flag to indicate if we consider the
      content of this relationship "known". Snapshots uses this to tell the
      difference between unknown (`undefined`) or empty (`null`). The reason for
      this is that we wouldn't want to serialize unknown relationships as `null`
      as that might overwrite remote state.
       All relationships for a newly created (`store.createRecord()`) are
      considered known (`hasData === true`).
     */
    setHasData: function setHasData(value) {
      this.hasData = value;
    },

    /*
      `hasLoaded` is a flag to indicate if we have gotten data from the adapter or
      not when the relationship has a link.
       This is used to be able to tell when to fetch the link and when to return
      the local data in scenarios where the local state is considered known
      (`hasData === true`).
       Updating the link will automatically set `hasLoaded` to `false`.
     */
    setHasLoaded: function setHasLoaded(value) {
      this.hasLoaded = value;
    }
  };
});
define('ember-data/-private/system/snapshot-record-array', ['exports', 'ember-data/-private/features'], function (exports, _emberDataPrivateFeatures) {
  'use strict';

  exports['default'] = SnapshotRecordArray;

  /**
    @module ember-data
  */

  /**
    @class SnapshotRecordArray
    @namespace DS
    @private
    @constructor
    @param {Array} snapshots An array of snapshots
    @param {Object} meta
  */
  function SnapshotRecordArray(recordArray, meta) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    /**
      An array of snapshots
      @private
      @property _snapshots
      @type {Array}
    */
    this._snapshots = null;
    /**
      An array of records
      @private
      @property _recordArray
      @type {Array}
    */
    this._recordArray = recordArray;
    /**
      Number of records in the array
      @property length
      @type {Number}
    */
    this.length = recordArray.get('length');
    /**
      The type of the underlying records for the snapshots in the array, as a DS.Model
      @property type
      @type {DS.Model}
    */
    this.type = recordArray.get('type');
    /**
      Meta object
      @property meta
      @type {Object}
    */
    this.meta = meta;
    /**
      A hash of adapter options
      @property adapterOptions
      @type {Object}
    */
    this.adapterOptions = options.adapterOptions;

    if (true) {
      this.include = options.include;
    }
  }

  /**
    Get snapshots of the underlying record array
    @method snapshots
    @return {Array} Array of snapshots
  */
  SnapshotRecordArray.prototype.snapshots = function () {
    if (this._snapshots) {
      return this._snapshots;
    }
    var recordArray = this._recordArray;
    this._snapshots = recordArray.invoke('createSnapshot');

    return this._snapshots;
  };
});
define('ember-data/-private/system/snapshot', ['exports', 'ember', 'ember-data/-private/system/empty-object', 'ember-data/-private/features'], function (exports, _ember, _emberDataPrivateSystemEmptyObject, _emberDataPrivateFeatures) {
  'use strict';

  exports['default'] = Snapshot;

  /**
    @module ember-data
  */

  var get = _ember['default'].get;

  /**
    @class Snapshot
    @namespace DS
    @private
    @constructor
    @param {DS.Model} internalModel The model to create a snapshot from
  */
  function Snapshot(internalModel) {
    var _this = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this._attributes = new _emberDataPrivateSystemEmptyObject['default']();
    this._belongsToRelationships = new _emberDataPrivateSystemEmptyObject['default']();
    this._belongsToIds = new _emberDataPrivateSystemEmptyObject['default']();
    this._hasManyRelationships = new _emberDataPrivateSystemEmptyObject['default']();
    this._hasManyIds = new _emberDataPrivateSystemEmptyObject['default']();

    var record = internalModel.getRecord();
    this.record = record;
    record.eachAttribute(function (keyName) {
      return _this._attributes[keyName] = get(record, keyName);
    });

    this.id = internalModel.id;
    this._internalModel = internalModel;
    this.type = internalModel.type;
    this.modelName = internalModel.type.modelName;

    /**
      A hash of adapter options
      @property adapterOptions
      @type {Object}
    */
    this.adapterOptions = options.adapterOptions;

    if (true) {
      this.include = options.include;
    }

    this._changedAttributes = record.changedAttributes();
  }

  Snapshot.prototype = {
    constructor: Snapshot,

    /**
      The id of the snapshot's underlying record
       Example
       ```javascript
      // store.push('post', { id: 1, author: 'Tomster', title: 'Ember.js rocks' });
      postSnapshot.id; // => '1'
      ```
       @property id
      @type {String}
    */
    id: null,

    /**
      The underlying record for this snapshot. Can be used to access methods and
      properties defined on the record.
       Example
       ```javascript
      var json = snapshot.record.toJSON();
      ```
       @property record
      @type {DS.Model}
    */
    record: null,

    /**
      The type of the underlying record for this snapshot, as a DS.Model.
       @property type
      @type {DS.Model}
    */
    type: null,

    /**
      The name of the type of the underlying record for this snapshot, as a string.
       @property modelName
      @type {String}
    */
    modelName: null,

    /**
      Returns the value of an attribute.
       Example
       ```javascript
      // store.push('post', { id: 1, author: 'Tomster', title: 'Ember.js rocks' });
      postSnapshot.attr('author'); // => 'Tomster'
      postSnapshot.attr('title'); // => 'Ember.js rocks'
      ```
       Note: Values are loaded eagerly and cached when the snapshot is created.
       @method attr
      @param {String} keyName
      @return {Object} The attribute value or undefined
    */
    attr: function attr(keyName) {
      if (keyName in this._attributes) {
        return this._attributes[keyName];
      }
      throw new _ember['default'].Error("Model '" + _ember['default'].inspect(this.record) + "' has no attribute named '" + keyName + "' defined.");
    },

    /**
      Returns all attributes and their corresponding values.
       Example
       ```javascript
      // store.push('post', { id: 1, author: 'Tomster', title: 'Ember.js rocks' });
      postSnapshot.attributes(); // => { author: 'Tomster', title: 'Ember.js rocks' }
      ```
       @method attributes
      @return {Object} All attributes of the current snapshot
    */
    attributes: function attributes() {
      return _ember['default'].copy(this._attributes);
    },

    /**
      Returns all changed attributes and their old and new values.
       Example
       ```javascript
      // store.push('post', { id: 1, author: 'Tomster', title: 'Ember.js rocks' });
      postModel.set('title', 'Ember.js rocks!');
      postSnapshot.changedAttributes(); // => { title: ['Ember.js rocks', 'Ember.js rocks!'] }
      ```
       @method changedAttributes
      @return {Object} All changed attributes of the current snapshot
    */
    changedAttributes: function changedAttributes() {
      var changedAttributes = new _emberDataPrivateSystemEmptyObject['default']();
      var changedAttributeKeys = Object.keys(this._changedAttributes);

      for (var i = 0, _length = changedAttributeKeys.length; i < _length; i++) {
        var key = changedAttributeKeys[i];
        changedAttributes[key] = _ember['default'].copy(this._changedAttributes[key]);
      }

      return changedAttributes;
    },

    /**
      Returns the current value of a belongsTo relationship.
       `belongsTo` takes an optional hash of options as a second parameter,
      currently supported options are:
      - `id`: set to `true` if you only want the ID of the related record to be
        returned.
       Example
       ```javascript
      // store.push('post', { id: 1, title: 'Hello World' });
      // store.createRecord('comment', { body: 'Lorem ipsum', post: post });
      commentSnapshot.belongsTo('post'); // => DS.Snapshot
      commentSnapshot.belongsTo('post', { id: true }); // => '1'
       // store.push('comment', { id: 1, body: 'Lorem ipsum' });
      commentSnapshot.belongsTo('post'); // => undefined
      ```
       Calling `belongsTo` will return a new Snapshot as long as there's any known
      data for the relationship available, such as an ID. If the relationship is
      known but unset, `belongsTo` will return `null`. If the contents of the
      relationship is unknown `belongsTo` will return `undefined`.
       Note: Relationships are loaded lazily and cached upon first access.
       @method belongsTo
      @param {String} keyName
      @param {Object} [options]
      @return {(DS.Snapshot|String|null|undefined)} A snapshot or ID of a known
        relationship or null if the relationship is known but unset. undefined
        will be returned if the contents of the relationship is unknown.
    */
    belongsTo: function belongsTo(keyName, options) {
      var id = options && options.id;
      var relationship, inverseRecord, hasData;
      var result;

      if (id && keyName in this._belongsToIds) {
        return this._belongsToIds[keyName];
      }

      if (!id && keyName in this._belongsToRelationships) {
        return this._belongsToRelationships[keyName];
      }

      relationship = this._internalModel._relationships.get(keyName);
      if (!(relationship && relationship.relationshipMeta.kind === 'belongsTo')) {
        throw new _ember['default'].Error("Model '" + _ember['default'].inspect(this.record) + "' has no belongsTo relationship named '" + keyName + "' defined.");
      }

      hasData = get(relationship, 'hasData');
      inverseRecord = get(relationship, 'inverseRecord');

      if (hasData) {
        if (inverseRecord && !inverseRecord.isDeleted()) {
          if (id) {
            result = get(inverseRecord, 'id');
          } else {
            result = inverseRecord.createSnapshot();
          }
        } else {
          result = null;
        }
      }

      if (id) {
        this._belongsToIds[keyName] = result;
      } else {
        this._belongsToRelationships[keyName] = result;
      }

      return result;
    },

    /**
      Returns the current value of a hasMany relationship.
       `hasMany` takes an optional hash of options as a second parameter,
      currently supported options are:
      - `ids`: set to `true` if you only want the IDs of the related records to be
        returned.
       Example
       ```javascript
      // store.push('post', { id: 1, title: 'Hello World', comments: [2, 3] });
      postSnapshot.hasMany('comments'); // => [DS.Snapshot, DS.Snapshot]
      postSnapshot.hasMany('comments', { ids: true }); // => ['2', '3']
       // store.push('post', { id: 1, title: 'Hello World' });
      postSnapshot.hasMany('comments'); // => undefined
      ```
       Note: Relationships are loaded lazily and cached upon first access.
       @method hasMany
      @param {String} keyName
      @param {Object} [options]
      @return {(Array|undefined)} An array of snapshots or IDs of a known
        relationship or an empty array if the relationship is known but unset.
        undefined will be returned if the contents of the relationship is unknown.
    */
    hasMany: function hasMany(keyName, options) {
      var ids = options && options.ids;
      var relationship, members, hasData;
      var results;

      if (ids && keyName in this._hasManyIds) {
        return this._hasManyIds[keyName];
      }

      if (!ids && keyName in this._hasManyRelationships) {
        return this._hasManyRelationships[keyName];
      }

      relationship = this._internalModel._relationships.get(keyName);
      if (!(relationship && relationship.relationshipMeta.kind === 'hasMany')) {
        throw new _ember['default'].Error("Model '" + _ember['default'].inspect(this.record) + "' has no hasMany relationship named '" + keyName + "' defined.");
      }

      hasData = get(relationship, 'hasData');
      members = get(relationship, 'members');

      if (hasData) {
        results = [];
        members.forEach(function (member) {
          if (!member.isDeleted()) {
            if (ids) {
              results.push(member.id);
            } else {
              results.push(member.createSnapshot());
            }
          }
        });
      }

      if (ids) {
        this._hasManyIds[keyName] = results;
      } else {
        this._hasManyRelationships[keyName] = results;
      }

      return results;
    },

    /**
      Iterates through all the attributes of the model, calling the passed
      function on each attribute.
       Example
       ```javascript
      snapshot.eachAttribute(function(name, meta) {
        // ...
      });
      ```
       @method eachAttribute
      @param {Function} callback the callback to execute
      @param {Object} [binding] the value to which the callback's `this` should be bound
    */
    eachAttribute: function eachAttribute(callback, binding) {
      this.record.eachAttribute(callback, binding);
    },

    /**
      Iterates through all the relationships of the model, calling the passed
      function on each relationship.
       Example
       ```javascript
      snapshot.eachRelationship(function(name, relationship) {
        // ...
      });
      ```
       @method eachRelationship
      @param {Function} callback the callback to execute
      @param {Object} [binding] the value to which the callback's `this` should be bound
    */
    eachRelationship: function eachRelationship(callback, binding) {
      this.record.eachRelationship(callback, binding);
    },

    /**
      @method serialize
      @param {Object} options
      @return {Object} an object whose values are primitive JSON values only
     */
    serialize: function serialize(options) {
      return this.record.store.serializerFor(this.modelName).serialize(this, options);
    }
  };
});
define('ember-data/-private/system/store/common', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports._bind = _bind;
  exports._guard = _guard;
  exports._objectIsAlive = _objectIsAlive;

  var get = _ember['default'].get;

  function _bind(fn) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
      return fn.apply(undefined, args);
    };
  }

  function _guard(promise, test) {
    var guarded = promise['finally'](function () {
      if (!test()) {
        guarded._subscribers.length = 0;
      }
    });

    return guarded;
  }

  function _objectIsAlive(object) {
    return !(get(object, "isDestroyed") || get(object, "isDestroying"));
  }
});
define('ember-data/-private/system/store/container-instance-cache', ['exports', 'ember', 'ember-data/-private/system/empty-object'], function (exports, _ember, _emberDataPrivateSystemEmptyObject) {
  'use strict';

  exports['default'] = ContainerInstanceCache;

  var assign = _ember['default'].assign || _ember['default'].merge;

  /**
   * The `ContainerInstanceCache` serves as a lazy cache for looking up
   * instances of serializers and adapters. It has some additional logic for
   * finding the 'fallback' adapter or serializer.
   *
   * The 'fallback' adapter or serializer is an adapter or serializer that is looked up
   * when the preferred lookup fails. For example, say you try to look up `adapter:post`,
   * but there is no entry (app/adapters/post.js in EmberCLI) for `adapter:post` in the registry.
   *
   * The `fallbacks` array passed will then be used; the first entry in the fallbacks array
   * that exists in the container will then be cached for `adapter:post`. So, the next time you
   * look up `adapter:post`, you'll get the `adapter:application` instance (or whatever the fallback
   * was if `adapter:application` doesn't exist).
   *
   * @private
   * @class ContainerInstanceCache
   *
  */
  function ContainerInstanceCache(owner) {
    this._owner = owner;
    this._cache = new _emberDataPrivateSystemEmptyObject['default']();
  }

  ContainerInstanceCache.prototype = new _emberDataPrivateSystemEmptyObject['default']();

  assign(ContainerInstanceCache.prototype, {
    get: function get(type, preferredKey, fallbacks) {
      var cache = this._cache;
      var preferredLookupKey = type + ':' + preferredKey;

      if (!(preferredLookupKey in cache)) {
        var instance = this.instanceFor(preferredLookupKey) || this._findInstance(type, fallbacks);
        if (instance) {
          cache[preferredLookupKey] = instance;
        }
      }
      return cache[preferredLookupKey];
    },

    _findInstance: function _findInstance(type, fallbacks) {
      for (var i = 0, _length = fallbacks.length; i < _length; i++) {
        var fallback = fallbacks[i];
        var lookupKey = type + ':' + fallback;
        var instance = this.instanceFor(lookupKey);

        if (instance) {
          return instance;
        }
      }
    },

    instanceFor: function instanceFor(key) {
      var cache = this._cache;
      if (!cache[key]) {
        var instance = this._owner.lookup(key);
        if (instance) {
          cache[key] = instance;
        }
      }
      return cache[key];
    },

    destroy: function destroy() {
      var cache = this._cache;
      var cacheEntries = Object.keys(cache);

      for (var i = 0, _length2 = cacheEntries.length; i < _length2; i++) {
        var cacheKey = cacheEntries[i];
        var cacheEntry = cache[cacheKey];
        if (cacheEntry) {
          cacheEntry.destroy();
        }
      }
      this._owner = null;
    },

    constructor: ContainerInstanceCache,

    toString: function toString() {
      return 'ContainerInstanceCache';
    }
  });
});
define("ember-data/-private/system/store/finders", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/system/store/common", "ember-data/-private/system/store/serializer-response", "ember-data/-private/system/store/serializers"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateSystemStoreCommon, _emberDataPrivateSystemStoreSerializerResponse, _emberDataPrivateSystemStoreSerializers) {
  "use strict";

  exports._find = _find;
  exports._findMany = _findMany;
  exports._findHasMany = _findHasMany;
  exports._findBelongsTo = _findBelongsTo;
  exports._findAll = _findAll;
  exports._query = _query;
  exports._queryRecord = _queryRecord;

  var Promise = _ember["default"].RSVP.Promise;

  function payloadIsNotBlank(adapterPayload) {
    if (Array.isArray(adapterPayload)) {
      return true;
    } else {
      return Object.keys(adapterPayload || {}).length;
    }
  }

  function _find(adapter, store, typeClass, id, internalModel, options) {
    var snapshot = internalModel.createSnapshot(options);
    var promise = adapter.findRecord(store, typeClass, id, snapshot);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, internalModel.type.modelName);
    var label = "DS: Handle Adapter#findRecord of " + typeClass + " with id: " + id;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (0, _emberDataPrivateDebug.assert)("You made a `findRecord` request for a " + typeClass.modelName + " with id " + id + ", but the adapter's response did not have any data", payloadIsNotBlank(adapterPayload));
      return store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, id, 'findRecord');
        (0, _emberDataPrivateDebug.assert)('Ember Data expected the primary data returned from a `findRecord` response to be an object but instead it found an array.', !Array.isArray(payload.data));
        //TODO Optimize
        var record = store.push(payload);
        return record._internalModel;
      });
    }, function (error) {
      internalModel.notFound();
      if (internalModel.isEmpty()) {
        internalModel.unloadRecord();
      }

      throw error;
    }, "DS: Extract payload of '" + typeClass + "'");
  }

  function _findMany(adapter, store, typeClass, ids, internalModels) {
    var snapshots = _ember["default"].A(internalModels).invoke('createSnapshot');
    var promise = adapter.findMany(store, typeClass, ids, snapshots);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, typeClass.modelName);
    var label = "DS: Handle Adapter#findMany of " + typeClass;

    if (promise === undefined) {
      throw new Error('adapter.findMany returned undefined, this was very likely a mistake');
    }

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (0, _emberDataPrivateDebug.assert)("You made a `findMany` request for " + typeClass.modelName + " records with ids " + ids + ", but the adapter's response did not have any data", payloadIsNotBlank(adapterPayload));
      return store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'findMany');
        //TODO Optimize, no need to materialize here
        var records = store.push(payload);
        var internalModels = new Array(records.length);

        for (var i = 0; i < records.length; i++) {
          internalModels[i] = records[i]._internalModel;
        }

        return internalModels;
      });
    }, null, "DS: Extract payload of " + typeClass);
  }

  function _findHasMany(adapter, store, internalModel, link, relationship) {
    var snapshot = internalModel.createSnapshot();
    var typeClass = store.modelFor(relationship.type);
    var promise = adapter.findHasMany(store, snapshot, link, relationship);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, relationship.type);
    var label = "DS: Handle Adapter#findHasMany of " + internalModel + " : " + relationship.type;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      (0, _emberDataPrivateDebug.assert)("You made a `findHasMany` request for a " + internalModel.modelName + "'s `" + relationship.key + "` relationship, using link " + link + ", but the adapter's response did not have any data", payloadIsNotBlank(adapterPayload));
      return store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'findHasMany');
        //TODO Use a non record creating push
        var records = store.push(payload);
        var recordArray = records.map(function (record) {
          return record._internalModel;
        });
        recordArray.meta = payload.meta;
        return recordArray;
      });
    }, null, "DS: Extract payload of " + internalModel + " : hasMany " + relationship.type);
  }

  function _findBelongsTo(adapter, store, internalModel, link, relationship) {
    var snapshot = internalModel.createSnapshot();
    var typeClass = store.modelFor(relationship.type);
    var promise = adapter.findBelongsTo(store, snapshot, link, relationship);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, relationship.type);
    var label = "DS: Handle Adapter#findBelongsTo of " + internalModel + " : " + relationship.type;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      return store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'findBelongsTo');

        if (!payload.data) {
          return null;
        }

        //TODO Optimize
        var record = store.push(payload);
        return record._internalModel;
      });
    }, null, "DS: Extract payload of " + internalModel + " : " + relationship.type);
  }

  function _findAll(adapter, store, typeClass, sinceToken, options) {
    var modelName = typeClass.modelName;
    var recordArray = store.peekAll(modelName);
    var snapshotArray = recordArray.createSnapshot(options);
    var promise = adapter.findAll(store, typeClass, sinceToken, snapshotArray);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#findAll of " + typeClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      (0, _emberDataPrivateDebug.assert)("You made a `findAll` request for " + typeClass.modelName + " records, but the adapter's response did not have any data", payloadIsNotBlank(adapterPayload));
      store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'findAll');
        //TODO Optimize
        store.push(payload);
      });

      store.didUpdateAll(typeClass);
      return store.peekAll(modelName);
    }, null, "DS: Extract payload of findAll " + typeClass);
  }

  function _query(adapter, store, typeClass, query, recordArray) {
    var modelName = typeClass.modelName;
    var promise = adapter.query(store, typeClass, query, recordArray);

    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#query of " + typeClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var records, payload;
      store._adapterRun(function () {
        payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'query');
        //TODO Optimize
        records = store.push(payload);
      });

      (0, _emberDataPrivateDebug.assert)('The response to store.query is expected to be an array but it was a single record. Please wrap your response in an array or use `store.queryRecord` to query for a single record.', Array.isArray(records));
      recordArray.loadRecords(records, payload);
      return recordArray;
    }, null, "DS: Extract payload of query " + typeClass);
  }

  function _queryRecord(adapter, store, typeClass, query) {
    var modelName = typeClass.modelName;
    var promise = adapter.queryRecord(store, typeClass, query);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, modelName);
    var label = "DS: Handle Adapter#queryRecord of " + typeClass;

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));

    return promise.then(function (adapterPayload) {
      var record;
      store._adapterRun(function () {
        var payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, null, 'queryRecord');

        (0, _emberDataPrivateDebug.assert)("Expected the primary data returned by the serializer for a `queryRecord` response to be a single object or null but instead it was an array.", !Array.isArray(payload.data), {
          id: 'ds.store.queryRecord-array-response'
        });

        //TODO Optimize
        record = store.push(payload);
      });

      return record;
    }, null, "DS: Extract payload of queryRecord " + typeClass);
  }
});
define('ember-data/-private/system/store/serializer-response', ['exports', 'ember', 'ember-data/-private/debug'], function (exports, _ember, _emberDataPrivateDebug) {
  'use strict';

  exports.validateDocumentStructure = validateDocumentStructure;
  exports.normalizeResponseHelper = normalizeResponseHelper;

  /*
    This is a helper method that validates a JSON API top-level document
  
    The format of a document is described here:
    http://jsonapi.org/format/#document-top-level
  
    @method validateDocumentStructure
    @param {Object} doc JSON API document
    @return {array} An array of errors found in the document structure
  */

  function validateDocumentStructure(doc) {
    var errors = [];
    if (!doc || typeof doc !== 'object') {
      errors.push('Top level of a JSON API document must be an object');
    } else {
      if (!('data' in doc) && !('errors' in doc) && !('meta' in doc)) {
        errors.push('One or more of the following keys must be present: "data", "errors", "meta".');
      } else {
        if ('data' in doc && 'errors' in doc) {
          errors.push('Top level keys "errors" and "data" cannot both be present in a JSON API document');
        }
      }
      if ('data' in doc) {
        if (!(doc.data === null || Array.isArray(doc.data) || typeof doc.data === 'object')) {
          errors.push('data must be null, an object, or an array');
        }
      }
      if ('meta' in doc) {
        if (typeof doc.meta !== 'object') {
          errors.push('meta must be an object');
        }
      }
      if ('errors' in doc) {
        if (!Array.isArray(doc.errors)) {
          errors.push('errors must be an array');
        }
      }
      if ('links' in doc) {
        if (typeof doc.links !== 'object') {
          errors.push('links must be an object');
        }
      }
      if ('jsonapi' in doc) {
        if (typeof doc.jsonapi !== 'object') {
          errors.push('jsonapi must be an object');
        }
      }
      if ('included' in doc) {
        if (typeof doc.included !== 'object') {
          errors.push('included must be an array');
        }
      }
    }

    return errors;
  }

  /*
    This is a helper method that always returns a JSON-API Document.
  
    @method normalizeResponseHelper
    @param {DS.Serializer} serializer
    @param {DS.Store} store
    @param {subclass of DS.Model} modelClass
    @param {Object} payload
    @param {String|Number} id
    @param {String} requestType
    @return {Object} JSON-API Document
  */

  function normalizeResponseHelper(serializer, store, modelClass, payload, id, requestType) {
    var normalizedResponse = serializer.normalizeResponse(store, modelClass, payload, id, requestType);
    var validationErrors = [];
    (0, _emberDataPrivateDebug.runInDebug)(function () {
      validationErrors = validateDocumentStructure(normalizedResponse);
    });
    (0, _emberDataPrivateDebug.assert)('normalizeResponse must return a valid JSON API document:\n\t* ' + validationErrors.join('\n\t* '), _ember['default'].isEmpty(validationErrors));

    return normalizedResponse;
  }
});
define("ember-data/-private/system/store/serializers", ["exports"], function (exports) {
  "use strict";

  exports.serializerForAdapter = serializerForAdapter;

  function serializerForAdapter(store, adapter, type) {
    var serializer = adapter.serializer;

    if (serializer === undefined) {
      serializer = store.serializerFor(type);
    }

    if (serializer === null || serializer === undefined) {
      serializer = {
        extract: function extract(store, type, payload) {
          return payload;
        }
      };
    }

    return serializer;
  }
});
define('ember-data/-private/system/store', ['exports', 'ember', 'ember-data/model', 'ember-data/-private/debug', 'ember-data/-private/system/normalize-link', 'ember-data/-private/system/normalize-model-name', 'ember-data/adapters/errors', 'ember-data/-private/system/promise-proxies', 'ember-data/-private/system/store/common', 'ember-data/-private/system/store/serializer-response', 'ember-data/-private/system/store/serializers', 'ember-data/-private/system/store/finders', 'ember-data/-private/utils', 'ember-data/-private/system/coerce-id', 'ember-data/-private/system/record-array-manager', 'ember-data/-private/system/store/container-instance-cache', 'ember-data/-private/system/model/internal-model', 'ember-data/-private/system/empty-object', 'ember-data/-private/features'], function (exports, _ember, _emberDataModel, _emberDataPrivateDebug, _emberDataPrivateSystemNormalizeLink, _emberDataPrivateSystemNormalizeModelName, _emberDataAdaptersErrors, _emberDataPrivateSystemPromiseProxies, _emberDataPrivateSystemStoreCommon, _emberDataPrivateSystemStoreSerializerResponse, _emberDataPrivateSystemStoreSerializers, _emberDataPrivateSystemStoreFinders, _emberDataPrivateUtils, _emberDataPrivateSystemCoerceId, _emberDataPrivateSystemRecordArrayManager, _emberDataPrivateSystemStoreContainerInstanceCache, _emberDataPrivateSystemModelInternalModel, _emberDataPrivateSystemEmptyObject, _emberDataPrivateFeatures) {
  /**
    @module ember-data
  */

  'use strict';

  var badIdFormatAssertion = '`id` has to be non-empty string or number';

  exports.badIdFormatAssertion = badIdFormatAssertion;

  var Backburner = _ember['default']._Backburner;
  var Map = _ember['default'].Map;

  //Get the materialized model from the internalModel/promise that returns
  //an internal model and return it in a promiseObject. Useful for returning
  //from find methods
  function promiseRecord(internalModel, label) {
    var toReturn = internalModel.then(function (model) {
      return model.getRecord();
    });
    return (0, _emberDataPrivateSystemPromiseProxies.promiseObject)(toReturn, label);
  }

  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var once = _ember['default'].run.once;
  var isNone = _ember['default'].isNone;
  var isPresent = _ember['default'].isPresent;
  var Promise = _ember['default'].RSVP.Promise;
  var copy = _ember['default'].copy;
  var Store;

  var Service = _ember['default'].Service;

  // Implementors Note:
  //
  //   The variables in this file are consistently named according to the following
  //   scheme:
  //
  //   * +id+ means an identifier managed by an external source, provided inside
  //     the data provided by that source. These are always coerced to be strings
  //     before being used internally.
  //   * +clientId+ means a transient numerical identifier generated at runtime by
  //     the data store. It is important primarily because newly created objects may
  //     not yet have an externally generated id.
  //   * +internalModel+ means a record internalModel object, which holds metadata about a
  //     record, even if it has not yet been fully materialized.
  //   * +type+ means a DS.Model.

  /**
    The store contains all of the data for records loaded from the server.
    It is also responsible for creating instances of `DS.Model` that wrap
    the individual data for a record, so that they can be bound to in your
    Handlebars templates.
  
    Define your application's store like this:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
    });
    ```
  
    Most Ember.js applications will only have a single `DS.Store` that is
    automatically created by their `Ember.Application`.
  
    You can retrieve models from the store in several ways. To retrieve a record
    for a specific id, use `DS.Store`'s `findRecord()` method:
  
    ```javascript
    store.findRecord('person', 123).then(function (person) {
    });
    ```
  
    By default, the store will talk to your backend using a standard
    REST mechanism. You can customize how the store talks to your
    backend by specifying a custom adapter:
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.Adapter.extend({
    });
    ```
  
    You can learn more about writing a custom adapter by reading the `DS.Adapter`
    documentation.
  
    ### Store createRecord() vs. push() vs. pushPayload()
  
    The store provides multiple ways to create new record objects. They have
    some subtle differences in their use which are detailed below:
  
    [createRecord](#method_createRecord) is used for creating new
    records on the client side. This will return a new record in the
    `created.uncommitted` state. In order to persist this record to the
    backend you will need to call `record.save()`.
  
    [push](#method_push) is used to notify Ember Data's store of new or
    updated records that exist in the backend. This will return a record
    in the `loaded.saved` state. The primary use-case for `store#push` is
    to notify Ember Data about record updates (full or partial) that happen
    outside of the normal adapter methods (for example
    [SSE](http://dev.w3.org/html5/eventsource/) or [Web
    Sockets](http://www.w3.org/TR/2009/WD-websockets-20091222/)).
  
    [pushPayload](#method_pushPayload) is a convenience wrapper for
    `store#push` that will deserialize payloads if the
    Serializer implements a `pushPayload` method.
  
    Note: When creating a new record using any of the above methods
    Ember Data will update `DS.RecordArray`s such as those returned by
    `store#peekAll()`, `store#findAll()` or `store#filter()`. This means any
    data bindings or computed properties that depend on the RecordArray
    will automatically be synced to include the new or updated record
    values.
  
    @class Store
    @namespace DS
    @extends Ember.Service
  */
  exports.Store = Store = Service.extend({

    /**
      @method init
      @private
    */
    init: function init() {
      this._super.apply(this, arguments);
      this._backburner = new Backburner(['normalizeRelationships', 'syncRelationships', 'finished']);
      // internal bookkeeping; not observable
      this.typeMaps = {};
      this.recordArrayManager = _emberDataPrivateSystemRecordArrayManager['default'].create({
        store: this
      });
      this._pendingSave = [];
      this._instanceCache = new _emberDataPrivateSystemStoreContainerInstanceCache['default']((0, _emberDataPrivateUtils.getOwner)(this));
      //Used to keep track of all the find requests that need to be coalesced
      this._pendingFetch = Map.create();
    },

    /**
      The adapter to use to communicate to a backend server or other persistence layer.
       This can be specified as an instance, class, or string.
       If you want to specify `app/adapters/custom.js` as a string, do:
       ```js
      adapter: 'custom'
      ```
       @property adapter
      @default DS.JSONAPIAdapter
      @type {(DS.Adapter|String)}
    */
    adapter: '-json-api',

    /**
      Returns a JSON representation of the record using a custom
      type-specific serializer, if one exists.
       The available options are:
       * `includeId`: `true` if the record's ID should be included in
        the JSON representation
       @method serialize
      @private
      @param {DS.Model} record the record to serialize
      @param {Object} options an options hash
    */
    serialize: function serialize(record, options) {
      var snapshot = record._internalModel.createSnapshot();
      return snapshot.serialize(options);
    },

    /**
      This property returns the adapter, after resolving a possible
      string key.
       If the supplied `adapter` was a class, or a String property
      path resolved to a class, this property will instantiate the
      class.
       This property is cacheable, so the same instance of a specified
      adapter class should be used for the lifetime of the store.
       @property defaultAdapter
      @private
      @return DS.Adapter
    */
    defaultAdapter: _ember['default'].computed('adapter', function () {
      var adapter = get(this, 'adapter');

      (0, _emberDataPrivateDebug.assert)('You tried to set `adapter` property to an instance of `DS.Adapter`, where it should be a name', typeof adapter === 'string');

      adapter = this.retrieveManagedInstance('adapter', adapter);

      return adapter;
    }),

    // .....................
    // . CREATE NEW RECORD .
    // .....................

    /**
      Create a new record in the current store. The properties passed
      to this method are set on the newly created record.
       To create a new instance of a `Post`:
       ```js
      store.createRecord('post', {
        title: "Rails is omakase"
      });
      ```
       To create a new instance of a `Post` that has a relationship with a `User` record:
       ```js
      var user = this.store.peekRecord('user', 1);
      store.createRecord('post', {
        title: "Rails is omakase",
        user: user
      });
      ```
       @method createRecord
      @param {String} modelName
      @param {Object} inputProperties a hash of properties to set on the
        newly created record.
      @return {DS.Model} record
    */
    createRecord: function createRecord(modelName, inputProperties) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's createRecord method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      var typeClass = this.modelFor(modelName);
      var properties = copy(inputProperties) || new _emberDataPrivateSystemEmptyObject['default']();

      // If the passed properties do not include a primary key,
      // give the adapter an opportunity to generate one. Typically,
      // client-side ID generators will use something like uuid.js
      // to avoid conflicts.

      if (isNone(properties.id)) {
        properties.id = this._generateId(modelName, properties);
      }

      // Coerce ID to a string
      properties.id = (0, _emberDataPrivateSystemCoerceId['default'])(properties.id);

      var internalModel = this.buildInternalModel(typeClass, properties.id);
      var record = internalModel.getRecord();

      // Move the record out of its initial `empty` state into
      // the `loaded` state.
      internalModel.loadedData();

      // Set the properties specified on the record.
      record.setProperties(properties);

      internalModel.eachRelationship(function (key, descriptor) {
        internalModel._relationships.get(key).setHasData(true);
      });

      return record;
    },

    /**
      If possible, this method asks the adapter to generate an ID for
      a newly created record.
       @method _generateId
      @private
      @param {String} modelName
      @param {Object} properties from the new record
      @return {String} if the adapter can generate one, an ID
    */
    _generateId: function _generateId(modelName, properties) {
      var adapter = this.adapterFor(modelName);

      if (adapter && adapter.generateIdForRecord) {
        return adapter.generateIdForRecord(this, modelName, properties);
      }

      return null;
    },

    // .................
    // . DELETE RECORD .
    // .................

    /**
      For symmetry, a record can be deleted via the store.
       Example
       ```javascript
      var post = store.createRecord('post', {
        title: "Rails is omakase"
      });
       store.deleteRecord(post);
      ```
       @method deleteRecord
      @param {DS.Model} record
    */
    deleteRecord: function deleteRecord(record) {
      record.deleteRecord();
    },

    /**
      For symmetry, a record can be unloaded via the store. Only
      non-dirty records can be unloaded.
       Example
       ```javascript
      store.findRecord('post', 1).then(function(post) {
        store.unloadRecord(post);
      });
      ```
       @method unloadRecord
      @param {DS.Model} record
    */
    unloadRecord: function unloadRecord(record) {
      record.unloadRecord();
    },

    // ................
    // . FIND RECORDS .
    // ................

    /**
      @method find
      @param {String} modelName
      @param {String|Integer} id
      @param {Object} options
      @return {Promise} promise
      @private
    */
    find: function find(modelName, id, options) {
      // The default `model` hook in Ember.Route calls `find(modelName, id)`,
      // that's why we have to keep this method around even though `findRecord` is
      // the public way to get a record by modelName and id.

      if (arguments.length === 1) {
        (0, _emberDataPrivateDebug.assert)('Using store.find(type) has been removed. Use store.findAll(type) to retrieve all records for a given type.');
      }

      if (_ember['default'].typeOf(id) === 'object') {
        (0, _emberDataPrivateDebug.assert)('Calling store.find() with a query object is no longer supported. Use store.query() instead.');
      }

      if (options) {
        (0, _emberDataPrivateDebug.assert)('Calling store.find(type, id, { preload: preload }) is no longer supported. Use store.findRecord(type, id, { preload: preload }) instead.');
      }

      (0, _emberDataPrivateDebug.assert)("You need to pass the model name and id to the store's find method", arguments.length === 2);
      (0, _emberDataPrivateDebug.assert)("You cannot pass `" + _ember['default'].inspect(id) + "` as id to the store's find method", _ember['default'].typeOf(id) === 'string' || _ember['default'].typeOf(id) === 'number');
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');

      return this.findRecord(modelName, id);
    },

    /**
      This method returns a record for a given type and id combination.
       The `findRecord` method will always resolve its promise with the same
      object for a given type and `id`.
       The `findRecord` method will always return a **promise** that will be
      resolved with the record.
       Example
       ```app/routes/post.js
      import Ember from 'ember';
       export default Ember.Route.extend({
        model: function(params) {
          return this.store.findRecord('post', params.post_id);
        }
      });
      ```
       If the record is not yet available, the store will ask the adapter's `find`
      method to find the necessary data. If the record is already present in the
      store, it depends on the reload behavior _when_ the returned promise
      resolves.
       The reload behavior is configured either via the passed `options` hash or
      the result of the adapter's `shouldReloadRecord`.
       If `{ reload: true }` is passed or `adapter.shouldReloadRecord` evaluates
      to `true`, then the returned promise resolves once the adapter returns
      data, regardless if the requested record is already in the store:
       ```js
      store.push({
        data: {
          id: 1,
          type: 'post',
          revision: 1
        }
      });
       // adapter#findRecord resolves with
      // [
      //   {
      //     id: 1,
      //     type: 'post',
      //     revision: 2
      //   }
      // ]
      store.findRecord('post', 1, { reload: true }).then(function(post) {
        post.get("revision"); // 2
      });
      ```
       If no reload is indicated via the abovementioned ways, then the promise
      immediately resolves with the cached version in the store.
       Optionally, if `adapter.shouldBackgroundReloadRecord` evaluates to `true`,
      then a background reload is started, which updates the records' data, once
      it is available:
       ```js
      // app/adapters/post.js
      import ApplicationAdapter from "./application";
       export default ApplicationAdapter.extend({
        shouldReloadRecord(store, snapshot) {
          return false;
        },
         shouldBackgroundReloadRecord(store, snapshot) {
          return true;
        }
      });
       // ...
       store.push({
        data: {
          id: 1,
          type: 'post',
          revision: 1
        }
      });
       var blogPost = store.findRecord('post', 1).then(function(post) {
        post.get('revision'); // 1
      });
       // later, once adapter#findRecord resolved with
      // [
      //   {
      //     id: 1,
      //     type: 'post',
      //     revision: 2
      //   }
      // ]
       blogPost.get('revision'); // 2
      ```
       See [peekRecord](#method_peekRecord) to get the cached version of a record.
       @method findRecord
      @param {String} modelName
      @param {(String|Integer)} id
      @param {Object} options
      @return {Promise} promise
    */
    findRecord: function findRecord(modelName, id, options) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's findRecord method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      (0, _emberDataPrivateDebug.assert)(badIdFormatAssertion, typeof id === 'string' && id.length > 0 || typeof id === 'number' && !isNaN(id));

      var internalModel = this._internalModelForId(modelName, id);
      options = options || {};

      if (!this.hasRecordForId(modelName, id)) {
        return this._findByInternalModel(internalModel, options);
      }

      var fetchedInternalModel = this._findRecord(internalModel, options);

      return promiseRecord(fetchedInternalModel, "DS: Store#findRecord " + internalModel.typeKey + " with id: " + get(internalModel, 'id'));
    },

    _findRecord: function _findRecord(internalModel, options) {
      // Refetch if the reload option is passed
      if (options.reload) {
        return this.scheduleFetch(internalModel, options);
      }

      // Refetch the record if the adapter thinks the record is stale
      var snapshot = internalModel.createSnapshot(options);
      var typeClass = internalModel.type;
      var adapter = this.adapterFor(typeClass.modelName);
      if (adapter.shouldReloadRecord(this, snapshot)) {
        return this.scheduleFetch(internalModel, options);
      }

      // Trigger the background refetch if all the previous checks fail
      if (adapter.shouldBackgroundReloadRecord(this, snapshot)) {
        this.scheduleFetch(internalModel, options);
      }

      // Return the cached record
      return Promise.resolve(internalModel);
    },

    _findByInternalModel: function _findByInternalModel(internalModel, options) {
      options = options || {};

      if (options.preload) {
        internalModel._preloadData(options.preload);
      }

      var fetchedInternalModel = this._findEmptyInternalModel(internalModel, options);

      return promiseRecord(fetchedInternalModel, "DS: Store#findRecord " + internalModel.typeKey + " with id: " + get(internalModel, 'id'));
    },

    _findEmptyInternalModel: function _findEmptyInternalModel(internalModel, options) {
      if (internalModel.isEmpty()) {
        return this.scheduleFetch(internalModel, options);
      }

      //TODO double check about reloading
      if (internalModel.isLoading()) {
        return internalModel._loadingPromise;
      }

      return Promise.resolve(internalModel);
    },

    /**
      This method makes a series of requests to the adapter's `find` method
      and returns a promise that resolves once they are all loaded.
       @private
      @method findByIds
      @param {String} modelName
      @param {Array} ids
      @return {Promise} promise
    */
    findByIds: function findByIds(modelName, ids) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's findByIds method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      var promises = new Array(ids.length);

      for (var i = 0; i < ids.length; i++) {
        promises[i] = this.findRecord(modelName, ids[i]);
      }

      return (0, _emberDataPrivateSystemPromiseProxies.promiseArray)(_ember['default'].RSVP.all(promises).then(_ember['default'].A, null, "DS: Store#findByIds of " + modelName + " complete"));
    },

    /**
      This method is called by `findRecord` if it discovers that a particular
      type/id pair hasn't been loaded yet to kick off a request to the
      adapter.
       @method fetchRecord
      @private
      @param {InternalModel} internalModel model
      @return {Promise} promise
     */
    // TODO rename this to have an underscore
    fetchRecord: function fetchRecord(internalModel, options) {
      var typeClass = internalModel.type;
      var id = internalModel.id;
      var adapter = this.adapterFor(typeClass.modelName);

      (0, _emberDataPrivateDebug.assert)("You tried to find a record but you have no adapter (for " + typeClass + ")", adapter);
      (0, _emberDataPrivateDebug.assert)("You tried to find a record but your adapter (for " + typeClass + ") does not implement 'findRecord'", typeof adapter.findRecord === 'function' || typeof adapter.find === 'function');

      var promise = (0, _emberDataPrivateSystemStoreFinders._find)(adapter, this, typeClass, id, internalModel, options);
      return promise;
    },

    scheduleFetchMany: function scheduleFetchMany(records) {
      var internalModels = new Array(records.length);
      var fetches = new Array(records.length);
      for (var i = 0; i < records.length; i++) {
        internalModels[i] = records[i]._internalModel;
      }

      for (var i = 0; i < internalModels.length; i++) {
        fetches[i] = this.scheduleFetch(internalModels[i]);
      }

      return _ember['default'].RSVP.Promise.all(fetches);
    },

    scheduleFetch: function scheduleFetch(internalModel, options) {
      var typeClass = internalModel.type;

      if (internalModel._loadingPromise) {
        return internalModel._loadingPromise;
      }

      var resolver = _ember['default'].RSVP.defer('Fetching ' + typeClass + 'with id: ' + internalModel.id);
      var pendingFetchItem = {
        record: internalModel,
        resolver: resolver,
        options: options
      };
      var promise = resolver.promise;

      internalModel.loadingData(promise);

      if (!this._pendingFetch.get(typeClass)) {
        this._pendingFetch.set(typeClass, [pendingFetchItem]);
      } else {
        this._pendingFetch.get(typeClass).push(pendingFetchItem);
      }
      _ember['default'].run.scheduleOnce('afterRender', this, this.flushAllPendingFetches);

      return promise;
    },

    flushAllPendingFetches: function flushAllPendingFetches() {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }

      this._pendingFetch.forEach(this._flushPendingFetchForType, this);
      this._pendingFetch = Map.create();
    },

    _flushPendingFetchForType: function _flushPendingFetchForType(pendingFetchItems, typeClass) {
      var store = this;
      var adapter = store.adapterFor(typeClass.modelName);
      var shouldCoalesce = !!adapter.findMany && adapter.coalesceFindRequests;
      var records = _ember['default'].A(pendingFetchItems).mapBy('record');

      function _fetchRecord(recordResolverPair) {
        recordResolverPair.resolver.resolve(store.fetchRecord(recordResolverPair.record, recordResolverPair.options)); // TODO adapter options
      }

      function resolveFoundRecords(records) {
        records.forEach(function (record) {
          var pair = _ember['default'].A(pendingFetchItems).findBy('record', record);
          if (pair) {
            var resolver = pair.resolver;
            resolver.resolve(record);
          }
        });
        return records;
      }

      function makeMissingRecordsRejector(requestedRecords) {
        return function rejectMissingRecords(resolvedRecords) {
          resolvedRecords = _ember['default'].A(resolvedRecords);
          var missingRecords = requestedRecords.reject(function (record) {
            return resolvedRecords.contains(record);
          });
          if (missingRecords.length) {
            (0, _emberDataPrivateDebug.warn)('Ember Data expected to find records with the following ids in the adapter response but they were missing: ' + _ember['default'].inspect(_ember['default'].A(missingRecords).mapBy('id')), false, {
              id: 'ds.store.missing-records-from-adapter'
            });
          }
          rejectRecords(missingRecords);
        };
      }

      function makeRecordsRejector(records) {
        return function (error) {
          rejectRecords(records, error);
        };
      }

      function rejectRecords(records, error) {
        records.forEach(function (record) {
          var pair = _ember['default'].A(pendingFetchItems).findBy('record', record);
          if (pair) {
            var resolver = pair.resolver;
            resolver.reject(error);
          }
        });
      }

      if (pendingFetchItems.length === 1) {
        _fetchRecord(pendingFetchItems[0]);
      } else if (shouldCoalesce) {

        // TODO: Improve records => snapshots => records => snapshots
        //
        // We want to provide records to all store methods and snapshots to all
        // adapter methods. To make sure we're doing that we're providing an array
        // of snapshots to adapter.groupRecordsForFindMany(), which in turn will
        // return grouped snapshots instead of grouped records.
        //
        // But since the _findMany() finder is a store method we need to get the
        // records from the grouped snapshots even though the _findMany() finder
        // will once again convert the records to snapshots for adapter.findMany()

        var snapshots = _ember['default'].A(records).invoke('createSnapshot');
        var groups = adapter.groupRecordsForFindMany(this, snapshots);
        groups.forEach(function (groupOfSnapshots) {
          var groupOfRecords = _ember['default'].A(groupOfSnapshots).mapBy('_internalModel');
          var requestedRecords = _ember['default'].A(groupOfRecords);
          var ids = requestedRecords.mapBy('id');
          if (ids.length > 1) {
            (0, _emberDataPrivateSystemStoreFinders._findMany)(adapter, store, typeClass, ids, requestedRecords).then(resolveFoundRecords).then(makeMissingRecordsRejector(requestedRecords)).then(null, makeRecordsRejector(requestedRecords));
          } else if (ids.length === 1) {
            var pair = _ember['default'].A(pendingFetchItems).findBy('record', groupOfRecords[0]);
            _fetchRecord(pair);
          } else {
            (0, _emberDataPrivateDebug.assert)("You cannot return an empty array from adapter's method groupRecordsForFindMany", false);
          }
        });
      } else {
        pendingFetchItems.forEach(_fetchRecord);
      }
    },

    /**
      Get a record by a given type and ID without triggering a fetch.
       This method will synchronously return the record if it is available in the store,
      otherwise it will return `null`. A record is available if it has been fetched earlier, or
      pushed manually into the store.
       _Note: This is an synchronous method and does not return a promise._
       ```js
      var post = store.peekRecord('post', 1);
       post.get('id'); // 1
      ```
       @method peekRecord
      @param {String} modelName
      @param {String|Integer} id
      @return {DS.Model|null} record
    */
    peekRecord: function peekRecord(modelName, id) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's peekRecord method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      if (this.hasRecordForId(modelName, id)) {
        return this._internalModelForId(modelName, id).getRecord();
      } else {
        return null;
      }
    },

    /**
      This method is called by the record's `reload` method.
       This method calls the adapter's `find` method, which returns a promise. When
      **that** promise resolves, `reloadRecord` will resolve the promise returned
      by the record's `reload`.
       @method reloadRecord
      @private
      @param {DS.Model} internalModel
      @return {Promise} promise
    */
    reloadRecord: function reloadRecord(internalModel) {
      var modelName = internalModel.type.modelName;
      var adapter = this.adapterFor(modelName);
      var id = internalModel.id;

      (0, _emberDataPrivateDebug.assert)("You cannot reload a record without an ID", id);
      (0, _emberDataPrivateDebug.assert)("You tried to reload a record but you have no adapter (for " + modelName + ")", adapter);
      (0, _emberDataPrivateDebug.assert)("You tried to reload a record but your adapter does not implement `findRecord`", typeof adapter.findRecord === 'function' || typeof adapter.find === 'function');

      return this.scheduleFetch(internalModel);
    },

    /**
      Returns true if a record for a given type and ID is already loaded.
       @method hasRecordForId
      @param {(String|DS.Model)} modelName
      @param {(String|Integer)} inputId
      @return {Boolean}
    */
    hasRecordForId: function hasRecordForId(modelName, inputId) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's hasRecordForId method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      var typeClass = this.modelFor(modelName);
      var id = (0, _emberDataPrivateSystemCoerceId['default'])(inputId);
      var internalModel = this.typeMapFor(typeClass).idToRecord[id];
      return !!internalModel && internalModel.isLoaded();
    },

    /**
      Returns id record for a given type and ID. If one isn't already loaded,
      it builds a new record and leaves it in the `empty` state.
       @method recordForId
      @private
      @param {String} modelName
      @param {(String|Integer)} id
      @return {DS.Model} record
    */
    recordForId: function recordForId(modelName, id) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's recordForId method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      return this._internalModelForId(modelName, id).getRecord();
    },

    _internalModelForId: function _internalModelForId(typeName, inputId) {
      var typeClass = this.modelFor(typeName);
      var id = (0, _emberDataPrivateSystemCoerceId['default'])(inputId);
      var idToRecord = this.typeMapFor(typeClass).idToRecord;
      var record = idToRecord[id];

      if (!record || !idToRecord[id]) {
        record = this.buildInternalModel(typeClass, id);
      }

      return record;
    },

    /**
      @method findMany
      @private
      @param {Array} internalModels
      @return {Promise} promise
    */
    findMany: function findMany(internalModels) {
      var finds = new Array(internalModels.length);

      for (var i = 0; i < internalModels.length; i++) {
        finds[i] = this._findByInternalModel(internalModels[i]);
      }

      return Promise.all(finds);
    },

    /**
      If a relationship was originally populated by the adapter as a link
      (as opposed to a list of IDs), this method is called when the
      relationship is fetched.
       The link (which is usually a URL) is passed through unchanged, so the
      adapter can make whatever request it wants.
       The usual use-case is for the server to register a URL as a link, and
      then use that URL in the future to make a request for the relationship.
       @method findHasMany
      @private
      @param {DS.Model} owner
      @param {any} link
      @param {(Relationship)} relationship
      @return {Promise} promise
    */
    findHasMany: function findHasMany(owner, link, relationship) {
      var adapter = this.adapterFor(owner.type.modelName);

      (0, _emberDataPrivateDebug.assert)("You tried to load a hasMany relationship but you have no adapter (for " + owner.type + ")", adapter);
      (0, _emberDataPrivateDebug.assert)("You tried to load a hasMany relationship from a specified `link` in the original payload but your adapter does not implement `findHasMany`", typeof adapter.findHasMany === 'function');

      return (0, _emberDataPrivateSystemStoreFinders._findHasMany)(adapter, this, owner, link, relationship);
    },

    /**
      @method findBelongsTo
      @private
      @param {DS.Model} owner
      @param {any} link
      @param {Relationship} relationship
      @return {Promise} promise
    */
    findBelongsTo: function findBelongsTo(owner, link, relationship) {
      var adapter = this.adapterFor(owner.type.modelName);

      (0, _emberDataPrivateDebug.assert)("You tried to load a belongsTo relationship but you have no adapter (for " + owner.type + ")", adapter);
      (0, _emberDataPrivateDebug.assert)("You tried to load a belongsTo relationship from a specified `link` in the original payload but your adapter does not implement `findBelongsTo`", typeof adapter.findBelongsTo === 'function');

      return (0, _emberDataPrivateSystemStoreFinders._findBelongsTo)(adapter, this, owner, link, relationship);
    },

    /**
      This method delegates a query to the adapter. This is the one place where
      adapter-level semantics are exposed to the application.
       Exposing queries this way seems preferable to creating an abstract query
      language for all server-side queries, and then require all adapters to
      implement them.
       ---
       If you do something like this:
       ```javascript
      store.query('person', { page: 1 });
      ```
       The call made to the server, using a Rails backend, will look something like this:
       ```
      Started GET "/api/v1/person?page=1"
      Processing by Api::V1::PersonsController#index as HTML
      Parameters: { "page"=>"1" }
      ```
       ---
       If you do something like this:
       ```javascript
      store.query('person', { ids: [1, 2, 3] });
      ```
       The call to the server, using a Rails backend, will look something like this:
       ```
      Started GET "/api/v1/person?ids%5B%5D=1&ids%5B%5D=2&ids%5B%5D=3"
      Processing by Api::V1::PersonsController#index as HTML
      Parameters: { "ids" => ["1", "2", "3"] }
      ```
       This method returns a promise, which is resolved with a `RecordArray`
      once the server returns.
       @method query
      @param {String} modelName
      @param {any} query an opaque query to be used by the adapter
      @return {Promise} promise
    */
    query: function query(modelName, _query2) {
      return this._query(modelName, _query2);
    },

    _query: function _query(modelName, query, array) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's query method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)("You need to pass a query hash to the store's query method", query);
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      var typeClass = this.modelFor(modelName);
      array = array || this.recordArrayManager.createAdapterPopulatedRecordArray(typeClass, query);

      var adapter = this.adapterFor(modelName);

      (0, _emberDataPrivateDebug.assert)("You tried to load a query but you have no adapter (for " + typeClass + ")", adapter);
      (0, _emberDataPrivateDebug.assert)("You tried to load a query but your adapter does not implement `query`", typeof adapter.query === 'function');

      return (0, _emberDataPrivateSystemPromiseProxies.promiseArray)((0, _emberDataPrivateSystemStoreFinders._query)(adapter, this, typeClass, query, array));
    },

    /**
      This method makes a request for one record, where the `id` is not known
      beforehand (if the `id` is known, use `findRecord` instead).
       This method can be used when it is certain that the server will return a
      single object for the primary data.
       Let's assume our API provides an endpoint for the currently logged in user
      via:
       ```
      // GET /api/current_user
      {
        user: {
          id: 1234,
          username: 'admin'
        }
      }
      ```
       Since the specific `id` of the `user` is not known beforehand, we can use
      `queryRecord` to get the user:
       ```javascript
      store.queryRecord('user', {}).then(function(user) {
        let username = user.get('username');
        console.log(`Currently logged in as ${username}`);
      });
      ```
       The request is made through the adapters' `queryRecord`:
       ```javascript
      // app/adapters/user.js
      import Adapter from "ember-data/adapter";
       export default Adapter.extend({
        queryRecord(modelName, query) {
          return Ember.$.getJSON("/api/current_user");
        }
      });
      ```
       Note: the primary use case for `store.queryRecord` is when a single record
      is queried and the `id` is not kown beforehand. In all other cases
      `store.query` and using the first item of the array is likely the preferred
      way:
       ```
      // GET /users?username=unique
      {
        data: [{
          id: 1234,
          type: 'user',
          attributes: {
            username: "unique"
          }
        }]
      }
      ```
       ```javascript
      store.query('user', { username: 'unique' }).then(function(users) {
        return users.get('firstObject');
      }).then(function(user) {
        let id = user.get('id');
      });
      ```
       This method returns a promise, which resolves with the found record.
       If the adapter returns no data for the primary data of the payload, then
      `queryRecord` resolves with `null`:
       ```
      // GET /users?username=unique
      {
        data: null
      }
      ```
       ```javascript
      store.queryRecord('user', { username: 'unique' }).then(function(user) {
        console.log(user); // null
      });
      ```
       @method queryRecord
      @param {String} modelName
      @param {any} query an opaque query to be used by the adapter
      @return {Promise} promise which resolves with the found record or `null`
    */
    queryRecord: function queryRecord(modelName, query) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's queryRecord method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)("You need to pass a query hash to the store's queryRecord method", query);
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');

      var typeClass = this.modelFor(modelName);
      var adapter = this.adapterFor(modelName);

      (0, _emberDataPrivateDebug.assert)("You tried to make a query but you have no adapter (for " + typeClass + ")", adapter);
      (0, _emberDataPrivateDebug.assert)("You tried to make a query but your adapter does not implement `queryRecord`", typeof adapter.queryRecord === 'function');

      return (0, _emberDataPrivateSystemPromiseProxies.promiseObject)((0, _emberDataPrivateSystemStoreFinders._queryRecord)(adapter, this, typeClass, query));
    },

    /**
      `findAll` ask the adapter's `findAll` method to find the records for the
      given type, and returns a promise which will resolve with all records of
      this type present in the store, even if the adapter only returns a subset
      of them.
       ```app/routes/authors.js
      import Ember from 'ember';
       export default Ember.Route.extend({
        model: function(params) {
          return this.store.findAll('author');
        }
      });
      ```
       _When_ the returned promise resolves depends on the reload behavior,
      configured via the passed `options` hash and the result of the adapter's
      `shouldReloadAll` method.
       If `{ reload: true }` is passed or `adapter.shouldReloadAll` evaluates to
      `true`, then the returned promise resolves once the adapter returns data,
      regardless if there are already records in the store:
       ```js
      store.push({
        data: {
          id: 'first',
          type: 'author'
        }
      });
       // adapter#findAll resolves with
      // [
      //   {
      //     id: 'second',
      //     type: 'author'
      //   }
      // ]
      store.findAll('author', { reload: true }).then(function(authors) {
        authors.getEach("id"); // ['first', 'second']
      });
      ```
       If no reload is indicated via the abovementioned ways, then the promise
      immediately resolves with all the records currently loaded in the store.
      Optionally, if `adapter.shouldBackgroundReloadAll` evaluates to `true`,
      then a background reload is started. Once this resolves, the array with
      which the promise resolves, is updated automatically so it contains all the
      records in the store:
       ```js
      // app/adapters/application.js
      export default DS.Adapter.extend({
        shouldReloadAll(store, snapshotsArray) {
          return false;
        },
         shouldBackgroundReloadAll(store, snapshotsArray) {
          return true;
        }
      });
       // ...
       store.push({
        data: {
          id: 'first',
          type: 'author'
        }
      });
       var allAuthors;
      store.findAll('author').then(function(authors) {
        authors.getEach('id'); // ['first']
         allAuthors = authors;
      });
       // later, once adapter#findAll resolved with
      // [
      //   {
      //     id: 'second',
      //     type: 'author'
      //   }
      // ]
       allAuthors.getEach('id'); // ['first', 'second']
      ```
       See [peekAll](#method_peekAll) to get an array of current records in the
      store, without waiting until a reload is finished.
       See [query](#method_query) to only get a subset of records from the server.
       @method findAll
      @param {String} modelName
      @param {Object} options
      @return {Promise} promise
    */
    findAll: function findAll(modelName, options) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's findAll method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      var typeClass = this.modelFor(modelName);

      return this._fetchAll(typeClass, this.peekAll(modelName), options);
    },

    /**
      @method _fetchAll
      @private
      @param {DS.Model} typeClass
      @param {DS.RecordArray} array
      @return {Promise} promise
    */
    _fetchAll: function _fetchAll(typeClass, array, options) {
      options = options || {};
      var adapter = this.adapterFor(typeClass.modelName);
      var sinceToken = this.typeMapFor(typeClass).metadata.since;

      (0, _emberDataPrivateDebug.assert)("You tried to load all records but you have no adapter (for " + typeClass + ")", adapter);
      (0, _emberDataPrivateDebug.assert)("You tried to load all records but your adapter does not implement `findAll`", typeof adapter.findAll === 'function');

      set(array, 'isUpdating', true);

      if (options.reload) {
        return (0, _emberDataPrivateSystemPromiseProxies.promiseArray)((0, _emberDataPrivateSystemStoreFinders._findAll)(adapter, this, typeClass, sinceToken, options));
      }
      var snapshotArray = array.createSnapshot(options);
      if (adapter.shouldReloadAll(this, snapshotArray)) {
        return (0, _emberDataPrivateSystemPromiseProxies.promiseArray)((0, _emberDataPrivateSystemStoreFinders._findAll)(adapter, this, typeClass, sinceToken, options));
      }
      if (adapter.shouldBackgroundReloadAll(this, snapshotArray)) {
        (0, _emberDataPrivateSystemStoreFinders._findAll)(adapter, this, typeClass, sinceToken, options);
      }
      return (0, _emberDataPrivateSystemPromiseProxies.promiseArray)(Promise.resolve(array));
    },

    /**
      @method didUpdateAll
      @param {DS.Model} typeClass
      @private
    */
    didUpdateAll: function didUpdateAll(typeClass) {
      var liveRecordArray = this.recordArrayManager.liveRecordArrayFor(typeClass);
      set(liveRecordArray, 'isUpdating', false);
    },

    /**
      This method returns a filtered array that contains all of the
      known records for a given type in the store.
       Note that because it's just a filter, the result will contain any
      locally created records of the type, however, it will not make a
      request to the backend to retrieve additional records. If you
      would like to request all the records from the backend please use
      [store.findAll](#method_findAll).
       Also note that multiple calls to `peekAll` for a given type will always
      return the same `RecordArray`.
       Example
       ```javascript
      var localPosts = store.peekAll('post');
      ```
       @method peekAll
      @param {String} modelName
      @return {DS.RecordArray}
    */
    peekAll: function peekAll(modelName) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's peekAll method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      var typeClass = this.modelFor(modelName);

      var liveRecordArray = this.recordArrayManager.liveRecordArrayFor(typeClass);
      this.recordArrayManager.populateLiveRecordArray(liveRecordArray, typeClass);

      return liveRecordArray;
    },

    /**
     This method unloads all records in the store.
      Optionally you can pass a type which unload all records for a given type.
      ```javascript
     store.unloadAll();
     store.unloadAll('post');
     ```
      @method unloadAll
     @param {String=} modelName
    */
    unloadAll: function unloadAll(modelName) {
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), !modelName || typeof modelName === 'string');
      if (arguments.length === 0) {
        var typeMaps = this.typeMaps;
        var keys = Object.keys(typeMaps);
        var types = new Array(keys.length);

        for (var i = 0; i < keys.length; i++) {
          types[i] = typeMaps[keys[i]]['type'].modelName;
        }

        types.forEach(this.unloadAll, this);
      } else {
        var typeClass = this.modelFor(modelName);
        var typeMap = this.typeMapFor(typeClass);
        var records = typeMap.records.slice();
        var record = undefined;

        for (var i = 0; i < records.length; i++) {
          record = records[i];
          record.unloadRecord();
          record.destroy(); // maybe within unloadRecord
        }

        typeMap.metadata = new _emberDataPrivateSystemEmptyObject['default']();
      }
    },

    /**
      Takes a type and filter function, and returns a live RecordArray that
      remains up to date as new records are loaded into the store or created
      locally.
       The filter function takes a materialized record, and returns true
      if the record should be included in the filter and false if it should
      not.
       Example
       ```javascript
      store.filter('post', function(post) {
        return post.get('unread');
      });
      ```
       The filter function is called once on all records for the type when
      it is created, and then once on each newly loaded or created record.
       If any of a record's properties change, or if it changes state, the
      filter function will be invoked again to determine whether it should
      still be in the array.
       Optionally you can pass a query, which is the equivalent of calling
      [query](#method_query) with that same query, to fetch additional records
      from the server. The results returned by the server could then appear
      in the filter if they match the filter function.
       The query itself is not used to filter records, it's only sent to your
      server for you to be able to do server-side filtering. The filter
      function will be applied on the returned results regardless.
       Example
       ```javascript
      store.filter('post', { unread: true }, function(post) {
        return post.get('unread');
      }).then(function(unreadPosts) {
        unreadPosts.get('length'); // 5
        var unreadPost = unreadPosts.objectAt(0);
        unreadPost.set('unread', false);
        unreadPosts.get('length'); // 4
      });
      ```
       @method filter
      @private
      @param {String} modelName
      @param {Object} query optional query
      @param {Function} filter
      @return {DS.PromiseArray}
      @deprecated
    */
    filter: function filter(modelName, query, _filter) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's filter method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');

      if (!_ember['default'].ENV.ENABLE_DS_FILTER) {
        (0, _emberDataPrivateDebug.assert)('The filter API has been moved to a plugin. To enable store.filter using an environment flag, or to use an alternative, you can visit the ember-data-filter addon page. https://github.com/ember-data/ember-data-filter', false);
      }

      var promise;
      var length = arguments.length;
      var array;
      var hasQuery = length === 3;

      // allow an optional server query
      if (hasQuery) {
        promise = this.query(modelName, query);
      } else if (arguments.length === 2) {
        _filter = query;
      }

      modelName = this.modelFor(modelName);

      if (hasQuery) {
        array = this.recordArrayManager.createFilteredRecordArray(modelName, _filter, query);
      } else {
        array = this.recordArrayManager.createFilteredRecordArray(modelName, _filter);
      }

      promise = promise || Promise.resolve(array);

      return (0, _emberDataPrivateSystemPromiseProxies.promiseArray)(promise.then(function () {
        return array;
      }, null, 'DS: Store#filter of ' + modelName));
    },

    /**
      This method returns if a certain record is already loaded
      in the store. Use this function to know beforehand if a findRecord()
      will result in a request or that it will be a cache hit.
        Example
       ```javascript
      store.recordIsLoaded('post', 1); // false
      store.findRecord('post', 1).then(function() {
        store.recordIsLoaded('post', 1); // true
      });
      ```
       @method recordIsLoaded
      @param {String} modelName
      @param {string} id
      @return {boolean}
    */
    recordIsLoaded: function recordIsLoaded(modelName, id) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's recordIsLoaded method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      return this.hasRecordForId(modelName, id);
    },

    // ............
    // . UPDATING .
    // ............

    /**
      If the adapter updates attributes the record will notify
      the store to update its  membership in any filters.
      To avoid thrashing, this method is invoked only once per
      run loop per record.
       @method dataWasUpdated
      @private
      @param {Class} type
      @param {InternalModel} internalModel
    */
    dataWasUpdated: function dataWasUpdated(type, internalModel) {
      this.recordArrayManager.recordDidChange(internalModel);
    },

    // ..............
    // . PERSISTING .
    // ..............

    /**
      This method is called by `record.save`, and gets passed a
      resolver for the promise that `record.save` returns.
       It schedules saving to happen at the end of the run loop.
       @method scheduleSave
      @private
      @param {InternalModel} internalModel
      @param {Resolver} resolver
      @param {Object} options
    */
    scheduleSave: function scheduleSave(internalModel, resolver, options) {
      var snapshot = internalModel.createSnapshot(options);
      internalModel.flushChangedAttributes();
      internalModel.adapterWillCommit();
      this._pendingSave.push({
        snapshot: snapshot,
        resolver: resolver
      });
      once(this, 'flushPendingSave');
    },

    /**
      This method is called at the end of the run loop, and
      flushes any records passed into `scheduleSave`
       @method flushPendingSave
      @private
    */
    flushPendingSave: function flushPendingSave() {
      var _this = this;

      var pending = this._pendingSave.slice();
      this._pendingSave = [];

      pending.forEach(function (pendingItem) {
        var snapshot = pendingItem.snapshot;
        var resolver = pendingItem.resolver;
        var record = snapshot._internalModel;
        var adapter = _this.adapterFor(record.type.modelName);
        var operation;

        if (get(record, 'currentState.stateName') === 'root.deleted.saved') {
          return resolver.resolve();
        } else if (record.isNew()) {
          operation = 'createRecord';
        } else if (record.isDeleted()) {
          operation = 'deleteRecord';
        } else {
          operation = 'updateRecord';
        }

        resolver.resolve(_commit(adapter, _this, operation, snapshot));
      });
    },

    /**
      This method is called once the promise returned by an
      adapter's `createRecord`, `updateRecord` or `deleteRecord`
      is resolved.
       If the data provides a server-generated ID, it will
      update the record and the store's indexes.
       @method didSaveRecord
      @private
      @param {InternalModel} internalModel the in-flight internal model
      @param {Object} data optional data (see above)
    */
    didSaveRecord: function didSaveRecord(internalModel, dataArg) {
      var data;
      if (dataArg) {
        data = dataArg.data;
      }
      if (data) {
        // normalize relationship IDs into records
        this._backburner.schedule('normalizeRelationships', this, '_setupRelationships', internalModel, data);
        this.updateId(internalModel, data);
      }

      //We first make sure the primary data has been updated
      //TODO try to move notification to the user to the end of the runloop
      internalModel.adapterDidCommit(data);
    },

    /**
      This method is called once the promise returned by an
      adapter's `createRecord`, `updateRecord` or `deleteRecord`
      is rejected with a `DS.InvalidError`.
       @method recordWasInvalid
      @private
      @param {InternalModel} internalModel
      @param {Object} errors
    */
    recordWasInvalid: function recordWasInvalid(internalModel, errors) {
      internalModel.adapterDidInvalidate(errors);
    },

    /**
      This method is called once the promise returned by an
      adapter's `createRecord`, `updateRecord` or `deleteRecord`
      is rejected (with anything other than a `DS.InvalidError`).
       @method recordWasError
      @private
      @param {InternalModel} internalModel
      @param {Error} error
    */
    recordWasError: function recordWasError(internalModel, error) {
      internalModel.adapterDidError(error);
    },

    /**
      When an adapter's `createRecord`, `updateRecord` or `deleteRecord`
      resolves with data, this method extracts the ID from the supplied
      data.
       @method updateId
      @private
      @param {InternalModel} internalModel
      @param {Object} data
    */
    updateId: function updateId(internalModel, data) {
      var oldId = internalModel.id;
      var id = (0, _emberDataPrivateSystemCoerceId['default'])(data.id);

      (0, _emberDataPrivateDebug.assert)("An adapter cannot assign a new id to a record that already has an id. " + internalModel + " had id: " + oldId + " and you tried to update it with " + id + ". This likely happened because your server returned data in response to a find or update that had a different id than the one you sent.", oldId === null || id === oldId);

      this.typeMapFor(internalModel.type).idToRecord[id] = internalModel;

      internalModel.setId(id);
    },

    /**
      Returns a map of IDs to client IDs for a given type.
       @method typeMapFor
      @private
      @param {DS.Model} typeClass
      @return {Object} typeMap
    */
    typeMapFor: function typeMapFor(typeClass) {
      var typeMaps = get(this, 'typeMaps');
      var guid = _ember['default'].guidFor(typeClass);
      var typeMap = typeMaps[guid];

      if (typeMap) {
        return typeMap;
      }

      typeMap = {
        idToRecord: new _emberDataPrivateSystemEmptyObject['default'](),
        records: [],
        metadata: new _emberDataPrivateSystemEmptyObject['default'](),
        type: typeClass
      };

      typeMaps[guid] = typeMap;

      return typeMap;
    },

    // ................
    // . LOADING DATA .
    // ................

    /**
      This internal method is used by `push`.
       @method _load
      @private
      @param {(String|DS.Model)} type
      @param {Object} data
    */
    _load: function _load(data) {
      var internalModel = this._internalModelForId(data.type, data.id);

      internalModel.setupData(data);

      this.recordArrayManager.recordDidChange(internalModel);

      return internalModel;
    },

    /*
      In case someone defined a relationship to a mixin, for example:
      ```
        var Comment = DS.Model.extend({
          owner: belongsTo('commentable'. { polymorphic: true})
        });
        var Commentable = Ember.Mixin.create({
          comments: hasMany('comment')
        });
      ```
      we want to look up a Commentable class which has all the necessary
      relationship metadata. Thus, we look up the mixin and create a mock
      DS.Model, so we can access the relationship CPs of the mixin (`comments`)
      in this case
    */

    _modelForMixin: function _modelForMixin(modelName) {
      var normalizedModelName = (0, _emberDataPrivateSystemNormalizeModelName['default'])(modelName);
      // container.registry = 2.1
      // container._registry = 1.11 - 2.0
      // container = < 1.11
      var owner = (0, _emberDataPrivateUtils.getOwner)(this);

      var mixin = owner._lookupFactory('mixin:' + normalizedModelName);
      if (mixin) {
        //Cache the class as a model
        owner.register('model:' + normalizedModelName, _emberDataModel['default'].extend(mixin));
      }
      var factory = this.modelFactoryFor(normalizedModelName);
      if (factory) {
        factory.__isMixin = true;
        factory.__mixin = mixin;
      }

      return factory;
    },

    /**
      Returns a model class for a particular key. Used by
      methods that take a type key (like `find`, `createRecord`,
      etc.)
       @method modelFor
      @param {String} modelName
      @return {DS.Model}
    */
    modelFor: function modelFor(modelName) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's modelFor method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');

      var factory = this.modelFactoryFor(modelName);
      if (!factory) {
        //Support looking up mixins as base types for polymorphic relationships
        factory = this._modelForMixin(modelName);
      }
      if (!factory) {
        throw new _ember['default'].Error("No model was found for '" + modelName + "'");
      }
      factory.modelName = factory.modelName || (0, _emberDataPrivateSystemNormalizeModelName['default'])(modelName);

      return factory;
    },

    modelFactoryFor: function modelFactoryFor(modelName) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's modelFactoryFor method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      var normalizedKey = (0, _emberDataPrivateSystemNormalizeModelName['default'])(modelName);

      var owner = (0, _emberDataPrivateUtils.getOwner)(this);

      return owner._lookupFactory('model:' + normalizedKey);
    },

    /**
      Push some data for a given type into the store.
       This method expects normalized [JSON API](http://jsonapi.org/) document. This means you have to follow [JSON API specification](http://jsonapi.org/format/) with few minor adjustments:
      - record's `type` should always be in singular, dasherized form
      - members (properties) should be camelCased
       [Your primary data should be wrapped inside `data` property](http://jsonapi.org/format/#document-top-level):
       ```js
      store.push({
        data: {
          // primary data for single record of type `Person`
          id: '1',
          type: 'person',
          attributes: {
            firstName: 'Daniel',
            lastName: 'Kmak'
          }
        }
      });
      ```
       [Demo.](http://ember-twiddle.com/fb99f18cd3b4d3e2a4c7)
       `data` property can also hold an array (of records):
       ```js
      store.push({
        data: [
          // an array of records
          {
            id: '1',
            type: 'person',
            attributes: {
              firstName: 'Daniel',
              lastName: 'Kmak'
            }
          },
          {
            id: '2',
            type: 'person',
            attributes: {
              firstName: 'Tom',
              lastName: 'Dale'
            }
          }
        ]
      });
      ```
       [Demo.](http://ember-twiddle.com/69cdbeaa3702159dc355)
       There are some typical properties for `JSONAPI` payload:
      * `id` - mandatory, unique record's key
      * `type` - mandatory string which matches `model`'s dasherized name in singular form
      * `attributes` - object which holds data for record attributes - `DS.attr`'s declared in model
      * `relationships` - object which must contain any of the following properties under each relationships' respective key (example path is `relationships.achievements.data`):
        - [`links`](http://jsonapi.org/format/#document-links)
        - [`data`](http://jsonapi.org/format/#document-resource-object-linkage) - place for primary data
        - [`meta`](http://jsonapi.org/format/#document-meta) - object which contains meta-information about relationship
       For this model:
       ```app/models/person.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        firstName: DS.attr('string'),
        lastName: DS.attr('string'),
         children: DS.hasMany('person')
      });
      ```
       To represent the children as IDs:
       ```js
      {
        data: {
          id: '1',
          type: 'person',
          attributes: {
            firstName: 'Tom',
            lastName: 'Dale'
          },
          relationships: {
            children: {
              data: [
                {
                  id: '2',
                  type: 'person'
                },
                {
                  id: '3',
                  type: 'person'
                },
                {
                  id: '4',
                  type: 'person'
                }
              ]
            }
          }
        }
      }
      ```
       [Demo.](http://ember-twiddle.com/343e1735e034091f5bde)
       To represent the children relationship as a URL:
       ```js
      {
        data: {
          id: '1',
          type: 'person',
          attributes: {
            firstName: 'Tom',
            lastName: 'Dale'
          },
          relationships: {
            children: {
              links: {
                related: '/people/1/children'
              }
            }
          }
        }
      }
      ```
       If you're streaming data or implementing an adapter, make sure
      that you have converted the incoming data into this form. The
      store's [normalize](#method_normalize) method is a convenience
      helper for converting a json payload into the form Ember Data
      expects.
       ```js
      store.push(store.normalize('person', data));
      ```
       This method can be used both to push in brand new
      records, as well as to update existing records.
       @method push
      @param {Object} data
      @return {DS.Model|Array} the record(s) that was created or
        updated.
    */
    push: function push(data) {
      var included = data.included;
      var i, length;
      if (included) {
        for (i = 0, length = included.length; i < length; i++) {
          this._pushInternalModel(included[i]);
        }
      }

      if (Array.isArray(data.data)) {
        length = data.data.length;
        var internalModels = new Array(length);
        for (i = 0; i < length; i++) {
          internalModels[i] = this._pushInternalModel(data.data[i]).getRecord();
        }
        return internalModels;
      }

      if (data.data === null) {
        return null;
      }

      (0, _emberDataPrivateDebug.assert)('Expected an object in the \'data\' property in a call to \'push\' for ' + data.type + ', but was ' + _ember['default'].typeOf(data.data), _ember['default'].typeOf(data.data) === 'object');

      var internalModel = this._pushInternalModel(data.data);

      return internalModel.getRecord();
    },

    _hasModelFor: function _hasModelFor(type) {
      return !!(0, _emberDataPrivateUtils.getOwner)(this)._lookupFactory('model:' + type);
    },

    _pushInternalModel: function _pushInternalModel(data) {
      var _this2 = this;

      var modelName = data.type;
      (0, _emberDataPrivateDebug.assert)('You must include an \'id\' for ' + modelName + ' in an object passed to \'push\'', data.id != null && data.id !== '');
      (0, _emberDataPrivateDebug.assert)('You tried to push data with a type \'' + modelName + '\' but no model could be found with that name.', this._hasModelFor(modelName));

      (0, _emberDataPrivateDebug.runInDebug)(function () {
        // If Ember.ENV.DS_WARN_ON_UNKNOWN_KEYS is set to true and the payload
        // contains unknown attributes or relationships, log a warning.

        if (_ember['default'].ENV.DS_WARN_ON_UNKNOWN_KEYS) {
          (function () {
            var type = _this2.modelFor(modelName);

            // Check unknown attributes
            var unknownAttributes = Object.keys(data.attributes || {}).filter(function (key) {
              return !get(type, 'fields').has(key);
            });
            var unknownAttributesMessage = 'The payload for \'' + type.modelName + '\' contains these unknown attributes: ' + unknownAttributes + '. Make sure they\'ve been defined in your model.';
            (0, _emberDataPrivateDebug.warn)(unknownAttributesMessage, unknownAttributes.length === 0, { id: 'ds.store.unknown-keys-in-payload' });

            // Check unknown relationships
            var unknownRelationships = Object.keys(data.relationships || {}).filter(function (key) {
              return !get(type, 'fields').has(key);
            });
            var unknownRelationshipsMessage = 'The payload for \'' + type.modelName + '\' contains these unknown relationships: ' + unknownRelationships + '. Make sure they\'ve been defined in your model.';
            (0, _emberDataPrivateDebug.warn)(unknownRelationshipsMessage, unknownRelationships.length === 0, { id: 'ds.store.unknown-keys-in-payload' });
          })();
        }
      });

      // Actually load the record into the store.
      var internalModel = this._load(data);

      this._backburner.join(function () {
        _this2._backburner.schedule('normalizeRelationships', _this2, '_setupRelationships', internalModel, data);
      });

      return internalModel;
    },

    _setupRelationships: function _setupRelationships(record, data) {
      // This will convert relationships specified as IDs into DS.Model instances
      // (possibly unloaded) and also create the data structures used to track
      // relationships.
      setupRelationships(this, record, data);
    },

    /**
      Push some raw data into the store.
       This method can be used both to push in brand new
      records, as well as to update existing records. You
      can push in more than one type of object at once.
      All objects should be in the format expected by the
      serializer.
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.ActiveModelSerializer;
      ```
       ```js
      var pushData = {
        posts: [
          { id: 1, post_title: "Great post", comment_ids: [2] }
        ],
        comments: [
          { id: 2, comment_body: "Insightful comment" }
        ]
      }
       store.pushPayload(pushData);
      ```
       By default, the data will be deserialized using a default
      serializer (the application serializer if it exists).
       Alternatively, `pushPayload` will accept a model type which
      will determine which serializer will process the payload.
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.ActiveModelSerializer;
      ```
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONSerializer;
      ```
       ```js
      store.pushPayload('comment', pushData); // Will use the application serializer
      store.pushPayload('post', pushData); // Will use the post serializer
      ```
       @method pushPayload
      @param {String} modelName Optionally, a model type used to determine which serializer will be used
      @param {Object} inputPayload
    */
    pushPayload: function pushPayload(modelName, inputPayload) {
      var _this3 = this;

      var serializer;
      var payload;
      if (!inputPayload) {
        payload = modelName;
        serializer = defaultSerializer(this);
        (0, _emberDataPrivateDebug.assert)("You cannot use `store#pushPayload` without a modelName unless your default serializer defines `pushPayload`", typeof serializer.pushPayload === 'function');
      } else {
        payload = inputPayload;
        (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
        serializer = this.serializerFor(modelName);
      }
      if (false) {
        return this._adapterRun(function () {
          return serializer.pushPayload(_this3, payload);
        });
      } else {
        this._adapterRun(function () {
          return serializer.pushPayload(_this3, payload);
        });
      }
    },

    /**
      `normalize` converts a json payload into the normalized form that
      [push](#method_push) expects.
       Example
       ```js
      socket.on('message', function(message) {
        var modelName = message.model;
        var data = message.data;
        store.push(store.normalize(modelName, data));
      });
      ```
       @method normalize
      @param {String} modelName The name of the model type for this payload
      @param {Object} payload
      @return {Object} The normalized payload
    */
    normalize: function normalize(modelName, payload) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's normalize method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store methods has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');
      var serializer = this.serializerFor(modelName);
      var model = this.modelFor(modelName);
      return serializer.normalize(model, payload);
    },

    /**
      Build a brand new record for a given type, ID, and
      initial data.
       @method buildRecord
      @private
      @param {DS.Model} type
      @param {String} id
      @param {Object} data
      @return {InternalModel} internal model
    */
    buildInternalModel: function buildInternalModel(type, id, data) {
      var typeMap = this.typeMapFor(type);
      var idToRecord = typeMap.idToRecord;

      (0, _emberDataPrivateDebug.assert)('The id ' + id + ' has already been used with another record of type ' + type.toString() + '.', !id || !idToRecord[id]);
      (0, _emberDataPrivateDebug.assert)('\'' + _ember['default'].inspect(type) + '\' does not appear to be an ember-data model', typeof type._create === 'function');

      // lookupFactory should really return an object that creates
      // instances with the injections applied
      var internalModel = new _emberDataPrivateSystemModelInternalModel['default'](type, id, this, null, data);

      // if we're creating an item, this process will be done
      // later, once the object has been persisted.
      if (id) {
        idToRecord[id] = internalModel;
      }

      typeMap.records.push(internalModel);

      return internalModel;
    },

    //Called by the state machine to notify the store that the record is ready to be interacted with
    recordWasLoaded: function recordWasLoaded(record) {
      this.recordArrayManager.recordWasLoaded(record);
    },

    // ...............
    // . DESTRUCTION .
    // ...............

    /**
      When a record is destroyed, this un-indexes it and
      removes it from any record arrays so it can be GCed.
       @method _dematerializeRecord
      @private
      @param {InternalModel} internalModel
    */
    _dematerializeRecord: function _dematerializeRecord(internalModel) {
      var type = internalModel.type;
      var typeMap = this.typeMapFor(type);
      var id = internalModel.id;

      internalModel.updateRecordArrays();

      if (id) {
        delete typeMap.idToRecord[id];
      }

      var loc = typeMap.records.indexOf(internalModel);
      typeMap.records.splice(loc, 1);
    },

    // ......................
    // . PER-TYPE ADAPTERS
    // ......................

    /**
      Returns an instance of the adapter for a given type. For
      example, `adapterFor('person')` will return an instance of
      `App.PersonAdapter`.
       If no `App.PersonAdapter` is found, this method will look
      for an `App.ApplicationAdapter` (the default adapter for
      your entire application).
       If no `App.ApplicationAdapter` is found, it will return
      the value of the `defaultAdapter`.
       @method adapterFor
      @public
      @param {String} modelName
      @return DS.Adapter
    */
    adapterFor: function adapterFor(modelName) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's adapterFor method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store.adapterFor has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');

      return this.lookupAdapter(modelName);
    },

    _adapterRun: function _adapterRun(fn) {
      return this._backburner.run(fn);
    },

    // ..............................
    // . RECORD CHANGE NOTIFICATION .
    // ..............................

    /**
      Returns an instance of the serializer for a given type. For
      example, `serializerFor('person')` will return an instance of
      `App.PersonSerializer`.
       If no `App.PersonSerializer` is found, this method will look
      for an `App.ApplicationSerializer` (the default serializer for
      your entire application).
       if no `App.ApplicationSerializer` is found, it will attempt
      to get the `defaultSerializer` from the `PersonAdapter`
      (`adapterFor('person')`).
       If a serializer cannot be found on the adapter, it will fall back
      to an instance of `DS.JSONSerializer`.
       @method serializerFor
      @public
      @param {String} modelName the record to serialize
      @return {DS.Serializer}
    */
    serializerFor: function serializerFor(modelName) {
      (0, _emberDataPrivateDebug.assert)("You need to pass a model name to the store's serializerFor method", isPresent(modelName));
      (0, _emberDataPrivateDebug.assert)('Passing classes to store.serializerFor has been removed. Please pass a dasherized string instead of ' + _ember['default'].inspect(modelName), typeof modelName === 'string');

      var fallbacks = ['application', this.adapterFor(modelName).get('defaultSerializer'), '-default'];

      var serializer = this.lookupSerializer(modelName, fallbacks);
      return serializer;
    },

    /**
      Retrieve a particular instance from the
      container cache. If not found, creates it and
      placing it in the cache.
       Enabled a store to manage local instances of
      adapters and serializers.
       @method retrieveManagedInstance
      @private
      @param {String} modelName the object modelName
      @param {String} name the object name
      @param {Array} fallbacks the fallback objects to lookup if the lookup for modelName or 'application' fails
      @return {Ember.Object}
    */
    retrieveManagedInstance: function retrieveManagedInstance(type, modelName, fallbacks) {
      var normalizedModelName = (0, _emberDataPrivateSystemNormalizeModelName['default'])(modelName);

      var instance = this._instanceCache.get(type, normalizedModelName, fallbacks);
      set(instance, 'store', this);
      return instance;
    },

    lookupAdapter: function lookupAdapter(name) {
      return this.retrieveManagedInstance('adapter', name, this.get('_adapterFallbacks'));
    },

    _adapterFallbacks: _ember['default'].computed('adapter', function () {
      var adapter = this.get('adapter');
      return ['application', adapter, '-json-api'];
    }),

    lookupSerializer: function lookupSerializer(name, fallbacks) {
      return this.retrieveManagedInstance('serializer', name, fallbacks);
    },

    willDestroy: function willDestroy() {
      this._super.apply(this, arguments);
      this.recordArrayManager.destroy();

      this.unloadAll();
    }

  });

  if (true) {

    Store.reopen({
      /**
        Get the reference for the specified record.
         Example
         ```javascript
        var userRef = store.getReference('user', 1);
         // check if the user is loaded
        var isLoaded = userRef.value() !== null;
         // get the record of the reference (null if not yet available)
        var user = userRef.value();
         // get the identifier of the reference
        if (userRef.remoteType() === "id") {
        var id = userRef.id();
        }
         // load user (via store.find)
        userRef.load().then(...)
         // or trigger a reload
        userRef.reload().then(...)
         // provide data for reference
        userRef.push({ id: 1, username: "@user" }).then(function(user) {
          userRef.value() === user;
        });
      ```
       @method getReference
      @param {String} type
      @param {String|Integer} id
      @return {RecordReference}
      */
      getReference: function getReference(type, id) {
        return this._internalModelForId(type, id).recordReference;
      }
    });
  }

  function deserializeRecordId(store, key, relationship, id) {
    if (isNone(id)) {
      return;
    }

    (0, _emberDataPrivateDebug.assert)('A ' + relationship.parentType + ' record was pushed into the store with the value of ' + key + ' being ' + _ember['default'].inspect(id) + ', but ' + key + ' is a belongsTo relationship so the value must not be an array. You should probably check your data payload or serializer.', !Array.isArray(id));

    //TODO:Better asserts
    return store._internalModelForId(id.type, id.id);
  }

  function deserializeRecordIds(store, key, relationship, ids) {
    if (isNone(ids)) {
      return;
    }

    (0, _emberDataPrivateDebug.assert)('A ' + relationship.parentType + ' record was pushed into the store with the value of ' + key + ' being \'' + _ember['default'].inspect(ids) + '\', but ' + key + ' is a hasMany relationship so the value must be an array. You should probably check your data payload or serializer.', Array.isArray(ids));
    var _ids = new Array(ids.length);

    for (var i = 0; i < ids.length; i++) {
      _ids[i] = deserializeRecordId(store, key, relationship, ids[i]);
    }

    return _ids;
  }

  // Delegation to the adapter and promise management

  function defaultSerializer(store) {
    return store.serializerFor('application');
  }

  function _commit(adapter, store, operation, snapshot) {
    var internalModel = snapshot._internalModel;
    var modelName = snapshot.modelName;
    var typeClass = store.modelFor(modelName);
    var promise = adapter[operation](store, typeClass, snapshot);
    var serializer = (0, _emberDataPrivateSystemStoreSerializers.serializerForAdapter)(store, adapter, modelName);
    var label = 'DS: Extract and notify about ' + operation + ' completion of ' + internalModel;

    (0, _emberDataPrivateDebug.assert)('Your adapter\'s \'' + operation + '\' method must return a value, but it returned \'undefined\'', promise !== undefined);

    promise = Promise.resolve(promise, label);
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, store));
    promise = (0, _emberDataPrivateSystemStoreCommon._guard)(promise, (0, _emberDataPrivateSystemStoreCommon._bind)(_emberDataPrivateSystemStoreCommon._objectIsAlive, internalModel));

    return promise.then(function (adapterPayload) {
      store._adapterRun(function () {
        var payload, data;
        if (adapterPayload) {
          payload = (0, _emberDataPrivateSystemStoreSerializerResponse.normalizeResponseHelper)(serializer, store, typeClass, adapterPayload, snapshot.id, operation);
          if (payload.included) {
            store.push({ data: payload.included });
          }
          data = payload.data;
        }
        store.didSaveRecord(internalModel, { data: data });
      });

      return internalModel;
    }, function (error) {
      if (error instanceof _emberDataAdaptersErrors.InvalidError) {
        var errors = serializer.extractErrors(store, typeClass, error, snapshot.id);
        store.recordWasInvalid(internalModel, errors);
      } else {
        store.recordWasError(internalModel, error);
      }

      throw error;
    }, label);
  }

  function setupRelationships(store, record, data) {
    if (!data.relationships) {
      return;
    }

    record.type.eachRelationship(function (key, descriptor) {
      var kind = descriptor.kind;

      if (!data.relationships[key]) {
        return;
      }

      var relationship;

      if (data.relationships[key].links && data.relationships[key].links.related) {
        var relatedLink = (0, _emberDataPrivateSystemNormalizeLink['default'])(data.relationships[key].links.related);
        if (relatedLink && relatedLink.href) {
          relationship = record._relationships.get(key);
          relationship.updateLink(relatedLink.href);
        }
      }

      if (data.relationships[key].meta) {
        relationship = record._relationships.get(key);
        relationship.updateMeta(data.relationships[key].meta);
      }

      // If the data contains a relationship that is specified as an ID (or IDs),
      // normalizeRelationship will convert them into DS.Model instances
      // (possibly unloaded) before we push the payload into the store.
      normalizeRelationship(store, key, descriptor, data.relationships[key]);

      var value = data.relationships[key].data;

      if (value !== undefined) {
        if (kind === 'belongsTo') {
          relationship = record._relationships.get(key);
          relationship.setCanonicalRecord(value);
        } else if (kind === 'hasMany') {
          relationship = record._relationships.get(key);
          relationship.updateRecordsFromAdapter(value);
        }
      }
    });
  }

  function normalizeRelationship(store, key, relationship, jsonPayload) {
    var data = jsonPayload.data;
    if (data) {
      var kind = relationship.kind;
      if (kind === 'belongsTo') {
        jsonPayload.data = deserializeRecordId(store, key, relationship, data);
      } else if (kind === 'hasMany') {
        jsonPayload.data = deserializeRecordIds(store, key, relationship, data);
      }
    }
  }

  exports.Store = Store;
  exports['default'] = Store;
});
define('ember-data/-private/transforms/boolean', ['exports', 'ember', 'ember-data/transform', 'ember-data/-private/features'], function (exports, _ember, _emberDataTransform, _emberDataPrivateFeatures) {
  'use strict';

  var isNone = _ember['default'].isNone;

  /**
    The `DS.BooleanTransform` class is used to serialize and deserialize
    boolean attributes on Ember Data record objects. This transform is
    used when `boolean` is passed as the type parameter to the
    [DS.attr](../../data#method_attr) function.
  
    Usage
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      isAdmin: DS.attr('boolean'),
      name: DS.attr('string'),
      email: DS.attr('string')
    });
    ```
  
    @class BooleanTransform
    @extends DS.Transform
    @namespace DS
   */
  exports['default'] = _emberDataTransform['default'].extend({
    deserialize: function deserialize(serialized, options) {
      var type = typeof serialized;

      if (true) {
        if (false) {
          if (isNone(serialized) && options.allowNull === true) {
            return null;
          }
        }
      }

      if (type === "boolean") {
        return serialized;
      } else if (type === "string") {
        return serialized.match(/^true$|^t$|^1$/i) !== null;
      } else if (type === "number") {
        return serialized === 1;
      } else {
        return false;
      }
    },

    serialize: function serialize(deserialized, options) {
      if (true) {
        if (false) {
          if (isNone(deserialized) && options.allowNull === true) {
            return null;
          }
        }
      }

      return Boolean(deserialized);
    }
  });
});
define("ember-data/-private/transforms/date", ["exports", "ember", "ember-data/-private/ext/date", "ember-data/transform"], function (exports, _ember, _emberDataPrivateExtDate, _emberDataTransform) {
  "use strict";

  exports["default"] = _emberDataTransform["default"].extend({
    deserialize: function deserialize(serialized) {
      var type = typeof serialized;

      if (type === "string") {
        return new Date(_ember["default"].Date.parse(serialized));
      } else if (type === "number") {
        return new Date(serialized);
      } else if (serialized === null || serialized === undefined) {
        // if the value is null return null
        // if the value is not present in the data return undefined
        return serialized;
      } else {
        return null;
      }
    },

    serialize: function serialize(date) {
      if (date instanceof Date) {
        return date.toISOString();
      } else {
        return null;
      }
    }
  });
});

/**
  The `DS.DateTransform` class is used to serialize and deserialize
  date attributes on Ember Data record objects. This transform is used
  when `date` is passed as the type parameter to the
  [DS.attr](../../data#method_attr) function.

  ```app/models/score.js
  import DS from 'ember-data';

  export default DS.Model.extend({
    value: DS.attr('number'),
    player: DS.belongsTo('player'),
    date: DS.attr('date')
  });
  ```

  @class DateTransform
  @extends DS.Transform
  @namespace DS
 */
define("ember-data/-private/transforms/number", ["exports", "ember", "ember-data/transform"], function (exports, _ember, _emberDataTransform) {
  "use strict";

  var empty = _ember["default"].isEmpty;

  function isNumber(value) {
    return value === value && value !== Infinity && value !== -Infinity;
  }

  /**
    The `DS.NumberTransform` class is used to serialize and deserialize
    numeric attributes on Ember Data record objects. This transform is
    used when `number` is passed as the type parameter to the
    [DS.attr](../../data#method_attr) function.
  
    Usage
  
    ```app/models/score.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      value: DS.attr('number'),
      player: DS.belongsTo('player'),
      date: DS.attr('date')
    });
    ```
  
    @class NumberTransform
    @extends DS.Transform
    @namespace DS
   */
  exports["default"] = _emberDataTransform["default"].extend({
    deserialize: function deserialize(serialized) {
      var transformed;

      if (empty(serialized)) {
        return null;
      } else {
        transformed = Number(serialized);

        return isNumber(transformed) ? transformed : null;
      }
    },

    serialize: function serialize(deserialized) {
      var transformed;

      if (empty(deserialized)) {
        return null;
      } else {
        transformed = Number(deserialized);

        return isNumber(transformed) ? transformed : null;
      }
    }
  });
});
define("ember-data/-private/transforms/string", ["exports", "ember", "ember-data/transform"], function (exports, _ember, _emberDataTransform) {
  "use strict";

  var none = _ember["default"].isNone;

  /**
    The `DS.StringTransform` class is used to serialize and deserialize
    string attributes on Ember Data record objects. This transform is
    used when `string` is passed as the type parameter to the
    [DS.attr](../../data#method_attr) function.
  
    Usage
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      isAdmin: DS.attr('boolean'),
      name: DS.attr('string'),
      email: DS.attr('string')
    });
    ```
  
    @class StringTransform
    @extends DS.Transform
    @namespace DS
   */
  exports["default"] = _emberDataTransform["default"].extend({
    deserialize: function deserialize(serialized) {
      return none(serialized) ? null : String(serialized);
    },
    serialize: function serialize(deserialized) {
      return none(deserialized) ? null : String(deserialized);
    }
  });
});
define("ember-data/-private/transforms", ["exports", "ember-data/transform", "ember-data/-private/transforms/number", "ember-data/-private/transforms/date", "ember-data/-private/transforms/string", "ember-data/-private/transforms/boolean"], function (exports, _emberDataTransform, _emberDataPrivateTransformsNumber, _emberDataPrivateTransformsDate, _emberDataPrivateTransformsString, _emberDataPrivateTransformsBoolean) {
  "use strict";

  exports.Transform = _emberDataTransform["default"];
  exports.NumberTransform = _emberDataPrivateTransformsNumber["default"];
  exports.DateTransform = _emberDataPrivateTransformsDate["default"];
  exports.StringTransform = _emberDataPrivateTransformsString["default"];
  exports.BooleanTransform = _emberDataPrivateTransformsBoolean["default"];
});
define('ember-data/-private/utils/parse-response-headers', ['exports', 'ember-data/-private/system/empty-object'], function (exports, _emberDataPrivateSystemEmptyObject) {
  'use strict';

  exports['default'] = parseResponseHeaders;

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  var CLRF = '\r\n';
  function parseResponseHeaders(headersString) {
    var headers = new _emberDataPrivateSystemEmptyObject['default']();

    if (!headersString) {
      return headers;
    }

    var headerPairs = headersString.split(CLRF);

    headerPairs.forEach(function (header) {
      var _header$split = header.split(':');

      var _header$split2 = _toArray(_header$split);

      var field = _header$split2[0];

      var value = _header$split2.slice(1);

      field = field.trim();
      value = value.join(':').trim();

      if (value) {
        headers[field] = value;
      }
    });

    return headers;
  }
});
define('ember-data/-private/utils', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var get = _ember['default'].get;

  /**
    Check if the passed model has a `type` attribute or a relationship named `type`.
  
    @method modelHasAttributeOrRelationshipNamedType
    @param modelClass
   */
  function modelHasAttributeOrRelationshipNamedType(modelClass) {
    return get(modelClass, 'attributes').has('type') || get(modelClass, 'relationshipsByName').has('type');
  }

  /*
    ember-container-inject-owner is a new feature in Ember 2.3 that finally provides a public
    API for looking items up.  This function serves as a super simple polyfill to avoid
    triggering deprecations.
  */
  function getOwner(context) {
    var owner;

    if (_ember['default'].getOwner) {
      owner = _ember['default'].getOwner(context);
    }

    if (!owner && context.container) {
      owner = context.container;
    }

    if (owner && owner.lookupFactory && !owner._lookupFactory) {
      // `owner` is a container, we are just making this work
      owner._lookupFactory = owner.lookupFactory;
      owner.register = function () {
        var registry = owner.registry || owner._registry || owner;

        return registry.register.apply(registry, arguments);
      };
    }

    return owner;
  }

  exports.modelHasAttributeOrRelationshipNamedType = modelHasAttributeOrRelationshipNamedType;
  exports.getOwner = getOwner;
});
define('ember-data/adapter', ['exports', 'ember'], function (exports, _ember) {
  /**
    @module ember-data
  */

  'use strict';

  var get = _ember['default'].get;

  /**
    An adapter is an object that receives requests from a store and
    translates them into the appropriate action to take against your
    persistence layer. The persistence layer is usually an HTTP API, but
    may be anything, such as the browser's local storage. Typically the
    adapter is not invoked directly instead its functionality is accessed
    through the `store`.
  
    ### Creating an Adapter
  
    Create a new subclass of `DS.Adapter` in the `app/adapters` folder:
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.Adapter.extend({
      // ...your code here
    });
    ```
  
    Model-specific adapters can be created by putting your adapter
    class in an `app/adapters/` + `model-name` + `.js` file of the application.
  
    ```app/adapters/post.js
    import DS from 'ember-data';
  
    export default DS.Adapter.extend({
      // ...Post-specific adapter code goes here
    });
    ```
  
    `DS.Adapter` is an abstract base class that you should override in your
    application to customize it for your backend. The minimum set of methods
    that you should implement is:
  
      * `findRecord()`
      * `createRecord()`
      * `updateRecord()`
      * `deleteRecord()`
      * `findAll()`
      * `query()`
  
    To improve the network performance of your application, you can optimize
    your adapter by overriding these lower-level methods:
  
      * `findMany()`
  
  
    For an example implementation, see `DS.RESTAdapter`, the
    included REST adapter.
  
    @class Adapter
    @namespace DS
    @extends Ember.Object
  */

  exports['default'] = _ember['default'].Object.extend({

    /**
      If you would like your adapter to use a custom serializer you can
      set the `defaultSerializer` property to be the name of the custom
      serializer.
       Note the `defaultSerializer` serializer has a lower priority than
      a model specific serializer (i.e. `PostSerializer`) or the
      `application` serializer.
       ```app/adapters/django.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        defaultSerializer: 'django'
      });
      ```
       @property defaultSerializer
      @type {String}
    */
    defaultSerializer: '-default',

    /**
      The `findRecord()` method is invoked when the store is asked for a record that
      has not previously been loaded. In response to `findRecord()` being called, you
      should query your persistence layer for a record with the given ID. The `findRecord` 
      method should return a promise that will resolve to a JavaScript object that will be 
      normalized by the serializer.
       Here is an example `findRecord` implementation:
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        findRecord: function(store, type, id, snapshot) {
          var url = [type.modelName, id].join('/');
           return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON(url).then(function(data) {
              Ember.run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              Ember.run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method findRecord
      @param {DS.Store} store
      @param {DS.Model} type
      @param {String} id
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    findRecord: null,

    /**
      The `findAll()` method is used to retrieve all records for a given type.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        findAll: function(store, type, sinceToken) {
          var url = type;
          var query = { since: sinceToken };
          return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON(url, query).then(function(data) {
              Ember.run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              Ember.run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method findAll
      @param {DS.Store} store
      @param {DS.Model} type
      @param {String} sinceToken
      @param {DS.SnapshotRecordArray} snapshotRecordArray
      @return {Promise} promise
    */
    findAll: null,

    /**
      This method is called when you call `query` on the store.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        query: function(store, type, query) {
          var url = type;
          return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON(url, query).then(function(data) {
              Ember.run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              Ember.run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method query
      @param {DS.Store} store
      @param {DS.Model} type
      @param {Object} query
      @param {DS.AdapterPopulatedRecordArray} recordArray
      @return {Promise} promise
    */
    query: null,

    /**
      The `queryRecord()` method is invoked when the store is asked for a single
      record through a query object.
       In response to `queryRecord()` being called, you should always fetch fresh
      data. Once found, you can asynchronously call the store's `push()` method
      to push the record into the store.
       Here is an example `queryRecord` implementation:
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
      import Ember from 'ember';
       export default DS.Adapter.extend(DS.BuildURLMixin, {
        queryRecord: function(store, type, query) {
          var urlForQueryRecord = this.buildURL(type.modelName, null, null, 'queryRecord', query);
           return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON(urlForQueryRecord, query).then(function(data) {
              Ember.run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              Ember.run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method queryRecord
      @param {DS.Store} store
      @param {subclass of DS.Model} type
      @param {Object} query
      @return {Promise} promise
    */
    queryRecord: null,

    /**
      If the globally unique IDs for your records should be generated on the client,
      implement the `generateIdForRecord()` method. This method will be invoked
      each time you create a new record, and the value returned from it will be
      assigned to the record's `primaryKey`.
       Most traditional REST-like HTTP APIs will not use this method. Instead, the ID
      of the record will be set by the server, and your adapter will update the store
      with the new ID when it calls `didCreateRecord()`. Only implement this method if
      you intend to generate record IDs on the client-side.
       The `generateIdForRecord()` method will be invoked with the requesting store as
      the first parameter and the newly created record as the second parameter:
       ```javascript
      generateIdForRecord: function(store, inputProperties) {
        var uuid = App.generateUUIDWithStatisticallyLowOddsOfCollision();
        return uuid;
      }
      ```
       @method generateIdForRecord
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the record
      @param {Object} inputProperties a hash of properties to set on the
        newly created record.
      @return {(String|Number)} id
    */
    generateIdForRecord: null,

    /**
      Proxies to the serializer's `serialize` method.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        createRecord: function(store, type, snapshot) {
          var data = this.serialize(snapshot, { includeId: true });
          var url = type;
           // ...
        }
      });
      ```
       @method serialize
      @param {DS.Snapshot} snapshot
      @param {Object}   options
      @return {Object} serialized snapshot
    */
    serialize: function serialize(snapshot, options) {
      return get(snapshot.record, 'store').serializerFor(snapshot.modelName).serialize(snapshot, options);
    },

    /**
      Implement this method in a subclass to handle the creation of
      new records.
       Serializes the record and sends it to the server.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        createRecord: function(store, type, snapshot) {
          var data = this.serialize(snapshot, { includeId: true });
          var url = type;
           return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
              type: 'POST',
              url: url,
              dataType: 'json',
              data: data
            }).then(function(data) {
              Ember.run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              Ember.run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method createRecord
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the record
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    createRecord: null,

    /**
      Implement this method in a subclass to handle the updating of
      a record.
       Serializes the record update and sends it to the server.
       The updateRecord method is expected to return a promise that will
      resolve with the serialized record. This allows the backend to
      inform the Ember Data store the current state of this record after
      the update. If it is not possible to return a serialized record
      the updateRecord promise can also resolve with `undefined` and the
      Ember Data store will assume all of the updates were successfully
      applied on the backend.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        updateRecord: function(store, type, snapshot) {
          var data = this.serialize(snapshot, { includeId: true });
          var id = snapshot.id;
          var url = [type, id].join('/');
           return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
              type: 'PUT',
              url: url,
              dataType: 'json',
              data: data
            }).then(function(data) {
              Ember.run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              Ember.run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method updateRecord
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the record
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    updateRecord: null,

    /**
      Implement this method in a subclass to handle the deletion of
      a record.
       Sends a delete request for the record to the server.
       Example
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.Adapter.extend({
        deleteRecord: function(store, type, snapshot) {
          var data = this.serialize(snapshot, { includeId: true });
          var id = snapshot.id;
          var url = [type, id].join('/');
           return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
              type: 'DELETE',
              url: url,
              dataType: 'json',
              data: data
            }).then(function(data) {
              Ember.run(null, resolve, data);
            }, function(jqXHR) {
              jqXHR.then = null; // tame jQuery's ill mannered promises
              Ember.run(null, reject, jqXHR);
            });
          });
        }
      });
      ```
       @method deleteRecord
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the record
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    deleteRecord: null,

    /**
      By default the store will try to coalesce all `fetchRecord` calls within the same runloop
      into as few requests as possible by calling groupRecordsForFindMany and passing it into a findMany call.
      You can opt out of this behaviour by either not implementing the findMany hook or by setting
      coalesceFindRequests to false.
       @property coalesceFindRequests
      @type {boolean}
    */
    coalesceFindRequests: true,

    /**
      Find multiple records at once if coalesceFindRequests is true.
       @method findMany
      @param {DS.Store} store
      @param {DS.Model} type   the DS.Model class of the records
      @param {Array}    ids
      @param {Array} snapshots
      @return {Promise} promise
    */
    findMany: null,

    /**
      Organize records into groups, each of which is to be passed to separate
      calls to `findMany`.
       For example, if your api has nested URLs that depend on the parent, you will
      want to group records by their parent.
       The default implementation returns the records as a single group.
       @method groupRecordsForFindMany
      @param {DS.Store} store
      @param {Array} snapshots
      @return {Array}  an array of arrays of records, each of which is to be
                        loaded separately by `findMany`.
    */
    groupRecordsForFindMany: function groupRecordsForFindMany(store, snapshots) {
      return [snapshots];
    },

    /**
      This method is used by the store to determine if the store should
      reload a record from the adapter when a record is requested by
      `store.findRecord`.
       If this method returns `true`, the store will re-fetch a record from
      the adapter. If this method returns `false`, the store will resolve
      immediately using the cached record.
       For example, if you are building an events ticketing system, in which users
      can only reserve tickets for 20 minutes at a time, and want to ensure that
      in each route you have data that is no more than 20 minutes old you could
      write:
       ```javascript
      shouldReloadRecord: function(store, ticketSnapshot) {
        var timeDiff = moment().diff(ticketSnapshot.attr('lastAccessedAt')).minutes();
        if (timeDiff > 20) {
          return true;
        } else {
          return false;
        }
      }
      ```
       This method would ensure that whenever you do `store.findRecord('ticket',
      id)` you will always get a ticket that is no more than 20 minutes old. In
      case the cached version is more than 20 minutes old, `findRecord` will not
      resolve until you fetched the latest version.
       By default this hook returns `false`, as most UIs should not block user
      interactions while waiting on data update.
       @method shouldReloadRecord
      @param {DS.Store} store
      @param {DS.Snapshot} snapshot
      @return {Boolean}
    */
    shouldReloadRecord: function shouldReloadRecord(store, snapshot) {
      return false;
    },

    /**
      This method is used by the store to determine if the store should
      reload all records from the adapter when records are requested by
      `store.findAll`.
       If this method returns `true`, the store will re-fetch all records from
      the adapter. If this method returns `false`, the store will resolve
      immediately using the cached records.
       For example, if you are building an events ticketing system, in which users
      can only reserve tickets for 20 minutes at a time, and want to ensure that
      in each route you have data that is no more than 20 minutes old you could
      write:
       ```javascript
      shouldReloadAll: function(store, snapshotArray) {
        var snapshots = snapshotArray.snapshots();
         return snapshots.any(function(ticketSnapshot) {
          var timeDiff = moment().diff(ticketSnapshot.attr('lastAccessedAt')).minutes();
          if (timeDiff > 20) {
            return true;
          } else {
            return false;
          }
        });
      }
      ```
       This method would ensure that whenever you do `store.findAll('ticket')` you
      will always get a list of tickets that are no more than 20 minutes old. In
      case a cached version is more than 20 minutes old, `findAll` will not
      resolve until you fetched the latest versions.
       By default this methods returns `true` if the passed `snapshotRecordArray`
      is empty (meaning that there are no records locally available yet),
      otherwise it returns `false`.
       @method shouldReloadAll
      @param {DS.Store} store
      @param {DS.SnapshotRecordArray} snapshotRecordArray
      @return {Boolean}
    */
    shouldReloadAll: function shouldReloadAll(store, snapshotRecordArray) {
      return !snapshotRecordArray.length;
    },

    /**
      This method is used by the store to determine if the store should
      reload a record after the `store.findRecord` method resolves a
      cached record.
       This method is *only* checked by the store when the store is
      returning a cached record.
       If this method returns `true` the store will re-fetch a record from
      the adapter.
       For example, if you do not want to fetch complex data over a mobile
      connection, or if the network is down, you can implement
      `shouldBackgroundReloadRecord` as follows:
       ```javascript
      shouldBackgroundReloadRecord: function(store, snapshot) {
        var connection = window.navigator.connection;
        if (connection === 'cellular' || connection === 'none') {
          return false;
        } else {
          return true;
        }
      }
      ```
       By default this hook returns `true` so the data for the record is updated
      in the background.
       @method shouldBackgroundReloadRecord
      @param {DS.Store} store
      @param {DS.Snapshot} snapshot
      @return {Boolean}
    */
    shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord(store, snapshot) {
      return true;
    },

    /**
      This method is used by the store to determine if the store should
      reload a record array after the `store.findAll` method resolves
      with a cached record array.
       This method is *only* checked by the store when the store is
      returning a cached record array.
       If this method returns `true` the store will re-fetch all records
      from the adapter.
       For example, if you do not want to fetch complex data over a mobile
      connection, or if the network is down, you can implement
      `shouldBackgroundReloadAll` as follows:
       ```javascript
      shouldBackgroundReloadAll: function(store, snapshotArray) {
        var connection = window.navigator.connection;
        if (connection === 'cellular' || connection === 'none') {
          return false;
        } else {
          return true;
        }
      }
      ```
       By default this method returns `true`, indicating that a background reload
      should always be triggered.
       @method shouldBackgroundReloadAll
      @param {DS.Store} store
      @param {DS.SnapshotRecordArray} snapshotRecordArray
      @return {Boolean}
    */
    shouldBackgroundReloadAll: function shouldBackgroundReloadAll(store, snapshotRecordArray) {
      return true;
    }
  });
});
define('ember-data/adapters/errors', ['exports', 'ember', 'ember-data/-private/debug', 'ember-data/-private/features'], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateFeatures) {
  'use strict';

  exports.AdapterError = AdapterError;
  exports.errorsHashToArray = errorsHashToArray;
  exports.errorsArrayToHash = errorsArrayToHash;

  var EmberError = _ember['default'].Error;

  var SOURCE_POINTER_REGEXP = /^\/?data\/(attributes|relationships)\/(.*)/;
  var SOURCE_POINTER_PRIMARY_REGEXP = /^\/?data/;
  var PRIMARY_ATTRIBUTE_KEY = 'base';

  /**
    @class AdapterError
    @namespace DS
  */

  function AdapterError(errors) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'Adapter operation failed' : arguments[1];

    this.isAdapterError = true;
    EmberError.call(this, message);

    this.errors = errors || [{
      title: 'Adapter Error',
      detail: message
    }];
  }

  var extendedErrorsEnabled = false;
  if (false) {
    extendedErrorsEnabled = true;
  }

  function extendFn(ErrorClass) {
    return function () {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var defaultMessage = _ref.message;

      return extend(ErrorClass, defaultMessage);
    };
  }

  function extend(ParentErrorClass, defaultMessage) {
    var ErrorClass = function ErrorClass(errors, message) {
      (0, _emberDataPrivateDebug.assert)('`AdapterError` expects json-api formatted errors array.', Array.isArray(errors || []));
      ParentErrorClass.call(this, errors, message || defaultMessage);
    };
    ErrorClass.prototype = Object.create(ParentErrorClass.prototype);

    if (extendedErrorsEnabled) {
      ErrorClass.extend = extendFn(ErrorClass);
    }

    return ErrorClass;
  }

  AdapterError.prototype = Object.create(EmberError.prototype);

  if (extendedErrorsEnabled) {
    AdapterError.extend = extendFn(AdapterError);
  }

  /**
    A `DS.InvalidError` is used by an adapter to signal the external API
    was unable to process a request because the content was not
    semantically correct or meaningful per the API. Usually this means a
    record failed some form of server side validation. When a promise
    from an adapter is rejected with a `DS.InvalidError` the record will
    transition to the `invalid` state and the errors will be set to the
    `errors` property on the record.
  
    For Ember Data to correctly map errors to their corresponding
    properties on the model, Ember Data expects each error to be
    a valid json-api error object with a `source/pointer` that matches
    the property name. For example if you had a Post model that
    looked like this.
  
    ```app/models/post.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      title: DS.attr('string'),
      content: DS.attr('string')
    });
    ```
  
    To show an error from the server related to the `title` and
    `content` properties your adapter could return a promise that
    rejects with a `DS.InvalidError` object that looks like this:
  
    ```app/adapters/post.js
    import Ember from 'ember';
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      updateRecord: function() {
        // Fictional adapter that always rejects
        return Ember.RSVP.reject(new DS.InvalidError([
          {
            detail: 'Must be unique',
            source: { pointer: '/data/attributes/title' }
          },
          {
            detail: 'Must not be blank',
            source: { pointer: '/data/attributes/content'}
          }
        ]));
      }
    });
    ```
  
    Your backend may use different property names for your records the
    store will attempt extract and normalize the errors using the
    serializer's `extractErrors` method before the errors get added to
    the the model. As a result, it is safe for the `InvalidError` to
    wrap the error payload unaltered.
  
    @class InvalidError
    @namespace DS
  */
  var InvalidError = extend(AdapterError, 'The adapter rejected the commit because it was invalid');

  exports.InvalidError = InvalidError;

  /**
    @class TimeoutError
    @namespace DS
  */
  var TimeoutError = extend(AdapterError, 'The adapter operation timed out');

  exports.TimeoutError = TimeoutError;

  /**
    @class AbortError
    @namespace DS
  */
  var AbortError = extend(AdapterError, 'The adapter operation was aborted');

  exports.AbortError = AbortError;

  /**
    @class UnauthorizedError
    @namespace DS
  */
  var UnauthorizedError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter operation is unauthorized') : null;

  exports.UnauthorizedError = UnauthorizedError;

  /**
    @class ForbiddenError
    @namespace DS
  */
  var ForbiddenError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter operation is forbidden') : null;

  exports.ForbiddenError = ForbiddenError;

  /**
    @class NotFoundError
    @namespace DS
  */
  var NotFoundError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter could not find the resource') : null;

  exports.NotFoundError = NotFoundError;

  /**
    @class ConflictError
    @namespace DS
  */
  var ConflictError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter operation failed due to a conflict') : null;

  exports.ConflictError = ConflictError;

  /**
    @class ServerError
    @namespace DS
  */
  var ServerError = extendedErrorsEnabled ? extend(AdapterError, 'The adapter operation failed due to a server error') : null;

  exports.ServerError = ServerError;

  /**
    @method errorsHashToArray
    @private
  */

  function errorsHashToArray(errors) {
    var out = [];

    if (_ember['default'].isPresent(errors)) {
      Object.keys(errors).forEach(function (key) {
        var messages = _ember['default'].makeArray(errors[key]);
        for (var i = 0; i < messages.length; i++) {
          var title = 'Invalid Attribute';
          var pointer = '/data/attributes/' + key;
          if (key === PRIMARY_ATTRIBUTE_KEY) {
            title = 'Invalid Document';
            pointer = '/data';
          }
          out.push({
            title: title,
            detail: messages[i],
            source: {
              pointer: pointer
            }
          });
        }
      });
    }

    return out;
  }

  /**
    @method errorsArrayToHash
    @private
  */

  function errorsArrayToHash(errors) {
    var out = {};

    if (_ember['default'].isPresent(errors)) {
      errors.forEach(function (error) {
        if (error.source && error.source.pointer) {
          var key = error.source.pointer.match(SOURCE_POINTER_REGEXP);

          if (key) {
            key = key[2];
          } else if (error.source.pointer.search(SOURCE_POINTER_PRIMARY_REGEXP) !== -1) {
            key = PRIMARY_ATTRIBUTE_KEY;
          }

          if (key) {
            out[key] = out[key] || [];
            out[key].push(error.detail || error.title);
          }
        }
      });
    }

    return out;
  }
});
define('ember-data/adapters/json-api', ['exports', 'ember', 'ember-data/adapters/rest', 'ember-data/-private/features'], function (exports, _ember, _emberDataAdaptersRest, _emberDataPrivateFeatures) {
  /**
    @module ember-data
  */

  'use strict';

  /**
    @class JSONAPIAdapter
    @constructor
    @namespace DS
    @extends DS.RESTAdapter
  */
  var JSONAPIAdapter = _emberDataAdaptersRest['default'].extend({
    defaultSerializer: '-json-api',

    /**
      @method ajaxOptions
      @private
      @param {String} url
      @param {String} type The request type GET, POST, PUT, DELETE etc.
      @param {Object} options
      @return {Object}
    */
    ajaxOptions: function ajaxOptions(url, type, options) {
      var hash = this._super.apply(this, arguments);

      if (hash.contentType) {
        hash.contentType = 'application/vnd.api+json';
      }

      var beforeSend = hash.beforeSend;
      hash.beforeSend = function (xhr) {
        xhr.setRequestHeader('Accept', 'application/vnd.api+json');
        if (beforeSend) {
          beforeSend(xhr);
        }
      };

      return hash;
    },

    /**
      By default the JSONAPIAdapter will send each find request coming from a `store.find`
      or from accessing a relationship separately to the server. If your server supports passing
      ids as a query string, you can set coalesceFindRequests to true to coalesce all find requests
      within a single runloop.
       For example, if you have an initial payload of:
       ```javascript
      {
        post: {
          id: 1,
          comments: [1, 2]
        }
      }
      ```
       By default calling `post.get('comments')` will trigger the following requests(assuming the
      comments haven't been loaded before):
       ```
      GET /comments/1
      GET /comments/2
      ```
       If you set coalesceFindRequests to `true` it will instead trigger the following request:
       ```
      GET /comments?filter[id]=1,2
      ```
       Setting coalesceFindRequests to `true` also works for `store.find` requests and `belongsTo`
      relationships accessed within the same runloop. If you set `coalesceFindRequests: true`
       ```javascript
      store.findRecord('comment', 1);
      store.findRecord('comment', 2);
      ```
       will also send a request to: `GET /comments?filter[id]=1,2`
       Note: Requests coalescing rely on URL building strategy. So if you override `buildURL` in your app
      `groupRecordsForFindMany` more likely should be overridden as well in order for coalescing to work.
       @property coalesceFindRequests
      @type {boolean}
    */
    coalesceFindRequests: false,

    /**
      @method findMany
      @param {DS.Store} store
      @param {DS.Model} type
      @param {Array} ids
      @param {Array} snapshots
      @return {Promise} promise
    */
    findMany: function findMany(store, type, ids, snapshots) {
      if (false) {
        return this._super.apply(this, arguments);
      } else {
        var url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
        return this.ajax(url, 'GET', { data: { filter: { id: ids.join(',') } } });
      }
    },

    /**
      @method pathForType
      @param {String} modelName
      @return {String} path
    **/
    pathForType: function pathForType(modelName) {
      var dasherized = _ember['default'].String.dasherize(modelName);
      return _ember['default'].String.pluralize(dasherized);
    },

    // TODO: Remove this once we have a better way to override HTTP verbs.
    /**
      @method updateRecord
      @param {DS.Store} store
      @param {DS.Model} type
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    updateRecord: function updateRecord(store, type, snapshot) {
      if (false) {
        return this._super.apply(this, arguments);
      } else {
        var data = {};
        var serializer = store.serializerFor(type.modelName);

        serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

        var id = snapshot.id;
        var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

        return this.ajax(url, 'PATCH', { data: data });
      }
    }
  });

  if (false) {

    JSONAPIAdapter.reopen({

      methodForRequest: function methodForRequest(params) {
        if (params.requestType === 'updateRecord') {
          return 'PATCH';
        }

        return this._super.apply(this, arguments);
      },

      dataForRequest: function dataForRequest(params) {
        var requestType = params.requestType;
        var ids = params.ids;

        if (requestType === 'findMany') {
          return {
            filter: { id: ids.join(',') }
          };
        }

        if (requestType === 'updateRecord') {
          var store = params.store;
          var type = params.type;
          var snapshot = params.snapshot;

          var data = {};
          var serializer = store.serializerFor(type.modelName);

          serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

          return data;
        }

        return this._super.apply(this, arguments);
      },

      headersForRequest: function headersForRequest() {
        var headers = this._super.apply(this, arguments) || {};

        headers['Accept'] = 'application/vnd.api+json';

        return headers;
      },

      _requestToJQueryAjaxHash: function _requestToJQueryAjaxHash() {
        var hash = this._super.apply(this, arguments);

        if (hash.contentType) {
          hash.contentType = 'application/vnd.api+json';
        }

        return hash;
      }

    });
  }

  exports['default'] = JSONAPIAdapter;
});
define('ember-data/adapters/rest', ['exports', 'ember', 'ember-data/adapter', 'ember-data/adapters/errors', 'ember-data/-private/adapters/build-url-mixin', 'ember-data/-private/features', 'ember-data/-private/debug', 'ember-data/-private/utils/parse-response-headers'], function (exports, _ember, _emberDataAdapter, _emberDataAdaptersErrors, _emberDataPrivateAdaptersBuildUrlMixin, _emberDataPrivateFeatures, _emberDataPrivateDebug, _emberDataPrivateUtilsParseResponseHeaders) {
  /**
    @module ember-data
  */

  'use strict';

  var MapWithDefault = _ember['default'].MapWithDefault;
  var get = _ember['default'].get;

  /**
    The REST adapter allows your store to communicate with an HTTP server by
    transmitting JSON via XHR. Most Ember.js apps that consume a JSON API
    should use the REST adapter.
  
    This adapter is designed around the idea that the JSON exchanged with
    the server should be conventional.
  
    ## Success and failure
  
    The REST adapter will consider a success any response with a status code
    of the 2xx family ("Success"), as well as 304 ("Not Modified"). Any other
    status code will be considered a failure.
  
    On success, the request promise will be resolved with the full response
    payload.
  
    Failed responses with status code 422 ("Unprocessable Entity") will be
    considered "invalid". The response will be discarded, except for the
    `errors` key. The request promise will be rejected with a `DS.InvalidError`.
    This error object will encapsulate the saved `errors` value.
  
    Any other status codes will be treated as an "adapter error". The request
    promise will be rejected, similarly to the "invalid" case, but with
    an instance of `DS.AdapterError` instead.
  
    ## JSON Structure
  
    The REST adapter expects the JSON returned from your server to follow
    these conventions.
  
    ### Object Root
  
    The JSON payload should be an object that contains the record inside a
    root property. For example, in response to a `GET` request for
    `/posts/1`, the JSON should look like this:
  
    ```js
    {
      "post": {
        "id": 1,
        "title": "I'm Running to Reform the W3C's Tag",
        "author": "Yehuda Katz"
      }
    }
    ```
  
    Similarly, in response to a `GET` request for `/posts`, the JSON should
    look like this:
  
    ```js
    {
      "posts": [
        {
          "id": 1,
          "title": "I'm Running to Reform the W3C's Tag",
          "author": "Yehuda Katz"
        },
        {
          "id": 2,
          "title": "Rails is omakase",
          "author": "D2H"
        }
      ]
    }
    ```
  
    Note that the object root can be pluralized for both a single-object response
    and an array response: the REST adapter is not strict on this. Further, if the
    HTTP server responds to a `GET` request to `/posts/1` (e.g. the response to a
    `findRecord` query) with more than one object in the array, Ember Data will
    only display the object with the matching ID.
  
    ### Conventional Names
  
    Attribute names in your JSON payload should be the camelCased versions of
    the attributes in your Ember.js models.
  
    For example, if you have a `Person` model:
  
    ```app/models/person.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),
      occupation: DS.attr('string')
    });
    ```
  
    The JSON returned should look like this:
  
    ```js
    {
      "person": {
        "id": 5,
        "firstName": "Barack",
        "lastName": "Obama",
        "occupation": "President"
      }
    }
    ```
  
    ### Errors
  
    If a response is considered a failure, the JSON payload is expected to include
    a top-level key `errors`, detailing any specific issues. For example:
  
    ```js
    {
      "errors": {
        "msg": "Something went wrong"
      }
    }
    ```
  
    This adapter does not make any assumptions as to the format of the `errors`
    object. It will simply be passed along as is, wrapped in an instance
    of `DS.InvalidError` or `DS.AdapterError`. The serializer can interpret it
    afterwards.
  
    ## Customization
  
    ### Endpoint path customization
  
    Endpoint paths can be prefixed with a `namespace` by setting the namespace
    property on the adapter:
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      namespace: 'api/1'
    });
    ```
    Requests for the `Person` model would now target `/api/1/people/1`.
  
    ### Host customization
  
    An adapter can target other hosts by setting the `host` property.
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      host: 'https://api.example.com'
    });
    ```
  
    ### Headers customization
  
    Some APIs require HTTP headers, e.g. to provide an API key. Arbitrary
    headers can be set as key/value pairs on the `RESTAdapter`'s `headers`
    object and Ember Data will send them along with each ajax request.
  
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      headers: {
        "API_KEY": "secret key",
        "ANOTHER_HEADER": "Some header value"
      }
    });
    ```
  
    `headers` can also be used as a computed property to support dynamic
    headers. In the example below, the `session` object has been
    injected into an adapter by Ember's container.
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      headers: Ember.computed('session.authToken', function() {
        return {
          "API_KEY": this.get("session.authToken"),
          "ANOTHER_HEADER": "Some header value"
        };
      })
    });
    ```
  
    In some cases, your dynamic headers may require data from some
    object outside of Ember's observer system (for example
    `document.cookie`). You can use the
    [volatile](/api/classes/Ember.ComputedProperty.html#method_volatile)
    function to set the property into a non-cached mode causing the headers to
    be recomputed with every request.
  
    ```app/adapters/application.js
    import DS from 'ember-data';
  
    export default DS.RESTAdapter.extend({
      headers: Ember.computed(function() {
        return {
          "API_KEY": Ember.get(document.cookie.match(/apiKey\=([^;]*)/), "1"),
          "ANOTHER_HEADER": "Some header value"
        };
      }).volatile()
    });
    ```
  
    @class RESTAdapter
    @constructor
    @namespace DS
    @extends DS.Adapter
    @uses DS.BuildURLMixin
  */
  var RESTAdapter = _emberDataAdapter['default'].extend(_emberDataPrivateAdaptersBuildUrlMixin['default'], {
    defaultSerializer: '-rest',

    /**
      By default, the RESTAdapter will send the query params sorted alphabetically to the
      server.
       For example:
       ```js
        store.query('posts', { sort: 'price', category: 'pets' });
      ```
       will generate a requests like this `/posts?category=pets&sort=price`, even if the
      parameters were specified in a different order.
       That way the generated URL will be deterministic and that simplifies caching mechanisms
      in the backend.
       Setting `sortQueryParams` to a falsey value will respect the original order.
       In case you want to sort the query parameters with a different criteria, set
      `sortQueryParams` to your custom sort function.
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.RESTAdapter.extend({
        sortQueryParams: function(params) {
          var sortedKeys = Object.keys(params).sort().reverse();
          var len = sortedKeys.length, newParams = {};
           for (var i = 0; i < len; i++) {
            newParams[sortedKeys[i]] = params[sortedKeys[i]];
          }
          return newParams;
        }
      });
      ```
       @method sortQueryParams
      @param {Object} obj
      @return {Object}
    */
    sortQueryParams: function sortQueryParams(obj) {
      var keys = Object.keys(obj);
      var len = keys.length;
      if (len < 2) {
        return obj;
      }
      var newQueryParams = {};
      var sortedKeys = keys.sort();

      for (var i = 0; i < len; i++) {
        newQueryParams[sortedKeys[i]] = obj[sortedKeys[i]];
      }
      return newQueryParams;
    },

    /**
      By default the RESTAdapter will send each find request coming from a `store.find`
      or from accessing a relationship separately to the server. If your server supports passing
      ids as a query string, you can set coalesceFindRequests to true to coalesce all find requests
      within a single runloop.
       For example, if you have an initial payload of:
       ```javascript
      {
        post: {
          id: 1,
          comments: [1, 2]
        }
      }
      ```
       By default calling `post.get('comments')` will trigger the following requests(assuming the
      comments haven't been loaded before):
       ```
      GET /comments/1
      GET /comments/2
      ```
       If you set coalesceFindRequests to `true` it will instead trigger the following request:
       ```
      GET /comments?ids[]=1&ids[]=2
      ```
       Setting coalesceFindRequests to `true` also works for `store.find` requests and `belongsTo`
      relationships accessed within the same runloop. If you set `coalesceFindRequests: true`
       ```javascript
      store.findRecord('comment', 1);
      store.findRecord('comment', 2);
      ```
       will also send a request to: `GET /comments?ids[]=1&ids[]=2`
       Note: Requests coalescing rely on URL building strategy. So if you override `buildURL` in your app
      `groupRecordsForFindMany` more likely should be overridden as well in order for coalescing to work.
       @property coalesceFindRequests
      @type {boolean}
    */
    coalesceFindRequests: false,

    /**
      Endpoint paths can be prefixed with a `namespace` by setting the namespace
      property on the adapter:
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.RESTAdapter.extend({
        namespace: 'api/1'
      });
      ```
       Requests for the `Post` model would now target `/api/1/post/`.
       @property namespace
      @type {String}
    */

    /**
      An adapter can target other hosts by setting the `host` property.
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.RESTAdapter.extend({
        host: 'https://api.example.com'
      });
      ```
       Requests for the `Post` model would now target `https://api.example.com/post/`.
       @property host
      @type {String}
    */

    /**
      Some APIs require HTTP headers, e.g. to provide an API
      key. Arbitrary headers can be set as key/value pairs on the
      `RESTAdapter`'s `headers` object and Ember Data will send them
      along with each ajax request. For dynamic headers see [headers
      customization](/api/data/classes/DS.RESTAdapter.html#toc_headers-customization).
       ```app/adapters/application.js
      import DS from 'ember-data';
       export default DS.RESTAdapter.extend({
        headers: {
          "API_KEY": "secret key",
          "ANOTHER_HEADER": "Some header value"
        }
      });
      ```
       @property headers
      @type {Object}
     */

    /**
      Called by the store in order to fetch the JSON for a given
      type and ID.
       The `findRecord` method makes an Ajax request to a URL computed by
      `buildURL`, and returns a promise for the resulting payload.
       This method performs an HTTP `GET` request with the id provided as part of the query string.
       @method findRecord
      @param {DS.Store} store
      @param {DS.Model} type
      @param {String} id
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    findRecord: function findRecord(store, type, id, snapshot) {
      if (false) {
        var request = this._requestFor({
          store: store, type: type, id: id, snapshot: snapshot,
          requestType: 'findRecord'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, id, snapshot, 'findRecord');
        var query = this.buildQuery(snapshot);

        return this.ajax(url, 'GET', { data: query });
      }
    },

    /**
      Called by the store in order to fetch a JSON array for all
      of the records for a given type.
       The `findAll` method makes an Ajax (HTTP GET) request to a URL computed by `buildURL`, and returns a
      promise for the resulting payload.
       @method findAll
      @param {DS.Store} store
      @param {DS.Model} type
      @param {String} sinceToken
      @param {DS.SnapshotRecordArray} snapshotRecordArray
      @return {Promise} promise
    */
    findAll: function findAll(store, type, sinceToken, snapshotRecordArray) {
      var query = this.buildQuery(snapshotRecordArray);

      if (false) {
        var request = this._requestFor({
          store: store, type: type, sinceToken: sinceToken, query: query,
          snapshots: snapshotRecordArray,
          requestType: 'findAll'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, null, snapshotRecordArray, 'findAll');

        if (sinceToken) {
          query.since = sinceToken;
        }

        return this.ajax(url, 'GET', { data: query });
      }
    },

    /**
      Called by the store in order to fetch a JSON array for
      the records that match a particular query.
       The `query` method makes an Ajax (HTTP GET) request to a URL
      computed by `buildURL`, and returns a promise for the resulting
      payload.
       The `query` argument is a simple JavaScript object that will be passed directly
      to the server as parameters.
       @method query
      @param {DS.Store} store
      @param {DS.Model} type
      @param {Object} query
      @return {Promise} promise
    */
    query: function query(store, type, _query) {
      if (false) {
        var request = this._requestFor({
          store: store, type: type, query: _query,
          requestType: 'query'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, null, null, 'query', _query);

        if (this.sortQueryParams) {
          _query = this.sortQueryParams(_query);
        }

        return this.ajax(url, 'GET', { data: _query });
      }
    },

    /**
      Called by the store in order to fetch a JSON object for
      the record that matches a particular query.
       The `queryRecord` method makes an Ajax (HTTP GET) request to a URL
      computed by `buildURL`, and returns a promise for the resulting
      payload.
       The `query` argument is a simple JavaScript object that will be passed directly
      to the server as parameters.
       @method queryRecord
      @param {DS.Store} store
      @param {DS.Model} type
      @param {Object} query
      @return {Promise} promise
    */
    queryRecord: function queryRecord(store, type, query) {
      if (false) {
        var request = this._requestFor({
          store: store, type: type, query: query,
          requestType: 'queryRecord'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, null, null, 'queryRecord', query);

        if (this.sortQueryParams) {
          query = this.sortQueryParams(query);
        }

        return this.ajax(url, 'GET', { data: query });
      }
    },

    /**
      Called by the store in order to fetch several records together if `coalesceFindRequests` is true
       For example, if the original payload looks like:
       ```js
      {
        "id": 1,
        "title": "Rails is omakase",
        "comments": [ 1, 2, 3 ]
      }
      ```
       The IDs will be passed as a URL-encoded Array of IDs, in this form:
       ```
      ids[]=1&ids[]=2&ids[]=3
      ```
       Many servers, such as Rails and PHP, will automatically convert this URL-encoded array
      into an Array for you on the server-side. If you want to encode the
      IDs, differently, just override this (one-line) method.
       The `findMany` method makes an Ajax (HTTP GET) request to a URL computed by `buildURL`, and returns a
      promise for the resulting payload.
       @method findMany
      @param {DS.Store} store
      @param {DS.Model} type
      @param {Array} ids
      @param {Array} snapshots
      @return {Promise} promise
    */
    findMany: function findMany(store, type, ids, snapshots) {
      if (false) {
        var request = this._requestFor({
          store: store, type: type, ids: ids, snapshots: snapshots,
          requestType: 'findMany'
        });

        return this._makeRequest(request);
      } else {
        var url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
        return this.ajax(url, 'GET', { data: { ids: ids } });
      }
    },

    /**
      Called by the store in order to fetch a JSON array for
      the unloaded records in a has-many relationship that were originally
      specified as a URL (inside of `links`).
       For example, if your original payload looks like this:
       ```js
      {
        "post": {
          "id": 1,
          "title": "Rails is omakase",
          "links": { "comments": "/posts/1/comments" }
        }
      }
      ```
       This method will be called with the parent record and `/posts/1/comments`.
       The `findHasMany` method will make an Ajax (HTTP GET) request to the originally specified URL.
       The format of your `links` value will influence the final request URL via the `urlPrefix` method:
       * Links beginning with `//`, `http://`, `https://`, will be used as is, with no further manipulation.
       * Links beginning with a single `/` will have the current adapter's `host` value prepended to it.
       * Links with no beginning `/` will have a parentURL prepended to it, via the current adapter's `buildURL`.
       @method findHasMany
      @param {DS.Store} store
      @param {DS.Snapshot} snapshot
      @param {String} url
      @return {Promise} promise
    */
    findHasMany: function findHasMany(store, snapshot, url, relationship) {
      if (false) {
        var request = this._requestFor({
          store: store, snapshot: snapshot, url: url, relationship: relationship,
          requestType: 'findHasMany'
        });

        return this._makeRequest(request);
      } else {
        var id = snapshot.id;
        var type = snapshot.modelName;

        url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findHasMany'));

        return this.ajax(url, 'GET');
      }
    },

    /**
      Called by the store in order to fetch the JSON for the unloaded record in a
      belongs-to relationship that was originally specified as a URL (inside of
      `links`).
       For example, if your original payload looks like this:
       ```js
      {
        "person": {
          "id": 1,
          "name": "Tom Dale",
          "links": { "group": "/people/1/group" }
        }
      }
      ```
       This method will be called with the parent record and `/people/1/group`.
       The `findBelongsTo` method will make an Ajax (HTTP GET) request to the originally specified URL.
       The format of your `links` value will influence the final request URL via the `urlPrefix` method:
       * Links beginning with `//`, `http://`, `https://`, will be used as is, with no further manipulation.
       * Links beginning with a single `/` will have the current adapter's `host` value prepended to it.
       * Links with no beginning `/` will have a parentURL prepended to it, via the current adapter's `buildURL`.
       @method findBelongsTo
      @param {DS.Store} store
      @param {DS.Snapshot} snapshot
      @param {String} url
      @return {Promise} promise
    */
    findBelongsTo: function findBelongsTo(store, snapshot, url, relationship) {
      if (false) {
        var request = this._requestFor({
          store: store, snapshot: snapshot, url: url, relationship: relationship,
          requestType: 'findBelongsTo'
        });

        return this._makeRequest(request);
      } else {
        var id = snapshot.id;
        var type = snapshot.modelName;

        url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findBelongsTo'));
        return this.ajax(url, 'GET');
      }
    },

    /**
      Called by the store when a newly created record is
      saved via the `save` method on a model record instance.
       The `createRecord` method serializes the record and makes an Ajax (HTTP POST) request
      to a URL computed by `buildURL`.
       See `serialize` for information on how to customize the serialized form
      of a record.
       @method createRecord
      @param {DS.Store} store
      @param {DS.Model} type
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    createRecord: function createRecord(store, type, snapshot) {
      if (false) {
        var request = this._requestFor({
          store: store, type: type, snapshot: snapshot,
          requestType: 'createRecord'
        });

        return this._makeRequest(request);
      } else {
        var data = {};
        var serializer = store.serializerFor(type.modelName);
        var url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

        serializer.serializeIntoHash(data, type, snapshot, { includeId: true });

        return this.ajax(url, "POST", { data: data });
      }
    },

    /**
      Called by the store when an existing record is saved
      via the `save` method on a model record instance.
       The `updateRecord` method serializes the record and makes an Ajax (HTTP PUT) request
      to a URL computed by `buildURL`.
       See `serialize` for information on how to customize the serialized form
      of a record.
       @method updateRecord
      @param {DS.Store} store
      @param {DS.Model} type
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    updateRecord: function updateRecord(store, type, snapshot) {
      if (false) {
        var request = this._requestFor({
          store: store, type: type, snapshot: snapshot,
          requestType: 'updateRecord'
        });

        return this._makeRequest(request);
      } else {
        var data = {};
        var serializer = store.serializerFor(type.modelName);

        serializer.serializeIntoHash(data, type, snapshot);

        var id = snapshot.id;
        var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

        return this.ajax(url, "PUT", { data: data });
      }
    },

    /**
      Called by the store when a record is deleted.
       The `deleteRecord` method  makes an Ajax (HTTP DELETE) request to a URL computed by `buildURL`.
       @method deleteRecord
      @param {DS.Store} store
      @param {DS.Model} type
      @param {DS.Snapshot} snapshot
      @return {Promise} promise
    */
    deleteRecord: function deleteRecord(store, type, snapshot) {
      if (false) {
        var request = this._requestFor({
          store: store, type: type, snapshot: snapshot,
          requestType: 'deleteRecord'
        });

        return this._makeRequest(request);
      } else {
        var id = snapshot.id;

        return this.ajax(this.buildURL(type.modelName, id, snapshot, 'deleteRecord'), "DELETE");
      }
    },

    _stripIDFromURL: function _stripIDFromURL(store, snapshot) {
      var url = this.buildURL(snapshot.modelName, snapshot.id, snapshot);

      var expandedURL = url.split('/');
      //Case when the url is of the format ...something/:id
      var lastSegment = expandedURL[expandedURL.length - 1];
      var id = snapshot.id;
      if (lastSegment === id) {
        expandedURL[expandedURL.length - 1] = "";
      } else if (endsWith(lastSegment, '?id=' + id)) {
        //Case when the url is of the format ...something?id=:id
        expandedURL[expandedURL.length - 1] = lastSegment.substring(0, lastSegment.length - id.length - 1);
      }

      return expandedURL.join('/');
    },

    // http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
    maxURLLength: 2048,

    /**
      Organize records into groups, each of which is to be passed to separate
      calls to `findMany`.
       This implementation groups together records that have the same base URL but
      differing ids. For example `/comments/1` and `/comments/2` will be grouped together
      because we know findMany can coalesce them together as `/comments?ids[]=1&ids[]=2`
       It also supports urls where ids are passed as a query param, such as `/comments?id=1`
      but not those where there is more than 1 query param such as `/comments?id=2&name=David`
      Currently only the query param of `id` is supported. If you need to support others, please
      override this or the `_stripIDFromURL` method.
       It does not group records that have differing base urls, such as for example: `/posts/1/comments/2`
      and `/posts/2/comments/3`
       @method groupRecordsForFindMany
      @param {DS.Store} store
      @param {Array} snapshots
      @return {Array}  an array of arrays of records, each of which is to be
                        loaded separately by `findMany`.
    */
    groupRecordsForFindMany: function groupRecordsForFindMany(store, snapshots) {
      var groups = MapWithDefault.create({ defaultValue: function defaultValue() {
          return [];
        } });
      var adapter = this;
      var maxURLLength = this.maxURLLength;

      snapshots.forEach(function (snapshot) {
        var baseUrl = adapter._stripIDFromURL(store, snapshot);
        groups.get(baseUrl).push(snapshot);
      });

      function splitGroupToFitInUrl(group, maxURLLength, paramNameLength) {
        var baseUrl = adapter._stripIDFromURL(store, group[0]);
        var idsSize = 0;
        var splitGroups = [[]];

        group.forEach(function (snapshot) {
          var additionalLength = encodeURIComponent(snapshot.id).length + paramNameLength;
          if (baseUrl.length + idsSize + additionalLength >= maxURLLength) {
            idsSize = 0;
            splitGroups.push([]);
          }

          idsSize += additionalLength;

          var lastGroupIndex = splitGroups.length - 1;
          splitGroups[lastGroupIndex].push(snapshot);
        });

        return splitGroups;
      }

      var groupsArray = [];
      groups.forEach(function (group, key) {
        var paramNameLength = '&ids%5B%5D='.length;
        var splitGroups = splitGroupToFitInUrl(group, maxURLLength, paramNameLength);

        splitGroups.forEach(function (splitGroup) {
          return groupsArray.push(splitGroup);
        });
      });

      return groupsArray;
    },

    /**
      Takes an ajax response, and returns the json payload or an error.
       By default this hook just returns the json payload passed to it.
      You might want to override it in two cases:
       1. Your API might return useful results in the response headers.
      Response headers are passed in as the second argument.
       2. Your API might return errors as successful responses with status code
      200 and an Errors text or object. You can return a `DS.InvalidError` or a
      `DS.AdapterError` (or a sub class) from this hook and it will automatically
      reject the promise and put your record into the invalid or error state.
       Returning a `DS.InvalidError` from this method will cause the
      record to transition into the `invalid` state and make the
      `errors` object available on the record. When returning an
      `DS.InvalidError` the store will attempt to normalize the error data
      returned from the server using the serializer's `extractErrors`
      method.
       @method handleResponse
      @param  {Number} status
      @param  {Object} headers
      @param  {Object} payload
      @param  {Object} requestData - the original request information
      @return {Object | DS.AdapterError} response
    */
    handleResponse: function handleResponse(status, headers, payload, requestData) {
      if (this.isSuccess(status, headers, payload)) {
        return payload;
      } else if (this.isInvalid(status, headers, payload)) {
        return new _emberDataAdaptersErrors.InvalidError(payload.errors);
      }

      var errors = this.normalizeErrorResponse(status, headers, payload);
      var detailedMessage = this.generatedDetailedMessage(status, headers, payload, requestData);

      if (false) {
        switch (status) {
          case 401:
            return new _emberDataAdaptersErrors.UnauthorizedError(errors, detailedMessage);
          case 403:
            return new _emberDataAdaptersErrors.ForbiddenError(errors, detailedMessage);
          case 404:
            return new _emberDataAdaptersErrors.NotFoundError(errors, detailedMessage);
          case 409:
            return new _emberDataAdaptersErrors.ConflictError(errors, detailedMessage);
          default:
            if (status >= 500) {
              return new _emberDataAdaptersErrors.ServerError(errors, detailedMessage);
            }
        }
      }

      return new _emberDataAdaptersErrors.AdapterError(errors, detailedMessage);
    },

    /**
      Default `handleResponse` implementation uses this hook to decide if the
      response is a success.
       @method isSuccess
      @param  {Number} status
      @param  {Object} headers
      @param  {Object} payload
      @return {Boolean}
    */
    isSuccess: function isSuccess(status, headers, payload) {
      return status >= 200 && status < 300 || status === 304;
    },

    /**
      Default `handleResponse` implementation uses this hook to decide if the
      response is a an invalid error.
       @method isInvalid
      @param  {Number} status
      @param  {Object} headers
      @param  {Object} payload
      @return {Boolean}
    */
    isInvalid: function isInvalid(status, headers, payload) {
      return status === 422;
    },

    /**
      Takes a URL, an HTTP method and a hash of data, and makes an
      HTTP request.
       When the server responds with a payload, Ember Data will call into `extractSingle`
      or `extractArray` (depending on whether the original query was for one record or
      many records).
       By default, `ajax` method has the following behavior:
       * It sets the response `dataType` to `"json"`
      * If the HTTP method is not `"GET"`, it sets the `Content-Type` to be
        `application/json; charset=utf-8`
      * If the HTTP method is not `"GET"`, it stringifies the data passed in. The
        data is the serialized record in the case of a save.
      * Registers success and failure handlers.
       @method ajax
      @private
      @param {String} url
      @param {String} type The request type GET, POST, PUT, DELETE etc.
      @param {Object} options
      @return {Promise} promise
    */
    ajax: function ajax(url, type, options) {
      var adapter = this;

      var requestData = {
        url: url,
        method: type
      };

      return new _ember['default'].RSVP.Promise(function (resolve, reject) {
        var hash = adapter.ajaxOptions(url, type, options);

        hash.success = function (payload, textStatus, jqXHR) {

          var response = adapter.handleResponse(jqXHR.status, (0, _emberDataPrivateUtilsParseResponseHeaders['default'])(jqXHR.getAllResponseHeaders()), payload, requestData);

          if (response && response.isAdapterError) {
            _ember['default'].run.join(null, reject, response);
          } else {
            _ember['default'].run.join(null, resolve, response);
          }
        };

        hash.error = function (jqXHR, textStatus, errorThrown) {
          (0, _emberDataPrivateDebug.runInDebug)(function () {
            var message = 'The server returned an empty string for ' + type + ' ' + url + ', which cannot be parsed into a valid JSON. Return either null or {}.';
            var validJSONString = !(textStatus === "parsererror" && jqXHR.responseText === "");
            (0, _emberDataPrivateDebug.warn)(message, validJSONString, {
              id: 'ds.adapter.returned-empty-string-as-JSON'
            });
          });

          var error = undefined;

          if (errorThrown instanceof Error) {
            error = errorThrown;
          } else if (textStatus === 'timeout') {
            error = new _emberDataAdaptersErrors.TimeoutError();
          } else if (textStatus === 'abort') {
            error = new _emberDataAdaptersErrors.AbortError();
          } else {
            error = adapter.handleResponse(jqXHR.status, (0, _emberDataPrivateUtilsParseResponseHeaders['default'])(jqXHR.getAllResponseHeaders()), adapter.parseErrorResponse(jqXHR.responseText) || errorThrown, requestData);
          }

          _ember['default'].run.join(null, reject, error);
        };

        adapter._ajaxRequest(hash);
      }, 'DS: RESTAdapter#ajax ' + type + ' to ' + url);
    },

    /**
      @method _ajaxRequest
      @private
      @param {Object} options jQuery ajax options to be used for the ajax request
    */
    _ajaxRequest: function _ajaxRequest(options) {
      _ember['default'].$.ajax(options);
    },

    /**
      @method ajaxOptions
      @private
      @param {String} url
      @param {String} type The request type GET, POST, PUT, DELETE etc.
      @param {Object} options
      @return {Object}
    */
    ajaxOptions: function ajaxOptions(url, type, options) {
      var hash = options || {};
      hash.url = url;
      hash.type = type;
      hash.dataType = 'json';
      hash.context = this;

      if (hash.data && type !== 'GET') {
        hash.contentType = 'application/json; charset=utf-8';
        hash.data = JSON.stringify(hash.data);
      }

      var headers = get(this, 'headers');
      if (headers !== undefined) {
        hash.beforeSend = function (xhr) {
          Object.keys(headers).forEach(function (key) {
            return xhr.setRequestHeader(key, headers[key]);
          });
        };
      }

      return hash;
    },

    /**
      @method parseErrorResponse
      @private
      @param {String} responseText
      @return {Object}
    */
    parseErrorResponse: function parseErrorResponse(responseText) {
      var json = responseText;

      try {
        json = _ember['default'].$.parseJSON(responseText);
      } catch (e) {}

      return json;
    },

    /**
      @method normalizeErrorResponse
      @private
      @param  {Number} status
      @param  {Object} headers
      @param  {Object} payload
      @return {Array} errors payload
    */
    normalizeErrorResponse: function normalizeErrorResponse(status, headers, payload) {
      if (payload && typeof payload === 'object' && payload.errors) {
        return payload.errors;
      } else {
        return [{
          status: '' + status,
          title: "The backend responded with an error",
          detail: '' + payload
        }];
      }
    },

    /**
      Generates a detailed ("friendly") error message, with plenty
      of information for debugging (good luck!)
       @method generatedDetailedMessage
      @private
      @param  {Number} status
      @param  {Object} headers
      @param  {Object} payload
      @param  {Object} requestData
      @return {String} detailed error message
    */
    generatedDetailedMessage: function generatedDetailedMessage(status, headers, payload, requestData) {
      var shortenedPayload;
      var payloadContentType = headers["Content-Type"] || "Empty Content-Type";

      if (payloadContentType === "text/html" && payload.length > 250) {
        shortenedPayload = "[Omitted Lengthy HTML]";
      } else {
        shortenedPayload = payload;
      }

      var requestDescription = requestData.method + ' ' + requestData.url;
      var payloadDescription = 'Payload (' + payloadContentType + ')';

      return ['Ember Data Request ' + requestDescription + ' returned a ' + status, payloadDescription, shortenedPayload].join('\n');
    },

    buildQuery: function buildQuery(snapshot) {
      var query = {};

      if (true) {
        if (snapshot) {
          var include = snapshot.include;

          if (include) {
            query.include = include;
          }
        }
      }

      return query;
    }
  });

  if (false) {

    RESTAdapter.reopen({

      /**
       * Get the data (body or query params) for a request.
       *
       * @public
       * @method dataForRequest
       * @param {Object} params
       * @return {Object} data
       */
      dataForRequest: function dataForRequest(params) {
        var store = params.store;
        var type = params.type;
        var snapshot = params.snapshot;
        var requestType = params.requestType;
        var query = params.query;

        // type is not passed to findBelongsTo and findHasMany
        type = type || snapshot && snapshot.type;

        var serializer = store.serializerFor(type.modelName);
        var data = {};

        switch (requestType) {
          case 'createRecord':
            serializer.serializeIntoHash(data, type, snapshot, { includeId: true });
            break;

          case 'updateRecord':
            serializer.serializeIntoHash(data, type, snapshot);
            break;

          case 'findRecord':
            data = this.buildQuery(snapshot);
            break;

          case 'findAll':
            if (params.sinceToken) {
              query = query || {};
              query.since = params.sinceToken;
            }
            data = query;
            break;

          case 'query':
          case 'queryRecord':
            if (this.sortQueryParams) {
              query = this.sortQueryParams(query);
            }
            data = query;
            break;

          case 'findMany':
            data = { ids: params.ids };
            break;

          default:
            data = undefined;
            break;
        }

        return data;
      },

      /**
       * Get the HTTP method for a request.
       *
       * @public
       * @method methodForRequest
       * @param {Object} params
       * @return {String} HTTP method
       */
      methodForRequest: function methodForRequest(params) {
        var requestType = params.requestType;

        switch (requestType) {
          case 'createRecord':
            return 'POST';
          case 'updateRecord':
            return 'PUT';
          case 'deleteRecord':
            return 'DELETE';
        }

        return 'GET';
      },

      /**
       * Get the URL for a request.
       *
       * @public
       * @method urlForRequest
       * @param {Object} params
       * @return {String} URL
       */
      urlForRequest: function urlForRequest(params) {
        var type = params.type;
        var id = params.id;
        var ids = params.ids;
        var snapshot = params.snapshot;
        var snapshots = params.snapshots;
        var requestType = params.requestType;
        var query = params.query;

        // type and id are not passed from updateRecord and deleteRecord, hence they
        // are defined if not set
        type = type || snapshot && snapshot.type;
        id = id || snapshot && snapshot.id;

        switch (requestType) {
          case 'findAll':
            return this.buildURL(type.modelName, null, snapshots, requestType);

          case 'query':
          case 'queryRecord':
            return this.buildURL(type.modelName, null, null, requestType, query);

          case 'findMany':
            return this.buildURL(type.modelName, ids, snapshots, requestType);

          case 'findHasMany':
          case 'findBelongsTo':
            var url = this.buildURL(type.modelName, id, snapshot, requestType);
            return this.urlPrefix(params.url, url);
        }

        return this.buildURL(type.modelName, id, snapshot, requestType, query);
      },

      /**
       * Get the headers for a request.
       *
       * By default the value of the `headers` property of the adapter is
       * returned.
       *
       * @public
       * @method headersForRequest
       * @param {Object} params
       * @return {Object} headers
       */
      headersForRequest: function headersForRequest(params) {
        return this.get('headers');
      },

      /**
       * Get an object which contains all properties for a request which should
       * be made.
       *
       * @private
       * @method _requestFor
       * @param {Object} params
       * @return {Object} request object
       */
      _requestFor: function _requestFor(params) {
        var method = this.methodForRequest(params);
        var url = this.urlForRequest(params);
        var headers = this.headersForRequest(params);
        var data = this.dataForRequest(params);

        return { method: method, url: url, headers: headers, data: data };
      },

      /**
       * Convert a request object into a hash which can be passed to `jQuery.ajax`.
       *
       * @private
       * @method _requestToJQueryAjaxHash
       * @param {Object} request
       * @return {Object} jQuery ajax hash
       */
      _requestToJQueryAjaxHash: function _requestToJQueryAjaxHash(request) {
        var hash = {};

        hash.type = request.method;
        hash.url = request.url;
        hash.dataType = 'json';
        hash.context = this;

        if (request.data) {
          if (request.type !== 'GET') {
            hash.contentType = 'application/json; charset=utf-8';
            hash.data = JSON.stringify(request.data);
          } else {
            hash.data = request.data;
          }
        }

        var headers = request.headers;
        if (headers !== undefined) {
          hash.beforeSend = function (xhr) {
            Object.keys(headers).forEach(function (key) {
              return xhr.setRequestHeader(key, headers[key]);
            });
          };
        }

        return hash;
      },

      /**
       * Make a request using `jQuery.ajax`.
       *
       * @private
       * @method _makeRequest
       * @param {Object} request
       * @return {Promise} promise
       */
      _makeRequest: function _makeRequest(request) {
        var adapter = this;
        var hash = this._requestToJQueryAjaxHash(request);

        var method = request.method;
        var url = request.url;

        var requestData = { method: method, url: url };

        return new _ember['default'].RSVP.Promise(function (resolve, reject) {

          hash.success = function (payload, textStatus, jqXHR) {
            var response = adapter.handleResponse(jqXHR.status, (0, _emberDataPrivateUtilsParseResponseHeaders['default'])(jqXHR.getAllResponseHeaders()), payload, requestData);

            if (response instanceof _emberDataAdaptersErrors.AdapterError) {
              _ember['default'].run.join(null, reject, response);
            } else {
              _ember['default'].run.join(null, resolve, response);
            }
          };

          hash.error = function (jqXHR, textStatus, errorThrown) {
            (0, _emberDataPrivateDebug.runInDebug)(function () {
              var message = 'The server returned an empty string for ' + method + ' ' + url + ', which cannot be parsed into a valid JSON. Return either null or {}.';
              var validJSONString = !(textStatus === "parsererror" && jqXHR.responseText === "");
              (0, _emberDataPrivateDebug.warn)(message, validJSONString, {
                id: 'ds.adapter.returned-empty-string-as-JSON'
              });
            });

            var error = undefined;

            if (errorThrown instanceof Error) {
              error = errorThrown;
            } else if (textStatus === 'timeout') {
              error = new _emberDataAdaptersErrors.TimeoutError();
            } else if (textStatus === 'abort') {
              error = new _emberDataAdaptersErrors.AbortError();
            } else {
              error = adapter.handleResponse(jqXHR.status, (0, _emberDataPrivateUtilsParseResponseHeaders['default'])(jqXHR.getAllResponseHeaders()), adapter.parseErrorResponse(jqXHR.responseText) || errorThrown, requestData);
            }

            _ember['default'].run.join(null, reject, error);
          };

          adapter._ajaxRequest(hash);
        }, 'DS: RESTAdapter#makeRequest: ' + method + ' ' + url);
      }
    });
  }

  //From http://stackoverflow.com/questions/280634/endswith-in-javascript
  function endsWith(string, suffix) {
    if (typeof String.prototype.endsWith !== 'function') {
      return string.indexOf(suffix, string.length - suffix.length) !== -1;
    } else {
      return string.endsWith(suffix);
    }
  }

  exports['default'] = RESTAdapter;
});
define('ember-data/attr', ['exports', 'ember', 'ember-data/-private/debug'], function (exports, _ember, _emberDataPrivateDebug) {
  'use strict';

  exports['default'] = attr;

  /**
    @module ember-data
  */

  function getDefaultValue(record, options, key) {
    if (typeof options.defaultValue === 'function') {
      return options.defaultValue.apply(null, arguments);
    } else {
      var defaultValue = options.defaultValue;
      (0, _emberDataPrivateDebug.deprecate)('Non primitive defaultValues are deprecated because they are shared between all instances. If you would like to use a complex object as a default value please provide a function that returns the complex object.', typeof defaultValue !== 'object' || defaultValue === null, {
        id: 'ds.defaultValue.complex-object',
        until: '3.0.0'
      });
      return defaultValue;
    }
  }

  function hasValue(record, key) {
    return key in record._attributes || key in record._inFlightAttributes || key in record._data;
  }

  function getValue(record, key) {
    if (key in record._attributes) {
      return record._attributes[key];
    } else if (key in record._inFlightAttributes) {
      return record._inFlightAttributes[key];
    } else {
      return record._data[key];
    }
  }

  /**
    `DS.attr` defines an attribute on a [DS.Model](/api/data/classes/DS.Model.html).
    By default, attributes are passed through as-is, however you can specify an
    optional type to have the value automatically transformed.
    Ember Data ships with four basic transform types: `string`, `number`,
    `boolean` and `date`. You can define your own transforms by subclassing
    [DS.Transform](/api/data/classes/DS.Transform.html).
  
    Note that you cannot use `attr` to define an attribute of `id`.
  
    `DS.attr` takes an optional hash as a second parameter, currently
    supported options are:
  
    - `defaultValue`: Pass a string or a function to be called to set the attribute
                      to a default value if none is supplied.
  
    Example
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      username: DS.attr('string'),
      email: DS.attr('string'),
      verified: DS.attr('boolean', { defaultValue: false })
    });
    ```
  
    Default value can also be a function. This is useful it you want to return
    a new object for each attribute.
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      username: attr('string'),
      email: attr('string'),
      settings: attr({defaultValue: function() {
        return {};
      }})
    });
    ```
  
    @namespace
    @method attr
    @for DS
    @param {String} type the attribute type
    @param {Object} options a hash of options
    @return {Attribute}
  */
  function attr(type, options) {
    if (typeof type === 'object') {
      options = type;
      type = undefined;
    } else {
      options = options || {};
    }

    var meta = {
      type: type,
      isAttribute: true,
      options: options
    };

    return _ember['default'].computed({
      get: function get(key) {
        var internalModel = this._internalModel;
        if (hasValue(internalModel, key)) {
          return getValue(internalModel, key);
        } else {
          return getDefaultValue(this, options, key);
        }
      },
      set: function set(key, value) {
        var internalModel = this._internalModel;
        var oldValue = getValue(internalModel, key);
        var originalValue;

        if (value !== oldValue) {
          // Add the new value to the changed attributes hash; it will get deleted by
          // the 'didSetProperty' handler if it is no different from the original value
          internalModel._attributes[key] = value;

          if (key in internalModel._inFlightAttributes) {
            originalValue = internalModel._inFlightAttributes[key];
          } else {
            originalValue = internalModel._data[key];
          }

          this._internalModel.send('didSetProperty', {
            name: key,
            oldValue: oldValue,
            originalValue: originalValue,
            value: value
          });
        }

        return value;
      }
    }).meta(meta);
  }

  // TODO add to documentation of `attr` function above, once this feature is added
  // /**
  //  * The `options` hash is passed as second argument to a transforms'
  //  * `serialize` and `deserialize` method. This allows to configure a
  //  * transformation and adapt the corresponding value, based on the config:
  //  *
  //  * ```app/models/post.js
  //  * export default DS.Model.extend({
  //  *   text: DS.attr('text', {
  //  *     uppercase: true
  //  *   })
  //  * });
  //  * ```
  //  *
  //  * ```app/transforms/text.js
  //  * export default DS.Transform.extend({
  //  *   serialize: function(value, options) {
  //  *     if (options.uppercase) {
  //  *       return value.toUpperCase();
  //  *     }
  //  *
  //  *     return value;
  //  *   },
  //  *
  //  *   deserialize: function(value) {
  //  *     return value;
  //  *   }
  //  * })
  //  * ```
  //  *
  //  */
});
define("ember-data/index", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/features", "ember-data/-private/core", "ember-data/-private/system/normalize-model-name", "ember-data/-private/system/model/internal-model", "ember-data/-private/system/promise-proxies", "ember-data/-private/system/store", "ember-data/-private/system/model", "ember-data/model", "ember-data/-private/system/snapshot", "ember-data/adapter", "ember-data/serializer", "ember-data/-private/system/debug", "ember-data/adapters/errors", "ember-data/-private/system/record-arrays", "ember-data/-private/system/many-array", "ember-data/-private/system/record-array-manager", "ember-data/-private/adapters", "ember-data/-private/adapters/build-url-mixin", "ember-data/-private/serializers", "ember-inflector", "ember-data/serializers/embedded-records-mixin", "ember-data/-private/transforms", "ember-data/relationships", "ember-data/setup-container", "ember-data/-private/instance-initializers/initialize-store-service", "ember-data/-private/system/container-proxy", "ember-data/-private/system/relationships/state/relationship"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateFeatures, _emberDataPrivateCore, _emberDataPrivateSystemNormalizeModelName, _emberDataPrivateSystemModelInternalModel, _emberDataPrivateSystemPromiseProxies, _emberDataPrivateSystemStore, _emberDataPrivateSystemModel, _emberDataModel, _emberDataPrivateSystemSnapshot, _emberDataAdapter, _emberDataSerializer, _emberDataPrivateSystemDebug, _emberDataAdaptersErrors, _emberDataPrivateSystemRecordArrays, _emberDataPrivateSystemManyArray, _emberDataPrivateSystemRecordArrayManager, _emberDataPrivateAdapters, _emberDataPrivateAdaptersBuildUrlMixin, _emberDataPrivateSerializers, _emberInflector, _emberDataSerializersEmbeddedRecordsMixin, _emberDataPrivateTransforms, _emberDataRelationships, _emberDataSetupContainer, _emberDataPrivateInstanceInitializersInitializeStoreService, _emberDataPrivateSystemContainerProxy, _emberDataPrivateSystemRelationshipsStateRelationship) {
  "use strict";

  if (_ember["default"].VERSION.match(/^1\.([0-9]|1[0-2])\./)) {
    throw new _ember["default"].Error("Ember Data requires at least Ember 1.13.0, but you have " + _ember["default"].VERSION + ". Please upgrade your version of Ember, then upgrade Ember Data.");
  }_emberDataPrivateCore["default"].Store = _emberDataPrivateSystemStore.Store;
  _emberDataPrivateCore["default"].PromiseArray = _emberDataPrivateSystemPromiseProxies.PromiseArray;
  _emberDataPrivateCore["default"].PromiseObject = _emberDataPrivateSystemPromiseProxies.PromiseObject;

  _emberDataPrivateCore["default"].PromiseManyArray = _emberDataPrivateSystemPromiseProxies.PromiseManyArray;

  _emberDataPrivateCore["default"].Model = _emberDataModel["default"];
  _emberDataPrivateCore["default"].RootState = _emberDataPrivateSystemModel.RootState;
  _emberDataPrivateCore["default"].attr = _emberDataPrivateSystemModel.attr;
  _emberDataPrivateCore["default"].Errors = _emberDataPrivateSystemModel.Errors;

  _emberDataPrivateCore["default"].InternalModel = _emberDataPrivateSystemModelInternalModel["default"];
  _emberDataPrivateCore["default"].Snapshot = _emberDataPrivateSystemSnapshot["default"];

  _emberDataPrivateCore["default"].Adapter = _emberDataAdapter["default"];

  _emberDataPrivateCore["default"].AdapterError = _emberDataAdaptersErrors.AdapterError;
  _emberDataPrivateCore["default"].InvalidError = _emberDataAdaptersErrors.InvalidError;
  _emberDataPrivateCore["default"].TimeoutError = _emberDataAdaptersErrors.TimeoutError;
  _emberDataPrivateCore["default"].AbortError = _emberDataAdaptersErrors.AbortError;

  if (false) {
    _emberDataPrivateCore["default"].UnauthorizedError = _emberDataAdaptersErrors.UnauthorizedError;
    _emberDataPrivateCore["default"].ForbiddenError = _emberDataAdaptersErrors.ForbiddenError;
    _emberDataPrivateCore["default"].NotFoundError = _emberDataAdaptersErrors.NotFoundError;
    _emberDataPrivateCore["default"].ConflictError = _emberDataAdaptersErrors.ConflictError;
    _emberDataPrivateCore["default"].ServerError = _emberDataAdaptersErrors.ServerError;
  }

  _emberDataPrivateCore["default"].errorsHashToArray = _emberDataAdaptersErrors.errorsHashToArray;
  _emberDataPrivateCore["default"].errorsArrayToHash = _emberDataAdaptersErrors.errorsArrayToHash;

  _emberDataPrivateCore["default"].Serializer = _emberDataSerializer["default"];

  _emberDataPrivateCore["default"].DebugAdapter = _emberDataPrivateSystemDebug["default"];

  _emberDataPrivateCore["default"].RecordArray = _emberDataPrivateSystemRecordArrays.RecordArray;
  _emberDataPrivateCore["default"].FilteredRecordArray = _emberDataPrivateSystemRecordArrays.FilteredRecordArray;
  _emberDataPrivateCore["default"].AdapterPopulatedRecordArray = _emberDataPrivateSystemRecordArrays.AdapterPopulatedRecordArray;
  _emberDataPrivateCore["default"].ManyArray = _emberDataPrivateSystemManyArray["default"];

  _emberDataPrivateCore["default"].RecordArrayManager = _emberDataPrivateSystemRecordArrayManager["default"];

  _emberDataPrivateCore["default"].RESTAdapter = _emberDataPrivateAdapters.RESTAdapter;
  _emberDataPrivateCore["default"].BuildURLMixin = _emberDataPrivateAdaptersBuildUrlMixin["default"];

  _emberDataPrivateCore["default"].RESTSerializer = _emberDataPrivateSerializers.RESTSerializer;
  _emberDataPrivateCore["default"].JSONSerializer = _emberDataPrivateSerializers.JSONSerializer;

  _emberDataPrivateCore["default"].JSONAPIAdapter = _emberDataPrivateAdapters.JSONAPIAdapter;
  _emberDataPrivateCore["default"].JSONAPISerializer = _emberDataPrivateSerializers.JSONAPISerializer;

  _emberDataPrivateCore["default"].Transform = _emberDataPrivateTransforms.Transform;
  _emberDataPrivateCore["default"].DateTransform = _emberDataPrivateTransforms.DateTransform;
  _emberDataPrivateCore["default"].StringTransform = _emberDataPrivateTransforms.StringTransform;
  _emberDataPrivateCore["default"].NumberTransform = _emberDataPrivateTransforms.NumberTransform;
  _emberDataPrivateCore["default"].BooleanTransform = _emberDataPrivateTransforms.BooleanTransform;

  _emberDataPrivateCore["default"].EmbeddedRecordsMixin = _emberDataSerializersEmbeddedRecordsMixin["default"];

  _emberDataPrivateCore["default"].belongsTo = _emberDataRelationships.belongsTo;
  _emberDataPrivateCore["default"].hasMany = _emberDataRelationships.hasMany;

  _emberDataPrivateCore["default"].Relationship = _emberDataPrivateSystemRelationshipsStateRelationship["default"];

  _emberDataPrivateCore["default"].ContainerProxy = _emberDataPrivateSystemContainerProxy["default"];

  _emberDataPrivateCore["default"]._setupContainer = _emberDataSetupContainer["default"];
  _emberDataPrivateCore["default"]._initializeStoreService = _emberDataPrivateInstanceInitializersInitializeStoreService["default"];

  Object.defineProperty(_emberDataPrivateCore["default"], 'normalizeModelName', {
    enumerable: true,
    writable: false,
    configurable: false,
    value: _emberDataPrivateSystemNormalizeModelName["default"]
  });

  _ember["default"].lookup.DS = _emberDataPrivateCore["default"];

  exports["default"] = _emberDataPrivateCore["default"];
});

/**
  Ember Data
  @module ember-data
  @main ember-data
*/
define("ember-data/model", ["exports", "ember-data/-private/system/model"], function (exports, _emberDataPrivateSystemModel) {
  "use strict";

  exports["default"] = _emberDataPrivateSystemModel["default"];
});
define("ember-data/relationships", ["exports", "ember-data/-private/system/relationships/belongs-to", "ember-data/-private/system/relationships/has-many"], function (exports, _emberDataPrivateSystemRelationshipsBelongsTo, _emberDataPrivateSystemRelationshipsHasMany) {
  /**
    @module ember-data
  */

  "use strict";

  exports.belongsTo = _emberDataPrivateSystemRelationshipsBelongsTo["default"];
  exports.hasMany = _emberDataPrivateSystemRelationshipsHasMany["default"];
});
define('ember-data/serializer', ['exports', 'ember'], function (exports, _ember) {
  /**
    @module ember-data
  */

  'use strict';

  /**
    `DS.Serializer` is an abstract base class that you should override in your
    application to customize it for your backend. The minimum set of methods
    that you should implement is:
  
      * `normalizeResponse()`
      * `serialize()`
  
    And you can optionally override the following methods:
  
      * `normalize()`
  
    For an example implementation, see
    [DS.JSONSerializer](DS.JSONSerializer.html), the included JSON serializer.
  
    @class Serializer
    @namespace DS
    @extends Ember.Object
  */

  exports['default'] = _ember['default'].Object.extend({

    /**
      The `store` property is the application's `store` that contains all records.
      It's injected as a service.
      It can be used to push records from a non flat data structure server
      response.
       @property store
      @type {DS.Store}
      @public
    */

    /**
      The `normalizeResponse` method is used to normalize a payload from the
      server to a JSON-API Document.
       http://jsonapi.org/format/#document-structure
       @method normalizeResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeResponse: null,

    /**
      The `serialize` method is used when a record is saved in order to convert
      the record into the form that your external data source expects.
       `serialize` takes an optional `options` hash with a single option:
       - `includeId`: If this is `true`, `serialize` should include the ID
        in the serialized object it builds.
       @method serialize
      @param {DS.Model} record
      @param {Object} [options]
      @return {Object}
    */
    serialize: null,

    /**
      The `normalize` method is used to convert a payload received from your
      external data source into the normalized form `store.push()` expects. You
      should override this method, munge the hash and return the normalized
      payload.
       @method normalize
      @param {DS.Model} typeClass
      @param {Object} hash
      @return {Object}
    */
    normalize: function normalize(typeClass, hash) {
      return hash;
    }

  });
});
define('ember-data/serializers/embedded-records-mixin', ['exports', 'ember', 'ember-data/-private/debug', 'ember-data/-private/features'], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateFeatures) {
  'use strict';

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var camelize = _ember['default'].String.camelize;

  /**
    ## Using Embedded Records
  
    `DS.EmbeddedRecordsMixin` supports serializing embedded records.
  
    To set up embedded records, include the mixin when extending a serializer,
    then define and configure embedded (model) relationships.
  
    Below is an example of a per-type serializer (`post` type).
  
    ```app/serializers/post.js
    import DS from 'ember-data';
  
    export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
      attrs: {
        author: { embedded: 'always' },
        comments: { serialize: 'ids' }
      }
    });
    ```
    Note that this use of `{ embedded: 'always' }` is unrelated to
    the `{ embedded: 'always' }` that is defined as an option on `DS.attr` as part of
    defining a model while working with the `ActiveModelSerializer`.  Nevertheless,
    using `{ embedded: 'always' }` as an option to `DS.attr` is not a valid way to setup
    embedded records.
  
    The `attrs` option for a resource `{ embedded: 'always' }` is shorthand for:
  
    ```js
    {
      serialize: 'records',
      deserialize: 'records'
    }
    ```
  
    ### Configuring Attrs
  
    A resource's `attrs` option may be set to use `ids`, `records` or false for the
    `serialize`  and `deserialize` settings.
  
    The `attrs` property can be set on the `ApplicationSerializer` or a per-type
    serializer.
  
    In the case where embedded JSON is expected while extracting a payload (reading)
    the setting is `deserialize: 'records'`, there is no need to use `ids` when
    extracting as that is the default behavior without this mixin if you are using
    the vanilla `EmbeddedRecordsMixin`. Likewise, to embed JSON in the payload while
    serializing `serialize: 'records'` is the setting to use. There is an option of
    not embedding JSON in the serialized payload by using `serialize: 'ids'`. If you
    do not want the relationship sent at all, you can use `serialize: false`.
  
  
    ### EmbeddedRecordsMixin defaults
    If you do not overwrite `attrs` for a specific relationship, the `EmbeddedRecordsMixin`
    will behave in the following way:
  
    BelongsTo: `{ serialize: 'id', deserialize: 'id' }`
    HasMany:   `{ serialize: false, deserialize: 'ids' }`
  
    ### Model Relationships
  
    Embedded records must have a model defined to be extracted and serialized. Note that
    when defining any relationships on your model such as `belongsTo` and `hasMany`, you
    should not both specify `async: true` and also indicate through the serializer's
    `attrs` attribute that the related model should be embedded for deserialization.
    If a model is declared embedded for deserialization (`embedded: 'always'` or `deserialize: 'records'`),
    then do not use `async: true`.
  
    To successfully extract and serialize embedded records the model relationships
    must be setup correcty. See the
    [defining relationships](/guides/models/defining-models/#toc_defining-relationships)
    section of the **Defining Models** guide page.
  
    Records without an `id` property are not considered embedded records, model
    instances must have an `id` property to be used with Ember Data.
  
    ### Example JSON payloads, Models and Serializers
  
    **When customizing a serializer it is important to grok what the customizations
    are. Please read the docs for the methods this mixin provides, in case you need
    to modify it to fit your specific needs.**
  
    For example review the docs for each method of this mixin:
    * [normalize](/api/data/classes/DS.EmbeddedRecordsMixin.html#method_normalize)
    * [serializeBelongsTo](/api/data/classes/DS.EmbeddedRecordsMixin.html#method_serializeBelongsTo)
    * [serializeHasMany](/api/data/classes/DS.EmbeddedRecordsMixin.html#method_serializeHasMany)
  
    @class EmbeddedRecordsMixin
    @namespace DS
  */
  exports['default'] = _ember['default'].Mixin.create({

    /**
      Normalize the record and recursively normalize/extract all the embedded records
      while pushing them into the store as they are encountered
       A payload with an attr configured for embedded records needs to be extracted:
       ```js
      {
        "post": {
          "id": "1"
          "title": "Rails is omakase",
          "comments": [{
            "id": "1",
            "body": "Rails is unagi"
          }, {
            "id": "2",
            "body": "Omakase O_o"
          }]
        }
      }
      ```
     @method normalize
     @param {DS.Model} typeClass
     @param {Object} hash to be normalized
     @param {String} prop the hash has been referenced by
     @return {Object} the normalized hash
    **/
    normalize: function normalize(typeClass, hash, prop) {
      var normalizedHash = this._super(typeClass, hash, prop);
      return this._extractEmbeddedRecords(this, this.store, typeClass, normalizedHash);
    },

    keyForRelationship: function keyForRelationship(key, typeClass, method) {
      if (method === 'serialize' && this.hasSerializeRecordsOption(key) || method === 'deserialize' && this.hasDeserializeRecordsOption(key)) {
        return this.keyForAttribute(key, method);
      } else {
        return this._super(key, typeClass, method) || key;
      }
    },

    /**
      Serialize `belongsTo` relationship when it is configured as an embedded object.
       This example of an author model belongs to a post model:
       ```js
      Post = DS.Model.extend({
        title:    DS.attr('string'),
        body:     DS.attr('string'),
        author:   DS.belongsTo('author')
      });
       Author = DS.Model.extend({
        name:     DS.attr('string'),
        post:     DS.belongsTo('post')
      });
      ```
       Use a custom (type) serializer for the post model to configure embedded author
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
          author: { embedded: 'always' }
        }
      })
      ```
       A payload with an attribute configured for embedded records can serialize
      the records together under the root attribute's payload:
       ```js
      {
        "post": {
          "id": "1"
          "title": "Rails is omakase",
          "author": {
            "id": "2"
            "name": "dhh"
          }
        }
      }
      ```
       @method serializeBelongsTo
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializeBelongsTo: function serializeBelongsTo(snapshot, json, relationship) {
      var attr = relationship.key;
      if (this.noSerializeOptionSpecified(attr)) {
        this._super(snapshot, json, relationship);
        return;
      }
      var includeIds = this.hasSerializeIdsOption(attr);
      var includeRecords = this.hasSerializeRecordsOption(attr);
      var embeddedSnapshot = snapshot.belongsTo(attr);
      var key;
      if (includeIds) {
        key = this.keyForRelationship(attr, relationship.kind, 'serialize');
        if (!embeddedSnapshot) {
          json[key] = null;
        } else {
          json[key] = embeddedSnapshot.id;

          if (relationship.options.polymorphic) {
            this.serializePolymorphicType(snapshot, json, relationship);
          }
        }
      } else if (includeRecords) {
        this._serializeEmbeddedBelongsTo(snapshot, json, relationship);
      }
    },

    _serializeEmbeddedBelongsTo: function _serializeEmbeddedBelongsTo(snapshot, json, relationship) {
      var embeddedSnapshot = snapshot.belongsTo(relationship.key);
      var serializedKey = this._getMappedKey(relationship.key, snapshot.type);
      if (serializedKey === relationship.key && this.keyForRelationship) {
        serializedKey = this.keyForRelationship(relationship.key, relationship.kind, "serialize");
      }

      if (!embeddedSnapshot) {
        json[serializedKey] = null;
      } else {
        json[serializedKey] = embeddedSnapshot.serialize({ includeId: true });
        this.removeEmbeddedForeignKey(snapshot, embeddedSnapshot, relationship, json[serializedKey]);

        if (relationship.options.polymorphic) {
          this.serializePolymorphicType(snapshot, json, relationship);
        }
      }
    },

    /**
      Serializes `hasMany` relationships when it is configured as embedded objects.
       This example of a post model has many comments:
       ```js
      Post = DS.Model.extend({
        title:    DS.attr('string'),
        body:     DS.attr('string'),
        comments: DS.hasMany('comment')
      });
       Comment = DS.Model.extend({
        body:     DS.attr('string'),
        post:     DS.belongsTo('post')
      });
      ```
       Use a custom (type) serializer for the post model to configure embedded comments
       ```app/serializers/post.js
      import DS from 'ember-data;
       export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
          comments: { embedded: 'always' }
        }
      })
      ```
       A payload with an attribute configured for embedded records can serialize
      the records together under the root attribute's payload:
       ```js
      {
        "post": {
          "id": "1"
          "title": "Rails is omakase",
          "body": "I want this for my ORM, I want that for my template language..."
          "comments": [{
            "id": "1",
            "body": "Rails is unagi"
          }, {
            "id": "2",
            "body": "Omakase O_o"
          }]
        }
      }
      ```
       The attrs options object can use more specific instruction for extracting and
      serializing. When serializing, an option to embed `ids`, `ids-and-types` or `records` can be set.
      When extracting the only option is `records`.
       So `{ embedded: 'always' }` is shorthand for:
      `{ serialize: 'records', deserialize: 'records' }`
       To embed the `ids` for a related object (using a hasMany relationship):
       ```app/serializers/post.js
      import DS from 'ember-data;
       export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
          comments: { serialize: 'ids', deserialize: 'records' }
        }
      })
      ```
       ```js
      {
        "post": {
          "id": "1"
          "title": "Rails is omakase",
          "body": "I want this for my ORM, I want that for my template language..."
          "comments": ["1", "2"]
        }
      }
      ```
       To embed the relationship as a collection of objects with `id` and `type` keys, set
      `ids-and-types` for the related object.
       This is particularly useful for polymorphic relationships where records don't share
      the same table and the `id` is not enough information.
       By example having a user that has many pets:
       ```js
      User = DS.Model.extend({
        name:    DS.attr('string'),
        pets: DS.hasMany('pet', { polymorphic: true })
      });
       Pet = DS.Model.extend({
        name: DS.attr('string'),
      });
       Cat = Pet.extend({
        // ...
      });
       Parrot = Pet.extend({
        // ...
      });
      ```
       ```app/serializers/user.js
      import DS from 'ember-data;
       export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
        attrs: {
          pets: { serialize: 'ids-and-types', deserialize: 'records' }
        }
      });
      ```
       ```js
      {
        "user": {
          "id": "1"
          "name": "Bertin Osborne",
          "pets": [
            { "id": "1", "type": "Cat" },
            { "id": "1", "type": "Parrot"}
          ]
        }
      }
      ```
       Note that the `ids-and-types` strategy is still behind the `ds-serialize-ids-and-types` feature flag.
       @method serializeHasMany
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializeHasMany: function serializeHasMany(snapshot, json, relationship) {
      var attr = relationship.key;
      if (this.noSerializeOptionSpecified(attr)) {
        this._super(snapshot, json, relationship);
        return;
      }

      if (this.hasSerializeIdsOption(attr)) {
        var serializedKey = this.keyForRelationship(attr, relationship.kind, 'serialize');
        json[serializedKey] = snapshot.hasMany(attr, { ids: true });
      } else if (this.hasSerializeRecordsOption(attr)) {
        this._serializeEmbeddedHasMany(snapshot, json, relationship);
      } else {
        if (true) {
          if (this.hasSerializeIdsAndTypesOption(attr)) {
            this._serializeHasManyAsIdsAndTypes(snapshot, json, relationship);
          }
        }
      }
    },

    /**
      Serializes a hasMany relationship as an array of objects containing only `id` and `type`
      keys.
      This has its use case on polymorphic hasMany relationships where the server is not storing
      all records in the same table using STI, and therefore the `id` is not enough information
       TODO: Make the default in Ember-data 3.0??
    */
    _serializeHasManyAsIdsAndTypes: function _serializeHasManyAsIdsAndTypes(snapshot, json, relationship) {
      var serializedKey = this.keyForAttribute(relationship.key, 'serialize');
      var hasMany = snapshot.hasMany(relationship.key);

      json[serializedKey] = _ember['default'].A(hasMany).map(function (recordSnapshot) {
        //
        // I'm sure I'm being utterly naive here. Propably id is a configurate property and
        // type too, and the modelName has to be normalized somehow.
        //
        return { id: recordSnapshot.id, type: recordSnapshot.modelName };
      });
    },

    _serializeEmbeddedHasMany: function _serializeEmbeddedHasMany(snapshot, json, relationship) {
      var serializedKey = this._getMappedKey(relationship.key, snapshot.type);
      if (serializedKey === relationship.key && this.keyForRelationship) {
        serializedKey = this.keyForRelationship(relationship.key, relationship.kind, "serialize");
      }

      (0, _emberDataPrivateDebug.warn)('The embedded relationship \'' + serializedKey + '\' is undefined for \'' + snapshot.modelName + '\' with id \'' + snapshot.id + '\'. Please include it in your original payload.', _ember['default'].typeOf(snapshot.hasMany(relationship.key)) !== 'undefined', { id: 'ds.serializer.embedded-relationship-undefined' });

      json[serializedKey] = this._generateSerializedHasMany(snapshot, relationship);
    },

    /*
      Returns an array of embedded records serialized to JSON
    */
    _generateSerializedHasMany: function _generateSerializedHasMany(snapshot, relationship) {
      var hasMany = snapshot.hasMany(relationship.key);
      var manyArray = _ember['default'].A(hasMany);
      var ret = new Array(manyArray.length);

      for (var i = 0; i < manyArray.length; i++) {
        var embeddedSnapshot = manyArray[i];
        var embeddedJson = embeddedSnapshot.serialize({ includeId: true });
        this.removeEmbeddedForeignKey(snapshot, embeddedSnapshot, relationship, embeddedJson);
        ret[i] = embeddedJson;
      }

      return ret;
    },

    /**
      When serializing an embedded record, modify the property (in the json payload)
      that refers to the parent record (foreign key for relationship).
       Serializing a `belongsTo` relationship removes the property that refers to the
      parent record
       Serializing a `hasMany` relationship does not remove the property that refers to
      the parent record.
       @method removeEmbeddedForeignKey
      @param {DS.Snapshot} snapshot
      @param {DS.Snapshot} embeddedSnapshot
      @param {Object} relationship
      @param {Object} json
    */
    removeEmbeddedForeignKey: function removeEmbeddedForeignKey(snapshot, embeddedSnapshot, relationship, json) {
      if (relationship.kind === 'hasMany') {
        return;
      } else if (relationship.kind === 'belongsTo') {
        var parentRecord = snapshot.type.inverseFor(relationship.key, this.store);
        if (parentRecord) {
          var name = parentRecord.name;
          var embeddedSerializer = this.store.serializerFor(embeddedSnapshot.modelName);
          var parentKey = embeddedSerializer.keyForRelationship(name, parentRecord.kind, 'deserialize');
          if (parentKey) {
            delete json[parentKey];
          }
        }
      }
    },

    // checks config for attrs option to embedded (always) - serialize and deserialize
    hasEmbeddedAlwaysOption: function hasEmbeddedAlwaysOption(attr) {
      var option = this.attrsOption(attr);
      return option && option.embedded === 'always';
    },

    // checks config for attrs option to serialize ids
    hasSerializeRecordsOption: function hasSerializeRecordsOption(attr) {
      var alwaysEmbed = this.hasEmbeddedAlwaysOption(attr);
      var option = this.attrsOption(attr);
      return alwaysEmbed || option && option.serialize === 'records';
    },

    // checks config for attrs option to serialize records
    hasSerializeIdsOption: function hasSerializeIdsOption(attr) {
      var option = this.attrsOption(attr);
      return option && (option.serialize === 'ids' || option.serialize === 'id');
    },

    // checks config for attrs option to serialize records as objects containing id and types
    hasSerializeIdsAndTypesOption: function hasSerializeIdsAndTypesOption(attr) {
      var option = this.attrsOption(attr);
      return option && (option.serialize === 'ids-and-types' || option.serialize === 'id-and-type');
    },

    // checks config for attrs option to serialize records
    noSerializeOptionSpecified: function noSerializeOptionSpecified(attr) {
      var option = this.attrsOption(attr);
      return !(option && (option.serialize || option.embedded));
    },

    // checks config for attrs option to deserialize records
    // a defined option object for a resource is treated the same as
    // `deserialize: 'records'`
    hasDeserializeRecordsOption: function hasDeserializeRecordsOption(attr) {
      var alwaysEmbed = this.hasEmbeddedAlwaysOption(attr);
      var option = this.attrsOption(attr);
      return alwaysEmbed || option && option.deserialize === 'records';
    },

    attrsOption: function attrsOption(attr) {
      var attrs = this.get('attrs');
      return attrs && (attrs[camelize(attr)] || attrs[attr]);
    },

    /**
     @method _extractEmbeddedRecords
     @private
    */
    _extractEmbeddedRecords: function _extractEmbeddedRecords(serializer, store, typeClass, partial) {
      var _this = this;

      typeClass.eachRelationship(function (key, relationship) {
        if (serializer.hasDeserializeRecordsOption(key)) {
          if (relationship.kind === "hasMany") {
            _this._extractEmbeddedHasMany(store, key, partial, relationship);
          }
          if (relationship.kind === "belongsTo") {
            _this._extractEmbeddedBelongsTo(store, key, partial, relationship);
          }
        }
      });
      return partial;
    },

    /**
     @method _extractEmbeddedHasMany
     @private
    */
    _extractEmbeddedHasMany: function _extractEmbeddedHasMany(store, key, hash, relationshipMeta) {
      var relationshipHash = get(hash, 'data.relationships.' + key + '.data');

      if (!relationshipHash) {
        return;
      }

      var hasMany = new Array(relationshipHash.length);

      for (var i = 0; i < relationshipHash.length; i++) {
        var item = relationshipHash[i];

        var _normalizeEmbeddedRelationship2 = this._normalizeEmbeddedRelationship(store, relationshipMeta, item);

        var data = _normalizeEmbeddedRelationship2.data;
        var included = _normalizeEmbeddedRelationship2.included;

        hash.included = hash.included || [];
        hash.included.push(data);
        if (included) {
          var _hash$included;

          (_hash$included = hash.included).push.apply(_hash$included, _toConsumableArray(included));
        }

        hasMany[i] = { id: data.id, type: data.type };
      }

      var relationship = { data: hasMany };
      set(hash, 'data.relationships.' + key, relationship);
    },

    /**
     @method _extractEmbeddedBelongsTo
     @private
    */
    _extractEmbeddedBelongsTo: function _extractEmbeddedBelongsTo(store, key, hash, relationshipMeta) {
      var relationshipHash = get(hash, 'data.relationships.' + key + '.data');
      if (!relationshipHash) {
        return;
      }

      var _normalizeEmbeddedRelationship3 = this._normalizeEmbeddedRelationship(store, relationshipMeta, relationshipHash);

      var data = _normalizeEmbeddedRelationship3.data;
      var included = _normalizeEmbeddedRelationship3.included;

      hash.included = hash.included || [];
      hash.included.push(data);
      if (included) {
        var _hash$included2;

        (_hash$included2 = hash.included).push.apply(_hash$included2, _toConsumableArray(included));
      }

      var belongsTo = { id: data.id, type: data.type };
      var relationship = { data: belongsTo };

      set(hash, 'data.relationships.' + key, relationship);
    },

    /**
     @method _normalizeEmbeddedRelationship
     @private
    */
    _normalizeEmbeddedRelationship: function _normalizeEmbeddedRelationship(store, relationshipMeta, relationshipHash) {
      var modelName = relationshipMeta.type;
      if (relationshipMeta.options.polymorphic) {
        modelName = relationshipHash.type;
      }
      var modelClass = store.modelFor(modelName);
      var serializer = store.serializerFor(modelName);

      return serializer.normalize(modelClass, relationshipHash, null);
    },
    isEmbeddedRecordsMixin: true
  });
});
define('ember-data/serializers/json-api', ['exports', 'ember', 'ember-data/-private/debug', 'ember-data/serializers/json', 'ember-data/-private/system/normalize-model-name', 'ember-inflector', 'ember-data/-private/features'], function (exports, _ember, _emberDataPrivateDebug, _emberDataSerializersJson, _emberDataPrivateSystemNormalizeModelName, _emberInflector, _emberDataPrivateFeatures) {
  /**
    @module ember-data
  */

  'use strict';

  var dasherize = _ember['default'].String.dasherize;

  /**
    Ember Data 2.0 Serializer:
  
    In Ember Data a Serializer is used to serialize and deserialize
    records when they are transferred in and out of an external source.
    This process involves normalizing property names, transforming
    attribute values and serializing relationships.
  
    `JSONAPISerializer` supports the http://jsonapi.org/ spec and is the
    serializer recommended by Ember Data.
  
    This serializer normalizes a JSON API payload that looks like:
  
    ```js
  
      // models/player.js
      import DS from "ember-data";
  
      export default DS.Model.extend({
        name: DS.attr(),
        skill: DS.attr(),
        gamesPlayed: DS.attr(),
        club: DS.belongsTo('club')
      });
  
      // models/club.js
      import DS from "ember-data";
  
      export default DS.Model.extend({
        name: DS.attr(),
        location: DS.attr(),
        players: DS.hasMany('player')
      });
    ```
  
    ```js
  
      {
        "data": [
          {
            "attributes": {
              "name": "Benfica",
              "location": "Portugal"
            },
            "id": "1",
            "relationships": {
              "players": {
                "data": [
                  {
                    "id": "3",
                    "type": "players"
                  }
                ]
              }
            },
            "type": "clubs"
          }
        ],
        "included": [
          {
            "attributes": {
              "name": "Eusebio Silva Ferreira",
              "skill": "Rocket shot",
              "games-played": 431
            },
            "id": "3",
            "relationships": {
              "club": {
                "data": {
                  "id": "1",
                  "type": "clubs"
                }
              }
            },
            "type": "players"
          }
        ]
      }
    ```
  
    to the format that the Ember Data store expects.
  
    @class JSONAPISerializer
    @namespace DS
    @extends DS.JSONSerializer
  */
  var JSONAPISerializer = _emberDataSerializersJson['default'].extend({

    /**
      @method _normalizeDocumentHelper
      @param {Object} documentHash
      @return {Object}
      @private
    */
    _normalizeDocumentHelper: function _normalizeDocumentHelper(documentHash) {

      if (_ember['default'].typeOf(documentHash.data) === 'object') {
        documentHash.data = this._normalizeResourceHelper(documentHash.data);
      } else if (Array.isArray(documentHash.data)) {
        var ret = new Array(documentHash.data.length);

        for (var i = 0; i < documentHash.data.length; i++) {
          var data = documentHash.data[i];
          ret[i] = this._normalizeResourceHelper(data);
        }

        documentHash.data = ret;
      }

      if (Array.isArray(documentHash.included)) {
        var ret = new Array(documentHash.included.length);

        for (var i = 0; i < documentHash.included.length; i++) {
          var included = documentHash.included[i];
          ret[i] = this._normalizeResourceHelper(included);
        }

        documentHash.included = ret;
      }

      return documentHash;
    },

    /**
      @method _normalizeRelationshipDataHelper
      @param {Object} relationshipDataHash
      @return {Object}
      @private
    */
    _normalizeRelationshipDataHelper: function _normalizeRelationshipDataHelper(relationshipDataHash) {
      var type = this.modelNameFromPayloadKey(relationshipDataHash.type);
      relationshipDataHash.type = type;
      return relationshipDataHash;
    },

    /**
      @method _normalizeResourceHelper
      @param {Object} resourceHash
      @return {Object}
      @private
    */
    _normalizeResourceHelper: function _normalizeResourceHelper(resourceHash) {
      (0, _emberDataPrivateDebug.assert)(this.warnMessageForUndefinedType(), !_ember['default'].isNone(resourceHash.type), {
        id: 'ds.serializer.type-is-undefined'
      });

      var modelName = this.modelNameFromPayloadKey(resourceHash.type);

      if (!this.store._hasModelFor(modelName)) {
        (0, _emberDataPrivateDebug.warn)(this.warnMessageNoModelForType(modelName, resourceHash.type), false, {
          id: 'ds.serializer.model-for-type-missing'
        });
        return null;
      }

      var modelClass = this.store.modelFor(modelName);
      var serializer = this.store.serializerFor(modelName);

      var _serializer$normalize = serializer.normalize(modelClass, resourceHash);

      var data = _serializer$normalize.data;

      return data;
    },

    /**
      @method pushPayload
      @param {DS.Store} store
      @param {Object} payload
    */
    pushPayload: function pushPayload(store, payload) {
      var normalizedPayload = this._normalizeDocumentHelper(payload);
      if (false) {
        return store.push(normalizedPayload);
      } else {
        store.push(normalizedPayload);
      }
    },

    /**
      @method _normalizeResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @param {Boolean} isSingle
      @return {Object} JSON-API Document
      @private
    */
    _normalizeResponse: function _normalizeResponse(store, primaryModelClass, payload, id, requestType, isSingle) {
      var normalizedPayload = this._normalizeDocumentHelper(payload);
      return normalizedPayload;
    },

    normalizeQueryRecordResponse: function normalizeQueryRecordResponse() {
      var normalized = this._super.apply(this, arguments);

      (0, _emberDataPrivateDebug.assert)('Expected the primary data returned by the serializer for a `queryRecord` response to be a single object but instead it was an array.', !Array.isArray(normalized.data), {
        id: 'ds.serializer.json-api.queryRecord-array-response'
      });

      return normalized;
    },

    /**
      @method extractAttributes
      @param {DS.Model} modelClass
      @param {Object} resourceHash
      @return {Object}
    */
    extractAttributes: function extractAttributes(modelClass, resourceHash) {
      var _this = this;

      var attributes = {};

      if (resourceHash.attributes) {
        modelClass.eachAttribute(function (key) {
          var attributeKey = _this.keyForAttribute(key, 'deserialize');
          if (resourceHash.attributes.hasOwnProperty(attributeKey)) {
            attributes[key] = resourceHash.attributes[attributeKey];
          }
        });
      }

      return attributes;
    },

    /**
      @method extractRelationship
      @param {Object} relationshipHash
      @return {Object}
    */
    extractRelationship: function extractRelationship(relationshipHash) {

      if (_ember['default'].typeOf(relationshipHash.data) === 'object') {
        relationshipHash.data = this._normalizeRelationshipDataHelper(relationshipHash.data);
      }

      if (Array.isArray(relationshipHash.data)) {
        var ret = new Array(relationshipHash.data.length);

        for (var i = 0; i < relationshipHash.data.length; i++) {
          var data = relationshipHash.data[i];
          ret[i] = this._normalizeRelationshipDataHelper(data);
        }

        relationshipHash.data = ret;
      }

      return relationshipHash;
    },

    /**
      @method extractRelationships
      @param {Object} modelClass
      @param {Object} resourceHash
      @return {Object}
    */
    extractRelationships: function extractRelationships(modelClass, resourceHash) {
      var _this2 = this;

      var relationships = {};

      if (resourceHash.relationships) {
        modelClass.eachRelationship(function (key, relationshipMeta) {
          var relationshipKey = _this2.keyForRelationship(key, relationshipMeta.kind, 'deserialize');
          if (resourceHash.relationships.hasOwnProperty(relationshipKey)) {

            var relationshipHash = resourceHash.relationships[relationshipKey];
            relationships[key] = _this2.extractRelationship(relationshipHash);
          }
        });
      }

      return relationships;
    },

    /**
      @method _extractType
      @param {DS.Model} modelClass
      @param {Object} resourceHash
      @return {String}
      @private
    */
    _extractType: function _extractType(modelClass, resourceHash) {
      return this.modelNameFromPayloadKey(resourceHash.type);
    },

    /**
      @method modelNameFromPayloadKey
      @param {String} key
      @return {String} the model's modelName
    */
    modelNameFromPayloadKey: function modelNameFromPayloadKey(key) {
      return (0, _emberInflector.singularize)((0, _emberDataPrivateSystemNormalizeModelName['default'])(key));
    },

    /**
      @method payloadKeyFromModelName
      @param {String} modelName
      @return {String}
    */
    payloadKeyFromModelName: function payloadKeyFromModelName(modelName) {
      return (0, _emberInflector.pluralize)(modelName);
    },

    /**
      @method normalize
      @param {DS.Model} modelClass
      @param {Object} resourceHash the resource hash from the adapter
      @return {Object} the normalized resource hash
    */
    normalize: function normalize(modelClass, resourceHash) {
      if (resourceHash.attributes) {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash.attributes);
      }

      if (resourceHash.relationships) {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash.relationships);
      }

      var data = {
        id: this.extractId(modelClass, resourceHash),
        type: this._extractType(modelClass, resourceHash),
        attributes: this.extractAttributes(modelClass, resourceHash),
        relationships: this.extractRelationships(modelClass, resourceHash)
      };

      this.applyTransforms(modelClass, data.attributes);

      return { data: data };
    },

    /**
     `keyForAttribute` can be used to define rules for how to convert an
     attribute name in your model to a key in your JSON.
     By default `JSONAPISerializer` follows the format used on the examples of
     http://jsonapi.org/format and uses dashes as the word separator in the JSON
     attribute keys.
      This behaviour can be easily customized by extending this method.
      Example
      ```app/serializers/application.js
     import DS from 'ember-data';
      export default DS.JSONAPISerializer.extend({
       keyForAttribute: function(attr, method) {
         return Ember.String.dasherize(attr).toUpperCase();
       }
     });
     ```
      @method keyForAttribute
     @param {String} key
     @param {String} method
     @return {String} normalized key
    */
    keyForAttribute: function keyForAttribute(key, method) {
      return dasherize(key);
    },

    /**
     `keyForRelationship` can be used to define a custom key when
     serializing and deserializing relationship properties.
     By default `JSONAPISerializer` follows the format used on the examples of
     http://jsonapi.org/format and uses dashes as word separators in
     relationship properties.
      This behaviour can be easily customized by extending this method.
      Example
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONAPISerializer.extend({
        keyForRelationship: function(key, relationship, method) {
          return Ember.String.underscore(key);
        }
      });
      ```
     @method keyForRelationship
     @param {String} key
     @param {String} typeClass
     @param {String} method
     @return {String} normalized key
    */
    keyForRelationship: function keyForRelationship(key, typeClass, method) {
      return dasherize(key);
    },

    /**
      @method serialize
      @param {DS.Snapshot} snapshot
      @param {Object} options
      @return {Object} json
    */
    serialize: function serialize(snapshot, options) {
      var data = this._super.apply(this, arguments);
      data.type = this.payloadKeyFromModelName(snapshot.modelName);
      return { data: data };
    },

    /**
     @method serializeAttribute
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {String} key
     @param {Object} attribute
    */
    serializeAttribute: function serializeAttribute(snapshot, json, key, attribute) {
      var type = attribute.type;

      if (this._canSerialize(key)) {
        json.attributes = json.attributes || {};

        var value = snapshot.attr(key);
        if (type) {
          var transform = this.transformFor(type);
          value = transform.serialize(value, attribute.options);
        }

        var payloadKey = this._getMappedKey(key, snapshot.type);

        if (payloadKey === key) {
          payloadKey = this.keyForAttribute(key, 'serialize');
        }

        json.attributes[payloadKey] = value;
      }
    },

    /**
     @method serializeBelongsTo
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {Object} relationship
    */
    serializeBelongsTo: function serializeBelongsTo(snapshot, json, relationship) {
      var key = relationship.key;

      if (this._canSerialize(key)) {
        var belongsTo = snapshot.belongsTo(key);
        if (belongsTo !== undefined) {

          json.relationships = json.relationships || {};

          var payloadKey = this._getMappedKey(key, snapshot.type);
          if (payloadKey === key) {
            payloadKey = this.keyForRelationship(key, 'belongsTo', 'serialize');
          }

          var data = null;
          if (belongsTo) {
            data = {
              type: this.payloadKeyFromModelName(belongsTo.modelName),
              id: belongsTo.id
            };
          }

          json.relationships[payloadKey] = { data: data };
        }
      }
    },

    /**
     @method serializeHasMany
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {Object} relationship
    */
    serializeHasMany: function serializeHasMany(snapshot, json, relationship) {
      var key = relationship.key;

      if (this._shouldSerializeHasMany(snapshot, key, relationship)) {
        var hasMany = snapshot.hasMany(key);
        if (hasMany !== undefined) {

          json.relationships = json.relationships || {};

          var payloadKey = this._getMappedKey(key, snapshot.type);
          if (payloadKey === key && this.keyForRelationship) {
            payloadKey = this.keyForRelationship(key, 'hasMany', 'serialize');
          }

          var data = new Array(hasMany.length);

          for (var i = 0; i < hasMany.length; i++) {
            var item = hasMany[i];
            data[i] = {
              type: this.payloadKeyFromModelName(item.modelName),
              id: item.id
            };
          }

          json.relationships[payloadKey] = { data: data };
        }
      }
    }
  });

  (0, _emberDataPrivateDebug.runInDebug)(function () {
    JSONAPISerializer.reopen({
      willMergeMixin: function willMergeMixin(props) {
        (0, _emberDataPrivateDebug.warn)('The JSONAPISerializer does not work with the EmbeddedRecordsMixin because the JSON API spec does not describe how to format embedded resources.', !props.isEmbeddedRecordsMixin, {
          id: 'ds.serializer.embedded-records-mixin-not-supported'
        });
      },
      warnMessageForUndefinedType: function warnMessageForUndefinedType() {
        return 'Encountered a resource object with an undefined type (resolved resource using ' + this.constructor.toString() + ')';
      },
      warnMessageNoModelForType: function warnMessageNoModelForType(modelName, originalType) {
        return 'Encountered a resource object with type "' + originalType + '", but no model was found for model name "' + modelName + '" (resolved model name using ' + this.constructor.toString() + '.modelNameFromPayloadKey("' + originalType + '"))';
      }
    });
  });

  exports['default'] = JSONAPISerializer;
});
define('ember-data/serializers/json', ['exports', 'ember', 'ember-data/-private/debug', 'ember-data/serializer', 'ember-data/-private/system/coerce-id', 'ember-data/-private/system/normalize-model-name', 'ember-data/-private/utils', 'ember-data/adapters/errors', 'ember-data/-private/features'], function (exports, _ember, _emberDataPrivateDebug, _emberDataSerializer, _emberDataPrivateSystemCoerceId, _emberDataPrivateSystemNormalizeModelName, _emberDataPrivateUtils, _emberDataAdaptersErrors, _emberDataPrivateFeatures) {
  'use strict';

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var get = _ember['default'].get;
  var isNone = _ember['default'].isNone;
  var assign = _ember['default'].assign || _ember['default'].merge;

  /**
    Ember Data 2.0 Serializer:
  
    In Ember Data a Serializer is used to serialize and deserialize
    records when they are transferred in and out of an external source.
    This process involves normalizing property names, transforming
    attribute values and serializing relationships.
  
    By default, Ember Data uses and recommends the `JSONAPISerializer`.
  
    `JSONSerializer` is useful for simpler or legacy backends that may
    not support the http://jsonapi.org/ spec.
  
    For example, given the following `User` model and JSON payload:
  
    ```app/models/user.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      friends: DS.hasMany('user'),
      house: DS.belongsTo('location'),
  
      name: DS.attr('string')
    });
    ```
  
    ```js
    {
      id: 1,
      name: 'Sebastian',
      friends: [3, 4],
      links: {
        house: '/houses/lefkada'
      }
    }
    ```
  
    `JSONSerializer` will normalize the JSON payload to the JSON API format that the
    Ember Data store expects.
  
    You can customize how JSONSerializer processes its payload by passing options in
    the `attrs` hash or by subclassing the `JSONSerializer` and overriding hooks:
  
      - To customize how a single record is normalized, use the `normalize` hook.
      - To customize how `JSONSerializer` normalizes the whole server response, use the
        `normalizeResponse` hook.
      - To customize how `JSONSerializer` normalizes a specific response from the server,
        use one of the many specific `normalizeResponse` hooks.
      - To customize how `JSONSerializer` normalizes your id, attributes or relationships,
        use the `extractId`, `extractAttributes` and `extractRelationships` hooks.
  
    The `JSONSerializer` normalization process follows these steps:
  
      - `normalizeResponse` - entry method to the serializer.
      - `normalizeCreateRecordResponse` - a `normalizeResponse` for a specific operation is called.
      - `normalizeSingleResponse`|`normalizeArrayResponse` - for methods like `createRecord` we expect
        a single record back, while for methods like `findAll` we expect multiple methods back.
      - `normalize` - `normalizeArray` iterates and calls `normalize` for each of its records while `normalizeSingle`
        calls it once. This is the method you most likely want to subclass.
      - `extractId` | `extractAttributes` | `extractRelationships` - `normalize` delegates to these methods to
        turn the record payload into the JSON API format.
  
    @class JSONSerializer
    @namespace DS
    @extends DS.Serializer
  */
  exports['default'] = _emberDataSerializer['default'].extend({

    /**
      The `primaryKey` is used when serializing and deserializing
      data. Ember Data always uses the `id` property to store the id of
      the record. The external source may not always follow this
      convention. In these cases it is useful to override the
      `primaryKey` property to match the `primaryKey` of your external
      store.
       Example
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        primaryKey: '_id'
      });
      ```
       @property primaryKey
      @type {String}
      @default 'id'
    */
    primaryKey: 'id',

    /**
      The `attrs` object can be used to declare a simple mapping between
      property names on `DS.Model` records and payload keys in the
      serialized JSON object representing the record. An object with the
      property `key` can also be used to designate the attribute's key on
      the response payload.
       Example
       ```app/models/person.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        firstName: DS.attr('string'),
        lastName: DS.attr('string'),
        occupation: DS.attr('string'),
        admin: DS.attr('boolean')
      });
      ```
       ```app/serializers/person.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        attrs: {
          admin: 'is_admin',
          occupation: { key: 'career' }
        }
      });
      ```
       You can also remove attributes by setting the `serialize` key to
      `false` in your mapping object.
       Example
       ```app/serializers/person.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        attrs: {
          admin: { serialize: false },
          occupation: { key: 'career' }
        }
      });
      ```
       When serialized:
       ```javascript
      {
        "firstName": "Harry",
        "lastName": "Houdini",
        "career": "magician"
      }
      ```
       Note that the `admin` is now not included in the payload.
       @property attrs
      @type {Object}
    */
    mergedProperties: ['attrs'],

    /**
     Given a subclass of `DS.Model` and a JSON object this method will
     iterate through each attribute of the `DS.Model` and invoke the
     `DS.Transform#deserialize` method on the matching property of the
     JSON object.  This method is typically called after the
     serializer's `normalize` method.
      @method applyTransforms
     @private
     @param {DS.Model} typeClass
     @param {Object} data The data to transform
     @return {Object} data The transformed data object
    */
    applyTransforms: function applyTransforms(typeClass, data) {
      var _this = this;

      var attributes = undefined;
      if (true) {
        attributes = get(typeClass, 'attributes');
      }

      typeClass.eachTransformedAttribute(function (key, typeClass) {
        if (!(key in data)) {
          return;
        }

        var transform = _this.transformFor(typeClass);
        if (true) {
          var transformMeta = attributes.get(key);
          data[key] = transform.deserialize(data[key], transformMeta.options);
        } else {
          data[key] = transform.deserialize(data[key]);
        }
      });

      return data;
    },

    /**
      The `normalizeResponse` method is used to normalize a payload from the
      server to a JSON-API Document.
       http://jsonapi.org/format/#document-structure
       This method delegates to a more specific normalize method based on
      the `requestType`.
       To override this method with a custom one, make sure to call
      `return this._super(store, primaryModelClass, payload, id, requestType)` with your
      pre-processed data.
       Here's an example of using `normalizeResponse` manually:
       ```javascript
      socket.on('message', function(message) {
        var data = message.data;
        var modelClass = store.modelFor(data.modelName);
        var serializer = store.serializerFor(data.modelName);
        var normalized = serializer.normalizeSingleResponse(store, modelClass, data, data.id);
         store.push(normalized);
      });
      ```
       @method normalizeResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeResponse: function normalizeResponse(store, primaryModelClass, payload, id, requestType) {
      switch (requestType) {
        case 'findRecord':
          return this.normalizeFindRecordResponse.apply(this, arguments);
        case 'queryRecord':
          return this.normalizeQueryRecordResponse.apply(this, arguments);
        case 'findAll':
          return this.normalizeFindAllResponse.apply(this, arguments);
        case 'findBelongsTo':
          return this.normalizeFindBelongsToResponse.apply(this, arguments);
        case 'findHasMany':
          return this.normalizeFindHasManyResponse.apply(this, arguments);
        case 'findMany':
          return this.normalizeFindManyResponse.apply(this, arguments);
        case 'query':
          return this.normalizeQueryResponse.apply(this, arguments);
        case 'createRecord':
          return this.normalizeCreateRecordResponse.apply(this, arguments);
        case 'deleteRecord':
          return this.normalizeDeleteRecordResponse.apply(this, arguments);
        case 'updateRecord':
          return this.normalizeUpdateRecordResponse.apply(this, arguments);
      }
    },

    /**
      @method normalizeFindRecordResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeFindRecordResponse: function normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSingleResponse.apply(this, arguments);
    },

    /**
      @method normalizeQueryRecordResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeQueryRecordResponse: function normalizeQueryRecordResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSingleResponse.apply(this, arguments);
    },

    /**
      @method normalizeFindAllResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeFindAllResponse: function normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeArrayResponse.apply(this, arguments);
    },

    /**
      @method normalizeFindBelongsToResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeFindBelongsToResponse: function normalizeFindBelongsToResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSingleResponse.apply(this, arguments);
    },

    /**
      @method normalizeFindHasManyResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeFindHasManyResponse: function normalizeFindHasManyResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeArrayResponse.apply(this, arguments);
    },

    /**
      @method normalizeFindManyResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeFindManyResponse: function normalizeFindManyResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeArrayResponse.apply(this, arguments);
    },

    /**
      @method normalizeQueryResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeQueryResponse: function normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeArrayResponse.apply(this, arguments);
    },

    /**
      @method normalizeCreateRecordResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeCreateRecordResponse: function normalizeCreateRecordResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSaveResponse.apply(this, arguments);
    },

    /**
      @method normalizeDeleteRecordResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeDeleteRecordResponse: function normalizeDeleteRecordResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSaveResponse.apply(this, arguments);
    },

    /**
      @method normalizeUpdateRecordResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeUpdateRecordResponse: function normalizeUpdateRecordResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSaveResponse.apply(this, arguments);
    },

    /**
      @method normalizeSaveResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeSaveResponse: function normalizeSaveResponse(store, primaryModelClass, payload, id, requestType) {
      return this.normalizeSingleResponse.apply(this, arguments);
    },

    /**
      @method normalizeSingleResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeSingleResponse: function normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
      return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, true);
    },

    /**
      @method normalizeArrayResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @return {Object} JSON-API Document
    */
    normalizeArrayResponse: function normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
      return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, false);
    },

    /**
      @method _normalizeResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @param {Boolean} isSingle
      @return {Object} JSON-API Document
      @private
    */
    _normalizeResponse: function _normalizeResponse(store, primaryModelClass, payload, id, requestType, isSingle) {
      var documentHash = {
        data: null,
        included: []
      };

      var meta = this.extractMeta(store, primaryModelClass, payload);
      if (meta) {
        (0, _emberDataPrivateDebug.assert)('The `meta` returned from `extractMeta` has to be an object, not "' + _ember['default'].typeOf(meta) + '".', _ember['default'].typeOf(meta) === 'object');
        documentHash.meta = meta;
      }

      if (isSingle) {
        var _normalize = this.normalize(primaryModelClass, payload);

        var data = _normalize.data;
        var included = _normalize.included;

        documentHash.data = data;
        if (included) {
          documentHash.included = included;
        }
      } else {
        var ret = new Array(payload.length);
        for (var i = 0, l = payload.length; i < l; i++) {
          var item = payload[i];

          var _normalize2 = this.normalize(primaryModelClass, item);

          var data = _normalize2.data;
          var included = _normalize2.included;

          if (included) {
            var _documentHash$included;

            (_documentHash$included = documentHash.included).push.apply(_documentHash$included, _toConsumableArray(included));
          }
          ret[i] = data;
        }

        documentHash.data = ret;
      }

      return documentHash;
    },

    /**
      Normalizes a part of the JSON payload returned by
      the server. You should override this method, munge the hash
      and call super if you have generic normalization to do.
       It takes the type of the record that is being normalized
      (as a DS.Model class), the property where the hash was
      originally found, and the hash to normalize.
       You can use this method, for example, to normalize underscored keys to camelized
      or other general-purpose normalizations.
       Example
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        normalize: function(typeClass, hash) {
          var fields = Ember.get(typeClass, 'fields');
          fields.forEach(function(field) {
            var payloadField = Ember.String.underscore(field);
            if (field === payloadField) { return; }
             hash[field] = hash[payloadField];
            delete hash[payloadField];
          });
          return this._super.apply(this, arguments);
        }
      });
      ```
       @method normalize
      @param {DS.Model} typeClass
      @param {Object} hash
      @return {Object}
    */
    normalize: function normalize(modelClass, resourceHash) {
      var data = null;

      if (resourceHash) {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash);
        if (_ember['default'].typeOf(resourceHash.links) === 'object') {
          this.normalizeUsingDeclaredMapping(modelClass, resourceHash.links);
        }

        data = {
          id: this.extractId(modelClass, resourceHash),
          type: modelClass.modelName,
          attributes: this.extractAttributes(modelClass, resourceHash),
          relationships: this.extractRelationships(modelClass, resourceHash)
        };

        this.applyTransforms(modelClass, data.attributes);
      }

      return { data: data };
    },

    /**
      Returns the resource's ID.
       @method extractId
      @param {Object} modelClass
      @param {Object} resourceHash
      @return {String}
    */
    extractId: function extractId(modelClass, resourceHash) {
      var primaryKey = get(this, 'primaryKey');
      var id = resourceHash[primaryKey];
      return (0, _emberDataPrivateSystemCoerceId['default'])(id);
    },

    /**
      Returns the resource's attributes formatted as a JSON-API "attributes object".
       http://jsonapi.org/format/#document-resource-object-attributes
       @method extractAttributes
      @param {Object} modelClass
      @param {Object} resourceHash
      @return {Object}
    */
    extractAttributes: function extractAttributes(modelClass, resourceHash) {
      var _this2 = this;

      var attributeKey;
      var attributes = {};

      modelClass.eachAttribute(function (key) {
        attributeKey = _this2.keyForAttribute(key, 'deserialize');
        if (resourceHash.hasOwnProperty(attributeKey)) {
          attributes[key] = resourceHash[attributeKey];
        }
      });

      return attributes;
    },

    /**
      Returns a relationship formatted as a JSON-API "relationship object".
       http://jsonapi.org/format/#document-resource-object-relationships
       @method extractRelationship
      @param {Object} relationshipModelName
      @param {Object} relationshipHash
      @return {Object}
    */
    extractRelationship: function extractRelationship(relationshipModelName, relationshipHash) {
      if (_ember['default'].isNone(relationshipHash)) {
        return null;
      }
      /*
        When `relationshipHash` is an object it usually means that the relationship
        is polymorphic. It could however also be embedded resources that the
        EmbeddedRecordsMixin has be able to process.
      */
      if (_ember['default'].typeOf(relationshipHash) === 'object') {
        if (relationshipHash.id) {
          relationshipHash.id = (0, _emberDataPrivateSystemCoerceId['default'])(relationshipHash.id);
        }

        var modelClass = this.store.modelFor(relationshipModelName);
        if (relationshipHash.type && !(0, _emberDataPrivateUtils.modelHasAttributeOrRelationshipNamedType)(modelClass)) {
          relationshipHash.type = this.modelNameFromPayloadKey(relationshipHash.type);
        }
        return relationshipHash;
      }
      return { id: (0, _emberDataPrivateSystemCoerceId['default'])(relationshipHash), type: relationshipModelName };
    },

    /**
      Returns a polymorphic relationship formatted as a JSON-API "relationship object".
       http://jsonapi.org/format/#document-resource-object-relationships
       `relationshipOptions` is a hash which contains more information about the
      polymorphic relationship which should be extracted:
        - `resourceHash` complete hash of the resource the relationship should be
          extracted from
        - `relationshipKey` key under which the value for the relationship is
          extracted from the resourceHash
        - `relationshipMeta` meta information about the relationship
       @method extractPolymorphicRelationship
      @param {Object} relationshipModelName
      @param {Object} relationshipHash
      @param {Object} relationshipOptions
      @return {Object}
    */
    extractPolymorphicRelationship: function extractPolymorphicRelationship(relationshipModelName, relationshipHash, relationshipOptions) {
      return this.extractRelationship(relationshipModelName, relationshipHash);
    },

    /**
      Returns the resource's relationships formatted as a JSON-API "relationships object".
       http://jsonapi.org/format/#document-resource-object-relationships
       @method extractRelationships
      @param {Object} modelClass
      @param {Object} resourceHash
      @return {Object}
    */
    extractRelationships: function extractRelationships(modelClass, resourceHash) {
      var _this3 = this;

      var relationships = {};

      modelClass.eachRelationship(function (key, relationshipMeta) {
        var relationship = null;
        var relationshipKey = _this3.keyForRelationship(key, relationshipMeta.kind, 'deserialize');
        if (resourceHash.hasOwnProperty(relationshipKey)) {
          var data = null;
          var relationshipHash = resourceHash[relationshipKey];
          if (relationshipMeta.kind === 'belongsTo') {
            if (relationshipMeta.options.polymorphic) {
              // extracting a polymorphic belongsTo may need more information
              // than the type and the hash (which might only be an id) for the
              // relationship, hence we pass the key, resource and
              // relationshipMeta too
              data = _this3.extractPolymorphicRelationship(relationshipMeta.type, relationshipHash, { key: key, resourceHash: resourceHash, relationshipMeta: relationshipMeta });
            } else {
              data = _this3.extractRelationship(relationshipMeta.type, relationshipHash);
            }
          } else if (relationshipMeta.kind === 'hasMany') {
            if (!_ember['default'].isNone(relationshipHash)) {
              data = new Array(relationshipHash.length);
              for (var i = 0, l = relationshipHash.length; i < l; i++) {
                var item = relationshipHash[i];
                data[i] = _this3.extractRelationship(relationshipMeta.type, item);
              }
            }
          }
          relationship = { data: data };
        }

        var linkKey = _this3.keyForLink(key, relationshipMeta.kind);
        if (resourceHash.links && resourceHash.links.hasOwnProperty(linkKey)) {
          var related = resourceHash.links[linkKey];
          relationship = relationship || {};
          relationship.links = { related: related };
        }

        if (relationship) {
          relationships[key] = relationship;
        }
      });

      return relationships;
    },

    /**
      @method modelNameFromPayloadKey
      @param {String} key
      @return {String} the model's modelName
    */
    modelNameFromPayloadKey: function modelNameFromPayloadKey(key) {
      return (0, _emberDataPrivateSystemNormalizeModelName['default'])(key);
    },

    /**
      @method normalizeAttributes
      @private
    */
    normalizeAttributes: function normalizeAttributes(typeClass, hash) {
      var _this4 = this;

      var payloadKey;

      if (this.keyForAttribute) {
        typeClass.eachAttribute(function (key) {
          payloadKey = _this4.keyForAttribute(key, 'deserialize');
          if (key === payloadKey) {
            return;
          }
          if (!hash.hasOwnProperty(payloadKey)) {
            return;
          }

          hash[key] = hash[payloadKey];
          delete hash[payloadKey];
        });
      }
    },

    /**
      @method normalizeRelationships
      @private
    */
    normalizeRelationships: function normalizeRelationships(typeClass, hash) {
      var _this5 = this;

      var payloadKey;

      if (this.keyForRelationship) {
        typeClass.eachRelationship(function (key, relationship) {
          payloadKey = _this5.keyForRelationship(key, relationship.kind, 'deserialize');
          if (key === payloadKey) {
            return;
          }
          if (!hash.hasOwnProperty(payloadKey)) {
            return;
          }

          hash[key] = hash[payloadKey];
          delete hash[payloadKey];
        });
      }
    },

    /**
      @method normalizeUsingDeclaredMapping
      @private
    */
    normalizeUsingDeclaredMapping: function normalizeUsingDeclaredMapping(modelClass, hash) {
      var attrs = get(this, 'attrs');
      var normalizedKey, payloadKey, key;

      if (attrs) {
        for (key in attrs) {
          normalizedKey = payloadKey = this._getMappedKey(key, modelClass);

          if (!hash.hasOwnProperty(payloadKey)) {
            continue;
          }

          if (get(modelClass, 'attributes').has(key)) {
            normalizedKey = this.keyForAttribute(key);
          }

          if (get(modelClass, 'relationshipsByName').has(key)) {
            normalizedKey = this.keyForRelationship(key);
          }

          if (payloadKey !== normalizedKey) {
            hash[normalizedKey] = hash[payloadKey];
            delete hash[payloadKey];
          }
        }
      }
    },

    /**
      Looks up the property key that was set by the custom `attr` mapping
      passed to the serializer.
       @method _getMappedKey
      @private
      @param {String} key
      @return {String} key
    */
    _getMappedKey: function _getMappedKey(key, modelClass) {
      (0, _emberDataPrivateDebug.warn)('There is no attribute or relationship with the name `' + key + '` on `' + modelClass.modelName + '`. Check your serializers attrs hash.', get(modelClass, 'attributes').has(key) || get(modelClass, 'relationshipsByName').has(key), {
        id: 'ds.serializer.no-mapped-attrs-key'
      });

      var attrs = get(this, 'attrs');
      var mappedKey;
      if (attrs && attrs[key]) {
        mappedKey = attrs[key];
        //We need to account for both the { title: 'post_title' } and
        //{ title: { key: 'post_title' }} forms
        if (mappedKey.key) {
          mappedKey = mappedKey.key;
        }
        if (typeof mappedKey === 'string') {
          key = mappedKey;
        }
      }

      return key;
    },

    /**
      Check attrs.key.serialize property to inform if the `key`
      can be serialized
       @method _canSerialize
      @private
      @param {String} key
      @return {boolean} true if the key can be serialized
    */
    _canSerialize: function _canSerialize(key) {
      var attrs = get(this, 'attrs');

      return !attrs || !attrs[key] || attrs[key].serialize !== false;
    },

    /**
      When attrs.key.serialize is set to true then
      it takes priority over the other checks and the related
      attribute/relationship will be serialized
       @method _mustSerialize
      @private
      @param {String} key
      @return {boolean} true if the key must be serialized
    */
    _mustSerialize: function _mustSerialize(key) {
      var attrs = get(this, 'attrs');

      return attrs && attrs[key] && attrs[key].serialize === true;
    },

    /**
      Check if the given hasMany relationship should be serialized
       @method _shouldSerializeHasMany
      @private
      @param {DS.Snapshot} snapshot
      @param {String} key
      @param {String} relationshipType
      @return {boolean} true if the hasMany relationship should be serialized
    */
    _shouldSerializeHasMany: function _shouldSerializeHasMany(snapshot, key, relationship) {
      var relationshipType = snapshot.type.determineRelationshipType(relationship, this.store);
      if (this._mustSerialize(key)) {
        return true;
      }
      return this._canSerialize(key) && (relationshipType === 'manyToNone' || relationshipType === 'manyToMany');
    },

    // SERIALIZE
    /**
      Called when a record is saved in order to convert the
      record into JSON.
       By default, it creates a JSON object with a key for
      each attribute and belongsTo relationship.
       For example, consider this model:
       ```app/models/comment.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        title: DS.attr(),
        body: DS.attr(),
         author: DS.belongsTo('user')
      });
      ```
       The default serialization would create a JSON object like:
       ```javascript
      {
        "title": "Rails is unagi",
        "body": "Rails? Omakase? O_O",
        "author": 12
      }
      ```
       By default, attributes are passed through as-is, unless
      you specified an attribute type (`DS.attr('date')`). If
      you specify a transform, the JavaScript value will be
      serialized when inserted into the JSON hash.
       By default, belongs-to relationships are converted into
      IDs when inserted into the JSON hash.
       ## IDs
       `serialize` takes an options hash with a single option:
      `includeId`. If this option is `true`, `serialize` will,
      by default include the ID in the JSON object it builds.
       The adapter passes in `includeId: true` when serializing
      a record for `createRecord`, but not for `updateRecord`.
       ## Customization
       Your server may expect a different JSON format than the
      built-in serialization format.
       In that case, you can implement `serialize` yourself and
      return a JSON hash of your choosing.
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        serialize: function(snapshot, options) {
          var json = {
            POST_TTL: snapshot.attr('title'),
            POST_BDY: snapshot.attr('body'),
            POST_CMS: snapshot.hasMany('comments', { ids: true })
          }
           if (options.includeId) {
            json.POST_ID_ = snapshot.id;
          }
           return json;
        }
      });
      ```
       ## Customizing an App-Wide Serializer
       If you want to define a serializer for your entire
      application, you'll probably want to use `eachAttribute`
      and `eachRelationship` on the record.
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        serialize: function(snapshot, options) {
          var json = {};
           snapshot.eachAttribute(function(name) {
            json[serverAttributeName(name)] = snapshot.attr(name);
          })
           snapshot.eachRelationship(function(name, relationship) {
            if (relationship.kind === 'hasMany') {
              json[serverHasManyName(name)] = snapshot.hasMany(name, { ids: true });
            }
          });
           if (options.includeId) {
            json.ID_ = snapshot.id;
          }
           return json;
        }
      });
       function serverAttributeName(attribute) {
        return attribute.underscore().toUpperCase();
      }
       function serverHasManyName(name) {
        return serverAttributeName(name.singularize()) + "_IDS";
      }
      ```
       This serializer will generate JSON that looks like this:
       ```javascript
      {
        "TITLE": "Rails is omakase",
        "BODY": "Yep. Omakase.",
        "COMMENT_IDS": [ 1, 2, 3 ]
      }
      ```
       ## Tweaking the Default JSON
       If you just want to do some small tweaks on the default JSON,
      you can call super first and make the tweaks on the returned
      JSON.
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        serialize: function(snapshot, options) {
          var json = this._super.apply(this, arguments);
           json.subject = json.title;
          delete json.title;
           return json;
        }
      });
      ```
       @method serialize
      @param {DS.Snapshot} snapshot
      @param {Object} options
      @return {Object} json
    */
    serialize: function serialize(snapshot, options) {
      var _this6 = this;

      var json = {};

      if (options && options.includeId) {
        var id = snapshot.id;

        if (id) {
          json[get(this, 'primaryKey')] = id;
        }
      }

      snapshot.eachAttribute(function (key, attribute) {
        _this6.serializeAttribute(snapshot, json, key, attribute);
      });

      snapshot.eachRelationship(function (key, relationship) {
        if (relationship.kind === 'belongsTo') {
          _this6.serializeBelongsTo(snapshot, json, relationship);
        } else if (relationship.kind === 'hasMany') {
          _this6.serializeHasMany(snapshot, json, relationship);
        }
      });

      return json;
    },

    /**
      You can use this method to customize how a serialized record is added to the complete
      JSON hash to be sent to the server. By default the JSON Serializer does not namespace
      the payload and just sends the raw serialized JSON object.
      If your server expects namespaced keys, you should consider using the RESTSerializer.
      Otherwise you can override this method to customize how the record is added to the hash.
      The hash property should be modified by reference.
       For example, your server may expect underscored root objects.
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        serializeIntoHash: function(data, type, snapshot, options) {
          var root = Ember.String.decamelize(type.modelName);
          data[root] = this.serialize(snapshot, options);
        }
      });
      ```
       @method serializeIntoHash
      @param {Object} hash
      @param {DS.Model} typeClass
      @param {DS.Snapshot} snapshot
      @param {Object} options
    */
    serializeIntoHash: function serializeIntoHash(hash, typeClass, snapshot, options) {
      assign(hash, this.serialize(snapshot, options));
    },

    /**
     `serializeAttribute` can be used to customize how `DS.attr`
     properties are serialized
      For example if you wanted to ensure all your attributes were always
     serialized as properties on an `attributes` object you could
     write:
      ```app/serializers/application.js
     import DS from 'ember-data';
      export default DS.JSONSerializer.extend({
       serializeAttribute: function(snapshot, json, key, attributes) {
         json.attributes = json.attributes || {};
         this._super(snapshot, json.attributes, key, attributes);
       }
     });
     ```
      @method serializeAttribute
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {String} key
     @param {Object} attribute
    */
    serializeAttribute: function serializeAttribute(snapshot, json, key, attribute) {
      var type = attribute.type;

      if (this._canSerialize(key)) {
        var value = snapshot.attr(key);
        if (type) {
          var transform = this.transformFor(type);
          if (true) {
            value = transform.serialize(value, attribute.options);
          } else {
            value = transform.serialize(value);
          }
        }

        // if provided, use the mapping provided by `attrs` in
        // the serializer
        var payloadKey = this._getMappedKey(key, snapshot.type);

        if (payloadKey === key && this.keyForAttribute) {
          payloadKey = this.keyForAttribute(key, 'serialize');
        }

        json[payloadKey] = value;
      }
    },

    /**
     `serializeBelongsTo` can be used to customize how `DS.belongsTo`
     properties are serialized.
      Example
      ```app/serializers/post.js
     import DS from 'ember-data';
      export default DS.JSONSerializer.extend({
       serializeBelongsTo: function(snapshot, json, relationship) {
         var key = relationship.key;
          var belongsTo = snapshot.belongsTo(key);
          key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
          json[key] = Ember.isNone(belongsTo) ? belongsTo : belongsTo.record.toJSON();
       }
     });
     ```
      @method serializeBelongsTo
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {Object} relationship
    */
    serializeBelongsTo: function serializeBelongsTo(snapshot, json, relationship) {
      var key = relationship.key;

      if (this._canSerialize(key)) {
        var belongsToId = snapshot.belongsTo(key, { id: true });

        // if provided, use the mapping provided by `attrs` in
        // the serializer
        var payloadKey = this._getMappedKey(key, snapshot.type);
        if (payloadKey === key && this.keyForRelationship) {
          payloadKey = this.keyForRelationship(key, "belongsTo", "serialize");
        }

        //Need to check whether the id is there for new&async records
        if (isNone(belongsToId)) {
          json[payloadKey] = null;
        } else {
          json[payloadKey] = belongsToId;
        }

        if (relationship.options.polymorphic) {
          this.serializePolymorphicType(snapshot, json, relationship);
        }
      }
    },

    /**
     `serializeHasMany` can be used to customize how `DS.hasMany`
     properties are serialized.
      Example
      ```app/serializers/post.js
     import DS from 'ember-data';
      export default DS.JSONSerializer.extend({
       serializeHasMany: function(snapshot, json, relationship) {
         var key = relationship.key;
         if (key === 'comments') {
           return;
         } else {
           this._super.apply(this, arguments);
         }
       }
     });
     ```
      @method serializeHasMany
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {Object} relationship
    */
    serializeHasMany: function serializeHasMany(snapshot, json, relationship) {
      var key = relationship.key;

      if (this._shouldSerializeHasMany(snapshot, key, relationship)) {
        var hasMany = snapshot.hasMany(key, { ids: true });
        if (hasMany !== undefined) {
          // if provided, use the mapping provided by `attrs` in
          // the serializer
          var payloadKey = this._getMappedKey(key, snapshot.type);
          if (payloadKey === key && this.keyForRelationship) {
            payloadKey = this.keyForRelationship(key, "hasMany", "serialize");
          }

          json[payloadKey] = hasMany;
          // TODO support for polymorphic manyToNone and manyToMany relationships
        }
      }
    },

    /**
      You can use this method to customize how polymorphic objects are
      serialized. Objects are considered to be polymorphic if
      `{ polymorphic: true }` is pass as the second argument to the
      `DS.belongsTo` function.
       Example
       ```app/serializers/comment.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        serializePolymorphicType: function(snapshot, json, relationship) {
          var key = relationship.key,
              belongsTo = snapshot.belongsTo(key);
          key = this.keyForAttribute ? this.keyForAttribute(key, "serialize") : key;
           if (Ember.isNone(belongsTo)) {
            json[key + "_type"] = null;
          } else {
            json[key + "_type"] = belongsTo.modelName;
          }
        }
      });
      ```
       @method serializePolymorphicType
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializePolymorphicType: _ember['default'].K,

    /**
      `extractMeta` is used to deserialize any meta information in the
      adapter payload. By default Ember Data expects meta information to
      be located on the `meta` property of the payload object.
       Example
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        extractMeta: function(store, typeClass, payload) {
          if (payload && payload.hasOwnProperty('_pagination')) {
            let meta = payload._pagination;
            delete payload._pagination;
            return meta;
          }
        }
      });
      ```
       @method extractMeta
      @param {DS.Store} store
      @param {DS.Model} modelClass
      @param {Object} payload
    */
    extractMeta: function extractMeta(store, modelClass, payload) {
      if (payload && payload.hasOwnProperty('meta')) {
        var meta = payload.meta;
        delete payload.meta;
        return meta;
      }
    },

    /**
      `extractErrors` is used to extract model errors when a call
      to `DS.Model#save` fails with an `InvalidError`. By default
      Ember Data expects error information to be located on the `errors`
      property of the payload object.
       This serializer expects this `errors` object to be an Array similar
      to the following, compliant with the JSON-API specification:
       ```js
      {
        "errors": [
          {
            "detail": "This username is already taken!",
            "source": {
              "pointer": "data/attributes/username"
            }
          }, {
            "detail": "Doesn't look like a valid email.",
            "source": {
              "pointer": "data/attributes/email"
            }
          }
        ]
      }
      ```
       The key `detail` provides a textual description of the problem.
      Alternatively, the key `title` can be used for the same purpose.
       The nested keys `source.pointer` detail which specific element
      of the request data was invalid.
       Note that JSON-API also allows for object-level errors to be placed
      in an object with pointer `data`, signifying that the problem
      cannot be traced to a specific attribute:
       ```javascript
      {
        "errors": [
          {
            "detail": "Some generic non property error message",
            "source": {
              "pointer": "data"
            }
          }
        ]
      }
      ```
       When turn into a `DS.Errors` object, you can read these errors
      through the property `base`:
       ```handlebars
      {{#each model.errors.base as |error|}}
        <div class="error">
          {{error.message}}
        </div>
      {{/each}}
      ```
       Example of alternative implementation, overriding the default
      behavior to deal with a different format of errors:
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        extractErrors: function(store, typeClass, payload, id) {
          if (payload && typeof payload === 'object' && payload._problems) {
            payload = payload._problems;
            this.normalizeErrors(typeClass, payload);
          }
          return payload;
        }
      });
      ```
       @method extractErrors
      @param {DS.Store} store
      @param {DS.Model} typeClass
      @param {Object} payload
      @param {(String|Number)} id
      @return {Object} json The deserialized errors
    */
    extractErrors: function extractErrors(store, typeClass, payload, id) {
      var _this7 = this;

      if (payload && typeof payload === 'object' && payload.errors) {
        payload = (0, _emberDataAdaptersErrors.errorsArrayToHash)(payload.errors);

        this.normalizeUsingDeclaredMapping(typeClass, payload);

        typeClass.eachAttribute(function (name) {
          var key = _this7.keyForAttribute(name, 'deserialize');
          if (key !== name && payload.hasOwnProperty(key)) {
            payload[name] = payload[key];
            delete payload[key];
          }
        });

        typeClass.eachRelationship(function (name) {
          var key = _this7.keyForRelationship(name, 'deserialize');
          if (key !== name && payload.hasOwnProperty(key)) {
            payload[name] = payload[key];
            delete payload[key];
          }
        });
      }

      return payload;
    },

    /**
     `keyForAttribute` can be used to define rules for how to convert an
     attribute name in your model to a key in your JSON.
      Example
      ```app/serializers/application.js
     import DS from 'ember-data';
      export default DS.RESTSerializer.extend({
       keyForAttribute: function(attr, method) {
         return Ember.String.underscore(attr).toUpperCase();
       }
     });
     ```
      @method keyForAttribute
     @param {String} key
     @param {String} method
     @return {String} normalized key
    */
    keyForAttribute: function keyForAttribute(key, method) {
      return key;
    },

    /**
     `keyForRelationship` can be used to define a custom key when
     serializing and deserializing relationship properties. By default
     `JSONSerializer` does not provide an implementation of this method.
      Example
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONSerializer.extend({
        keyForRelationship: function(key, relationship, method) {
          return 'rel_' + Ember.String.underscore(key);
        }
      });
      ```
      @method keyForRelationship
     @param {String} key
     @param {String} typeClass
     @param {String} method
     @return {String} normalized key
    */
    keyForRelationship: function keyForRelationship(key, typeClass, method) {
      return key;
    },

    /**
     `keyForLink` can be used to define a custom key when deserializing link
     properties.
      @method keyForLink
     @param {String} key
     @param {String} kind `belongsTo` or `hasMany`
     @return {String} normalized key
    */
    keyForLink: function keyForLink(key, kind) {
      return key;
    },

    // HELPERS

    /**
     @method transformFor
     @private
     @param {String} attributeType
     @param {Boolean} skipAssertion
     @return {DS.Transform} transform
    */
    transformFor: function transformFor(attributeType, skipAssertion) {
      var transform = (0, _emberDataPrivateUtils.getOwner)(this).lookup('transform:' + attributeType);

      (0, _emberDataPrivateDebug.assert)("Unable to find transform for '" + attributeType + "'", skipAssertion || !!transform);

      return transform;
    }
  });
});
define("ember-data/serializers/rest", ["exports", "ember", "ember-data/-private/debug", "ember-data/serializers/json", "ember-data/-private/system/normalize-model-name", "ember-inflector", "ember-data/-private/system/coerce-id", "ember-data/-private/utils", "ember-data/-private/features"], function (exports, _ember, _emberDataPrivateDebug, _emberDataSerializersJson, _emberDataPrivateSystemNormalizeModelName, _emberInflector, _emberDataPrivateSystemCoerceId, _emberDataPrivateUtils, _emberDataPrivateFeatures) {
  "use strict";

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
    } else {
      return Array.from(arr);
    }
  }

  /**
    @module ember-data
  */

  var camelize = _ember["default"].String.camelize;

  /**
    Normally, applications will use the `RESTSerializer` by implementing
    the `normalize` method.
  
    This allows you to do whatever kind of munging you need, and is
    especially useful if your server is inconsistent and you need to
    do munging differently for many different kinds of responses.
  
    See the `normalize` documentation for more information.
  
    ## Across the Board Normalization
  
    There are also a number of hooks that you might find useful to define
    across-the-board rules for your payload. These rules will be useful
    if your server is consistent, or if you're building an adapter for
    an infrastructure service, like Firebase, and want to encode service
    conventions.
  
    For example, if all of your keys are underscored and all-caps, but
    otherwise consistent with the names you use in your models, you
    can implement across-the-board rules for how to convert an attribute
    name in your model to a key in your JSON.
  
    ```app/serializers/application.js
    import DS from 'ember-data';
  
    export default DS.RESTSerializer.extend({
      keyForAttribute: function(attr, method) {
        return Ember.String.underscore(attr).toUpperCase();
      }
    });
    ```
  
    You can also implement `keyForRelationship`, which takes the name
    of the relationship as the first parameter, the kind of
    relationship (`hasMany` or `belongsTo`) as the second parameter, and
    the method (`serialize` or `deserialize`) as the third parameter.
  
    @class RESTSerializer
    @namespace DS
    @extends DS.JSONSerializer
  */
  var RESTSerializer = _emberDataSerializersJson["default"].extend({

    /**
     `keyForPolymorphicType` can be used to define a custom key when
     serializing and deserializing a polymorphic type. By default, the
     returned key is `${key}Type`.
      Example
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        keyForPolymorphicType: function(key, relationship) {
          var relationshipKey = this.keyForRelationship(key);
           return 'type-' + relationshipKey;
        }
      });
      ```
      @method keyForPolymorphicType
     @param {String} key
     @param {String} typeClass
     @param {String} method
     @return {String} normalized key
    */
    keyForPolymorphicType: function keyForPolymorphicType(key, typeClass, method) {
      var relationshipKey = this.keyForRelationship(key);

      return relationshipKey + "Type";
    },

    /**
      Normalizes a part of the JSON payload returned by
      the server. You should override this method, munge the hash
      and call super if you have generic normalization to do.
       It takes the type of the record that is being normalized
      (as a DS.Model class), the property where the hash was
      originally found, and the hash to normalize.
       For example, if you have a payload that looks like this:
       ```js
      {
        "post": {
          "id": 1,
          "title": "Rails is omakase",
          "comments": [ 1, 2 ]
        },
        "comments": [{
          "id": 1,
          "body": "FIRST"
        }, {
          "id": 2,
          "body": "Rails is unagi"
        }]
      }
      ```
       The `normalize` method will be called three times:
       * With `App.Post`, `"posts"` and `{ id: 1, title: "Rails is omakase", ... }`
      * With `App.Comment`, `"comments"` and `{ id: 1, body: "FIRST" }`
      * With `App.Comment`, `"comments"` and `{ id: 2, body: "Rails is unagi" }`
       You can use this method, for example, to normalize underscored keys to camelized
      or other general-purpose normalizations. You will only need to implement 
      `normalize` and manipulate the payload as desired.
       For example, if the `IDs` under `"comments"` are provided as `_id` instead of
      `id`, you can specify how to normalize just the comments:
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        normalize(model, hash, prop) {
          if (prop === 'comments') {
            hash.id = hash._id;
            delete hash._id;   
          }
           return this._super(...arguments);
        }
      });
      ```
       On each call to the `normalize` method, the third parameter (`prop`) is always 
      one of the keys that were in the original payload or in the result of another 
      normalization as `normalizeResponse`.
       @method normalize
      @param {DS.Model} modelClass
      @param {Object} resourceHash
      @param {String} prop
      @return {Object}
    */
    normalize: function normalize(modelClass, resourceHash, prop) {
      if (this.normalizeHash && this.normalizeHash[prop]) {
        (0, _emberDataPrivateDebug.deprecate)('`RESTSerializer.normalizeHash` has been deprecated. Please use `serializer.normalize` to modify the payload of single resources.', false, {
          id: 'ds.serializer.normalize-hash-deprecated',
          until: '3.0.0'
        });
        this.normalizeHash[prop](resourceHash);
      }
      return this._super(modelClass, resourceHash);
    },

    /**
      Normalizes an array of resource payloads and returns a JSON-API Document
      with primary data and, if any, included data as `{ data, included }`.
       @method _normalizeArray
      @param {DS.Store} store
      @param {String} modelName
      @param {Object} arrayHash
      @param {String} prop
      @return {Object}
      @private
    */
    _normalizeArray: function _normalizeArray(store, modelName, arrayHash, prop) {
      var _this = this;

      var documentHash = {
        data: [],
        included: []
      };

      var modelClass = store.modelFor(modelName);
      var serializer = store.serializerFor(modelName);

      /*jshint loopfunc:true*/
      _ember["default"].makeArray(arrayHash).forEach(function (hash) {
        var _normalizePolymorphicRecord2 = _this._normalizePolymorphicRecord(store, hash, prop, modelClass, serializer);

        var data = _normalizePolymorphicRecord2.data;
        var included = _normalizePolymorphicRecord2.included;

        documentHash.data.push(data);
        if (included) {
          var _documentHash$included;

          (_documentHash$included = documentHash.included).push.apply(_documentHash$included, _toConsumableArray(included));
        }
      });

      return documentHash;
    },

    _normalizePolymorphicRecord: function _normalizePolymorphicRecord(store, hash, prop, primaryModelClass, primarySerializer) {
      var serializer = undefined,
          modelClass = undefined;
      var primaryHasTypeAttribute = (0, _emberDataPrivateUtils.modelHasAttributeOrRelationshipNamedType)(primaryModelClass);
      // Support polymorphic records in async relationships
      if (!primaryHasTypeAttribute && hash.type && store._hasModelFor(this.modelNameFromPayloadKey(hash.type))) {
        serializer = store.serializerFor(this.modelNameFromPayloadKey(hash.type));
        modelClass = store.modelFor(this.modelNameFromPayloadKey(hash.type));
      } else {
        serializer = primarySerializer;
        modelClass = primaryModelClass;
      }
      return serializer.normalize(modelClass, hash, prop);
    },

    /*
      @method _normalizeResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @param {Boolean} isSingle
      @return {Object} JSON-API Document
      @private
    */
    _normalizeResponse: function _normalizeResponse(store, primaryModelClass, payload, id, requestType, isSingle) {
      var documentHash = {
        data: null,
        included: []
      };

      var meta = this.extractMeta(store, primaryModelClass, payload);
      if (meta) {
        (0, _emberDataPrivateDebug.assert)('The `meta` returned from `extractMeta` has to be an object, not "' + _ember["default"].typeOf(meta) + '".', _ember["default"].typeOf(meta) === 'object');
        documentHash.meta = meta;
      }

      var keys = Object.keys(payload);

      for (var i = 0, _length = keys.length; i < _length; i++) {
        var prop = keys[i];
        var modelName = prop;
        var forcedSecondary = false;

        /*
          If you want to provide sideloaded records of the same type that the
          primary data you can do that by prefixing the key with `_`.
           Example
           ```
          {
            users: [
              { id: 1, title: 'Tom', manager: 3 },
              { id: 2, title: 'Yehuda', manager: 3 }
            ],
            _users: [
              { id: 3, title: 'Tomster' }
            ]
          }
          ```
           This forces `_users` to be added to `included` instead of `data`.
         */
        if (prop.charAt(0) === '_') {
          forcedSecondary = true;
          modelName = prop.substr(1);
        }

        var typeName = this.modelNameFromPayloadKey(modelName);
        if (!store.modelFactoryFor(typeName)) {
          (0, _emberDataPrivateDebug.warn)(this.warnMessageNoModelForKey(modelName, typeName), false, {
            id: 'ds.serializer.model-for-key-missing'
          });
          continue;
        }

        var isPrimary = !forcedSecondary && this.isPrimaryType(store, typeName, primaryModelClass);
        var value = payload[prop];

        if (value === null) {
          continue;
        }

        (0, _emberDataPrivateDebug.runInDebug)(function () {
          var isQueryRecordAnArray = requestType === 'queryRecord' && isPrimary && Array.isArray(value);
          var message = "The adapter returned an array for the primary data of a `queryRecord` response. This is deprecated as `queryRecord` should return a single record.";

          (0, _emberDataPrivateDebug.deprecate)(message, !isQueryRecordAnArray, {
            id: 'ds.serializer.rest.queryRecord-array-response',
            until: '3.0'
          });
        });

        /*
          Support primary data as an object instead of an array.
           Example
           ```
          {
            user: { id: 1, title: 'Tom', manager: 3 }
          }
          ```
         */
        if (isPrimary && _ember["default"].typeOf(value) !== 'array') {
          var _normalizePolymorphicRecord3 = this._normalizePolymorphicRecord(store, value, prop, primaryModelClass, this);

          var _data = _normalizePolymorphicRecord3.data;
          var _included = _normalizePolymorphicRecord3.included;

          documentHash.data = _data;
          if (_included) {
            var _documentHash$included2;

            (_documentHash$included2 = documentHash.included).push.apply(_documentHash$included2, _toConsumableArray(_included));
          }
          continue;
        }

        var _normalizeArray2 = this._normalizeArray(store, typeName, value, prop);

        var data = _normalizeArray2.data;
        var included = _normalizeArray2.included;

        if (included) {
          var _documentHash$included3;

          (_documentHash$included3 = documentHash.included).push.apply(_documentHash$included3, _toConsumableArray(included));
        }

        if (isSingle) {
          /*jshint loopfunc:true*/
          data.forEach(function (resource) {

            /*
              Figures out if this is the primary record or not.
               It's either:
               1. The record with the same ID as the original request
              2. If it's a newly created record without an ID, the first record
                 in the array
             */
            var isUpdatedRecord = isPrimary && (0, _emberDataPrivateSystemCoerceId["default"])(resource.id) === id;
            var isFirstCreatedRecord = isPrimary && !id && !documentHash.data;

            if (isFirstCreatedRecord || isUpdatedRecord) {
              documentHash.data = resource;
            } else {
              documentHash.included.push(resource);
            }
          });
        } else {
          if (isPrimary) {
            documentHash.data = data;
          } else {
            if (data) {
              var _documentHash$included4;

              (_documentHash$included4 = documentHash.included).push.apply(_documentHash$included4, _toConsumableArray(data));
            }
          }
        }
      }

      return documentHash;
    },

    isPrimaryType: function isPrimaryType(store, typeName, primaryTypeClass) {
      var typeClass = store.modelFor(typeName);
      return typeClass.modelName === primaryTypeClass.modelName;
    },

    /**
      This method allows you to push a payload containing top-level
      collections of records organized per type.
       ```js
      {
        "posts": [{
          "id": "1",
          "title": "Rails is omakase",
          "author", "1",
          "comments": [ "1" ]
        }],
        "comments": [{
          "id": "1",
          "body": "FIRST"
        }],
        "users": [{
          "id": "1",
          "name": "@d2h"
        }]
      }
      ```
       It will first normalize the payload, so you can use this to push
      in data streaming in from your server structured the same way
      that fetches and saves are structured.
       @method pushPayload
      @param {DS.Store} store
      @param {Object} payload
    */
    pushPayload: function pushPayload(store, payload) {
      var documentHash = {
        data: [],
        included: []
      };

      for (var prop in payload) {
        var modelName = this.modelNameFromPayloadKey(prop);
        if (!store.modelFactoryFor(modelName)) {
          (0, _emberDataPrivateDebug.warn)(this.warnMessageNoModelForKey(prop, modelName), false, {
            id: 'ds.serializer.model-for-key-missing'
          });
          continue;
        }
        var type = store.modelFor(modelName);
        var typeSerializer = store.serializerFor(type.modelName);

        /*jshint loopfunc:true*/
        _ember["default"].makeArray(payload[prop]).forEach(function (hash) {
          var _typeSerializer$normalize = typeSerializer.normalize(type, hash, prop);

          var data = _typeSerializer$normalize.data;
          var included = _typeSerializer$normalize.included;

          documentHash.data.push(data);
          if (included) {
            var _documentHash$included5;

            (_documentHash$included5 = documentHash.included).push.apply(_documentHash$included5, _toConsumableArray(included));
          }
        });
      }

      if (false) {
        return store.push(documentHash);
      } else {
        store.push(documentHash);
      }
    },

    /**
      This method is used to convert each JSON root key in the payload
      into a modelName that it can use to look up the appropriate model for
      that part of the payload.
       For example, your server may send a model name that does not correspond with
      the name of the model in your app. Let's take a look at an example model,
      and an example payload:
       ```app/models/post.js
      import DS from 'ember-data';
       export default DS.Model.extend({
      });
      ```
       ```javascript
        {
          "blog/post": {
            "id": "1
          }
        }
      ```
       Ember Data is going to normalize the payload's root key for the modelName. As a result,
      it will try to look up the "blog/post" model. Since we don't have a model called "blog/post"
      (or a file called app/models/blog/post.js in ember-cli), Ember Data will throw an error
      because it cannot find the "blog/post" model.
       Since we want to remove this namespace, we can define a serializer for the application that will
      remove "blog/" from the payload key whenver it's encountered by Ember Data:
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        modelNameFromPayloadKey: function(payloadKey) {
          if (payloadKey === 'blog/post') {
            return this._super(payloadKey.replace('blog/', ''));
          } else {
           return this._super(payloadKey);
          }
        }
      });
      ```
       After refreshing, Ember Data will appropriately look up the "post" model.
       By default the modelName for a model is its
      name in dasherized form. This means that a payload key like "blogPost" would be
      normalized to "blog-post" when Ember Data looks up the model. Usually, Ember Data
      can use the correct inflection to do this for you. Most of the time, you won't
      need to override `modelNameFromPayloadKey` for this purpose.
       @method modelNameFromPayloadKey
      @param {String} key
      @return {String} the model's modelName
    */
    modelNameFromPayloadKey: function modelNameFromPayloadKey(key) {
      return (0, _emberInflector.singularize)((0, _emberDataPrivateSystemNormalizeModelName["default"])(key));
    },

    // SERIALIZE

    /**
      Called when a record is saved in order to convert the
      record into JSON.
       By default, it creates a JSON object with a key for
      each attribute and belongsTo relationship.
       For example, consider this model:
       ```app/models/comment.js
      import DS from 'ember-data';
       export default DS.Model.extend({
        title: DS.attr(),
        body: DS.attr(),
         author: DS.belongsTo('user')
      });
      ```
       The default serialization would create a JSON object like:
       ```js
      {
        "title": "Rails is unagi",
        "body": "Rails? Omakase? O_O",
        "author": 12
      }
      ```
       By default, attributes are passed through as-is, unless
      you specified an attribute type (`DS.attr('date')`). If
      you specify a transform, the JavaScript value will be
      serialized when inserted into the JSON hash.
       By default, belongs-to relationships are converted into
      IDs when inserted into the JSON hash.
       ## IDs
       `serialize` takes an options hash with a single option:
      `includeId`. If this option is `true`, `serialize` will,
      by default include the ID in the JSON object it builds.
       The adapter passes in `includeId: true` when serializing
      a record for `createRecord`, but not for `updateRecord`.
       ## Customization
       Your server may expect a different JSON format than the
      built-in serialization format.
       In that case, you can implement `serialize` yourself and
      return a JSON hash of your choosing.
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        serialize: function(snapshot, options) {
          var json = {
            POST_TTL: snapshot.attr('title'),
            POST_BDY: snapshot.attr('body'),
            POST_CMS: snapshot.hasMany('comments', { ids: true })
          }
           if (options.includeId) {
            json.POST_ID_ = snapshot.id;
          }
           return json;
        }
      });
      ```
       ## Customizing an App-Wide Serializer
       If you want to define a serializer for your entire
      application, you'll probably want to use `eachAttribute`
      and `eachRelationship` on the record.
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        serialize: function(snapshot, options) {
          var json = {};
           snapshot.eachAttribute(function(name) {
            json[serverAttributeName(name)] = snapshot.attr(name);
          })
           snapshot.eachRelationship(function(name, relationship) {
            if (relationship.kind === 'hasMany') {
              json[serverHasManyName(name)] = snapshot.hasMany(name, { ids: true });
            }
          });
           if (options.includeId) {
            json.ID_ = snapshot.id;
          }
           return json;
        }
      });
       function serverAttributeName(attribute) {
        return attribute.underscore().toUpperCase();
      }
       function serverHasManyName(name) {
        return serverAttributeName(name.singularize()) + "_IDS";
      }
      ```
       This serializer will generate JSON that looks like this:
       ```js
      {
        "TITLE": "Rails is omakase",
        "BODY": "Yep. Omakase.",
        "COMMENT_IDS": [ 1, 2, 3 ]
      }
      ```
       ## Tweaking the Default JSON
       If you just want to do some small tweaks on the default JSON,
      you can call super first and make the tweaks on the returned
      JSON.
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        serialize: function(snapshot, options) {
          var json = this._super(snapshot, options);
           json.subject = json.title;
          delete json.title;
           return json;
        }
      });
      ```
       @method serialize
      @param {DS.Snapshot} snapshot
      @param {Object} options
      @return {Object} json
    */
    serialize: function serialize(snapshot, options) {
      return this._super.apply(this, arguments);
    },

    /**
      You can use this method to customize the root keys serialized into the JSON.
      The hash property should be modified by reference (possibly using something like _.extend)
      By default the REST Serializer sends the modelName of a model, which is a camelized
      version of the name.
       For example, your server may expect underscored root objects.
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        serializeIntoHash: function(data, type, record, options) {
          var root = Ember.String.decamelize(type.modelName);
          data[root] = this.serialize(record, options);
        }
      });
      ```
       @method serializeIntoHash
      @param {Object} hash
      @param {DS.Model} typeClass
      @param {DS.Snapshot} snapshot
      @param {Object} options
    */
    serializeIntoHash: function serializeIntoHash(hash, typeClass, snapshot, options) {
      var normalizedRootKey = this.payloadKeyFromModelName(typeClass.modelName);
      hash[normalizedRootKey] = this.serialize(snapshot, options);
    },

    /**
      You can use `payloadKeyFromModelName` to override the root key for an outgoing
      request. By default, the RESTSerializer returns a camelized version of the
      model's name.
       For a model called TacoParty, its `modelName` would be the string `taco-party`. The RESTSerializer
      will send it to the server with `tacoParty` as the root key in the JSON payload:
       ```js
      {
        "tacoParty": {
          "id": "1",
          "location": "Matthew Beale's House"
        }
      }
      ```
       For example, your server may expect dasherized root objects:
       ```app/serializers/application.js
      import DS from 'ember-data';
       export default DS.RESTSerializer.extend({
        payloadKeyFromModelName: function(modelName) {
          return Ember.String.dasherize(modelName);
        }
      });
      ```
       Given a `TacoParty` model, calling `save` on it would produce an outgoing
      request like:
       ```js
      {
        "taco-party": {
          "id": "1",
          "location": "Matthew Beale's House"
        }
      }
      ```
       @method payloadKeyFromModelName
      @param {String} modelName
      @return {String}
    */
    payloadKeyFromModelName: function payloadKeyFromModelName(modelName) {
      return camelize(modelName);
    },

    /**
      You can use this method to customize how polymorphic objects are serialized.
      By default the REST Serializer creates the key by appending `Type` to
      the attribute and value from the model's camelcased model name.
       @method serializePolymorphicType
      @param {DS.Snapshot} snapshot
      @param {Object} json
      @param {Object} relationship
    */
    serializePolymorphicType: function serializePolymorphicType(snapshot, json, relationship) {
      var key = relationship.key;
      var belongsTo = snapshot.belongsTo(key);
      var typeKey = this.keyForPolymorphicType(key, relationship.type, 'serialize');

      // old way of getting the key for the polymorphic type
      key = this.keyForAttribute ? this.keyForAttribute(key, "serialize") : key;
      key = key + "Type";

      // The old way of serializing the type of a polymorphic record used
      // `keyForAttribute`, which is not correct. The next code checks if the old
      // way is used and if it differs from the new way of using
      // `keyForPolymorphicType`. If this is the case, a deprecation warning is
      // logged and the old way is restored (so nothing breaks).
      if (key !== typeKey && this.keyForPolymorphicType === RESTSerializer.prototype.keyForPolymorphicType) {
        (0, _emberDataPrivateDebug.deprecate)("The key to serialize the type of a polymorphic record is created via keyForAttribute which has been deprecated. Use the keyForPolymorphicType hook instead.", false, {
          id: 'ds.rest-serializer.deprecated-key-for-polymorphic-type',
          until: '3.0.0'
        });

        typeKey = key;
      }

      if (_ember["default"].isNone(belongsTo)) {
        json[typeKey] = null;
      } else {
        json[typeKey] = camelize(belongsTo.modelName);
      }
    },

    /**
      You can use this method to customize how a polymorphic relationship should
      be extracted.
       @method extractPolymorphicRelationship
      @param {Object} relationshipType
      @param {Object} relationshipHash
      @param {Object} relationshipOptions
      @return {Object}
     */
    extractPolymorphicRelationship: function extractPolymorphicRelationship(relationshipType, relationshipHash, relationshipOptions) {
      var key = relationshipOptions.key;
      var resourceHash = relationshipOptions.resourceHash;
      var relationshipMeta = relationshipOptions.relationshipMeta;

      // A polymorphic belongsTo relationship can be present in the payload
      // either in the form where the `id` and the `type` are given:
      //
      //   {
      //     message: { id: 1, type: 'post' }
      //   }
      //
      // or by the `id` and a `<relationship>Type` attribute:
      //
      //   {
      //     message: 1,
      //     messageType: 'post'
      //   }
      //
      // The next code checks if the latter case is present and returns the
      // corresponding JSON-API representation. The former case is handled within
      // the base class JSONSerializer.
      var isPolymorphic = relationshipMeta.options.polymorphic;
      var typeProperty = this.keyForPolymorphicType(key, relationshipType, 'deserialize');

      if (isPolymorphic && resourceHash.hasOwnProperty(typeProperty) && typeof relationshipHash !== 'object') {
        var type = this.modelNameFromPayloadKey(resourceHash[typeProperty]);
        return {
          id: relationshipHash,
          type: type
        };
      }

      return this._super.apply(this, arguments);
    }
  });

  (0, _emberDataPrivateDebug.runInDebug)(function () {
    RESTSerializer.reopen({
      warnMessageNoModelForKey: function warnMessageNoModelForKey(prop, typeKey) {
        return 'Encountered "' + prop + '" in payload, but no model was found for model name "' + typeKey + '" (resolved model name using ' + this.constructor.toString() + '.modelNameFromPayloadKey("' + prop + '"))';
      }
    });
  });

  exports["default"] = RESTSerializer;
});
define('ember-data/setup-container', ['exports', 'ember-data/-private/initializers/store', 'ember-data/-private/initializers/transforms', 'ember-data/-private/initializers/store-injections', 'ember-data/-private/initializers/data-adapter'], function (exports, _emberDataPrivateInitializersStore, _emberDataPrivateInitializersTransforms, _emberDataPrivateInitializersStoreInjections, _emberDataPrivateInitializersDataAdapter) {
  'use strict';

  exports['default'] = setupContainer;

  function setupContainer(application) {
    (0, _emberDataPrivateInitializersDataAdapter['default'])(application);
    (0, _emberDataPrivateInitializersTransforms['default'])(application);
    (0, _emberDataPrivateInitializersStoreInjections['default'])(application);
    (0, _emberDataPrivateInitializersStore['default'])(application);
  }
});
define("ember-data/store", ["exports", "ember-data/-private/system/store"], function (exports, _emberDataPrivateSystemStore) {
  "use strict";

  exports["default"] = _emberDataPrivateSystemStore["default"];
});
define('ember-data/transform', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  /**
    The `DS.Transform` class is used to serialize and deserialize model
    attributes when they are saved or loaded from an
    adapter. Subclassing `DS.Transform` is useful for creating custom
    attributes. All subclasses of `DS.Transform` must implement a
    `serialize` and a `deserialize` method.
  
    Example
  
    ```app/transforms/temperature.js
    import DS from 'ember-data';
  
    // Converts centigrade in the JSON to fahrenheit in the app
    export default DS.Transform.extend({
      deserialize: function(serialized) {
        return (serialized *  1.8) + 32;
      },
      serialize: function(deserialized) {
        return (deserialized - 32) / 1.8;
      }
    });
    ```
  
    Usage
  
    ```app/models/requirement.js
    import DS from 'ember-data';
  
    export default DS.Model.extend({
      name: DS.attr('string'),
      temperature: DS.attr('temperature')
    });
    ```
  
    @class Transform
    @namespace DS
   */
  exports['default'] = _ember['default'].Object.extend({
    /**
      When given a deserialized value from a record attribute this
      method must return the serialized value.
       Example
       ```javascript
      serialize: function(deserialized) {
        return Ember.isEmpty(deserialized) ? null : Number(deserialized);
      }
      ```
       @method serialize
      @param deserialized The deserialized value
      @return The serialized value
    */
    serialize: null,

    /**
      When given a serialize value from a JSON object this method must
      return the deserialized value for the record attribute.
       Example
       ```javascript
      deserialize: function(serialized) {
        return empty(serialized) ? null : Number(serialized);
      }
      ```
       @method deserialize
      @param serialized The serialized value
      @return The deserialized value
    */
    deserialize: null
  });
});
define("ember-data/version", ["exports"], function (exports) {
  "use strict";

  exports["default"] = "2.6.1";
});
define("ember-get-config/index", ["exports"], function (exports) {
  "use strict";

  var configName = Object.keys(window.requirejs.entries).filter(function (entry) {
    return entry.match(/\/config\/environment/);
  })[0];

  exports["default"] = window.requirejs(configName)["default"];
});
define("ember-inflector/index", ["exports", "ember", "ember-inflector/lib/system", "ember-inflector/lib/ext/string"], function (exports, _ember, _emberInflectorLibSystem, _emberInflectorLibExtString) {
  /* global define, module */

  "use strict";

  _emberInflectorLibSystem.Inflector.defaultRules = _emberInflectorLibSystem.defaultRules;
  _ember["default"].Inflector = _emberInflectorLibSystem.Inflector;

  _ember["default"].String.pluralize = _emberInflectorLibSystem.pluralize;
  _ember["default"].String.singularize = _emberInflectorLibSystem.singularize;exports["default"] = _emberInflectorLibSystem.Inflector;
  exports.pluralize = _emberInflectorLibSystem.pluralize;
  exports.singularize = _emberInflectorLibSystem.singularize;
  exports.defaultRules = _emberInflectorLibSystem.defaultRules;

  if (typeof define !== 'undefined' && define.amd) {
    define('ember-inflector', ['exports'], function (__exports__) {
      __exports__['default'] = _emberInflectorLibSystem.Inflector;
      return _emberInflectorLibSystem.Inflector;
    });
  } else if (typeof module !== 'undefined' && module['exports']) {
    module['exports'] = _emberInflectorLibSystem.Inflector;
  }
});
define('ember-inflector/lib/ext/string', ['exports', 'ember', 'ember-inflector/lib/system/string'], function (exports, _ember, _emberInflectorLibSystemString) {
  'use strict';

  if (_ember['default'].EXTEND_PROTOTYPES === true || _ember['default'].EXTEND_PROTOTYPES.String) {
    /**
      See {{#crossLink "Ember.String/pluralize"}}{{/crossLink}}
       @method pluralize
      @for String
    */
    String.prototype.pluralize = function () {
      return (0, _emberInflectorLibSystemString.pluralize)(this);
    };

    /**
      See {{#crossLink "Ember.String/singularize"}}{{/crossLink}}
       @method singularize
      @for String
    */
    String.prototype.singularize = function () {
      return (0, _emberInflectorLibSystemString.singularize)(this);
    };
  }
});
define('ember-inflector/lib/helpers/pluralize', ['exports', 'ember-inflector', 'ember-inflector/lib/utils/make-helper'], function (exports, _emberInflector, _emberInflectorLibUtilsMakeHelper) {
  'use strict';

  /**
   *
   * If you have Ember Inflector (such as if Ember Data is present),
   * pluralize a word. For example, turn "ox" into "oxen".
   *
   * Example:
   *
   * {{pluralize count myProperty}}
   * {{pluralize 1 "oxen"}}
   * {{pluralize myProperty}}
   * {{pluralize "ox"}}
   *
   * @for Ember.HTMLBars.helpers
   * @method pluralize
   * @param {Number|Property} [count] count of objects
   * @param {String|Property} word word to pluralize
  */
  exports['default'] = (0, _emberInflectorLibUtilsMakeHelper['default'])(function (params) {
    var count = undefined,
        word = undefined;

    if (params.length === 1) {
      word = params[0];
      return (0, _emberInflector.pluralize)(word);
    } else {
      count = params[0];
      word = params[1];

      if (parseFloat(count) !== 1) {
        word = (0, _emberInflector.pluralize)(word);
      }

      return count + " " + word;
    }
  });
});
define('ember-inflector/lib/helpers/singularize', ['exports', 'ember-inflector', 'ember-inflector/lib/utils/make-helper'], function (exports, _emberInflector, _emberInflectorLibUtilsMakeHelper) {
  'use strict';

  /**
   *
   * If you have Ember Inflector (such as if Ember Data is present),
   * singularize a word. For example, turn "oxen" into "ox".
   *
   * Example:
   *
   * {{singularize myProperty}}
   * {{singularize "oxen"}}
   *
   * @for Ember.HTMLBars.helpers
   * @method singularize
   * @param {String|Property} word word to singularize
  */
  exports['default'] = (0, _emberInflectorLibUtilsMakeHelper['default'])(function (params) {
    return (0, _emberInflector.singularize)(params[0]);
  });
});
define('ember-inflector/lib/system/inflections', ['exports'], function (exports) {
  'use strict';

  exports['default'] = {
    plurals: [[/$/, 's'], [/s$/i, 's'], [/^(ax|test)is$/i, '$1es'], [/(octop|vir)us$/i, '$1i'], [/(octop|vir)i$/i, '$1i'], [/(alias|status)$/i, '$1es'], [/(bu)s$/i, '$1ses'], [/(buffal|tomat)o$/i, '$1oes'], [/([ti])um$/i, '$1a'], [/([ti])a$/i, '$1a'], [/sis$/i, 'ses'], [/(?:([^f])fe|([lr])f)$/i, '$1$2ves'], [/(hive)$/i, '$1s'], [/([^aeiouy]|qu)y$/i, '$1ies'], [/(x|ch|ss|sh)$/i, '$1es'], [/(matr|vert|ind)(?:ix|ex)$/i, '$1ices'], [/^(m|l)ouse$/i, '$1ice'], [/^(m|l)ice$/i, '$1ice'], [/^(ox)$/i, '$1en'], [/^(oxen)$/i, '$1'], [/(quiz)$/i, '$1zes']],

    singular: [[/s$/i, ''], [/(ss)$/i, '$1'], [/(n)ews$/i, '$1ews'], [/([ti])a$/i, '$1um'], [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i, '$1sis'], [/(^analy)(sis|ses)$/i, '$1sis'], [/([^f])ves$/i, '$1fe'], [/(hive)s$/i, '$1'], [/(tive)s$/i, '$1'], [/([lr])ves$/i, '$1f'], [/([^aeiouy]|qu)ies$/i, '$1y'], [/(s)eries$/i, '$1eries'], [/(m)ovies$/i, '$1ovie'], [/(x|ch|ss|sh)es$/i, '$1'], [/^(m|l)ice$/i, '$1ouse'], [/(bus)(es)?$/i, '$1'], [/(o)es$/i, '$1'], [/(shoe)s$/i, '$1'], [/(cris|test)(is|es)$/i, '$1is'], [/^(a)x[ie]s$/i, '$1xis'], [/(octop|vir)(us|i)$/i, '$1us'], [/(alias|status)(es)?$/i, '$1'], [/^(ox)en/i, '$1'], [/(vert|ind)ices$/i, '$1ex'], [/(matr)ices$/i, '$1ix'], [/(quiz)zes$/i, '$1'], [/(database)s$/i, '$1']],

    irregularPairs: [['person', 'people'], ['man', 'men'], ['child', 'children'], ['sex', 'sexes'], ['move', 'moves'], ['cow', 'kine'], ['zombie', 'zombies']],

    uncountable: ['equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'jeans', 'police']
  };
});
define('ember-inflector/lib/system/inflector', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var capitalize = _ember['default'].String.capitalize;

  var BLANK_REGEX = /^\s*$/;
  var LAST_WORD_DASHED_REGEX = /([\w/-]+[_/\s-])([a-z\d]+$)/;
  var LAST_WORD_CAMELIZED_REGEX = /([\w/\s-]+)([A-Z][a-z\d]*$)/;
  var CAMELIZED_REGEX = /[A-Z][a-z\d]*$/;

  function loadUncountable(rules, uncountable) {
    for (var i = 0, length = uncountable.length; i < length; i++) {
      rules.uncountable[uncountable[i].toLowerCase()] = true;
    }
  }

  function loadIrregular(rules, irregularPairs) {
    var pair;

    for (var i = 0, length = irregularPairs.length; i < length; i++) {
      pair = irregularPairs[i];

      //pluralizing
      rules.irregular[pair[0].toLowerCase()] = pair[1];
      rules.irregular[pair[1].toLowerCase()] = pair[1];

      //singularizing
      rules.irregularInverse[pair[1].toLowerCase()] = pair[0];
      rules.irregularInverse[pair[0].toLowerCase()] = pair[0];
    }
  }

  /**
    Inflector.Ember provides a mechanism for supplying inflection rules for your
    application. Ember includes a default set of inflection rules, and provides an
    API for providing additional rules.
  
    Examples:
  
    Creating an inflector with no rules.
  
    ```js
    var inflector = new Ember.Inflector();
    ```
  
    Creating an inflector with the default ember ruleset.
  
    ```js
    var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
  
    inflector.pluralize('cow'); //=> 'kine'
    inflector.singularize('kine'); //=> 'cow'
    ```
  
    Creating an inflector and adding rules later.
  
    ```javascript
    var inflector = Ember.Inflector.inflector;
  
    inflector.pluralize('advice'); // => 'advices'
    inflector.uncountable('advice');
    inflector.pluralize('advice'); // => 'advice'
  
    inflector.pluralize('formula'); // => 'formulas'
    inflector.irregular('formula', 'formulae');
    inflector.pluralize('formula'); // => 'formulae'
  
    // you would not need to add these as they are the default rules
    inflector.plural(/$/, 's');
    inflector.singular(/s$/i, '');
    ```
  
    Creating an inflector with a nondefault ruleset.
  
    ```javascript
    var rules = {
      plurals:  [ /$/, 's' ],
      singular: [ /\s$/, '' ],
      irregularPairs: [
        [ 'cow', 'kine' ]
      ],
      uncountable: [ 'fish' ]
    };
  
    var inflector = new Ember.Inflector(rules);
    ```
  
    @class Inflector
    @namespace Ember
  */
  function Inflector(ruleSet) {
    ruleSet = ruleSet || {};
    ruleSet.uncountable = ruleSet.uncountable || makeDictionary();
    ruleSet.irregularPairs = ruleSet.irregularPairs || makeDictionary();

    var rules = this.rules = {
      plurals: ruleSet.plurals || [],
      singular: ruleSet.singular || [],
      irregular: makeDictionary(),
      irregularInverse: makeDictionary(),
      uncountable: makeDictionary()
    };

    loadUncountable(rules, ruleSet.uncountable);
    loadIrregular(rules, ruleSet.irregularPairs);

    this.enableCache();
  }

  if (!Object.create && !Object.create(null).hasOwnProperty) {
    throw new Error("This browser does not support Object.create(null), please polyfil with es5-sham: http://git.io/yBU2rg");
  }

  function makeDictionary() {
    var cache = Object.create(null);
    cache['_dict'] = null;
    delete cache['_dict'];
    return cache;
  }

  Inflector.prototype = {
    /**
      @public
       As inflections can be costly, and commonly the same subset of words are repeatedly
      inflected an optional cache is provided.
       @method enableCache
    */
    enableCache: function enableCache() {
      this.purgeCache();

      this.singularize = function (word) {
        this._cacheUsed = true;
        return this._sCache[word] || (this._sCache[word] = this._singularize(word));
      };

      this.pluralize = function (word) {
        this._cacheUsed = true;
        return this._pCache[word] || (this._pCache[word] = this._pluralize(word));
      };
    },

    /**
      @public
       @method purgedCache
    */
    purgeCache: function purgeCache() {
      this._cacheUsed = false;
      this._sCache = makeDictionary();
      this._pCache = makeDictionary();
    },

    /**
      @public
      disable caching
       @method disableCache;
    */
    disableCache: function disableCache() {
      this._sCache = null;
      this._pCache = null;
      this.singularize = function (word) {
        return this._singularize(word);
      };

      this.pluralize = function (word) {
        return this._pluralize(word);
      };
    },

    /**
      @method plural
      @param {RegExp} regex
      @param {String} string
    */
    plural: function plural(regex, string) {
      if (this._cacheUsed) {
        this.purgeCache();
      }
      this.rules.plurals.push([regex, string.toLowerCase()]);
    },

    /**
      @method singular
      @param {RegExp} regex
      @param {String} string
    */
    singular: function singular(regex, string) {
      if (this._cacheUsed) {
        this.purgeCache();
      }
      this.rules.singular.push([regex, string.toLowerCase()]);
    },

    /**
      @method uncountable
      @param {String} regex
    */
    uncountable: function uncountable(string) {
      if (this._cacheUsed) {
        this.purgeCache();
      }
      loadUncountable(this.rules, [string.toLowerCase()]);
    },

    /**
      @method irregular
      @param {String} singular
      @param {String} plural
    */
    irregular: function irregular(singular, plural) {
      if (this._cacheUsed) {
        this.purgeCache();
      }
      loadIrregular(this.rules, [[singular, plural]]);
    },

    /**
      @method pluralize
      @param {String} word
    */
    pluralize: function pluralize(word) {
      return this._pluralize(word);
    },

    _pluralize: function _pluralize(word) {
      return this.inflect(word, this.rules.plurals, this.rules.irregular);
    },
    /**
      @method singularize
      @param {String} word
    */
    singularize: function singularize(word) {
      return this._singularize(word);
    },

    _singularize: function _singularize(word) {
      return this.inflect(word, this.rules.singular, this.rules.irregularInverse);
    },

    /**
      @protected
       @method inflect
      @param {String} word
      @param {Object} typeRules
      @param {Object} irregular
    */
    inflect: function inflect(word, typeRules, irregular) {
      var inflection, substitution, result, lowercase, wordSplit, firstPhrase, lastWord, isBlank, isCamelized, rule, isUncountable;

      isBlank = !word || BLANK_REGEX.test(word);

      isCamelized = CAMELIZED_REGEX.test(word);
      firstPhrase = "";

      if (isBlank) {
        return word;
      }

      lowercase = word.toLowerCase();
      wordSplit = LAST_WORD_DASHED_REGEX.exec(word) || LAST_WORD_CAMELIZED_REGEX.exec(word);

      if (wordSplit) {
        firstPhrase = wordSplit[1];
        lastWord = wordSplit[2].toLowerCase();
      }

      isUncountable = this.rules.uncountable[lowercase] || this.rules.uncountable[lastWord];

      if (isUncountable) {
        return word;
      }

      for (rule in this.rules.irregular) {
        if (lowercase.match(rule + "$")) {
          substitution = irregular[rule];

          if (isCamelized && irregular[lastWord]) {
            substitution = capitalize(substitution);
            rule = capitalize(rule);
          }

          return word.replace(rule, substitution);
        }
      }

      for (var i = typeRules.length, min = 0; i > min; i--) {
        inflection = typeRules[i - 1];
        rule = inflection[0];

        if (rule.test(word)) {
          break;
        }
      }

      inflection = inflection || [];

      rule = inflection[0];
      substitution = inflection[1];

      result = word.replace(rule, substitution);

      return result;
    }
  };

  exports['default'] = Inflector;
});
define('ember-inflector/lib/system/string', ['exports', 'ember-inflector/lib/system/inflector'], function (exports, _emberInflectorLibSystemInflector) {
  'use strict';

  function pluralize(word) {
    return _emberInflectorLibSystemInflector['default'].inflector.pluralize(word);
  }

  function singularize(word) {
    return _emberInflectorLibSystemInflector['default'].inflector.singularize(word);
  }

  exports.pluralize = pluralize;
  exports.singularize = singularize;
});
define("ember-inflector/lib/system", ["exports", "ember-inflector/lib/system/inflector", "ember-inflector/lib/system/string", "ember-inflector/lib/system/inflections"], function (exports, _emberInflectorLibSystemInflector, _emberInflectorLibSystemString, _emberInflectorLibSystemInflections) {
  "use strict";

  _emberInflectorLibSystemInflector["default"].inflector = new _emberInflectorLibSystemInflector["default"](_emberInflectorLibSystemInflections["default"]);

  exports.Inflector = _emberInflectorLibSystemInflector["default"];
  exports.singularize = _emberInflectorLibSystemString.singularize;
  exports.pluralize = _emberInflectorLibSystemString.pluralize;
  exports.defaultRules = _emberInflectorLibSystemInflections["default"];
});
define('ember-inflector/lib/utils/make-helper', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = makeHelper;

  function makeHelper(helperFunction) {
    if (_ember['default'].Helper) {
      return _ember['default'].Helper.helper(helperFunction);
    }
    if (_ember['default'].HTMLBars) {
      return _ember['default'].HTMLBars.makeBoundHelper(helperFunction);
    }
    return _ember['default'].Handlebars.makeBoundHelper(helperFunction);
  }
});
define('ember-load-initializers/index', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = function (app, prefix) {
    var regex = new RegExp('^' + prefix + '\/((?:instance-)?initializers)\/');
    var getKeys = Object.keys || _ember['default'].keys;

    getKeys(requirejs._eak_seen).map(function (moduleName) {
      return {
        moduleName: moduleName,
        matches: regex.exec(moduleName)
      };
    }).filter(function (dep) {
      return dep.matches && dep.matches.length === 2;
    }).forEach(function (dep) {
      var moduleName = dep.moduleName;

      var module = require(moduleName, null, null, true);
      if (!module) {
        throw new Error(moduleName + ' must export an initializer.');
      }

      var initializerType = _ember['default'].String.camelize(dep.matches[1].substring(0, dep.matches[1].length - 1));
      var initializer = module['default'];
      if (!initializer.name) {
        var initializerName = moduleName.match(/[^\/]+\/?$/)[0];
        initializer.name = initializerName;
      }

      if (app[initializerType]) {
        app[initializerType](initializer);
      }
    });
  };
});
define('ember-power-select/components/power-select/before-options', ['exports', 'ember-component', 'ember-runloop', 'ember-power-select/templates/components/power-select/before-options'], function (exports, _emberComponent, _emberRunloop, _emberPowerSelectTemplatesComponentsPowerSelectBeforeOptions) {
  'use strict';

  exports['default'] = _emberComponent['default'].extend({
    tagName: '',
    layout: _emberPowerSelectTemplatesComponentsPowerSelectBeforeOptions['default'],

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this.focusInput();
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (this.getAttr('searchEnabled')) {
        this.getAttr('select').actions.search('');
      }
    },

    // Actions
    actions: {
      onKeydown: function onKeydown(e) {
        var onKeydown = this.get('onKeydown');
        if (onKeydown(e) === false) {
          return false;
        }
        if (e.keyCode === 13) {
          var select = this.get('select');
          select.actions.close(e);
        }
      }
    },

    // Methods
    focusInput: function focusInput() {
      this.input = self.document.querySelector('.ember-power-select-search-input');
      if (this.input) {
        (0, _emberRunloop.scheduleOnce)('afterRender', this.input, 'focus');
      }
    }
  });
});
define('ember-power-select/components/power-select/options', ['exports', 'ember-component', 'jquery', 'ember-power-select/templates/components/power-select/options', 'ember-computed'], function (exports, _emberComponent, _jquery, _emberPowerSelectTemplatesComponentsPowerSelectOptions, _emberComputed) {
  'use strict';

  exports['default'] = _emberComponent['default'].extend({
    isTouchDevice: !!self.window && 'ontouchstart' in self.window,
    layout: _emberPowerSelectTemplatesComponentsPowerSelectOptions['default'],
    tagName: 'ul',
    attributeBindings: ['role', 'aria-controls'],
    role: 'listbox',

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      if (this.get('role') === 'group') {
        return;
      }
      var findOptionAndPerform = function findOptionAndPerform(action, e) {
        var optionItem = (0, _jquery['default'])(e.target).closest('[data-option-index]');
        if (!optionItem || !(0 in optionItem)) {
          return;
        }
        if (optionItem.closest('[aria-disabled=true]').length) {
          return;
        } // Abort if the item or an ancestor is disabled
        var optionIndex = optionItem[0].getAttribute('data-option-index');
        action(_this._optionFromIndex(optionIndex), e);
      };
      this.element.addEventListener('mouseup', function (e) {
        return findOptionAndPerform(_this.get('select.actions.choose'), e);
      });
      this.element.addEventListener('mouseover', function (e) {
        return findOptionAndPerform(_this.get('select.actions.highlight'), e);
      });
      if (this.get('isTouchDevice')) {
        this._addTouchEvents();
      }
      if (this.get('role') !== 'group') {
        var select = this.get('select');
        select.actions.scrollTo(select.highlighted);
      }
    },

    // CPs
    'aria-controls': (0, _emberComputed['default'])('select._id', function () {
      return 'ember-power-select-trigger-' + this.get('select._id');
    }),

    // Methods
    _addTouchEvents: function _addTouchEvents() {
      var _this2 = this;

      var touchMoveHandler = function touchMoveHandler() {
        _this2.hasMoved = true;
        _this2.element.removeEventListener('touchmove', touchMoveHandler);
      };
      // Add touch event handlers to detect taps
      this.element.addEventListener('touchstart', function () {
        _this2.element.addEventListener('touchmove', touchMoveHandler);
      });
      this.element.addEventListener('touchend', function (e) {
        var optionItem = (0, _jquery['default'])(e.target).closest('[data-option-index]');

        if (!optionItem || !(0 in optionItem)) {
          return;
        }

        e.preventDefault();
        if (_this2.hasMoved) {
          _this2.hasMoved = false;
          return;
        }

        var optionIndex = optionItem[0].getAttribute('data-option-index');
        _this2.get('select.actions.choose')(_this2._optionFromIndex(optionIndex), e);
      });
    },

    _optionFromIndex: function _optionFromIndex(index) {
      var parts = index.split('.');
      var options = this.get('options');
      var option = options[parseInt(parts[0], 10)];
      for (var i = 1; i < parts.length; i++) {
        option = option.options[parseInt(parts[i], 10)];
      }
      return option;
    }
  });
});
define('ember-power-select/components/power-select/trigger', ['exports', 'ember-component', 'ember-power-select/templates/components/power-select/trigger'], function (exports, _emberComponent, _emberPowerSelectTemplatesComponentsPowerSelectTrigger) {
  'use strict';

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberPowerSelectTemplatesComponentsPowerSelectTrigger['default'],
    tagName: '',

    // Actions
    actions: {
      clear: function clear(e) {
        e.stopPropagation();
        this.getAttr('select').actions.select(null);
      }
    }
  });
});
define('ember-power-select/components/power-select-multiple/trigger', ['exports', 'ember', 'ember-component', 'ember-power-select/templates/components/power-select-multiple/trigger', 'ember-metal/get', 'ember-computed', 'ember-metal/observer', 'ember-service/inject', 'ember-runloop', 'ember-metal/utils', 'ember-utils', 'ember-string'], function (exports, _ember, _emberComponent, _emberPowerSelectTemplatesComponentsPowerSelectMultipleTrigger, _emberMetalGet, _emberComputed, _emberMetalObserver, _emberServiceInject, _emberRunloop, _emberMetalUtils, _emberUtils, _emberString) {
  'use strict';

  var testing = _ember['default'].testing;

  var ua = self.window && self.window.navigator ? self.window.navigator.userAgent : '';
  var isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  var isTouchDevice = testing || !!self.window && 'ontouchstart' in self.window;

  exports['default'] = _emberComponent['default'].extend({
    tagName: '',
    layout: _emberPowerSelectTemplatesComponentsPowerSelectMultipleTrigger['default'],
    textMeasurer: (0, _emberServiceInject['default'])(),
    _lastIsOpen: false,

    // Lifecycle hooks
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      var select = this.get('select');
      this.input = document.getElementById('ember-power-select-trigger-multiple-input-' + select._id);
      this.inputFont = this.input ? window.getComputedStyle(this.input).font : null;
      var optionsList = document.getElementById('ember-power-select-multiple-options-' + select._id);
      var chooseOption = function chooseOption(e) {
        var selectedIndex = e.target.getAttribute('data-selected-index');
        if (selectedIndex) {
          e.stopPropagation();
          e.preventDefault();

          var _select = _this.getAttr('select');
          var object = _this.selectedObject(_select.selected, selectedIndex);
          _select.actions.choose(object);
        }
      };
      if (isTouchDevice) {
        optionsList.addEventListener('touchstart', chooseOption);
      }
      optionsList.addEventListener('mousedown', chooseOption);
    },

    // Observers
    openObserver: (0, _emberMetalObserver['default'])('select.isOpen', function () {
      var select = this.get('select');
      if (this._lastIsOpen && !select.isOpen) {
        (0, _emberRunloop.scheduleOnce)('actions', null, select.actions.search, '');
      }
      this._lastIsOpen = select.isOpen;
    }),

    // CPs
    triggerMultipleInputStyle: (0, _emberComputed['default'])('select.searchText.length', 'select.selected.length', function () {
      var select = this.get('select');
      select.actions.reposition();
      if (!select.selected || select.selected.length === 0) {
        return (0, _emberString.htmlSafe)('width: 100%;');
      } else {
        var textWidth = 0;
        if (this.inputFont) {
          textWidth = this.get('textMeasurer').width(select.searchText, this.inputFont);
        }
        return (0, _emberString.htmlSafe)('width: ' + (textWidth + 25) + 'px');
      }
    }),

    maybePlaceholder: (0, _emberComputed['default'])('placeholder', 'select.selected.length', function () {
      if (isIE) {
        return null;
      }
      var select = this.getAttr('select');
      return !select.selected || (0, _emberMetalGet['default'])(select.selected, 'length') === 0 ? this.get('placeholder') || '' : '';
    }),

    // Actions
    actions: {
      onInput: function onInput(e) {
        var action = this.get('onInput');
        if (action && action(e) === false) {
          return;
        }
        this.getAttr('select').actions.open(e);
      },

      onKeydown: function onKeydown(e) {
        var _getProperties = this.getProperties('onKeydown', 'select');

        var onKeydown = _getProperties.onKeydown;
        var select = _getProperties.select;

        if (onKeydown && onKeydown(e) === false) {
          e.stopPropagation();
          return false;
        }
        if (e.keyCode === 8) {
          e.stopPropagation();
          if ((0, _emberUtils.isBlank)(e.target.value)) {
            var lastSelection = select.selected[select.selected.length - 1];
            if (lastSelection) {
              select.actions.select(this.get('buildSelection')(lastSelection, select), e);
              if (typeof lastSelection === 'string') {
                select.actions.search(lastSelection);
              } else {
                var searchField = this.get('searchField');
                (0, _emberMetalUtils.assert)('`{{power-select-multiple}}` requires a `searchField` when the options are not strings to remove options using backspace', searchField);
                select.actions.search((0, _emberMetalGet['default'])(lastSelection, searchField));
              }
              select.actions.open(e);
            }
          }
        } else if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32) {
          // Keys 0-9, a-z or SPACE
          e.stopPropagation();
        }
      }
    },

    // Methods
    selectedObject: function selectedObject(list, index) {
      if (list.objectAt) {
        return list.objectAt(index);
      } else {
        return (0, _emberMetalGet['default'])(list, index);
      }
    }
  });
});
define('ember-power-select/components/power-select-multiple', ['exports', 'ember-component', 'ember-computed', 'ember-power-select/templates/components/power-select-multiple', 'ember-power-select/utils/computed-fallback-if-undefined'], function (exports, _emberComponent, _emberComputed, _emberPowerSelectTemplatesComponentsPowerSelectMultiple, _emberPowerSelectUtilsComputedFallbackIfUndefined) {
  'use strict';

  exports['default'] = _emberComponent['default'].extend({
    layout: _emberPowerSelectTemplatesComponentsPowerSelectMultiple['default'],
    // Config
    triggerComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select-multiple/trigger'),
    beforeOptionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),

    // CPs
    concatenatedTriggerClass: (0, _emberComputed['default'])('triggerClass', function () {
      var classes = ['ember-power-select-multiple-trigger'];
      if (this.get('triggerClass')) {
        classes.push(this.get('triggerClass'));
      }
      return classes.join(' ');
    }),

    selected: (0, _emberComputed['default'])({
      get: function get() {
        return [];
      },
      set: function set(_, v) {
        if (v === null || v === undefined) {
          return [];
        }
        return v;
      }
    }),

    // Actions
    actions: {
      handleOpen: function handleOpen(select, e) {
        var action = this.get('onopen');
        if (action && action(select, e) === false) {
          return false;
        }
        this.focusInput();
      },

      handleFocus: function handleFocus(select, e) {
        var action = this.get('onfocus');
        if (action) {
          action(select, e);
        }
        this.focusInput();
      },

      handleKeydown: function handleKeydown(select, e) {
        var action = this.get('onkeydown');
        if (action && action(select, e) === false) {
          e.stopPropagation();
          return false;
        }
        if (e.keyCode === 13 && select.isOpen) {
          e.stopPropagation();
          if (select.highlighted !== undefined) {
            if (!select.selected || select.selected.indexOf(select.highlighted) === -1) {
              select.actions.choose(select.highlighted, e);
              return false;
            } else {
              select.actions.close(e);
              return false;
            }
          } else {
            select.actions.close(e);
            return false;
          }
        }
      },

      buildSelection: function buildSelection(option, select) {
        var newSelection = (select.selected || []).slice(0);
        var idx = newSelection.indexOf(option);
        if (idx > -1) {
          newSelection.splice(idx, 1);
        } else {
          newSelection.push(option);
        }
        return newSelection;
      }
    },

    // Methods
    focusInput: function focusInput() {
      var input = this.element.querySelector('.ember-power-select-trigger-multiple-input');
      if (input) {
        input.focus();
      }
    }
  });
});
define('ember-power-select/components/power-select', ['exports', 'ember-component', 'ember-power-select/templates/components/power-select', 'ember-power-select/utils/computed-fallback-if-undefined', 'ember-platform', 'ember-metal/utils', 'ember-utils', 'ember-array/utils', 'ember-computed', 'ember-metal/get', 'ember-metal/set', 'ember-runloop', 'ember-power-select/utils/group-utils'], function (exports, _emberComponent, _emberPowerSelectTemplatesComponentsPowerSelect, _emberPowerSelectUtilsComputedFallbackIfUndefined, _emberPlatform, _emberMetalUtils, _emberUtils, _emberArrayUtils, _emberComputed, _emberMetalGet, _emberMetalSet, _emberRunloop, _emberPowerSelectUtilsGroupUtils) {
  'use strict';

  function concatWithProperty(strings, property) {
    if (property) {
      strings.push(property);
    }
    return strings.join(' ');
  }

  function defaultHighlighted(results, selected) {
    if (selected === undefined || (0, _emberPowerSelectUtilsGroupUtils.indexOfOption)(results, selected) === -1) {
      return advanceSelectableOption(results, selected, 1);
    }
    return selected;
  }

  function advanceSelectableOption(options, currentOption, step) {
    var resultsLength = (0, _emberPowerSelectUtilsGroupUtils.countOptions)(options);
    var startIndex = Math.min(Math.max((0, _emberPowerSelectUtilsGroupUtils.indexOfOption)(options, currentOption) + step, 0), resultsLength - 1);

    var _optionAtIndex = (0, _emberPowerSelectUtilsGroupUtils.optionAtIndex)(options, startIndex);

    var disabled = _optionAtIndex.disabled;
    var option = _optionAtIndex.option;

    while (option && disabled) {
      var next = (0, _emberPowerSelectUtilsGroupUtils.optionAtIndex)(options, startIndex += step);
      disabled = next.disabled;
      option = next.option;
    }
    return option;
  }

  function toPlainArray(collection) {
    return collection.toArray ? collection.toArray() : collection;
  }

  exports['default'] = _emberComponent['default'].extend({
    // HTML
    layout: _emberPowerSelectTemplatesComponentsPowerSelect['default'],
    tagName: '',

    // Options
    searchEnabled: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(true),
    matchTriggerWidth: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(true),
    matcher: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(_emberPowerSelectUtilsGroupUtils.defaultMatcher),
    loadingMessage: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('Loading options...'),
    noMatchesMessage: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('No results found'),
    searchMessage: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])("Type to search"),
    closeOnSelect: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(true),

    afterOptionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    beforeOptionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select/before-options'),
    optionsComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select/options'),
    selectedItemComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])(null),
    triggerComponent: (0, _emberPowerSelectUtilsComputedFallbackIfUndefined['default'])('power-select/trigger'),

    // Private state
    expirableSearchText: '',
    expirableSearchDebounceId: null,
    activeSearch: null,
    publicAPI: {
      options: [], // Contains the resolved collection of options
      results: [], // Contains the active set of results
      resultsCount: 0, // Contains the number of results incuding those nested/disabled
      selected: undefined, // Contains the resolved selected option
      highlighted: undefined, // Contains the currently highlighted option (if any)
      searchText: '', // Contains the text of the current search
      lastSearchedText: '', // Contains the text of the last finished search
      loading: false, // Truthy if there is a pending promise that will update the results
      isActive: false // Truthy if the trigger is focused. Other subcomponents can mark it as active depending on other logic.
    },

    // Lifecycle hooks
    init: function init() {
      this._super.apply(this, arguments);
      (0, _emberMetalUtils.assert)('{{power-select}} requires an `onchange` function', this.get('onchange') && typeof this.get('onchange') === 'function');
    },

    willDestroy: function willDestroy() {
      this._super.apply(this, arguments);
      this.activeSearch = this.activeSelectedPromise = this.activeOptionsPromise = null;
      if (this.publicAPI.options && this.publicAPI.options.removeObserver) {
        this.publicAPI.options.removeObserver('[]', this, this._updateOptionsAndResults);
      }
      (0, _emberRunloop.cancel)(this.expirableSearchDebounceId);
    },

    // CPs
    selected: (0, _emberComputed['default'])({
      get: function get() {
        return null;
      },
      set: function set(_, selected) {
        var _this = this;

        if (selected && selected.then) {
          this.activeSelectedPromise = selected;
          selected.then(function (selection) {
            if (_this.activeSelectedPromise === selected) {
              _this.updateSelection(selection);
            }
          });
        } else {
          (0, _emberRunloop.scheduleOnce)('actions', this, this.updateSelection, selected);
        }
        return selected;
      }
    }),

    options: (0, _emberComputed['default'])({
      get: function get() {
        return [];
      },
      set: function set(_, options) {
        var _this2 = this;

        if (options && options.then) {
          (0, _emberMetalSet['default'])(this.publicAPI, 'loading', true);
          this.activeOptionsPromise = options;
          options.then(function (resolvedOptions) {
            if (_this2.activeOptionsPromise === options) {
              _this2.updateOptions(resolvedOptions);
            }
          }, function () {
            if (_this2.activeOptionsPromise === options) {
              (0, _emberMetalSet['default'])(_this2.publicAPI, 'loading', false);
            }
          });
        } else {
          (0, _emberRunloop.scheduleOnce)('actions', this, this.updateOptions, options);
        }
        return options;
      }
    }),

    optionMatcher: (0, _emberComputed['default'])('searchField', 'matcher', function () {
      var _getProperties = this.getProperties('matcher', 'searchField');

      var matcher = _getProperties.matcher;
      var searchField = _getProperties.searchField;

      if (searchField && matcher === _emberPowerSelectUtilsGroupUtils.defaultMatcher) {
        return function (option, text) {
          return matcher((0, _emberMetalGet['default'])(option, searchField), text);
        };
      } else {
        return function (option, text) {
          return matcher(option, text);
        };
      }
    }),

    concatenatedTriggerClasses: (0, _emberComputed['default'])('triggerClass', 'publicAPI.isActive', function () {
      var classes = ['ember-power-select-trigger'];
      if (this.get('publicAPI.isActive')) {
        classes.push('ember-power-select-trigger--active');
      }
      return concatWithProperty(classes, this.get('triggerClass'));
    }),

    concatenatedDropdownClasses: (0, _emberComputed['default'])('dropdownClass', 'publicAPI.isActive', function () {
      var classes = ['ember-power-select-dropdown'];
      if (this.get('publicAPI.isActive')) {
        classes.push('ember-power-select-dropdown--active');
      }
      return concatWithProperty(classes, this.get('dropdownClass'));
    }),

    mustShowSearchMessage: (0, _emberComputed['default'])('publicAPI.{searchText,resultsCount}', 'search', 'searchMessage', function () {
      return this.publicAPI.searchText.length === 0 && !!this.get('search') && !!this.get('searchMessage') && this.publicAPI.resultsCount === 0;
    }),

    mustShowNoMessages: (0, _emberComputed['default'])('search', 'publicAPI.{lastSearchedText,resultsCount,loading}', function () {
      return !this.publicAPI.loading && this.publicAPI.resultsCount === 0 && (!this.get('search') || this.publicAPI.lastSearchedText.length > 0);
    }),

    // Actions
    actions: {
      registerAPI: function registerAPI(dropdown) {
        var _this3 = this;

        var actions = {
          search: function search() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _this3.send.apply(_this3, ['search'].concat(args));
          },
          highlight: function highlight() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            return _this3.send.apply(_this3, ['highlight'].concat(args));
          },
          select: function select() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            return _this3.send.apply(_this3, ['select'].concat(args));
          },
          choose: function choose() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            return _this3.send.apply(_this3, ['choose'].concat(args));
          },
          scrollTo: function scrollTo() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }

            return _emberRunloop.scheduleOnce.apply(undefined, ['afterRender', _this3, _this3.send, 'scrollTo'].concat(args));
          }
        };
        (0, _emberPlatform.assign)(dropdown.actions, actions);
        (0, _emberPlatform.assign)(dropdown, this.publicAPI);
        this.publicAPI = dropdown;
        this.set('optionsId', 'ember-power-select-options-' + dropdown._id);
        var action = this.get('registerAPI');
        if (action) {
          action(dropdown);
        }
      },

      onOpen: function onOpen(_, e) {
        var action = this.get('onopen');
        if (action && action(this.publicAPI, e) === false) {
          return false;
        }
        if (e) {
          this.openingEvent = e;
        }
        this.resetHighlighted();
      },

      onClose: function onClose(_, e) {
        var action = this.get('onclose');
        if (action && action(this.publicAPI, e) === false) {
          return false;
        }
        if (e) {
          this.openingEvent = null;
        }
        (0, _emberMetalSet['default'])(this.publicAPI, 'highlighted', undefined);
      },

      onInput: function onInput(e) {
        var term = e.target.value;
        var action = this.get('oninput');
        if (action && action(term, this.publicAPI, e) === false) {
          return;
        }
        this.publicAPI.actions.search(term);
      },

      highlight: function highlight(option /*, e */) {
        if (option && (0, _emberMetalGet['default'])(option, 'disabled')) {
          return;
        }
        (0, _emberMetalSet['default'])(this.publicAPI, 'highlighted', option);
      },

      select: function select(selected /*, e */) {
        if (this.publicAPI.selected !== selected) {
          this.get('onchange')(selected, this.publicAPI);
        }
      },

      search: function search(term) {
        if ((0, _emberUtils.isBlank)(term)) {
          this._resetSearch();
        } else if (this.getAttr('search')) {
          this._performSearch(term);
        } else {
          this._performFilter(term);
        }
      },

      choose: function choose(selected, e) {
        if (e && e.clientY) {
          if (this.openingEvent && this.openingEvent.clientY) {
            if (Math.abs(this.openingEvent.clientY - e.clientY) < 2) {
              return;
            }
          }
        }
        this.publicAPI.actions.select(this.get('buildSelection')(selected, this.publicAPI), e);
        if (this.get('closeOnSelect')) {
          this.publicAPI.actions.close(e);
          return false;
        }
      },

      // keydowns handled by the trigger provided by ember-basic-dropdown
      onTriggerKeydown: function onTriggerKeydown(_, e) {
        var onkeydown = this.get('onkeydown');
        if (onkeydown && onkeydown(this.publicAPI, e) === false) {
          return false;
        }
        if (e.keyCode >= 48 && e.keyCode <= 90) {
          // Keys 0-9, a-z or SPACE
          return this._handleTriggerTyping(e);
        } else if (e.keyCode === 32) {
          // Space
          return this._handleKeySpace(e);
        } else {
          return this._routeKeydown(e);
        }
      },

      // keydowns handled by inputs inside the component
      onKeydown: function onKeydown(e) {
        var onkeydown = this.get('onkeydown');
        if (onkeydown && onkeydown(this.publicAPI, e) === false) {
          return false;
        }
        return this._routeKeydown(e);
      },

      scrollTo: function scrollTo(option /*, e */) {
        if (!self.document || !option) {
          return;
        }
        var optionsList = self.document.querySelector('.ember-power-select-options');
        if (!optionsList) {
          return;
        }
        var index = (0, _emberPowerSelectUtilsGroupUtils.indexOfOption)(this.publicAPI.results, option);
        if (index === -1) {
          return;
        }
        var optionElement = optionsList.querySelectorAll('[data-option-index]').item(index);
        var optionTopScroll = optionElement.offsetTop - optionsList.offsetTop;
        var optionBottomScroll = optionTopScroll + optionElement.offsetHeight;
        if (optionBottomScroll > optionsList.offsetHeight + optionsList.scrollTop) {
          optionsList.scrollTop = optionBottomScroll - optionsList.offsetHeight;
        } else if (optionTopScroll < optionsList.scrollTop) {
          optionsList.scrollTop = optionTopScroll;
        }
      },

      onTriggerFocus: function onTriggerFocus(_, event) {
        this.send('activate');
        var action = this.get('onfocus');
        if (action) {
          action(this.publicAPI, event);
        }
      },

      onFocus: function onFocus(event) {
        this.send('activate');
        var action = this.get('onfocus');
        if (action) {
          action(this.publicAPI, event);
        }
      },

      activate: function activate() {
        (0, _emberMetalSet['default'])(this.publicAPI, 'isActive', true);
      },

      deactivate: function deactivate() {
        (0, _emberMetalSet['default'])(this.publicAPI, 'isActive', false);
      }
    },

    // Methods
    filter: function filter(options, term) {
      var skipDisabled = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      return (0, _emberPowerSelectUtilsGroupUtils.filterOptions)(options || [], term, this.get('optionMatcher'), skipDisabled);
    },

    updateOptions: function updateOptions(options) {
      if (!options) {
        return;
      }
      if (options && options.addObserver) {
        options.addObserver('[]', this, this._updateOptionsAndResults);
      }
      this._updateOptionsAndResults(options);
    },

    updateSelection: function updateSelection(selection) {
      if ((0, _emberArrayUtils.isEmberArray)(selection)) {
        if (selection && selection.addObserver) {
          selection.addObserver('[]', this, this._updateSelectedArray);
        }
        this._updateSelectedArray(selection);
      } else if (selection !== this.publicAPI.selected) {
        (0, _emberMetalSet.setProperties)(this.publicAPI, { selected: selection, highlighted: selection });
      }
    },

    resetHighlighted: function resetHighlighted() {
      var highlighted = defaultHighlighted(this.publicAPI.results, this.publicAPI.highlighted || this.publicAPI.selected);
      (0, _emberMetalSet['default'])(this.publicAPI, 'highlighted', highlighted);
    },

    buildSelection: function buildSelection(option /*, select */) {
      return option;
    },

    _updateOptionsAndResults: function _updateOptionsAndResults(opts) {
      if ((0, _emberMetalGet['default'])(this, 'isDestroyed')) {
        return;
      }
      var options = toPlainArray(opts);
      if (this.getAttr('search')) {
        // external search
        (0, _emberMetalSet.setProperties)(this.publicAPI, { options: options, results: options, resultsCount: (0, _emberPowerSelectUtilsGroupUtils.countOptions)(options), loading: false });
      } else {
        // filter
        var results = (0, _emberUtils.isBlank)(this.publicAPI.searchText) ? options : this.filter(options, this.publicAPI.searchText);
        (0, _emberMetalSet.setProperties)(this.publicAPI, { results: results, options: options, resultsCount: (0, _emberPowerSelectUtilsGroupUtils.countOptions)(results), loading: false });
        if (this.publicAPI.isOpen) {
          this.resetHighlighted();
        }
      }
    },

    _updateSelectedArray: function _updateSelectedArray(selection) {
      if ((0, _emberMetalGet['default'])(this, 'isDestroyed')) {
        return;
      }
      (0, _emberMetalSet['default'])(this.publicAPI, 'selected', toPlainArray(selection));
    },

    _resetSearch: function _resetSearch() {
      var results = this.publicAPI.options;
      this.activeSearch = null;
      (0, _emberMetalSet.setProperties)(this.publicAPI, {
        results: results,
        searchText: '',
        lastSearchedText: '',
        resultsCount: (0, _emberPowerSelectUtilsGroupUtils.countOptions)(results),
        loading: false
      });
    },

    _performFilter: function _performFilter(term) {
      var results = this.filter(this.publicAPI.options, term);
      (0, _emberMetalSet.setProperties)(this.publicAPI, { results: results, searchText: term, lastSearchedText: term, resultsCount: (0, _emberPowerSelectUtilsGroupUtils.countOptions)(results) });
      this.resetHighlighted();
    },

    _performSearch: function _performSearch(term) {
      var _this4 = this;

      var searchAction = this.getAttr('search');
      (0, _emberMetalSet['default'])(this.publicAPI, 'searchText', term);
      var search = searchAction(term, this.publicAPI);
      if (!search) {
        (0, _emberMetalSet['default'])(this.publicAPI, 'lastSearchedText', term);
      } else if (search.then) {
        (0, _emberMetalSet['default'])(this.publicAPI, 'loading', true);
        this.activeSearch = search;
        search.then(function (results) {
          if (_this4.activeSearch === search) {
            var resultsArray = toPlainArray(results);
            (0, _emberMetalSet.setProperties)(_this4.publicAPI, {
              results: resultsArray,
              lastSearchedText: term,
              resultsCount: (0, _emberPowerSelectUtilsGroupUtils.countOptions)(results),
              loading: false
            });
            _this4.resetHighlighted();
          }
        }, function () {
          if (_this4.activeSearch === search) {
            (0, _emberMetalSet.setProperties)(_this4.publicAPI, { lastSearchedText: term, loading: false });
          }
        });
      } else {
        var resultsArray = toPlainArray(search);
        (0, _emberMetalSet.setProperties)(this.publicAPI, { results: resultsArray, lastSearchedText: term, resultsCount: (0, _emberPowerSelectUtilsGroupUtils.countOptions)(resultsArray) });
        this.resetHighlighted();
      }
    },

    _routeKeydown: function _routeKeydown(e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        // Up & Down
        return this._handleKeyUpDown(e);
      } else if (e.keyCode === 13) {
        // ENTER
        return this._handleKeyEnter(e);
      } else if (e.keyCode === 9) {
        // Tab
        return this._handleKeyTab(e);
      } else if (e.keyCode === 27) {
        // ESC
        return this._handleKeyESC(e);
      }
    },

    _handleKeyUpDown: function _handleKeyUpDown(e) {
      if (this.publicAPI.isOpen) {
        e.preventDefault();
        e.stopPropagation();
        var step = e.keyCode === 40 ? 1 : -1;
        var newHighlighted = advanceSelectableOption(this.publicAPI.results, this.publicAPI.highlighted, step);
        this.publicAPI.actions.highlight(newHighlighted, e);
        this.publicAPI.actions.scrollTo(newHighlighted);
      } else {
        this.publicAPI.actions.open(e);
      }
    },

    _handleKeyEnter: function _handleKeyEnter(e) {
      if (this.publicAPI.isOpen && this.publicAPI.highlighted !== undefined) {
        this.publicAPI.actions.choose(this.publicAPI.highlighted, e);
        return false;
      }
    },

    _handleKeySpace: function _handleKeySpace(e) {
      if (this.publicAPI.isOpen && this.publicAPI.highlighted !== undefined) {
        this.publicAPI.actions.choose(this.publicAPI.highlighted, e);
        return false;
      }
    },

    _handleKeyTab: function _handleKeyTab(e) {
      this.publicAPI.actions.close(e);
    },

    _handleKeyESC: function _handleKeyESC(e) {
      this.publicAPI.actions.close(e);
    },

    _handleTriggerTyping: function _handleTriggerTyping(e) {
      var term = this.expirableSearchText + String.fromCharCode(e.keyCode);
      this.expirableSearchText = term;
      this.expirableSearchDebounceId = (0, _emberRunloop.debounce)(this, 'set', 'expirableSearchText', '', 1000);
      var matches = this.filter(this.publicAPI.options, term, true);
      if ((0, _emberMetalGet['default'])(matches, 'length') === 0) {
        return;
      }
      var firstMatch = (0, _emberPowerSelectUtilsGroupUtils.optionAtIndex)(matches, 0);
      if (firstMatch !== undefined) {
        if (this.publicAPI.isOpen) {
          this.publicAPI.actions.highlight(firstMatch.option, e);
          this.publicAPI.actions.scrollTo(firstMatch.option, e);
        } else {
          this.publicAPI.actions.select(firstMatch.option, e);
        }
      }
    }
  });
});
define('ember-power-select/helpers/ember-power-select-is-selected', ['exports', 'ember-helper', 'ember-array/utils'], function (exports, _emberHelper, _emberArrayUtils) {
  'use strict';

  var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  })();

  exports.emberPowerSelectIsSelected = emberPowerSelectIsSelected;

  // TODO: Make it private or scoped to the component

  function emberPowerSelectIsSelected(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 2);

    var option = _ref2[0];
    var selected = _ref2[1];

    return (0, _emberArrayUtils.isEmberArray)(selected) ? selected.indexOf(option) > -1 : option === selected;
  }

  exports['default'] = (0, _emberHelper.helper)(emberPowerSelectIsSelected);
});
define('ember-power-select/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-helper'], function (exports, _emberHelper) {
  'use strict';

  var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  })();

  exports.emberPowerSelectTrueStringIfPresent = emberPowerSelectTrueStringIfPresent;

  function emberPowerSelectTrueStringIfPresent(_ref /*, hash*/) {
    var _ref2 = _slicedToArray(_ref, 1);

    var bool = _ref2[0];

    return bool ? 'true' : false;
  }

  exports['default'] = (0, _emberHelper.helper)(emberPowerSelectTrueStringIfPresent);
});
define("ember-power-select/templates/components/power-select/before-options", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/before-options.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "ember-power-select-search");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("input");
          dom.setAttribute(el2, "type", "search");
          dom.setAttribute(el2, "autocomplete", "off");
          dom.setAttribute(el2, "autocorrect", "off");
          dom.setAttribute(el2, "autocapitalize", "off");
          dom.setAttribute(el2, "spellcheck", "false");
          dom.setAttribute(el2, "role", "combobox");
          dom.setAttribute(el2, "class", "ember-power-select-search-input");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(7);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createAttrMorph(element0, 'aria-controls');
          morphs[2] = dom.createAttrMorph(element0, 'placeholder');
          morphs[3] = dom.createAttrMorph(element0, 'oninput');
          morphs[4] = dom.createAttrMorph(element0, 'onfocus');
          morphs[5] = dom.createAttrMorph(element0, 'onblur');
          morphs[6] = dom.createAttrMorph(element0, 'onkeydown');
          return morphs;
        },
        statements: [["attribute", "value", ["get", "select.searchText", ["loc", [null, [7, 14], [7, 31]]]]], ["attribute", "aria-controls", ["get", "listboxId", ["loc", [null, [8, 22], [8, 31]]]]], ["attribute", "placeholder", ["get", "searchPlaceholder", ["loc", [null, [9, 20], [9, 37]]]]], ["attribute", "oninput", ["get", "onInput", ["loc", [null, [10, 16], [10, 23]]]]], ["attribute", "onfocus", ["get", "onFocus", ["loc", [null, [11, 16], [11, 23]]]]], ["attribute", "onblur", ["get", "onBlur", ["loc", [null, [12, 15], [12, 21]]]]], ["attribute", "onkeydown", ["subexpr", "action", ["onKeydown"], [], ["loc", [null, [13, 16], [13, 38]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 7
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select/before-options.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "searchEnabled", ["loc", [null, [1, 6], [1, 19]]]]], [], 0, null, ["loc", [null, [1, 0], [15, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("ember-power-select/templates/components/power-select/options", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "ember-power-select-option ember-power-select-option--loading-message");
            dom.setAttribute(el1, "role", "option");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "loadingMessage", ["loc", [null, [3, 99], [3, 117]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "loadingMessage", ["loc", [null, [2, 8], [2, 22]]]]], [], 0, null, ["loc", [null, [2, 2], [4, 9]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 10,
                  "column": 6
                },
                "end": {
                  "line": 18,
                  "column": 6
                }
              },
              "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "yield", [["get", "option", ["loc", [null, [17, 16], [17, 22]]]], ["get", "select", ["loc", [null, [17, 23], [17, 29]]]]], [], ["loc", [null, [17, 8], [17, 31]]]]],
            locals: ["option"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 2
              },
              "end": {
                "line": 20,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "ember-power-select-group");
            dom.setAttribute(el1, "role", "option");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "ember-power-select-group-name");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element1, 'aria-disabled');
            morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]), 0, 0);
            morphs[2] = dom.createMorphAt(element1, 3, 3);
            return morphs;
          },
          statements: [["attribute", "aria-disabled", ["subexpr", "ember-power-select-true-string-if-present", [["get", "opt.disabled", ["loc", [null, [8, 99], [8, 111]]]]], [], ["loc", [null, [8, 55], [8, 113]]]]], ["content", "opt.groupName", ["loc", [null, [9, 50], [9, 67]]]], ["block", "component", [["get", "optionsComponent", ["loc", [null, [10, 19], [10, 35]]]]], ["options", ["subexpr", "readonly", [["get", "opt.options", ["loc", [null, [11, 26], [11, 37]]]]], [], ["loc", [null, [11, 16], [11, 38]]]], "select", ["subexpr", "readonly", [["get", "select", ["loc", [null, [12, 25], [12, 31]]]]], [], ["loc", [null, [12, 15], [12, 32]]]], "groupIndex", ["subexpr", "concat", [["get", "groupIndex", ["loc", [null, [13, 27], [13, 37]]]], ["get", "index", ["loc", [null, [13, 38], [13, 43]]]], "."], [], ["loc", [null, [13, 19], [13, 48]]]], "optionsComponent", ["subexpr", "readonly", [["get", "optionsComponent", ["loc", [null, [14, 35], [14, 51]]]]], [], ["loc", [null, [14, 25], [14, 52]]]], "role", "group", "class", "ember-power-select-options"], 0, null, ["loc", [null, [10, 6], [18, 20]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 2
              },
              "end": {
                "line": 29,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "ember-power-select-option");
            dom.setAttribute(el1, "role", "option");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(5);
            morphs[0] = dom.createAttrMorph(element0, 'aria-selected');
            morphs[1] = dom.createAttrMorph(element0, 'aria-disabled');
            morphs[2] = dom.createAttrMorph(element0, 'aria-current');
            morphs[3] = dom.createAttrMorph(element0, 'data-option-index');
            morphs[4] = dom.createMorphAt(element0, 1, 1);
            return morphs;
          },
          statements: [["attribute", "aria-selected", ["concat", [["subexpr", "ember-power-select-is-selected", [["get", "opt", ["loc", [null, [22, 54], [22, 57]]]], ["get", "select.selected", ["loc", [null, [22, 58], [22, 73]]]]], [], ["loc", [null, [22, 21], [22, 75]]]]]]], ["attribute", "aria-disabled", ["subexpr", "ember-power-select-true-string-if-present", [["get", "opt.disabled", ["loc", [null, [23, 64], [23, 76]]]]], [], ["loc", [null, [23, 20], [23, 78]]]]], ["attribute", "aria-current", ["concat", [["subexpr", "eq", [["get", "opt", ["loc", [null, [24, 25], [24, 28]]]], ["get", "select.highlighted", ["loc", [null, [24, 29], [24, 47]]]]], [], ["loc", [null, [24, 20], [24, 49]]]]]]], ["attribute", "data-option-index", ["concat", [["get", "groupIndex", ["loc", [null, [25, 27], [25, 37]]]], ["get", "index", ["loc", [null, [25, 41], [25, 46]]]]]]], ["inline", "yield", [["get", "opt", ["loc", [null, [27, 14], [27, 17]]]], ["get", "select", ["loc", [null, [27, 18], [27, 24]]]]], [], ["loc", [null, [27, 6], [27, 26]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 30,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "opt.groupName", ["loc", [null, [7, 8], [7, 21]]]]], [], 0, 1, ["loc", [null, [7, 2], [29, 9]]]]],
        locals: ["opt", "index"],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 31,
            "column": 0
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select/options.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "select.loading", ["loc", [null, [1, 6], [1, 20]]]]], [], 0, null, ["loc", [null, [1, 0], [5, 7]]]], ["block", "each", [["get", "options", ["loc", [null, [6, 8], [6, 15]]]]], [], 1, null, ["loc", [null, [6, 0], [30, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-power-select/templates/components/power-select/trigger", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "component", [["get", "selectedItemComponent", ["loc", [null, [3, 16], [3, 37]]]]], ["option", ["subexpr", "readonly", [["get", "select.selected", ["loc", [null, [3, 55], [3, 70]]]]], [], ["loc", [null, [3, 45], [3, 71]]]], "select", ["subexpr", "readonly", [["get", "select", ["loc", [null, [3, 89], [3, 95]]]]], [], ["loc", [null, [3, 79], [3, 96]]]]], ["loc", [null, [3, 4], [3, 98]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "ember-power-select-selected-item");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "select.selected", ["loc", [null, [5, 59], [5, 74]]]], ["get", "select", ["loc", [null, [5, 75], [5, 81]]]]], [], ["loc", [null, [5, 51], [5, 83]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 2
              },
              "end": {
                "line": 9,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "ember-power-select-clear-btn");
            var el2 = dom.createTextNode("×");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'onmousedown');
            return morphs;
          },
          statements: [["attribute", "onmousedown", ["subexpr", "action", ["clear"], [], ["loc", [null, [8, 59], [8, 77]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "selectedItemComponent", ["loc", [null, [2, 8], [2, 29]]]]], [], 0, 1, ["loc", [null, [2, 2], [6, 9]]]], ["block", "if", [["subexpr", "and", [["get", "allowClear", ["loc", [null, [7, 13], [7, 23]]]], ["subexpr", "not", [["get", "select.disabled", ["loc", [null, [7, 29], [7, 44]]]]], [], ["loc", [null, [7, 24], [7, 45]]]]], [], ["loc", [null, [7, 8], [7, 46]]]]], [], 2, null, ["loc", [null, [7, 2], [9, 9]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 0
              },
              "end": {
                "line": 12,
                "column": 0
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "ember-power-select-placeholder");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "placeholder", ["loc", [null, [11, 47], [11, 62]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "placeholder", ["loc", [null, [10, 10], [10, 21]]]]], [], 0, null, ["loc", [null, [10, 0], [12, 0]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 52
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select/trigger.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "ember-power-select-status-icon");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "select.selected", ["loc", [null, [1, 6], [1, 21]]]]], [], 0, 1, ["loc", [null, [1, 0], [12, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-power-select/templates/components/power-select-multiple/trigger", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 11,
                "column": 6
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "role", "button");
            dom.setAttribute(el1, "aria-label", "remove element");
            dom.setAttribute(el1, "class", "ember-power-select-multiple-remove-btn");
            var el2 = dom.createTextNode("\n          ×\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element1, 'data-selected-index');
            return morphs;
          },
          statements: [["attribute", "data-selected-index", ["get", "idx", ["loc", [null, [8, 32], [8, 35]]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 6
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "component", [["get", "selectedItemComponent", ["loc", [null, [13, 20], [13, 41]]]]], ["option", ["subexpr", "readonly", [["get", "opt", ["loc", [null, [13, 59], [13, 62]]]]], [], ["loc", [null, [13, 49], [13, 63]]]], "select", ["subexpr", "readonly", [["get", "select", ["loc", [null, [13, 81], [13, 87]]]]], [], ["loc", [null, [13, 71], [13, 88]]]]], ["loc", [null, [13, 8], [13, 90]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 6
              },
              "end": {
                "line": 16,
                "column": 6
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "opt", ["loc", [null, [15, 16], [15, 19]]]], ["get", "select", ["loc", [null, [15, 20], [15, 26]]]]], [], ["loc", [null, [15, 8], [15, 28]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 18,
              "column": 2
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "ember-power-select-multiple-option");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element2, 1, 1);
          morphs[1] = dom.createMorphAt(element2, 2, 2);
          return morphs;
        },
        statements: [["block", "unless", [["get", "select.disabled", ["loc", [null, [4, 16], [4, 31]]]]], [], 0, null, ["loc", [null, [4, 6], [11, 17]]]], ["block", "if", [["get", "selectedItemComponent", ["loc", [null, [12, 12], [12, 33]]]]], [], 1, 2, ["loc", [null, [12, 6], [16, 13]]]]],
        locals: ["opt", "idx"],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 2
            },
            "end": {
              "line": 32,
              "column": 2
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("input");
          dom.setAttribute(el1, "type", "search");
          dom.setAttribute(el1, "class", "ember-power-select-trigger-multiple-input");
          dom.setAttribute(el1, "tabindex", "0");
          dom.setAttribute(el1, "autocomplete", "off");
          dom.setAttribute(el1, "autocorrect", "off");
          dom.setAttribute(el1, "autocapitalize", "off");
          dom.setAttribute(el1, "spellcheck", "false");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(10);
          morphs[0] = dom.createAttrMorph(element0, 'id');
          morphs[1] = dom.createAttrMorph(element0, 'value');
          morphs[2] = dom.createAttrMorph(element0, 'aria-controls');
          morphs[3] = dom.createAttrMorph(element0, 'style');
          morphs[4] = dom.createAttrMorph(element0, 'placeholder');
          morphs[5] = dom.createAttrMorph(element0, 'disabled');
          morphs[6] = dom.createAttrMorph(element0, 'oninput');
          morphs[7] = dom.createAttrMorph(element0, 'onFocus');
          morphs[8] = dom.createAttrMorph(element0, 'onBlur');
          morphs[9] = dom.createAttrMorph(element0, 'onkeydown');
          return morphs;
        },
        statements: [["attribute", "id", ["concat", ["ember-power-select-trigger-multiple-input-", ["get", "select._id", ["loc", [null, [22, 54], [22, 64]]]]]]], ["attribute", "value", ["get", "select.searchText", ["loc", [null, [23, 14], [23, 31]]]]], ["attribute", "aria-controls", ["get", "listboxId", ["loc", [null, [24, 22], [24, 31]]]]], ["attribute", "style", ["get", "triggerMultipleInputStyle", ["loc", [null, [25, 14], [25, 39]]]]], ["attribute", "placeholder", ["get", "maybePlaceholder", ["loc", [null, [26, 20], [26, 36]]]]], ["attribute", "disabled", ["get", "select.disabled", ["loc", [null, [27, 17], [27, 32]]]]], ["attribute", "oninput", ["subexpr", "action", ["onInput"], [], ["loc", [null, [28, 14], [28, 34]]]]], ["attribute", "onFocus", ["get", "activate", ["loc", [null, [29, 16], [29, 24]]]]], ["attribute", "onBlur", ["get", "onBlur", ["loc", [null, [30, 15], [30, 21]]]]], ["attribute", "onkeydown", ["subexpr", "action", ["onKeydown"], [], ["loc", [null, [31, 16], [31, 38]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 52
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select-multiple/trigger.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "ember-power-select-multiple-options");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "ember-power-select-status-icon");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element3, 'id');
        morphs[1] = dom.createMorphAt(element3, 1, 1);
        morphs[2] = dom.createMorphAt(element3, 2, 2);
        return morphs;
      },
      statements: [["attribute", "id", ["concat", ["ember-power-select-multiple-options-", ["get", "select._id", ["loc", [null, [1, 46], [1, 56]]]]]]], ["block", "each", [["get", "select.selected", ["loc", [null, [2, 10], [2, 25]]]]], [], 0, null, ["loc", [null, [2, 2], [18, 11]]]], ["block", "if", [["get", "searchEnabled", ["loc", [null, [19, 8], [19, 21]]]]], [], 1, null, ["loc", [null, [19, 2], [32, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-power-select/templates/components/power-select-multiple", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 49,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
          },
          isEmpty: false,
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "option", ["loc", [null, [48, 12], [48, 18]]]], ["get", "select", ["loc", [null, [48, 19], [48, 25]]]]], [], ["loc", [null, [48, 4], [48, 27]]]]],
          locals: ["option", "select"],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 49,
                "column": 2
              },
              "end": {
                "line": 51,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [], ["to", "inverse"], ["loc", [null, [50, 4], [50, 26]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 52,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "power-select", [], ["afterOptionsComponent", ["subexpr", "@mut", [["get", "afterOptionsComponent", ["loc", [null, [3, 26], [3, 47]]]]], [], []], "allowClear", ["subexpr", "@mut", [["get", "allowClear", ["loc", [null, [4, 15], [4, 25]]]]], [], []], "ariaDescribedBy", ["subexpr", "@mut", [["get", "ariaDescribedBy", ["loc", [null, [5, 20], [5, 35]]]]], [], []], "ariaInvalid", ["subexpr", "@mut", [["get", "ariaInvalid", ["loc", [null, [6, 16], [6, 27]]]]], [], []], "ariaLabel", ["subexpr", "@mut", [["get", "ariaLabel", ["loc", [null, [7, 14], [7, 23]]]]], [], []], "ariaLabelledBy", ["subexpr", "@mut", [["get", "ariaLabelledBy", ["loc", [null, [8, 19], [8, 33]]]]], [], []], "beforeOptionsComponent", ["subexpr", "@mut", [["get", "beforeOptionsComponent", ["loc", [null, [9, 27], [9, 49]]]]], [], []], "buildSelection", ["subexpr", "action", ["buildSelection"], [], ["loc", [null, [10, 19], [10, 44]]]], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [11, 10], [11, 15]]]]], [], []], "closeOnSelect", ["subexpr", "@mut", [["get", "closeOnSelect", ["loc", [null, [12, 18], [12, 31]]]]], [], []], "destination", ["subexpr", "@mut", [["get", "destination", ["loc", [null, [13, 16], [13, 27]]]]], [], []], "dir", ["subexpr", "@mut", [["get", "dir", ["loc", [null, [14, 8], [14, 11]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [15, 13], [15, 21]]]]], [], []], "dropdownClass", ["subexpr", "@mut", [["get", "dropdownClass", ["loc", [null, [16, 18], [16, 31]]]]], [], []], "extra", ["subexpr", "@mut", [["get", "extra", ["loc", [null, [17, 10], [17, 15]]]]], [], []], "horizontalPosition", ["subexpr", "@mut", [["get", "horizontalPosition", ["loc", [null, [18, 23], [18, 41]]]]], [], []], "initiallyOpened", ["subexpr", "@mut", [["get", "initiallyOpened", ["loc", [null, [19, 20], [19, 35]]]]], [], []], "loadingMessage", ["subexpr", "@mut", [["get", "loadingMessage", ["loc", [null, [20, 19], [20, 33]]]]], [], []], "matcher", ["subexpr", "@mut", [["get", "matcher", ["loc", [null, [21, 12], [21, 19]]]]], [], []], "matchTriggerWidth", ["subexpr", "@mut", [["get", "matchTriggerWidth", ["loc", [null, [22, 22], [22, 39]]]]], [], []], "noMatchesMessage", ["subexpr", "@mut", [["get", "noMatchesMessage", ["loc", [null, [23, 21], [23, 37]]]]], [], []], "onchange", ["subexpr", "@mut", [["get", "onchange", ["loc", [null, [24, 13], [24, 21]]]]], [], []], "onclose", ["subexpr", "@mut", [["get", "onclose", ["loc", [null, [25, 12], [25, 19]]]]], [], []], "onfocus", ["subexpr", "action", ["handleFocus"], [], ["loc", [null, [26, 12], [26, 34]]]], "oninput", ["subexpr", "@mut", [["get", "oninput", ["loc", [null, [27, 12], [27, 19]]]]], [], []], "onkeydown", ["subexpr", "action", ["handleKeydown"], [], ["loc", [null, [28, 14], [28, 38]]]], "onopen", ["subexpr", "action", ["handleOpen"], [], ["loc", [null, [29, 11], [29, 32]]]], "options", ["subexpr", "@mut", [["get", "options", ["loc", [null, [30, 12], [30, 19]]]]], [], []], "optionsComponent", ["subexpr", "@mut", [["get", "optionsComponent", ["loc", [null, [31, 21], [31, 37]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [32, 16], [32, 27]]]]], [], []], "registerAPI", ["subexpr", "readonly", [["get", "registerAPI", ["loc", [null, [33, 26], [33, 37]]]]], [], ["loc", [null, [33, 16], [33, 38]]]], "renderInPlace", ["subexpr", "@mut", [["get", "renderInPlace", ["loc", [null, [34, 18], [34, 31]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [35, 13], [35, 21]]]]], [], []], "search", ["subexpr", "@mut", [["get", "search", ["loc", [null, [36, 11], [36, 17]]]]], [], []], "searchEnabled", ["subexpr", "@mut", [["get", "searchEnabled", ["loc", [null, [37, 18], [37, 31]]]]], [], []], "searchField", ["subexpr", "@mut", [["get", "searchField", ["loc", [null, [38, 16], [38, 27]]]]], [], []], "searchMessage", ["subexpr", "@mut", [["get", "searchMessage", ["loc", [null, [39, 18], [39, 31]]]]], [], []], "searchPlaceholder", ["subexpr", "@mut", [["get", "searchPlaceholder", ["loc", [null, [40, 22], [40, 39]]]]], [], []], "selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [41, 13], [41, 21]]]]], [], []], "selectedItemComponent", ["subexpr", "@mut", [["get", "selectedItemComponent", ["loc", [null, [42, 26], [42, 47]]]]], [], []], "tabindex", ["subexpr", "@mut", [["get", "tabindex", ["loc", [null, [43, 13], [43, 21]]]]], [], []], "triggerClass", ["subexpr", "@mut", [["get", "concatenatedTriggerClass", ["loc", [null, [44, 17], [44, 41]]]]], [], []], "triggerComponent", ["subexpr", "@mut", [["get", "triggerComponent", ["loc", [null, [45, 21], [45, 37]]]]], [], []], "verticalPosition", ["subexpr", "@mut", [["get", "verticalPosition", ["loc", [null, [46, 21], [46, 37]]]]], [], []]], 0, 1, ["loc", [null, [2, 2], [51, 19]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 53,
                "column": 2
              },
              "end": {
                "line": 100,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
          },
          isEmpty: false,
          arity: 2,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [["get", "option", ["loc", [null, [99, 12], [99, 18]]]], ["get", "select", ["loc", [null, [99, 19], [99, 25]]]]], [], ["loc", [null, [99, 4], [99, 27]]]]],
          locals: ["option", "select"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 52,
              "column": 0
            },
            "end": {
              "line": 101,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "power-select", [], ["afterOptionsComponent", ["subexpr", "@mut", [["get", "afterOptionsComponent", ["loc", [null, [54, 26], [54, 47]]]]], [], []], "allowClear", ["subexpr", "@mut", [["get", "allowClear", ["loc", [null, [55, 15], [55, 25]]]]], [], []], "ariaDescribedBy", ["subexpr", "@mut", [["get", "ariaDescribedBy", ["loc", [null, [56, 20], [56, 35]]]]], [], []], "ariaInvalid", ["subexpr", "@mut", [["get", "ariaInvalid", ["loc", [null, [57, 16], [57, 27]]]]], [], []], "ariaLabel", ["subexpr", "@mut", [["get", "ariaLabel", ["loc", [null, [58, 14], [58, 23]]]]], [], []], "ariaLabelledBy", ["subexpr", "@mut", [["get", "ariaLabelledBy", ["loc", [null, [59, 19], [59, 33]]]]], [], []], "beforeOptionsComponent", ["subexpr", "@mut", [["get", "beforeOptionsComponent", ["loc", [null, [60, 27], [60, 49]]]]], [], []], "buildSelection", ["subexpr", "action", ["buildSelection"], [], ["loc", [null, [61, 19], [61, 44]]]], "class", ["subexpr", "@mut", [["get", "class", ["loc", [null, [62, 10], [62, 15]]]]], [], []], "closeOnSelect", ["subexpr", "@mut", [["get", "closeOnSelect", ["loc", [null, [63, 18], [63, 31]]]]], [], []], "destination", ["subexpr", "@mut", [["get", "destination", ["loc", [null, [64, 16], [64, 27]]]]], [], []], "dir", ["subexpr", "@mut", [["get", "dir", ["loc", [null, [65, 8], [65, 11]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [66, 13], [66, 21]]]]], [], []], "dropdownClass", ["subexpr", "@mut", [["get", "dropdownClass", ["loc", [null, [67, 18], [67, 31]]]]], [], []], "extra", ["subexpr", "@mut", [["get", "extra", ["loc", [null, [68, 10], [68, 15]]]]], [], []], "horizontalPosition", ["subexpr", "@mut", [["get", "horizontalPosition", ["loc", [null, [69, 23], [69, 41]]]]], [], []], "initiallyOpened", ["subexpr", "@mut", [["get", "initiallyOpened", ["loc", [null, [70, 20], [70, 35]]]]], [], []], "loadingMessage", ["subexpr", "@mut", [["get", "loadingMessage", ["loc", [null, [71, 19], [71, 33]]]]], [], []], "matcher", ["subexpr", "@mut", [["get", "matcher", ["loc", [null, [72, 12], [72, 19]]]]], [], []], "matchTriggerWidth", ["subexpr", "@mut", [["get", "matchTriggerWidth", ["loc", [null, [73, 22], [73, 39]]]]], [], []], "noMatchesMessage", ["subexpr", "@mut", [["get", "noMatchesMessage", ["loc", [null, [74, 21], [74, 37]]]]], [], []], "onchange", ["subexpr", "@mut", [["get", "onchange", ["loc", [null, [75, 13], [75, 21]]]]], [], []], "onclose", ["subexpr", "@mut", [["get", "onclose", ["loc", [null, [76, 12], [76, 19]]]]], [], []], "onfocus", ["subexpr", "action", ["handleFocus"], [], ["loc", [null, [77, 12], [77, 34]]]], "oninput", ["subexpr", "@mut", [["get", "oninput", ["loc", [null, [78, 12], [78, 19]]]]], [], []], "onkeydown", ["subexpr", "action", ["handleKeydown"], [], ["loc", [null, [79, 14], [79, 38]]]], "onopen", ["subexpr", "action", ["handleOpen"], [], ["loc", [null, [80, 11], [80, 32]]]], "options", ["subexpr", "@mut", [["get", "options", ["loc", [null, [81, 12], [81, 19]]]]], [], []], "optionsComponent", ["subexpr", "@mut", [["get", "optionsComponent", ["loc", [null, [82, 21], [82, 37]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [83, 16], [83, 27]]]]], [], []], "registerAPI", ["subexpr", "readonly", [["get", "registerAPI", ["loc", [null, [84, 26], [84, 37]]]]], [], ["loc", [null, [84, 16], [84, 38]]]], "renderInPlace", ["subexpr", "@mut", [["get", "renderInPlace", ["loc", [null, [85, 18], [85, 31]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [86, 13], [86, 21]]]]], [], []], "search", ["subexpr", "@mut", [["get", "search", ["loc", [null, [87, 11], [87, 17]]]]], [], []], "searchEnabled", ["subexpr", "@mut", [["get", "searchEnabled", ["loc", [null, [88, 18], [88, 31]]]]], [], []], "searchField", ["subexpr", "@mut", [["get", "searchField", ["loc", [null, [89, 16], [89, 27]]]]], [], []], "searchMessage", ["subexpr", "@mut", [["get", "searchMessage", ["loc", [null, [90, 18], [90, 31]]]]], [], []], "searchPlaceholder", ["subexpr", "@mut", [["get", "searchPlaceholder", ["loc", [null, [91, 22], [91, 39]]]]], [], []], "selected", ["subexpr", "@mut", [["get", "selected", ["loc", [null, [92, 13], [92, 21]]]]], [], []], "selectedItemComponent", ["subexpr", "@mut", [["get", "selectedItemComponent", ["loc", [null, [93, 26], [93, 47]]]]], [], []], "tabindex", ["subexpr", "@mut", [["get", "tabindex", ["loc", [null, [94, 13], [94, 21]]]]], [], []], "triggerClass", ["subexpr", "@mut", [["get", "concatenatedTriggerClass", ["loc", [null, [95, 17], [95, 41]]]]], [], []], "triggerComponent", ["subexpr", "@mut", [["get", "triggerComponent", ["loc", [null, [96, 21], [96, 37]]]]], [], []], "verticalPosition", ["subexpr", "@mut", [["get", "verticalPosition", ["loc", [null, [97, 21], [97, 37]]]]], [], []]], 0, null, ["loc", [null, [53, 2], [100, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 102,
            "column": 0
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select-multiple.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["subexpr", "hasBlock", ["inverse"], [], ["loc", [null, [1, 6], [1, 26]]]]], [], 0, 1, ["loc", [null, [1, 0], [101, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-power-select/templates/components/power-select", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 24,
                  "column": 4
                },
                "end": {
                  "line": 41,
                  "column": 4
                }
              },
              "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
            },
            isEmpty: false,
            arity: 2,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "yield", [["get", "opt", ["loc", [null, [40, 14], [40, 17]]]], ["get", "term", ["loc", [null, [40, 18], [40, 22]]]]], [], ["loc", [null, [40, 6], [40, 24]]]]],
            locals: ["opt", "term"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 2
              },
              "end": {
                "line": 43,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            return morphs;
          },
          statements: [["block", "component", [["get", "triggerComponent", ["loc", [null, [24, 17], [24, 33]]]]], ["allowClear", ["subexpr", "readonly", [["get", "allowClear", ["loc", [null, [25, 27], [25, 37]]]]], [], ["loc", [null, [25, 17], [25, 38]]]], "buildSelection", ["subexpr", "readonly", [["get", "buildSelection", ["loc", [null, [26, 31], [26, 45]]]]], [], ["loc", [null, [26, 21], [26, 46]]]], "extra", ["subexpr", "readonly", [["get", "extra", ["loc", [null, [27, 22], [27, 27]]]]], [], ["loc", [null, [27, 12], [27, 28]]]], "listboxId", ["subexpr", "readonly", [["get", "optionsId", ["loc", [null, [28, 26], [28, 35]]]]], [], ["loc", [null, [28, 16], [28, 36]]]], "onFocus", ["subexpr", "action", ["onFocus"], [], ["loc", [null, [29, 14], [29, 32]]]], "activate", ["subexpr", "action", ["activate"], [], ["loc", [null, [30, 15], [30, 34]]]], "onBlur", ["subexpr", "action", ["deactivate"], [], ["loc", [null, [31, 13], [31, 34]]]], "onInput", ["subexpr", "action", ["onInput"], [], ["loc", [null, [32, 14], [32, 32]]]], "placeholder", ["subexpr", "readonly", [["get", "placeholder", ["loc", [null, [33, 28], [33, 39]]]]], [], ["loc", [null, [33, 18], [33, 40]]]], "onKeydown", ["subexpr", "action", ["onKeydown"], [], ["loc", [null, [34, 16], [34, 36]]]], "searchEnabled", ["subexpr", "readonly", [["get", "searchEnabled", ["loc", [null, [35, 30], [35, 43]]]]], [], ["loc", [null, [35, 20], [35, 44]]]], "searchField", ["subexpr", "readonly", [["get", "searchField", ["loc", [null, [36, 28], [36, 39]]]]], [], ["loc", [null, [36, 18], [36, 40]]]], "select", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [37, 23], [37, 32]]]]], [], ["loc", [null, [37, 13], [37, 33]]]], "selectedItemComponent", ["subexpr", "readonly", [["get", "selectedItemComponent", ["loc", [null, [38, 38], [38, 59]]]]], [], ["loc", [null, [38, 28], [38, 60]]]]], 0, null, ["loc", [null, [24, 4], [41, 18]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 58,
                  "column": 4
                },
                "end": {
                  "line": 64,
                  "column": 4
                }
              },
              "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("ul");
              dom.setAttribute(el1, "class", "ember-power-select-options");
              dom.setAttribute(el1, "role", "listbox");
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("li");
              dom.setAttribute(el2, "class", "ember-power-select-option ember-power-select-option--search-message");
              dom.setAttribute(el2, "role", "option");
              var el3 = dom.createTextNode("\n          ");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n        ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n      ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
              return morphs;
            },
            statements: [["content", "searchMessage", ["loc", [null, [61, 10], [61, 27]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.1",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 65,
                      "column": 6
                    },
                    "end": {
                      "line": 67,
                      "column": 6
                    }
                  },
                  "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("        ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  return morphs;
                },
                statements: [["inline", "yield", [], ["to", "inverse"], ["loc", [null, [66, 8], [66, 30]]]]],
                locals: [],
                templates: []
              };
            })();
            var child1 = (function () {
              var child0 = (function () {
                return {
                  meta: {
                    "fragmentReason": false,
                    "revision": "Ember@2.6.1",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 67,
                        "column": 6
                      },
                      "end": {
                        "line": 73,
                        "column": 6
                      }
                    },
                    "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
                  },
                  isEmpty: false,
                  arity: 0,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("        ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createElement("ul");
                    dom.setAttribute(el1, "class", "ember-power-select-options");
                    dom.setAttribute(el1, "role", "listbox");
                    var el2 = dom.createTextNode("\n          ");
                    dom.appendChild(el1, el2);
                    var el2 = dom.createElement("li");
                    dom.setAttribute(el2, "class", "ember-power-select-option ember-power-select-option--no-matches-message");
                    dom.setAttribute(el2, "role", "option");
                    var el3 = dom.createTextNode("\n            ");
                    dom.appendChild(el2, el3);
                    var el3 = dom.createComment("");
                    dom.appendChild(el2, el3);
                    var el3 = dom.createTextNode("\n          ");
                    dom.appendChild(el2, el3);
                    dom.appendChild(el1, el2);
                    var el2 = dom.createTextNode("\n        ");
                    dom.appendChild(el1, el2);
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n      ");
                    dom.appendChild(el0, el1);
                    return el0;
                  },
                  buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
                    return morphs;
                  },
                  statements: [["content", "noMatchesMessage", ["loc", [null, [70, 12], [70, 32]]]]],
                  locals: [],
                  templates: []
                };
              })();
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.1",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 67,
                      "column": 6
                    },
                    "end": {
                      "line": 73,
                      "column": 6
                    }
                  },
                  "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                  dom.insertBoundary(fragment, 0);
                  dom.insertBoundary(fragment, null);
                  return morphs;
                },
                statements: [["block", "if", [["get", "noMatchesMessage", ["loc", [null, [67, 16], [67, 32]]]]], [], 0, null, ["loc", [null, [67, 6], [73, 6]]]]],
                locals: [],
                templates: [child0]
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.6.1",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 64,
                    "column": 4
                  },
                  "end": {
                    "line": 74,
                    "column": 4
                  }
                },
                "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [["block", "if", [["subexpr", "hasBlock", ["inverse"], [], ["loc", [null, [65, 12], [65, 32]]]]], [], 0, 1, ["loc", [null, [65, 6], [73, 13]]]]],
              locals: [],
              templates: [child0, child1]
            };
          })();
          var child1 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.6.1",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 75,
                      "column": 6
                    },
                    "end": {
                      "line": 85,
                      "column": 6
                    }
                  },
                  "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
                },
                isEmpty: false,
                arity: 2,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("        ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  return morphs;
                },
                statements: [["inline", "yield", [["get", "option", ["loc", [null, [84, 16], [84, 22]]]], ["get", "term", ["loc", [null, [84, 23], [84, 27]]]]], [], ["loc", [null, [84, 8], [84, 29]]]]],
                locals: ["option", "term"],
                templates: []
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.6.1",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 74,
                    "column": 4
                  },
                  "end": {
                    "line": 86,
                    "column": 4
                  }
                },
                "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("    ");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                dom.insertBoundary(fragment, 0);
                return morphs;
              },
              statements: [["block", "component", [["get", "optionsComponent", ["loc", [null, [75, 19], [75, 35]]]]], ["class", "ember-power-select-options", "groupIndex", "", "loadingMessage", ["subexpr", "readonly", [["get", "loadingMessage", ["loc", [null, [78, 33], [78, 47]]]]], [], ["loc", [null, [78, 23], [78, 48]]]], "id", ["subexpr", "readonly", [["get", "optionsId", ["loc", [null, [79, 21], [79, 30]]]]], [], ["loc", [null, [79, 11], [79, 31]]]], "options", ["subexpr", "readonly", [["get", "publicAPI.results", ["loc", [null, [80, 26], [80, 43]]]]], [], ["loc", [null, [80, 16], [80, 44]]]], "optionsComponent", ["subexpr", "readonly", [["get", "optionsComponent", ["loc", [null, [81, 35], [81, 51]]]]], [], ["loc", [null, [81, 25], [81, 52]]]], "select", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [82, 25], [82, 34]]]]], [], ["loc", [null, [82, 15], [82, 35]]]]], 0, null, ["loc", [null, [75, 6], [85, 20]]]]],
              locals: [],
              templates: [child0]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.6.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 64,
                  "column": 4
                },
                "end": {
                  "line": 86,
                  "column": 4
                }
              },
              "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["get", "mustShowNoMessages", ["loc", [null, [64, 14], [64, 32]]]]], [], 0, 1, ["loc", [null, [64, 4], [86, 4]]]]],
            locals: [],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.6.1",
            "loc": {
              "source": null,
              "start": {
                "line": 45,
                "column": 2
              },
              "end": {
                "line": 88,
                "column": 2
              }
            },
            "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(3);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
            return morphs;
          },
          statements: [["inline", "component", [["get", "beforeOptionsComponent", ["loc", [null, [48, 16], [48, 38]]]]], ["extra", ["subexpr", "readonly", [["get", "extra", ["loc", [null, [49, 22], [49, 27]]]]], [], ["loc", [null, [49, 12], [49, 28]]]], "listboxId", ["subexpr", "readonly", [["get", "optionsId", ["loc", [null, [50, 26], [50, 35]]]]], [], ["loc", [null, [50, 16], [50, 36]]]], "onInput", ["subexpr", "action", ["onInput"], [], ["loc", [null, [51, 14], [51, 32]]]], "onKeydown", ["subexpr", "action", ["onKeydown"], [], ["loc", [null, [52, 16], [52, 36]]]], "searchEnabled", ["subexpr", "readonly", [["get", "searchEnabled", ["loc", [null, [53, 30], [53, 43]]]]], [], ["loc", [null, [53, 20], [53, 44]]]], "onFocus", ["subexpr", "action", ["onFocus"], [], ["loc", [null, [54, 14], [54, 32]]]], "onBlur", ["subexpr", "action", ["deactivate"], [], ["loc", [null, [55, 13], [55, 34]]]], "searchPlaceholder", ["subexpr", "readonly", [["get", "searchPlaceholder", ["loc", [null, [56, 34], [56, 51]]]]], [], ["loc", [null, [56, 24], [56, 52]]]], "select", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [57, 23], [57, 32]]]]], [], ["loc", [null, [57, 13], [57, 33]]]]], ["loc", [null, [48, 4], [57, 35]]]], ["block", "if", [["get", "mustShowSearchMessage", ["loc", [null, [58, 10], [58, 31]]]]], [], 0, 1, ["loc", [null, [58, 4], [86, 11]]]], ["inline", "component", [["get", "afterOptionsComponent", ["loc", [null, [87, 16], [87, 37]]]]], ["select", ["subexpr", "readonly", [["get", "publicAPI", ["loc", [null, [87, 55], [87, 64]]]]], [], ["loc", [null, [87, 45], [87, 65]]]], "extra", ["subexpr", "readonly", [["get", "extra", ["loc", [null, [87, 82], [87, 87]]]]], [], ["loc", [null, [87, 72], [87, 88]]]]], ["loc", [null, [87, 4], [87, 90]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.6.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 89,
              "column": 0
            }
          },
          "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "dropdown.trigger", [], ["ariaDescribedBy", ["subexpr", "readonly", [["get", "ariaDescribedBy", ["loc", [null, [14, 30], [14, 45]]]]], [], ["loc", [null, [14, 20], [14, 46]]]], "ariaInvalid", ["subexpr", "readonly", [["get", "ariaInvalid", ["loc", [null, [15, 26], [15, 37]]]]], [], ["loc", [null, [15, 16], [15, 38]]]], "ariaLabel", ["subexpr", "readonly", [["get", "ariaLabel", ["loc", [null, [16, 24], [16, 33]]]]], [], ["loc", [null, [16, 14], [16, 34]]]], "ariaLabelledBy", ["subexpr", "readonly", [["get", "ariaLabelledBy", ["loc", [null, [17, 29], [17, 43]]]]], [], ["loc", [null, [17, 19], [17, 44]]]], "ariaRequired", ["subexpr", "readonly", [["get", "required", ["loc", [null, [18, 27], [18, 35]]]]], [], ["loc", [null, [18, 17], [18, 36]]]], "class", ["subexpr", "readonly", [["get", "concatenatedTriggerClasses", ["loc", [null, [19, 20], [19, 46]]]]], [], ["loc", [null, [19, 10], [19, 47]]]], "onKeydown", ["subexpr", "action", ["onTriggerKeydown"], [], ["loc", [null, [20, 14], [20, 41]]]], "onFocus", ["subexpr", "action", ["onTriggerFocus"], [], ["loc", [null, [21, 12], [21, 37]]]], "onBlur", ["subexpr", "action", ["deactivate"], [], ["loc", [null, [22, 11], [22, 32]]]], "tabindex", ["subexpr", "readonly", [["get", "tabindex", ["loc", [null, [23, 23], [23, 31]]]]], [], ["loc", [null, [23, 13], [23, 32]]]]], 0, null, ["loc", [null, [13, 2], [43, 23]]]], ["block", "dropdown.content", [], ["class", ["subexpr", "readonly", [["get", "concatenatedDropdownClasses", ["loc", [null, [46, 20], [46, 47]]]]], [], ["loc", [null, [46, 10], [46, 48]]]], "to", ["subexpr", "readonly", [["get", "destination", ["loc", [null, [47, 17], [47, 28]]]]], [], ["loc", [null, [47, 7], [47, 29]]]]], 1, null, ["loc", [null, [45, 2], [88, 23]]]]],
        locals: ["dropdown"],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 89,
            "column": 19
          }
        },
        "moduleName": "modules/ember-power-select/templates/components/power-select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "basic-dropdown", [], ["horizontalPosition", ["subexpr", "readonly", [["get", "horizontalPosition", ["loc", [null, [2, 31], [2, 49]]]]], [], ["loc", [null, [2, 21], [2, 50]]]], "initiallyOpened", ["subexpr", "readonly", [["get", "initiallyOpened", ["loc", [null, [3, 28], [3, 43]]]]], [], ["loc", [null, [3, 18], [3, 44]]]], "matchTriggerWidth", ["subexpr", "readonly", [["get", "matchTriggerWidth", ["loc", [null, [4, 30], [4, 47]]]]], [], ["loc", [null, [4, 20], [4, 48]]]], "onClose", ["subexpr", "action", ["onClose"], [], ["loc", [null, [5, 10], [5, 28]]]], "onOpen", ["subexpr", "action", ["onOpen"], [], ["loc", [null, [6, 9], [6, 26]]]], "registerAPI", ["subexpr", "action", ["registerAPI"], [], ["loc", [null, [7, 14], [7, 36]]]], "renderInPlace", ["subexpr", "readonly", [["get", "renderInPlace", ["loc", [null, [8, 26], [8, 39]]]]], [], ["loc", [null, [8, 16], [8, 40]]]], "verticalPosition", ["subexpr", "readonly", [["get", "verticalPosition", ["loc", [null, [9, 29], [9, 45]]]]], [], ["loc", [null, [9, 19], [9, 46]]]], "disabled", ["subexpr", "readonly", [["get", "disabled", ["loc", [null, [10, 21], [10, 29]]]]], [], ["loc", [null, [10, 11], [10, 30]]]]], 0, null, ["loc", [null, [1, 0], [89, 19]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('ember-power-select/utils/computed-fallback-if-undefined', ['exports', 'ember-computed'], function (exports, _emberComputed) {
  'use strict';

  exports['default'] = computedFallbackIfUndefined;

  function computedFallbackIfUndefined(fallback) {
    return (0, _emberComputed['default'])({
      get: function get() {
        return fallback;
      },
      set: function set(_, v) {
        return v === undefined ? fallback : v;
      }
    });
  }
});
define('ember-power-select/utils/group-utils', ['exports', 'ember-array/utils', 'ember-metal/get'], function (exports, _emberArrayUtils, _emberMetalGet) {
  'use strict';

  exports.isGroup = isGroup;
  exports.countOptions = countOptions;
  exports.indexOfOption = indexOfOption;
  exports.optionAtIndex = optionAtIndex;
  exports.filterOptions = filterOptions;
  exports.stripDiacritics = stripDiacritics;
  exports.defaultMatcher = defaultMatcher;

  function isGroup(entry) {
    return !!entry && !!(0, _emberMetalGet['default'])(entry, 'groupName') && !!(0, _emberMetalGet['default'])(entry, 'options');
  }

  function countOptions(collection) {
    var counter = 0;
    (function walk(collection) {
      if (!collection) {
        return null;
      }
      if (!collection.objectAt) {
        collection = (0, _emberArrayUtils.A)(collection);
      }
      for (var i = 0; i < (0, _emberMetalGet['default'])(collection, 'length'); i++) {
        var entry = collection.objectAt(i);
        if (isGroup(entry)) {
          walk((0, _emberMetalGet['default'])(entry, 'options'));
        } else {
          counter++;
        }
      }
    })(collection);
    return counter;
  }

  function indexOfOption(collection, option) {
    var index = 0;
    return (function walk(collection) {
      if (!collection) {
        return null;
      }
      if (!collection.objectAt) {
        collection = (0, _emberArrayUtils.A)(collection);
      }
      for (var i = 0; i < (0, _emberMetalGet['default'])(collection, 'length'); i++) {
        var entry = collection.objectAt(i);
        if (isGroup(entry)) {
          var result = walk((0, _emberMetalGet['default'])(entry, 'options'));
          if (result > -1) {
            return result;
          }
        } else if (entry === option) {
          return index;
        } else {
          index++;
        }
      }
      return -1;
    })(collection);
  }

  function optionAtIndex(originalCollection, index) {
    var counter = 0;
    return (function walk(collection, ancestorIsDisabled) {
      if (!collection || index < 0) {
        return { disabled: false, option: undefined };
      }
      if (!collection.objectAt) {
        collection = (0, _emberArrayUtils.A)(collection);
      }
      var localCounter = 0;
      var length = (0, _emberMetalGet['default'])(collection, 'length');
      while (counter <= index && localCounter < length) {
        var entry = collection.objectAt(localCounter);
        if (isGroup(entry)) {
          var found = walk((0, _emberMetalGet['default'])(entry, 'options'), ancestorIsDisabled || !!(0, _emberMetalGet['default'])(entry, 'disabled'));
          if (found) {
            return found;
          }
        } else if (counter === index) {
          return { disabled: ancestorIsDisabled || !!(0, _emberMetalGet['default'])(entry, 'disabled'), option: entry };
        } else {
          counter++;
        }
        localCounter++;
      }
    })(originalCollection, false) || { disabled: false, option: undefined };
  }

  function filterOptions(options, text, matcher) {
    var skipDisabled = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var sanitizedOptions = options.objectAt ? options : (0, _emberArrayUtils.A)(options);
    var opts = (0, _emberArrayUtils.A)();
    var length = (0, _emberMetalGet['default'])(options, 'length');
    for (var i = 0; i < length; i++) {
      var entry = sanitizedOptions.objectAt(i);
      if (!skipDisabled || !(0, _emberMetalGet['default'])(entry, 'disabled')) {
        if (isGroup(entry)) {
          var suboptions = filterOptions((0, _emberMetalGet['default'])(entry, 'options'), text, matcher, skipDisabled);
          if ((0, _emberMetalGet['default'])(suboptions, 'length') > 0) {
            var groupCopy = { groupName: entry.groupName, options: suboptions };
            if (entry.hasOwnProperty('disabled')) {
              groupCopy.disabled = entry.disabled;
            }
            opts.push(groupCopy);
          }
        } else {
          if (matcher(entry, text) >= 0) {
            opts.push(entry);
          }
        }
      }
    }
    return opts;
  }

  var DIACRITICS = {
    'Ⓐ': 'A',
    'Ａ': 'A',
    'À': 'A',
    'Á': 'A',
    'Â': 'A',
    'Ầ': 'A',
    'Ấ': 'A',
    'Ẫ': 'A',
    'Ẩ': 'A',
    'Ã': 'A',
    'Ā': 'A',
    'Ă': 'A',
    'Ằ': 'A',
    'Ắ': 'A',
    'Ẵ': 'A',
    'Ẳ': 'A',
    'Ȧ': 'A',
    'Ǡ': 'A',
    'Ä': 'A',
    'Ǟ': 'A',
    'Ả': 'A',
    'Å': 'A',
    'Ǻ': 'A',
    'Ǎ': 'A',
    'Ȁ': 'A',
    'Ȃ': 'A',
    'Ạ': 'A',
    'Ậ': 'A',
    'Ặ': 'A',
    'Ḁ': 'A',
    'Ą': 'A',
    'Ⱥ': 'A',
    'Ɐ': 'A',
    'Ꜳ': 'AA',
    'Æ': 'AE',
    'Ǽ': 'AE',
    'Ǣ': 'AE',
    'Ꜵ': 'AO',
    'Ꜷ': 'AU',
    'Ꜹ': 'AV',
    'Ꜻ': 'AV',
    'Ꜽ': 'AY',
    'Ⓑ': 'B',
    'Ｂ': 'B',
    'Ḃ': 'B',
    'Ḅ': 'B',
    'Ḇ': 'B',
    'Ƀ': 'B',
    'Ƃ': 'B',
    'Ɓ': 'B',
    'Ⓒ': 'C',
    'Ｃ': 'C',
    'Ć': 'C',
    'Ĉ': 'C',
    'Ċ': 'C',
    'Č': 'C',
    'Ç': 'C',
    'Ḉ': 'C',
    'Ƈ': 'C',
    'Ȼ': 'C',
    'Ꜿ': 'C',
    'Ⓓ': 'D',
    'Ｄ': 'D',
    'Ḋ': 'D',
    'Ď': 'D',
    'Ḍ': 'D',
    'Ḑ': 'D',
    'Ḓ': 'D',
    'Ḏ': 'D',
    'Đ': 'D',
    'Ƌ': 'D',
    'Ɗ': 'D',
    'Ɖ': 'D',
    'Ꝺ': 'D',
    'Ǳ': 'DZ',
    'Ǆ': 'DZ',
    'ǲ': 'Dz',
    'ǅ': 'Dz',
    'Ⓔ': 'E',
    'Ｅ': 'E',
    'È': 'E',
    'É': 'E',
    'Ê': 'E',
    'Ề': 'E',
    'Ế': 'E',
    'Ễ': 'E',
    'Ể': 'E',
    'Ẽ': 'E',
    'Ē': 'E',
    'Ḕ': 'E',
    'Ḗ': 'E',
    'Ĕ': 'E',
    'Ė': 'E',
    'Ë': 'E',
    'Ẻ': 'E',
    'Ě': 'E',
    'Ȅ': 'E',
    'Ȇ': 'E',
    'Ẹ': 'E',
    'Ệ': 'E',
    'Ȩ': 'E',
    'Ḝ': 'E',
    'Ę': 'E',
    'Ḙ': 'E',
    'Ḛ': 'E',
    'Ɛ': 'E',
    'Ǝ': 'E',
    'Ⓕ': 'F',
    'Ｆ': 'F',
    'Ḟ': 'F',
    'Ƒ': 'F',
    'Ꝼ': 'F',
    'Ⓖ': 'G',
    'Ｇ': 'G',
    'Ǵ': 'G',
    'Ĝ': 'G',
    'Ḡ': 'G',
    'Ğ': 'G',
    'Ġ': 'G',
    'Ǧ': 'G',
    'Ģ': 'G',
    'Ǥ': 'G',
    'Ɠ': 'G',
    'Ꞡ': 'G',
    'Ᵹ': 'G',
    'Ꝿ': 'G',
    'Ⓗ': 'H',
    'Ｈ': 'H',
    'Ĥ': 'H',
    'Ḣ': 'H',
    'Ḧ': 'H',
    'Ȟ': 'H',
    'Ḥ': 'H',
    'Ḩ': 'H',
    'Ḫ': 'H',
    'Ħ': 'H',
    'Ⱨ': 'H',
    'Ⱶ': 'H',
    'Ɥ': 'H',
    'Ⓘ': 'I',
    'Ｉ': 'I',
    'Ì': 'I',
    'Í': 'I',
    'Î': 'I',
    'Ĩ': 'I',
    'Ī': 'I',
    'Ĭ': 'I',
    'İ': 'I',
    'Ï': 'I',
    'Ḯ': 'I',
    'Ỉ': 'I',
    'Ǐ': 'I',
    'Ȉ': 'I',
    'Ȋ': 'I',
    'Ị': 'I',
    'Į': 'I',
    'Ḭ': 'I',
    'Ɨ': 'I',
    'Ⓙ': 'J',
    'Ｊ': 'J',
    'Ĵ': 'J',
    'Ɉ': 'J',
    'Ⓚ': 'K',
    'Ｋ': 'K',
    'Ḱ': 'K',
    'Ǩ': 'K',
    'Ḳ': 'K',
    'Ķ': 'K',
    'Ḵ': 'K',
    'Ƙ': 'K',
    'Ⱪ': 'K',
    'Ꝁ': 'K',
    'Ꝃ': 'K',
    'Ꝅ': 'K',
    'Ꞣ': 'K',
    'Ⓛ': 'L',
    'Ｌ': 'L',
    'Ŀ': 'L',
    'Ĺ': 'L',
    'Ľ': 'L',
    'Ḷ': 'L',
    'Ḹ': 'L',
    'Ļ': 'L',
    'Ḽ': 'L',
    'Ḻ': 'L',
    'Ł': 'L',
    'Ƚ': 'L',
    'Ɫ': 'L',
    'Ⱡ': 'L',
    'Ꝉ': 'L',
    'Ꝇ': 'L',
    'Ꞁ': 'L',
    'Ǉ': 'LJ',
    'ǈ': 'Lj',
    'Ⓜ': 'M',
    'Ｍ': 'M',
    'Ḿ': 'M',
    'Ṁ': 'M',
    'Ṃ': 'M',
    'Ɱ': 'M',
    'Ɯ': 'M',
    'Ⓝ': 'N',
    'Ｎ': 'N',
    'Ǹ': 'N',
    'Ń': 'N',
    'Ñ': 'N',
    'Ṅ': 'N',
    'Ň': 'N',
    'Ṇ': 'N',
    'Ņ': 'N',
    'Ṋ': 'N',
    'Ṉ': 'N',
    'Ƞ': 'N',
    'Ɲ': 'N',
    'Ꞑ': 'N',
    'Ꞥ': 'N',
    'Ǌ': 'NJ',
    'ǋ': 'Nj',
    'Ⓞ': 'O',
    'Ｏ': 'O',
    'Ò': 'O',
    'Ó': 'O',
    'Ô': 'O',
    'Ồ': 'O',
    'Ố': 'O',
    'Ỗ': 'O',
    'Ổ': 'O',
    'Õ': 'O',
    'Ṍ': 'O',
    'Ȭ': 'O',
    'Ṏ': 'O',
    'Ō': 'O',
    'Ṑ': 'O',
    'Ṓ': 'O',
    'Ŏ': 'O',
    'Ȯ': 'O',
    'Ȱ': 'O',
    'Ö': 'O',
    'Ȫ': 'O',
    'Ỏ': 'O',
    'Ő': 'O',
    'Ǒ': 'O',
    'Ȍ': 'O',
    'Ȏ': 'O',
    'Ơ': 'O',
    'Ờ': 'O',
    'Ớ': 'O',
    'Ỡ': 'O',
    'Ở': 'O',
    'Ợ': 'O',
    'Ọ': 'O',
    'Ộ': 'O',
    'Ǫ': 'O',
    'Ǭ': 'O',
    'Ø': 'O',
    'Ǿ': 'O',
    'Ɔ': 'O',
    'Ɵ': 'O',
    'Ꝋ': 'O',
    'Ꝍ': 'O',
    'Ƣ': 'OI',
    'Ꝏ': 'OO',
    'Ȣ': 'OU',
    'Ⓟ': 'P',
    'Ｐ': 'P',
    'Ṕ': 'P',
    'Ṗ': 'P',
    'Ƥ': 'P',
    'Ᵽ': 'P',
    'Ꝑ': 'P',
    'Ꝓ': 'P',
    'Ꝕ': 'P',
    'Ⓠ': 'Q',
    'Ｑ': 'Q',
    'Ꝗ': 'Q',
    'Ꝙ': 'Q',
    'Ɋ': 'Q',
    'Ⓡ': 'R',
    'Ｒ': 'R',
    'Ŕ': 'R',
    'Ṙ': 'R',
    'Ř': 'R',
    'Ȑ': 'R',
    'Ȓ': 'R',
    'Ṛ': 'R',
    'Ṝ': 'R',
    'Ŗ': 'R',
    'Ṟ': 'R',
    'Ɍ': 'R',
    'Ɽ': 'R',
    'Ꝛ': 'R',
    'Ꞧ': 'R',
    'Ꞃ': 'R',
    'Ⓢ': 'S',
    'Ｓ': 'S',
    'ẞ': 'S',
    'Ś': 'S',
    'Ṥ': 'S',
    'Ŝ': 'S',
    'Ṡ': 'S',
    'Š': 'S',
    'Ṧ': 'S',
    'Ṣ': 'S',
    'Ṩ': 'S',
    'Ș': 'S',
    'Ş': 'S',
    'Ȿ': 'S',
    'Ꞩ': 'S',
    'Ꞅ': 'S',
    'Ⓣ': 'T',
    'Ｔ': 'T',
    'Ṫ': 'T',
    'Ť': 'T',
    'Ṭ': 'T',
    'Ț': 'T',
    'Ţ': 'T',
    'Ṱ': 'T',
    'Ṯ': 'T',
    'Ŧ': 'T',
    'Ƭ': 'T',
    'Ʈ': 'T',
    'Ⱦ': 'T',
    'Ꞇ': 'T',
    'Ꜩ': 'TZ',
    'Ⓤ': 'U',
    'Ｕ': 'U',
    'Ù': 'U',
    'Ú': 'U',
    'Û': 'U',
    'Ũ': 'U',
    'Ṹ': 'U',
    'Ū': 'U',
    'Ṻ': 'U',
    'Ŭ': 'U',
    'Ü': 'U',
    'Ǜ': 'U',
    'Ǘ': 'U',
    'Ǖ': 'U',
    'Ǚ': 'U',
    'Ủ': 'U',
    'Ů': 'U',
    'Ű': 'U',
    'Ǔ': 'U',
    'Ȕ': 'U',
    'Ȗ': 'U',
    'Ư': 'U',
    'Ừ': 'U',
    'Ứ': 'U',
    'Ữ': 'U',
    'Ử': 'U',
    'Ự': 'U',
    'Ụ': 'U',
    'Ṳ': 'U',
    'Ų': 'U',
    'Ṷ': 'U',
    'Ṵ': 'U',
    'Ʉ': 'U',
    'Ⓥ': 'V',
    'Ｖ': 'V',
    'Ṽ': 'V',
    'Ṿ': 'V',
    'Ʋ': 'V',
    'Ꝟ': 'V',
    'Ʌ': 'V',
    'Ꝡ': 'VY',
    'Ⓦ': 'W',
    'Ｗ': 'W',
    'Ẁ': 'W',
    'Ẃ': 'W',
    'Ŵ': 'W',
    'Ẇ': 'W',
    'Ẅ': 'W',
    'Ẉ': 'W',
    'Ⱳ': 'W',
    'Ⓧ': 'X',
    'Ｘ': 'X',
    'Ẋ': 'X',
    'Ẍ': 'X',
    'Ⓨ': 'Y',
    'Ｙ': 'Y',
    'Ỳ': 'Y',
    'Ý': 'Y',
    'Ŷ': 'Y',
    'Ỹ': 'Y',
    'Ȳ': 'Y',
    'Ẏ': 'Y',
    'Ÿ': 'Y',
    'Ỷ': 'Y',
    'Ỵ': 'Y',
    'Ƴ': 'Y',
    'Ɏ': 'Y',
    'Ỿ': 'Y',
    'Ⓩ': 'Z',
    'Ｚ': 'Z',
    'Ź': 'Z',
    'Ẑ': 'Z',
    'Ż': 'Z',
    'Ž': 'Z',
    'Ẓ': 'Z',
    'Ẕ': 'Z',
    'Ƶ': 'Z',
    'Ȥ': 'Z',
    'Ɀ': 'Z',
    'Ⱬ': 'Z',
    'Ꝣ': 'Z',
    'ⓐ': 'a',
    'ａ': 'a',
    'ẚ': 'a',
    'à': 'a',
    'á': 'a',
    'â': 'a',
    'ầ': 'a',
    'ấ': 'a',
    'ẫ': 'a',
    'ẩ': 'a',
    'ã': 'a',
    'ā': 'a',
    'ă': 'a',
    'ằ': 'a',
    'ắ': 'a',
    'ẵ': 'a',
    'ẳ': 'a',
    'ȧ': 'a',
    'ǡ': 'a',
    'ä': 'a',
    'ǟ': 'a',
    'ả': 'a',
    'å': 'a',
    'ǻ': 'a',
    'ǎ': 'a',
    'ȁ': 'a',
    'ȃ': 'a',
    'ạ': 'a',
    'ậ': 'a',
    'ặ': 'a',
    'ḁ': 'a',
    'ą': 'a',
    'ⱥ': 'a',
    'ɐ': 'a',
    'ꜳ': 'aa',
    'æ': 'ae',
    'ǽ': 'ae',
    'ǣ': 'ae',
    'ꜵ': 'ao',
    'ꜷ': 'au',
    'ꜹ': 'av',
    'ꜻ': 'av',
    'ꜽ': 'ay',
    'ⓑ': 'b',
    'ｂ': 'b',
    'ḃ': 'b',
    'ḅ': 'b',
    'ḇ': 'b',
    'ƀ': 'b',
    'ƃ': 'b',
    'ɓ': 'b',
    'ⓒ': 'c',
    'ｃ': 'c',
    'ć': 'c',
    'ĉ': 'c',
    'ċ': 'c',
    'č': 'c',
    'ç': 'c',
    'ḉ': 'c',
    'ƈ': 'c',
    'ȼ': 'c',
    'ꜿ': 'c',
    'ↄ': 'c',
    'ⓓ': 'd',
    'ｄ': 'd',
    'ḋ': 'd',
    'ď': 'd',
    'ḍ': 'd',
    'ḑ': 'd',
    'ḓ': 'd',
    'ḏ': 'd',
    'đ': 'd',
    'ƌ': 'd',
    'ɖ': 'd',
    'ɗ': 'd',
    'ꝺ': 'd',
    'ǳ': 'dz',
    'ǆ': 'dz',
    'ⓔ': 'e',
    'ｅ': 'e',
    'è': 'e',
    'é': 'e',
    'ê': 'e',
    'ề': 'e',
    'ế': 'e',
    'ễ': 'e',
    'ể': 'e',
    'ẽ': 'e',
    'ē': 'e',
    'ḕ': 'e',
    'ḗ': 'e',
    'ĕ': 'e',
    'ė': 'e',
    'ë': 'e',
    'ẻ': 'e',
    'ě': 'e',
    'ȅ': 'e',
    'ȇ': 'e',
    'ẹ': 'e',
    'ệ': 'e',
    'ȩ': 'e',
    'ḝ': 'e',
    'ę': 'e',
    'ḙ': 'e',
    'ḛ': 'e',
    'ɇ': 'e',
    'ɛ': 'e',
    'ǝ': 'e',
    'ⓕ': 'f',
    'ｆ': 'f',
    'ḟ': 'f',
    'ƒ': 'f',
    'ꝼ': 'f',
    'ⓖ': 'g',
    'ｇ': 'g',
    'ǵ': 'g',
    'ĝ': 'g',
    'ḡ': 'g',
    'ğ': 'g',
    'ġ': 'g',
    'ǧ': 'g',
    'ģ': 'g',
    'ǥ': 'g',
    'ɠ': 'g',
    'ꞡ': 'g',
    'ᵹ': 'g',
    'ꝿ': 'g',
    'ⓗ': 'h',
    'ｈ': 'h',
    'ĥ': 'h',
    'ḣ': 'h',
    'ḧ': 'h',
    'ȟ': 'h',
    'ḥ': 'h',
    'ḩ': 'h',
    'ḫ': 'h',
    'ẖ': 'h',
    'ħ': 'h',
    'ⱨ': 'h',
    'ⱶ': 'h',
    'ɥ': 'h',
    'ƕ': 'hv',
    'ⓘ': 'i',
    'ｉ': 'i',
    'ì': 'i',
    'í': 'i',
    'î': 'i',
    'ĩ': 'i',
    'ī': 'i',
    'ĭ': 'i',
    'ï': 'i',
    'ḯ': 'i',
    'ỉ': 'i',
    'ǐ': 'i',
    'ȉ': 'i',
    'ȋ': 'i',
    'ị': 'i',
    'į': 'i',
    'ḭ': 'i',
    'ɨ': 'i',
    'ı': 'i',
    'ⓙ': 'j',
    'ｊ': 'j',
    'ĵ': 'j',
    'ǰ': 'j',
    'ɉ': 'j',
    'ⓚ': 'k',
    'ｋ': 'k',
    'ḱ': 'k',
    'ǩ': 'k',
    'ḳ': 'k',
    'ķ': 'k',
    'ḵ': 'k',
    'ƙ': 'k',
    'ⱪ': 'k',
    'ꝁ': 'k',
    'ꝃ': 'k',
    'ꝅ': 'k',
    'ꞣ': 'k',
    'ⓛ': 'l',
    'ｌ': 'l',
    'ŀ': 'l',
    'ĺ': 'l',
    'ľ': 'l',
    'ḷ': 'l',
    'ḹ': 'l',
    'ļ': 'l',
    'ḽ': 'l',
    'ḻ': 'l',
    'ſ': 'l',
    'ł': 'l',
    'ƚ': 'l',
    'ɫ': 'l',
    'ⱡ': 'l',
    'ꝉ': 'l',
    'ꞁ': 'l',
    'ꝇ': 'l',
    'ǉ': 'lj',
    'ⓜ': 'm',
    'ｍ': 'm',
    'ḿ': 'm',
    'ṁ': 'm',
    'ṃ': 'm',
    'ɱ': 'm',
    'ɯ': 'm',
    'ⓝ': 'n',
    'ｎ': 'n',
    'ǹ': 'n',
    'ń': 'n',
    'ñ': 'n',
    'ṅ': 'n',
    'ň': 'n',
    'ṇ': 'n',
    'ņ': 'n',
    'ṋ': 'n',
    'ṉ': 'n',
    'ƞ': 'n',
    'ɲ': 'n',
    'ŉ': 'n',
    'ꞑ': 'n',
    'ꞥ': 'n',
    'ǌ': 'nj',
    'ⓞ': 'o',
    'ｏ': 'o',
    'ò': 'o',
    'ó': 'o',
    'ô': 'o',
    'ồ': 'o',
    'ố': 'o',
    'ỗ': 'o',
    'ổ': 'o',
    'õ': 'o',
    'ṍ': 'o',
    'ȭ': 'o',
    'ṏ': 'o',
    'ō': 'o',
    'ṑ': 'o',
    'ṓ': 'o',
    'ŏ': 'o',
    'ȯ': 'o',
    'ȱ': 'o',
    'ö': 'o',
    'ȫ': 'o',
    'ỏ': 'o',
    'ő': 'o',
    'ǒ': 'o',
    'ȍ': 'o',
    'ȏ': 'o',
    'ơ': 'o',
    'ờ': 'o',
    'ớ': 'o',
    'ỡ': 'o',
    'ở': 'o',
    'ợ': 'o',
    'ọ': 'o',
    'ộ': 'o',
    'ǫ': 'o',
    'ǭ': 'o',
    'ø': 'o',
    'ǿ': 'o',
    'ɔ': 'o',
    'ꝋ': 'o',
    'ꝍ': 'o',
    'ɵ': 'o',
    'ƣ': 'oi',
    'ȣ': 'ou',
    'ꝏ': 'oo',
    'ⓟ': 'p',
    'ｐ': 'p',
    'ṕ': 'p',
    'ṗ': 'p',
    'ƥ': 'p',
    'ᵽ': 'p',
    'ꝑ': 'p',
    'ꝓ': 'p',
    'ꝕ': 'p',
    'ⓠ': 'q',
    'ｑ': 'q',
    'ɋ': 'q',
    'ꝗ': 'q',
    'ꝙ': 'q',
    'ⓡ': 'r',
    'ｒ': 'r',
    'ŕ': 'r',
    'ṙ': 'r',
    'ř': 'r',
    'ȑ': 'r',
    'ȓ': 'r',
    'ṛ': 'r',
    'ṝ': 'r',
    'ŗ': 'r',
    'ṟ': 'r',
    'ɍ': 'r',
    'ɽ': 'r',
    'ꝛ': 'r',
    'ꞧ': 'r',
    'ꞃ': 'r',
    'ⓢ': 's',
    'ｓ': 's',
    'ß': 's',
    'ś': 's',
    'ṥ': 's',
    'ŝ': 's',
    'ṡ': 's',
    'š': 's',
    'ṧ': 's',
    'ṣ': 's',
    'ṩ': 's',
    'ș': 's',
    'ş': 's',
    'ȿ': 's',
    'ꞩ': 's',
    'ꞅ': 's',
    'ẛ': 's',
    'ⓣ': 't',
    'ｔ': 't',
    'ṫ': 't',
    'ẗ': 't',
    'ť': 't',
    'ṭ': 't',
    'ț': 't',
    'ţ': 't',
    'ṱ': 't',
    'ṯ': 't',
    'ŧ': 't',
    'ƭ': 't',
    'ʈ': 't',
    'ⱦ': 't',
    'ꞇ': 't',
    'ꜩ': 'tz',
    'ⓤ': 'u',
    'ｕ': 'u',
    'ù': 'u',
    'ú': 'u',
    'û': 'u',
    'ũ': 'u',
    'ṹ': 'u',
    'ū': 'u',
    'ṻ': 'u',
    'ŭ': 'u',
    'ü': 'u',
    'ǜ': 'u',
    'ǘ': 'u',
    'ǖ': 'u',
    'ǚ': 'u',
    'ủ': 'u',
    'ů': 'u',
    'ű': 'u',
    'ǔ': 'u',
    'ȕ': 'u',
    'ȗ': 'u',
    'ư': 'u',
    'ừ': 'u',
    'ứ': 'u',
    'ữ': 'u',
    'ử': 'u',
    'ự': 'u',
    'ụ': 'u',
    'ṳ': 'u',
    'ų': 'u',
    'ṷ': 'u',
    'ṵ': 'u',
    'ʉ': 'u',
    'ⓥ': 'v',
    'ｖ': 'v',
    'ṽ': 'v',
    'ṿ': 'v',
    'ʋ': 'v',
    'ꝟ': 'v',
    'ʌ': 'v',
    'ꝡ': 'vy',
    'ⓦ': 'w',
    'ｗ': 'w',
    'ẁ': 'w',
    'ẃ': 'w',
    'ŵ': 'w',
    'ẇ': 'w',
    'ẅ': 'w',
    'ẘ': 'w',
    'ẉ': 'w',
    'ⱳ': 'w',
    'ⓧ': 'x',
    'ｘ': 'x',
    'ẋ': 'x',
    'ẍ': 'x',
    'ⓨ': 'y',
    'ｙ': 'y',
    'ỳ': 'y',
    'ý': 'y',
    'ŷ': 'y',
    'ỹ': 'y',
    'ȳ': 'y',
    'ẏ': 'y',
    'ÿ': 'y',
    'ỷ': 'y',
    'ẙ': 'y',
    'ỵ': 'y',
    'ƴ': 'y',
    'ɏ': 'y',
    'ỿ': 'y',
    'ⓩ': 'z',
    'ｚ': 'z',
    'ź': 'z',
    'ẑ': 'z',
    'ż': 'z',
    'ž': 'z',
    'ẓ': 'z',
    'ẕ': 'z',
    'ƶ': 'z',
    'ȥ': 'z',
    'ɀ': 'z',
    'ⱬ': 'z',
    'ꝣ': 'z',
    'Ά': 'Α',
    'Έ': 'Ε',
    'Ή': 'Η',
    'Ί': 'Ι',
    'Ϊ': 'Ι',
    'Ό': 'Ο',
    'Ύ': 'Υ',
    'Ϋ': 'Υ',
    'Ώ': 'Ω',
    'ά': 'α',
    'έ': 'ε',
    'ή': 'η',
    'ί': 'ι',
    'ϊ': 'ι',
    'ΐ': 'ι',
    'ό': 'ο',
    'ύ': 'υ',
    'ϋ': 'υ',
    'ΰ': 'υ',
    'ω': 'ω',
    'ς': 'σ'
  };

  // Copied from Select2

  function stripDiacritics(text) {
    // Used 'uni range + named function' from http://jsperf.com/diacritics/18
    function match(a) {
      return DIACRITICS[a] || a;
    }

    return ('' + text).replace(/[^\u0000-\u007E]/g, match);
  }

  function defaultMatcher(value, text) {
    return stripDiacritics(value).toUpperCase().indexOf(stripDiacritics(text).toUpperCase());
  }
});
define('ember-resolver/container-debug-adapter', ['exports', 'ember', 'ember-resolver/utils/module-registry'], function (exports, _ember, _emberResolverUtilsModuleRegistry) {
  'use strict';

  var ContainerDebugAdapter = _ember['default'].ContainerDebugAdapter;

  var ModulesContainerDebugAdapter = null;

  function getPod(type, key, prefix) {
    var match = key.match(new RegExp('^/?' + prefix + '/(.+)/' + type + '$'));
    if (match) {
      return match[1];
    }
  }

  // Support Ember < 1.5-beta.4
  // TODO: Remove this after 1.5.0 is released
  if (typeof ContainerDebugAdapter !== 'undefined') {

    /*
     * This module defines a subclass of Ember.ContainerDebugAdapter that adds two
     * important features:
     *
     *  1) is able provide injections to classes that implement `extend`
     *     (as is typical with Ember).
     */

    ModulesContainerDebugAdapter = ContainerDebugAdapter.extend({
      _moduleRegistry: null,

      init: function init() {
        this._super.apply(this, arguments);

        if (!this._moduleRegistry) {
          this._moduleRegistry = new _emberResolverUtilsModuleRegistry['default']();
        }
      },

      /**
        The container of the application being debugged.
        This property will be injected
        on creation.
         @property container
        @default null
      */

      /**
        The resolver instance of the application
        being debugged. This property will be injected
        on creation.
         @property resolver
        @default null
      */

      /**
        Returns true if it is possible to catalog a list of available
        classes in the resolver for a given type.
         @method canCatalogEntriesByType
        @param {string} type The type. e.g. "model", "controller", "route"
        @return {boolean} whether a list is available for this type.
      */
      canCatalogEntriesByType: function canCatalogEntriesByType() /* type */{
        return true;
      },

      /**
        Returns the available classes a given type.
         @method catalogEntriesByType
        @param {string} type The type. e.g. "model", "controller", "route"
        @return {Array} An array of classes.
      */
      catalogEntriesByType: function catalogEntriesByType(type) {
        var moduleNames = this._moduleRegistry.moduleNames();
        var types = _ember['default'].A();

        var prefix = this.namespace.modulePrefix;

        for (var i = 0, l = moduleNames.length; i < l; i++) {
          var key = moduleNames[i];

          if (key.indexOf(type) !== -1) {
            // Check if it's a pod module
            var name = getPod(type, key, this.namespace.podModulePrefix || prefix);
            if (!name) {
              // Not pod
              name = key.split(type + 's/').pop();

              // Support for different prefix (such as ember-cli addons).
              // Uncomment the code below when
              // https://github.com/ember-cli/ember-resolver/pull/80 is merged.

              //var match = key.match('^/?(.+)/' + type);
              //if (match && match[1] !== prefix) {
              // Different prefix such as an addon
              //name = match[1] + '@' + name;
              //}
            }
            types.addObject(name);
          }
        }
        return types;
      }
    });
  }

  exports['default'] = ModulesContainerDebugAdapter;
});
define('ember-resolver/index', ['exports', 'ember-resolver/resolver'], function (exports, _emberResolverResolver) {
  'use strict';

  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberResolverResolver['default'];
    }
  });
});
define('ember-resolver/resolver', ['exports', 'ember', 'ember-resolver/utils/module-registry', 'ember-resolver/utils/class-factory', 'ember-resolver/utils/make-dictionary'], function (exports, _ember, _emberResolverUtilsModuleRegistry, _emberResolverUtilsClassFactory, _emberResolverUtilsMakeDictionary) {
  /*globals require */

  'use strict';

  /*
   * This module defines a subclass of Ember.DefaultResolver that adds two
   * important features:
   *
   *  1) The resolver makes the container aware of es6 modules via the AMD
   *     output. The loader's _moduleEntries is consulted so that classes can be
   *     resolved directly via the module loader, without needing a manual
   *     `import`.
   *  2) is able to provide injections to classes that implement `extend`
   *     (as is typical with Ember).
   */

  var _Ember$String = _ember['default'].String;
  var underscore = _Ember$String.underscore;
  var classify = _Ember$String.classify;
  var get = _ember['default'].get;
  var DefaultResolver = _ember['default'].DefaultResolver;

  function parseName(fullName) {
    /*jshint validthis:true */

    if (fullName.parsedName === true) {
      return fullName;
    }

    var prefix, type, name;
    var fullNameParts = fullName.split('@');

    // HTMLBars uses helper:@content-helper which collides
    // with ember-cli namespace detection.
    // This will be removed in a future release of HTMLBars.
    if (fullName !== 'helper:@content-helper' && fullNameParts.length === 2) {
      var prefixParts = fullNameParts[0].split(':');

      if (prefixParts.length === 2) {
        prefix = prefixParts[1];
        type = prefixParts[0];
        name = fullNameParts[1];
      } else {
        var nameParts = fullNameParts[1].split(':');

        prefix = fullNameParts[0];
        type = nameParts[0];
        name = nameParts[1];
      }
    } else {
      fullNameParts = fullName.split(':');
      type = fullNameParts[0];
      name = fullNameParts[1];
    }

    var fullNameWithoutType = name;
    var namespace = get(this, 'namespace');
    var root = namespace;

    return {
      parsedName: true,
      fullName: fullName,
      prefix: prefix || this.prefix({ type: type }),
      type: type,
      fullNameWithoutType: fullNameWithoutType,
      name: name,
      root: root,
      resolveMethodName: "resolve" + classify(type)
    };
  }

  function resolveOther(parsedName) {
    /*jshint validthis:true */

    _ember['default'].assert('`modulePrefix` must be defined', this.namespace.modulePrefix);

    var normalizedModuleName = this.findModuleName(parsedName);

    if (normalizedModuleName) {
      var defaultExport = this._extractDefaultExport(normalizedModuleName, parsedName);

      if (defaultExport === undefined) {
        throw new Error(" Expected to find: '" + parsedName.fullName + "' within '" + normalizedModuleName + "' but got 'undefined'. Did you forget to `export default` within '" + normalizedModuleName + "'?");
      }

      if (this.shouldWrapInClassFactory(defaultExport, parsedName)) {
        defaultExport = (0, _emberResolverUtilsClassFactory['default'])(defaultExport);
      }

      return defaultExport;
    } else {
      return this._super(parsedName);
    }
  }

  // Ember.DefaultResolver docs:
  //   https://github.com/emberjs/ember.js/blob/master/packages/ember-application/lib/system/resolver.js
  var Resolver = DefaultResolver.extend({
    resolveOther: resolveOther,
    parseName: parseName,
    resolveTemplate: resolveOther,
    pluralizedTypes: null,
    moduleRegistry: null,

    makeToString: function makeToString(factory, fullName) {
      return '' + this.namespace.modulePrefix + '@' + fullName + ':';
    },

    shouldWrapInClassFactory: function shouldWrapInClassFactory() /* module, parsedName */{
      return false;
    },

    init: function init() {
      this._super();
      this.moduleBasedResolver = true;

      if (!this._moduleRegistry) {
        this._moduleRegistry = new _emberResolverUtilsModuleRegistry['default']();
      }

      this._normalizeCache = (0, _emberResolverUtilsMakeDictionary['default'])();

      this.pluralizedTypes = this.pluralizedTypes || (0, _emberResolverUtilsMakeDictionary['default'])();

      if (!this.pluralizedTypes.config) {
        this.pluralizedTypes.config = 'config';
      }

      this._deprecatedPodModulePrefix = false;
    },

    normalize: function normalize(fullName) {
      return this._normalizeCache[fullName] || (this._normalizeCache[fullName] = this._normalize(fullName));
    },

    _normalize: function _normalize(fullName) {
      // replace `.` with `/` in order to make nested controllers work in the following cases
      // 1. `needs: ['posts/post']`
      // 2. `{{render "posts/post"}}`
      // 3. `this.render('posts/post')` from Route
      var split = fullName.split(':');
      if (split.length > 1) {
        return split[0] + ':' + _ember['default'].String.dasherize(split[1].replace(/\./g, '/'));
      } else {
        return fullName;
      }
    },

    pluralize: function pluralize(type) {
      return this.pluralizedTypes[type] || (this.pluralizedTypes[type] = type + 's');
    },

    podBasedLookupWithPrefix: function podBasedLookupWithPrefix(podPrefix, parsedName) {
      var fullNameWithoutType = parsedName.fullNameWithoutType;

      if (parsedName.type === 'template') {
        fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
      }

      return podPrefix + '/' + fullNameWithoutType + '/' + parsedName.type;
    },

    podBasedModuleName: function podBasedModuleName(parsedName) {
      var podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;

      return this.podBasedLookupWithPrefix(podPrefix, parsedName);
    },

    podBasedComponentsInSubdir: function podBasedComponentsInSubdir(parsedName) {
      var podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;
      podPrefix = podPrefix + '/components';

      if (parsedName.type === 'component' || parsedName.fullNameWithoutType.match(/^components/)) {
        return this.podBasedLookupWithPrefix(podPrefix, parsedName);
      }
    },

    mainModuleName: function mainModuleName(parsedName) {
      // if router:main or adapter:main look for a module with just the type first
      var tmpModuleName = parsedName.prefix + '/' + parsedName.type;

      if (parsedName.fullNameWithoutType === 'main') {
        return tmpModuleName;
      }
    },

    defaultModuleName: function defaultModuleName(parsedName) {
      return parsedName.prefix + '/' + this.pluralize(parsedName.type) + '/' + parsedName.fullNameWithoutType;
    },

    prefix: function prefix(parsedName) {
      var tmpPrefix = this.namespace.modulePrefix;

      if (this.namespace[parsedName.type + 'Prefix']) {
        tmpPrefix = this.namespace[parsedName.type + 'Prefix'];
      }

      return tmpPrefix;
    },

    /**
      A listing of functions to test for moduleName's based on the provided
     `parsedName`. This allows easy customization of additional module based
     lookup patterns.
      @property moduleNameLookupPatterns
     @returns {Ember.Array}
     */
    moduleNameLookupPatterns: _ember['default'].computed(function () {
      return [this.podBasedModuleName, this.podBasedComponentsInSubdir, this.mainModuleName, this.defaultModuleName];
    }),

    findModuleName: function findModuleName(parsedName, loggingDisabled) {
      var moduleNameLookupPatterns = this.get('moduleNameLookupPatterns');
      var moduleName;

      for (var index = 0, _length = moduleNameLookupPatterns.length; index < _length; index++) {
        var item = moduleNameLookupPatterns[index];

        var tmpModuleName = item.call(this, parsedName);

        // allow treat all dashed and all underscored as the same thing
        // supports components with dashes and other stuff with underscores.
        if (tmpModuleName) {
          tmpModuleName = this.chooseModuleName(tmpModuleName);
        }

        if (tmpModuleName && this._moduleRegistry.has(tmpModuleName)) {
          moduleName = tmpModuleName;
        }

        if (!loggingDisabled) {
          this._logLookup(moduleName, parsedName, tmpModuleName);
        }

        if (moduleName) {
          return moduleName;
        }
      }
    },

    chooseModuleName: function chooseModuleName(moduleName) {
      var underscoredModuleName = underscore(moduleName);

      if (moduleName !== underscoredModuleName && this._moduleRegistry.has(moduleName) && this._moduleRegistry.has(underscoredModuleName)) {
        throw new TypeError("Ambiguous module names: `" + moduleName + "` and `" + underscoredModuleName + "`");
      }

      if (this._moduleRegistry.has(moduleName)) {
        return moduleName;
      } else if (this._moduleRegistry.has(underscoredModuleName)) {
        return underscoredModuleName;
      } else {
        // workaround for dasherized partials:
        // something/something/-something => something/something/_something
        var partializedModuleName = moduleName.replace(/\/-([^\/]*)$/, '/_$1');

        if (this._moduleRegistry.has(partializedModuleName)) {
          _ember['default'].deprecate('Modules should not contain underscores. ' + 'Attempted to lookup "' + moduleName + '" which ' + 'was not found. Please rename "' + partializedModuleName + '" ' + 'to "' + moduleName + '" instead.', false);

          return partializedModuleName;
        } else {
          return moduleName;
        }
      }
    },

    // used by Ember.DefaultResolver.prototype._logLookup
    lookupDescription: function lookupDescription(fullName) {
      var parsedName = this.parseName(fullName);

      var moduleName = this.findModuleName(parsedName, true);

      return moduleName;
    },

    // only needed until 1.6.0-beta.2 can be required
    _logLookup: function _logLookup(found, parsedName, description) {
      if (!_ember['default'].ENV.LOG_MODULE_RESOLVER && !parsedName.root.LOG_RESOLVER) {
        return;
      }

      var symbol, padding;

      if (found) {
        symbol = '[✓]';
      } else {
        symbol = '[ ]';
      }

      if (parsedName.fullName.length > 60) {
        padding = '.';
      } else {
        padding = new Array(60 - parsedName.fullName.length).join('.');
      }

      if (!description) {
        description = this.lookupDescription(parsedName);
      }

      _ember['default'].Logger.info(symbol, parsedName.fullName, padding, description);
    },

    knownForType: function knownForType(type) {
      var moduleKeys = this._moduleRegistry.moduleNames();

      var items = (0, _emberResolverUtilsMakeDictionary['default'])();
      for (var index = 0, length = moduleKeys.length; index < length; index++) {
        var moduleName = moduleKeys[index];
        var fullname = this.translateToContainerFullname(type, moduleName);

        if (fullname) {
          items[fullname] = true;
        }
      }

      return items;
    },

    translateToContainerFullname: function translateToContainerFullname(type, moduleName) {
      var prefix = this.prefix({ type: type });

      // Note: using string manipulation here rather than regexes for better performance.
      // pod modules
      // '^' + prefix + '/(.+)/' + type + '$'
      var podPrefix = prefix + '/';
      var podSuffix = '/' + type;
      var start = moduleName.indexOf(podPrefix);
      var end = moduleName.indexOf(podSuffix);

      if (start === 0 && end === moduleName.length - podSuffix.length && moduleName.length > podPrefix.length + podSuffix.length) {
        return type + ':' + moduleName.slice(start + podPrefix.length, end);
      }

      // non-pod modules
      // '^' + prefix + '/' + pluralizedType + '/(.+)$'
      var pluralizedType = this.pluralize(type);
      var nonPodPrefix = prefix + '/' + pluralizedType + '/';

      if (moduleName.indexOf(nonPodPrefix) === 0 && moduleName.length > nonPodPrefix.length) {
        return type + ':' + moduleName.slice(nonPodPrefix.length);
      }
    },

    _extractDefaultExport: function _extractDefaultExport(normalizedModuleName) {
      var module = require(normalizedModuleName, null, null, true /* force sync */);

      if (module && module['default']) {
        module = module['default'];
      }

      return module;
    }
  });

  Resolver.reopenClass({
    moduleBasedResolver: true
  });

  exports['default'] = Resolver;
});
define('ember-resolver/utils/class-factory', ['exports'], function (exports) {
  'use strict';

  exports['default'] = classFactory;

  function classFactory(klass) {
    return {
      create: function create(injections) {
        if (typeof klass.extend === 'function') {
          return klass.extend(injections);
        } else {
          return klass;
        }
      }
    };
  }
});
define("ember-resolver/utils/create", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  var create = Object.create || _ember["default"].create;
  if (!(create && !create(null).hasOwnProperty)) {
    throw new Error("This browser does not support Object.create(null), please polyfil with es5-sham: http://git.io/yBU2rg");
  }

  exports["default"] = create;
});
define('ember-resolver/utils/make-dictionary', ['exports', 'ember-resolver/utils/create'], function (exports, _emberResolverUtilsCreate) {
  'use strict';

  exports['default'] = makeDictionary;

  function makeDictionary() {
    var cache = (0, _emberResolverUtilsCreate['default'])(null);
    cache['_dict'] = null;
    delete cache['_dict'];
    return cache;
  }
});
define('ember-resolver/utils/module-registry', ['exports', 'ember'], function (exports, _ember) {
  /*globals requirejs, require */

  'use strict';

  if (typeof requirejs.entries === 'undefined') {
    requirejs.entries = requirejs._eak_seen;
  }

  function ModuleRegistry(entries) {
    this._entries = entries || requirejs.entries;
  }

  ModuleRegistry.prototype.moduleNames = function ModuleRegistry_moduleNames() {
    return (Object.keys || _ember['default'].keys)(this._entries);
  };

  ModuleRegistry.prototype.has = function ModuleRegistry_has(moduleName) {
    return moduleName in this._entries;
  };

  ModuleRegistry.prototype.get = function ModuleRegistry_get(moduleName) {
    var exportName = arguments.length <= 1 || arguments[1] === undefined ? 'default' : arguments[1];

    var module = require(moduleName);
    return module && module[exportName];
  };

  exports['default'] = ModuleRegistry;
});
define('ember-text-measurer/services/text-measurer', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Service.extend({
    init: function init() {
      this._super.apply(this, arguments);
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
    },

    width: function width(string) {
      var font = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (font) {
        this.ctx.font = font;
      }
      return this.ctx.measureText(string).width;
    },

    lines: function lines(string, maxWidth) {
      var font = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      if (font) {
        this.ctx.font = font;
      }
      var paragraphs = string.split(/\n/);
      var lines = paragraphs.length;
      for (var i = 0; i < paragraphs.length; i++) {
        var paragraph = paragraphs[i];
        if (paragraph !== '') {
          var words = paragraph.split(' ');
          var widthSoFar = 0;
          var j = 0;
          for (; j < words.length - 1; j++) {
            var _wordWidth = this.ctx.measureText(words[j] + ' ').width;
            widthSoFar = widthSoFar + _wordWidth;
            if (widthSoFar > maxWidth) {
              lines++;
              widthSoFar = _wordWidth;
            }
          }
          var wordWidth = this.ctx.measureText(words[j]).width;
          widthSoFar = widthSoFar + wordWidth;
          if (widthSoFar > maxWidth) {
            lines++;
            widthSoFar = wordWidth;
          }
        }
      }
      return lines;
    },

    fitTextSize: function fitTextSize(string, maxWidth) {
      var font = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var width = this.width(string, font);
      var fontSize = this.ctx.font.match(/\d+/)[0];
      return Math.floor(parseFloat(fontSize) * maxWidth / width);
    }
  });
});
define('ember-truth-helpers/helpers/and', ['exports', 'ember-truth-helpers/utils/truth-convert'], function (exports, _emberTruthHelpersUtilsTruthConvert) {
  'use strict';

  exports.andHelper = andHelper;

  function andHelper(params) {
    for (var i = 0, len = params.length; i < len; i++) {
      if ((0, _emberTruthHelpersUtilsTruthConvert['default'])(params[i]) === false) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
});
define("ember-truth-helpers/helpers/equal", ["exports"], function (exports) {
  "use strict";

  exports.equalHelper = equalHelper;

  function equalHelper(params) {
    return params[0] === params[1];
  }
});
define('ember-truth-helpers/helpers/gt', ['exports'], function (exports) {
  'use strict';

  exports.gtHelper = gtHelper;

  function gtHelper(params, hash) {
    var left = params[0];
    var right = params[1];
    if (hash.forceNumber) {
      if (typeof left !== 'number') {
        left = Number(left);
      }
      if (typeof right !== 'number') {
        right = Number(right);
      }
    }
    return left > right;
  }
});
define('ember-truth-helpers/helpers/gte', ['exports'], function (exports) {
  'use strict';

  exports.gteHelper = gteHelper;

  function gteHelper(params, hash) {
    var left = params[0];
    var right = params[1];
    if (hash.forceNumber) {
      if (typeof left !== 'number') {
        left = Number(left);
      }
      if (typeof right !== 'number') {
        right = Number(right);
      }
    }
    return left >= right;
  }
});
define('ember-truth-helpers/helpers/is-array', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports.isArrayHelper = isArrayHelper;

  function isArrayHelper(params) {
    for (var i = 0, len = params.length; i < len; i++) {
      if (_ember['default'].isArray(params[i]) === false) {
        return false;
      }
    }
    return true;
  }
});
define('ember-truth-helpers/helpers/lt', ['exports'], function (exports) {
  'use strict';

  exports.ltHelper = ltHelper;

  function ltHelper(params, hash) {
    var left = params[0];
    var right = params[1];
    if (hash.forceNumber) {
      if (typeof left !== 'number') {
        left = Number(left);
      }
      if (typeof right !== 'number') {
        right = Number(right);
      }
    }
    return left < right;
  }
});
define('ember-truth-helpers/helpers/lte', ['exports'], function (exports) {
  'use strict';

  exports.lteHelper = lteHelper;

  function lteHelper(params, hash) {
    var left = params[0];
    var right = params[1];
    if (hash.forceNumber) {
      if (typeof left !== 'number') {
        left = Number(left);
      }
      if (typeof right !== 'number') {
        right = Number(right);
      }
    }
    return left <= right;
  }
});
define("ember-truth-helpers/helpers/not-equal", ["exports"], function (exports) {
  "use strict";

  exports.notEqualHelper = notEqualHelper;

  function notEqualHelper(params) {
    return params[0] !== params[1];
  }
});
define('ember-truth-helpers/helpers/not', ['exports', 'ember-truth-helpers/utils/truth-convert'], function (exports, _emberTruthHelpersUtilsTruthConvert) {
  'use strict';

  exports.notHelper = notHelper;

  function notHelper(params) {
    for (var i = 0, len = params.length; i < len; i++) {
      if ((0, _emberTruthHelpersUtilsTruthConvert['default'])(params[i]) === true) {
        return false;
      }
    }
    return true;
  }
});
define('ember-truth-helpers/helpers/or', ['exports', 'ember-truth-helpers/utils/truth-convert'], function (exports, _emberTruthHelpersUtilsTruthConvert) {
  'use strict';

  exports.orHelper = orHelper;

  function orHelper(params) {
    for (var i = 0, len = params.length; i < len; i++) {
      if ((0, _emberTruthHelpersUtilsTruthConvert['default'])(params[i]) === true) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
});
define('ember-truth-helpers/helpers/xor', ['exports', 'ember-truth-helpers/utils/truth-convert'], function (exports, _emberTruthHelpersUtilsTruthConvert) {
  'use strict';

  exports.xorHelper = xorHelper;

  function xorHelper(params) {
    return (0, _emberTruthHelpersUtilsTruthConvert['default'])(params[0]) !== (0, _emberTruthHelpersUtilsTruthConvert['default'])(params[1]);
  }
});
define('ember-truth-helpers/utils/register-helper', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	exports.registerHelper = registerHelper;

	function registerHelperIteration1(name, helperFunction) {
		//earlier versions of ember with htmlbars used this
		_ember['default'].HTMLBars.helpers[name] = _ember['default'].HTMLBars.makeBoundHelper(helperFunction);
	}

	function registerHelperIteration2(name, helperFunction) {
		//registerHelper has been made private as _registerHelper
		//this is kept here if anyone is using it
		_ember['default'].HTMLBars.registerHelper(name, _ember['default'].HTMLBars.makeBoundHelper(helperFunction));
	}

	function registerHelperIteration3(name, helperFunction) {
		//latest versin of ember uses this
		_ember['default'].HTMLBars._registerHelper(name, _ember['default'].HTMLBars.makeBoundHelper(helperFunction));
	}

	function registerHelper(name, helperFunction) {
		// Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
		// will be auto-discovered.
		if (_ember['default'].Helper) {
			return;
		}

		if (_ember['default'].HTMLBars._registerHelper) {
			if (_ember['default'].HTMLBars.helpers) {
				registerHelperIteration1(name, helperFunction);
			} else {
				registerHelperIteration3(name, helperFunction);
			}
		} else if (_ember['default'].HTMLBars.registerHelper) {
			registerHelperIteration2(name, helperFunction);
		}
	}
});
define('ember-truth-helpers/utils/truth-convert', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = truthConvert;

  function truthConvert(result) {
    var truthy = result && _ember['default'].get(result, 'isTruthy');
    if (typeof truthy === 'boolean') {
      return truthy;
    }

    if (_ember['default'].isArray(result)) {
      return _ember['default'].get(result, 'length') !== 0;
    } else {
      return !!result;
    }
  }
});
define('ember-wormhole/components/ember-wormhole', ['exports', 'ember', 'ember-wormhole/templates/components/ember-wormhole', 'ember-wormhole/utils/dom'], function (exports, _ember, _emberWormholeTemplatesComponentsEmberWormhole, _emberWormholeUtilsDom) {
  'use strict';

  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  var observer = _ember['default'].observer;
  var run = _ember['default'].run;

  exports['default'] = Component.extend({
    layout: _emberWormholeTemplatesComponentsEmberWormhole['default'],

    /*
     * Attrs
     */
    to: computed.alias('destinationElementId'),
    destinationElementId: null,
    destinationElement: computed('destinationElementId', 'renderInPlace', function () {
      var renderInPlace = this.get('renderInPlace');
      if (renderInPlace) {
        return this._element;
      }
      var id = this.get('destinationElementId');
      if (!id) {
        return null;
      }
      return (0, _emberWormholeUtilsDom.findElementById)(this._dom.document, id);
    }),
    renderInPlace: false,

    /*
     * Lifecycle
     */
    init: function init() {
      this._super.apply(this, arguments);

      // Private Ember API usage. Get the dom implementation used by the current
      // renderer, be it native browser DOM or Fastboot SimpleDOM
      this._dom = this.renderer._dom;

      // Create text nodes used for the head, tail
      this._wormholeHeadNode = this._dom.document.createTextNode('');
      this._wormholeTailNode = this._dom.document.createTextNode('');

      // A prop to help in the mocking of didInsertElement timing for Fastboot
      this._didInsert = false;
    },

    /*
     * didInsertElement does not fire in Fastboot. Here we use willRender and
     * a _didInsert property to approximate the timing. Importantly we want
     * to run appendToDestination after the child nodes have rendered.
     */
    willRender: function willRender() {
      var _this = this;

      this._super.apply(this, arguments);
      if (!this._didInsert) {
        this._didInsert = true;
        run.schedule('afterRender', function () {
          if (_this.isDestroyed) {
            return;
          }
          _this._element = _this._wormholeHeadNode.parentNode;
          if (!_this._element) {
            throw new Error('The head node of a wormhole must be attached to the DOM');
          }
          _this._appendToDestination();
        });
      }
    },

    willDestroyElement: function willDestroyElement() {
      var _this2 = this;

      // not called in fastboot
      this._super.apply(this, arguments);
      this._didInsert = false;
      var _wormholeHeadNode = this._wormholeHeadNode;
      var _wormholeTailNode = this._wormholeTailNode;

      run.schedule('render', function () {
        _this2._removeRange(_wormholeHeadNode, _wormholeTailNode);
      });
    },

    _destinationDidChange: observer('destinationElement', function () {
      var destinationElement = this.get('destinationElement');
      if (destinationElement !== this._wormholeHeadNode.parentNode) {
        run.schedule('render', this, '_appendToDestination');
      }
    }),

    _appendToDestination: function _appendToDestination() {
      var destinationElement = this.get('destinationElement');
      if (!destinationElement) {
        var destinationElementId = this.get('destinationElementId');
        if (destinationElementId) {
          throw new Error('ember-wormhole failed to render into \'#' + this.get('destinationElementId') + '\' because the element is not in the DOM');
        }
        throw new Error('ember-wormhole failed to render content because the destinationElementId was set to an undefined or falsy value.');
      }

      var currentActiveElement = (0, _emberWormholeUtilsDom.getActiveElement)();
      this._appendRange(destinationElement, this._wormholeHeadNode, this._wormholeTailNode);
      if (currentActiveElement && (0, _emberWormholeUtilsDom.getActiveElement)() !== currentActiveElement) {
        currentActiveElement.focus();
      }
    },

    _appendRange: function _appendRange(destinationElement, firstNode, lastNode) {
      while (firstNode) {
        destinationElement.insertBefore(firstNode, null);
        firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
      }
    },

    _removeRange: function _removeRange(firstNode, lastNode) {
      var node = lastNode;
      do {
        var next = node.previousSibling;
        if (node.parentNode) {
          node.parentNode.removeChild(node);
          if (node === firstNode) {
            break;
          }
        }
        node = next;
      } while (node);
    }

  });
});
define("ember-wormhole/templates/components/ember-wormhole", ["exports"], function (exports) {
  "use strict";

  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "modules/ember-wormhole/templates/components/ember-wormhole.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "unbound", [["get", "_wormholeHeadNode", ["loc", [null, [1, 10], [1, 27]]]]], [], ["loc", [null, [1, 0], [1, 31]]]], ["content", "yield", ["loc", [null, [2, 0], [2, 11]]]], ["inline", "unbound", [["get", "_wormholeTailNode", ["loc", [null, [3, 10], [3, 27]]]]], [], ["loc", [null, [3, 0], [3, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('ember-wormhole/utils/dom', ['exports'], function (exports) {
  'use strict';

  exports.getActiveElement = getActiveElement;
  exports.findElementById = findElementById;

  /*
   * Implement some helpers methods for interacting with the DOM,
   * be it Fastboot's SimpleDOM or a browser's version.
   */

  function getActiveElement() {
    if (typeof document === 'undefined') {
      return null;
    } else {
      return document.activeElement;
    }
  }

  function childNodesOfElement(element) {
    var children = [];
    var child = element.firstChild;
    while (child) {
      children.push(child);
      child = child.nextSibling;
    }
    return children;
  }

  function findElementById(doc, id) {
    var nodes = childNodesOfElement(doc);
    var node = undefined;

    while (nodes.length) {
      node = nodes.shift();

      if (node.getAttribute && node.getAttribute('id') === id) {
        return node;
      }

      nodes = childNodesOfElement(node).concat(nodes);
    }
  }
});//# sourceMappingURL=addons.map