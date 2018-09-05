<?php
/*
  Plugin Name: Social Media Everywhere
  Plugin URI: http://TODO
  description: TODO
  Version: 1.2
  Author: Arnold Galovics
  Author URI: https://arnoldgalovics.com
  License: GPL2
*/

define('SME_PATH', plugin_dir_path( __FILE__ ) );
define('SME_URL', plugin_dir_url(__FILE__));
define('SME_OPTIONS_GROUP', 'socialmediaeverywhere_options_group');

define('SME_TWITTER_ACCOUNT', 'socialmediaeverywhere_twitter_account');

include_once(SME_PATH . 'admin/admin.php');
include_once(SME_PATH . 'core/public.php');

$smeAdmin = new SocialMediaEverywhereAdmin();
$smeAdmin->setup();

$smePublic = new SocialMediaEverywherePublic();
$smePublic->setup();

?>