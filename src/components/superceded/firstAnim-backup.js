'use strict';

import { alignDescriptionWithCursorOnMiddle } from './DOMStyling.js';
import { CURRENT_INDEX, colorsChange, cursorMove } from './slideshow/slideshow';
import { slideshowParams } from './slideshow/_params';
import PerfectScrollbar from 'perfect-scrollbar';
import "babel-polyfill";


const footer = document.querySelector('.footer');
const animVideo = document.querySelector('#video-anim');
const theme = Object.keys(slideshowParams)[CURRENT_INDEX];
const hotelEstablishmentName = document.querySelector('.slideshow__description--establishment-name');
const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const dividerInDescription = document.querySelector('.slideshow__description--divider');
let allLetters;


/*------------------------------------*\
    AFTER LOADING
\*------------------------------------*/

function whenLoadedData(e) {
  animVideo.play();
  const initPromise = new Promise ((resolve, reject) => {
    // /*    SCROLLBAR   */
    const ps = new PerfectScrollbar(footer, {
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      suppressScrollX: true
    });

    /* BACKGROUND AND TEXT COLORS */
    colorsChange(/*adjustedIndex*/CURRENT_INDEX);
    /*  CURSOR  */
    cursorMove(/*adjustedIndex*/CURRENT_INDEX);

    /*   TOTEM   */
    document.querySelector(`.totem_${theme}`).classList.add('showTotem');
    document.querySelector(`.totem_${theme}`).addEventListener('animationend', removeInitAnimationClasses);
    document.querySelector(`.totem_${theme}`).classList.add('perpetual-translation');
    /*  OPTIONS  */
    document.querySelector(`.option_${theme}`).classList.add('showOption');

    //REMOVE ALL CLASSES AFTER ENTRANCE
    //Get hotel letters
    const nameLetters = [];
    [...hotelEstablishmentName.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

    //Get slogan letters
    const sloganLetters = [...hotelSlogan.children];

    //Get option letters
    const hotelOption = document.querySelector('.showOption');
    const optionLetters = [...hotelOption.children];

    //Gather all letters
    allLetters = [...nameLetters, ...optionLetters, ...sloganLetters];
    if ((optionLetters.length > 0) && (allLetters.length === (nameLetters.length + optionLetters.length + sloganLetters.length))) {
      resolve(allLetters);
    } else {
      reject('it didn\'t work there');
    }
  });
  initPromise
    .then((a) => {
      console.log('it worked !');
      console.log(a);
      new Promise ((res, rej) => {
        for (var i = 0; i < a.length; i++) {
        // console.log(allLetters[i]);
        a[i].addEventListener('animationend', removeInitAnimationClasses)
          if (i === (a.length - 1)) {
            console.log('animationend for everybody');
            const youpiya = i;
            res(youpiya);
          };
        };
        rej('merde fait chier');
      });
    })
    .then((b) => {
      console.log(b);
      alignDescriptionWithCursorOnMiddle();
    })
    .catch(e => console.error(e));
}

function removeInitAnimationClasses() {

  console.log(this);
  console.log(allLetters[allLetters.length - 1]);
  //For hotel description (slogan, name and option)
  for (var i = 0; i < allLetters.length; i++) {
    this.classList.remove(`fade-in-letter-up-${i + 1}`);
  }
  //For totem
  this.classList.remove('fakeTotemUp');
  //For divider in
  if (this === allLetters[allLetters.length - 1]) {
    console.log('c ok');
    dividerInDescription.classList.add('coming-in');
    dividerInDescription.addEventListener('animationend', removeInitForDivider);
  }
  //FOr everybody
  // this.removeEventListener('animationend', removeInitAnimationClasses);
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
    console.log(node);
    [...node.children].forEach(letter => {
      console.log(letter);
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
