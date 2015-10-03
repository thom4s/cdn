<?php get_template_part( 'header', 'quizz' ); ?>

<?php 
  if( isset($_POST['reponseradio']) ){
    $_SESSION['responses'][] = $_POST['reponseradio'];
  }
?>

<?php
/**
 *
 * Template Name: Question
 *
 * @package cdn
 */
?>

      <?php while ( have_posts() ) : the_post(); ?>

        <div class="page">

          <?php get_template_part( 'content', 'question' ); ?>

        </div><!-- .page -->
      <?php endwhile; // end of the loop. ?>

    <?php get_template_part( 'footer', 'quizz' ); ?>

