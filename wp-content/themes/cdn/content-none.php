<?php
/**
 * The template part for displaying a message that posts cannot be found.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package cdn
 */
?>

<section class="no-results not-found">

	<header class="entry-header row content-part ">
		<div class="entry-header-inner l-12col l-first l-1col-push">
			<h1 class="entry-title"><?php _e( 'Désolé, aucun résultat...', 'cdn' ); ?></h1>
				<?php if ( is_search() ) : ?>

				<p><?php _e( 'Nous n\'avons trouvé aucun résultat pour votre recherche. Essayez avec un autre mot... ', 'cdn' ); ?></p>

			<?php endif; ?>


		</div><!-- .entry-header-inner -->
	</header><!-- .entry-header -->

	<div class="entry-content content-part p-is-formated m-6col m-1col-push m-first">
		<?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>

			<p><?php printf( __( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'cdn' ), esc_url( admin_url( 'post-new.php' ) ) ); ?></p>

		<?php elseif ( is_search() ) : ?>

			<?php get_search_form(); ?>

		<?php else : ?>

			<p><?php _e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'cdn' ); ?></p>
			<?php get_search_form(); ?>

		<?php endif; ?>
	</div><!-- .page-content -->
</section><!-- .no-results -->
