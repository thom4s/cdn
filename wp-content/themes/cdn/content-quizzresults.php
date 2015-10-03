<?php
/**
 * The template used for displaying page content in page-quizz.php
 *
 * @package cdn
 */

?>

<?php 

  if( isset($_POST['reponseradio']) ){
    $_SESSION['responses'][] = $_POST['reponseradio'];
    $reponses = $_SESSION['responses'];

    $cpt = array_count_values($reponses);
    $winners = array();

    foreach ($reponses as $r) {
      $i = $cpt[$r];
      $winners[$i] = $r;
    }
    sort($winners);
    $andthewinneris = $winners[0];
  }

$reponses = get_field('reponses' );

foreach ($reponses as $r) {
  $id = $r['id_name'];
  if( $id == $andthewinneris ) {
    $reponse_data = $r;
    break;
  }
}

// var_dump($reponse_data);

$titre = $reponse_data['titre'];
$evenement = $reponse_data['evenement'];
$visuel = $reponse_data['visuel'];
$e_title = $evenement->post_title;
$e_id = $evenement->ID;
$e_url = get_permalink ($e_id);

$texte_principal = $reponse_data['texte_principal'];
$texte_evenement = $reponse_data['texte_evenement'];

?>



<article id="post-<?php the_ID(); ?>" class="quizz-result full">
  <div class="row full">

    <header class="m-8col question-img full table quizzresult-header" style="background-color: <?php the_field('couleur_de_la_page'); ?>">
      <div class="table-cell">
        <h2><?php the_title(); ?></h2>
        <h3><?php echo $titre; ?></h3>
        <img src="<?php echo $visuel; ?>">
      </div>
    </header>

    <div class="m-6col m-1col-push full table">
      <div class="table-cell">

        <div class="result-infos">
          <div class="btn-cdn-logo"></div>
          <div class="result-text"><?php echo $texte_principal; ?></div>
          <div class="result-event"><span class=""><?php echo $e_title; ?></span> est votre spectacle. <?php echo $texte_evenement; ?></div>
        </div>

        <div class="row result-actions">
          <div class="btn-rounded white is-absolute"><a href="<?php echo $e_url; ?>">En savoir + sur le spectacle</a></div>

          
          <div class="m8col m-last">
            <ul>
              <li>Inscription à la newsletter</li>
              <li>Partagez sur Facebook</li>
              <li>Nous envoyer un mail</li>
            </ul>
          </div>

        </div>
         
      </div>
    </div><!-- .m-6col -->
  </div><!-- .row -->
</article><!-- #post-## -->


