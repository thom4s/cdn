<?php
$previous_month = false;
$previous_day = false;
$previous_week = false;

setlocale(LC_TIME, 'fr_FR.UTF8', 'fr.UTF8', 'fr_FR.UTF-8', 'fr.UTF-8');
function getStartAndEndDate($week, $year) {
  $dto = new DateTime();
  $dto->setTimezone(new DateTimeZone('UTC'));
  $dto->setISODate($year, $week);

  $start = strtotime($dto->format('j M Y'));
  $start_month = date('m', $start);
  $start_year = date('Y', $start);

  $dto->modify('+6 days');
  $end = strtotime($dto->format('j M Y'));
  $end_month = date('m', $end);
  $end_year = date('Y', $end);

  if( $end_month == $start_month && $end_year == $start_year) {
    $start = strftime('%e', $start );
  } elseif($end_month != $start_month && $end_year == $start_year) {
    $start = strftime('%e %b', $start );
  } elseif($end_month != $start_month && $end_year != $start_year) {
    $start = strftime('%e %b %g', $start );
  }
  $end = strftime('%e %b %Y', $end );

  $ret['week_start'] = $start;
  $ret['week_end'] = $end;
  return $ret;
}


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
    $week = date('W', $firstdate);
    $week_year = date('o', $firstdate);
    $week_array = getStartAndEndDate($week,$week_year);
    
    if ( $previous_week != $week ): 
      if ($i > 0) { echo '</div><!-- #grid --> '; }
      echo do_shortcode( '[une_partie titre="Du '. $week_array['week_start'] . ' au '. $week_array['week_end'] .'"]' );
      $previous_week = $week; 
       ?>
      <div id="grid" class="row" data-columns>
    <?php endif;

    include(locate_template('bloc-event.php'));
    

    if( $previous_week != $week) : ?>
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
