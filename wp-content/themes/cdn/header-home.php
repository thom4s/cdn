<?php
  $prefix_event = 'event_meta_';
  $prefix_default = 'defaults_meta_';

  // Linked Posts
  if ($featured_event_id = rwmb_meta(  $prefix_default . 'hpfeatured-id', get_the_ID() ) ):
    $featured_event = get_post($featured_event_id);
    $event_title = $featured_event->post_title;
    $event_excerpt = $featured_event->post_excerpt;
    $event_url = get_permalink($featured_event_id);
    $event_type = $featured_event->post_type;
    $event_dates = rwmb_meta( $prefix_event . 'the_dates', array(), $featured_event_id );
    $event_dates = $event_dates['date'];
    $authors =  rwmb_meta( $prefix_event . 'authors', array(), $featured_event_id ); ?>

    <header class="site-branding-home plain">
      <h1 class="site-title-home">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
          <?php bloginfo( 'name' ); ?>
        </a>
      </h1>
      
      <div class="home-featured plain">  
        <?php echo get_the_post_thumbnail( $featured_event_id, 'home-featured', '' ); ?>
        
          <div class="featured-infos">
            <a href="<?php echo $event_url; ?>">
            <div class="featured-bg"></div>
            <div class="featured-inner">
              <div class="featured-date"><?php echo $event_dates; ?></div>
              <h1 class='featured-title'><?php echo $event_title ?></h1>
              <div class="featured-authors">
                <?php 
                  $numItems = count($authors);
                  $i = 0;
                  foreach ( $authors as $k => $author ) { 
                    echo '<span class="">' . $author['name'] . '</span>';
                    if(++$i !== $numItems) { echo ' / '; }
                  }
                ?>
              </div>
            </div>
            </a>
          </div>
        
      </div>   
    </header><!-- .site-branding -->
  <?php endif; ?>

  <header id="masthead" class="site-header home-header l-4col l-first m-4col m-first" role="banner">
    <nav id="site-navigation" class="main-navigation" role="navigation">
      <div class="site-logo-home"></div>
      <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
    </nav><!-- #site-navigation -->
    <div class="header-group">
      <?php get_search_form( ); ?>
      <?php dynamic_sidebar( 'hp-aside' ); ?>
    </div>
  </header><!-- #masthead -->

