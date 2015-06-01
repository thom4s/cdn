<?php
/**
 * The template used for displaying page content in page-diffusion.php
 *
 * @package cdn
 */

		// GET ALL META DATAS
    $prefix = 'defaults_meta_';
    $prefix_event = 'event_meta_';

    $has_bg =	rwmb_meta( $prefix . 'title-bg' );
		$introduction =	rwmb_meta( $prefix . 'intro' );
		$subtitle =	rwmb_meta( $prefix . 'subtitle' );

    $event_creation = 'event_creation';
    $taxonomy_terms = get_terms( $event_creation, array(
        'hide_empty' => 0,
        'fields' => 'ids'
    ) );

    $args = array(
      'post_type'       => 'event',
      'posts_per_page'  => 15,
      'status'          => 'published',
      'tax_query'       => array(
        'relation' => 'AND',
        array(
          'taxonomy'      => 'event_cat',
          'field'         => 'slug',
          'terms'         => array('spectacle'),
        ),
        array(
          'taxonomy'      => 'event_creation',
          'field'         => 'id',
          'terms'         => $taxonomy_terms,
        ),
      ),
      'orderby'   => 'meta_value_num',
      'meta_key'  => 'event_meta_firstdate',
      'order'      => 'DESC',
    );
    
    // Get query vars if existed
    if ( get_query_var('t') ):
      $args['tax_query'][] = array(
          'taxonomy'  =>  'event_type',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('t'))
        );
    endif;

    // Get query vars if existed
    if ( get_query_var('saison') ):
      $args['tax_query'][] = array(
          'taxonomy'  =>  'event_saison',
          'field'   =>  'slug',
          'terms'   =>  preg_split("#,#", get_query_var('saison'))
        );
    endif;

    $args['paged'] = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
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
  <div class="l-1col-push l-11col l-first title-underline-gray">
    <h2>Les créations du CDN</h2>
    <div class="line-dotted"></div>
  </div>
  <?php 

      // The Query
      $saison_events = new WP_Query( $args );
      $temp_query = $wp_query;
      $wp_query = NULL;
      $wp_query = $saison_events;
      $diffusion = true;
      
      // The Loop
      if ( $saison_events->have_posts() ) : ?>
        <div id="grid" class="row" data-columns>
        <?php while ( $saison_events->have_posts() ) {
            $saison_events->the_post();
            $pro = true;
            $firstdate = rwmb_meta(  $prefix_event . 'firstdate', array(), $post->ID );
            $event_type = rwmb_meta(  $prefix_event . 'event_type', 'type=taxonomy&taxonomy=event_type', $post->ID );
            $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $post->ID );
            //$dates = rwmb_meta(  $prefix_event . 'event_date', array(), $post->ID );
            $dates_array = rwmb_meta( $prefix_event . 'the_dates', array(), $post->ID );
            $dates = $dates_array['date'];
            $authors =  rwmb_meta( $prefix_event . 'authors', array(), $post->ID );
            $event_creation = rwmb_meta(  $prefix_event . 'event_creation', 'type=taxonomy&taxonomy=event_creation', $post->ID );
            include(locate_template('bloc-event.php'));
          }  ?>
        </div><!-- .row -->

      <?php
        cdn_posts_navigation();
        $wp_query = NULL;
        $wp_query = $temp_query;
        wp_reset_postdata();

	else :
	?>
	  <div class="saison-no-result l-12col l-first l-1col-push">
	    <h2>Aucun événement ne correspond à votre recherche</h2>
	    <div class="clearfix">
	      <a href="/diffusion-production/">Retour à la liste complète des créations</a>
	    </div><!-- .bt-back -->
	  </div><!-- .programmation-no-results -->
	<?php
	  endif;
	  wp_reset_postdata(); 
	?>


</article><!-- #post-## -->

      


