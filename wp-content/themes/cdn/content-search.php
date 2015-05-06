<?php
/**
 * The template part for displaying results in search pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package cdn
 */

		// GET ALL META DATAS
    $default = 'defaults_meta_';
    $event = 'event_meta_';
    
		$introduction =	rwmb_meta( $event . 'intro' );
		$subtitle =	rwmb_meta( $event . 'subtitle' );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="search-result-header">
		<?php the_title( sprintf( '<h3 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h3>' ); ?>

		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="entry-meta">
			<?php cdn_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="post-excerpt"><?php echo $introduction; ?></div>

</article><!-- #post-## -->
