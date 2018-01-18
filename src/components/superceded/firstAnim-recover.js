'use strict';

import { alignDescriptionWithCursorOnMiddle } from './DOMStyling.js';
import { CURRENT_INDEX, colorsChange, cursorMove, startTransitionSlideshow } from './slideshow/slideshow';
import { slideshowParams } from './slideshow/_params';
import PerfectScrollbar from 'perfect-scrollbar';
import "babel-polyfill";


const footer = document.querySelector('.footer');
const animVideo = document.querySelector('#video-anim');
const theme = Object.keys(slideshowParams)[CURRENT_INDEX];
const hotelEstablishmentName = document.querySelector('.slideshow__description--establishment-name');
const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const dividerInDescription = document.querySelector('.slideshow__description--divider');
const slideshowBackup = document.querySelector('.slideshow__backup');
let allLetters = [];


/*------------------------------------*\
    AFTER LOADING
\*------------------------------------*/

function whenLoadedData(e) {
  console.log('loaded');
  animVideo.play();
  // /*    SCROLLBAR   */
  const ps = new PerfectScrollbar(footer, {
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
    suppressScrollX: true
  });

  

  /* BACKGROUND AND TEXT COLORS */
  colorsChange(/*adjustedIndex*/CURRENT_INDEX);
  /*  CURSOR  */
  cursorMove(/*adjustedIndex*/CURRENT_INDEX);

  /*------------------------------------*\
      LANDSCAPE
  \*------------------------------------*/
  /*   TOTEM   */
  document.querySelector(`.totem_${theme}`).classList.add('showTotem');
  document.querySelector(`.totem_${theme}`).addEventListener('animationend', removeInitAnimationClasses);
  document.querySelector(`.totem_${theme}`).classList.add('perpetual-translation');
  /*  OPTIONS  */
  [...document.querySelectorAll(`.slideshow__description--options`)].forEach((option) => {
    if (!option.classList.contains(`portrait`)) {
      option.classList.contains(`.option_${theme}`) ? '' : option.classList.add('hideLetter'); 
      document.querySelector(`.option_${theme}`).classList.add('showOption');
    } else {
      option.classList.add('showOption');
    }
  });

  //REMOVE ALL CLASSES AFTER ENTRANCE
  window.setTimeout(() => {
    //Get hotel letters
    // console.log('step 1');
    const nameLetters = [];
    [...hotelEstablishmentName.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

    window.setTimeout(() => {
      // console.log('step 2');
      //Get slogan letters
      const sloganLetters = [...hotelSlogan.children];

      window.setTimeout(() => {
        // console.log('step 3');
        //Get option letters
        const hotelOption = document.querySelector('.showOption');
        const optionLetters = [...hotelOption.children];

        window.setTimeout(() => {
          // console.log('step 4');
          window.setTimeout(() => {
            // console.log('step 5');
            for (let letter of [...nameLetters, ...optionLetters, ...sloganLetters]) {
              letter.addEventListener('animationend', removeInitAnimationClasses);
              allLetters.push(letter);
            }
            console.log(allLetters);
            window.setTimeout(() => {
              // console.log('step 6');
              alignDescriptionWithCursorOnMiddle();
              console.log('it worked !');
              console.log(allLetters);
            }, 200);
          }, 500);
        });
      }, 20);
    }, 20);
  }, 100);

}

function removeInitAnimationClasses() {

  //For hotel description (slogan, name and option)
  for (var i = 0; i < allLetters.length; i++) {
    this.classList.remove(`fade-in-letter-up-${i + 1}`);
  }
  //For totem
  this.classList.remove('fakeTotemUp');
  //For divider in
  if (this === allLetters[allLetters.length - 1]) {
    dividerInDescription.classList.add('coming-in');
    dividerInDescription.addEventListener('animationend', removeInitForDivider);
  }
  //FOr everybody
  this.removeEventListener('animationend', removeInitAnimationClasses);
}

function removeInitForDivider() {
  console.log('we remove the init for divider');
  this.classList.remove('init');
  this.classList.remove('coming-in');
  this.removeEventListener('animationend', removeInitForDivider);
}
/*------------------------------------*\
    AFTER PLAYING
\*------------------------------------*/

function whenEnded(e) {
  animVideo.parentNode.classList.add('hide');
  document.querySelector('.showTotem').classList.add('fakeTotemUp');
  populateLettersFirstTime();
  window.setTimeout(() => {
    document.body.removeChild(animVideo.parentNode);
  }, 500);
}

function populateLettersFirstTime() {
  //Get hotel letters
  const nameLetters = [];
  const hotelEstablishmentName = document.querySelector('.slideshow__description--establishment-name');
  [...hotelEstablishmentName.children].forEach(node => {
    [...node.children].forEach(letter => {
      nameLetters.push(letter)
    });
  });

  //Get slogan letters
  const hotelSlogan = document.querySelector('.slideshow__description--slogan');
  const sloganLetters = [...hotelSlogan.children];

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

animVideo.addEventListener('loadeddata', whenLoadedData);
animVideo.addEventListener('ended', whenEnded);
