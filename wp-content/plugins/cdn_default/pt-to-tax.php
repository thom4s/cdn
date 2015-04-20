<?php
/* 
Plugin Name: Convert Custom Taxonomy to Custom Post Type 
Plugin URI: N/A
Description: A plugin to convert a Custom Taxonomy to a Custom Post Type and transfer associated metadata.
Version: 0.1 
Author: Strap1
Author URI: http:/www.hiphopinenglish.com
 
/** Convert Taxonomy '%name%' to CPT '%name%' **/
 
function make_posts_from_taxonomy($taxonomy) {
if(did_action('init') === 1) { //Ensure we only run function once
// Get all Taxonomy
$args = array(
  'parent' => 0, //In my case I only wanted top level terms returned
  'hide_empty' => false,
  );
  
$taxonomy = 'your_taxonomy'; //Define Custom Taxonomy (source)
$post_type = 'your_CPT'; // Define Custom Post Type (target)
 
$terms = get_terms( $taxonomy, $args);
 
foreach ($terms as $term) {
  set_time_limit(20); //Attempt to prevent timeouts
  $t_id = $term->term_id;
  $term_meta = get_option( "taxonomy_$t_id" );
  $name = $term->name; //Title
  $slug = $term->slug; //Slug
  $description = $term->description; //Description
  
  //Above finds all the data from Custom Taxonomy and associated metadata.
  //We make a new post for each item, using same details from Taxonomy
  if( null == get_page_by_title( $name ) ) { // If that post doesn't exist of course.
    $new_post = array(
      
      'post_title' => $name,
      'post_content' => $description, //Use Taxonomy description for Post Content
      'post_name' => $slug,
      'post_status' => 'publish',
      'post_type' => $post_type,
      
  );
  //Insert post
  $post_id = wp_insert_post( $new_post );
  
  //Insert meta where it exists. Note that my meta is stored like so: http://pippinsplugins.com/adding-custom-meta-fields-to-taxonomies/
  if (!empty($term_meta['buy_download_meta'])) : update_post_meta ($post_id, '_cmb_buy', $term_meta['buy_download_meta']); endif;
  if (!empty($term_meta['custom_term_meta'])) : update_post_meta ($post_id, '_cmb_discogs', $term_meta['custom_term_meta']); endif;
  if (!empty($term_meta['itunes_meta'])) : update_post_meta ($post_id, '_cmb_itunes', $term_meta['itunes_meta']); endif;
  if (!empty($term_meta['artist_showcase_meta'])) : update_post_meta ($post_id, '_cmb_showcase', $term_meta['artist_showcase_meta']); endif;
 
    } else { // Do sweet F.A.
  }
 
  
  } //End foreach
 
} //End function
 
} //Endif did_action
register_activation_hook( __FILE__, 'make_posts_from_taxonomy' ); //Run on plugin activation
?>
