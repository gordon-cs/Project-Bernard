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
          morphs[3] = dom.createMorphAt(element0,1,1);
          return morphs;
        },
        statements: [
          ["attribute","id",["get","dropdownId",["loc",[null,[4,11],[4,21]]]]],
          ["attribute","class",["concat",["ember-basic-dropdown-content ",["get","class",["loc",[null,[5,44],[5,49]]]]," ",["subexpr","if",[["get","renderInPlace",["loc",[null,[5,57],[5,70]]]],"ember-basic-dropdown-content--in-place"],[],["loc",[null,[5,52],[5,113]]]]," ",["subexpr","if",[["get","hPosition",["loc",[null,[5,119],[5,128]]]],["subexpr","concat",["ember-basic-dropdown-content--",["get","hPosition",["loc",[null,[5,170],[5,179]]]]],[],["loc",[null,[5,129],[5,180]]]]],[],["loc",[null,[5,114],[5,182]]]]," ",["subexpr","if",[["get","vPosition",["loc",[null,[5,188],[5,197]]]],["subexpr","concat",["ember-basic-dropdown-content--",["get","vPosition",["loc",[null,[5,239],[5,248]]]]],[],["loc",[null,[5,198],[5,249]]]]],[],["loc",[null,[5,183],[5,251]]]]," ",["get","animationClass",["loc",[null,[5,254],[5,268]]]]]]],
          ["attribute","dir",["get","dir",["loc",[null,[6,12],[6,15]]]]],
          ["content","yield",["loc",[null,[7,6],[7,15]]]]
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
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","basic-dropdown/wormhole",[],["to",["subexpr","@mut",[["get","to",["loc",[null,[2,32],[2,34]]]]],[],[]],"renderInPlace",["subexpr","@mut",[["get","renderInPlace",["loc",[null,[2,49],[2,62]]]]],[],[]],"didInsert",["subexpr","action",["didOpen"],[],["loc",[null,[2,73],[2,91]]]],"willRemove",["subexpr","action",["willClose"],[],["loc",[null,[2,103],[2,123]]]]],0,null,["loc",[null,[2,2],[9,30]]]]
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
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["block","if",[["get","dropdown.isOpen",["loc",[null,[1,6],[1,21]]]]],[],0,null,["loc",[null,[1,0],[10,7]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));