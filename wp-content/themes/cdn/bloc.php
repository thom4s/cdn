
  <?php 
    if( !isset($bloc_col) ) {
      $bloc_col = '';
    }
    ?>

  <article class="grid-item related-post bloc-outer <?php echo $linked_post_bg; ?> <?php echo $bloc_col; ?>">

      <?php if( has_post_thumbnail( $linked_post_id ) ) : ?>
        <div class="bloc-img">
          <?php if($linked_post_has_link) { ?>
            <a href="<?php echo $post_url; ?>"><?php echo get_the_post_thumbnail( $linked_post_id, 'bloc-thumb', '' ); ?></a>
          <?php } else { 
            echo get_the_post_thumbnail( $linked_post_id, 'bloc-thumb', '' ); 
          }?>
        </div>
      <?php endif; ?>
      
      <div class="bloc-content">
        <div class="meta entry-datas">
          <?php if( isset($event_type) ) {
            $i = 0;
            foreach ($event_type as $type) {
                if($i > 0) {
                  echo ' - ';
                }
                echo $type->name;
                $i++;
              }
              echo '<br>';
          } ?>

          <?php if( is_array($post_meta) ){
            foreach ($post_meta as $meta) {
              echo $meta->name;
            }
          } else {
            echo $post_meta; 
          } ?>
        </div><!-- .entry-datas -->
        
        <?php if($linked_post_has_link) { ?>
          <a href="<?php echo $post_url; ?>"><h3><?php echo $post_title; ?></h3></a>
        <?php } else { 
          echo '<h3>' . $post_title . '</h3>';
        }?>

        <?php if( isset($authors) && is_array($authors) ) {  ?>
          <div class="meta entry-authors">
            <?php 
              if( $authors[0]['name'] != '' ) {
                foreach ( $authors as $author ) { 
                  echo '<span class="meta-author">' . $author['name'] . '</span><br>'; 
                }
              }
            ?>
          </div><!-- .entry-authors -->
        <?php } ?>

        <div class="entry-intro">
          <?php echo $post_excerpt ?>

          <?php if($linked_post_has_link) { ?>
            <a class="more-link" href="<?php echo $post_url; ?>">Lire la suite</a>
          <?php } ?>

        </div>



      </div><!-- .bloc-content -->
  </article><!-- end article-->