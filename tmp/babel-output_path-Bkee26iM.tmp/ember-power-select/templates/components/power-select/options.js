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