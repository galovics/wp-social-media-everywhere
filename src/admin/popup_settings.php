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
            <input type="radio" name="<?php echo SME_POPUP_SHOW_SETTING; ?>" value="0" <?php checked(get_option(SME_POPUP_SHOW_SETTING), 0); ?>>Disabled<br>
        </div>
        <div class="setting-row">
            <input type="radio" name="<?php echo SME_POPUP_SHOW_SETTING; ?>" value="1" <?php checked(get_option(SME_POPUP_SHOW_SETTING), 1); ?>>At the end of the posts
        </div>
    </div>
</div>


<?php
    }

    public function registerSettings()
    {
        add_option(SME_POPUP_SHOW_SETTING, '0');
        register_setting(SME_OPTIONS_GROUP, SME_POPUP_SHOW_SETTING);
    }
}
