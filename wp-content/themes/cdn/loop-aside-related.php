<?php


  $prefix_event = 'event_meta_';
  $prefix_default = 'defaults_meta_';

  // Defaults
  $linked_post_bg = 'bg-white';
  $linked_post_col = 'bloc-1col';

  // Linked Posts
  if ($linkedposts = rwmb_meta(  $prefix_default . 'aside_linkedposts', get_the_ID() ) ): 
    $first_id = $linkedposts[0];
    $first_id = $first_id['id'];
    if ($first_id !== '') { ?>


  <div class="aside-related clearfix">
    
          <?php
            foreach($linkedposts as $linkedpost):

              $linked_post_id = $linkedpost['id'];
              $linked_post_bg = $linkedpost['bloc_bg'];
              if( isset($linkedpost['has_link']) ) {
                $linked_post_has_link = true;
              } else {
                $linked_post_has_link = false;
              }

              $linked_post = get_post($linked_post_id);
              $post_title = $linked_post->post_title;
              $post_url = $linked_post->guid;
              $post_type = $linked_post->post_type;

              if($post_type == 'event'){
                $post_excerpt = rwmb_meta( $prefix_event . 'intro', array(), $linked_post_id );
                $post_meta = rwmb_meta(  $prefix_event . 'event_date', array(), $linked_post_id );
              }
              if($post_type == 'post'){
                $post_meta = get_the_terms( $linked_post_id, 'category' );
                $post_excerpt = rwmb_meta(  $prefix_default . 'intro', array(), $linked_post_id );
              }  
              if($post_type == 'page'){
                $post_meta = get_the_terms( $linked_post_id, 'category' );
                $post_excerpt = rwmb_meta(  $prefix_default . 'intro', array(), $linked_post_id );
              }  

              include(locate_template('bloc.php'));

            endforeach;
            wp_reset_postdata(); ?>

  </div><!-- .aside-related -->

  <?php  } // end if $first_id
  endif;

