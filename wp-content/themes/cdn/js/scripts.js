

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



  $('.bxslider').bxSlider({
    video: true,
    useCSS: false
  });






  });
});
