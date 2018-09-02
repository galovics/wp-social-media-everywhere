<?php

final class SocialMediaEverywherePopupSettings {

    public function __construct() {
        add_action('admin_init', array($this, 'socialmediaeverywhere_register_settings'));
    }

    public function getHeaderLabel() {
    	return "Popup settings";
    }

    public function render() {
	?>
		<form method="post" action="options.php">
			<?php settings_fields(SME_OPTIONS_GROUP); ?>
			<div>
				<label for="<?php echo SME_TWITTER_ACCOUNT; ?>">Twitter account</label>
				<input type="text" id="<?php echo SME_TWITTER_ACCOUNT; ?>" name="<?php echo SME_TWITTER_ACCOUNT; ?>" value="<?php echo get_option(SME_TWITTER_ACCOUNT); ?>" />
			</div>
			<?php submit_button(); ?>
		</form>
	<?php
    }

	public function socialmediaeverywhere_register_settings() {
	   add_option( SME_TWITTER_ACCOUNT, '');
	   register_setting(SME_OPTIONS_GROUP, SME_TWITTER_ACCOUNT);
	}
}

?>