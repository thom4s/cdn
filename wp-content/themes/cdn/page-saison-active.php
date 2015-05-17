<?php
/**
 *
 * Template Name: Saison (période "active")
 *
 * @package cdn
 */

  error_reporting(E_ERROR | E_WARNING | E_PARSE);

  $prefix_event = 'event_meta_';
  $prefix_default = 'defaults_meta_';
  $introduction = rwmb_meta( $prefix_default . 'intro' );
  $subtitle = rwmb_meta( $prefix_default . 'subtitle' );

  if ( ! isset($exclude) )
    $exclude = array();
    $args = array(
      'post_type'       => 'event',
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
        <div class="entry-header-inner">
          <?php the_title( '<h1 class="entry-title l-12col l-first l-1col-push">', '</h1>' ); ?>
          <div class="post-excerpt l-12col l-first l-1col-push"><?php echo $introduction; ?></div>
          <div class="calendar-filter-all l-first l-1col-push clearfix">
            <?php get_template_part('part', 'filter-type'); ?>
            <?php get_template_part('part', 'filter-cat'); ?>
            <?php get_template_part('part', 'filter-age'); ?>
          </div>
        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->

        <?php
          $saison_events = new WP_Query( $args );
          include(locate_template('loop-calendar.php'));
         ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
