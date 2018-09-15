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

    static showPopup() {
        jQuery('#social-media-everywhere-modal').show();
        SocialMediaEverywherePopupUtil.lockScrolling();
    }

    
    static hidePopup() {
        jQuery('#social-media-everywhere-modal').hide();
        SocialMediaEverywherePopupUtil.unlockScrolling();
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

    isTimedPopupEnabled() {
        return SME.popup.timedPopupEnabled;
    }

    getTimedPopupMillisecs() {
        return SME.popup.timedPopupSeconds * 1000;
    }

    getPopupExpirationInMillisec() {
        return SME.popup.expirationTimeInSeconds * 1000;
    }
}

class SocialMediaEverywherePopupStorage {
    constructor() {
        this.isStorageAvailable = typeof (Storage) !== "undefined";
        //this.isStorageAvailable = false;
    }

    get(key) {
        if (this.isStorageAvailable) {
            return localStorage.getItem(key);
        } else {
            return jQuery('html').data(key);
        }
    }

    exists(key) {
        const value = this.get(key);
        return  value !== undefined && value !== null;
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

class SocialMediaEverywherePopupStateValue {
    constructor(alreadyShown, createdAt) {
        this.alreadyShown = alreadyShown;
        this.createdAt = createdAt;
    }

    toJSONString() {
        return JSON.stringify({
            'alreadyShown': this.alreadyShown,
            'createdAt': this.createdAt
        });
    }

    static fromJSONString(json) {
        const obj = JSON.parse(json);
        return new SocialMediaEverywherePopupStateValue(obj.alreadyShown, obj.createdAt);
    }
}

class SocialMediaEverywherePopupState { 
    constructor(config, storage) {
        this.config = config;
        this.storage = storage;
        this.POPUP_ALREADY_SHOWN = 'social-media-everywhere-popup-shown';
    }

    calculateCreatedAt() {
        return new Date().getTime();
    }

    initializePopupAlreadyShown() {
        this.storage.set(this.POPUP_ALREADY_SHOWN, new SocialMediaEverywherePopupStateValue(false, this.calculateCreatedAt()).toJSONString());
    }

    setPopupAlreadyShown() {
        this.storage.set(this.POPUP_ALREADY_SHOWN, new SocialMediaEverywherePopupStateValue(true, this.calculateCreatedAt()).toJSONString());
    }

    isPopupAlreadyShown() {
        return SocialMediaEverywherePopupStateValue.fromJSONString(this.storage.get(this.POPUP_ALREADY_SHOWN)).alreadyShown;
    }

    expirePopupAlreadyShownIfNecessary() {
        const state = SocialMediaEverywherePopupStateValue.fromJSONString(this.storage.get(this.POPUP_ALREADY_SHOWN));
        const alreadyShown = state.alreadyShown;
        if (alreadyShown) {
            const createdAt = state.createdAt;
            const now = new Date().getTime();
            if (now > (createdAt + this.config.getPopupExpirationInMillisec())) {
                this.initializePopupAlreadyShown();
            }    
        }
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
        if (!this.settings.isPopupAlreadyShown()) {
            let hT = jQuery('#sme-post-bottom').offset().top,
                hH = jQuery('#sme-post-bottom').outerHeight(),
                wH = jQuery(window).height(),
                wS = jQuery(window).scrollTop();
            if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
                this.settings.setPopupAlreadyShown(true);
                SocialMediaEverywherePopupUtil.showPopup();
            }
        }
    }
}

class SocialMediaEverywhereTimedPopup {
    constructor(state, config) {
        this.state = state;
        this.config = config;
    }

    initialize() {
        const refThis = this;
        setTimeout(() => refThis.showPopupIfNecessary(), this.config.getTimedPopupMillisecs());
    }

    showPopupIfNecessary() {
        // This check is necessary if the user was already on the once
        if (!this.state.isPopupAlreadyShown()) {
            this.state.setPopupAlreadyShown(true);
            SocialMediaEverywherePopupUtil.showPopup();
        }
    }
}

jQuery(document).ready(function ($) {
    const config = new SocialMediaEverywherePopupCongfiguration();
    if (!config.isBlogPost() || !config.isPopupEnabled()) {
        return;
    }
    
    const storage = new SocialMediaEverywherePopupStorage();
    const state = new SocialMediaEverywherePopupState(config, storage);
    const bottomPopup = new SocialMediaEverywhereBottomPopup(state);
    const timedPopup = new SocialMediaEverywhereTimedPopup(state, config);

    if (!storage.exists(state.POPUP_ALREADY_SHOWN)) {
        state.initializePopupAlreadyShown();
    }
    state.expirePopupAlreadyShownIfNecessary();

    $(window).on('click', (e) => {
        let element = $('#social-media-everywhere-modal');
        if (e.target == element[0]) {
            SocialMediaEverywherePopupUtil.hidePopup();
        }
    });

    if (config.isBottomPopupEnabled()) {
        bottomPopup.initialize();
    } else if (config.isTimedPopupEnabled()) {
        timedPopup.initialize();
    }
});