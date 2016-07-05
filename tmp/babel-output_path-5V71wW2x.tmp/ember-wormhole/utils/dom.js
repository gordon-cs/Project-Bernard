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
});