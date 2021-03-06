<?php
/**
 * @package cdn
 */

    setlocale(LC_TIME, 'fr_FR.UTF8', 'fr.UTF8', 'fr_FR.UTF-8', 'fr.UTF-8');
    $today = time();
    $pro = false;
    $public = false;

    if(isset($wp_query->query_vars['pro'])) {
      $pro = true;
    } else {
      $public = true;
    }

		// GET ALL META DATAS
    $prefix = 'event_meta_';
    $prefix_default = 'defaults_meta_';

    // Dates & Reservations
    $the_dates_text = rwmb_meta( $prefix . 'the_dates' );
    $event_date_text =  $the_dates_text['date'];
    $the_dates = array();

    // First Date
    $event_firstdate =  rwmb_meta( $prefix . 'firstdate' );
    $event_firstdate_booking_id = rwmb_meta( $prefix . 'first_booking_id' );
    if(strlen($event_firstdate) != 1) {
      $event_firstdate_array = array(
        'date' => $event_firstdate, 
        'booking_id' => $event_firstdate_booking_id
      );
      $the_dates[] = $event_firstdate_array;  
    }

    // In Between Dates
    $other_dates = rwmb_meta(  $prefix . 'other_dates' );
    foreach ($other_dates as $date) {
      $date_string = $date["date"];
      if($date_string != '') {
        $date["date"]= strtotime($date_string);
        $the_dates[] = $date;    
      } 
    }

    // Last Date
    $event_lastdate =  rwmb_meta( $prefix . 'lastdate' );
    $event_last_booking_id = rwmb_meta( $prefix . 'last_booking_id' );

    if(strlen($event_lastdate) != 1) {
      $event_lastdate_array = array(
        'date' => $event_lastdate, 
        'booking_id' => $event_last_booking_id
      );
      $the_dates[] = $event_lastdate_array;  
    }

    // Générique
    $authors =	rwmb_meta( $prefix . 'authors' );
    $intro =	rwmb_meta( $prefix . 'intro' );
    $distribution =	rwmb_meta( $prefix . 'distribution' );
    $entretien = rwmb_meta( $prefix . 'entretien' );
    $event_creation =	rwmb_meta( $prefix . 'event_creation', 'type=taxonomy&taxonomy=event_creation' );
    $is_en_famille =  rwmb_meta( $prefix . 'en_famille' );    
    $event_types =	rwmb_meta( $prefix . 'event_type', 'type=taxonomy&taxonomy=event_type' );
    $salle =	rwmb_meta( $prefix . 'salle', 'type=taxonomy&taxonomy=event_salle' );
    $age =	rwmb_meta( $prefix . 'age', 'type=taxonomy&taxonomy=event_age' );
    $duration =	rwmb_meta( $prefix . 'duration' );

    // Presse
    $press =	rwmb_meta( $prefix . 'press' );

    // Slideshow
    $slides =  rwmb_meta( $prefix . 'imgadv', 'type=image_advanced' );
    $videos =  rwmb_meta( $prefix . 'video', 'type=oembed' );
    
    // Fichiers
    $pedago =	rwmb_meta( $prefix . 'pedago', 'type=file' );
    $presskit =	rwmb_meta( $prefix . 'presskit', 'type=file' );
    $diffusion =	rwmb_meta( $prefix . 'diffusion', 'type=file' );
    $technique =	rwmb_meta( $prefix . 'technique', 'type=file' );
    $pressreview =	rwmb_meta( $prefix . 'pressreview', 'type=file' );
    $visuals =	rwmb_meta( $prefix . 'visuals', 'type=file' );

    // Presse
    $press =	rwmb_meta( $prefix . 'press' );

    // Presse
    $disponibilities =  rwmb_meta( $prefix . 'disponible' );    
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="entry-header--event">
		
    <!-- DISPLAY SLIDER IF PUBLIC-->
    <?php if($public && $slides){ ?>
      <div class="event-slider">
        <div class="event-slider-inner">
          <div class="bxslider-video">
            <?php foreach ($slides as $slide) { ?>
                <li><img src="<?php echo $slide['full_url']; ?>"></li>
            <?php } ?>
            <?php foreach ($videos as $video) { ?>
                <li><iframe src="<?php echo $video; ?>" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></li>
            <?php } ?>
          </div>
        </div><!-- .event-slider-inner -->
      </div><!-- .event-slider -->
    <?php } ?>

    <div class="row">
      <div class="entry-titles m-7col m-first l-1col-push">
        <?php the_title( '<h1 class="event-title">', '</h1>' ); ?>
        <?php 
          foreach ( $authors as $author ) { 
            echo '<div class="meta event-authors">' . $author['quali'] . ' <span class="author-name">' . $author['name'] . '</span></div>'; }
        ?>
        <div class="event-intro">
          <?php echo $intro; ?>
        </div> 
      </div>

      <div class="event-metas m-4col m-last">
        <div class="event-metas-group">
          <?php if($pro) { echo '<div class="event-is-pro">Espace Pro</div>'; } ?>
          
          <?php if($pro && $disponibilities != '') { echo '<div class="event-is-pro">'. $disponibilities .'</div>'; } ?>

          <?php 
            if($event_creation) { 
              foreach ( $event_creation as $crea ) { 
                echo '<span class="event-is-created"> ' . $crea->name . '</span>'; 
              }
              echo '<br>';
            }
          ?>
          
          
          <?php 
            if($event_types) { 
              foreach ( $event_types as $type ) { 
                echo '<span class="event-type"> ' . $type->name . '</span>'; 
              }
              echo '<br>';
            } ?> 
          
          <?php 
            if($age) { 
              $i = 0; 
              foreach ( $age as $a ) { 
                echo '<span class="event-age">';
                echo $a->name;
                if($i == 0) { echo ' | '; }
                echo '</span>';
                $i++;
              }
              echo '<br>';
            }
          ?>

          <?php 
            if($public) { 
              $j = 0; 
              foreach ( $salle as $s ) {
                if($j > 0) { echo ' - '; }
                echo $s->name;
                $j++;
              } ?> | <?php echo $duration; }?>
        </div><!-- .entry-metas-group -->

        <!-- DISPLAY DATES IF PUBLIC-->
        <?php if($public){ ?>
        <div class="event-metas-group">
          <ul class="event-dates">
            <?php foreach ($the_dates as $date) {
              $date_formated = strftime('%a %e %b %g : %kh%M', $date["date"] );
              $date_booking_id = $date['booking_id'];
              echo  '<li>';
              if( $today > $date["date"] ) {
                // date passée
                echo  '<span class="passed_date">'. $date_formated .'</span>';
              } else {
                // date à venir
                echo  '<a href="http://www.forumsirius.fr/orion/sartrouville.phtml?seance='. 
                      $date_booking_id .
                      '" title="Réservez pour la séance du spectacle " alt="Réservez pour la séance du spectacle " target="_blank">'.
                      $date_formated.
                      '</a>';
              }
              echo '</li>';
            }; ?>
          </ul>
        </div><!-- .entry-metas-group -->
        <?php } ?>

        <div class="event-metas-group">
          <ul class="event-ancres">
            <?php if($distribution != '') : ?><li><a href="#distribution">Voir la Distribution</a></li><?php endif; ?>
            <?php if($public && $press != '' ) : ?><li><a href="#presse">Lire la presse</a></li><?php endif; ?>
            <?php if($public && $videos[0] != '' ) : ?><li><a id="gotovideo" href="#">Lire la vidéo</a></li><?php endif; ?>
          </ul>
        </div><!-- .entry-metas-group -->

      </div><!-- .event-metas -->
    </div><!-- .row -->
	</header><!-- .entry-header -->

	<div class="entry-content content-part m-8col m-1col-push m-first">
		<?php the_content(); ?>
	</div><!-- .entry-content -->

  <!-- Get Related Posts-->
  <?php get_template_part('loop','related-content'); ?>

  <?php if($entretien != '') : ?>
    <div class="event-entretien content-part m-10col m-1col-push m-first">
      <?php echo $entretien; ?>
    </div>
  <?php endif; ?>

	<footer class="entry-footer">
    <?php if($distribution != '') : ?>
    <div class="event-distribution content-part clearfix">
      <div class="m-1col-push m-11col m-first title-underline-gray">
        <h2 id="distribution">Distribution</h2>
        <div class="line-dotted"></div>
      </div>
      <?php echo $distribution; ?>
    </div>
    <?php endif; ?>

		<?php if($public && $press != ''){ ?>
      <div class="event-pressereview content-part clearfix">
        <div class="m-1col-push m-11col m-first title-underline-gray">
          <h2 id="presse">La presse</h2>
          <div class="line-dotted"></div>
        </div>
        <?php echo $press; ?>
      </div>
      <?php } ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
