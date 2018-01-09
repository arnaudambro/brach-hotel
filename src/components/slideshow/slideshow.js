'use strict';

/* ADVICE FOR SLIDESHOWS :
-> add class instead of CSS property when it's possible
-> add class to the direct element, not the motherDiv, when possible
-> for the fake DOM, use absolute position to have the minimum calculation as possible
-> use transitionend at the end of the transitions
-> create fragment instead of crete element: https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments
-> good advices hear : https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108
*/

import { buildFakeHotelOptionLetters} from './_fakeDom';
import { populateHotelOptions } from './_populateLetters';
import { alSize } from '../DOMStyling';
require('smoothscroll-polyfill').polyfill();   //https://github.com/iamdustan/smoothscroll
import PerfectScrollbar from 'perfect-scrollbar';
import { player1, playerPlay } from '../_video1';

/*------------------------------------*\
    VARIABLES & DATA
\*------------------------------------*/

//DATA
import { slideshowParams } from './_params';

//DOM
const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowBackupDiv = document.querySelector(".slideshow__backup--container");
const slideshowContentDiv = document.querySelector(".slideshow__content");
const totemDiv = document.querySelector('.slideshow__totem');
let nextTotemDiv = 0;
const movingCursorDiv = document.querySelector('.slideshow__cursor--moving');
const hotelOptions = document.querySelector('.slideshow__description--options');
const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const hotelName = slideshowDiv.querySelector('.slideshow__description');
const dividerInDescription = slideshowDiv.querySelector('.slideshow__description--divider');
const video1 = document.querySelector('.video__video1');

//CSS
const totemDivHeight = 90;
const cursorVerticalSpacing = 20;
const transitionDuration = 1300;  //A bit higher than the one in CSS for a proper totem transition

    /*  CURSOR  */
movingCursorDiv.style.boxShadow = `0px ${(cursorVerticalSpacing * 0)}px, 0px ${(cursorVerticalSpacing * 1)}px, 0px ${(cursorVerticalSpacing * 2)}px, 0px ${(cursorVerticalSpacing * 3)}px, 0px ${(cursorVerticalSpacing * 4)}px, 0px ${(cursorVerticalSpacing * 5)}px, 0px ${(cursorVerticalSpacing * 6)}px`;


//SLIDESHOW PARAMS
const numberOfSlides = Object.keys(slideshowParams).length;
let biggestWordLength = 0;
let biggestWordParam = 0;
Object.keys(slideshowParams).map(param => {
  if (slideshowParams[param].frenchName.length > biggestWordLength) {
    biggestWordLength = slideshowParams[param].frenchName.length; 
    biggestWordParam = slideshowParams[param].position;
  }; 
});

/*------------------------------------*/  
let CURRENT_INDEX = numberOfSlides - 1 ;
/*------------------------------------*/
hotelOptions.style.width = `750px`


/*------------------------------------*\
    INIT
\*------------------------------------*/

//function to use also on transition and init
function colorsChange(index) {
  const theme = Object.keys(slideshowParams)[index];

  /*  TEXTS COLOR  */
  hotelName.style.color = slideshowParams[theme].textColor;
  dividerInDescription.style.borderColor = slideshowParams[theme].textColor;

  /* BACKGROUND */
  slideshowDiv.style.backgroundColor = slideshowParams[theme].backgroundColor;
  movingCursorDiv.style.color = slideshowParams[theme].textColor;
  movingCursorDiv.style.borderColor = slideshowParams[theme].textColor;
}

//function to use also on transition and init
function cursorMove(index) {
  movingCursorDiv.style.transform = `translateY(${-cursorVerticalSpacing * index}px)`;
  window.setTimeout(() => {
  }, transitionDuration);
}

