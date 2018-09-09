<?php
abstract class SocialMediaEverywherePopup
{
    public function render()
    {
        ?>
<?php if (!empty(get_option($this->getPopupOptionName()))): ?>
<img src="<?php echo SME_URL . 'public/images/' . $this->getIconName(); ?>" />
<?php endif; ?>
<?php
    }

    abstract protected function getPopupOptionName();

    abstract protected function getIconName();
}
