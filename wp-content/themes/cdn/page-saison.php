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

    if(isset($wp_query->query_vars['quoi'])) {
      $quoi = urldecode($wp_query->query_vars['quoi']);
    }


get_header(); ?>

  <div id="primary" class="content-area content-saison">
    <main id="main" class="site-main" role="main">

      <header class="entry-header bg">
        <div class="entry-header-inner l-12col l-first l-1col-push">

          <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
          <p class="post-excerpt"><?php echo $introduction; ?></p>

          <ul class="calendar-filter clearfix">
            <?php 
              $filter_args = array(
                'hide_empty'         => 1,
                'taxonomy'           => 'event_type',
                'title_li'           => __( '<h2>Filtrer par : </h2>' ),
              );
            ?>
            
            <?php wp_list_categories( $filter_args ); ?>

          </div>

        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->

      
      <div class="row">

        <?php

          $args = array(
            'post_type'       => 'event',
            'posts_per_page'  => -1,
            'status'          => 'published',
          );

          // Get query vars if existed
          if ( get_query_var('quoi') ):
            $args['tax_query'][] = array(
                'taxonomy'  =>  'event_type',
                'field'   =>  'slug',
                'terms'   =>  preg_split("#,#", get_query_var('quoi'))
              );
          endif;

          // The Query
          $saison_events = new WP_Query( $args );

          // The Loop
          if ( $saison_events->have_posts() ) { ?>
            <div class="row">

            <?php while ( $saison_events->have_posts() ) {

                $saison_events->the_post();
                $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $post->ID );
                $post_meta = rwmb_meta(  $prefix_event . 'event_date', array(), $post->ID ); ?>

              <?php include(locate_template('bloc-event.php')); } ?>

            </div>

          <?php
          } else { }
          wp_reset_postdata(); ?>
      </div>

    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>

