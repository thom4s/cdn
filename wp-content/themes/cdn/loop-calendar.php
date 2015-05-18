<?php
$previous_month = false;
$previous_day = false;

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
    $day = date('d/m/Y', $firstdate);

    if ( $previous_day != $day ): 
      if ($i > 0) { echo '</div><!-- #grid --> '; }
      echo do_shortcode( '[une_partie titre="'. $day .'"]' );
      $previous_day = $day; 
       ?>
      <div id="grid" class="row" data-columns>
    <?php endif;

    include(locate_template('bloc-event.php'));

    if( $previous_day != $day) : ?>
      </div>
    <?php endif;
    $i = $i + 1;
  endwhile; ?>
  
</div><!-- end last #grid -->
  <?php cdn_posts_navigation(); 

else :
?>
  <div class="saison-no-result l-12col l-first l-1col-push">
    <h2>Aucun événement ne correspond à votre recherche</h2>
    <hr />
    <div class="clearfix">
      <a href="/saison/">Retour à la saison complète</a>
    </div><!-- .bt-back -->
  </div><!-- .programmation-no-results -->
<?php
  endif;
  wp_reset_postdata(); 
?>
