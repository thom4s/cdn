<?php


  $prefix_event = 'event_meta_';
  $prefix_default = 'defaults_meta_';

  // Defaults
  $linked_post_bg = 'bg-white';
  $linked_post_col = 'bloc-1col';
  $linked_post_has_link = true;

  // Linked Posts
  if ($linkedposts = rwmb_meta(  $prefix_default . 'linkedposts', get_the_ID() ) ):
    foreach($linkedposts as $linkedpost):

      $linked_post_id = $linkedpost['defaults_meta_linkedpost-id'];
      $linked_post_bg = $linkedpost['defaults_meta_bloc_bg'];
      $linked_post_col = $linkedpost['defaults_meta_bloc_col'];
      $linked_post_has_link = $linkedpost['defaults_meta_has_link'];

      $linked_post = get_post($linked_post_id);
      $post_title = $linked_post->post_title;
      $post_excerpt = $linked_post->post_excerpt;
      $post_url = $linked_post->guid;
      $post_type = $linked_post->post_type;

      if($post_type == 'event'){
         $post_meta = rwmb_meta(  $prefix_event . 'event_date', array(), $linked_post_id );
      }
      if($post_type == 'post'){
        $post_meta = get_the_terms( $linked_post_id, 'category' );
      }  
      if($post_type == 'page'){
        $post_meta = get_the_terms( $linked_post_id, 'category' );
      }  

      include(locate_template('bloc.php'));

    endforeach;
    wp_reset_postdata();
  endif;

