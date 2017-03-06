
;(function($, window, document, undefined ) {

  $.fn.slide = function(options) {

    // Options

    var settings = $.extend({
      slideShow : false,
      startOn : 0,
      speed : 3500,
      transition : 400
    }, options);

    return this.each(function() {

      // Variables

      var
      wrapper = $(this),
      slider = wrapper.children(),
      slides = slider.eq(0).children(),
      buttons = slider.eq(1).children(),
      slide_count = slides.length,
      transition = settings.transition,
      starting_slide = settings.startOn,
      target = starting_slide > slide_count - 1 ? 0 : starting_slide,
      animating = false,
      timer,
      // Reset Slideshow

      reset_timer = settings.slideShow ? function() {
        clearTimeout(timer);
        timer = setTimeout(next_slide, settings.speed);
      } : $.noop;

      buttons.each(function(index, elem){
        $(elem).data('i', parseInt(index));
      });

      // Animate Slider

      function get_height(target) {
        return ((slides.eq(target).height() / slider.width()) * 431);
      }

      function animate_slide(target) {
        if (!animating) {
          animating = true;
          buttons.removeClass('selected');
          var target_slide = slides.eq(target);
          var target_button = buttons.eq(target);
          target_button.addClass('selected');
          slider.eq(0).height(get_height);
          slides.not(target_slide).fadeOut(transition, function(){
            target_slide.delay(400).fadeIn(transition);
          });

          slides.animate(transition, function() {
            animating = false;
          });

          reset_timer();

        }
      }

      // To Slide
      function to_slide(target) {
        animate_slide(target);
      }

      function next_slide() {
        target = target === slide_count - 1 ? 0 : target + 1;
        animate_slide(target);
      }

      $(window).load(function() {
        buttons.click(function(i){
          i.preventDefault();
          to_slide($(this).data('i'));
        });

        animate_slide(target);
      });
      // End
    });

  };
})(jQuery, window, document);
