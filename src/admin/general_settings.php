<?php

include_once SME_PATH . 'admin/settings.php';
include_once SME_PATH . 'admin/account/linkedin_account.php';
include_once SME_PATH . 'admin/account/twitter_account.php';

final class SocialMediaEverywhereGeneralSettings implements Settings
{
    private $accounts = array();

    public function __construct()
    {
        array_push($this->accounts, new SocialMediaEverywhereLinkedInAccount());
        array_push($this->accounts, new SocialMediaEverywhereTwitterAccount());
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
        <?php foreach ($this->accounts as $account): ?>
        <?php echo $account->render(); ?>
        <?php endforeach; ?>
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
