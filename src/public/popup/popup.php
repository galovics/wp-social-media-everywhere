<?php
abstract class SocialMediaEverywherePopup
{
    public function render()
    {
        ?>
<?php if (!empty(get_option($this->getPopupOptionName()))): ?>
<div class="icon social <?php echo $this->getClassName(); ?>">
    <i class="fab fa-<?php echo $this->getClassName(); ?>"></i>
</div>
<?php endif; ?>
<?php
    }

    abstract protected function getPopupOptionName();

    abstract protected function getClassName();
}
