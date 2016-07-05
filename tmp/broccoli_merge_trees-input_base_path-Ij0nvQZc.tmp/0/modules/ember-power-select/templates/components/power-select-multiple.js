export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
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
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","option",["loc",[null,[48,12],[48,18]]]],["get","select",["loc",[null,[48,19],[48,25]]]]],[],["loc",[null,[48,4],[48,27]]]]
        ],
        locals: ["option","select"],
        templates: []
      };
    }());
    var child1 = (function() {
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
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","yield",[],["to","inverse"],["loc",[null,[50,4],[50,26]]]]
        ],
        locals: [],
        templates: []
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
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","power-select",[],["afterOptionsComponent",["subexpr","@mut",[["get","afterOptionsComponent",["loc",[null,[3,26],[3,47]]]]],[],[]],"allowClear",["subexpr","@mut",[["get","allowClear",["loc",[null,[4,15],[4,25]]]]],[],[]],"ariaDescribedBy",["subexpr","@mut",[["get","ariaDescribedBy",["loc",[null,[5,20],[5,35]]]]],[],[]],"ariaInvalid",["subexpr","@mut",[["get","ariaInvalid",["loc",[null,[6,16],[6,27]]]]],[],[]],"ariaLabel",["subexpr","@mut",[["get","ariaLabel",["loc",[null,[7,14],[7,23]]]]],[],[]],"ariaLabelledBy",["subexpr","@mut",[["get","ariaLabelledBy",["loc",[null,[8,19],[8,33]]]]],[],[]],"beforeOptionsComponent",["subexpr","@mut",[["get","beforeOptionsComponent",["loc",[null,[9,27],[9,49]]]]],[],[]],"buildSelection",["subexpr","action",["buildSelection"],[],["loc",[null,[10,19],[10,44]]]],"class",["subexpr","@mut",[["get","class",["loc",[null,[11,10],[11,15]]]]],[],[]],"closeOnSelect",["subexpr","@mut",[["get","closeOnSelect",["loc",[null,[12,18],[12,31]]]]],[],[]],"destination",["subexpr","@mut",[["get","destination",["loc",[null,[13,16],[13,27]]]]],[],[]],"dir",["subexpr","@mut",[["get","dir",["loc",[null,[14,8],[14,11]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[15,13],[15,21]]]]],[],[]],"dropdownClass",["subexpr","@mut",[["get","dropdownClass",["loc",[null,[16,18],[16,31]]]]],[],[]],"extra",["subexpr","@mut",[["get","extra",["loc",[null,[17,10],[17,15]]]]],[],[]],"horizontalPosition",["subexpr","@mut",[["get","horizontalPosition",["loc",[null,[18,23],[18,41]]]]],[],[]],"initiallyOpened",["subexpr","@mut",[["get","initiallyOpened",["loc",[null,[19,20],[19,35]]]]],[],[]],"loadingMessage",["subexpr","@mut",[["get","loadingMessage",["loc",[null,[20,19],[20,33]]]]],[],[]],"matcher",["subexpr","@mut",[["get","matcher",["loc",[null,[21,12],[21,19]]]]],[],[]],"matchTriggerWidth",["subexpr","@mut",[["get","matchTriggerWidth",["loc",[null,[22,22],[22,39]]]]],[],[]],"noMatchesMessage",["subexpr","@mut",[["get","noMatchesMessage",["loc",[null,[23,21],[23,37]]]]],[],[]],"onchange",["subexpr","@mut",[["get","onchange",["loc",[null,[24,13],[24,21]]]]],[],[]],"onclose",["subexpr","@mut",[["get","onclose",["loc",[null,[25,12],[25,19]]]]],[],[]],"onfocus",["subexpr","action",["handleFocus"],[],["loc",[null,[26,12],[26,34]]]],"oninput",["subexpr","@mut",[["get","oninput",["loc",[null,[27,12],[27,19]]]]],[],[]],"onkeydown",["subexpr","action",["handleKeydown"],[],["loc",[null,[28,14],[28,38]]]],"onopen",["subexpr","action",["handleOpen"],[],["loc",[null,[29,11],[29,32]]]],"options",["subexpr","@mut",[["get","options",["loc",[null,[30,12],[30,19]]]]],[],[]],"optionsComponent",["subexpr","@mut",[["get","optionsComponent",["loc",[null,[31,21],[31,37]]]]],[],[]],"placeholder",["subexpr","@mut",[["get","placeholder",["loc",[null,[32,16],[32,27]]]]],[],[]],"registerAPI",["subexpr","readonly",[["get","registerAPI",["loc",[null,[33,26],[33,37]]]]],[],["loc",[null,[33,16],[33,38]]]],"renderInPlace",["subexpr","@mut",[["get","renderInPlace",["loc",[null,[34,18],[34,31]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[35,13],[35,21]]]]],[],[]],"search",["subexpr","@mut",[["get","search",["loc",[null,[36,11],[36,17]]]]],[],[]],"searchEnabled",["subexpr","@mut",[["get","searchEnabled",["loc",[null,[37,18],[37,31]]]]],[],[]],"searchField",["subexpr","@mut",[["get","searchField",["loc",[null,[38,16],[38,27]]]]],[],[]],"searchMessage",["subexpr","@mut",[["get","searchMessage",["loc",[null,[39,18],[39,31]]]]],[],[]],"searchPlaceholder",["subexpr","@mut",[["get","searchPlaceholder",["loc",[null,[40,22],[40,39]]]]],[],[]],"selected",["subexpr","@mut",[["get","selected",["loc",[null,[41,13],[41,21]]]]],[],[]],"selectedItemComponent",["subexpr","@mut",[["get","selectedItemComponent",["loc",[null,[42,26],[42,47]]]]],[],[]],"tabindex",["subexpr","@mut",[["get","tabindex",["loc",[null,[43,13],[43,21]]]]],[],[]],"triggerClass",["subexpr","@mut",[["get","concatenatedTriggerClass",["loc",[null,[44,17],[44,41]]]]],[],[]],"triggerComponent",["subexpr","@mut",[["get","triggerComponent",["loc",[null,[45,21],[45,37]]]]],[],[]],"verticalPosition",["subexpr","@mut",[["get","verticalPosition",["loc",[null,[46,21],[46,37]]]]],[],[]]],0,1,["loc",[null,[2,2],[51,19]]]]
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
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","yield",[["get","option",["loc",[null,[99,12],[99,18]]]],["get","select",["loc",[null,[99,19],[99,25]]]]],[],["loc",[null,[99,4],[99,27]]]]
        ],
        locals: ["option","select"],
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
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","power-select",[],["afterOptionsComponent",["subexpr","@mut",[["get","afterOptionsComponent",["loc",[null,[54,26],[54,47]]]]],[],[]],"allowClear",["subexpr","@mut",[["get","allowClear",["loc",[null,[55,15],[55,25]]]]],[],[]],"ariaDescribedBy",["subexpr","@mut",[["get","ariaDescribedBy",["loc",[null,[56,20],[56,35]]]]],[],[]],"ariaInvalid",["subexpr","@mut",[["get","ariaInvalid",["loc",[null,[57,16],[57,27]]]]],[],[]],"ariaLabel",["subexpr","@mut",[["get","ariaLabel",["loc",[null,[58,14],[58,23]]]]],[],[]],"ariaLabelledBy",["subexpr","@mut",[["get","ariaLabelledBy",["loc",[null,[59,19],[59,33]]]]],[],[]],"beforeOptionsComponent",["subexpr","@mut",[["get","beforeOptionsComponent",["loc",[null,[60,27],[60,49]]]]],[],[]],"buildSelection",["subexpr","action",["buildSelection"],[],["loc",[null,[61,19],[61,44]]]],"class",["subexpr","@mut",[["get","class",["loc",[null,[62,10],[62,15]]]]],[],[]],"closeOnSelect",["subexpr","@mut",[["get","closeOnSelect",["loc",[null,[63,18],[63,31]]]]],[],[]],"destination",["subexpr","@mut",[["get","destination",["loc",[null,[64,16],[64,27]]]]],[],[]],"dir",["subexpr","@mut",[["get","dir",["loc",[null,[65,8],[65,11]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[66,13],[66,21]]]]],[],[]],"dropdownClass",["subexpr","@mut",[["get","dropdownClass",["loc",[null,[67,18],[67,31]]]]],[],[]],"extra",["subexpr","@mut",[["get","extra",["loc",[null,[68,10],[68,15]]]]],[],[]],"horizontalPosition",["subexpr","@mut",[["get","horizontalPosition",["loc",[null,[69,23],[69,41]]]]],[],[]],"initiallyOpened",["subexpr","@mut",[["get","initiallyOpened",["loc",[null,[70,20],[70,35]]]]],[],[]],"loadingMessage",["subexpr","@mut",[["get","loadingMessage",["loc",[null,[71,19],[71,33]]]]],[],[]],"matcher",["subexpr","@mut",[["get","matcher",["loc",[null,[72,12],[72,19]]]]],[],[]],"matchTriggerWidth",["subexpr","@mut",[["get","matchTriggerWidth",["loc",[null,[73,22],[73,39]]]]],[],[]],"noMatchesMessage",["subexpr","@mut",[["get","noMatchesMessage",["loc",[null,[74,21],[74,37]]]]],[],[]],"onchange",["subexpr","@mut",[["get","onchange",["loc",[null,[75,13],[75,21]]]]],[],[]],"onclose",["subexpr","@mut",[["get","onclose",["loc",[null,[76,12],[76,19]]]]],[],[]],"onfocus",["subexpr","action",["handleFocus"],[],["loc",[null,[77,12],[77,34]]]],"oninput",["subexpr","@mut",[["get","oninput",["loc",[null,[78,12],[78,19]]]]],[],[]],"onkeydown",["subexpr","action",["handleKeydown"],[],["loc",[null,[79,14],[79,38]]]],"onopen",["subexpr","action",["handleOpen"],[],["loc",[null,[80,11],[80,32]]]],"options",["subexpr","@mut",[["get","options",["loc",[null,[81,12],[81,19]]]]],[],[]],"optionsComponent",["subexpr","@mut",[["get","optionsComponent",["loc",[null,[82,21],[82,37]]]]],[],[]],"placeholder",["subexpr","@mut",[["get","placeholder",["loc",[null,[83,16],[83,27]]]]],[],[]],"registerAPI",["subexpr","readonly",[["get","registerAPI",["loc",[null,[84,26],[84,37]]]]],[],["loc",[null,[84,16],[84,38]]]],"renderInPlace",["subexpr","@mut",[["get","renderInPlace",["loc",[null,[85,18],[85,31]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[86,13],[86,21]]]]],[],[]],"search",["subexpr","@mut",[["get","search",["loc",[null,[87,11],[87,17]]]]],[],[]],"searchEnabled",["subexpr","@mut",[["get","searchEnabled",["loc",[null,[88,18],[88,31]]]]],[],[]],"searchField",["subexpr","@mut",[["get","searchField",["loc",[null,[89,16],[89,27]]]]],[],[]],"searchMessage",["subexpr","@mut",[["get","searchMessage",["loc",[null,[90,18],[90,31]]]]],[],[]],"searchPlaceholder",["subexpr","@mut",[["get","searchPlaceholder",["loc",[null,[91,22],[91,39]]]]],[],[]],"selected",["subexpr","@mut",[["get","selected",["loc",[null,[92,13],[92,21]]]]],[],[]],"selectedItemComponent",["subexpr","@mut",[["get","selectedItemComponent",["loc",[null,[93,26],[93,47]]]]],[],[]],"tabindex",["subexpr","@mut",[["get","tabindex",["loc",[null,[94,13],[94,21]]]]],[],[]],"triggerClass",["subexpr","@mut",[["get","concatenatedTriggerClass",["loc",[null,[95,17],[95,41]]]]],[],[]],"triggerComponent",["subexpr","@mut",[["get","triggerComponent",["loc",[null,[96,21],[96,37]]]]],[],[]],"verticalPosition",["subexpr","@mut",[["get","verticalPosition",["loc",[null,[97,21],[97,37]]]]],[],[]]],0,null,["loc",[null,[53,2],[100,19]]]]
      ],
      locals: [],
      templates: [child0]
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
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["block","if",[["subexpr","hasBlock",["inverse"],[],["loc",[null,[1,6],[1,26]]]]],[],0,1,["loc",[null,[1,0],[101,7]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));