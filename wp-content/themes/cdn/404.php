<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package cdn
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="error-404 not-found">
				<header class="entry-header row content-part">
					<div class="entry-header-inner m-12col m-first m-1col-push">
						<h1 class="page-title"><?php _e( 'Cette page n\'existe pas...', 'cdn' ); ?></h1>
						<h5></h5>
						<div class="post-excerpt"><?php _e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'cdn' ); ?></div>

					</div><!-- .entry-header-inner -->
				</header><!-- .page-header -->

				<div class="entry-content content-part p-is-formated m-6col m-1col-push m-first">

					<h3>Effectuer une recherche</h3>
					<div>
						<?php get_search_form(); ?>
					</div>
					


				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
