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
  // Elses
require_once CDN_DEFAULT_DIR . 'remove_blog_slug.php';



add_theme_support( 'post-thumbnails' );


// DISABLE ADMIN BAR
add_filter('show_admin_bar', '__return_false');


// Custom Query Vars
// some help here : http://www.rlmseo.com/blog/passing-get-query-string-parameters-in-wordpress-url/
function add_query_vars($aVars) {
  $aVars[] = "pro";
  $aVars[] = "quoi";
  return $aVars;
}
add_filter('query_vars', 'add_query_vars');

function add_rewrite_rules($aRules) {
  $rules_for_filter = array('saison/quoi/([^/]+)/?$' => 'index.php?pagename=saison&quoi=$matches[1]');
  $rules_for_blog_slug = array('blog/([a-z0-9]+)$' => '$matches[1]');
  $aRules = $rules_for_filter + $rules_for_blog_slug + $aRules;
  return $aRules;
}
add_filter('rewrite_rules_array', 'add_rewrite_rules');



// Widget
function tutsplus_register_list_pages_widget() {
    register_widget( 'Newsletter_Widget' );
}
add_action( 'widgets_init', 'tutsplus_register_list_pages_widget' );





