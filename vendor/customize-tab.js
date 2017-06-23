import Ember from "ember";

Ember.$('.info-blocks div').hover(function (e) {
  e.preventDefault()
  $(this).tab('show')
  console.log("!");
});
