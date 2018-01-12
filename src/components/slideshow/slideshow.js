'use strict';

/* ADVICE FOR SLIDESHOWS :
-> add class instead of CSS property when it's possible
-> add class to the direct element, not the motherDiv, when possible
-> for the fake DOM, use absolute position to have the minimum calculation as possible
-> use transitionend at the end of the transitions
-> create fragment instead of crete element: https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments
-> good advices hear : https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108
*/

// require('smoothscroll-polyfill').polyfill();   //https://github.com/iamdustan/smoothscroll for behavior: smooth when scrolling. But we never scroll here.
// import PerfectScrollbar from 'perfect-scrollbar';
import { playerLoad, playerPlay, playerPause, player1, player1firstStart, player2, player2firstStart  } from '../_video1';

/*------------------------------------*\
    VARIABLES & DATA
\*------------------------------------*/

//DATA
import { slideshowParams } from './_params';

//DOM
const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowDivBackground = document.querySelector(".slideshow__background");
const slideshowContentDiv = document.querySelector(".slideshow__content");
const slideshowBackupDiv = document.querySelector(".slideshow__backup--container");
// const totemDivs = Object.keys(slideshowParams).map(name => slideshowParams[name].totemDiv());
const movingCursorDiv = document.querySelector('.slideshow__cursor--moving');
const hotelOptions = [...document.querySelectorAll('.slideshow__description--options')];
const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const slideshowDescription = slideshowDiv.querySelector('.slideshow__description');
const dividerInDescription = slideshowDiv.querySelector('.slideshow__description--divider');
const video1Div = document.querySelector('#video1');
const video2Div = document.querySelector('#video2');
const video1iFrame = document.querySelector('.video__video1');
const video2iFrame = document.querySelector('.video__video2');
const hotelOptionsContainer = document.querySelector('.slideshow__description--optionsContainer');
const controlVideo1PointerEvents = document.querySelector('.video1').querySelector('.transparent_filter-for-allow-scrolling');
const controlVideo2PointerEvents = document.querySelector('.video2').querySelector('.transparent_filter-for-allow-scrolling');
//CSS
const cursorVerticalSpacing = 20;
const transitionDuration = 1600;  //A bit higher than the one in CSS for a proper totem transition
const transitionDurationBetweenVIdeos = 1000;  //A bit higher than the one in CSS for a proper totem transition

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
let CURRENT_INDEX = 0 ;
/*------------------------------------*/


/*------------------------------------*\
    INIT
\*------------------------------------*/

//function to use also on transition and init
function colorsChange(index) {
  const theme = Object.keys(slideshowParams)[index];

  /*  TEXTS COLOR  */
  slideshowDescription.style.color = slideshowParams[theme].textColor;
  dividerInDescription.style.borderColor = slideshowParams[theme].textColor;
  hotelOptions[index].style.color = slideshowParams[theme].textColor;

  /* BACKGROUND */
  slideshowDivBackground.style.backgroundColor = slideshowParams[theme].backgroundColor;
  movingCursorDiv.style.color = slideshowParams[theme].textColor;
  movingCursorDiv.style.borderColor = slideshowParams[theme].textColor;
}

//function to use also on transition and init
function cursorMove(index) {
  movingCursorDiv.style.transform = `translateY(${-cursorVerticalSpacing * index}px)`;
  movingCursorDiv.addEventListener('transitionend', endTransition, false);
}

function endTransition(e) {
  if (CURRENT_INDEX === (numberOfSlides - 1)) {
    playerLoad(player1);
    playerLoad(player2);
  }
  [slideshowDivBackground, movingCursorDiv, dividerInDescription, slideshowDescription].forEach(item => {
    item.classList.remove('inTransition');
  });
  resetHotelOptions(CURRENT_INDEX);
  movingCursorDiv.removeEventListener('transitionend', endTransition, false);
}

