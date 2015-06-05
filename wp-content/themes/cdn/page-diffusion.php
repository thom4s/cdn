  <?php
/**
 *
 * Template Name: Diffusion / Production
 *
 * @package cdn
 */
get_header(); ?>

  <div id="primary" class="content-area content-production">
    <main id="main" class="site-main" role="main">

      <?php while ( have_posts() ) : the_post(); ?>

        <?php get_template_part( 'content', 'diffusion' ); ?>

      <?php endwhile; ?>

    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>

