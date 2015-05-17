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
  $aVars[] = "enfamille";
  return $aVars;
}
add_filter('query_vars', 'add_query_vars');

function add_rewrite_rules($rules) {
  $newrules = array();
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]&$matches[8]=$matches[9]&$matches[10]=$matches[11]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]&$matches[8]=$matches[9]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]&$matches[6]=$matches[7]';
  $newrules['(saison)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]&$matches[4]=$matches[5]';
  $newrules['(saison)/([^/]+)/([^/]+)/?$'] = 'index.php?pagename=$matches[1]&$matches[2]=$matches[3]';

  return $newrules + $rules;
}
add_filter('rewrite_rules_array', 'add_rewrite_rules');



