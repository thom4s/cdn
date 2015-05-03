<?php
/**
 *
 * Template Name: Accès (3 colonnes)
 *
 * @package cdn
 */

get_header(); ?>

	<div id="primary" class="content-area content-acces">
		<main id="main" class="site-main" role="main">

      <?php while ( have_posts() ) : the_post(); ?>

        <?php get_template_part( 'content', 'acces' ); ?>

      <?php endwhile; // end of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
