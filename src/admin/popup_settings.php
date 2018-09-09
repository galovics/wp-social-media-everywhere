<?php

include_once SME_PATH . 'admin/settings.php';

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
<div class="popup-settings">
    <div class="popup-show-settings">
        <input type="radio" name="<?php echo SME_POPUP_SHOW_SETTING; ?>" value="0" <?php checked(get_option(SME_POPUP_SHOW_SETTING), 0); ?>>Disabled<br>
        <input type="radio" name="<?php echo SME_POPUP_SHOW_SETTING; ?>" value="1" <?php checked(get_option(SME_POPUP_SHOW_SETTING), 1); ?>>At the end of the posts
    </div>
    <div class="account-settings">
        <label for="<?php echo SME_TWITTER_ACCOUNT; ?>">Twitter account</label>
        <input type="text" id="<?php echo SME_TWITTER_ACCOUNT; ?>" name="<?php echo SME_TWITTER_ACCOUNT; ?>" value="<?php echo get_option(SME_TWITTER_ACCOUNT); ?>" />
    </div>
</div>


<?php
    }

    public function registerSettings()
    {
        add_option(SME_TWITTER_ACCOUNT, 'https://');
        register_setting(SME_OPTIONS_GROUP, SME_TWITTER_ACCOUNT, array(
            'sanitize_callback' => array($this, 'handleTwitterAccountChange')
        ));
        
        add_option(SME_POPUP_SHOW_SETTING, '0');
        register_setting(SME_OPTIONS_GROUP, SME_POPUP_SHOW_SETTING);
    }

    public function handleTwitterAccountChange($value) {
        if (empty($value)) {
            return 'https://';
        }
        if (substr($value, 0, 4) !== 'http') {
            return 'https://' . $value;
        }
        return $value;
    }
}
