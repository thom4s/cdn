<?php
/**
 * The template used for displaying page content in page-archives.php
 *
 * @package cdn
 */

    // GET ALL META DATAS
    $prefix = 'defaults_meta_';
    $has_bg = rwmb_meta( $prefix . 'title-bg' );
    $introduction = rwmb_meta( $prefix . 'intro' );
    $subtitle = rwmb_meta( $prefix . 'subtitle' );  
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

  <header class="entry-header row <?php if($has_bg){ echo 'bg'; } ?>">
    <div class="entry-header-inner l-12col l-first l-1col-push">
      <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
      <h5><?php echo $subtitle; ?></h5>
      <p class="post-excerpt"><?php echo $introduction; ?></p>
    </div><!-- .entry-header-inner -->
    <?php the_post_thumbnail( 'page-media' ); ?> 
  </header><!-- .entry-header -->

  <div class="entry-content content-part p-is-formated m-11col m-1col-push m-first">
    <?php the_content(); ?>
  </div><!-- .entry-content -->

  <!-- Get CDN Creations -->
  <?php get_template_part('loop','this-saison'); ?>


</article><!-- #post-## -->