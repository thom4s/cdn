<?php 

    // Just get the necessary metas 
    $prefix = 'event_meta_';
    $event_booking_id = rwmb_meta( $prefix . 'event_booking_id' );

?>

  <header id="masthead" class="site-header" role="banner">

    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>  

    <nav id="site-navigation" class="main-navigation" role="navigation">
      <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
    </nav><!-- #site-navigation -->

    <?php get_search_form( ); ?>

    <?php if( is_singular( 'event' ) ){ ?>
      <div class="bloc-buttons bg-practical">
        <div class="bloc-buttons-inner">
          <h4>Pratique</h4>
          <ul>
            <li class="btn"><a href="http://www.forumsirius.fr/orion/sartrouville.phtml?spec=<?php echo $event_booking_id; ?>">Réservez pour ce spectacle</a></li>
            <li class="btn"><a href="/saison">Retournez au calendrier</a></li>
            <li class="btn"><a href="">Le spectacle suivant</a></li>
          </ul>
        </div>
      </div><!-- .bloc-buttons -->
    <?php } ?><!-- endif event -->


    <?php if( is_singular( 'page' ) ){ ?>

    <?php } ?><!-- endif page -->

  </header><!-- .site-branding -->


