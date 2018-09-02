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

define( 'SME_PATH', plugin_dir_path( __FILE__ ) );
define( 'SME_OPTIONS_GROUP', 'socialmediaeverywhere_options_group');

define( 'SME_TWITTER_ACCOUNT', 'socialmediaeverywhere_twitter_account');

include_once( SME_PATH . 'admin/admin.php' );

$smeAdmin = new SocialMediaEverywhereAdmin();
$smeAdmin->setup();

function add_style() {
	wp_register_style('socialmediaeverywhere', plugin_dir_url(__FILE__) . 'public/css/socialmediaeverywhere.css');
	wp_enqueue_style('socialmediaeverywhere');
}

function add_script() {
	wp_register_script('socialmediaeverywhere', plugin_dir_url(__FILE__) . 'public/js/socialmediaeverywhere.js', array('jquery'), '1.0', true);
	wp_enqueue_script('socialmediaeverywhere');
}

function add_popup() {
	?>
		<div id="social-media-everywhere-modal">
			<div id="social-media-everywhere-popup">
				<?php if (!empty(get_option(SME_TWITTER_ACCOUNT))): ?>
					<a href="<?php echo get_option(SME_TWITTER_ACCOUNT); ?>">Follow me</a>
				<?php endif; ?>
			</div>
		</div>
	<?php
}

add_action('wp_footer', 'add_popup');
add_action('wp_enqueue_scripts', 'add_style');
add_action('wp_enqueue_scripts', 'add_script');

?>