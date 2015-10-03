<?php
/**
 * The template used for displaying page content in page-quizz.php
 *
 * @package cdn
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>


	<?php the_post_thumbnail( ); ?> 


	<?php the_content(); ?>



</article><!-- #post-## -->
