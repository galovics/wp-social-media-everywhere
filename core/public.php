<?php

final class SocialMediaEverywherePublic {
	public function setup() {
		add_action('wp_footer', array($this, 'add_popup'));
		add_action('wp_enqueue_scripts', array($this, 'add_style'));
		add_action('wp_enqueue_scripts', array($this, 'add_script'));
	}

	public function add_style() {
		wp_register_style('socialmediaeverywhere', SME_URL . 'public/css/socialmediaeverywhere.css');
		wp_enqueue_style('socialmediaeverywhere');
	}

	public function add_script() {
		wp_register_script('socialmediaeverywhere', SME_URL . 'public/js/socialmediaeverywhere.js', array('jquery'), '1.0', true);
		wp_enqueue_script('socialmediaeverywhere');
	}

	public function add_popup() {
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
}

?>