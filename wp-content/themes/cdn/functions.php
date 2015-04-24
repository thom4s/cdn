<?php
/**
 * cdn functions and definitions
 *
 * @package cdn
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'cdn_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function cdn_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on cdn, use a find and replace
	 * to change 'cdn' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'cdn', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'cdn' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	) );


	// Add Image Size for This Theme // TO DO 
	add_action( 'after_setup_theme', 'baw_theme_setup' );
	function baw_theme_setup() {
	  add_image_size( 'home-featured', 1200, 500, true ); // 1200px wide / 500px height / cropped
	  add_image_size( 'homepage-thumb', 894, 450, true ); 
	}


	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'cdn_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // cdn_setup
add_action( 'after_setup_theme', 'cdn_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function cdn_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'cdn' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
	register_sidebar( array(
		'name'          => __( 'Footer 1er colonne', 'cdn' ),
		'id'            => 'footer-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h6 class="widget-title">',
		'after_title'   => '</h6>',
	) );	
	register_sidebar( array(
		'name'          => __( 'Footer 2eme colonne', 'cdn' ),
		'id'            => 'footer-2',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h6 class="widget-title">',
		'after_title'   => '</h6>',
	) );	
	register_sidebar( array(
		'name'          => __( 'Footer 3eme colonne', 'cdn' ),
		'id'            => 'footer-3',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h6 class="widget-title">',
		'after_title'   => '</h6>',
	) );	
	register_sidebar( array(
		'name'          => __( 'Footer supérieur', 'cdn' ),
		'id'            => 'upper-footer',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="buttons-group widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );	
}
add_action( 'widgets_init', 'cdn_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function cdn_scripts() {

  wp_deregister_script('jquery');

  wp_enqueue_style( 'cdn-style', get_template_directory_uri() . '/sass/main.min.css');

	wp_enqueue_script( 'cdn-scripts', get_template_directory_uri() . '/js/all.min.js', array(), '20140501', true );
}
add_action( 'wp_enqueue_scripts', 'cdn_scripts' );

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
