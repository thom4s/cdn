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
  'post_type' => array('event'),
  'post__not_in' => $exclude,
  'posts_per_page'  =>  -1,
  );


if ( get_query_var('quoi') ):
  $args['tax_query'][] = array(
      'taxonomy'  =>  $current_festival?'festival_event_category':'event_category',
      'field'   =>  'slug',
      'terms'   =>  preg_split("#,#", get_query_var('quoi'))
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
          <p class="post-excerpt"><?php echo $introduction; ?></p>

          <ul class="calendar-filter clearfix">

            <?php
              if ( get_query_var('quoi') ):
                $terms = preg_split("#,#", get_query_var('quoi'), -1, PREG_SPLIT_NO_EMPTY);
                sort($terms);
                foreach($terms as $term):
                  $term = get_term_by('slug', $term, 'event_type');
                  $t = implode(',', array_diff($terms, array($term->slug)));
                  $url = mahi_add_query_path(null, 'quoi', $t);
                  ?>
                  <li class="sidebar-filter-dashboard">
                    <a href="<?php print $url ?>">
                      <?php echo $test; print $term->name ?>
                    </a>
                  </li>
                  <?php
                endforeach;
              endif;
              ?>

          </div>

        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->


	    <div class="row">
          <?php
          query_posts($args);
          get_template_part( 'loop', 'calendar' );
          wp_reset_query();
          ?>
      </div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
