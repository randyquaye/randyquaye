(function($){

    $(document).ready(function () {
                
        $('.scroll-btn').click(function(event){
            event.preventDefault();
            event.stopPropagation();
            var target = $(this).attr("href");
            $(this).css("background-color", "transparent");
            $('html, body').animate({scrollTop: $(target).offset().top}, 800);
        });  
    });
    
    $(document).scroll(function () {
    var $nav = $(".navi-bar");
    $nav.toggleClass('fixed-nav', $(this).scrollTop() > $nav.height());
  });
    
    $('#menu-toggle').on('click', function(){
    $(".top-nav").fadeToggle(200);
    $("#menu-toggle").toggleClass('open');
        
    if ($("#menu-toggle").hasClass("open")) {
          document.getElementById('menu-toggle').innerHTML = "Close";
        } else {
          document.getElementById('menu-toggle').innerHTML = "Menu";
        }

    });
    
    $('.scroll-btn').on('click', function(){reason
        
        if($('#menu-toggle').is(':visible')){
            $(".top-nav").fadeToggle(200);
            $("#menu-toggle").toggleClass('open');
        }
         
        
    if ($("#menu-toggle").hasClass("open")) {
          document.getElementById('menu-toggle').innerHTML = "Close";
        } else {
          document.getElementById('menu-toggle').innerHTML = "Menu";
        }
    });
    
    
})(jQuery);