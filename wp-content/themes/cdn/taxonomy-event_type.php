<?php
/**
 *
 * Template Name: Saison (période "réservation")
 *
 * @package cdn
 */

    $prefix_event = 'event_meta_';
    $prefix_default = 'defaults_meta_';

    $introduction = rwmb_meta( $prefix_default . 'intro' );
    $subtitle = rwmb_meta( $prefix_default . 'subtitle' );

get_header(); ?>

  <div id="primary" class="content-area content-saison">
    <main id="main" class="site-main" role="main">

      <header class="entry-header bg">
        <div class="entry-header-inner l-12col l-first l-1col-push">

          <?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
          <p class="post-excerpt"><?php echo $introduction; ?></p>

          <ul class="calendar-filter clearfix">
            <?php 
              $args = array(
                'hide_empty'         => 1,
                'taxonomy'           => 'event_type',
                'title_li'           => __( '<h2>Filtrer par : </h2>' ),
              );
            ?>
            
            <?php wp_list_categories( $args ); ?>

          </div>

        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->

      
      <div class="row">

        <?php if ( have_posts() ) { ?>

            <div class="row">
               <?php while ( have_posts() ) : the_post(); 
                $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $post->ID );
                $post_meta = rwmb_meta(  $prefix_event . 'event_date', array(), $post->ID ); ?>

                <?php include(locate_template('bloc-event.php'));  ?>

              <?php endwhile; ?>  
            </div>

        <?php } ?>


      </div>

    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>

