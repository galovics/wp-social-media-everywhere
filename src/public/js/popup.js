class SocialMediaEverywherePopupUtil {
    static isString(s) {
        return Object.prototype.toString.call(s) === '[object String]';
    }

    static parseBoolean(s) {
        if (SocialMediaEverywherePopupUtil.isString(s)) {
            return s === 'true';
        }
        return s;
    }

    static lockScrolling() {
        let html = jQuery('html');
        html.data('previous-overflow', html.css('overflow'));
        html.css('overflow', 'hidden');
    }

    static unlockScrolling() {
        let html = jQuery('html');
        html.css('overflow', html.data('previous-overflow'));
    }
}

class SocialMediaEverywherePopupCongfiguration {
    isBlogPost() {
        return SME.global.isPost;
    }

    isPopupEnabled() {
        return SME.popup.enabled;
    }

    isBottomPopupEnabled() {
        return SME.popup.bottomPopupEnabled;
    }
}

class SocialMediaEverywherePopupStorage {
    constructor() {
        //this.isStorageAvailable = typeof (Storage) !== "undefined";
        this.isStorageAvailable = false;
    }

    get(key) {
        if (this.isStorageAvailable) {
            return localStorage.getItem(key);
        } else {
            return jQuery('html').data(key);
        }
    }

    exists(key) {
        return this.get(key) !== null;
    }

    getBoolean(key) {
        return SocialMediaEverywherePopupUtil.parseBoolean(this.get(key));
    }

    set(key, value) {
        if (this.isStorageAvailable) {
            localStorage.setItem(key, value);
        } else {
            jQuery('html').data(key, value);
        }
    }
}

class SocialMediaEverywherePopupSettings {
    static POPUP_ALREADY_SHOWN = 'social-media-everywhere-popup-shown';

    constructor(storage) {
        this.storage = storage;
    }

    setPopupAlreadyShown(booleanValue) {
        storage.set(SocialMediaEverywherePopupSettings.POPUP_ALREADY_SHOWN, booleanValue);
    }

    isPopupAlreadyShown() {
        return storage.getBoolean(SocialMediaEverywherePopupSettings.POPUP_ALREADY_SHOWN);
    }
}

class SocialMediaEverywhereBottomPopup {
    constructor(settings) {
        this.settings = settings;
    }

    initialize() {
        this.showPopupIfNecessary();
        jQuery(window).scroll(() => this.showPopupIfNecessary());
    }

    showPopupIfNecessary() {
        if (!settings.isPopupAlreadyShown()) {
            if (config.isBottomPopupEnabled()) {
                let hT = jQuery('#sme-post-bottom').offset().top,
                    hH = jQuery('#sme-post-bottom').outerHeight(),
                    wH = jQuery(window).height(),
                    wS = jQuery(window).scrollTop();
                if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
                    settings.setPopupAlreadyShown(true);
                    jQuery('#social-media-everywhere-modal').show();
                    SocialMediaEverywherePopupUtil.lockScrolling();
                }
            }
        }
    }
}

jQuery(document).ready(function ($) {
    const config = new SocialMediaEverywherePopupCongfiguration();
    const storage = new SocialMediaEverywherePopupStorage();
    const settings = new SocialMediaEverywherePopupSettings(storage);
    const bottomPopup = new SocialMediaEverywhereBottomPopup(settings);

    if (!config.isBlogPost() || !config.isPopupEnabled()) {
        return;
    }

    if (!storage.exists(dataKey)) {    
        settings.setPopupAlreadyShown(false);
    }

    $(window).on('click', function (e) {
        let element = $('#social-media-everywhere-modal')
        if (e.target == element[0]) {
            element.hide();
            SocialMediaEverywherePopupUtil.unlockScrolling();
        }
    });

    if (config.isBottomPopupEnabled()) {
        bottomPopup.initialize();
    }
});