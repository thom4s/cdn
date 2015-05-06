<?php
/**
 * Registering post meta boxes
 *
 * For more information, please visit:
 * @link http://metabox.io/docs/registering-meta-boxes/
 */


add_filter( 'rwmb_meta_boxes', 'defaults_register_meta_boxes' );

/**
 * Register meta boxes
 *
 * Remember to change "your_prefix" to actual prefix in your project
 *
 * @param array $meta_boxes List of meta boxes
 *
 * @return array
 */
function defaults_register_meta_boxes( $meta_boxes )
{
  $prefix = 'defaults_meta_';

  // LINKED TO ... (MAIN CONTENT)
  $meta_boxes[] = array(
    'title'      => __( 'Allez plus loin...', 'meta-box' ),
    'id'         => 'linkedposts',
    'post_types' => array( 'post', 'page', 'event' ),
    'exclude' => array(
      'template' => array( 'page-home.php' ),
    ),    
    'context'    => 'side',
    'fields' => array(

      // Le titre au dessus des blocs
      array(
        'id'      => $prefix . 'related_title',
        'name'   => __( 'Le titre au dessus des éléments liés', 'meta-box' ),
        'type'   => 'text', 
      ),

      // Les spectacles (par groupe)
      array(
        'id'     =>  $prefix . 'linkedposts',
        'name'   => __( '', 'meta-box' ),
        'type'   => 'group', 
        'clone'  => true,   
        'fields' => array(

          // EVENT
          array(
            'name'        => __( 'Choisir une page/actu/événement.', 'meta-box' ),
            'id'          => "{$prefix}linkedpost-id",
            'type'        => 'post',
            'post_type'   => array('event', 'post', 'page'),
            'field_type'  => 'select_advanced',
            'placeholder' => __( 'Select an Item', 'meta-box' ),
            'query_args'  => array(
              'post_status'    => 'publish',
              'posts_per_page' => - 1,
            ),
            'multiple'    => false,
          ),

          // IMPORTANCE
          array(
            'name'          => __( 'Cet élément est...', 'meta-box' ),
            'id'            => "{$prefix}bloc_bg",
            'type'          => 'select',
            'options'       => array(
              'bg-white'      => __( 'Par défault (blanc)', 'meta-box' ),
              'bg-practical'  => __( 'Pratique', 'meta-box' ),
              'bg-fun'        => __( 'Fun', 'meta-box' ),
            ),
            'std'         => 'bg-white',
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
          ),

          // STYLE
          array(
            'name'        => __( 'Sur x colonnes : ', 'meta-box' ),
            'id'          => "{$prefix}bloc_col",
            'type'        => 'select',
            'options'     => array(
              'l-4col' => __( 'Sur 1 colonne', 'meta-box' ),
              'l-8col' => __( 'Sur 2 colonnes', 'meta-box' ),
            ),
            'std'         => '1col-bloc',
            // Select multiple values, optional. Default is false.
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
          ),

          // STYLE
          array(
            'name'        => __( 'Activer le lien du bloc ?', 'meta-box' ),
            'id'          => "{$prefix}has_link",
            'type'        => 'checkbox',
            'std'         => 1,
          ),

        ),
      ),
    )
  );



  // LINKED TO ... (ASIDE)
  $meta_boxes[] = array(
    'title'      => __( 'Lier des contenus (colonne gauche)', 'meta-box' ),
    'id'         => 'aside_linkedposts',
    'post_types' => array( 'post', 'page', 'event' ),
    'exclude'    => array(
      'template'    => array( 'page-home.php' ),
    ),    
    'context'     => 'normal',
    'priority'    => 'low',
    'fields' => array(

      // Les spectacles (par groupe)
      array(
        'id'     =>  $prefix . 'aside_linkedposts',
        'name'   => __( '', 'meta-box' ),
        'type'   => 'group', 
        'clone'  => true,   
        'fields' => array(

          // EVENT
          array(
            'name'        => __( 'Choisir une page/actu/événement.', 'meta-box' ),
            'id'          => "id",
            'type'        => 'post',
            'post_type'   => array('event', 'post', 'page'),
            'field_type'  => 'select_advanced',
            'placeholder' => __( 'Select an Item', 'meta-box' ),
            'query_args'  => array(
              'post_status'    => 'publish',
              'posts_per_page' => - 1,
            ),
            'multiple'    => false,
          ),

          // IMPORTANCE
          array(
            'name'          => __( 'Cet élément est...', 'meta-box' ),
            'id'            => "bloc_bg",
            'type'          => 'select',
            'options'       => array(
              'bg-white'      => __( 'Par défault (blanc)', 'meta-box' ),
              'bg-practical'  => __( 'Pratique', 'meta-box' ),
              'bg-fun'        => __( 'Fun', 'meta-box' ),
            ),
            'std'         => 'bg-white',
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
          ),

          // HAS LINK ?
          array(
            'name'        => __( 'Activer le lien du bloc ?', 'meta-box' ),
            'id'          => "has_link",
            'type'        => 'checkbox',
            'std'         => 1,
          ),

        ),
      ),
    )
  );




  // Haut de page 
  $meta_boxes[] = array(
    'id'         => 'title-bg',
    'title'      => __( 'Bandeau Titre', 'meta-box' ),
    'post_types' => array( 'post', 'page' ),
    'context'    => 'normal',
    'autosave'   => true,
    'fields' => array(

      // Checkbox
      array(
        'name'        => __( 'Activer la couleur du Haut de page', 'meta-box' ),
        'id'          => "{$prefix}title-bg",
        'type'        => 'checkbox',
      ),
      
      // Sous titre
      array(
        'name'        => __( 'Sous titre de la page', 'meta-box' ),
        'id'          => "{$prefix}subtitle",
        'type'        => 'text',
      ),

      // INTRODUCTION
      array(
          'name' => __( 'Introduction', 'meta-box' ),
          'id'   => "{$prefix}intro",
          'type' => 'wysiwyg',
          'options' => array(
              'textarea_rows' => 4,
              'teeny'         => true,
              'media_buttons' => false,
          ),
      ),
    )
  );


  // Home Page Meta Box
  $meta_boxes[] = array(
    'title'  => __( 'Afficher les éléments de la page d\'accueil', 'meta-box' ),
    'id'         => 'hp-events',
    'post_types' => array( 'page' ),
    'include' => array(
      'template' => array( 'page-home.php' ),
    ),
    'context'    => 'normal',
    'autosave'   => true,
    'fields' => array(

      // HOME PAGE FEATURED EVENT
      array(
        'name'        => __( 'Choisir l\'événement principal : ', 'meta-box' ),
        'id'          => "{$prefix}hpfeatured-id",
        'type'        => 'post',
        'post_type'   => array( 'event' ),
        'field_type'  => 'select_advanced',
        'placeholder' => __( 'Select an Item', 'meta-box' ),
        'query_args'  => array(
          'post_status'    => 'publish',
          'posts_per_page' => - 1,
        ),
        'multiple'    => false,
      ),

      array(
        'id'     =>  $prefix . 'linkedposts',
        'name'   => __( 'Choisir les événement, pages et actualités à faire apparaitre sous l\'élément principal', 'meta-box' ),
        'type'   => 'group', 
        'clone'  => true,   
        'fields' => array(

          // EVENT
          array(
            'name'        => __( 'La page/événement/actualité : ', 'meta-box' ),
            'id'          => "{$prefix}linkedpost-id",
            'type'        => 'post',
            'post_type'   => array('event', 'post', 'page'),
            'field_type'  => 'select_advanced',
            'placeholder' => __( 'Select an Item', 'meta-box' ),
            'query_args'  => array(
              'post_status'    => 'publish',
              'posts_per_page' => - 1,
            ),
            'multiple'    => false,
          ),

          // IMPORTANCE
          array(
            'name'          => __( 'Cet élément est...', 'meta-box' ),
            'id'            => "{$prefix}bloc_bg",
            'type'          => 'select',
            'options'       => array(
              'bg-white'      => __( 'Par défault (blanc)', 'meta-box' ),
              'bg-practical'  => __( 'Pratique', 'meta-box' ),
              'bg-fun'        => __( 'Fun', 'meta-box' ),
            ),
            'std'         => 'bg-white',
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
          ),

          // STYLE
          array(
            'name'        => __( 'Sur x colonnes : ', 'meta-box' ),
            'id'          => "{$prefix}bloc_col",
            'type'        => 'select',
            'options'     => array(
              'bloc-1col' => __( 'Sur 1 colonne', 'meta-box' ),
              'bloc-2col' => __( 'Sur 2 colonnes', 'meta-box' ),
            ),
            'std'         => '1col-bloc',
            // Select multiple values, optional. Default is false.
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
          ),

          // STYLE
          array(
            'name'        => __( 'Activer le lien du bloc ?', 'meta-box' ),
            'id'          => "{$prefix}has_link",
            'type'        => 'checkbox',
            'std'         => 1,
          ),

        ),
      ),

    )
  );



  // Pour template Tarifs et Abonnements
  $meta_boxes[] = array(
    'title'  => __( 'Contenus de la page Tarifs et Abonnements', 'meta-box' ),
    'id'         => 'blocs-prices',
    'post_types' => array( 'page' ),
    'include' => array(
      'template' => array( 'page-prices.php' ),
    ),
    'context'    => 'normal',
    'autosave'   => true,
    'fields' => array(

      array(
        'id'     =>  $prefix . 'price_bloc',
        'name'   => __( '', 'meta-box' ),
        'type'   => 'group', 
        'clone'  => true,   
        'fields' => array(

          // TITLE
          array(
            'name'          => __( 'Titre de la partie', 'meta-box' ),
            'id'            => "title",
            'type'          => 'text',
          ),

          // MAIN
          array(
            'name'          => __( 'Le contenu principal', 'meta-box' ),
            'id'            => "main",
            'type'          => 'wysiwyg',
            'options' => array(
              'textarea_rows' => 6,
              'teeny'         => false,
              'media_buttons' => false,
            ),
          ),

          // ASIDE
          array(
            'name'          => __( 'Le contenu à droite', 'meta-box' ),
            'id'            => "aside",
            'type'          => 'wysiwyg',
            'options' => array(
              'textarea_rows' => 6,
              'teeny'         => false,
              'media_buttons' => false,
            ),
          ),

          // MENU
          array(
            'name'          => __( 'Le menu à faire apparaitre', 'meta-box' ),
            'id'            => "menu",
            'type'          => 'text',
          ),

        ),
      ),
    ),
  );



  // Pour template Accès
  $meta_boxes[] = array(
    'title'  => __( 'Contenus de la page Tarifs et Abonnements', 'meta-box' ),
    'id'         => 'blocs-acces',
    'post_types' => array( 'page' ),
    'include' => array(
      'template' => array( 'page-acces.php' ),
    ),
    'context'    => 'normal',
    'autosave'   => true,
    'fields' => array(

      // Map requires at least one address field (with type = text)
      array(
        'id'   => 'address',
        'name' => __( 'Address', 'meta-box' ),
        'type' => 'text',
        'std'  => __( 'Place Jacques Brel, Sartrouville, France', 'meta-box' ),
      ),
      array(
        'id'            => 'map',
        'name'          => __( 'Location', 'meta-box' ),
        'type'          => 'map',
        'std'           => '',
        'address_field' => 'address',
      ),


      // Content
      array(
        'id'     =>  $prefix . 'acces_bloc',
        'name'   => __( '', 'meta-box' ),
        'type'   => 'group', 
        'clone'  => true,   
        'fields' => array(

          // TITLE
          array(
            'name'          => __( 'Titre de la partie', 'meta-box' ),
            'id'            => "title",
            'type'          => 'text',
          ),

          // MAIN
          array(
            'name'          => __( 'Le contenu', 'meta-box' ),
            'id'            => "main",
            'type'          => 'wysiwyg',
            'options' => array(
              'textarea_rows' => 6,
              'teeny'         => false,
              'media_buttons' => false,
            ),
          ),

        ),
      ),
    ),
  );



  // Pour template Accès
  $meta_boxes[] = array(
    'title'  => __( 'Contenus de la page LE PROJET', 'meta-box' ),
    'id'         => 'blocs-acces',
    'post_types' => array( 'page' ),
    'include' => array(
      'template' => array( 'page-projet.php' ),
    ),
    'context'    => 'normal',
    'autosave'   => true,
    'fields' => array(

      // Content
      array(
        'id'      =>  $prefix . 'projet_equipe',
        'name'    => __( '', 'meta-box' ),
        'type'    => 'wysiwyg',
        'options' => array(
          'textarea_rows' => 4,
          'teeny'         => false,
          'media_buttons' => false,
        ),
      ),
    ),
  );




  return $meta_boxes;
}

