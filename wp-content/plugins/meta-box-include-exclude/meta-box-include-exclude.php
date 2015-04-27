<?php
/*
Plugin Name: Meta Box Include Exclude
Plugin URI: http://metabox.io/plugins/meta-box-include-exclude/
Description: Easily show/hide meta boxes by ID, page template, taxonomy or custom defined function.
Version: 0.2.2
Author: Rilwis
Author URI: http://www.deluxeblogtips.com
License: GPL2+
*/

defined( 'ABSPATH' ) || exit;

if ( is_admin() )
{
	require plugin_dir_path( __FILE__ ) . 'class-mb-include-exclude.php';
	add_filter( 'rwmb_show', array( 'MB_Include_Exclude', 'check' ), 10, 2 );
}
