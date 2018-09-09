<?php

include_once('settings.php');

final class SocialMediaEverywherePopupSettings implements Settings
{
    public function __construct()
    {
        add_action('admin_init', array($this, 'registerSettings'));
    }

    public function getHeaderLabel()
    {
        return "Popup settings";
    }

    public function render()
    {
	?>

<div>
	<label for="<?php echo SME_TWITTER_ACCOUNT; ?>">Twitter account</label>
	<input type="text" id="<?php echo SME_TWITTER_ACCOUNT; ?>" name="<?php echo SME_TWITTER_ACCOUNT; ?>" value="<?php echo get_option(SME_TWITTER_ACCOUNT); ?>" />
</div>

<?php
    }

    public function registerSettings()
    {
        add_option(SME_TWITTER_ACCOUNT, '');
        register_setting(SME_OPTIONS_GROUP, SME_TWITTER_ACCOUNT);
    }
}
