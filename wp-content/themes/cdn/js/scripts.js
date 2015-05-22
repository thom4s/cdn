

jQuery(function($) {
  $(document).ready(function() {


    // Walker Menu Navigation
    var $itemsWithChildren = $('.menu-item-has-children > a');
    var $subMenu = $('.sub-menu');

    $itemsWithChildren.on('click', function(event) {

      event.preventDefault();
      
      $subMenu.each(function() {
        var wrap = $(this);
        wrap.hide();
      });

      $(this).parent().find($subMenu).toggle();
    });



    $('.bxslider-video').bxSlider({
      video: true,
      useCSS: false,
      pager: false,
      controls: true,
      auto: false,
      nextText: '',
      prevText: '',
      onSliderLoad: function(currentIndex){
        $('.event-slider').css('opacity', '1');
      }
    });

    $('#gotovideo').click(function(event){
      event.preventDefault();
      var slider = $('.bxslider-video').bxSlider();
      
      slider.reloadSlider({
        video: true,
        useCSS: false,
        pager: false,
        controls: true,
        auto: false,
        nextText: '',
        prevText: '',
      });

      var current = slider.getCurrentSlide();
      console.log('current: ' + current);

      var slideQty = slider.getSlideCount();
      console.log('quantity: ' + slideQty);

      slider.goToSlide(slideQty - 1);

    });

    var str=location.href.toLowerCase();
    $(".calendar-filter .cat-item a").each(function() {
      if (str.indexOf(this.href.toLowerCase()) > -1) {
        $(this).parent().addClass("active");
      }
    });
 

    var trigger_in = $('#trigger-in');
    var trigger_out = $('#trigger-out');
    trigger_in.click(function(){
      $('.collapsed').show();
    });
    trigger_out.click(function(){
      $('.collapsed').hide();
    });
  

    // Adapt fontsize of featured title based on word count
    // Font size is 73px by default
    // Set at 50px for 
    var $featured_title = $(".featured-title");
    var $numWords = $featured_title.text().split(" ").length;
    
    if (($numWords >= 10) && ($numWords < 20)) {
        $featured_title.css("font-size", "50px");
        $featured_title.css("line-height", "50px");
    }
    else if ( $numWords >= 20 ) {
        $featured_title.css("font-size", "40px");
        $featured_title.css("line-height", "40px");
    }
    else {
    }


  });
});
