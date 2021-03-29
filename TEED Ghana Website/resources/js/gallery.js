(function($){

$(document).ready(function () {
        
    
        if (Modernizr.mq('(max-width: 480px)'))
        {
            
            $('.nav-to').click(function(event){
                 event.preventDefault();
                event.stopPropagation();
                $('.fixed-nav').css("display","none");
                var targets = $(this).attr("href");
                $('.active-photo').removeClass("active-photo");
                $(this).parent().addClass('active-photo');
                $('html, body').animate({scrollTop: $(targets).offset().top}, 900);
                });
        }
    
        else
        { 

            $('.nav-to').click(function(event){
                event.preventDefault();
                event.stopPropagation();
                var targets = $(this).attr("href");
                $('.active-photo').removeClass("active-photo");
                $(this).parent().addClass('active-photo');
                $('html, body').animate({scrollTop: $(targets).offset().top}, 900);
            });
        }
    
        $(".gallery img").click(function() {
            var image  = $(this).attr('src');
           $('#imagepreview').attr('src', image ); 
           $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
        });
    
    
        $(".btm").click(function() {
            $('.fixed-nav').toggle("slide");
        });
    
        

        $('.btt').click(function(){
                $('html, body').animate({scrollTop: $('.header').offset().top}, 800);
            });

        


   });

})(jQuery);