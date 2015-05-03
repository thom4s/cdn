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



// Widget
function tutsplus_register_list_pages_widget() {
    register_widget( 'Newsletter_Widget' );
}
add_action( 'widgets_init', 'tutsplus_register_list_pages_widget' );





// MODIFY QUERY FOR HOM PAGE 
// TO BE CODED
function my_home_query( $query ) {
    if ( $query->is_home() && $query->is_main_query() ) {
        // $query->set( 'cat', '123' );
    }
}
add_action( 'pre_get_posts', 'my_home_query' );







/*
mahi_add_query_args('http://google.com/', 'foo', 'bar')
=> 'http://google.com/foo/bar
mahi_add_query_args('http://google.com/foo/42', 'foo', 'bar')
=> 'http://google.com/foo/bar
mahi_add_query_args('http://google.com/baz/qux', 'foo', 'bar')
=> 'http://google.com/baz/qux/foo/bar
mahi_add_query_args('http://google.com/', array('foo' => 'bar', 'qux' => 'baz'))
=> 'http://google.com/qux/baz/foo/bar
*/
function mahi_add_query_path($url, $args, $v = null) {
  if ( ! $url )
    $url = $_SERVER['REQUEST_URI'];

  if ( ! is_array($args) ):
    $a[$args] = $v;
    $args = $a;
  endif;

  $components = parse_url($url);

  parse_str($components['query'], $query);

  foreach($args as $k => $v)
    if ( $v ):
      if ( preg_match("#/".$k."/([^/]+)#", $components['path']) )
        $components['path'] = preg_replace("#/".$k."/([^/]+)#", "/".$k."/".$v."/", $components['path']);
      else
        $components['path'] .= '/'.$k.'/'.$v.'/';
    else:
      $components['path'] = preg_replace("#/".$k."/([^/]+)#", '', $components['path']);
    endif;

  $components['query'] = http_build_query($query);

  $url = preg_replace("#\?$#", '', http_build_url($url, $components));
  $url = preg_replace("#([^:])//#", "\\1/", $url);

  return $url;
}
function mahi_remove_query_path($url, $args, $v = null) {
  if ( ! $url )
    $url = $_SERVER['REQUEST_URI'];

  if ( ! is_array($args) ):
    $a[$args] = $v;
    $args = $a;
  endif;

  $components = parse_url($url);

  parse_str($components['query'], $query);

  foreach($args as $k => $v)
    $components['path'] = preg_replace("#/".$k."/([^/]+)#", '', $components['path']);

  $components['query'] = http_build_query($query);

  $url = preg_replace("#\?$#", '', http_build_url($url, $components));
  $url = preg_replace("#([^:])//#", "\\1/", $url);

  return $url;
}
/*
mahi_add_query_args('http://google.com/', 'foo', 'bar')
=> 'http://google.com/?foo=bar
mahi_add_query_args('http://google.com/?foo=42', 'foo', 'bar')
=> 'http://google.com/?foo=bar
mahi_add_query_args('http://google.com/?baz=qux', 'foo', 'bar')
=> 'http://google.com/?baz=qux&foo=bar
mahi_add_query_args('http://google.com/', array('foo' => 'bar', 'qux' => 'baz'))
=> 'http://google.com/?qux=baz&foo=bar
*/
function mahi_add_query_args($url, $args, $v = null) {

  if ( ! $url )
    $url = $_SERVER['REQUEST_URI'];

  if ( ! is_array($args) ):
    $a[$args] = $v;
    $args = $a;
  endif;

  $components = parse_url($url);

  parse_str($components['query'], $query);

  foreach($args as $k => $v)
    $query[$k] = $v;

  $components['query'] = http_build_query($query);

  $url = http_build_url($url, $components);

  return $url;
}

/*
mahi_remove_query_args('http://google.com/?qux=baz&foo=bar', 'foo'))
=> 'http://google.com/?qux=baz
mahi_remove_query_args('http://google.com/?qux=baz&foo=bar', array('foo', 'qux'))
=> 'http://google.com/
*/
function mahi_remove_query_args($url, $args) {

  if ( ! $url )
    $url = $_SERVER['REQUEST_URI'];

  if ( ! is_array($args) )
    $args = array($args);

  $components = parse_url($url);

  parse_str($components['query'], $query);

  foreach($args as $k)
    unset($query[$k]);

  $components['query'] = http_build_query($query);

  $url = http_build_url($url, $components);

  return $url;}


