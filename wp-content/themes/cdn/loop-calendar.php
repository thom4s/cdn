<?php
$previous_month = false;
if ( have_posts() ) :
  while ( have_posts() ) :

    the_post();

    if ( preg_match("#\d+\-\d+?#", get_query_var('quand') ) ):
      $date = get_query_var('quand');
    else:
      $date = get_query_var('quand').'-01-01';
    endif;

    $month = date('Y/m', max(strtotime($date), strtotime(get_post_meta(get_the_ID(), 'start_date', true))));

    if ( $previous_month != $month ):
      ?>
      <div class="box big" data-date="<?php print strtotime($month.'/01') ?>">
        <h2 class="box-title">
          <?php print strftime('%B %Y', strtotime($month.'/01')) ?>
        </h2>
      </div><!-- .box -->
      <?php
      $previous_month = $month;
    endif;

    ?>
    <div class="box" data-date="<?php print strtotime(get_post_meta(get_the_ID(), 'start_date',true))  ?>">
      <article class="post clearfix <?php //echo ($dm == 'displaymode2')?' small':'';?>">
        <?php
        if (has_post_thumbnail()):
          ?>

          <?php
        endif;
        ?>
        <div class="excerpt">
          <div class="ellipsis">
            <div>
              <h2 class="box-title">
                <a href="<?php the_permalink();?>">
                  <strong>
                  <?php the_title();?>
                  </strong>

                </a>
              </h2>
            </div>
          </div>
        </div><!-- .excerpt -->
      </article><!-- .post -->
    </div><!-- .box --><?php

  endwhile;


  $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

  if ( $wp_query->max_num_pages > 1 && $paged < $wp_query->max_num_pages ) :
    $paginglink = "ppage/".($paged+1)."/";

    ?>
    <div class="load-more clearfix navigation" data-date="<?php print strtotime('2100/01/01') ?>">
      <a class="more-events" href="<?php echo mahi_add_query_path(null, 'ppage', $paged + 1) ?>">Plus de dates</a>
    </div><!-- #nav-below -->
    <?php
  endif;
else :
?>
  <div class="programmation-no-results">
    <h2 class="aligncenter">Aucun résultat <br /> ne correspond à votre recherche</h2>
    <hr />
    <div class="bt-back clearfix">
      <a href="/programmation/">Retour à la programmation complète</a>
    </div><!-- .bt-back -->
  </div><!-- .programmation-no-results -->
<?php
  endif;
?>
