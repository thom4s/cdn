<?php
/**
 *
 * Template Name: Saison (période "active")
 *
 * @package cdn
 */

  error_reporting(E_ERROR | E_WARNING | E_PARSE);
    setlocale(LC_TIME, 'fr_FR.UTF8', 'fr.UTF8', 'fr_FR.UTF-8', 'fr.UTF-8');
    $today = time();
  $prefix_event = 'event_meta_';
  $prefix_default = 'defaults_meta_';
  $introduction = rwmb_meta( $prefix_default . 'intro' );
  $subtitle = rwmb_meta( $prefix_default . 'subtitle' );

  if ( ! isset($exclude) )
    $exclude = array();
    $args = array(
      'post_type'       => 'event',
      'post__not_in'    => $exclude,
      'posts_per_page'  => 24,
      'status'          => 'published',
      'orderby'         => 'meta_value_num',
      'meta_key'        => 'event_meta_firstdate',
      'order'           => 'ASC',
      'meta_query' => array(
        array(
           'key' => 'event_meta_firstdate',
           'value' => $today,
           'compare' => '>=',
        )
      )

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

    // Get query vars if existed
    if ( get_query_var('a') ):
      $args['tax_query'][] = array(
          'taxonomy'  =>  'event_age',
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

    if ( ! isset($args['meta_date_after_key']) ):
      $args['meta_date_after_key'] = 'end_date';
      $args['meta_date_after'] = date('Y-m-d');
    endif;

    // Get query Month if existed
    if ( get_query_var('m') ):
      if ( preg_match("#\d+\-\d+?#", get_query_var('m') ) ):
        $date = strtotime( get_query_var('m') );
        $args['meta_date_after_key'] = 'end_date';
        $args['meta_date_after'] = date('Y-m-d', strtotime(get_query_var('m')));
        $args['meta_date_before_key'] = 'start_date';
        $args['meta_date_before'] = date('Y-m-t', strtotime(get_query_var('m')));
      else:
        $args['meta_date_after_key'] = 'end_date';
        $args['meta_date_after'] = date('Y-m-d', strtotime(get_query_var('m').'-01-01'));
        $args['meta_date_before_key'] = 'start_date';
        $args['meta_date_before'] = date('Y-m-d', strtotime(get_query_var('m').'-12-31'));
      endif;

      $args['m'] = get_query_var('m');
    endif;

    $args['paged'] = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;

get_header(); ?>

	<div id="primary" class="content-area content-saison">
		<main id="main" class="site-main" role="main">
 
      <header class="entry-header bg">
        <div class="entry-header-inner">
          <?php the_title( '<h1 class="entry-title l-12col l-first l-1col-push">', '</h1>' ); ?>
          <div class="post-excerpt l-12col l-first l-1col-push"><?php echo $introduction; ?></div>
          <!-- <div class="calendar-filter-all l-first l-15col l-1col-push clearfix">
            <?php get_template_part('part', 'filter-type'); ?>
            <?php get_template_part('part', 'filter-cat'); ?>
            <?php get_template_part('part', 'filter-age'); ?>
            <?php get_template_part('part', 'filter-month'); ?>
          </div> -->
          <ul class="calendar-filter-minimal l-15col l-first l-1col-push clearfix">
            <?php get_template_part('part', 'filter-minimal'); ?>
          </ul>
        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->

      <?php
        $saison_events = new WP_Query( $args );
        $temp_query = $wp_query;
        $wp_query = NULL;
        $wp_query = $saison_events;

        include(locate_template('loop-calendar.php'));
      ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
