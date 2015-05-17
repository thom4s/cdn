<?php
$previous_month = false;
if ( $saison_events->have_posts() ) :
  $i = 0; ?>

  <?php while ( $saison_events->have_posts() ) :

    $saison_events->the_post();
    $firstdate = rwmb_meta(  $prefix_event . 'firstdate', array(), $post->ID );
    $event_type = rwmb_meta(  $prefix_event . 'event_type', 'type=taxonomy&taxonomy=event_type', $post->ID );
    $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $post->ID );
    $dates = rwmb_meta(  $prefix_event . 'event_date', array(), $post->ID );
    $authors =  rwmb_meta( $prefix_event . 'authors', array(), $post->ID );

    $month = date('Y/m', $firstdate);

    if ( $previous_month != $month ): 
      if ($i > 0) { echo '</div><!-- #grid --> '; }
      echo do_shortcode( '[une_partie titre="'. strftime('%B %Y', strtotime($month.'/01')) .'"]' );
      $previous_month = $month; 
       ?>
      <div id="grid" class="row" data-columns>
    <?php endif;

    include(locate_template('bloc-event.php'));

    if( $previous_month != $month) : ?>
      </div>
    <?php endif;
    $i = $i + 1;
  endwhile;

  $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

  if ( $wp_query->max_num_pages > 1 && $paged < $wp_query->max_num_pages ) :
    $paginglink = "ppage/".($paged+1)."/";

    ?>
    <div class="load-more clearfix navigation" data-date="<?php print strtotime('2100/01/01') ?>">
      <a class="more-events" href="<?php echo mahi_add_query_path(null, 'ppage', $paged + 1) ?>">Plus de dates</a>
    </div><!-- #nav-below -->
    <?php
  endif;
else :
?>
  <div class="saison-no-result l-12col l-first l-1col-push">
    <h2 class="aligncenter">Aucun événement ne correspond à votre recherche</h2>
    <hr />
    <div class="bt-back clearfix">
      <a href="/saison/">Retour à la saison complète</a>
    </div><!-- .bt-back -->
  </div><!-- .programmation-no-results -->
<?php
  endif;
  wp_reset_postdata(); 
?>
