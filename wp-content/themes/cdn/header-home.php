<?php

    $prefix_event = 'event_meta_';
    $prefix_default = 'defaults_meta_';

    // Linked Posts
    if ($featured_event_id = rwmb_meta(  $prefix_default . 'hpfeatured-id', get_the_ID() ) ):

      $featured_event = get_post($featured_event_id);
      $event_title = $featured_event->post_title;
      $event_excerpt = $featured_event->post_excerpt;
      $event_url = $featured_event->guid;
      $event_type = $featured_event->post_type;
      $event_dates = rwmb_meta(  $prefix_event . 'event_date', array(), $featured_event_id );
?>

  <header class="site-branding plain">
    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
    <div class="home-featured plain">
      <?php echo get_the_post_thumbnail( $featured_event_id, '', '' ); ?>
      <a href="<?php echo $event_url; ?>">
        <div class="featured-title">
          <div class="meta"><?php echo $event_dates; ?></div>
          <h1 class='home-featured-title'><?php echo $event_title ?></h1>
          <div class="home-featured-meta meta">Marguerite Duras / Sylvain Maurice</div>
        </div>
      </a>
    </div>   
  </header><!-- .site-branding -->

  <?php endif; ?>

  <header id="masthead" class="site-header" role="banner">
    <nav id="site-navigation" class="main-navigation" role="navigation">
      <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
    </nav><!-- #site-navigation -->
    <?php get_search_form( ); ?>
  </header><!-- #masthead -->
