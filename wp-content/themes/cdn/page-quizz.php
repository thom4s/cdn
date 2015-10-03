<?php get_template_part( 'header', 'quizz' ); ?>

<?php
/**
 *
 * Template Name: Quizz
 *
 * @package cdn
 */
?>

      <?php while ( have_posts() ) : the_post(); ?>

        <div class="page" style="background-color: <?php the_field('couleur_de_la_page'); ?>">

          <?php get_template_part( 'content', 'quizz' ); ?>

        </div><!-- .page -->
      <?php endwhile; // end of the loop. ?>



  <?php get_template_part( 'footer', 'quizz' ); ?>

