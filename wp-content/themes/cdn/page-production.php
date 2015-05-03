  <?php
/**
 *
 * Template Name: Diffusion / Production
 *
 * @package cdn
 */

    $prefix_event = 'event_meta_';
    $prefix_default = 'defaults_meta_';
    $has_bg = rwmb_meta( $prefix_default . 'title-bg' );

    $introduction = rwmb_meta( $prefix_default . 'intro' );
    $subtitle = rwmb_meta( $prefix_default . 'subtitle' );

get_header(); ?>

  <div id="primary" class="content-area content-production">
    <main id="main" class="site-main" role="main">

      <header class="entry-header row <?php if($has_bg){ echo 'bg'; } ?>">
        <div class="entry-header-inner l-12col l-first l-1col-push">

          <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
          <h5><?php echo $subtitle; ?></h5>
          <p class="post-excerpt"><?php echo $introduction; ?></p>

        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->

      <div class="entry-content l-8col l-1col-push l-first">
        <?php echo the_content(); ?>
      </div><!-- .entry-content -->
      
      <div class="row">
        <?php
           $args = array(
            'post_type'       => 'event',
            'posts_per_page'  => -1,
            'status'          => 'published',
            'tax_query'       => array(
                array(
                  'taxonomy' => 'event_type',
                  'field'    => 'slug',
                  'terms'    => array('recre'),
                  'operator'  => 'NOT IN'
                ),           
            ),
          );

          // The Query
          $saison_events = new WP_Query( $args );

          // The Loop
          if ( $saison_events->have_posts() ) { ?>
            <div class="row">

            <?php while ( $saison_events->have_posts() ) {

                $saison_events->the_post();
                $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $post->ID );
                $post_meta = rwmb_meta(  $prefix_event . 'event_date', array(), $post->ID );
                $pro = true; ?>

              <?php include(locate_template('bloc-event.php')); } ?>
            
            </div>

          <?php
          } else { }
          wp_reset_postdata(); ?>
      </div>

    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>

