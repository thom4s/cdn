<?php get_template_part( 'header', 'quizz' ); ?>

<?php
/**
 *
 * Template Name: Question
 *
 * @package cdn
 */
?>

    <?php while ( have_posts() ) : the_post(); ?>
      <?php get_template_part( 'content', 'quizz' ); ?>
    <?php endwhile; // end of the loop. ?>

    <?php get_template_part( 'footer', 'quizz' ); ?>

