<?php

include_once SME_PATH . 'public/popup/twitter_popup.php';
include_once SME_PATH . 'public/popup/linkedin_popup.php';

final class SocialMediaEverywherePublicPopup
{
    private $popups = [];

    public function __construct()
    {
        array_push($this->popups, new SocialMediaEverywhereTwitterPopup());
        array_push($this->popups, new SocialMediaEverywhereLinkedInPopup());
    }

    public function setup()
    {
        ?>

<div id="social-media-everywhere-modal">
    <div id="social-media-everywhere-popup">
        <div id="social-media-everywhere-popup-content">
            <h2>Follow me</h2>
            <div class="icons">
                <?php foreach ($this->popups as $popup): ?>
                <?php echo $popup->render(); ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

<?php
    }
}
