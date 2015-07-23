 

  <ul class="filter-group">
    <h3>Choisir un mois</h3>

      <select name="filter-month" class="" id="filter-month">
        <?php
        if ( ! $curYear )
          $curYear = date('Y');
        for($i = 1;$i <= 12; $i++):
          $date = $curYear.'-'.str_pad($i, 2, '0', STR_PAD_LEFT);
          ?>
          <option value="<?php print cdn_add_query_path(null, 'm', $date) ?>" <?php print $date == get_query_var('quand') ? 'selected' : '' ?>><?php print strftime('%B', strtotime($date)) ?></option>
        <?php
        endfor;
        ?>
      </select>

  </ul>


