(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
          } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
          }
    });


    // PARALLAX EFFECT
    $.stellar({
      horizontalScrolling: false,
    }); 


    // ABOUT SLIDER
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      items: 1,
      loop: true,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
    });


    // SMOOTHSCROLL
    $(function() {
      $('.custom-navbar a').on('click', function(event) {
        var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
          }, 1000);
            event.preventDefault();
      });
    });  


    $("#LoadDataForm").on("change", ".file-upload-field", function () {
      console.log("hello")
    $(".LoaderBody").css('display','flex')
    $("body").css("overflow","hidden")
    $("#LoadDataForm").submit()
    }); 

    

    // $('#btn').click(function() {
    //   var email, message, name;
    //       name = document.getElementById('name');
    //       email = document.getElementById('mail');
    //       message = document.getElementById('Message');
    //       if (!name.value || !email.value || !message.value) {
    //         alertify.error('Please check your entries');
    //         return false;
    //       } else {
    //         $.ajax({
    //           type: "POST",
    //           url: "https://mandrillapp.com/api/1.0/messages/send.json",
    //           data: {
    //             "key": "A0vyyks7RET7yrigt60d3g",
    //             "message": {
    //               "from_email": email.vlaue,
    //               "to": [
    //                   {
    //                     "email": "p2m.2020.2021@gmail.com",
    //                     "type": "to"
    //                   }
    //                 ],
    //               "autotext": "true",
    //               "subject": "RLF",
    //               "html": message.value,
    //             }
    //           }
    //          }).done(function(response) {
    //            console.log(response); // if you're into that sorta thing
    //         });
    //       }

    // });
    

  //   $(document).ready(function (e) {
  //     $('#upload').on('click', function () {
  //         var form_data = new FormData();
  //         var ins = document.getElementById('multiFiles').files.length;
           
  //         if(ins == 0) {
  //             $('#msg').html('<span style="color:red">Select at least one file</span>');
  //             return;
  //         }
           
  //         for (var x = 0; x < ins; x++) {
  //             form_data.append("files[]", document.getElementById('multiFiles').files[x]);
  //         }
           
  //         $.ajax({
  //             url: '/upload', // point to server-side URL
  //             dataType: 'json', // what to expect back from server
  //             cache: false,
  //             contentType: false,
  //             processData: false,
  //             data: form_data,
  //             type: 'post',
  //             success: function (response) { // display success response
  //                 // $('#msg').html('');
  //                 // $.each(response, function (key, data) {                         
  //                 //     if(key !== 'message') {
  //                 //         $('#msg').append(key + ' -> ' + data + '<br/>');
  //                 //     } else {
  //                 //         $('#msg').append(data + '<br/>');
  //                 //     }
  //                 // })
  //                 console.log("s",response)
  //             },
  //             error: function (response) {
  //                 // $('#msg').html(response.message); // display error response
  //                 console.log("f",response)
  //             }
  //         });
  //     });
  // });

})(jQuery);
