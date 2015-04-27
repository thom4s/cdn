<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package cdn
 */

		// GET ALL META DATAS
    $prefix = 'defaults_meta_';

    $has_bg =	rwmb_meta( $prefix . 'title-bg' );
		$introduction =	rwmb_meta( $prefix . 'intro' );
		$subtitle =	rwmb_meta( $prefix . 'subtitle' );

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="entry-header img-last <?php if($has_bg){ echo 'bg'; } ?> ">
		<div class="entry-header-inner">

			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			<h5><?php echo $subtitle; ?></h5>
			<p class="post-excerpt"><?php echo $introduction; ?></p>

		</div><!-- .entry-header-inner -->

		<?php the_post_thumbnail( ); ?> 

	</header><!-- .entry-header -->



	<div class="entry-content">

		<?php the_content(); ?>

	</div><!-- .entry-content -->



	<div class="related-content">
		<h2>Aller plus loin</h2>
	</div>
</article><!-- #post-## -->
