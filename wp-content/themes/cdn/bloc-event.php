
  <article class="grid-item related-post bloc-outer l-4col">
    <a href="<?php the_permalink(); ?><?php if( is_page_template( 'page-production.php' ) ) { echo '?pro=yes'; } ?>">
      
      <div class="bloc-img">
        <?php the_post_thumbnail( 'bloc-thumb', '' ); ?>
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
        
        <h3><?php the_title(); ?></h3>
        <div><?php echo $post_excerpt; ?></div>
      </div>

    </a>
  </article><!-- end article-->