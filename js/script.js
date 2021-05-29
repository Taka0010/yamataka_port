'use strict';

$(function () {
  $(document).ready(function () {
    $('.mosaic-in').mosaicIn({
      duration: 1500,
    });
    setTimeout(function () {
      $('.fv__img--filter').css({ filter: 'blur(0)' });
    }, 500);
  });
});

// スマホ画面高さ計算
document.addEventListener('DOMContentLoaded', function () {
  const windowHeight = screen.height;
  const menu = document.querySelector('.header__menu');
  menu.style.height = windowHeight + 'px';
});

const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

let vw = window.innerWidth;

window.addEventListener('resize', () => {
  if (vw === window.innerWidth) {
    // 画面の横幅にサイズ変動がないので処理を終える
    return;
  }

  // 画面の横幅のサイズ変動があった時のみ高さを再計算する
  vw = window.innerWidth;
  setFillHeight();
});

// 初期化
setFillHeight();

//////// HUMBERGER //////////
const humbIcon = document.querySelector('.header__humb');
const barUp = document.querySelector('.upper');
const barDown = document.querySelector('.down');
const humbMenu = document.querySelector('.header__menu');
const humbBars = document.querySelectorAll('.header__humb--icon');
const navLists = document.querySelectorAll('.header__menuSp--list');
const wrapper = document.querySelector('.wrapper');

let navListsArr = [];
navLists.forEach((el) => navListsArr.push(el));

humbIcon.addEventListener('click', function () {
  console.log('hi');
  barUp.classList.toggle('humbBarUpMove');
  barDown.classList.toggle('humbBarDownMove');
  humbMenu.classList.toggle('humbOn');
});

const humbBarColoring = function () {
  humbBars.forEach((el) => {
    el.classList.toggle('humbIconColor');
  });
};

const humbListSlidein = function () {
  setTimeout(function () {
    for (let i = 0; i < navListsArr.length; i++) {
      setTimeout(function () {
        navListsArr[i].classList.toggle('slideIn');
      }, 80 * i);
    }
  }, 300);
};

humbIcon.addEventListener('click', () => {
  humbBarColoring();
  humbListSlidein();
});

navLists.forEach((list) => {
  list.addEventListener('click', () => {
    humbBarColoring();
    humbMenu.classList.toggle('humbOn');
    barUp.classList.toggle('humbBarUpMove');
    barDown.classList.toggle('humbBarDownMove');
    humbListSlidein();
  });
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
  if (!entry.isIntersecting) {
    headerPc.classList.remove('disappear');
    followArrow.classList.remove('wayback');
  } else {
    headerPc.classList.add('disappear');
    followArrow.classList.add('wayback');
  }
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

//////// テキスト浮上 //////////
const txtBlock = document.querySelectorAll('.showUp');
const maskBlock = document.querySelectorAll('.maskBlock');
console.log(txtBlock);
txtBlock.forEach((el) => {
  el.classList.add('block--hidden');
});
const txtBlockShowUp = function (entries, observer) {
  const [entry] = entries;
  console.log(entry.target.firstElementChild);
  console.log(entry);
  if (entry.isIntersecting) {
    entry.target.firstElementChild.classList.remove('block--hidden');
    observer.unobserve(entry.target);
  }
};
const txtBlockObserver = new IntersectionObserver(txtBlockShowUp, {
  root: null,
  threshold: 0,
  rootMargin: '-10px',
});
maskBlock.forEach((block) => {
  txtBlockObserver.observe(block);
});

//////// マウスオーバー //////////
const followTxt = document.querySelector('.follower__txt');
const followArrow = document.querySelector('.mouse__scrollDown--arrow');
const arrow = document.querySelector('.cursor');

console.log(followTxt.getAttribute('src'));
secSeg.addEventListener('mouseover', function () {
  followArrow.style.color = '#ffff9d';
  followTxt.setAttribute('src', 'img/top/scrollTxt_yellow.svg');
  header.addEventListener('mouseover', function () {
    if (headerPc.classList.contains('coloring')) {
      followArrow.style.color = '#ffff9d';
      followTxt.setAttribute('src', 'img/top/scrollTxt_yellow.svg');
    }
  });
});
secSeg.addEventListener('mouseout', function () {
  followArrow.style.color = '#222222';
  followTxt.setAttribute('src', 'img/top/scrollTxt_black.svg');
});

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

//////// マウス制御 //////////
var cursor = $('.cursor'),
  follower = $('.follower'),
  cWidth = 8, //カーソルの大きさ
  fWidth = 127, //フォロワーの大きさ
  delay = 3, //数字を大きくするとフォロワーがより遅れて来る
  mouseX = 0, //マウスのX座標
  mouseY = 0, //マウスのY座標
  posX = 0, //フォロワーのX座標
  posY = 0; //フォロワーのX座標

//カーソルの遅延アニメーション
//ほんの少ーーーしだけ遅延させる 0.001秒
TweenMax.to({}, 0.001, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / delay;
    posY += (mouseY - posY) / delay;

    TweenMax.set(follower, {
      css: {
        left: posX - fWidth / 2,
        top: posY - fWidth / 2,
      },
    });

    TweenMax.set(cursor, {
      css: {
        left: mouseX - cWidth / 2,
        top: mouseY - cWidth / 2,
      },
    });
  },
});

