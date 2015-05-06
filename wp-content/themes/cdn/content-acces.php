<?php
/**
 * The template used for displaying page content in page-acces.php
 *
 * @package cdn
 */

		// GET ALL META DATAS
    $prefix = 'defaults_meta_';
    $has_bg =	rwmb_meta( $prefix . 'title-bg' );
		$introduction =	rwmb_meta( $prefix . 'intro' );
		$subtitle =	rwmb_meta( $prefix . 'subtitle' );
		$blocs = rwmb_meta( $prefix . 'acces_bloc' );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header row <?php if($has_bg){ echo 'bg'; } ?> ">
		<div class="entry-header-inner l-12col l-first l-1col-push">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			<h5><?php echo $subtitle; ?></h5>
			<div class="post-excerpt"><?php echo $introduction; ?></div>
		</div><!-- .entry-header-inner -->

		<?php
			$args = array(
		    'type'         => 'map',
		    'width'        => '100%', 
		    'height'       => '480px', 
		    'zoom'         => 14,  
		    'marker'       => true, // Display marker? Default is 'true',
		    'marker_title' => 'Théâtre de Sartrouville - CDN', 
		    'info_window'  => 'Théâtre de Sartrouville - CDN<br> Place Jacques Brel, Sartrouville', 
			);
			echo rwmb_meta( 'map', $args ); // For current post ?> 
	</header><!-- .entry-header -->

	<div class="entry-content plain row">
		<?php the_content(); ?>

		<?php 
		foreach ($blocs as $bloc) {			
			$bloc_title = $bloc['title'];
			$bloc_main = $bloc['main']; ?>

			<div class="acces-item l-4col">
				<h2><?php echo $bloc_title; ?></h2>
				<div><?php echo $bloc_main; ?></div>
			</div><!-- .acces-item -->
		<?php	} // end foreach ?>

	</div><!-- .entry-content -->
</article><!-- #post-## -->