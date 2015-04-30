<?php


  $prefix_event = 'event_meta_';
  $prefix_default = 'defaults_meta_';

  // Defaults
  $linked_post_bg = 'bg-white';
  $linked_post_col = 'bloc-1col';
  $linked_post_has_link = true;

  // Linked Posts
  if ($linkedposts = rwmb_meta(  $prefix_default . 'linkedposts', get_the_ID() ) ): 
    $first_id = $linkedposts[0];
    $first_id = $first_id['defaults_meta_linkedpost-id'];
    if ($first_id !== '') { ?>


  <div class="related-content">
    <?php if ( is_front_page() ) { ?>
      
    <?php } else { ?>
      <h2>Aller plus loin</h2>
    <?php }?>
    
      <div id="grid" class="row" data-columns>

          <?php
            foreach($linkedposts as $linkedpost):

              $linked_post_id = $linkedpost['defaults_meta_linkedpost-id'];
              $linked_post_bg = $linkedpost['defaults_meta_bloc_bg'];
              $linked_post_col = $linkedpost['defaults_meta_bloc_col'];
              $linked_post_has_link = $linkedpost['defaults_meta_has_link'];

              $linked_post = get_post($linked_post_id);
              $post_title = $linked_post->post_title;
              $post_url = $linked_post->guid;
              $post_type = $linked_post->post_type;

              if($post_type == 'event'){
                $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $linked_post_id );
                $post_meta = rwmb_meta(  $prefix_event . 'event_date', array(), $linked_post_id );
              }
              if($post_type == 'post'){
                $post_meta = get_the_terms( $linked_post_id, 'category' );
                $post_excerpt = $linked_post->post_excerpt;
              }  
              if($post_type == 'page'){
                $post_meta = get_the_terms( $linked_post_id, 'category' );
                $post_excerpt = $linked_post->post_excerpt;
              }  

              include(locate_template('bloc.php'));

            endforeach;
            wp_reset_postdata(); ?>

      </div><!-- #grid -->
  </div><!-- .related-content -->

  <?php  } // end if $first_id
  endif;

