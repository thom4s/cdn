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
if ( ! defined( 'CDN_WIDGETS_DIR' ) )
    define( 'CDN_WIDGETS_DIR', trailingslashit( CDN_DEFAULT_DIR . 'widgets' ) );


  // REQUIRES 
  // EVENTS
require_once CDN_POST_TYPES_DIR . 'event-post-type.php';
require_once CDN_POST_TYPES_DIR . 'event-taxonomies.php';
require_once CDN_POST_TYPES_DIR . 'event-metas.php';
  // POSTS
require_once CDN_POST_TYPES_DIR . 'post-metas.php';
  // WIDGETS
require_once CDN_WIDGETS_DIR . 'newsletter_widget.php';


add_theme_support( 'post-thumbnails' );


// DISABLE ADMIN BAR
add_filter('show_admin_bar', '__return_false');


function add_query_vars($aVars) {
  $aVars[] = "pro"; // represents the name of the product category as shown in the URL
return $aVars;
}
 
// hook add_query_vars function into query_vars
add_filter('query_vars', 'add_query_vars');


// Widget
function tutsplus_register_list_pages_widget() {
    register_widget( 'Newsletter_Widget' );
}
add_action( 'widgets_init', 'tutsplus_register_list_pages_widget' );





