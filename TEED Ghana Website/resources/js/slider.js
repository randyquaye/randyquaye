(function($){

$(document).ready(function () {
        
        var options = {
            swipe: false,
            slideOnInterval: true, // Slide on interval
            interval: 7000,
            magneticSwipe: false
        }
    
        $(".slider").simpleSlider(options);
    
        $('.slider-left').click(function() {
            var element = document.getElementById("slide");
            $(element).css("transform","translate(0%,0%)");

        });
    
        $('.slider-middle').click(function() {
            var element = document.getElementById("slide");
            $(element).css("transform","translate(-16.666%,0%)");

        });
    
        $('.slider-right').click(function() {
            var element = document.getElementById("slide");
            $(element).css("transform","translate(-33.333%,0%)");

        });
    
        
    

        $('.btt').click(function(){
                $('html, body').animate({scrollTop: $('.header').offset().top}, 800);
            });

        $('.teed-toggle').click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            $('.more-teed').slideToggle("300");

           if($(this).text() == "Learn More"){ $(this).html("Show Less");}
           else{$(this).text("Learn More");}
        });
    
        $('.about-toggle').click(function(event) {
                event.preventDefault();
            event.stopPropagation();
                $('.more-about').slideToggle("300");

               if($(this).text() == "Learn More"){ $(this).html("Show Less");}
               else{$(this).text("Learn More");}
            });
    
          var parallax = document.querySelectorAll(".parallax"),
              speed = 0.5;

          window.onscroll = function(){
            [].slice.call(parallax).forEach(function(el,i){

              var windowYOffset = window.pageYOffset,
                  elBackgrounPos = "20% " + (windowYOffset * speed) + "px";

              el.style.backgroundPosition = elBackgrounPos;

            });
          };
    
    
        $(window).scroll(function() {
           var hT = $('.scroll-to').offset().top,
               hH = $('.scroll-to').outerHeight(),
               wH = $(window).height(),
               wS = $(this).scrollTop();
            
            
            if (wS > (100+hT+hH-wH)){
                 // progressbar.js@1.0.0 version is used
                // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

                var bar = new ProgressBar.Circle(progress, {
                  color: '#fff',
                  // This has to be the same size as the maximum width to
                  // prevent clipping
                  strokeWidth: 4,
                  trailWidth: 1,
                  easing: 'easeInOut',
                  duration: 1400,
                  text: {
                    autoStyleContainer: false
                  },
                  from: { color: '#fff', width: 1},
                  to: { color: '#ff0000', width: 1 },
                  // Set default step function for all animate calls
                  step: function(state, circle) {
                    circle.path.setAttribute('stroke', '#ff0000');
                    circle.path.setAttribute('stroke-width', state.width);
                    circle.path.setAttribute('stroke-opacity', '1');

                    var value = Math.round(circle.value() * 100);
//                    if (value === 0) {
//                      circle.setText('');
//                    } else {
//                      circle.setText(value+"%");
//                    }
                      
                      circle.setText("RECRUITING");

                  }
                });

                bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                bar.text.style.fontSize = '1.7rem';
                bar.text.style.textAlign = 'centre';
                bar.animate(1);  // Number from 0.0 to 1.0

                var bar1 = new ProgressBar.Circle(progress1, {
                  color: '#fff',
                  // This has to be the same size as the maximum width to
                  // prevent clipping
                  strokeWidth: 4,
                  trailWidth: 1,
                  easing: 'easeInOut',
                  duration: 1400,
                  text: {
                    autoStyleContainer: false
                  },
                  from: { color: '#fff', width: 1 },
                  to: { color: '#ebff00', width: 1 },
                  // Set default step function for all animate calls
                  step: function(state, circle) {
                    circle.path.setAttribute('stroke', '#ebff00');
                    circle.path.setAttribute('stroke-width', state.width);

                    var value = Math.round(circle.value() * 100);
//                    if (value === 0) {
//                      circle.setText('');
//                    } else {
//                      circle.setText(value+"%");
//                    }
                      circle.setText("LITERACY INITIATIVE");

                  }
                });

                bar1.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                bar1.text.style.fontSize = '1.7rem';
                bar1.text.style.textAlign = 'center';
                bar1.animate(1);  // Number from 0.0 to 1.0

                var bar2 = new ProgressBar.Circle(progress2, {
                  color: '#fff',
                  // This has to be the same size as the maximum width to
                  // prevent clipping
                  strokeWidth: 4,
                  trailWidth: 1,
                  easing: 'easeInOut',
                  duration: 1400,
                  text: {
                    autoStyleContainer: false
                  },
                  from: { color: '#fff', width: 1 },
                  to: { color: '#00ff00', width: 1 },
                  // Set default step function for all animate calls
                  step: function(state, circle) {
                    circle.path.setAttribute('stroke', '#00ff00');
                    circle.path.setAttribute('stroke-width', state.width);

                    var value = Math.round(circle.value() * 100);
//                    if (value === 0) {
//                      circle.setText('');
//                    } else {
//                      circle.setText("RESEARCH AND CONSULTANCY");
//                    }
                      circle.setText("RESEARCH & CONSULTANCY");


                  }
                });

                bar2.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                bar2.text.style.fontSize = '1.7rem';
                bar2.text.style.textAlign = 'center';
                bar2.animate(1);  // Number from 0.0 to 1.0

                var bar3 = new ProgressBar.Circle(progress3, {
                  color: '#fff',
                  // This has to be the same size as the maximum width to
                  // prevent clipping
                  strokeWidth: 4,
                  trailWidth: 1,
                  easing: 'easeInOut',
                  duration: 1400,
                  text: {
                    autoStyleContainer: false
                  },
                  from: { color: '#fff', width: 1 },
                  to: { color: '#0000ff', width: 1 },
                  // Set default step function for all animate calls
                  step: function(state, circle) {
                    circle.path.setAttribute('stroke', '#0000ff');
                    circle.path.setAttribute('stroke-width', state.width);

                    var value = Math.round(circle.value() * 100);
//                    if (value === 0) {
//                      circle.setText('');
//                    } else {
//                      circle.setText("LEARNING");
//                    }
                      
                      circle.setText("LEARNING");

                  }
                });

                bar3.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                bar3.text.style.fontSize = '1.7rem';
                bar3.text.style.textAlign = 'center';
                bar3.animate(1);  // Number from 0.0 to 1.0
                $('.scroll-to').removeClass("scroll-to");
               }
        });


   });

})(jQuery);