import Ember from "ember";

export function concat(params) {
    return params.reduce((a,b) => {
        return a+b;
    });
}

export default Ember.Helper.helper(concat);
