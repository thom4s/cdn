<?php


  $prefix_event = 'event_meta_';
  $prefix_default = 'defaults_meta_';

  // Defaults
  $linked_post_bg = 'bg-white';
  $linked_post_has_link = true;
  $second_featured = false;

  $elements_title = rwmb_meta(  $prefix_default . 'related_title', get_the_ID() );
  $second_featured = rwmb_meta(  $prefix_default . 'second_featured', get_the_ID() );
  if($second_featured == 1) { $second_featured = true; }

  // Linked Posts
  if ($linkedposts = rwmb_meta(  $prefix_default . 'linkedposts', get_the_ID() ) ): 
    $first_id = $linkedposts[0];
    $first_id = $first_id['defaults_meta_linkedpost-id'];
    if ($first_id !== '') { ?>


  <div class="related-content content-part">

    <?php if ( !is_front_page() && $elements_title != '' ) : ?>
        <div class="l-1col-push l-11col l-first title-underline-gray">
          <h2><?php echo $elements_title; ?></h2>
          <div class="line-dotted"></div>
        </div>
    <?php endif; ?>
          
          <?php
            $y = 0;
            foreach($linkedposts as $linkedpost):

              if($second_featured) {
                if($y === 0) {
                  echo '<div class="second_featured">';
                  $bloc_col = 'm-8col m-first';
                } elseif( $y === 1) {
                  $bloc_col = 'm-4col m-last';
                } elseif( $y === 2) {
                  echo '</div><!-- .second_featured -->';
                  echo '<div id="grid" class="row" data-columns>';
                  $bloc_col = '';
                } elseif( $y < 2) {
                  $bloc_col = '';
                }
              } else {
                $bloc_col = '';
                if($y == 0) {
                  echo '<div id="grid" class="row" data-columns>';
                }
              }


              $linked_post_id = $linkedpost['defaults_meta_linkedpost-id'];
              $linked_post_bg = $linkedpost['defaults_meta_bloc_bg'];

              if( isset($linkedpost['defaults_meta_has_link']) ) {
                $linked_post_has_link = true;
              } else {
                $linked_post_has_link = false;
              }

              $linked_post = get_post($linked_post_id);
              $post_title = $linked_post->post_title;
              $post_url = $linked_post->guid;
              $post_type = $linked_post->post_type;

              if($post_type == 'event'){
                $post_excerpt = rwmb_meta(  $prefix_event . 'intro', array(), $linked_post_id );
                $event_type = rwmb_meta(  $prefix_event . 'event_type', 'type=taxonomy&taxonomy=event_type', $linked_post_id );
                $post_meta = rwmb_meta(  $prefix_event . 'event_date', array(), $linked_post_id );
                $authors =  rwmb_meta( $prefix_event . 'authors', array(), $linked_post_id );
              }
              if($post_type == 'post'){
                $post_meta = get_the_terms( $linked_post_id, 'category' );
                $post_excerpt = $linked_post->post_excerpt;
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

              $y++;
            endforeach;
            wp_reset_postdata(); ?>

      </div><!-- #grid -->
  </div><!-- .related-content -->

  <?php  } // end if $first_id
  endif;

