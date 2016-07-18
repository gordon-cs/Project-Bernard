import Ember from "ember";

export function isLeader(params/*, hash*/) {
    var part = params;
    return (part === "CAPT" ||
        part === "CODIR" ||
        part === "CORD" ||
        part === "DIREC" ||
        part === "PRES" ||
        part === "VICEC" ||
        part === "VICEP");
}

export default Ember.Helper.helper(isLeader);
