jQuery(document).ready(function ($) {
    $('#sme-settings header > h3').on('click', handleSettingsChange);

    function handleSettingsChange(e) {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        const index = $(this).index();
        const mainElement = $(this).parent().next().children().eq(index);
        mainElement.siblings().removeClass('active');
        mainElement.addClass('active');
    }
});