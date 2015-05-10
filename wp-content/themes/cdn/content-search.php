<?php
/**
 * The template part for displaying results in search pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package cdn
 */

		// GET ALL META DATAS
    $prefix_default = 'defaults_meta_';
    $prefix_event = 'event_meta_';
    
		$introduction =	rwmb_meta( $prefix_event . 'intro' );
		$subtitle =	rwmb_meta( $prefix_event . 'subtitle' );
	
	  $linked_post_bg = 'bg-white';
	  $linked_post_col = 'bloc-1col';
	  $linked_post_has_link = true;

	  $post_url = get_the_permalink();
	  $linked_post_id = $post->ID;
	  $post_type = get_post_type();
	  $post_title = get_the_title();

    if($post_type == 'event'){
      $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $linked_post_id );
      $event_type = rwmb_meta(  $prefix_event . 'event_type', 'type=taxonomy&taxonomy=event_type', $linked_post_id );
      $post_meta = rwmb_meta(  $prefix_event . 'event_date', array(), $linked_post_id );
      $authors =  rwmb_meta( $prefix_event . 'authors', array(), $linked_post_id );
    }
    if($post_type == 'post'){
      $post_meta = get_the_terms( $linked_post_id, 'category' );
      $post_excerpt = get_the_excerpt();
      $event_type = NULL;
      $authors = NULL;
    }  
    if($post_type == 'page'){
      $post_meta = get_the_terms( $linked_post_id, 'category' );
      $post_excerpt = rwmb_meta(  $prefix_default . 'intro', array(), $linked_post_id );
      $event_type = NULL;
      $authors = NULL;
    } 

		include(locate_template('bloc.php'));



