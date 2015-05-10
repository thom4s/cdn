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
    $subtitle = rwmb_meta( $prefix_default . 'subtitle' );

    $args = array(
      'post_type'       => 'event',
      'posts_per_page'  => -1,
      'status'          => 'published',
      'tax_query'       => array(
        'relation' => 'AND',
        array(
          'taxonomy'      => 'event_cat',
          'field'         => 'slug',
          'terms'         => array('spectacle'),
        ),
      ),
      'orderby'   => 'meta_value_num',
      'meta_key'  => 'event_meta_firstdate',
      'order'      => 'ASC',
    );
    
    // Get query vars if existed
    if ( get_query_var('quoi') ):
      $args['tax_query'][] = array(
          'taxonomy'  =>  'event_type',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('quoi'))
        );
    endif;

get_header(); ?>

  <div id="primary" class="content-area content-saison">
    <main id="main" class="site-main" role="main">

      <header class="entry-header bg">
        <div class="entry-header-inner">

          <?php the_title( '<h1 class="entry-title l-12col l-first l-1col-push">', '</h1>' ); ?>
          <div class="post-excerpt l-12col l-first l-1col-push"><?php echo $introduction; ?></div>

          <ul class="calendar-filter l-15col l-first l-1col-push clearfix">
            <?php 
              $filter_args = array(
                'hide_empty'         => 1,
                'taxonomy'           => 'event_type',
                'title_li'           => __( '<h4>Filtrer par </h4>' ),
              );
            ?>
            
            <?php wp_list_categories( $filter_args ); ?>

          </div>
        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->

        <?php

          // The Query
          $saison_events = new WP_Query( $args );

          // The Loop
          if ( $saison_events->have_posts() ) { ?>
            <div id="grid" class="row" data-columns>

            <?php while ( $saison_events->have_posts() ) {

                $saison_events->the_post();
                $firstdate = rwmb_meta(  $prefix_event . 'firstdate', array(), $post->ID );
                $event_type = rwmb_meta(  $prefix_event . 'event_type', 'type=taxonomy&taxonomy=event_type', $post->ID );
                $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $post->ID );
                $dates = rwmb_meta(  $prefix_event . 'event_date', array(), $post->ID ); 
                $authors =  rwmb_meta( $prefix_event . 'authors', array(), $post->ID );

                include(locate_template('bloc-event.php')); } ?>

            </div>

          <?php
          } else { }
          wp_reset_postdata(); ?>

    </main><!-- #main -->
  </div><!-- #primary -->
<?php get_footer(); ?>

