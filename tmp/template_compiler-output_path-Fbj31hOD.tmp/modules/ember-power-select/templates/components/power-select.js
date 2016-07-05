export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
      var child0 = (function() {
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
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            return morphs;
          },
          statements: [
            ["inline","yield",[["get","opt",["loc",[null,[40,14],[40,17]]]],["get","term",["loc",[null,[40,18],[40,22]]]]],[],["loc",[null,[40,6],[40,24]]]]
          ],
          locals: ["opt","term"],
          templates: []
        };
      }());
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
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["block","component",[["get","triggerComponent",["loc",[null,[24,17],[24,33]]]]],["allowClear",["subexpr","readonly",[["get","allowClear",["loc",[null,[25,27],[25,37]]]]],[],["loc",[null,[25,17],[25,38]]]],"buildSelection",["subexpr","readonly",[["get","buildSelection",["loc",[null,[26,31],[26,45]]]]],[],["loc",[null,[26,21],[26,46]]]],"extra",["subexpr","readonly",[["get","extra",["loc",[null,[27,22],[27,27]]]]],[],["loc",[null,[27,12],[27,28]]]],"listboxId",["subexpr","readonly",[["get","optionsId",["loc",[null,[28,26],[28,35]]]]],[],["loc",[null,[28,16],[28,36]]]],"onFocus",["subexpr","action",["onFocus"],[],["loc",[null,[29,14],[29,32]]]],"activate",["subexpr","action",["activate"],[],["loc",[null,[30,15],[30,34]]]],"onBlur",["subexpr","action",["deactivate"],[],["loc",[null,[31,13],[31,34]]]],"onInput",["subexpr","action",["onInput"],[],["loc",[null,[32,14],[32,32]]]],"placeholder",["subexpr","readonly",[["get","placeholder",["loc",[null,[33,28],[33,39]]]]],[],["loc",[null,[33,18],[33,40]]]],"onKeydown",["subexpr","action",["onKeydown"],[],["loc",[null,[34,16],[34,36]]]],"searchEnabled",["subexpr","readonly",[["get","searchEnabled",["loc",[null,[35,30],[35,43]]]]],[],["loc",[null,[35,20],[35,44]]]],"searchField",["subexpr","readonly",[["get","searchField",["loc",[null,[36,28],[36,39]]]]],[],["loc",[null,[36,18],[36,40]]]],"select",["subexpr","readonly",[["get","publicAPI",["loc",[null,[37,23],[37,32]]]]],[],["loc",[null,[37,13],[37,33]]]],"selectedItemComponent",["subexpr","readonly",[["get","selectedItemComponent",["loc",[null,[38,38],[38,59]]]]],[],["loc",[null,[38,28],[38,60]]]]],0,null,["loc",[null,[24,4],[41,18]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
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
            dom.setAttribute(el1,"class","ember-power-select-options");
            dom.setAttribute(el1,"role","listbox");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("li");
            dom.setAttribute(el2,"class","ember-power-select-option ember-power-select-option--search-message");
            dom.setAttribute(el2,"role","option");
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
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),1,1);
            return morphs;
          },
          statements: [
            ["content","searchMessage",["loc",[null,[61,10],[61,27]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          var child0 = (function() {
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
                morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                return morphs;
              },
              statements: [
                ["inline","yield",[],["to","inverse"],["loc",[null,[66,8],[66,30]]]]
              ],
              locals: [],
              templates: []
            };
          }());
          var child1 = (function() {
            var child0 = (function() {
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
                  dom.setAttribute(el1,"class","ember-power-select-options");
                  dom.setAttribute(el1,"role","listbox");
                  var el2 = dom.createTextNode("\n          ");
                  dom.appendChild(el1, el2);
                  var el2 = dom.createElement("li");
                  dom.setAttribute(el2,"class","ember-power-select-option ember-power-select-option--no-matches-message");
                  dom.setAttribute(el2,"role","option");
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
                  morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),1,1);
                  return morphs;
                },
                statements: [
                  ["content","noMatchesMessage",["loc",[null,[70,12],[70,32]]]]
                ],
                locals: [],
                templates: []
              };
            }());
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
                morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
                dom.insertBoundary(fragment, 0);
                dom.insertBoundary(fragment, null);
                return morphs;
              },
              statements: [
                ["block","if",[["get","noMatchesMessage",["loc",[null,[67,16],[67,32]]]]],[],0,null,["loc",[null,[67,6],[73,6]]]]
              ],
              locals: [],
              templates: [child0]
            };
          }());
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
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [
              ["block","if",[["subexpr","hasBlock",["inverse"],[],["loc",[null,[65,12],[65,32]]]]],[],0,1,["loc",[null,[65,6],[73,13]]]]
            ],
            locals: [],
            templates: [child0, child1]
          };
        }());
        var child1 = (function() {
          var child0 = (function() {
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
                morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
                return morphs;
              },
              statements: [
                ["inline","yield",[["get","option",["loc",[null,[84,16],[84,22]]]],["get","term",["loc",[null,[84,23],[84,27]]]]],[],["loc",[null,[84,8],[84,29]]]]
              ],
              locals: ["option","term"],
              templates: []
            };
          }());
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
              morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
              dom.insertBoundary(fragment, 0);
              return morphs;
            },
            statements: [
              ["block","component",[["get","optionsComponent",["loc",[null,[75,19],[75,35]]]]],["class","ember-power-select-options","groupIndex","","loadingMessage",["subexpr","readonly",[["get","loadingMessage",["loc",[null,[78,33],[78,47]]]]],[],["loc",[null,[78,23],[78,48]]]],"id",["subexpr","readonly",[["get","optionsId",["loc",[null,[79,21],[79,30]]]]],[],["loc",[null,[79,11],[79,31]]]],"options",["subexpr","readonly",[["get","publicAPI.results",["loc",[null,[80,26],[80,43]]]]],[],["loc",[null,[80,16],[80,44]]]],"optionsComponent",["subexpr","readonly",[["get","optionsComponent",["loc",[null,[81,35],[81,51]]]]],[],["loc",[null,[81,25],[81,52]]]],"select",["subexpr","readonly",[["get","publicAPI",["loc",[null,[82,25],[82,34]]]]],[],["loc",[null,[82,15],[82,35]]]]],0,null,["loc",[null,[75,6],[85,20]]]]
            ],
            locals: [],
            templates: [child0]
          };
        }());
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
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","mustShowNoMessages",["loc",[null,[64,14],[64,32]]]]],[],0,1,["loc",[null,[64,4],[86,4]]]]
          ],
          locals: [],
          templates: [child0, child1]
        };
      }());
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
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","component",[["get","beforeOptionsComponent",["loc",[null,[48,16],[48,38]]]]],["extra",["subexpr","readonly",[["get","extra",["loc",[null,[49,22],[49,27]]]]],[],["loc",[null,[49,12],[49,28]]]],"listboxId",["subexpr","readonly",[["get","optionsId",["loc",[null,[50,26],[50,35]]]]],[],["loc",[null,[50,16],[50,36]]]],"onInput",["subexpr","action",["onInput"],[],["loc",[null,[51,14],[51,32]]]],"onKeydown",["subexpr","action",["onKeydown"],[],["loc",[null,[52,16],[52,36]]]],"searchEnabled",["subexpr","readonly",[["get","searchEnabled",["loc",[null,[53,30],[53,43]]]]],[],["loc",[null,[53,20],[53,44]]]],"onFocus",["subexpr","action",["onFocus"],[],["loc",[null,[54,14],[54,32]]]],"onBlur",["subexpr","action",["deactivate"],[],["loc",[null,[55,13],[55,34]]]],"searchPlaceholder",["subexpr","readonly",[["get","searchPlaceholder",["loc",[null,[56,34],[56,51]]]]],[],["loc",[null,[56,24],[56,52]]]],"select",["subexpr","readonly",[["get","publicAPI",["loc",[null,[57,23],[57,32]]]]],[],["loc",[null,[57,13],[57,33]]]]],["loc",[null,[48,4],[57,35]]]],
          ["block","if",[["get","mustShowSearchMessage",["loc",[null,[58,10],[58,31]]]]],[],0,1,["loc",[null,[58,4],[86,11]]]],
          ["inline","component",[["get","afterOptionsComponent",["loc",[null,[87,16],[87,37]]]]],["select",["subexpr","readonly",[["get","publicAPI",["loc",[null,[87,55],[87,64]]]]],[],["loc",[null,[87,45],[87,65]]]],"extra",["subexpr","readonly",[["get","extra",["loc",[null,[87,82],[87,87]]]]],[],["loc",[null,[87,72],[87,88]]]]],["loc",[null,[87,4],[87,90]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": [
            "wrong-type",
            "multiple-nodes"
          ]
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
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","dropdown.trigger",[],["ariaDescribedBy",["subexpr","readonly",[["get","ariaDescribedBy",["loc",[null,[14,30],[14,45]]]]],[],["loc",[null,[14,20],[14,46]]]],"ariaInvalid",["subexpr","readonly",[["get","ariaInvalid",["loc",[null,[15,26],[15,37]]]]],[],["loc",[null,[15,16],[15,38]]]],"ariaLabel",["subexpr","readonly",[["get","ariaLabel",["loc",[null,[16,24],[16,33]]]]],[],["loc",[null,[16,14],[16,34]]]],"ariaLabelledBy",["subexpr","readonly",[["get","ariaLabelledBy",["loc",[null,[17,29],[17,43]]]]],[],["loc",[null,[17,19],[17,44]]]],"ariaRequired",["subexpr","readonly",[["get","required",["loc",[null,[18,27],[18,35]]]]],[],["loc",[null,[18,17],[18,36]]]],"class",["subexpr","readonly",[["get","concatenatedTriggerClasses",["loc",[null,[19,20],[19,46]]]]],[],["loc",[null,[19,10],[19,47]]]],"onKeydown",["subexpr","action",["onTriggerKeydown"],[],["loc",[null,[20,14],[20,41]]]],"onFocus",["subexpr","action",["onTriggerFocus"],[],["loc",[null,[21,12],[21,37]]]],"onBlur",["subexpr","action",["deactivate"],[],["loc",[null,[22,11],[22,32]]]],"tabindex",["subexpr","readonly",[["get","tabindex",["loc",[null,[23,23],[23,31]]]]],[],["loc",[null,[23,13],[23,32]]]]],0,null,["loc",[null,[13,2],[43,23]]]],
        ["block","dropdown.content",[],["class",["subexpr","readonly",[["get","concatenatedDropdownClasses",["loc",[null,[46,20],[46,47]]]]],[],["loc",[null,[46,10],[46,48]]]],"to",["subexpr","readonly",[["get","destination",["loc",[null,[47,17],[47,28]]]]],[],["loc",[null,[47,7],[47,29]]]]],1,null,["loc",[null,[45,2],[88,23]]]]
      ],
      locals: ["dropdown"],
      templates: [child0, child1]
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "wrong-type"
        ]
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
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["block","basic-dropdown",[],["horizontalPosition",["subexpr","readonly",[["get","horizontalPosition",["loc",[null,[2,31],[2,49]]]]],[],["loc",[null,[2,21],[2,50]]]],"initiallyOpened",["subexpr","readonly",[["get","initiallyOpened",["loc",[null,[3,28],[3,43]]]]],[],["loc",[null,[3,18],[3,44]]]],"matchTriggerWidth",["subexpr","readonly",[["get","matchTriggerWidth",["loc",[null,[4,30],[4,47]]]]],[],["loc",[null,[4,20],[4,48]]]],"onClose",["subexpr","action",["onClose"],[],["loc",[null,[5,10],[5,28]]]],"onOpen",["subexpr","action",["onOpen"],[],["loc",[null,[6,9],[6,26]]]],"registerAPI",["subexpr","action",["registerAPI"],[],["loc",[null,[7,14],[7,36]]]],"renderInPlace",["subexpr","readonly",[["get","renderInPlace",["loc",[null,[8,26],[8,39]]]]],[],["loc",[null,[8,16],[8,40]]]],"verticalPosition",["subexpr","readonly",[["get","verticalPosition",["loc",[null,[9,29],[9,45]]]]],[],["loc",[null,[9,19],[9,46]]]],"disabled",["subexpr","readonly",[["get","disabled",["loc",[null,[10,21],[10,29]]]]],[],["loc",[null,[10,11],[10,30]]]]],0,null,["loc",[null,[1,0],[89,19]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));