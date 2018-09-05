jQuery(document).ready(function($) {
	const dataKey = 'social-media-everywhere-popup-shown';

	if (isStorageAvailable()) {
		const popupValue = localStorage.getItem(dataKey);
		if (popupValue == null) {
			setPopupAlreadyShown(false);
		}
	} else {
		setPopupAlreadyShown(false);
	}
	

	function lockScrolling() {
		let html = $('html');
		html.data('previous-overflow', html.css('overflow'));
		html.css('overflow', 'hidden');
	}

	function unlockScrolling() {
		let html = $('html');
		html.css('overflow', html.data('previous-overflow'));
	}

	function setPopupAlreadyShown(booleanValue) {
		if (isStorageAvailable()) {
			localStorage.setItem(dataKey, booleanValue);
		} else {
			$('html').data(dataKey, booleanValue);	
		}
	}

	function isPopupAlreadyShown() {
		if (isStorageAvailable()) {
			return parseBoolean(localStorage.getItem(dataKey));
		} else {
			return $('html').data(dataKey);
		}
	}

	function isStorageAvailable() {
		//return false;
		return typeof(Storage) !== "undefined";
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


	$(window).on('click', function(e) {
		let element = $('#social-media-everywhere-modal')
		if (e.target == element[0]) {
			element.hide();
			unlockScrolling();
		}
	});
	
	showPopupIfNecessary();
	$(window).scroll(function() {
		showPopupIfNecessary();
	});

	function parseBoolean(s) {
		return s === 'true';
	}
});