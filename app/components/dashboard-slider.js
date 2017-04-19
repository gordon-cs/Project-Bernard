import Ember from 'ember';

export default Ember.Component.extend({
  // Override the didInsertElement function from the Component class in order
  // to add our customized javascript for the slider
  didInsertElement: function() {
    let self = this;

    $("img").unveil(200);

    if ($(window).width() < 501) {
      $("div.rsCaption").removeClass("animated fadeInUp");
    }

    $(function($) {
      $('.mobile-menu-icon').click(function() {
        $('.mobile-menu').toggleClass('expand')
      })
    })

    $('#full-width-slider').royalSlider({
      arrowsNav: true,
      loop: true,
      numImagesToPreload: 1,
      keyboardNavEnabled: true,
      controlsInside: false,
      imageScaleMode: 'fill',
      arrowsNavAutoHide: false,
      autoScaleSlider: true,
      controlNavigation: 'bullets',
      navigateByClick: true,
      startSlideId: 0,
      autoPlay: {
        // autoplay options go gere
        enabled: true,
        delay: 8000,
        pauseOnHover: true,
        stopAtAction: false
      },
      transitionType: 'move',
      globalCaption: true,
      deeplinking: {
        enabled: true,
        change: false
      },
      /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
      imgWidth: 1500,
      imgHeight: 600
    });

    $('#stretchmind-slider').royalSlider({
      // general options go here
      imageScaleMode: 'fill',
      autoScaleSliderWidth: 819,
      autoScaleSliderHeight: 500,
      autoScaleSlider: true,
      transitionType: 'fade',
      controlsInside: true,
      controlNavigation: 'none',
      arrowsNavAutoHide: false,
      numImagesToPreload: 0,
      loopRewind: true,
      autoPlay: {
        // autoplay options go gere
        enabled: false,
        delay: 4000,
        pauseOnHover: false,
        stopAtAction: false
      }
    });

}
});
