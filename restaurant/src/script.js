/** Add any JavaScript you need to this file. */

$(document).ready(function(){
  $(".item-img").on('click', function(){
$(".cover").fadeIn('slow');    
$(".popup").fadeIn('slow');
  });
  $(".popup").on('click', function(){
    if($(event.target).is("#close")){
        $(".cover").fadeOut('slow');    
        $(".popup").fadeOut('slow'); 
    }
  });
  
  $('.cover').on('click', function(){
     $(".cover").fadeOut('slow');    
     $(".popup").fadeOut('slow'); 
  });
});


