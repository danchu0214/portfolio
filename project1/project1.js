var ClassScrollEffect,
    defaults = {
        endPoint: 500,
        initialOpacity: 1,
        minOpacity: 0.5,
        opacityDivisor: 1000,
        initialScale: 1,
        minScale: 0.8, // 조정된 부분: 최소로 축소될 크기 설정
        scaleDivisor: 2000 // 조정된 부분: scale 변화를 더 미세하게 조정
    };

ClassScrollEffect = function (triggerHolder, options) {
    return {
        init: function () {
            this.settings = $.extend({}, defaults, options);
            this._effect(triggerHolder, this.settings);
        },
        _effect: function (holder, settings) {
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();

                if (scrollTop < settings.endPoint) {
                    // Calculate opacity based on scroll position
                    var opacity = settings.initialOpacity - scrollTop / settings.opacityDivisor;
                    if (opacity < settings.minOpacity) {
                        opacity = settings.minOpacity;
                    }
                    holder.css('opacity', opacity);

                    // Calculate scale based on scroll position
                    var scale = settings.initialScale - scrollTop / settings.scaleDivisor;
                    if (scale < settings.minScale) {
                        scale = settings.minScale;
                    }
                    holder.css({
                        '-webkit-transform': 'scale(' + scale + ')',
                        '-ms-transform': 'scale(' + scale + ')',
                        transform: 'scale(' + scale + ')'
                    });
                }
            });
        }
    };
};

$(document).ready(function () {
    var scrollEffect = new ClassScrollEffect($('.main'), {
        initialOpacity: 1,
        minOpacity: 0.3, // 예시로 설정된 값
        initialScale: 1,
        minScale: 0.8 // 예시로 설정된 값
    });
    scrollEffect.init();
});
