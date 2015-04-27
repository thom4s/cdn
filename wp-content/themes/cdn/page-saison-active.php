<?php
/**
 *
 * Template Name: Saison (période "active")
 *
 * @package cdn
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

	    <div class="row">
	      <?php get_template_part('loop','related-content'); ?>
	    </div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
