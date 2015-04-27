<?php
/**
 *
 * Template Name: Accueil
 *
 * @package cdn
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

	    <div class="row home-related">
	      <?php get_template_part('part','related-content'); ?>
	    </div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
