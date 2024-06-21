var ClassScrollEffect,
    defaults = {
        endPoint: 500,
        initialOpacity: 1,
        minOpacity: 0.5,
        opacityDivisor: 1000,
        initialScale: 1,
        minScale: 0.5, // 조정된 부분: 최소로 축소될 크기 설정
        scaleDivisor: 1000 // 조정된 부분: scale 변화를 더 미세하게 조정
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
    var scrollEffect = new ClassScrollEffect($('.main-title'), {
        initialOpacity: 1,
        minOpacity: 0.3, // 예시로 설정된 값
        initialScale: 1,
        minScale: 0. // 예시로 설정된 값
    });
    scrollEffect.init();
});


document.addEventListener("DOMContentLoaded", function() {
    function smoothScrollTo(sectionId) {
      var sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  
    var shortcuts = {
      "list1": "Works-UIUX",
      "list2": "Works-OTHER",
      "list3": "SKILLS",
      "list4": "CONTACT"
    };
  
    Object.keys(shortcuts).forEach(function(shortcutId) {
      var shortcutElement = document.getElementById(shortcutId);
      if (shortcutElement) {
        shortcutElement.addEventListener("click", function() {
          smoothScrollTo(shortcuts[shortcutId]);
        });
      }
    });
  });

  gsap.utils.toArray('.rolled-over-txt').forEach((element) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: '100% 100%',
        end: '100% 100%',
        scrub: 1
      }
    }).fromTo(
      element,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        ease: 'none',
        duration: 5
      }
    );
  });
  
  
  

document.addEventListener("DOMContentLoaded", function() {
    const projectGroups = document.querySelectorAll(".project-group");
    const projectWrapperNum = document.querySelector(".project-wrapper-num");

    function handleScroll() {
        let currentGroupIndex = 0;

        projectGroups.forEach((projectGroup, index) => {
            const rect = projectGroup.getBoundingClientRect();
            if (rect.top <= 0) {
                currentGroupIndex = index;
            }
        });

        const spans = projectWrapperNum.querySelectorAll("span");
        spans.forEach((span, index) => {
            if (index === currentGroupIndex) {
                span.classList.add("active");
                span.style.display = "inline-block";
            } else {
                span.classList.remove("active");
                span.style.display = "none";
            }

            const translateY = index === 0 ? "0px" : index === currentGroupIndex - 1 ? "-350px" : index === currentGroupIndex - 2 ? "-700px" : "0px";
            span.style.transform = `translateY(${translateY})`;
        });
    }

    window.addEventListener("scroll", handleScroll);

    // 페이지 로드시 한번 실행하여 초기 상태 설정
    handleScroll();
});