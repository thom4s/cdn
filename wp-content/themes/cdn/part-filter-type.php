 

  <ul class="filter-group">
    <h3> Trier par type de spectacle</h3>
    <?php
      $terms = preg_split("#,#", get_query_var('t'), -1, PREG_SPLIT_NO_EMPTY);
      $terms_category = get_terms('event_type');

      foreach($terms_category as $term):
        if ( in_array($term->slug, $terms) )
          $t = array_diff($terms, array($term->slug));
        else
          $t = array_merge($terms, array($term->slug));
        sort($t);
        $url = cdn_add_query_path(null, 't', implode(',', $t));
      ?>
        <li class="sidebar-filter-item <?php print in_array($term->slug, $terms) ? 'active' : '' ?>">
          <a href="<?php print $url ?>">
            <?php print $term->name ?>
          </a>
        </li>
      <?php endforeach; ?>
  </ul>


