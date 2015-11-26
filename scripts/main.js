$(document).ready(function () {
  var $header = $('.main-header');

  $(window).on('scroll', function () {
    if(!$('html').hasClass('sb-active')) {
      $header.toggleClass('js-main-header__static',
      $(window).scrollTop() > 0);
    }
  });
});