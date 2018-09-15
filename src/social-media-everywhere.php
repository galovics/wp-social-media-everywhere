<?php
/*
  Plugin Name: Social Media Everywhere
  Plugin URI: https://github.com/galovics/wp-social-media-everywhere
  description: TODO
  Version: 1.0
  Author: Arnold Galovics
  Author URI: https://arnoldgalovics.com
  License: GPL2
*/

define('SME_PATH', plugin_dir_path(__FILE__));
define('SME_URL', plugin_dir_url(__FILE__));
define('SME_OPTIONS_GROUP', 'socialmediaeverywhere_options_group');

define('SME_ENABLED', 'socialmediaeverywhere_enabled');
define('SME_POPUP_SHOW_SETTING', 'socialmediaeverywhere_popup_show_setting');
define('SME_POPUP_TIMED_SEC', 'socialmediaeverywhere_popup_timed_sec');
define('SME_POPUP_TITLE', 'socialmediaeverywhere_popup_title');
define('SME_POPUP_EXPIRATION', 'socialmediaeverywhere_popup_expiration');

define('SME_TWITTER_ACCOUNT', 'socialmediaeverywhere_twitter_account');
define('SME_LINKEDIN_ACCOUNT', 'socialmediaeverywhere_linkedin_account');
define('SME_FACEBOOK_ACCOUNT', 'socialmediaeverywhere_facebook_account');
define('SME_GOOGLE_PLUS_ACCOUNT', 'socialmediaeverywhere_google_plus_account');
define('SME_INSTAGRAM_ACCOUNT', 'socialmediaeverywhere_instagram_account');
define('SME_YOUTUBE_ACCOUNT', 'socialmediaeverywhere_youtube_account');

include_once(SME_PATH . 'admin/admin.php');
include_once(SME_PATH . 'public/public.php');

$smeAdmin = new SocialMediaEverywhereAdmin();
$smeAdmin->setup();

$smePublic = new SocialMediaEverywherePublic();
$smePublic->setup();
