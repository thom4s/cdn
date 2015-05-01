
  <article class="grid-item related-post bloc-outer <?php echo $linked_post_bg; ?> <?php // echo $linked_post_col; ?>">
    <?php if($linked_post_has_link) { ?><a href="<?php echo $post_url; ?>"><?php } ?>
      
      <div class="bloc-img">
        <?php echo get_the_post_thumbnail( $linked_post_id, 'bloc-thumb', '' ); ?>
      </div>
      
      <div class="bloc-content">
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
      </div>

    <?php if($linked_post_has_link) { ?></a><?php } ?>
  </article><!-- end article-->