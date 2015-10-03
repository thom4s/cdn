<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package cdn
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/img/favicon.ico" />
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">

		<div class="wrap row">
			
			<?php
			if ( is_front_page() ) {
			    // This is the blog posts index
			    get_template_part( 'header', 'home' );
			} else {
			    // This is not the blog posts index
			    get_template_part( 'header', 'else' ); 
			}
			?>

			<div id="content" class="site-content l-12col l-last m-12col m-last">
