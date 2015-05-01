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
		$projet_equipe =	rwmb_meta( $prefix . 'projet_equipe' );

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="entry-header <?php if($has_bg){ echo 'bg'; } ?> ">
		<div class="entry-header-inner l-12col l-first l-1col-push">

			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			<h5><?php echo $subtitle; ?></h5>
			<div class="post-excerpt"><?php echo $introduction; ?></div>

		</div><!-- .entry-header-inner -->

		<?php the_post_thumbnail( ); ?> 

	</header><!-- .entry-header -->

	<div class="entry-content-project plain row">
		<div class="l-8col l-1col-push l-first">
			<?php the_content(); ?>
		</div>

		<div class="project-team l-3col l-last">
			<?php echo $projet_equipe; ?>
		</div>

	</div><!-- .entry-content -->

	<!-- Get Related Content -->
  <?php get_template_part('loop','related-content'); ?>

</article><!-- #post-## -->
