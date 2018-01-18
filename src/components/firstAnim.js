'use strict';

import { alignDescriptionWithCursorOnMiddle } from './DOMStyling.js';
import { CURRENT_INDEX, colorsChange, cursorMove, startTransitionSlideshow } from './slideshow/slideshow';
import { slideshowParams } from './slideshow/_params';
import PerfectScrollbar from 'perfect-scrollbar';
import "babel-polyfill";
import { playerLoad, player1, player2  } from './_video1';


const footer = document.querySelector('.footer');
const animVideo = document.querySelector('#video-anim');
// console.log(animVideo);
const theme = Object.keys(slideshowParams)[CURRENT_INDEX];
const hotelEstablishmentNameLandscape = document.querySelector('.slideshow__description--establishment-name.landscape');
const hotelSloganLandscape = document.querySelector('.slideshow__description--slogan.landscape');
const dividerInDescriptionLandscape = document.querySelector('.slideshow__description--divider.landscape');
let allLetters = [];


/*------------------------------------*\
    AFTER LOADING -- LANDSCAPE
\*------------------------------------*/

/*------------------------------------*\
    AFTER PLAYING
\*------------------------------------*/

let counterHandleEnd = 0;
function whenEnded(e) {
  // console.log(`this.currentTime: ${this.currentTime}`);;
  // console.log(`this.duration: ${this.duration}`);;
  // console.log('ended'); 
  if ((this.currentTime === this.duration) && counterHandleEnd === 0) {
    counterHandleEnd++;
    animVideo.parentNode.classList.add('hide');
    if (document.body.classList.contains('landscape')) {
      document.querySelector('.showTotem.landscape').classList.add('fakeTotemUp')
      populateLettersFirstTime();
    }    
    window.setTimeout(() => {
      if (document.body.classList.contains('portrait')) {
        player1.videoId ? '' : playerLoad(player1);
        player2.videoId ? '' : playerLoad(player2);
        [...document.querySelectorAll('.slideshow__totem.portrait')].forEach(totem => totem.classList.add('displayTotem'));
      }
      document.body.removeChild(animVideo.parentNode);
    }, 2000);
  }

}

function populateLettersFirstTime() {
  //Get hotel letters
  const nameLetters = [];
  [...hotelEstablishmentNameLandscape.children].forEach(node => {
    [...node.children].forEach(letter => {
      nameLetters.push(letter)
    });
  });

  //Get slogan letters
  const sloganLetters = [...hotelSloganLandscape.children];

  //Get option letters
  const hotelOption = document.querySelector('.showOption');
  const optionLetters = [...hotelOption.children];

  //Gather all letters
  const allLetters = [...nameLetters, ...optionLetters, ...sloganLetters];
  for (var i = 0; i < allLetters.length; i++) {
    allLetters[i].classList.add(`fade-in-letter-up-${i + 1}`)
  }
}


/*------------------------------------*\
    EVENT LISTENERS
\*------------------------------------*/

// animVideo.addEventListener('loadeddata', whenLoadedData);
// animVideo.addEventListener('ended', whenEnded);
animVideo.addEventListener('timeupdate', whenEnded);

export { whenLoadedData };