const init = (index) => {

  // const adjustedIndex = /*index - 1*/ index //if we use animationsController, we use index - 1;
  const theme = Object.keys(slideshowParams)[/*adjustedIndex*/index];
  // console.log(theme)

  // /*    SCROLLBAR   */
  // const ps = new PerfectScrollbar(wholeContentDiv, {
  //   handlers: ['click-rail', 'drag-thumb', 'keyboard', /*'wheel',*/ 'touch'],
  // });

  /* BACKGROUND AND TEXT COLORS */
  colorsChange(/*adjustedIndex*/index);

  /*  CURSOR  */
  cursorMove(/*adjustedIndex*/index);

  /*   TOTEM   */
  document.querySelector(`.totem_${theme}`).classList.add('showTotem');

  /*  OPTIONS  */
  document.querySelector(`.option_${theme}`).classList.add('showOption');
};
init(CURRENT_INDEX);


/*------------------------------------*\
    DOM STYLING
\*------------------------------------*/

/*------------------------------------*\
    DESCRIPTION POSITION
\*------------------------------------*/

hotelOptionsContainer.style.height = `${document.querySelector(`[data-hotel-option='${CURRENT_INDEX + 1}']`).getBoundingClientRect().height}px`

function alignDescriptionWithCursorOnMiddle () {
  const hotelOptionsContainerBottom = hotelOptionsContainer.getBoundingClientRect().bottom;
  const hotelDescriptionBottom = slideshowDescription.getBoundingClientRect().bottom;
  const differenceWithMiddle = hotelDescriptionBottom - hotelOptionsContainerBottom;
  slideshowDescription.style.marginBottom = `${-differenceWithMiddle}px`;
}

alignDescriptionWithCursorOnMiddle();
/*------------------------------------*\
    SLIDESHOW & SCROLLING
\*------------------------------------*/

let transitionStarted = transitionDurationBetweenVIdeos + 1;

function startTransitionSlideshow(e) {
  player1 ? console.log(player1.getState()) : console.log('player1 not yet loaded')

  //Prevent pressing any other key
  const minScroll = 100;
  const wheelIsNotEnough = (e.type === 'wheel') && ((e.deltaY < minScroll) && (e.deltaY > -minScroll))
  const keyPressedIsNoGood = (e.type === 'keyup') && (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32);
  if (keyPressedIsNoGood || wheelIsNotEnough) { 
    console.log('scroll more !!!!!!!')
    return; 
  } else {
    console.log('let\'s do something')
  }

  //EVENT CASES
  const eventCases = {
    wheeledUp: (e.type === 'wheel' && e.deltaY < 0),
    wheeledDown: (e.type === 'wheel' && e.deltaY > 0),
    keyDown: (e.type === 'keyup' && ((e.keyCode === 40) || (e.keyCode === 32))),
    keyUp: (e.type === 'keyup' && (e.keyCode === 38)),  //38 = arrow up
    clickedMouseForDown: (e.type === 'click' && e.srcElement.className === 'mouse'),
  };

  const eventGoUp = (eventCases.keyUp || eventCases.wheeledUp);
  const eventGoDown = (eventCases.keyDown || eventCases.wheeledDown || eventCases.clickedMouseForDown);

  //If portrait or mobile
  //Prevent transit while already transiting
  if (slideshowDivBackground.classList.contains('inTransition')) {
    console.log('case 1');
    return;
  } else if (eventGoUp && CURRENT_INDEX === 0) {
    console.log('case 2');
    return;
    /**** Transition in videos   ****/
    //From slideshow to first video
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides - 1)) {
    console.log('case 3');
    transitionStarted = Date.now();
    slideshowDiv.removeEventListener('wheel', startTransitionSlideshow);
    scrollFromSlideshowToFirstVideo();
    return;
    //From first video to slideshow
  } else if (eventGoUp && CURRENT_INDEX === (numberOfSlides)) {
    console.log('case 4');
    if (Date.now() - transitionStarted < 1000) {
      console.log('transition timing:', Date.now() - transitionStarted);
      return;
    } else {
      console.log('transition timing:', Date.now() - transitionStarted);
      transitionStarted = Date.now();
      scrollFromFirstVideoToSlideshow();
      slideshowDiv.addEventListener('wheel', startTransitionSlideshow);
    }
    return;
    //From first video to second video
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides)) {
    console.log('case 5');
    if (Date.now() - transitionStarted < 1000) {
      console.log('transition timing:', Date.now() - transitionStarted)
      return
    } else {
      transitionStarted = 0;
      scrollFromFirstToSecondVideo();
    }
    return;
    //From second video to first
  } else if (eventGoUp && CURRENT_INDEX === (numberOfSlides + 1)) {
    console.log('case 6');
    transitionStarted = Date.now();
    scrollFromSecondToFirstVideo();
    return;
    /**** Transition in slideshow   ****/
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides + 1)) {
    console.log('case 7');
    return;
  } else {
    console.log('case 8');
    if (Date.now() - transitionStarted < 1000) {
      return; 
    } else {
      transitionStarted = transitionDurationBetweenVIdeos + 1;
      [slideshowDivBackground, movingCursorDiv, dividerInDescription, slideshowDescription].forEach(item => {
        item.classList.add('inTransition');
      });
    };
  }

  if (!wholeContentDiv.classList.contains('slideshow__landscape')) {
    return
  }
  // console.log(CURRENT_INDEX)
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
  totemMove(previousIndex, CURRENT_INDEX, direction);

  //Hotel Options change
  hotelOptionsTransit(e, previousIndex, CURRENT_INDEX, hotelOptions, direction);

  //Background color change
  colorsChange(CURRENT_INDEX);
}


