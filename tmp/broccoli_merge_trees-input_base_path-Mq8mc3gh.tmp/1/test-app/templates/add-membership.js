export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.6.1",
        "loc": {
          "source": null,
          "start": {
            "line": 8,
            "column": 12
          },
          "end": {
            "line": 12,
            "column": 12
          }
        },
        "moduleName": "test-app/templates/add-membership.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("                ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("option");
        var el2 = dom.createTextNode("\n                    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n                ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element1, 'value');
        morphs[1] = dom.createMorphAt(element1,1,1);
        return morphs;
      },
      statements: [
        ["attribute","value",["get","session.SESS_CDE",["loc",[null,[9,32],[9,48]]]]],
        ["content","session.SESS_DESC",["loc",[null,[10,20],[10,41]]]]
      ],
      locals: ["session"],
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
            "line": 16,
            "column": 12
          },
          "end": {
            "line": 20,
            "column": 12
          }
        },
        "moduleName": "test-app/templates/add-membership.hbs"
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("                ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("option");
        var el2 = dom.createTextNode("\n                    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n                ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element0, 'value');
        morphs[1] = dom.createMorphAt(element0,1,1);
        return morphs;
      },
      statements: [
        ["attribute","value",["get","role.PART_CDE",["loc",[null,[17,32],[17,45]]]]],
        ["content","role.PART_DESC",["loc",[null,[18,20],[18,38]]]]
      ],
      locals: ["role"],
      templates: []
    };
  }());
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
          "line": 29,
          "column": 0
        }
      },
      "moduleName": "test-app/templates/add-membership.hbs"
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","container");
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("h3");
      dom.setAttribute(el2,"class","row");
      var el3 = dom.createTextNode("\n        Adding - ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","form");
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("select");
      dom.setAttribute(el3,"class","form-control");
      dom.setAttribute(el3,"placeholder","Session");
      var el4 = dom.createTextNode("\n            ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("option");
      var el5 = dom.createTextNode("Session");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("        ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("select");
      dom.setAttribute(el3,"class","form-control");
      dom.setAttribute(el3,"placeholder","Membership Level");
      var el4 = dom.createTextNode("\n            ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("option");
      var el5 = dom.createTextNode("Role");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("        ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"class","form-control btn btn-blue");
      var el4 = dom.createTextNode("Add");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element2 = dom.childAt(fragment, [0]);
      var element3 = dom.childAt(element2, [3]);
      var element4 = dom.childAt(element3, [1]);
      var element5 = dom.childAt(element3, [3]);
      var element6 = dom.childAt(element3, [13]);
      var morphs = new Array(10);
      morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]),1,1);
      morphs[1] = dom.createAttrMorph(element4, 'onchange');
      morphs[2] = dom.createMorphAt(element4,3,3);
      morphs[3] = dom.createElementMorph(element5);
      morphs[4] = dom.createMorphAt(element5,3,3);
      morphs[5] = dom.createMorphAt(element3,5,5);
      morphs[6] = dom.createMorphAt(element3,7,7);
      morphs[7] = dom.createMorphAt(element3,9,9);
      morphs[8] = dom.createMorphAt(element3,11,11);
      morphs[9] = dom.createElementMorph(element6);
      return morphs;
    },
    statements: [
      ["content","model.activity.ACT_DESC",["loc",[null,[3,17],[3,44]]]],
      ["attribute","onchange",["subexpr","action",["selectSession"],["value","target.value"],["loc",[null,[6,68],[6,115]]]]],
      ["block","each",[["get","model.sessions",["loc",[null,[8,20],[8,34]]]]],[],0,null,["loc",[null,[8,12],[12,21]]]],
      ["element","action",["selectRole"],[],["loc",[null,[14,68],[14,91]]]],
      ["block","each",[["get","model.roles",["loc",[null,[16,20],[16,31]]]]],[],1,null,["loc",[null,[16,12],[20,21]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","student-id",[]]],[],[]],"class","form-control","placeholder","Student ID"],["loc",[null,[22,8],[22,89]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","date-begin",[]]],[],[]],"class","form-control","placeholder","Begin Date"],["loc",[null,[23,8],[23,89]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","date-end",[]]],[],[]],"class","form-control","placeholder","End Date"],["loc",[null,[24,8],[24,85]]]],
      ["inline","input",[],["value",["subexpr","@mut",[["get","comments",[]]],[],[]],"class","form-control","placeholder","Comment (optional)"],["loc",[null,[25,8],[25,95]]]],
      ["element","action",["post"],[],["loc",[null,[26,50],[26,67]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));