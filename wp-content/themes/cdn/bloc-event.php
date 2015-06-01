<?php 
  if( $pro ) { 
    $url = esc_url( add_query_arg( 'pro', 'yes', get_permalink() ) );
  } else {
    $url = get_permalink();
  }

?>
  <article class="grid-item item-event bloc-outer">
    <a href="<?php echo $url; ?>">
      
      <div class="bloc-img">
        <?php the_post_thumbnail( 'bloc-thumb', '' ); ?>
      </div>
      
      <div class="bloc-content">
        <div class="meta entry-datas">
          <?php
            $i = 0;
            if( is_array($event_type) ){
              foreach ($event_type as $type) {
                if($i > 0) {
                  echo ' - ';
                }
                echo $type->name;
                $i++;
              }
            } else {
              echo $event_type;
            }
            echo '<br>';
            $j = 0;
            if( isset($diffusion) && $diffusion ){
              foreach ($event_creation as $crea) {
                if($j > 0) {
                  echo ' - ';
                }
                echo $crea->name;
                $j++;
              }
            }
            echo '<br>' . $dates; 
          ?>
        </div>
        
        <h3 class="item-event-title"><?php the_title(); ?></h3>

        <?php if( !empty($authors) ) : ?>
          <div class="meta entry-authors">
            <?php 
                foreach ( $authors as $author ) { 
                  echo '<span class="meta-author">' . $author['name'] . '</span><br>'; 
                }
            ?>
          </div>
        <?php endif; ?>
        <div><?php echo $post_excerpt; ?></div>
      </div>

    </a>
  </article><!-- end article-->