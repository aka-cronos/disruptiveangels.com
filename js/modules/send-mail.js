function sendEmail(){
  message = "Name: " + $("#name").val() + "Email: " + $("#mail").val() + "Message: " + $("#message").val();

  $.post("https://formspree.io/cronos@disruptiveangels.com", {message: message})
  .done(function() {
    $( ".contact" ).empty();
    $( ".contact" ).append( '<h2 class="title">Your message was send succesfully.</h2>' );
    setTimeout(function() {
      $('.featherlight').click();
    }, 1000);
  })
  .fail(function() {
    $( ".form-message" ).append( 'UPS! Try again.' );
  });
  return false;
}