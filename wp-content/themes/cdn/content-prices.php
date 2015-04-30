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
		$blocs = rwmb_meta( $prefix . 'price_bloc' );
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

	<div class="entry-content-plain-1">
		<?php the_content(); ?>

		<?php 
		foreach ($blocs as $bloc) {
			
			$bloc_title = $bloc['title'];
			$bloc_main = $bloc['main'];
			$bloc_aside = $bloc['aside'];
			$bloc_menu = $bloc['menu']; ?>


			<div class="">

				<h2><?php echo $bloc_title; ?></h2>
				
				<div><?php echo $bloc_main; ?></div>
				
				<div><?php echo $bloc_aside; ?></div>

			</div>



		<?php	} // end foreach ?>


	</div><!-- .entry-content -->

</article><!-- #post-## -->
