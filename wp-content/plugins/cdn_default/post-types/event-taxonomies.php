<?php 

/*
 * Register Custom Taxonomy for event
 * Require from cdn-functions.php
 ************************************
 */

// Créations
function creation_taxonomy() {
    $labels = array(
        'name'                       => _x( 'Créations', 'Taxonomy General Name', 'type_taxo' ),
        'singular_name'              => _x( 'Type de création', 'Taxonomy Singular Name', 'type_taxo' ),
        'menu_name'                  => __( 'Les Créations du CDN', 'type_taxo' ),
        'all_items'                  => __( 'Toutes les créations', 'type_taxo' ),
        'parent_item'                => __( 'Parent Item', 'type_taxo' ),
        'parent_item_colon'          => __( 'Parent Item:', 'type_taxo' ),
        'new_item_name'              => __( 'Nouvelle création', 'type_taxo' ),
        'add_new_item'               => __( 'Ajouter une création', 'type_taxo' ),
        'edit_item'                  => __( 'Editer la création', 'type_taxo' ),
        'update_item'                => __( 'Mettre à jour', 'type_taxo' ),
        'view_item'                  => __( 'Voir la création', 'type_taxo' ),
        'separate_items_with_commas' => __( 'Separate items with commas', 'type_taxo' ),
        'add_or_remove_items'        => __( 'Add or remove items', 'type_taxo' ),
        'choose_from_most_used'      => __( 'Choose from the most used', 'type_taxo' ),
        'popular_items'              => __( 'créations récurents', 'type_taxo' ),
        'search_items'               => __( 'Rechercher une création', 'type_taxo' ),
        'not_found'                  => __( 'Aucun résultat', 'type_taxo' ),
    );
    $rewrite = array(
        'slug'                       => 'saison/c',
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
    register_taxonomy( 'event_creation', array( 'event' ), $args );
}
add_action( 'init', 'creation_taxonomy', 0 );


// Type spectacle
function type_taxonomy() {
    $labels = array(
        'name'                       => _x( 'Types de spectacle', 'Taxonomy General Name', 'type_taxo' ),
        'singular_name'              => _x( 'Type de spectacle', 'Taxonomy Singular Name', 'type_taxo' ),
        'menu_name'                  => __( 'Types spectacles', 'type_taxo' ),
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
        'slug'                       => 'saison/t',
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

// Saison
function saison_taxonomy() {
    $labels = array(
        'name'                       => _x( 'Saisons', 'Taxonomy General Name', 'type_taxo' ),
        'singular_name'              => _x( 'Saison', 'Taxonomy Singular Name', 'type_taxo' ),
        'menu_name'                  => __( 'Saisons', 'type_taxo' ),
        'all_items'                  => __( 'Toutes les Saisons', 'type_taxo' ),
        'parent_item'                => __( 'Parent Item', 'type_taxo' ),
        'parent_item_colon'          => __( 'Parent Item:', 'type_taxo' ),
        'new_item_name'              => __( 'Nouvelle saison', 'type_taxo' ),
        'add_new_item'               => __( 'Ajouter une saison', 'type_taxo' ),
        'edit_item'                  => __( 'Editer la saison', 'type_taxo' ),
        'update_item'                => __( 'Mettre à jour', 'type_taxo' ),
        'view_item'                  => __( 'Voir la saison', 'type_taxo' ),
        'separate_items_with_commas' => __( 'Separate items with commas', 'type_taxo' ),
        'add_or_remove_items'        => __( 'Add or remove items', 'type_taxo' ),
        'choose_from_most_used'      => __( 'Choose from the most used', 'type_taxo' ),
        'popular_items'              => __( 'Types récurents', 'type_taxo' ),
        'search_items'               => __( 'Rechercher un type', 'type_taxo' ),
        'not_found'                  => __( 'Aucun résultat', 'type_taxo' ),
    );
    $rewrite = array(
        'slug'                       => 'archives/saison/',
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
    register_taxonomy( 'event_saison', array( 'event' ), $args );
}
add_action( 'init', 'saison_taxonomy', 0 );


// Catégorie événement
function event_cat_taxonomy() {
    $labels = array(
        'name'                       => _x( 'Catégories d\'événements', 'Taxonomy General Name', 'type_taxo' ),
        'singular_name'              => _x( 'Catégorie d\'événement', 'Taxonomy Singular Name', 'type_taxo' ),
        'menu_name'                  => __( 'Catégories événement', 'type_taxo' ),
        'all_items'                  => __( 'Toutes les Catégories', 'type_taxo' ),
        'parent_item'                => __( 'Parent Item', 'type_taxo' ),
        'parent_item_colon'          => __( 'Parent Item:', 'type_taxo' ),
        'new_item_name'              => __( 'Nouvelle Catégorie', 'type_taxo' ),
        'add_new_item'               => __( 'Ajouter une catégorie', 'type_taxo' ),
        'edit_item'                  => __( 'Editer la catégorie', 'type_taxo' ),
        'update_item'                => __( 'Mettre à jour', 'type_taxo' ),
        'view_item'                  => __( 'Voir la catégorie', 'type_taxo' ),
        'separate_items_with_commas' => __( 'Separate items with commas', 'type_taxo' ),
        'add_or_remove_items'        => __( 'Add or remove items', 'type_taxo' ),
        'choose_from_most_used'      => __( 'Choose from the most used', 'type_taxo' ),
        'popular_items'              => __( 'Catégories récurentes', 'type_taxo' ),
        'search_items'               => __( 'Rechercher une catégorie', 'type_taxo' ),
        'not_found'                  => __( 'Aucun résultat', 'type_taxo' ),
    );
    $rewrite = array(
        'slug'                       => 'saison/c',
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
    register_taxonomy( 'event_cat', array( 'event' ), $args );
}
add_action( 'init', 'event_cat_taxonomy', 0 );


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
        'slug'                       => 'saison/a',
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
        'slug'                       => 'saison/p',
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


