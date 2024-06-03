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
