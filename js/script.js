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

//////// Swiper.js //////////
// import Swiper from "swiper/bundle";
// // import "../node_modules/swiper/swiper-bundle.css";
const swiper = new Swiper('.workSlider', {
  slidesPerView: 1.2,
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