//マウス座標を取得
$(document).on('mousemove', function (e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

$('a').on({
  mouseenter: function () {
    // cursor.addClass('is-active');
    follower.addClass('is-active');
  },
  mouseleave: function () {
    // cursor.removeClass('is-active');
    follower.removeClass('is-active');
  },
});

//////// インスタ読み込み //////////
$(function () {
  $.ajax({
    type: 'GET',
    url: 'https://graph.facebook.com/v5.0/17841401896304896?fields=name%2Cmedia.limit(15)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cthumbnail_url%2Cmedia_type%2Cusername%7D&access_token=EAAIInQxewKcBAAmTIWSFBsAO3FuPnVnRNGa62Cz60uSaZAIEcfBYL4ygFdGG1AryodJDNiFycZAebd1W2YzY4GfthRgU0xEUBm736ZChzNKZC9N016br9Eu1ZBPC6e1PZBIGmzwHlr485rDtb1WVQDbOJR8fRFsvrlnZBfegqtpbcqhRB7Ezf4i',
    dataType: 'json',
    success: function (json) {
      var html = '';
      var insta = json.media.data;
      for (var i = 0; i < insta.length; i++) {
        var media_type = insta[i].media_type;
        if (
          insta[i].media_type == 'IMAGE' ||
          insta[i].media_type == 'CAROUSEL_ALBUM'
        ) {
          if (i === 4 || i === 7) {
            html +=
              '<li class="insta_brick insta_brick-wide js-item"><img src="' +
              insta[i].media_url +
              '"></li>';
          } else {
            html +=
              '<li class="insta_brick js-item"><img src="' +
              insta[i].media_url +
              '"></li>';
          }
        } else if (media_type == 'VIDEO') {
          html +=
            '<li class="insta_brick js-item"><img src="' +
            insta[i].thumbnail_url +
            '></li>';
          var media_type = '';
        }
      }
      $('.insta_list').append(html);

      var $instaContainer = $('.insta_list'); //コンテナとなる要素を指定

      $instaContainer.imagesLoaded(function () {
        //Masonryの関数↓
        $instaContainer.masonry({
          //オプション指定箇所
          itemSelector: '.js-item', //コンテンツを指定
          // percentPosition: true,
          columnWidth: '.insta_brick', //カラム幅を設定
          // horizontalOrder: true,
          fitWidth: true, //コンテンツ数に合わせ親の幅を自動調整
          originTop: true,
          // isAnimated: true,
        });
        // $demo1.mansory('layout');
      });
    },
    error: function () {
      console.log('Error');
      //エラー時の処理
    },
  });
});

// $(window).on('load', function () {
//   var $demo1 = $('.insta_list'); //コンテナとなる要素を指定

//   $demo1.imagesLoaded(function () {
//     //imagesLoadedを使用し、画像が読み込みまれた段階でMasonryの関数を実行させる
//     //Masonryの関数↓
//     $demo1.masonry({
//       //オプション指定箇所
//       itemSelector: '.js-item', //コンテンツを指定
//       // percentPosition: true,
//       columnWidth: '.insta_brick', //カラム幅を設定
//       // horizontalOrder: true,
//       fitWidth: true, //コンテンツ数に合わせ親の幅を自動調整
//       originTop: true,
//       // isAnimated: true,
//     });
//     // $demo1.mansory('layout');
//   });
// });
