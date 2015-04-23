<?php
/**
 * @package cdn
 */


		// $group_value = rwmb_meta( 'group_id' );
    // $value = isset( $dates[$sub_field_key] ) ? $dates[$sub_field_key] : false;
    // echo $value; // Display sub-field value


		// GET ALL META DATAS
    $prefix = 'event_meta_';

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
		
		<div>
			<?php the_post_thumbnail( ); ?> 

			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			
			<?php foreach ( $authors as $author ) { echo $author; } ?>
			
			<?php echo $intro; ?>
		</div>

		<div class="entry-meta">
			<?php	if($is_creation) : echo 'Création'; endif; ?><br>

			<?php foreach ( $event_types as $type ) { echo $type->name; } ?> | <?php foreach ( $age as $a ) { echo $a->name; } ?><br>

			<?php foreach ( $salle as $s ) { echo $s->name; } ?> | <?php echo $duration; ?><br>

<br>

			<ul>
				<?php foreach ($dates_infos as $date) {
					echo 	'<li>'.
								'<a href="http://www.forumsirius.fr/orion/sartrouville.phtml?seance='. $date["event_meta_date_booking_id"] .'" title="Réservez pour la séance du spectacle " alt="Réservez pour la séance du spectacle ">'.
							 	$date['event_meta_datetime'].
								'</a></li>';
				}; ?>
			</ul>
		

		</div><!-- .entry-meta -->

	</header><!-- .entry-header -->




	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->


	<div class="related-content">
		<h2>Aller plus loin</h2>

		<div class="related-bloc">ça</div>
		<div class="related-bloc">et ça</div>

	</div><!-- .entry-content -->




	<footer class="entry-footer">
		
		<h2>Distribution</h2>
				<?php echo $distribution; ?>


		<h2>La presse</h2>
			<?php echo $press; ?>


	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
