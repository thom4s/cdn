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


// Prevent loading this file directly
defined( 'ABSPATH' ) || exit;

// Plugin paths, for including files
if ( ! defined( 'CDN_DEFAULT_DIR' ) )
    define( 'CDN_DEFAULT_DIR', plugin_dir_path( __FILE__ ) );
if ( ! defined( 'CDN_POST_TYPES_DIR' ) )
    define( 'CDN_POST_TYPES_DIR', trailingslashit( CDN_DEFAULT_DIR . 'post-types' ) );



// REQUIRES POST-TYPES & TAXONOMIES & METAS
  // EVENTS
require_once CDN_POST_TYPES_DIR . 'event-post-type.php';
require_once CDN_POST_TYPES_DIR . 'event-taxonomies.php';
require_once CDN_POST_TYPES_DIR . 'event-metas.php';
  // POSTS
require_once CDN_POST_TYPES_DIR . 'post-metas.php';


// DISABLE ADMIN BAR
add_filter('show_admin_bar', '__return_false');



// MODIFY QUERY FOR HOM PAGE 
// TO BE CODED
function my_home_query( $query ) {
    if ( $query->is_home() && $query->is_main_query() ) {
        $query->set( 'cat', '123' );
    }
}
add_action( 'pre_get_posts', 'my_home_query' );