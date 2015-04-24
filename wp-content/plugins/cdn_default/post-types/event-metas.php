<?php
/**
 * Registering Events meta boxes
 *
 * Require from post-types.php
 *
 * For more information, please visit:
 * @link http://metabox.io/docs/registering-meta-boxes/
 */


add_filter( 'rwmb_meta_boxes', 'event_register_meta_boxes' );
/**
 * Register meta boxes
 *
 * Remember to change "your_prefix" to actual prefix in your project
 *
 * @param array $meta_boxes List of meta boxes
 *
 * @return array
 */
function event_register_meta_boxes( $meta_boxes )
{
    /**
     * prefix of meta keys (optional)
     * Use underscore (_) at the beginning to make keys hidden
     * Alt.: You also can make prefix empty to disable it
     */
    // Better has an underscore as last sign
    $prefix = 'event_meta_';
    
    // Générique
    $meta_boxes[] = array(
        'id'         => 'generique',
        'title'      => __( 'Générique', 'meta-box' ),
        'post_types' => array( 'event' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'autosave'   => true,
        'fields'     => array(
            // AUTHORS
            array(
                'name'  => __( 'Auteurs', 'meta-box' ),
                'id'    => "{$prefix}authors",
                'desc'  => __( 'Cliquez sur le + pour ajouter une ligne', 'meta-box' ),
                'type'  => 'text',
                'std'   => __( 'texte ', 'meta-box' ),
                'clone' => true,
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
            // DISTRIBUTION
            array(
                'name' => __( 'Distribution', 'meta-box' ),
                'id'   => "{$prefix}distribution",
                'type' => 'wysiwyg',
                'options' => array(
                    'textarea_rows' => 4,
                    'teeny'         => true,
                    'media_buttons' => false,
                ),
            ),
        )
    );

    // Metas : création, salle, ages, durée, 
    $meta_boxes[] = array(
        'id'         => 'metadatas',
        'title'      => __( 'Metas', 'meta-box' ),
        'post_types' => array( 'event' ),
        'context'    => 'side',
        'priority'   => 'high',
        'autosave'   => true,        
        'fields' => array(
            // Création
            array(
                'name'  => __( 'Création ?', 'meta-box' ),
                'id'    => "{$prefix}creation",
                'type'  => 'checkbox',
            ),
            // DUREE
            array(
                'name'  => __( 'Durée', 'meta-box' ),
                'id'    => "{$prefix}duration",
                'type'  => 'text',
            ),
            // TYPE d'événement
            array(
                'name'    => __( 'Type événement', 'meta-box' ),
                'id'      => "{$prefix}event_type",
                'type'    => 'taxonomy',
                'options' => array(
                    'taxonomy' => 'event_type',
                    'type'     => 'checkbox_list',
                    'args'     => array()
                ),
            ),
            // SALLE
            array(
                'name'    => __( 'Salle', 'meta-box' ),
                'id'      => "{$prefix}salle",
                'type'    => 'taxonomy',
                'options' => array(
                    'taxonomy' => 'event_salle',
                    // How to show taxonomy: 'checkbox_list' (default) or 'checkbox_tree', 'select_tree', select_advanced or 'select'. Optional
                    'type'     => 'checkbox_list',
                    // Additional arguments for get_terms() function. Optional
                    'args'     => array()
                ),
            ),
            // AGE
            array(
                'name'    => __( 'Age', 'meta-box' ),
                'id'      => "{$prefix}age",
                'type'    => 'taxonomy',
                'options' => array(
                    'taxonomy' => 'event_age',
                    // How to show taxonomy: 'checkbox_list' (default) or 'checkbox_tree', 'select_tree', select_advanced or 'select'. Optional
                    'type'     => 'checkbox_list',
                    // Additional arguments for get_terms() function. Optional
                    'args'     => array()
                ),
            ),
        )
    );


    // DATES ET RESERVATIONS
    $meta_boxes[] = array(
        'title'  => __( 'Dates et Réservations', 'meta-box' ),
        'post_types' => array( 'event' ),
        'fields' => array(

            // Dates
            array(
                'name'       => __( 'Dates de l\'événement (en texte)', 'meta-box' ),
                'id'         => "{$prefix}event_date",
                'type'       => 'text',
            ),

            // Code Spectacle
            array(
                'name'       => __( 'Code de l\'événement', 'meta-box' ),
                'id'         => "{$prefix}event_booking_id",
                'type'       => 'number',
            ),

            // Séances (Groupe(s))
            array(
                'id'     =>  $prefix . 'dates',
                'name'   => __( 'Séances (pour les événements', 'meta-box' ),
                'type'   => 'group', 
                'clone'  => true,   
                'fields' => array(

                    // Date de la séance
                    array(
                        'name'       => __( 'Date', 'meta-box' ),
                        'id'         => $prefix . 'datetime',
                        'type'       => 'datetime',
                        'js_options' => array(
                            'stepMinute'     => 15,
                            'showTimepicker' => true,
                        ),
                    ),
                    // Code résa de la séance
                    array(
                        'name'       => __( 'Code de la séance', 'meta-box' ),
                        'id'         => $prefix . 'date_booking_id',
                        'type'       => 'number',
                    ),
                ),
            ),
        ),
    );

    // Presse
    $meta_boxes[] = array(
        'id'         => 'press',
        'title'      => __( 'Revue de presse', 'meta-box' ),
        'post_types' => array( 'event' ),
        'context'    => 'normal',
        'autosave'   => true,        
        'fields' => array(
            // Presse
            array(
                'name' => __( '', 'meta-box' ),
                'id'   => "{$prefix}press",
                'type' => 'wysiwyg',
                'options' => array(
                    'textarea_rows' => 4,
                    'teeny'         => true,
                    'media_buttons' => false,
                ),
            ),
        )
    );

    // Fichiers
    $meta_boxes[] = array(
        'id'         => 'files',
        'title'      => __( 'Fichiers', 'meta-box' ),
        'post_types' => array( 'event' ),
        'context'    => 'side',
        'fields' => array(
            // Dossier pédagogique
            array(
                'name' => __( 'Dossier pédagogique (pdf)', 'meta-box' ),
                'id'   => "{$prefix}pedago",
                'type' => 'file',
                'max_file_uploads'  => '1'
            ),
            // Dossier de Presse
            array(
                'name' => __( 'Dossier de presse (pdf)', 'meta-box' ),
                'id'   => "{$prefix}presskit",
                'type' => 'file',
                'max_file_uploads'  => '1'
            ),
            // Dossier de diffusion
            array(
                'name' => __( 'Dossier de diffusion (pdf)', 'meta-box' ),
                'id'   => "{$prefix}diffusion",
                'type' => 'file',
                'max_file_uploads'  => '1'
            ),
            // Dossier technique
            array(
                'name' => __( 'Dossier technique (pdf)', 'meta-box' ),
                'id'   => "{$prefix}technique",
                'type' => 'file',
                'max_file_uploads'  => '1'
            ),            
            // Dossier technique
            array(
                'name' => __( 'Revue de presse (pdf)', 'meta-box' ),
                'id'   => "{$prefix}pressreview",
                'type' => 'file',
                'max_file_uploads'  => '1'
            ), 
            // Visuels
            array(
                'name' => __( 'Visuels (zip)', 'meta-box' ),
                'id'   => "{$prefix}visuals",
                'type' => 'file',
                'max_file_uploads'  => '1'
            ), 
        )
    );

    return $meta_boxes;    
}