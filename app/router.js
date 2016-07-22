import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route("all-activities");
    this.route("transcript");
    this.route("login");
    this.route("edit-membership", { path: "/edit-membership/:MembershipID" });
    this.route("specific-activity", { path: "/specific-activity/:SessionCode/:ActivityCode" });
    this.route("add-membership", { path: "/add-membership/:SessionCode/:ActivityCode" });
    this.route("add-supervisor", { path: "/add-supervisor/:SessionCode/:ActivityCode" });
    this.route("edit-activity", { path: "/edit-activity/:SessionCode/:ActivityCode" });
});

export default Router;
