<?php 

    // Just get the necessary metas 
    $prefix = 'event_meta_';
    $event_booking_id = rwmb_meta( $prefix . 'event_booking_id' );


?>

  <header id="masthead" class="site-header l-4col l-first" role="banner">

    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>  

    <nav id="site-navigation" class="main-navigation" role="navigation">
      <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
    </nav><!-- #site-navigation -->

    <div class="search-bar">
      <input type="text">
      <input type="submit" value="Rechercher">
    </div>


    <?php if( is_singular( 'event' ) ){ ?>
        
        <ul class="buttons-group">
          <h5>Pratique</h5>
          <li class="btn"><a href="http://www.forumsirius.fr/orion/sartrouville.phtml?spec=<?php echo $event_booking_id; ?>">Réservez pour ce spectacle</a></li>
          <li class="btn"><a href="/saison">Retournez au calendrier</a></li>
          <li class="btn"><a href="">Le spectacle suivant</a></li>
        </ul>

    <?php } ?>


    <?php if( is_singular( 'page' ) ){ ?>

      <div class="related-content">
        
      </div>

    <?php } ?>




  </header><!-- .site-branding -->


