<?php 

/*
 * Register Custom Taxonomy for event
 * Require from post-types.php
 ************************************
 */

// Type événement
function type_taxonomy() {
    $labels = array(
        'name'                       => _x( 'Types d\'événements', 'Taxonomy General Name', 'type_taxo' ),
        'singular_name'              => _x( 'Type d\'événement', 'Taxonomy Singular Name', 'type_taxo' ),
        'menu_name'                  => __( 'Types événement', 'type_taxo' ),
        'all_items'                  => __( 'Tous les types', 'type_taxo' ),
        'parent_item'                => __( 'Parent Item', 'type_taxo' ),
        'parent_item_colon'          => __( 'Parent Item:', 'type_taxo' ),
        'new_item_name'              => __( 'Nouveau type', 'type_taxo' ),
        'add_new_item'               => __( 'Ajouter un type', 'type_taxo' ),
        'edit_item'                  => __( 'Editer le type', 'type_taxo' ),
        'update_item'                => __( 'Mettre à jour', 'type_taxo' ),
        'view_item'                  => __( 'Voir le type', 'type_taxo' ),
        'separate_items_with_commas' => __( 'Separate items with commas', 'type_taxo' ),
        'add_or_remove_items'        => __( 'Add or remove items', 'type_taxo' ),
        'choose_from_most_used'      => __( 'Choose from the most used', 'type_taxo' ),
        'popular_items'              => __( 'Types récurents', 'type_taxo' ),
        'search_items'               => __( 'Rechercher un type', 'type_taxo' ),
        'not_found'                  => __( 'Aucun résultat', 'type_taxo' ),
    );
    $rewrite = array(
        'slug'                       => 'saison/quoi',
        'with_front'                 => true,
        'hierarchical'               => false,
    );
    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => false,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'rewrite'                    => $rewrite,
    );
    register_taxonomy( 'event_type', array( 'event' ), $args );
}
add_action( 'init', 'type_taxonomy', 0 );


// AGE 
function age_taxonomy() {
    $labels = array(
        'name'                       => _x( 'Âges', 'Taxonomy General Name', 'age_taxo' ),
        'singular_name'              => _x( 'Âge', 'Taxonomy Singular Name', 'age_taxo' ),
        'menu_name'                  => __( 'Age', 'age_taxo' ),
        'all_items'                  => __( 'Tous les âges', 'age_taxo' ),
        'parent_item'                => __( 'Parent Item', 'age_taxo' ),
        'parent_item_colon'          => __( 'Parent Item:', 'age_taxo' ),
        'new_item_name'              => __( 'Nouvel âge', 'age_taxo' ),
        'add_new_item'               => __( 'Ajouter un âge', 'age_taxo' ),
        'edit_item'                  => __( 'Editer l\' âge', 'age_taxo' ),
        'update_item'                => __( 'Mettre à jour', 'age_taxo' ),
        'view_item'                  => __( 'Voir l\'âge', 'age_taxo' ),
        'separate_items_with_commas' => __( 'Separate items with commas', 'age_taxo' ),
        'add_or_remove_items'        => __( 'Add or remove items', 'age_taxo' ),
        'choose_from_most_used'      => __( 'Choose from the most used', 'age_taxo' ),
        'popular_items'              => __( 'Types récurents', 'age_taxo' ),
        'search_items'               => __( 'Rechercher un type', 'age_taxo' ),
        'not_found'                  => __( 'Aucun résultat', 'age_taxo' ),
    );
    $rewrite = array(
        'slug'                       => 'age',
        'with_front'                 => true,
        'hierarchical'               => false,
    );
    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => false,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'rewrite'                    => $rewrite,
    );
    register_taxonomy( 'event_age', array( 'event' ), $args );
}
add_action( 'init', 'age_taxonomy', 0 );


// SALLE
function salle_taxonomy() {
    $labels = array(
        'name'                       => _x( 'Salles', 'Taxonomy General Name', 'salle_taxo' ),
        'singular_name'              => _x( 'Salle', 'Taxonomy Singular Name', 'salle_taxo' ),
        'menu_name'                  => __( 'Salles', 'salle_taxo' ),
        'all_items'                  => __( 'Toutes les salles', 'salle_taxo' ),
        'parent_item'                => __( 'Parent Item', 'salle_taxo' ),
        'parent_item_colon'          => __( 'Parent Item:', 'salle_taxo' ),
        'new_item_name'              => __( 'Nouvelle salle', 'salle_taxo' ),
        'add_new_item'               => __( 'Ajouter une salle', 'salle_taxo' ),
        'edit_item'                  => __( 'Editer la salle', 'salle_taxo' ),
        'update_item'                => __( 'Mettre à jour', 'salle_taxo' ),
        'view_item'                  => __( 'Voir la salle', 'salle_taxo' ),
        'separate_items_with_commas' => __( 'Separate items with commas', 'salle_taxo' ),
        'add_or_remove_items'        => __( 'Add or remove items', 'salle_taxo' ),
        'choose_from_most_used'      => __( 'Choose from the most used', 'salle_taxo' ),
        'popular_items'              => __( 'Salles récurents', 'salle_taxo' ),
        'search_items'               => __( 'Rechercher une salle', 'salle_taxo' ),
        'not_found'                  => __( 'Aucun résultat', 'salle_taxo' ),
    );
    $rewrite = array(
        'slug'                       => 'salle',
        'with_front'                 => true,
        'hierarchical'               => false,
    );
    $args = array(
        'labels'                     => $labels,
        'hierarchical'               => false,
        'public'                     => true,
        'show_ui'                    => true,
        'show_admin_column'          => true,
        'show_in_nav_menus'          => true,
        'show_tagcloud'              => true,
        'rewrite'                    => $rewrite,
    );
    register_taxonomy( 'event_salle', array( 'event' ), $args );
}
add_action( 'init', 'salle_taxonomy', 0 );


