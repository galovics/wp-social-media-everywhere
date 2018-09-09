<?php

final class SocialMediaEverywhereGeneralSettings {
    public function __construct() {
        add_action('admin_init', array($this, 'registerSettings'));
    }

    public function getHeaderLabel() {
    	return "General settings";
    }

    public function render() {
	?>
		<div>
			<label for="<?php echo SME_ENABLED; ?>">Enabled</label>
			<input type="checkbox" id="<?php echo SME_ENABLED; ?>" name="<?php echo SME_ENABLED; ?>" value="1" <?php checked(get_option(SME_ENABLED), 1); ?>/>
		</div>
	<?php
    }

	public function registerSettings() {
	   	add_option(SME_ENABLED, 1);
	   	register_setting(SME_OPTIONS_GROUP, SME_ENABLED, array(
	   		'sanitize_callback' => 'handleEnabledChange'
	   	));
	}
}

?>