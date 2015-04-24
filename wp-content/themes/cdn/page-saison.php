<?php
/**
 *
 * Template Name: Saison (période "réservation")
 *
 * @package cdn
 */

get_header(); ?>

  <div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

      <div class="calendar-filter">
        Filtres

      </div>
      
      <div class="row">

        <?php

          $args = array(
            'post_type'       => 'event',
            'posts_per_page'  => -1,
            'status'          => 'published',

          );

          // The Query
          $saison_events = new WP_Query( $args );

          // The Loop
          if ( $saison_events->have_posts() ) {
            echo '<ul>';
            while ( $saison_events->have_posts() ) {
              $saison_events->the_post();
              echo '<li>' . get_the_title() . '</li>';
            }
            echo '</ul>';
          } else {
            // no posts found
          }

          wp_reset_postdata(); ?>

      </div>

    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>

