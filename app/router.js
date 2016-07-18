import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('specific-activity', { path: '/specific-activity/:SessionCode/:ActivityCode' });
    this.route('add-membership', { path: '/add-membership/:SessionCode/:ActivityCode/:Leading' });
    this.route('edit-membership', { path: '/edit-membership/:MembershipID' });
    this.route('transcript');
    this.route('all-activities');
    this.route('login');
});

export default Router;
