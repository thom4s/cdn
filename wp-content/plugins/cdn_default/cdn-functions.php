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
  // Utils
require_once CDN_DEFAULT_DIR . 'utils.php';
  // EVENTS
require_once CDN_POST_TYPES_DIR . 'event-post-type.php';
require_once CDN_POST_TYPES_DIR . 'event-taxonomies.php';
require_once CDN_POST_TYPES_DIR . 'event-metas.php';
  // POSTS
require_once CDN_POST_TYPES_DIR . 'post-metas.php';
  // WIDGETS
require_once CDN_WIDGETS_DIR . 'newsletter_widget.php';
  // Elses
require_once CDN_DEFAULT_DIR . 'remove_blog_slug.php';
require_once CDN_DEFAULT_DIR . 'custom_query_vars.php';



// Disable Admin Bar
add_filter('show_admin_bar', '__return_false');

// Add Thumbnails supports
add_theme_support( 'post-thumbnails' );

// Widget
function tutsplus_register_list_pages_widget() {
    register_widget( 'Newsletter_Widget' );
}
add_action( 'widgets_init', 'tutsplus_register_list_pages_widget' );





