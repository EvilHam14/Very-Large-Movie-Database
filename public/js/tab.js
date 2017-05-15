$( "button.tab" ).click(function() {
    // $( this ).toggleClass( "slide" );
    $( ".hidden-content" ).toggleClass( "reveal" );
    $( ".hidden-content *" ).toggleClass( "expose" );
  });
