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