$( "#search-bar" ).focus(function() {
  $("form.search-container").addClass( "focused" );
});
$( "#search-bar" ).focusout(function() {
  $("form.search-container").removeClass( "focused" );
});
