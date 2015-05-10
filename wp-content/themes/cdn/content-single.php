<?php
/**
 * @package cdn
 */

		// GET ALL META DATAS
    $prefix = 'defaults_meta_';

    $has_bg =	rwmb_meta( $prefix . 'title-bg' );
		$introduction =	rwmb_meta( $prefix . 'intro' );
		$subtitle =	rwmb_meta( $prefix . 'subtitle' );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header row">
		<div class="entry-header-inner l-12col l-first l-1col-push">

			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

			<div class="entry-meta meta">
				<?php cdn_post_metas(); ?>
			</div><!-- .entry-meta -->

			<div class="post-excerpt"><?php echo $introduction; ?></div>

	</header><!-- .entry-header -->

	<?php the_post_thumbnail( 'page-media' ); ?> 

	<div class="entry-content content-part l-8col l-1col-push l-first">
		<?php the_content(); ?>
	</div><!-- .entry-content -->

	<!-- Get Related Content -->
  <?php get_template_part('loop','related-content'); ?>

</article><!-- #post-## -->
