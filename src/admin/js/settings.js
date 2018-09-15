jQuery(document).ready(function ($) {
    handlePopupSettingChange();    

    $('#sme-settings header > h3').on('click', handleSettingsChange);
    $('#sme-popup-settings #sme-popup-show-settings input').on('change', handlePopupSettingChange);

    function handlePopupSettingChange() {
        const timedPopupSetting = $('#sme-popup-timing-settings .popup-timed-setting');
        if (isTimedPopupEnabled()) {
            timedPopupSetting.show();
        } else {
            timedPopupSetting.hide();
        }
    }

    function isTimedPopupEnabled() {
        const popupSettingValue = parseInt($('#sme-popup-settings #sme-popup-show-settings input:checked').val());
        return popupSettingValue === 2;
    }

    function handleSettingsChange(e) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        const index = $(this).index();
        const mainElement = $(this).parent().next().children().eq(index);
        mainElement.siblings().removeClass('active');
        mainElement.addClass('active');
    }
});