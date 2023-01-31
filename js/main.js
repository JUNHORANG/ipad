const basketStaterEl = document.querySelector('header .basket-stater');
const basketEl = basketStaterEl.querySelector('.basket');
const searchStarterEl = document.querySelector('.search-starter a');
const searchInputEl = document.querySelector('.text-field input');
const headerEl = document.querySelector('header');
const searchCloser = document.querySelector('.search .search-closer');
const shadowArea = document.querySelector('.search .shadow');
//스프레드 문법으로 유사 배열을 배열로 전환
const menuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const autocompletesEl = [...document.querySelectorAll('.autocompletes li')];

window.addEventListener('click', (e) => {

  // 이벤트 위임
  //header basket
  if(e.target.classList.contains('basket--controller')) {
    basketEl.classList.toggle('show');
    return
  }
  //header search
  if(e.target === searchStarterEl) {
    headerEl.classList.add('searching');
    //스크롤 기능 막기
    document.documentElement.classList.add('fixed');
    searchFadeOutAnimation();
    autocompletesEl.forEach((el, idx) => {
      el.style.transitionDelay = idx * .4 / autocompletesEl.length + 's';
    });
    setTimeout(() => {
      searchInputEl.focus();
    }, 600);
    return
  }

  basketEl.classList.remove('show');
});


// header basket
basketEl.addEventListener('click',(e) => {
  e.stopPropagation();
});


// header search
function searchFadeOutAnimation() {
  menuEls.reverse().forEach((el, idx) => {
    el.style.transitionDelay = idx * .4 / menuEls.length + 's';
  });
}

function hideSearch() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  searchFadeOutAnimation();
  autocompletesEl.reverse().forEach((el, idx) => {
    el.style.transitionDelay = idx * .4 / autocompletesEl.length + 's';
  });
  autocompletesEl.reverse();
  searchInputEl.value = '';
}

searchCloser.addEventListener('click', hideSearch);
shadowArea.addEventListener('click', hideSearch);


//IntersectionObserver 가시성 관찰

const io = new IntersectionObserver(( entries ) => {
  //관찰하는 요소들을 배열로 가져온다. 그러므로 entries는 관찰하는 요소들의 배열이다.
  entries.forEach((entry) => {
    if(!entry.isIntersecting){
      return
    }
    entry.target.classList.add('show');
  });
});

const infoEls = document.querySelectorAll('.info');

infoEls.forEach(( el ) => {
  io.observe(el);
});

// 비디오 재생
const video = document.querySelector('video');
const playBtn = document.querySelector('.controller--play');
const pauseBtn = document.querySelector('.controller--pause');

playBtn.addEventListener('click', (e) => {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', (e) => {
  video.pause();
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide');
});