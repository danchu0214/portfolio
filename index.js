document.addEventListener('DOMContentLoaded', function() {
  const mainTitle = document.querySelector('.main-title');
  const mainContents = document.querySelector('.main-contents');

  window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const mainContentsPosition = mainContents.offsetTop;
      const mainTitleHeight = mainTitle.offsetHeight;

      // main-contents 섹션에 도달할 때까지 main-title을 숨깁니다.
      if (scrollPosition > mainContentsPosition - mainTitleHeight) {
          mainTitle.classList.remove('visible'); // 스크롤을 내릴 때는 투명하게
      } else {
          mainTitle.classList.add('visible'); // 스크롤을 올릴 때는 나타나게
      }
  });
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

            const translateY = index === 0 ? "0px" : index === currentGroupIndex - 1 ? "-350px" : index === currentGroupIndex - 2 ? "-705px" : "0px";
            span.style.transform = `translateY(${translateY})`;
        });
    }

    window.addEventListener("scroll", handleScroll);

    // 페이지 로드시 한번 실행하여 초기 상태 설정
    handleScroll();
});


