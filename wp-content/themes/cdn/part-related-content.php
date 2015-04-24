<?php


    $prefix_event = 'event_meta_';
    $prefix_default = 'defaults_meta_';

    // Linked Posts
    if ($linkedposts = rwmb_meta(  $prefix_default . 'linkedposts', get_the_ID() ) ):

    foreach($linkedposts as $linkedpost):

      $linked_post_id = $linkedpost['defaults_meta_linkedpost-id'];
      $linked_post_importance = $linkedpost['defaults_meta_importance'];
      $linked_post_style = $linkedpost['defaults_meta_select'];

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

      ?>

      
      <article class="related-post bloc-outer <?php echo $linked_post_importance ?>">
        <a href="<?php echo $post_url; ?>">
          <?php echo get_the_post_thumbnail( $linked_post_id, '', '' ); ?>
          
          <div class="meta">
            <?php if( is_array($post_meta) ){
              foreach ($post_meta as $meta) {
                echo $meta->name;
              }
            } else {
              echo $post_meta; 
            } ?>
          </div>
          
          <h3><?php echo $post_title ?></h3>

          <p><?php echo $post_excerpt ?></p>

        </a>
      </article><!-- end article--><?php
    endforeach;
  endif;

