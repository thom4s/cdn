<?php 

/* 
 * Custom Query Vars
 *
 * @package cdn
 */


// some help here : http://www.rlmseo.com/blog/passing-get-query-string-parameters-in-wordpress-url/
function add_query_vars($aVars) {
  $aVars[] = "pro";
  $aVars[] = "t";
  $aVars[] = "c";
  $aVars[] = "a";
  $aVars[] = "s";
  $aVars[] = "saison";
  $aVars[] = "enfamille";
  return $aVars;
}
add_filter('query_vars', 'add_query_vars');

function add_rewrite_rules($rules) {
  $newrules = array();

  $newrules['(saison)/page/([0-9]+)?$'] = 'index.php?pagename=$matches[1]&paged=$matches[2]'; // For Pagination


  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/page/([0-9]+)?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]&$matches[8]=$matches[9]&$matches[10]=$matches[11]&paged=$matches[12]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/page/([0-9]+)?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]&$matches[8]=$matches[9]&paged=$matches[10]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/page/([0-9]+)?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]&paged=$matches[8]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/page/([0-9]+)?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&paged=$matches[6]';
  $newrules['(saison)/([^/]+)/([^/]+)/page/([0-9]+)?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&paged=$matches[4]';


  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]&$matches[8]=$matches[9]&$matches[10]=$matches[11]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]&$matches[8]=$matches[9]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]';
  $newrules['(saison)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]';

  $newrules['(archives)/page/([0-9]+)?$'] = 'index.php?pagename=$matches[1]&paged=$matches[2]'; // For Pagination
  $newrules['(archives)/([^/]+)/([^/]+)/page/([0-9]+)?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&paged=$matches[4]'; // For Pagination
  $newrules['(archives)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]';

  return $newrules + $rules;
}
add_filter('rewrite_rules_array', 'add_rewrite_rules');



