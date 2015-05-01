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

	<header class="entry-header row <?php if($has_bg){ echo 'bg'; } ?> ">
		<div class="entry-header-inner l-12col l-first l-1col-push">

			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			<h5><?php echo $subtitle; ?></h5>
			<p class="post-excerpt"><?php echo $introduction; ?></p>

		</div><!-- .entry-header-inner -->

		<?php the_post_thumbnail( ); ?> 

	</header><!-- .entry-header -->

	<div class="entry-content l-11col l-1col-push l-first row">
		<?php the_content(); ?>

		<?php 
		foreach ($blocs as $bloc) {
			
			$bloc_title = $bloc['title'];
			$bloc_main = $bloc['main'];
			$bloc_aside = $bloc['aside'];
			$bloc_menu = $bloc['menu']; ?>


			<div class="price-item">
				<h2><?php echo $bloc_title; ?></h2>

				<div class="price-item-main l-7col l-first">
					<?php echo $bloc_main; ?>
				</div><!-- .price-item-main -->
				
				<div class="price-item-aside l-4col l-last">
					<?php echo $bloc_aside; ?>

					<div class="bloc-buttons bg-practical">
			      <div class="bloc-buttons-inner">
			      	<h4>Pratique</h4>
			      	<?php wp_nav_menu( array( 'menu' => $bloc_menu) ); ?>
						</div>
					</div><!-- .bloc-outer -->
					
				</div><!-- .price-item-aside -->
			</div><!-- .price-item -->

		<?php	} // end foreach ?>

	</div><!-- .entry-content-plain-1 -->
</article><!-- #post-## -->
