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
    'title'  => __( 'Combinaisons', 'meta-box' ),
    'id'         => 'linkedposts',
    'title'      => __( 'Générique', 'meta-box' ),
    'post_types' => array( 'post', 'page', 'event' ),
    'context'    => 'side',
    'autosave'   => true,
    'fields' => array(

      // EVENT
      array(
        'name'        => __( 'Evénement', 'meta-box' ),
        'id'          => "{$prefix}event_linked",
        'type'        => 'post',
        'post_type'   => 'event',
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
        'name'        => __( 'Importance', 'meta-box' ),
        'id'          => "{$prefix}importance",
        'type'        => 'select',
        'options'     => array(
          'low'     => __( 'Basse', 'meta-box' ),
          'normal'  => __( 'Normal', 'meta-box' ),
          'high'    => __( 'Haute', 'meta-box' ),
        ),
        'multiple'    => false,
        'placeholder' => __( 'Select an Item', 'meta-box' ),
      ),

      // STYLE
      array(
        'name'        => __( 'Style', 'meta-box' ),
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

    )
  );


  // Haut de page 
  $meta_boxes[] = array(
    'title'  => __( 'Bandeau titre', 'meta-box' ),
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


  return $meta_boxes;
}


