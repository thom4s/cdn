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

  // LINKED TO ...
  $meta_boxes[] = array(
    'title'      => __( 'Allez plus loin...', 'meta-box' ),
    'id'         => 'linkedposts',
    'post_types' => array( 'post', 'page', 'event' ),
    'exclude' => array(
      'template' => array( 'page-home.php' ),
    ),    
    'context'    => 'side',
    'fields' => array(

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
            'id'            => "{$prefix}importance",
            'type'          => 'select',
            'options'       => array(
              'practical'   => __( 'Pratique', 'meta-box' ),
              'event-aside' => __( 'Un événement soutien', 'meta-box' ),
              'normal'      => __( 'Normal', 'meta-box' ),
              'fun'         => __( 'Fun', 'meta-box' ),
            ),
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
          ),

          // STYLE
          array(
            'name'        => __( 'Et son style...', 'meta-box' ),
            'id'          => "{$prefix}select",
            'type'        => 'select',
            'options'     => array(
              'value1' => __( 'Style 1', 'meta-box' ),
              'value2' => __( 'Style 2', 'meta-box' ),
            ),
            // Select multiple values, optional. Default is false.
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
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
            'id'            => "{$prefix}importance",
            'type'          => 'select',
            'options'       => array(
              'practical'   => __( 'Pratique', 'meta-box' ),
              'event-aside' => __( 'Un événement soutien', 'meta-box' ),
              'normal'      => __( 'Normal', 'meta-box' ),
              'fun'         => __( 'Fun', 'meta-box' ),
            ),
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
          ),

          // STYLE
          array(
            'name'        => __( 'Et son style...', 'meta-box' ),
            'id'          => "{$prefix}select",
            'type'        => 'select',
            'options'     => array(
              'value1' => __( 'Style 1', 'meta-box' ),
              'value2' => __( 'Style 2', 'meta-box' ),
            ),
            // Select multiple values, optional. Default is false.
            'multiple'    => false,
            'placeholder' => __( 'Select an Item', 'meta-box' ),
          ),
        ),
      ),

    )
  );



  return $meta_boxes;
}


