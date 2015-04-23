<?php

/*
 * Register Meta Boxes for event
 * Require from post-types.php
 *******************************
 */

add_filter( 'rwmb_meta_boxes', 'your_prefix_register_meta_boxes' );
/**
 * Register meta boxes
 *
 * Remember to change "your_prefix" to actual prefix in your project
 *
 * @param array $meta_boxes List of meta boxes
 *
 * @return array
 */
function your_prefix_register_meta_boxes( $meta_boxes )
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
            // HIDDEN
            array(
                'id'   => "{$prefix}hidden",
                'type' => 'hidden',
                // Hidden field must have predefined value
                'std'  => __( 'Hidden value', 'meta-box' ),
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

    // DATES + Codes réservation
    $meta_boxes[] = array(
        'id'         => 'dates',
        'title'      => __( 'Dates et codes de réservation', 'meta-box' ),
        'post_types' => array( 'event' ),
        'context'    => 'side',
        'priority'   => 'low',
        'autosave'   => true,        
        'fields' => array(
            // DATETIME
            array(
                'name'       => __( 'Dates', 'meta-box' ),
                'id'         => $prefix . 'datetime',
                'type'       => 'datetime',
                // jQuery datetime picker options.
                // For date options, see here http://api.jqueryui.com/datepicker
                // For time options, see here http://trentrichardson.com/examples/timepicker/
                'js_options' => array(
                    'stepMinute'     => 15,
                    'showTimepicker' => true,
                ),
                'desc'  => __( 'Cliquez sur le + pour ajouter une séance', 'meta-box' ),
                'clone'     => true,
            ),
            // Code Spectacle
            array(
                'name'       => __( 'Code du spectacle', 'meta-box' ),
                'id'         => $prefix . 'event_booking_id',
                'type'       => 'number',
            ),
            // Code(s) séances
            array(
                'name'       => __( 'Code de la / des séance(s)', 'meta-box' ),
                'id'         => $prefix . 'event_booking_id',
                'type'       => 'number',
                'desc'  => __( 'Un code par séance. Cliquez sur le + pour ajouter un code', 'meta-box' ),
                'clone'      => true
            ),
        )
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

    // Presse
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