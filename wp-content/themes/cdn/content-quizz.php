<?php
/**
 * The template used for displaying page content in page-quizz.php
 *
 * @package cdn
 */

?>

<?php
  session_destroy();
  unset($_SESSION);
?>


    <article id="post-<?php the_ID(); ?>" class="quizz-home wrap row">


      <div class="logo m-3col">
        <h1 class="site-title">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
        </h1>
        <div class="site-logo-common mobile"></div>
      </div>


      <header class="m-12col m-last quizzhome-header">

          <h2><?php the_title(); ?></h2>
          <h3><?php the_field('subtitle'); ?></h3>

      </header><!-- #post-## -->

      <div class="row is-relative">

        <div class="quizzhome-img m-12col m-2col-push">
          <div class="btn-rounded white is-absolute"><a href="<?php the_field('first_question'); ?>">Commencer le Quizz !</a></div>

          <?php the_post_thumbnail( 'full' ); ?> 
        </div>
          
      </div>


      <div class="row">

        <div><?php the_content(); ?></div>

      </div>

    </div>

