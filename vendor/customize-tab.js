Ember.$('.info-blocks .info-block').mouseover(function (e) {
    console.log("1");
    e.preventDefault();
    $(this).tab('show');
    console.log("!");
});
