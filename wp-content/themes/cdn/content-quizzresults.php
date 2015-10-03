<?php
/**
 * The template used for displaying page content in page-quizz.php
 *
 * @package cdn
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

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

  switch ($andthewinneris) {
    case 'lamoureux':
      $title = 'L’Amoureux';
      $content = '<p>Il n’y a pas à tortille les histoires de cœur, de corps à corps et de confusion des sentiments caractérisent votre manière d’embrasser la vie à vos risques et périls mais avec de grands bonheurs. Même si, selon la chanson, les histoires d’amour finissent mal en général, le désir des autres et la tendresse façonnent vos valeurs affectives. Si au restaurant, vous devez choisir entre fromage et dessert, c’est pour vous, sans aucun doute, les deux ! Vous n’avez pas peur d’aborder des sujets graves.</p><p>Réparer les vivants est votre spectacle. Son histoire à l’écriture romanesque et engagée, généreuse et haletante, correspond à L’Amoureux que vous êtes.</p>';
      $spectacle = 'Réparer les vivants';
      break;

    case 'lalune':
      $title = 'La Lune';
      $content = '<p>Vous incarnez le cœur d’une vérité cachée et symbolisez le temps qui passe. Vous n’êtes pas ce que vous semblez être mais bien plus... C’est clair (de Lune), vos coups peuvent rendre fou. Votre intuition vous guide sur les chemins de l’existence. Elle reflète votre imagination créatrice. Vous préférez contempler la voie lactée et guetter les étoiles filantes, le temps d’un songe d’une nuit d’été, que de suivre les stars hissées sur les chars dopés aux décibels de la Techno Parade.</p><p>Comme vous aimez vous échapper de la réalité, rien de mieux que Les nouvelles aventures de Peer Gynt, une course effrénée à travers les riches et fantastiques légendes nordiques.</p>';
      $spectacle = 'Réparer les vivants';
      break;

    case 'lesoleil':
      $title = 'Le Soleil';
      $content = '<p>Le contraire vous aurez surpris, vous êtes brillant et éclatant. Côté chaleureux, vous en connaissez un rayon. Toutefois vous savez imposer un système. Le feu sacré vous appelle à oser l’impensable. Quoi de plus naturel quand on a un cœur brûlant, source de tous les possibles. Contre vents et marées, chaque matin vous vous levez, quels que soient les aléas du ciel et les soubresauts du monde.</p><p>Vous n’avez pas rendez-vous avec la lune mais avec Dominique A, chanteur aussi chauve que romantique, invitant à un voyage pop et poétique. Ensemble, dans une partition pleine d’élan, vous aller embrasser un monde intime et lumineux.</p>';
      $spectacle = 'Réparer les vivants';
      break;

    case 'lapapesse':
      $title = 'La Papesse';
      $content = '<p>Vous préférez la démesure à la modération, la fièvre du samedi soir à l’eau tiède d’une tisane, des larmes et des rires à d’hypocrites échanges feutrés. Votre folie des grandeurs cache de mystérieux secrets. </p>Paradoxalement, malgré vos excès, vous avez le sens de la famille. Mais les papesses, cela n’existe pas direz-vous. Tout faux. Selon la légende, la papesse Jeanne aurait accédé au trône pontifical, travestie en homme ! Dans la cité papale d’Avignon, la fable comme le festival perdure…</p><p>Papesse, pas besoin de coincer la bulle, Le Sorelle Macaluso a la force de votre caractère original et excentrique. Cette divine comédie familiale et féminine, italienne et exubérante est faite pour vous !</p>';
      $spectacle = 'Réparer les vivants';
      break;


    case 'lebateleur':
      $title = 'Le Bateleur';
      $content = '<p>Vous êtes dans votre époque comme un poisson dans l’eau. La nostalgie est un sentiment inconnu pour vous, c’est dit-on une radio, mais vous ne savez même pas qu’elle existe. Volubile, vous aimez, sans crier garde, bouger, apostropher les uns et les autres. Hier, c’était moins bien qu’aujourd’hui et demain pour vous sera encore mieux. A vos yeux, no future, c’est un vieux truc de punks quinquagénaires pas du tout vintage mais totalement has been. Sensible, vous cherchez avec affection à jouir des agréments de la vie sans complexe parce que vous avez le don de faire des tours d’adresse ou des tours de force.</p><p>Comme vous êtes aussi bien à l’aise dans le monde virtuel que dans le frôlement des corps, Pixel, embrasse dans une énergie spectaculaire une danse hors norme digne du Bateleur que vous êtes.</p>';
      $spectacle = 'Réparer les vivants';
      break;


    default:
    case 'lebateleur':
      $title = 'Impossible à définir...';
      $content = 'rejouer...';
      $spectacle = 'Réparer les vivants';
      break;
  }

?>


<div>
  <h1>Votre arcane majeur</h1>
  <h2><?php echo $title; ?></h2>
  <div><?php echo $spectacle; ?></div>
  <div><?php echo $content; ?></div>
</div>




</article><!-- #post-## -->
