$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    let newvalue = 140 - this.value.length;
    $(this).parent().find('.counter').val(newvalue);

    if (newvalue < 0) {
      $(this).parent().find('.counter').css('color', 'red');
    } else {
      $(this).parent().find('.counter').css('color', '#545149');
    }
  });
});