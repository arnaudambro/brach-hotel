'use strict';
window.__forceSmoothScrollPolyfill__ = true;
require('smoothscroll-polyfill').polyfill();   //https://github.com/iamdustan/smoothscroll for behavior: smooth when scrolling. But we never scroll here.
import PerfectScrollbar from 'perfect-scrollbar';
import { CURRENT_INDEX } from './slideshow';
import { playerPlay, playerPause, player1, player2, } from '../_video1';

//DATA
import { slideshowParams } from './_params';

const video1Div = document.querySelector('#video1');
const video2Div = document.querySelector('#video2');
const controlVideo1PointerEvents = document.querySelector('.video1').querySelector('.transparent_filter-for-allow-scrolling');
const controlVideo2PointerEvents = document.querySelector('.video2').querySelector('.transparent_filter-for-allow-scrolling');
const slideshowBackup = document.querySelector(".slideshow__backup");

let slidesToScroll = [];
document.querySelectorAll('[data-scrollto]').forEach(element => {
  if (element.classList.contains('footer')) {
    slidesToScroll.push(slidesToScroll[1] * (parseInt(element.dataset.scrollto) - 0.5));
  } else {
    slidesToScroll.push(element.getBoundingClientRect().height * parseInt(element.dataset.scrollto));
  }
});

function calculateHeights(e) {
  // console.log(e);
  slidesToScroll = [];
  document.querySelectorAll('[data-scrollto]').forEach(element => {
    if (element.classList.contains('footer')) {
      slidesToScroll.push(slidesToScroll[1] * (parseInt(element.dataset.scrollto) - 0.5));
    } else {
      slidesToScroll.push(element.getBoundingClientRect().height * parseInt(element.dataset.scrollto));
    }
  });
}

window.addEventListener('orientationchange', calculateHeights);

let previousScroll;
let playerPlaying = 0;
function handleScroll(e) {
  // console.log('scrolling');
  if (document.body.classList.contains('landscape')) {
    return;
  } else if (e.target.scrollingElement.scrollTop > slidesToScroll[slidesToScroll.length - 1]) {
    playerPause(player2);
    playerPause(player1);
    return;
  } else if (Math.abs(e.target.scrollingElement.scrollTop - previousScroll) < 10) {
    previousScroll = e.target.scrollingElement.scrollTop;
    return;
  } else {
    const CURRENT_INDEX = Math.round(e.target.scrollingElement.scrollTop / slidesToScroll[1]);
    if ((CURRENT_INDEX === slidesToScroll.length)  || CURRENT_INDEX < 0) {
      previousScroll = e.target.scrollingElement.scrollTop;
      return;
    } else {
      document.querySelector(`[data-scrollto='${CURRENT_INDEX}']`).scrollIntoView({behavior: 'smooth', block: "start", inline: "nearest"});
      if (document.querySelector(`[data-scrollto='${CURRENT_INDEX}']`) === document.querySelector('#video1')) {

      } else if (document.querySelector(`[data-scrollto='${CURRENT_INDEX}']`) === document.querySelector('#video2')) {

      } else if (document.querySelector(`[data-scrollto='${CURRENT_INDEX}']`) === document.querySelector('.footer')) {

      } else {
        // console.log('player pause');
        playerPause(player1);
        playerPause(player2);
      }
      previousScroll = slidesToScroll[CURRENT_INDEX];
      return;
    }
  }
}


/*------------------------------------*\
    STOP SCROLLING
\*------------------------------------*/

let scrollStop = function ( callback ) {

  // Make sure a valid callback was provided
  if ( !callback || Object.prototype.toString.call( callback ) !== '[object Function]' ) return;

  // Setup scrolling variable
  let isScrolling;
  // Listen for scroll events
  window.addEventListener('scroll', function ( event ) {
    // Clear our timeout throughout the scroll
    window.clearTimeout( isScrolling );

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
      // Run the callback
      callback(event);

    }, 200);

  }, false);

};



scrollStop(handleScroll);





