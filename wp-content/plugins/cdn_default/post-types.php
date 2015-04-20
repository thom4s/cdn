<?php
/**
 * Plugin Name: CDN Post types.
 * Plugin URI: http://
 * Description: Déclaration WP des custom post-types (events) et taxonomies
 * Version: 1.0.0
 * Author: Thomas Florentin
 * Author URI: http://thomasflorentin.net
 * Text Domain: cdn-pt
 * License: A short license name. Example: GPL2
 */

// Register Custom Post Type
function event_post_type() {

  $labels = array(
    'name'                => _x( 'Evénements', 'Post Type General Name', 'event-pt' ),
    'singular_name'       => _x( 'Evénement', 'Post Type Singular Name', 'event-pt' ),
    'menu_name'           => __( 'Evénements', 'event-pt' ),
    'name_admin_bar'      => __( 'Evénements', 'event-pt' ),
    'parent_item_colon'   => __( 'Parent Item:', 'event-pt' ),
    'all_items'           => __( 'Tous les événements', 'event-pt' ),
    'add_new_item'        => __( 'Ajouter un événement', 'event-pt' ),
    'add_new'             => __( 'Ajouter', 'event-pt' ),
    'new_item'            => __( 'Ajouter événement', 'event-pt' ),
    'edit_item'           => __( 'Editer événement', 'event-pt' ),
    'update_item'         => __( 'Mettre à jour', 'event-pt' ),
    'view_item'           => __( 'Prévisualiser l\'événement', 'event-pt' ),
    'search_items'        => __( 'Rechercher ', 'event-pt' ),
    'not_found'           => __( 'Aucun résultat', 'event-pt' ),
    'not_found_in_trash'  => __( 'Aucun résultat dans la corbeille', 'event-pt' ),
  );
  $rewrite = array(
    'slug'                => 'evenements',
    'with_front'          => true,
    'pages'               => true,
    'feeds'               => true,
  );
  $args = array(
    'label'               => __( 'event', 'event-pt' ),
    'description'         => __( 'Evenements du CDN', 'event-pt' ),
    'labels'              => $labels,
    'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'revisions', 'custom-fields', ),
    'taxonomies'          => array( 'category', 'post_tag' ),
    'hierarchical'        => false,
    'public'              => true,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'menu_position'       => 5,
    'show_in_admin_bar'   => true,
    'show_in_nav_menus'   => true,
    'can_export'          => true,
    'has_archive'         => true,
    'exclude_from_search' => false,
    'publicly_queryable'  => true,
    'rewrite'             => $rewrite,
    'capability_type'     => 'page',
  );
  register_post_type( 'event', $args );

}

// Hook into the 'init' action
add_action( 'init', 'event_post_type', 0 );
