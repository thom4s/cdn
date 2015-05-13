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

	// Add mage Size
	add_image_size( 'home-featured', 1200, 500, true ); // 1200px wide / 500px height / cropped
	add_image_size( 'event-media', 894, 500, true ); 
	add_image_size( 'bloc-thumb-2col', 9999, 300 );
	add_image_size( 'page-media', 900 ); 
	add_image_size( 'bloc-thumb', 370 ); 

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
		'description'   => 'Sur toutes les pages statiques sauf Saison, Production et Accueil',
		'before_widget' => '<aside id="%1$s" class="widget-commun bg-practical %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
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
		'before_widget' => '<aside id="%1$s" class="bloc-buttons widget m-4col %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
	register_sidebar( array(
		'name'          => __( 'Accueil - Sous le menu', 'cdn' ),
		'id'            => 'hp-aside',
		'description'   => 'Sur le page d\'accueil uniquement' ,
		'before_widget' => '<div class="bloc-buttons bg-practical">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
	) );			
	register_sidebar( array(
		'name'          => __( 'Saison - Sous le menu', 'cdn' ),
		'id'            => 'saison-aside',
		'description'   => 'Pour les pages Calendrier et Production',
		'before_widget' => '<div class="bloc-buttons">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>',
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



// add google analytics to footer
function add_google_analytics() {
	echo '<script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>';
	echo '<script type="text/javascript">';
	echo 'var pageTracker = _gat._getTracker("UA-XXXXX-X");';
	echo 'pageTracker._trackPageview();';
	echo '</script>';
}
add_action('wp_footer', 'add_google_analytics');



// custom admin login logo
function custom_login_logo() {
	echo '<style type="text/css">
	h1 a { background-image: url('.get_bloginfo('template_directory').'/img/logo-cdn.png) !important; }
	</style>';
}
add_action('login_head', 'custom_login_logo');


// remove junk from head
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'index_rel_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'start_post_rel_link', 10, 0);
remove_action('wp_head', 'parent_post_rel_link', 10, 0);
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);


/**
 * SHORTCODES 
 */

// NOT WORKING // UNFINISHED
function get_blocks_shortcode($atts) {
 
  	// Get attributes
  $a = shortcode_atts( array(
        'pages' => '140',
    ), $atts );

  $pages_id = $a['pages'];

  // Medias attributes
  $get_pages = get_posts(array(
    'post_type'   	=> array('event', 'page', 'post'),
    'include'				=> $pages_id,
  ));

  if ($get_pages){ 
    ob_start(); 
    get_template_part('loop','related-content');
    $blocks_displayed = true;
    return ob_get_clean();
  }
}
add_shortcode( 'get_blocks', 'get_blocks_shortcode' );


// Shortcode for making a big title (h2 in template) WORKING
function make_a_big_title_shortcode($atts) {
 
  // Get attributes
  $a = shortcode_atts( array(
        'titre' => 'Le titre de la partie',
        'couleur' => 'red',
    ), $atts );
  $title = $a['titre'];
  $color = $a['couleur'];

  ob_start(); ?>

    <div class="l-11col l-first title-underline-<?php echo $color; ?> clearfix">
      <h2><?php echo $title; ?></h2>
      <div class="line-dotted"></div>
    </div>

  <?php return ob_get_clean();
}
add_shortcode( 'une_partie', 'make_a_big_title_shortcode' );



/**
 * FILTER SEARCH RESULTS BY POST TYPE
 */
add_filter('posts_orderby', 'group_by_post_type', 10, 2);
function group_by_post_type($orderby, $query) {
    global $wpdb;
    if ($query->is_search) {
        return $wpdb->posts . '.post_type ASC';
    }
    // provide a default fallback return if the above condition is not true
    return $orderby;
}

function search_filter($query) {
  if ( !is_admin() && $query->is_main_query() ) {
    if ($query->is_search) {
      $query->set('post_type', array('event', 'page', 'post') );
      $query->set('tax_query', array(
      	array( 
      		'taxonomy' => 'event_cat',
      		'field'    => 'slug',
      		'terms'    => array( 'recre', 'rencontre' ),
					'operator' => 'NOT IN',
      	)
      ));
      $query->set('post__not_in', array('35') );
    }
  }
}

add_action('pre_get_posts','search_filter');


function custom_excerpt_length( $length ) {
	return 20;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );


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
