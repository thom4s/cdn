<?php get_template_part( 'header', 'quizz' ); ?>

<?php
/**
 *
 * Template Name: Résultat Quizz
 *
 * @package cdn
 */
?>


      <?php while ( have_posts() ) : the_post(); ?>

        <?php get_template_part( 'content', 'quizzresults' ); ?>

      <?php endwhile; // end of the loop. ?>


  <?php get_template_part( 'footer', 'quizz' ); ?>

