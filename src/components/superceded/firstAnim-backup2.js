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

// function whenLoadedData(e) {
//   console.log('play');
//   animVideo.play();
//   // /*    SCROLLBAR   */
//   const ps = new PerfectScrollbar(footer, {
//     handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
//     suppressScrollX: true
//   });

//   /* BACKGROUND AND TEXT COLORS */
//   colorsChange(/*adjustedIndex*/CURRENT_INDEX);
//   console.log(`document.body.classList.contains('landscape'): ${document.body.classList.contains('landscape')}`);
//   if (document.body.classList.contains('landscape')) {
//     console.log('body moving');
    
//     /*  CURSOR  */
//     cursorMove(/*adjustedIndex*/CURRENT_INDEX);

//     /*   TOTEM   */
//     console.log(`theme: ${theme}`);
//     console.log(document.querySelector(`.totem_${theme}.landscape`));
//     document.querySelector(`.totem_${theme}.landscape`).classList.add('showTotem');
//     document.querySelector(`.totem_${theme}.landscape`).addEventListener('animationend', removeInitAnimationClasses);
//     document.querySelector(`.totem_${theme}.landscape`).classList.add('perpetual-translation');
//     /*  OPTIONS  */
//     [...document.querySelectorAll(`.slideshow__description--options.landscape`)].forEach(option => option.classList.contains(`.option_${theme}`) ? '' : option.classList.add('hideLetter'));
//     document.querySelector(`.option_${theme}.landscape`).classList.add('showOption');

//     //REMOVE ALL CLASSES AFTER ENTRANCE

//     window.setTimeout(() => {
//       //Get hotel letters
//       console.log('step 1');
//       const nameLetters = [];
//       [...hotelEstablishmentNameLandscape.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

//       window.setTimeout(() => {
//         console.log('step 2');
//         //Get slogan letters
//         const sloganLetters = [...hotelSloganLandscape.children];

//         window.setTimeout(() => {
//           console.log('step 3');
//           //Get option letters
//           const hotelOption = document.querySelector('.showOption.landscape');
//           const optionLetters = [...hotelOption.children];

//           window.setTimeout(() => {
//             console.log('step 4');
//             window.setTimeout(() => {
//               console.log('step 5');
//               for (let letter of [...nameLetters, ...optionLetters, ...sloganLetters]) {
//                 letter.addEventListener('animationend', removeInitAnimationClasses);
//                 allLetters.push(letter);
//               }
//               console.log(allLetters);
//               window.setTimeout(() => {
//                 console.log('step 6');
//                 alignDescriptionWithCursorOnMiddle();
//                 console.log('it worked !');
//                 console.log(allLetters);
//               }, 200);
//             }, 500);
//           });
//         }, 20);
//       }, 20);
//     }, 100);
//   } else if (document.body.classList.contains('portrait')) {
//     return;
//   }
// }


/*------------------------------------*\
    AFTER PLAYING
\*------------------------------------*/

function whenEnded(e) {
  animVideo.parentNode.classList.add('hide');
  if (document.body.classList.contains('landscape')) {
    document.querySelector('.showTotem.landscape').classList.add('fakeTotemUp')
    populateLettersFirstTime();
  } else if (document.body.classList.contains('portrait')) {
    playerLoad(player1);
    playerLoad(player2);
  }

  window.setTimeout(() => {
    document.body.removeChild(animVideo.parentNode);
  }, 500);
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
animVideo.addEventListener('ended', whenEnded);

export { whenLoadedData };
