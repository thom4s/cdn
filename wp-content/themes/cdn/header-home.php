
  <header class="site-branding plain">

    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>

    <div class="home-featured plain">
      <img src="<?php bloginfo( 'url' ); ?>/wp-content/img/lapluiedete1.jpg">
      <div class="featured-title">
        <div class="meta">20>27 avril 2015</div>
        <h1>La Pluie d'été</h1>
        <div class="meta">Marguerite Duras / Sylvain Maurice</div>
      </div>
    </div>   

  </header><!-- .site-branding -->


  <header id="masthead" class="site-header l-4col l-first" role="banner">

    <nav id="site-navigation" class="main-navigation" role="navigation">
      <!-- <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php _e( 'Primary Menu', 'cdn' ); ?></button> -->
      <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
    </nav><!-- #site-navigation -->

  </header><!-- #masthead -->