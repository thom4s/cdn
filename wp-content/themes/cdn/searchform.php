
<div class="search-form-outer clearfix">
  <div class="search-arrow">
    <div class="search-arrow sprite-boxed arrow-gray-right"></div>
  </div>
  <form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
    <input type="search" class="search-field" placeholder="<?php echo esc_attr_x( 'ex : un spectacle, une ressource…', 'placeholder' ) ?>" value="<?php echo get_search_query() ?>" name="s" title="<?php echo esc_attr_x( 'Search for:', 'label' ) ?>" />
    <input type="submit" class="search-submit" value="<?php echo esc_attr_x( 'Search', 'submit button' ) ?>" />
  </form>
</div>


