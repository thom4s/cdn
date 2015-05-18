<?php
/**
 *
 * Template Name: Saison (période "réservation")
 *
 * @package cdn
 */
  error_reporting(E_ERROR | E_WARNING | E_PARSE);

    $prefix_event = 'event_meta_';
    $prefix_default = 'defaults_meta_';

    $introduction = rwmb_meta( $prefix_default . 'intro' );
    $subtitle = rwmb_meta( $prefix_default . 'subtitle' );
    $subtitle = rwmb_meta( $prefix_default . 'subtitle' );

    $args = array(
      'post_type'       => 'event',
      'posts_per_page'  => 15,
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
      'order'      => 'DESC',
    );
    
    // Get query vars if existed
    if ( get_query_var('t') ):
      $args['tax_query'][] = array(
          'taxonomy'  =>  'event_type',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('t'))
        );
    endif;

    // Get query vars if existed
    if ( get_query_var('saison') ):
      $args['tax_query'][] = array(
          'taxonomy'  =>  'event_saison',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('saison'))
        );
    endif;

    $args['paged'] = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;


get_header(); ?>

  <div id="primary" class="content-area content-saison">
    <main id="main" class="site-main" role="main">

      <header class="entry-header bg">
        <div class="entry-header-inner">

          <?php the_title( '<h1 class="entry-title l-12col l-first l-1col-push">', '</h1>' ); ?>
          <div class="post-excerpt l-12col l-first l-1col-push"><?php echo $introduction; ?></div>

          <ul class="calendar-filter-minimal l-first l-1col-push clearfix">
            <?php get_template_part('part', 'filter-saison'); ?>
          </ul>
        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->

        <?php

          // The Query
          $saison_events = new WP_Query( $args );
          $temp_query = $wp_query;
          $wp_query = NULL;
          $wp_query = $saison_events;

          // The Loop
          if ( $saison_events->have_posts() ) : ?>
            <div id="grid" class="row" data-columns>

            <?php while ( $saison_events->have_posts() ) {
                $saison_events->the_post();
                $firstdate = rwmb_meta(  $prefix_event . 'firstdate', array(), $post->ID );
                $event_type = rwmb_meta(  $prefix_event . 'event_type', 'type=taxonomy&taxonomy=event_type', $post->ID );
                $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $post->ID );
                $dates = rwmb_meta(  $prefix_event . 'event_date', array(), $post->ID );
                $authors =  rwmb_meta( $prefix_event . 'authors', array(), $post->ID );

                include(locate_template('bloc-event.php')); 
              }  ?>
            </div><!-- .row -->

      <?php
        cdn_posts_navigation();
        $wp_query = NULL;
        $wp_query = $temp_query;
        wp_reset_postdata();
      ?>

    <?php else:  ?>
      <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
    <?php endif; ?>

    </main><!-- #main -->
  </div><!-- #primary -->
<?php get_footer(); ?>

