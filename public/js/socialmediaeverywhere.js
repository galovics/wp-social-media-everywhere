jQuery(document).ready(function($) {
	setPopupAlreadyShown(false);

	function lockScrolling() {
		let scrollPosition = [
		  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
		];
		let html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
		html.data('$-position', scrollPosition);
		html.data('previous-overflow', html.css('overflow'));
		html.css('overflow', 'hidden');
		window.scrollTo(scrollPosition[0], scrollPosition[1]);
	}

	function unlockScrolling() {
		let html = $('html');
		let scrollPosition = html.data('scroll-position');
		html.css('overflow', html.data('previous-overflow'));
		window.scrollTo(scrollPosition[0], scrollPosition[1])
	}

	function setPopupAlreadyShown(booleanValue) {
		$('html').data('social-media-everywhere-popup-shown', booleanValue);
	}

	function isPopupAlreadyShown() {
		return $('html').data('social-media-everywhere-popup-shown');
	}

	function showPopupIfNecessary() {
		if (!isPopupAlreadyShown()) {
			let hT = $('footer.entry-footer').offset().top,
		       hH = $('footer.entry-footer').outerHeight(),
		       wH = $(window).height(),
		       wS = $(this).scrollTop();
		   	if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
		   		setPopupAlreadyShown(true);
				$('#social-media-everywhere-modal').show();
				lockScrolling();
		   	}
	    }
	}

	showPopupIfNecessary();

	$(window).on('click', function(e) {
		let element = $('#social-media-everywhere-modal')
		if (e.target == element[0]) {
			element.hide();
			unlockScrolling();
		}
	});
	

	$(window).scroll(function() {
		showPopupIfNecessary();
	});


});