<?php

/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clefs secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur 
 * {@link http://codex.wordpress.org/fr:Modifier_wp-config.php Modifier
 * wp-config.php}. C'est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d'installation. Vous n'avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'cdn');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', 'root');

/** Adresse de l'hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8');

/** Type de collation de la base de données. 
  * N'y touchez que si vous savez ce que vous faites. 
  */
define('DB_COLLATE', '');

/**#@+
 * Clefs uniques d'authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant 
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n'importe quel moment, afin d'invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         's,i.eLTH+8P|eWK?L12i;n&|7r|Da $X~Oit?b)|53SRagyYXl!tqJ7P?Vhb^-Q2');
define('SECURE_AUTH_KEY',  'eJ}WR8]f-v5}A[_!d4LvJ$lF21:A7xh3J;|dxO]r;wFa3*?yo$D,T;.cFit`>bAZ');
define('LOGGED_IN_KEY',    'p6K+aHx#IQMYEL=@e{4LXXjciQQEz,I6^8H:RJ!&8L*|Lz?;>#d-cGh1`LU5/_eL');
define('NONCE_KEY',        '/u` xYS?U l-p$@V(tGSC|]T~>f5O3PBtLBMn9B#Kb2)i5lnPj-KaNS;t;1w#M4k');
define('AUTH_SALT',        'W$OoP@n^&PU!K+i:GgyhG|-7d),s=4`0,z8rA~wQ!n7z<Up[ I@sH%$/vj=}y/|Y');
define('SECURE_AUTH_SALT', '#k;.KtdjDD^te;-}6x.az2>|kA|}A94xyR:B8# $d0&]u+Cx Eli_5}e:k36[bl.');
define('LOGGED_IN_SALT',   'gj8Xu.9( -YBq]rCg|G}9aSd^f^P75Q21Vz#;5&G0i=u*}>3qp}j2M*N5*eyos3c');
define('NONCE_SALT',       'uTaQ>g+ pk)3,]v?FL/tT5<qKFy`q}?|_!ZFB!`0/rZJMO6i{FYWBH42LZTTz)me');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique. 
 * N'utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés!
 */
$table_prefix  = 'wp_';

/** 
 * Pour les développeurs : le mode deboguage de WordPress.
 * 
 * En passant la valeur suivante à "true", vous activez l'affichage des
 * notifications d'erreurs pendant votre essais.
 * Il est fortemment recommandé que les développeurs d'extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de 
 * développement.
 */ 
define('WP_DEBUG', true); 



define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', false);
define('DOMAIN_CURRENT_SITE', 'cdn.dev');
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);

define( 'SUNRISE', 'on' );

/* C'est tout, ne touchez pas à ce qui suit ! Bon blogging ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');