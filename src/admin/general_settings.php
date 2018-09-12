<?php

include_once SME_PATH . 'admin/settings.php';

final class SocialMediaEverywhereGeneralSettings implements Settings
{
    public function __construct()
    {
        add_action('admin_init', array($this, 'registerSettings'));
    }

    public function getHeaderLabel()
    {
        return "General settings";
    }

    public function handleEnabledChange($value) {
        if (is_null($value)) {
            return 0;
        }
        return $value;
    }

    public function render()
    {
    ?>
<div id="sme-general-settings" class="settings">
    <div id="sme-enabled-settings" class="settings-section">
        <div class="setting-row">
            <label for="<?php echo SME_ENABLED; ?>">Enabled</label>
            <input type="checkbox" id="<?php echo SME_ENABLED; ?>" name="<?php echo SME_ENABLED; ?>" value="1" <?php checked(get_option(SME_ENABLED), 1); ?>/>
        </div>
    </div>
    <div id="sme-account-settings" class="settings-section">
        <div class="account-twitter setting-row">
            <label for="<?php echo SME_TWITTER_ACCOUNT; ?>">Twitter account</label>
            <input type="text" id="<?php echo SME_TWITTER_ACCOUNT; ?>" name="<?php echo SME_TWITTER_ACCOUNT; ?>" value="<?php echo get_option(SME_TWITTER_ACCOUNT); ?>" />
        </div>
        <div class="account-linkedin setting-row">
            <label for="<?php echo SME_LINKEDIN_ACCOUNT; ?>">LinkedIn account</label>
            <input type="text" id="<?php echo SME_LINKEDIN_ACCOUNT; ?>" name="<?php echo SME_LINKEDIN_ACCOUNT; ?>" value="<?php echo get_option(SME_LINKEDIN_ACCOUNT); ?>" />
        </div>
    </div>
</div>

<?php
    }

    public function registerSettings()
    {
        add_option(SME_ENABLED, 1);
        register_setting(SME_OPTIONS_GROUP, SME_ENABLED, array(
            'sanitize_callback' => array($this, 'handleEnabledChange')
        ));
        
        add_option(SME_TWITTER_ACCOUNT, 'https://');
        register_setting(SME_OPTIONS_GROUP, SME_TWITTER_ACCOUNT, array(
            'sanitize_callback' => array($this, 'handleTwitterAccountChange')
        ));
        add_option(SME_LINKEDIN_ACCOUNT, 'https://');
        register_setting(SME_OPTIONS_GROUP, SME_LINKEDIN_ACCOUNT, array(
            'sanitize_callback' => array($this, 'handleLinkedInAccountChange')
        ));
    }

    private function sanitizeURL($value) {
        if (empty($value)) {
            return $value;
        }
        if (substr($value, 0, 4) !== 'http') {
            return 'https://' . $value;
        }
        return $value;
    }

    public function handleTwitterAccountChange($value) {
        return $this->sanitizeURL($value);
    }

    public function handleLinkedInAccountChange($value) {
        return $this->sanitizeURL($value);
    }
}
