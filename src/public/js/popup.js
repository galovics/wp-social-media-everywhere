jQuery(document).ready(function ($) {
    console.log(SME);
    if (!isBlogPost()) {
        return;
    }

    const dataKey = 'social-media-everywhere-popup-shown';

    if (isStorageAvailable()) {
        const popupValue = localStorage.getItem(dataKey);
        if (popupValue == null) {
            setPopupAlreadyShown(false);
        }
    } else {
        setPopupAlreadyShown(false);
    }

    function isBlogPost() {
        return SME.global.isPost;
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
        //return typeof (Storage) !== "undefined";
        return false;
    }

    function showPopupIfNecessary() {
        if (!isPopupAlreadyShown()) {
            if (isBottomPopupEnabled()) {
                let hT = $('#sme-post-bottom').offset().top,
                    hH = $('#sme-post-bottom').outerHeight(),
                    wH = $(window).height(),
                    wS = $(window).scrollTop();
                if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
                    setPopupAlreadyShown(true);
                    $('#social-media-everywhere-modal').show();
                    lockScrolling();
                }
            }
        }
    }

    function isBottomPopupEnabled() {
        return SME.popup.bottomPopupEnabled;
    }


    $(window).on('click', function (e) {
        let element = $('#social-media-everywhere-modal')
        if (e.target == element[0]) {
            element.hide();
            unlockScrolling();
        }
    });

    showPopupIfNecessary();
    $(window).scroll(() => showPopupIfNecessary());

    function parseBoolean(s) {
        return s === 'true';
    };
});