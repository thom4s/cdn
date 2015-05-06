<?php
/**
 * The template for displaying search results pages.
 *
 * @package cdn
 */



get_header(); ?>

	<section id="primary" class="content-area content-results">
		<main id="main" class="site-main" role="main">

		<?php if ( have_posts() ) : ?>

			<header class="entry-header row">
				<div class="entry-header-inner l-12col l-first l-1col-push">

					<h1 class="entry-title"><?php printf( __( 'Votre recherche : %s', 'cdn' ), '<span><em>' . get_search_query() . '</em></span>' ); ?></h1>

				</div><!-- .entry-header-inner -->
			</header><!-- .entry-header -->

			<?php while ( have_posts() ) : the_post(); ?>

				<div class=" l-8col l-1col-push l-first">
					<?php get_template_part( 'content', 'search' ); ?>
				</div>

			<?php endwhile; ?>

			<?php the_posts_navigation(); ?>

		<?php else : ?>

			<?php get_template_part( 'content', 'none' ); ?>

		<?php endif; ?>

		</main><!-- #main -->
	</section><!-- #primary -->

<?php get_footer(); ?>