const init = (index) => {

  const theme = Object.keys(slideshowParams)[index];
  /*    SCROLLBAR   */
  const ps = new PerfectScrollbar(wholeContentDiv, {
    handlers: ['click-rail', 'drag-thumb', 'keyboard', /*'wheel',*/ 'touch'],

  });

  /* BACKGROUND AND TEXT COLORS */
  colorsChange(index);

  /*  CURSOR  */
  cursorMove(index);

  /*   TOTEM   */
  totemDiv.style.backgroundImage = `url('${slideshowParams[theme].totemPictureUrl()}')`;

  /*  OPTIONS  */
  populateHotelOptions(hotelOptions, index, slideshowParams, alSize, true);

  /* SLOGAN   */
  hotelSlogan.firstChild.textContent = 'un style de vie à paris';
};
init(CURRENT_INDEX);


/*------------------------------------*\
    SLIDESHOW
\*------------------------------------*/


function startTransition(e) {
  //Prevent pressing any other key
  const keyPressedIsNoGood = (e.type === 'keyup') && (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32);
  if (keyPressedIsNoGood) { 
    return; 
  };

  //EVENT CASES
  const eventCases = {
    wheeledUp: (e.type === 'mousewheel' && e.deltaY < 0),
    wheeledDown: (e.type === 'mousewheel' && e.deltaY > 0),
    keyDown: (e.type === 'keyup' && ((e.keyCode === 40) || (e.keyCode === 32))),
    keyUp: (e.type === 'keyup' && (e.keyCode === 38)),  //38 = arrow up
    clickedMouseForDown: (e.type === 'click' && e.srcElement.className === 'mouse'),
  };

  const eventGoUp = (eventCases.keyUp || eventCases.wheeledUp);
  const eventGoDown = (eventCases.keyDown || eventCases.wheeledDown || eventCases.clickedMouseForDown);

  //If portrait or mobile
  //Prevent transit while already transiting
  if (slideshowDiv.classList.contains('inTransition')) {
    return;
  } else if (eventGoUp && CURRENT_INDEX === 0) {
    return;
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides - 1)) {
        // wholeContentDiv.overflow = '';
    scrollToFirstVideo();
    return;
  } else {
    [slideshowDiv, movingCursorDiv, dividerInDescription, hotelName].forEach(item => {
      item.classList.add('inTransition');
    });
  }


  if (!wholeContentDiv.classList.contains('slideshow__landscape')) {
    return
  }
  const previousIndex = CURRENT_INDEX;
  let direction;
  if (eventGoUp && CURRENT_INDEX > 0 && CURRENT_INDEX < numberOfSlides) { 
        CURRENT_INDEX--;
    direction = 'down';
  } else if (eventGoDown && CURRENT_INDEX < numberOfSlides)  {
    CURRENT_INDEX === numberOfSlides - 1 ? CURRENT_INDEX = 0 : CURRENT_INDEX++;
    direction = 'up';
  }
  //Cursor move
  cursorMove(CURRENT_INDEX);
  
  //Totem move
  totemMove(CURRENT_INDEX, direction);
  
  //Hotel Options change
  hotelOptionsTransit(e, CURRENT_INDEX, hotelOptions, direction);

  //Background color change
  colorsChange(CURRENT_INDEX);

  //Make the slideshow ready for new transition
  window.setTimeout(() => {
    [slideshowDiv, movingCursorDiv, dividerInDescription, hotelName].forEach(item => {
      item.classList.remove('inTransition');
    });
  }, transitionDuration + 200);
}

/*----- TOTEM FUNCTIONS-----*/
function totemMove(index, direction) {
  const up = direction === 'up' ? true : false;
  const timeOffset = 100;

  //Building the new totem
  nextTotemDiv = slideshowParams[Object.keys(slideshowParams)[index]].fakeTotem()

  nextTotemDiv.classList.add(up ? 'fakeTotemUp' : 'fakeTotemDown');

  slideshowContentDiv.appendChild(nextTotemDiv);

  window.setTimeout(() => {
    [nextTotemDiv, totemDiv].forEach(div => {
      div.classList.add(up ? 'totemOnTransitionUp' : 'totemOnTransitionDown');
    });
  }, timeOffset);


  window.setTimeout(() => {
    totemDiv.addEventListener('transitionend', rebuildTotemDom(up, index), false);
    totemDiv.style.backgroundImage = `url('${slideshowParams[Object.keys(slideshowParams)[index]].totemPictureUrl()}')`;
    nextTotemDiv.addEventListener('transitionend', rebuildTotemDom(up, index), false);

    }, transitionDuration + timeOffset);
}

