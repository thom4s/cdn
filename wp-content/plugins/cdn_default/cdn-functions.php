<?php 
/**
 * Plugin Name: CDN Functions.
 * Plugin URI: http://
 * Description: Diverses fonctions pour le site du CDN
 * Version: 1.0.0
 * Author: Thomas Florentin
 * Author URI: http://thomasflorentin.net
 * Text Domain: cdn-functions
 * License: A short license name. Example: GPL2
 */

add_filter('show_admin_bar', '__return_false');

function my_home_query( $query ) {
    if ( $query->is_home() && $query->is_main_query() ) {
        $query->set( 'cat', '123' );
    }
}
add_action( 'pre_get_posts', 'my_home_query' );