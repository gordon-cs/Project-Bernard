import Ember from "ember";
import getAsync from "gordon360/utils/get-async";
import UnauthenticatedRouteMixin from "ember-simple-auth/mixins/unauthenticated-route-mixin";

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
    model() {
        let context = this;

        // Dashboard slider content
        let slides = [];

        let loadSlides = function () {
          return getAsync("/cms/slider", context);
        }

        let initializeSlides = function (result) {
          slides = result;
        }

        let loadModel = function() {
            return {
                "slides" : slides
            };
        };

        return loadSlides()
        .then(initializeSlides)
        .then(loadModel);
    }
});