/*----- TOTEM FUNCTIONS-----*/

function totemMove(prevIndex, nextIndex, direction) {
  const up = direction === 'up' ? true : false;

  const prevTheme = Object.keys(slideshowParams)[prevIndex];
  const nextTheme = Object.keys(slideshowParams)[nextIndex];

  const prevTotemDiv = document.querySelector(`.totem_${prevTheme}`);
  const nextTotemDiv = document.querySelector(`.totem_${nextTheme}`);


  nextTotemDiv.classList.add(up ? 'fakeTotemUp' : 'fakeTotemDown');
  nextTotemDiv.classList.add('showTotem');
  nextTotemDiv.classList.add('perpetual-translation');
  prevTotemDiv.classList.add(up ? 'totemOnTransitionUp' : 'totemOnTransitionDown');

  prevTotemDiv.addEventListener('animationend', removeTotemClasses); 
  nextTotemDiv.addEventListener('animationend', removeTotemClasses); 
};

function removeTotemClasses (e) {
  console.log(this)
  this.classList.remove('fakeTotemUp');
  this.classList.remove('fakeTotemDown');
  if (this.classList.contains('totemOnTransitionUp') || this.classList.contains('totemOnTransitionDown')) {
    this.classList.remove('showTotem');
    this.classList.remove('perpetual-translation');
    this.classList.remove('totemOnTransitionUp');
    this.classList.remove('totemOnTransitionDown');
  }
  this.removeEventListener('animationend', removeTotemClasses); 
}



/*------ HOTEL OPTIONS FUNCTIONS ------*/
function hotelOptionsTransit(e, prevIndex, nextIndex, anyHotelOptions, direction) {

  const up = direction === 'up' ? true : false;

  const prevOptionLettersDiv = anyHotelOptions[prevIndex];
  const prevOptionLetters = [...prevOptionLettersDiv.children];
  for (let i = 0; i < prevOptionLetters.length; i++) {
    const letter = prevOptionLetters[i];
    up ? letter.classList.add(`fade-out-letter-up-${i + 1}`) : letter.classList.add(`fade-out-letter-down-${i + 1}`);
  }

  const nextOptionLettersDiv = anyHotelOptions[nextIndex];
  nextOptionLettersDiv.classList.add('showOption');
  nextOptionLettersDiv.classList.add('perpetual-translation');
  const nextOptionLetters = [...nextOptionLettersDiv.children]

  for (let j = 0; j < nextOptionLetters.length; j++) {
    const letter = nextOptionLetters[j];
    up ? letter.classList.add(`fade-in-letter-up-${j + 1}`) : letter.classList.add(`fade-in-letter-down-${j + 1}`);
  }
}


