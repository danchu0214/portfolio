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

document.addEventListener("DOMContentLoaded", function () {
    var shortcuts = {
        "list1": "../project1/project1.html",
        "list2": "#",
        "list3": "../project3/project3.html",
        "list4": "../project4/project4.html"
    };

    Object.keys(shortcuts).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                var target = shortcuts[id];

                if (target.includes('.html')) {
                    window.location.href = target;
                } else {
                    var section = document.getElementById(target);
                    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
});