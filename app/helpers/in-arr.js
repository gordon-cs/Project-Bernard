import Ember from "ember";

export function inArr(params/*, hash*/) {
    var objectToFind = params[0];
    var restOfArray = params[1];
    return restOfArray.indexOf(objectToFind) >= 0;
}

export default Ember.Helper.helper(inArr);
