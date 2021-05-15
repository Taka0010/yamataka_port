'use strict';

//////// HUMBERGER //////////
const humbIcon = document.querySelector('.header__humb');
const barUp = document.querySelector('.upper');
const barDown = document.querySelector('.down');
const humbMenu = document.querySelector('.header__menu');
humbIcon.addEventListener('click', function () {
  console.log('hi');
  humbMenu.classList.toggle('humbOn');
});

//////// NAVIGATION //////////
const header = document.querySelector('.header');
const headerPc = document.querySelector('.header__menuPc');
const secSeg = document.querySelector('.secSeg');
const fstSeg = document.querySelector('.fstSeg');
const navHeight = header.getBoundingClientRect().height;
const footer = document.querySelector('.footer');

// メニューフェードアニメーション
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('header__menuPc--list')) {
    const link = e.target;

    const siblings = link
      .closest('.header__menuPc--lists')
      .querySelectorAll('.header__menuPc--list');

    siblings.forEach((el) => {
      el.style.transition = `opacity .3s ease`;
      if (el !== link) el.style.opacity = opacity;
    });
  }
};
header.addEventListener('mouseover', function (e) {
  handleHover(e, 0.15);
});

header.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// テキスト色変え
const pcNavColoring = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) headerPc.classList.add('coloring');
  else headerPc.classList.remove('coloring');
};
const pcNavObserver = new IntersectionObserver(pcNavColoring, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight / 2}px`,
});
pcNavObserver.observe(fstSeg);

// フッターでの消失
const footerDisappear = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) headerPc.classList.remove('disappear');
  else headerPc.classList.add('disappear');
};
const footerObserver = new IntersectionObserver(footerDisappear, {
  root: null,
  threshold: 0,
});
footerObserver.observe(footer);

//////// SIDE TEXT //////////
const sideTxt = document.querySelectorAll('.fstSeg__sideTxt');
const sideTxtLft = document.querySelector('.left');
const sideTxtHeight = sideTxtLft.getBoundingClientRect().height;

const sideTxtColorig = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    sideTxt.forEach((el) => {
      el.classList.add('coloring');
    });
  } else {
    sideTxt.forEach((el) => {
      el.classList.remove('coloring');
    });
  }
};
const sideTxtObserver = new IntersectionObserver(sideTxtColorig, {
  root: null,
  threshold: 0,
  rootMargin: `-${sideTxtHeight * 2}px`,
});
sideTxtObserver.observe(fstSeg);

//////// Swiper.js //////////
const swiper = new Swiper('.workSlider', {
  slidesPerView: 1.2,
  breakpoints: {
    // 768px以上の場合
    768: {
      slidesPerView: 2.3,
    },
  },
  spaceBetween: 15,
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: true,
  },
});

/*
// ページのリロードなしのJSを更新する
if(module.hot){
  module.hot.accept()
}

// ES6からできた概念をES5で使えるようにする
import 'core-js/stable';

// Polifilling async functions
import 'regenerator-runtime/runtime';
*/
