  <?php
/**
 *
 * Template Name: Diffusion / Production
 *
 * @package cdn
 */

    $prefix_event = 'event_meta_';
    $prefix_default = 'defaults_meta_';
    $has_bg = rwmb_meta( $prefix_default . 'title-bg' );

    $introduction = rwmb_meta( $prefix_default . 'intro' );
    $subtitle = rwmb_meta( $prefix_default . 'subtitle' );

get_header(); ?>

  <div id="primary" class="content-area content-production">
    <main id="main" class="site-main" role="main">

      <header class="entry-header row <?php if($has_bg){ echo 'bg'; } ?>">
        <div class="entry-header-inner l-12col l-first l-1col-push">

          <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
          <h5><?php echo $subtitle; ?></h5>
          <p class="post-excerpt"><?php echo $introduction; ?></p>

        </div><!-- .entry-header-inner -->
      </header><!-- .entry-header -->

      <div class="entry-content content-part l-8col l-1col-push l-first">
        <?php the_content(); ?>
      </div><!-- .entry-content -->
      
      <!-- Get Related Content -->
      <?php get_template_part('loop','related-content'); ?>

    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>

