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