let finishLine = 0;  //special var for totem transitionend only
function rebuildTotemDom(up, index) {

  finishLine++;

  if (finishLine === 2) {
    totemDiv.classList.remove(up ? 'totemOnTransitionUp' : 'totemOnTransitionDown');
    //IF NOT REMOVE THE EVENT LISTENER TRANSITIONEND, IT'S TRIGGERED EVERYTIME ONE MORE TIME
    totemDiv.removeEventListener('transitionend', rebuildTotemDom(up, index));

    slideshowContentDiv.removeChild(nextTotemDiv);
    nextTotemDiv = 0;
    finishLine = 0;
  } else {

    return;
  }
}

/*------ HOTEL OPTIONS FUNCTIONS ------*/
function hotelOptionsTransit(e, index, anyHotelOptions, direction) {
  /*    TRANSITION PARAMTERS    */
  let i = 0;
  const offset = direction === 'up' ? 10 : -10;
  const letterTimeout = 20;
  //target: timeout of the last letter + transition of the last letter = 1/2 transition
  const letterTransitionDuration = transitionDuration * (1/2) - letterTimeout * biggestWordLength;
  
  /*    FAKE DOM     */
  const newHotelOptions = buildFakeHotelOptionLetters(anyHotelOptions, slideshowParams, index, offset, alSize);
  wholeContentDiv.append(newHotelOptions);

  //STEP 1: move up the existing letter and transit opacity from 1 to 0 during 1/2 transition
  [...anyHotelOptions.children].forEach(letter => {
    i++;
    window.setTimeout(() => {
    letterDisappear(letter, letterTransitionDuration, offset);
    }, letterTimeout * i);
  });

  //STEP 2: move up the new letter and transit opacity from 0 to 1 during 1/2 transition
  window.setTimeout(() => {
    newHotelOptions.style.opacity = 1;
    [...newHotelOptions.children].forEach(letter => {
      i++;
      window.setTimeout(() => {
      letterAppear(letter, letterTransitionDuration, offset);
      }, letterTimeout * i);
    });
  }, transitionDuration * (1/2))

  window.setTimeout(() => {
    populateHotelOptions(anyHotelOptions, index, slideshowParams, alSize);
    wholeContentDiv.removeChild(newHotelOptions);
  }, transitionDuration)
}

function letterDisappear(letter, transition, offset) {

  letter.style.transition = `all ${transition * 2 / 3}ms linear`;
  //STEP 1: move it up
  letter.style.transform = `translateY(${-offset}px)`;
  //STEP 2: fade out
  window.setTimeout(() => {
    letter.style.opacity =  0;
  }, transition / 3);

  window.setTimeout(() => {
    letter.style.transition = ``;
  }, transition);
}

function letterAppear(letter, transition, offset) {

  letter.style.transition = `transform ${transition * 2 / 3}ms cubic-bezier(0.64, 0.46, 0.4, 2.19), opacity ${transition * 2 / 3}ms linear`;
  //STEP 1: move it up
  letter.style.transform = `translateY(${-offset}px)`;
  //STEP 2: fade out
  letter.style.opacity =  1;

  window.setTimeout(() => {
    // letter.style.transition = ``;
  }, transition);
}


function scrollToFirstVideo() {
  CURRENT_INDEX++;
  console.log('yo');
  wholeContentDiv.scrollBy({
    left: 0,
    top: window.innerHeight,
    behavior: 'smooth'
  });

  playerPlay(player1);

}

/*------------------------------------*\
    EVENT LISTENERS
\*------------------------------------*/

window.addEventListener('keyup', function(e) {
    //Prevent scrolling when pressing space
  e.preventDefault();
  if (CURRENT_INDEX === numberOfSlides - 1) {
    return
  }
  startTransition(e);
})

wholeContentDiv.addEventListener('mousewheel', function(e) {
    e.preventDefault();

  startTransition(e);
})

document.querySelector('.scroll-btn').addEventListener('click', function(e) {
    e.preventDefault();

  startTransition(e);
})

export { totemDiv };
