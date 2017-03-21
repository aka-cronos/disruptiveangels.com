$(document).ready(function () {
  $('#burguerIcon').click(function() {
    $(this).toggleClass("is-active"),
    $('.main-header').toggleClass("is-active"),
    $('.mobileNav').toggleClass("is-active")
  });
});
