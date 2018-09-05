<?php

include_once(SME_PATH . 'admin/popup_settings.php');

final class SocialMediaEverywhereAdmin {
	private $pages = [];

	public function setup() {
		array_push($this->pages, new SocialMediaEverywherePopupSettings());
		add_action('admin_menu', array($this, 'registerOptionsPage'));
    }

	public function registerOptionsPage() {
	  add_options_page('Social Media Everywhere settings', 'Social Media Everywhere', 'manage_options', 'socialmediaeverywhere', array($this, 'renderOptionsPage'));
	}

    public function renderOptionsPage() {
	?>
	  <div>
	  <?php screen_icon(); ?>
		  <h2>Social Media Everywhere settings</h2>
		  <?php
		  	foreach ($this->pages as $page) {
		  		?>
	  				<h3><?php echo $page->getHeaderLabel(); ?></h3>
		  		<?php
		  		$page->render();
		  	}
		  ?>
	  </div>
	<?php
	}
}

?>