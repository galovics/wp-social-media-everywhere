<?php

include_once SME_PATH . 'public/popup/popup_core.php';

final class SocialMediaEverywherePublic
{
    public function setup()
    {
        if ($this->isSMEEnabled()) {
            if ($this->isPopupEnabled()) {
                $popup = new SocialMediaEverywherePublicPopup();
                add_action('wp_footer', array($popup, 'setup'));
            }
            add_action('wp_enqueue_scripts', array($this, 'addStyle'));
            add_action('wp_enqueue_scripts', array($this, 'addScript'));
        }
    }

    public function addStyle()
    {
        wp_register_style('socialmediaeverywhere', SME_URL . 'public/css/socialmediaeverywhere.css');
        wp_register_style('socialmediaeverywhere-fontawesome', 'https://use.fontawesome.com/releases/v5.3.1/css/all.css');
        wp_enqueue_style('socialmediaeverywhere');
        wp_enqueue_style('socialmediaeverywhere-fontawesome');
    }

    public function addScript()
    {
        wp_register_script('socialmediaeverywhere', SME_URL . 'public/js/socialmediaeverywhere.js', array('jquery'), '1.0', true);
        wp_enqueue_script('socialmediaeverywhere');
    }

    public function isSMEEnabled()
    {
        return intval(get_option(SME_ENABLED)) === 1;
    }

    public function isPopupEnabled()
    {
        return intval(get_option(SME_POPUP_SHOW_SETTING)) !== 0;
    }
}
