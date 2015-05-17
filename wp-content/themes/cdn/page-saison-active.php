<?php
/**
 *
 * Template Name: Saison (période "active")
 *
 * @package cdn
 */

    $prefix_event = 'event_meta_';
    $prefix_default = 'defaults_meta_';

    $introduction = rwmb_meta( $prefix_default . 'intro' );
    $subtitle = rwmb_meta( $prefix_default . 'subtitle' );


if ( ! isset($exclude) )
  $exclude = array();

  $args = array(
    'post_type'       => array('event'),
    'post__not_in'    => $exclude,
    'posts_per_page'  =>  -1,
    'status'          => 'published',
    'orderby'         => 'meta_value_num',
    'meta_key'        => 'event_meta_firstdate',
    'order'           => 'ASC',
  );


    // Get query TYPE if existed
    if ( get_query_var('t') ):
      $args['tax_query'][] = array(
          'taxonomy'  =>  'event_type',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('t'))
        );
    endif;

    // Get query CAT if existed
    if ( get_query_var('c') ):
      $args['tax_query'][] = array(
          'taxonomy'  =>  'event_cat',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('c'))
        );
    endif;

    // Get query AGE if existed
    if ( get_query_var('a') ):
      $args['meta_query'][] = array(
          'key'       =>  'event_age',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('a'))
        );
    endif;

    // Get query SALLE if existed
    if ( get_query_var('s') ):
      $args['meta_query'][] = array(
          'key'       =>  'event_salle',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('s'))
        );
    endif;

    // Get query vars if existed
    if ( get_query_var('enfamille') ):
      $args['meta_query'][] = array(
          'key'       =>  'event_meta_en_famille',
          'value'     =>  1,
          'compare'   =>  'IN'
        );
    endif;


    if ( ! isset($args['meta_date_after_key']) ):
      $args['meta_date_after_key'] = 'end_date';
      $args['meta_date_after'] = date('Y-m-d');
    endif;


get_header(); ?>

	<div id="primary" class="content-area content-saison">
		<main id="main" class="site-main" role="main">
 
      <header class="entry-header bg">
        <div class="entry-header-inner l-12col l-first l-1col-push">

          <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
          <div class="post-excerpt"><?php echo $introduction; ?></div>

          <ul class="calendar-filter l-15col l-first l-1col-push clearfix">
            <?php 
              $type_args = array(
                'hide_empty'         => 1,
                'taxonomy'           => 'event_type',
                'title_li'           => __( '<h4>Filtrer par </h4>' ),
              );
            ?>
            <?php wp_list_categories( $type_args ); ?>

            <ul id="en_famille_selector" class="">
              <li class="cat-item"><a href="?enfamille=y">En famille</a></li>
            </ul>

            <?php 
              $cat_args = array(
                'hide_empty'         => 1,
                'taxonomy'           => 'event_cat',
                'title_li'           => __( '' ),
              );
            ?>
            <?php wp_list_categories( $cat_args ); ?>




          </ul>



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
            </div><!-- .row -->

          <?php
          } else { }
          wp_reset_postdata(); ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