if (!function_exists('http_build_url'))
{
  define('HTTP_URL_REPLACE', 1);        // Replace every part of the first URL when there's one of the second URL
  define('HTTP_URL_JOIN_PATH', 2);      // Join relative paths
  define('HTTP_URL_JOIN_QUERY', 4);     // Join query strings
  define('HTTP_URL_STRIP_USER', 8);     // Strip any user authentication information
  define('HTTP_URL_STRIP_PASS', 16);      // Strip any password authentication information
  define('HTTP_URL_STRIP_AUTH', 32);      // Strip any authentication information
  define('HTTP_URL_STRIP_PORT', 64);      // Strip explicit port numbers
  define('HTTP_URL_STRIP_PATH', 128);     // Strip complete path
  define('HTTP_URL_STRIP_QUERY', 256);    // Strip query string
  define('HTTP_URL_STRIP_FRAGMENT', 512);   // Strip any fragments (#identifier)
  define('HTTP_URL_STRIP_ALL', 1024);     // Strip anything but scheme and host

  // Build an URL
  // The parts of the second URL will be merged into the first according to the flags argument.
  //
  // @param mixed     (Part(s) of) an URL in form of a string or associative array like parse_url() returns
  // @param mixed     Same as the first argument
  // @param int       A bitmask of binary or'ed HTTP_URL constants (Optional)HTTP_URL_REPLACE is the default
  // @param array     If set, it will be filled with the parts of the composed url like parse_url() would return
  function http_build_url($url, $parts=array(), $flags=HTTP_URL_REPLACE, &$new_url=false)
  {
    $keys = array('user','pass','port','path','query','fragment');

    // HTTP_URL_STRIP_ALL becomes all the HTTP_URL_STRIP_Xs
    if ($flags & HTTP_URL_STRIP_ALL)
    {
      $flags |= HTTP_URL_STRIP_USER;
      $flags |= HTTP_URL_STRIP_PASS;
      $flags |= HTTP_URL_STRIP_PORT;
      $flags |= HTTP_URL_STRIP_PATH;
      $flags |= HTTP_URL_STRIP_QUERY;
      $flags |= HTTP_URL_STRIP_FRAGMENT;
    }
    // HTTP_URL_STRIP_AUTH becomes HTTP_URL_STRIP_USER and HTTP_URL_STRIP_PASS
    else if ($flags & HTTP_URL_STRIP_AUTH)
    {
      $flags |= HTTP_URL_STRIP_USER;
      $flags |= HTTP_URL_STRIP_PASS;
    }

    // Parse the original URL
    $parse_url = parse_url($url);

    // Scheme and Host are always replaced
    if (isset($parts['scheme']))
      $parse_url['scheme'] = $parts['scheme'];
    if (isset($parts['host']))
      $parse_url['host'] = $parts['host'];

    // (If applicable) Replace the original URL with it's new parts
    if ($flags & HTTP_URL_REPLACE)
    {
      foreach ($keys as $key)
      {
        if (isset($parts[$key]))
          $parse_url[$key] = $parts[$key];
      }
    }
    else
    {
      // Join the original URL path with the new path
      if (isset($parts['path']) && ($flags & HTTP_URL_JOIN_PATH))
      {
        if (isset($parse_url['path']))
          $parse_url['path'] = rtrim(str_replace(basename($parse_url['path']), '', $parse_url['path']), '/') . '/' . ltrim($parts['path'], '/');
        else
          $parse_url['path'] = $parts['path'];
      }

      // Join the original query string with the new query string
      if (isset($parts['query']) && ($flags & HTTP_URL_JOIN_QUERY))
      {
        if (isset($parse_url['query']))
          $parse_url['query'] .= '&' . $parts['query'];
        else
          $parse_url['query'] = $parts['query'];
      }
    }

    // Strips all the applicable sections of the URL
    // Note: Scheme and Host are never stripped
    foreach ($keys as $key)
    {
      if ($flags & (int)constant('HTTP_URL_STRIP_' . strtoupper($key)))
        unset($parse_url[$key]);
    }


    $new_url = $parse_url;

    return
       ((isset($parse_url['scheme'])) ? $parse_url['scheme'] . '://' : '')
      .((isset($parse_url['user'])) ? $parse_url['user'] . ((isset($parse_url['pass'])) ? ':' . $parse_url['pass'] : '') .'@' : '')
      .((isset($parse_url['host'])) ? $parse_url['host'] : '')
      .((isset($parse_url['port'])) ? ':' . $parse_url['port'] : '')
      .((isset($parse_url['path'])) ? $parse_url['path'] : '')
      .((isset($parse_url['query'])) ? '?' . $parse_url['query'] : '')
      .((isset($parse_url['fragment'])) ? '#' . $parse_url['fragment'] : '')
    ;
  }
}