function resetHotelOptions(index){
  hotelOptions.forEach(option => {
    const optionIsVisible = option.classList.contains('showOption');
    const optionNeedToStayVisible = hotelOptions.indexOf(option) === index;
    const letters = [...option.children];
    if (optionIsVisible) {
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letter.classList.remove(`fade-in-letter-up-${i + 1}`);
        letter.classList.remove(`fade-in-letter-down-${i + 1}`);
        letter.classList.remove(`fade-out-letter-up-${i + 1}`);
        letter.classList.remove(`fade-out-letter-down-${i + 1}`);
      }
      if (!optionNeedToStayVisible) {
        option.classList.remove('showOption');
        option.classList.remove('perpetual-translation');
      } else {
        return;
      }
    } else {
      return;
    };
  });
};


/*------ SCROLLING FUNCTIONS ------*/
function scrollFromSlideshowToFirstVideo() {
  CURRENT_INDEX++;
  console.log('first video');
  // [...wholeContent.children].forEach(child => child.classList.remove('perpetual-translation'));
  wholeContent.classList.add('from_slideshow_to_first_video');
  wholeContent.classList.remove('from_first_video_to_slideshow');
  wholeContent.classList.remove('from_first_video_to_second_video');
  wholeContent.classList.remove('from_second_video_to_first_video');


  controlVideo1PointerEvents.addEventListener('wheel', startTransitionSlideshow);
  playerPlay(player1);
}

// function allowScrolling(e) {
//   if (e.animationName === 'from-slideshow-to-firstVideo') {
//     console.log('on autorise le scrolling');
//     wholeContent.style.animationPlayState = 'paused';
//     wholeContent.removeEventListener('animationend', allowScrolling);
//   } else {
//     console.log(e)
//     console.log(e.animationName)
//     return;
//   };

// }

function scrollFromFirstVideoToSlideshow() {
  CURRENT_INDEX--;
  console.log('first video');

  wholeContent.classList.remove('from_slideshow_to_first_video');
  wholeContent.classList.add('from_first_video_to_slideshow');
  wholeContent.classList.remove('from_first_video_to_second_video');
  wholeContent.classList.remove('from_second_video_to_first_video');

  playerPause(player1);
  wholeContent.addEventListener('animationend', getOutOfVideos);

  controlVideo1PointerEvents.removeEventListener('wheel', startTransitionSlideshow);

}

function scrollFromFirstToSecondVideo() {
  CURRENT_INDEX++;
  console.log('second video');

  wholeContent.classList.remove('from_slideshow_to_first_video');
  wholeContent.classList.remove('from_first_video_to_slideshow');
  wholeContent.classList.add('from_first_video_to_second_video');
  wholeContent.classList.remove('from_second_video_to_first_video');
  playerPlay(player2);
  playerPause(player1);
}

function scrollFromSecondToFirstVideo() {
  CURRENT_INDEX--;
  console.log('from second video to first');

  wholeContent.classList.remove('from_slideshow_to_first_video');
  wholeContent.classList.remove('from_first_video_to_slideshow');
  wholeContent.classList.remove('from_first_video_to_second_video');
  wholeContent.classList.add('from_second_video_to_first_video');
  playerPlay(player1);
  playerPause(player2);
}

function getOutOfVideos() {
  wholeContent.classList.remove('from_slideshow_to_first_video');
  wholeContent.classList.remove('from_first_video_to_slideshow');
  wholeContent.classList.remove('from_first_video_to_second_video');
  wholeContent.classList.remove('from_second_video_to_first_video');
  wholeContent.removeEventListener('animationend', getOutOfVideos);
}


function togglePlayPause() {
  if (this.classList.contains('video1')) {
    player1.getState() === 'playing' ? playerPause(player1) : playerPlay(player1);
  } else if (this.classList.contains('video2')) {
    player2.getState() === 'playing' ? playerPause(player2) : playerPlay(player2);
  }
}
/*------------------------------------*\
    EVENT LISTENERS
\*------------------------------------*/

window.addEventListener('keyup', startTransitionSlideshow);
slideshowDiv.addEventListener('wheel', startTransitionSlideshow);
document.querySelector('.scroll-btn').addEventListener('click', startTransitionSlideshow);
video1Div.addEventListener('wheel', startTransitionSlideshow);
video2Div.addEventListener('wheel', startTransitionSlideshow);

controlVideo1PointerEvents.addEventListener('click', togglePlayPause);
controlVideo2PointerEvents.addEventListener('click', togglePlayPause);

export { totemDiv };
