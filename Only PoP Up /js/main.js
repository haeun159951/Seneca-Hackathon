$(document).ready(function(){
    $(".btn").on('click', function(){
  $(".cover").fadeIn('slow');    
  $(".popup").fadeIn('slow');
    });
    $(".popup").on('click', function(){
      if ($(event.target).is("#close")) {
          $(".cover").fadeOut('slow');    $(".popup").fadeOut('slow'); 
      }
    });
    
    $('.cover').on('click', function(){
       $(".cover").fadeOut('slow');    $(".popup").fadeOut('slow'); 
    });


    $('#picker').datetimepicker({
      timepicker: true,
      datepicker: true,
      format: 'Y-m-d H:i', // formatDate
      value: '2020-07-03',
      hours12: false,
      step: 1
  })
  });


 