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
<div id="sme-popup-settings" class="settings">
    <div id="sme-popup-show-settings" class="settings-section">
        <div class="setting-row">
            <input type="radio" name="<?php echo SME_POPUP_SHOW_SETTING; ?>" value="0" <?php checked(get_option(SME_POPUP_SHOW_SETTING), 0); ?>>Disabled
        </div>
        <div class="setting-row">
            <input type="radio" name="<?php echo SME_POPUP_SHOW_SETTING; ?>" value="1" <?php checked(get_option(SME_POPUP_SHOW_SETTING), 1); ?>>At the end of the posts
        </div>
        <div class="popup-timed-setting setting-row">
            <input type="radio" name="<?php echo SME_POPUP_SHOW_SETTING; ?>" value="2" <?php checked(get_option(SME_POPUP_SHOW_SETTING), 2); ?>>After X seconds arriving to the page
        </div>
    </div>
    <div id="sme-popup-timed-settings" class="settings-section">
        <div class="popup-timed-setting setting-row">
            <label for="<?php echo SME_POPUP_TIMED_SEC; ?>">X seconds</label>
            <input type="text" id="<?php echo SME_POPUP_TIMED_SEC; ?>" name="<?php echo SME_POPUP_TIMED_SEC; ?>" value="<?php echo get_option(SME_POPUP_TIMED_SEC); ?>" />
        </div>
    </div>
</div>


<?php
    }

    public function registerSettings()
    {
        add_option(SME_POPUP_SHOW_SETTING, '0');
        register_setting(SME_OPTIONS_GROUP, SME_POPUP_SHOW_SETTING);
        
        add_option(SME_POPUP_TIMED_SEC, '0');
        register_setting(SME_OPTIONS_GROUP, SME_POPUP_TIMED_SEC, array(
            'sanitize_callback' => array($this, 'handleTimedPopupSecondsChange')
        ));
    }

    public function handleTimedPopupSecondsChange($seconds) {
        if (empty($seconds) || intval($seconds) < 1) {
            return 1;
        }
        return $seconds;
    }
}
