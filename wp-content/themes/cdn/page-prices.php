<?php
/**
 *
 * Template Name: Tarifs et Abonnements
 *
 * @package cdn
 */

get_header(); ?>

	<div id="primary" class="content-area content-prices">
		<main id="main" class="site-main" role="main">

      <?php while ( have_posts() ) : the_post(); ?>

        <?php get_template_part( 'content', 'prices' ); ?>

      <?php endwhile; // end of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
