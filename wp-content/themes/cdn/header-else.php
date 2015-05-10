<?php 

    // Just get the necessary metas 
    $prefix = 'event_meta_';
    $event_booking_id = rwmb_meta( $prefix . 'the_dates' );
    if($event_booking_id) {
      $event_booking_id = $event_booking_id['booking_id'];
    }
   
?>

  <header id="masthead" class="site-header l-4col l-first" role="banner">

    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>  

    <nav id="site-navigation" class="main-navigation" role="navigation">
      <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
    </nav><!-- #site-navigation -->

    <?php get_search_form( ); ?>

    <?php if( is_singular( 'event' ) ){ 
      if(isset($wp_query->query_vars['pro'])) { 

        $pedago = rwmb_meta( $prefix . 'pedago', 'type=file' );
        $presskit = rwmb_meta( $prefix . 'presskit', 'type=file' );
        $diffusion = rwmb_meta( $prefix . 'diffusion', 'type=file' );
        $technique = rwmb_meta( $prefix . 'technique', 'type=file' );
        $pressreview = rwmb_meta( $prefix . 'pressreview', 'type=file' );
        $visuals = rwmb_meta( $prefix . 'visuals', 'type=file' );

      ?>
     
      <div class="bloc-buttons bg-practical">
        <div class="bloc-buttons-inner">
          <h4>Téléchargements</h4>
          <ul>
            <!-- Pédagogique -->
            <?php 
              if(is_array($pedago)) {
                foreach ($pedago as $file) { 
                $filetype = wp_check_filetype($file['url']);
              ?>
                <li class="btn"><a href="<?php echo $file['url']; ?>" target="_blank" title="<?php echo $file['name']; ?>">Le Dossier pédagogique (.<?php echo $filetype['ext']; ?>)</a></li>
            <?php } } ?>

            <!-- Presskit -->
            <?php 
              if(is_array($presskit)) {
                foreach ($presskit as $file) { 
                $filetype = wp_check_filetype($file['url']);
              ?>
              <li class="btn"><a href="<?php echo $file['url']; ?>" target="_blank" title="<?php echo $file['name']; ?>">Le Dossier de presse (.<?php echo $filetype['ext']; ?>)</a></li>
            <?php } } ?>

            <!-- Diffusion -->
            <?php 
              if(is_array($diffusion)) {
                foreach ($diffusion as $file) { 
                $filetype = wp_check_filetype($file['url']);
              ?>
              <li class="btn"><a href="<?php echo $file['url']; ?>" target="_blank" title="<?php echo $file['name']; ?>">Le Dossier de diffusion (.<?php echo $filetype['ext']; ?>)</a></li>
            <?php } } ?>


            <!-- Technique -->
            <?php 
              if(is_array($technique)) {
                foreach ($technique as $file) { 
                $filetype = wp_check_filetype($file['url']);
              ?>
              <li class="btn"><a href="<?php echo $file['url']; ?>" target="_blank" title="<?php echo $file['name']; ?>">Le Dossier technique (.<?php echo $filetype['ext']; ?>)</a></li>
            <?php } } ?>

            <!-- Revue de presse -->
            <?php 
              if(is_array($pressreview)) {
                foreach ($pressreview as $file) { 
                $filetype = wp_check_filetype($file['url']);
              ?>
              <li class="btn"><a href="<?php echo $file['url']; ?>" target="_blank" title="<?php echo $file['name']; ?>">La revue de presse (.<?php echo $filetype['ext']; ?>)</a></li>
            <?php } } ?>

            <!-- Visuels -->
            <?php 
              if(is_array($visuals)) {
                foreach ($visuals as $file) { 
                $filetype = wp_check_filetype($file['url']);
              ?>
              <li class="btn"><a href="<?php echo $file['url']; ?>" target="_blank" title="<?php echo $file['name']; ?>">Les visuels (.<?php echo $filetype['ext']; ?>)</a></li>
            <?php } } ?>

          </ul>
        </div>
      </div><!-- .bloc-buttons -->



      <?php } else { ?>
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
    <?php } // endif isset 
    } ?><!-- endif event -->

    <?php get_template_part('loop', 'aside-related')?>

    <?php if( is_singular( 'page' ) && !is_page_template( 'page-saison.php' ) && !is_page_template( 'page-saison-active.php' ) && !is_page_template( 'page-production.php' ) ){ ?>

      <?php dynamic_sidebar( 'sidebar-1' ); ?>

    <?php } ?><!-- endif page -->


    <?php if( is_page_template( 'page-saison.php' ) || is_page_template( 'page-saison-active.php' ) && is_page_template( 'page-production.php' ) ){ ?>
      
      <div class="saison-aside">
        <?php dynamic_sidebar( 'saison-aside' ); ?>
      </div>
      
    <?php } ?><!-- endif saison -->




  </header><!-- .site-branding -->


