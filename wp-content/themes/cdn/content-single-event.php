<?php
/**
 * @package cdn
 */

    setlocale(LC_TIME, 'fr_FR.UTF8', 'fr.UTF8', 'fr_FR.UTF-8', 'fr.UTF-8');
    $today = time();

		// GET ALL META DATAS
    $prefix = 'event_meta_';
    $prefix_default = 'defaults_meta_';

    // Dates & Reservations
    $event_date =	rwmb_meta( $prefix . 'event_date' );
    $event_booking_id =	rwmb_meta( $prefix . 'event_booking_id' );

    $dates_infos = rwmb_meta(  $prefix . 'dates' );
		$datetime = $prefix . 'datetime';
		$datetime_array = isset( $dates_infos[$datetime] ) ? $dates_infos[$datetime] : false;

		$date_booking_id = $prefix . 'date_booking_id';
		$date_booking_id_array = isset( $dates_infos[$date_booking_id] ) ? $dates_infos[$date_booking_id] : false;

    // Générique
    $authors =	rwmb_meta( $prefix . 'authors' );
    $intro =	rwmb_meta( $prefix . 'intro' );
    $distribution =	rwmb_meta( $prefix . 'distribution' );
    $is_creation =	rwmb_meta( $prefix . 'creation' );
    $event_types =	rwmb_meta( $prefix . 'event_type', 'type=taxonomy&taxonomy=event_type' );
    $salle =	rwmb_meta( $prefix . 'salle', 'type=taxonomy&taxonomy=event_salle' );
    $age =	rwmb_meta( $prefix . 'age', 'type=taxonomy&taxonomy=event_age' );
    $duration =	rwmb_meta( $prefix . 'duration' );

    // Presse
    $press =	rwmb_meta( $prefix . 'press' );

    // Fichiers
    $pedago =	rwmb_meta( $prefix . 'pedago', 'type=file' );
    $presskit =	rwmb_meta( $prefix . 'presskit', 'type=file' );
    $diffusion =	rwmb_meta( $prefix . 'diffusion', 'type=file' );
    $technique =	rwmb_meta( $prefix . 'technique', 'type=file' );
    $pressreview =	rwmb_meta( $prefix . 'pressreview', 'type=file' );
    $visuals =	rwmb_meta( $prefix . 'visuals', 'type=file' );

    // Presse
    $press =	rwmb_meta( $prefix . 'press' );

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="entry-header">
		
		<div class="entry-medias bxslider">
			<li><?php the_post_thumbnail( 'event-media' ); ?> </li>
      <li>    <iframe src="http://player.vimeo.com/video/17914974" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> </li>
      <li><?php the_post_thumbnail( 'event-media' ); ?> </li>
    </div>

    <div class="row">

      <div class="entry-titles">
        <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
        
        <?php foreach ( $authors as $author ) { echo '<span class="meta entry-authors">' . $author . '</span>'; } ?>
        
        <?php echo $intro; ?>
      </div>

      <div class="entry-metas">
        <div class="entry-metas-group">
          <?php if($is_creation) : echo 'Création'; endif; ?><br>

          <?php foreach ( $event_types as $type ) { echo $type->name; } ?> | <?php foreach ( $age as $a ) { echo $a->name; } ?><br>

          <?php foreach ( $salle as $s ) { echo $s->name; } ?> | <?php echo $duration; ?>
        </div><!-- .entry-metas-group -->

        <div class="entry-metas-group">
          <ul class="event-dates">
            <?php foreach ($dates_infos as $date) {

              $date_booking_id = $date["event_meta_date_booking_id"];
              $date_string = $date["event_meta_datetime"];
              $date_raw = strtotime($date_string);
              $date_formated = date('D d M Y : H\hi', $date_raw);
              
              echo  '<li>';

              if( $today > $date_raw ) {
                // date passée
                echo  '<span class="passed_date">'. $date_formated .'</span>';

              } else {
                // date à venir
                echo  '<a href="http://www.forumsirius.fr/orion/sartrouville.phtml?seance='. 
                      $date_booking_id .
                      '" title="Réservez pour la séance du spectacle " alt="Réservez pour la séance du spectacle ">'.
                      $date_formated.
                      '</a>';
              }

              echo '</li>';

            }; ?>
          </ul>
        </div><!-- .entry-metas-group -->


 

        <ul>
          <li><a href="#distribution">Voir la Distribution</a></li>
          <li><a href="#presse">Lire la presse</a></li>     
        </ul>

      </div><!-- .entry-meta -->
    </div><!-- .row -->
	</header><!-- .entry-header -->




	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->


	<div class="related-content">
		<h2>Aller plus loin</h2>

    <div id="grid" class="row" data-columns>
      <?php get_template_part('part','related-content'); ?>
    </div>
	</div><!-- .entry-content -->




	<footer class="entry-footer">
		
		<h2 id="distribution">Distribution</h2>
				<?php echo $distribution; ?>


		<h2 id="presse">La presse</h2>
			<?php echo $press; ?>


	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
