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
import PerfectScrollbar from 'perfect-scrollbar';
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
const hotelEstablishmentName = document.querySelector('.slideshow__description--establishment-name');
const slideshowDescription = slideshowDiv.querySelector('.slideshow__description');
const dividerInDescription = slideshowDiv.querySelector('.slideshow__description--divider');
const video1Div = document.querySelector('#video1');
const video2Div = document.querySelector('#video2');
const video1iFrame = document.querySelector('.video__video1');
const video2iFrame = document.querySelector('.video__video2');
const hotelOptionsContainer = document.querySelector('.slideshow__description--optionsContainer');
const controlVideo1PointerEvents = document.querySelector('.video1').querySelector('.transparent_filter-for-allow-scrolling');
const controlVideo2PointerEvents = document.querySelector('.video2').querySelector('.transparent_filter-for-allow-scrolling');
const footer = document.querySelector('.footer');
const closeFooter = footer.querySelector('.footer-cross');

let allLetters;
//CSS
const cursorVerticalSpacing = 20;
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
  const ps = new PerfectScrollbar(footer, {
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  });

  /* BACKGROUND AND TEXT COLORS */
  colorsChange(/*adjustedIndex*/index);

  /*  CURSOR  */
  cursorMove(/*adjustedIndex*/index);

  /*   TOTEM   */
  document.querySelector(`.totem_${theme}`).classList.add('showTotem');
  document.querySelector(`.totem_${theme}`).addEventListener('animationend', removeInitAnimationClasses);
  document.querySelector(`.totem_${theme}`).classList.add('perpetual-translation');

  /*  OPTIONS  */
  document.querySelector(`.option_${theme}`).classList.add('showOption');

  //REMOVE ALL CLASSES AFTER ENTRANCE
  //Get hotel letters
  const nameLetters = [];
  const hotelEstablishmentName = document.querySelector('.slideshow__description--establishment-name');
  [...hotelEstablishmentName.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

  //Get slogan letters
  const hotelSlogan = document.querySelector('.slideshow__description--slogan');
  const sloganLetters = [...hotelSlogan.children];

  //Get option letters
  const hotelOption = document.querySelector('.showOption');
  const optionLetters = [...hotelOption.children];

  //Gather all letters
  allLetters = [...nameLetters, ...optionLetters, ...sloganLetters];
  for (var i = 0; i < allLetters.length; i++) {
    allLetters[i].addEventListener('animationend', removeInitAnimationClasses)
  }
};
init(CURRENT_INDEX);

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
  this.classList.remove('init');
  this.classList.remove('coming-in');
  this.removeEventListener('animationend', removeInitForDivider);
}

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
let firstScrollTimeStamp = 0;
let wheelIsNotEnough = false;

function startTransitionSlideshow(e) {
  // player1 ? '': throw new Error('Video not loaded')
  //Prevent transit while already transiting
  if (slideshowDivBackground.classList.contains('inTransition') || dividerInDescription.classList.contains('inTransition')) {
    console.log('case 1');
    return;
  };
  //Prevent pressing any other key
  const minScroll = 100;
  let smallScroll = ((e.deltaY < minScroll) && (e.deltaY > -minScroll));

  if ((e.type === 'wheel') && firstScrollTimeStamp === 0) { 
    //The first time we scroll, we take a snapshot of when it happened
    firstScrollTimeStamp = e.timeStamp;
    //We launch the transition again if it was the only scroll
    window.setTimeout(() => {
      startTransitionSlideshow(e);
    }, 300)
    return;
    //This will happen only after the first time
  } else if ((e.type === 'wheel') && firstScrollTimeStamp > 0) {

    //If there has been another scroll, but small, in a really short time. Maybe it's because the user wants to scroll ? Let's see...
    if (smallScroll && ((e.timeStamp - firstScrollTimeStamp) > 0) && ((firstScrollTimeStamp - e.timeStamp) < 150)) {
      window.setTimeout(() => {
        startTransitionSlideshow(e);
      }, 300)
      return;
    } else if (smallScroll) {
      wheelIsNotEnough = true;
    } else {
      wheelIsNotEnough = false;
    }
  }
  // const wheelIsNotEnough = (e.type === 'wheel') && (e.timeStamp - firstScrollTimeStamp < 150) && ((e.deltaY < minScroll) && (e.deltaY > -minScroll)) ;
  const keyPressedIsNoGood = (e.type === 'keyup') && (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32);
  if (keyPressedIsNoGood) { 
    return; 
  };

  //EVENT CASES
  const eventCases = {
    wheeledUp: (e.type === 'wheel' && e.deltaY < 0),
    wheeledDown: (e.type === 'wheel' && e.deltaY > 0),
    keyDown: (e.type === 'keyup' && ((e.keyCode === 40) || (e.keyCode === 32))),
    keyUp: (e.type === 'keyup' && (e.keyCode === 38)),  //38 = arrow up
    clickedMouseForDown: (e.type === 'click' && e.srcElement.className === 'mouse'),
    clickedCrossForUp: (e.type === 'click' && e.srcElement.nodeName === 'svg'),
  };

  const eventGoUp = (eventCases.keyUp || eventCases.wheeledUp || eventCases.clickedCrossForUp);
  const eventGoDown = (eventCases.keyDown || eventCases.wheeledDown || eventCases.clickedMouseForDown);

  //If portrait or mobile
 if (eventGoUp && CURRENT_INDEX === 0) {
    console.log('case 2');
    return;
  /**** Transition in videos   ****/
  //From slideshow to first video
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides - 1)) {
    console.log('case 3');
    //We keep in mind we started transition
    transitionStarted = Date.now();
    //We keep the totem slideshow mute from scrolling
    slideshowDiv.removeEventListener('wheel', startTransitionSlideshow);
    //We do what we need to do
    scrollFromSlideshowToFirstVideo();
    return;
  //From first video to slideshow
  } else if (eventGoUp && CURRENT_INDEX === (numberOfSlides)) {
    console.log('case 4');
    //If case 6, we prevent to scroll directly more up and go to case 4
    if (Date.now() - transitionStarted < 1000) {
      return;
    } else {
      //We keep in mind we started transition
      transitionStarted = Date.now();
      //We do what we need to do
      scrollFromFirstVideoToSlideshow();
      //We restart the totem slideshow from scrolling
      slideshowDiv.addEventListener('wheel', startTransitionSlideshow);
    }
    return;
  //From first video to second video
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides)) {
    console.log('case 5');
    //If case 3, we prevent to scroll directly more down and go to case 5
    if (Date.now() - transitionStarted < 1000) {
      return
    } else {
      //We keep in mind we started transition
      transitionStarted = Date.now();
      //We do what we need to do
      scrollFromFirstToSecondVideo();
      return;
    }
  //From second video to first
  } else if (eventGoUp && CURRENT_INDEX === (numberOfSlides + 1)) {
    console.log('case 6');
    //If case 8, we prevent to scroll directly more up and go to case 6
    if (Date.now() - transitionStarted < 1000) {
      return;
    } else {
      //We keep in mind we started transition
      transitionStarted = Date.now();
      //We do what we need to do
      scrollFromSecondToFirstVideo();
      return;
    }
    //From second video to footer
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides + 1)) {
    console.log('case 7');
    //If case 5, we prevent to scroll directly more down and go to case 7
    if (Date.now() - transitionStarted < 1000) {
      return;
    } else {
      //There is nothing more to show after this, so no need to keep in mind we started transition
      transitionStarted = 0;
      //We do what we need to do
      showFooter();
      return;
    }
  //From footer to second video
  } else if (eventGoUp && CURRENT_INDEX === (numberOfSlides + 2)) {
    console.log('case 6');
    transitionStarted = Date.now();
    hideFooter();
    return;
    //From second video to footer
  }else if (eventGoDown && CURRENT_INDEX === (numberOfSlides + 2)) {
    console.log('case 9');
    return;
  /**** Transition in slideshow   ****/
  } else if (wheelIsNotEnough) {
    if (dividerInDescription.classList.contains('inTransition')) {
      return;
    } else {
      //Tell everybody we started the transition and prevent any other transition
      dividerInDescription.classList.add('inTransition');
      //Remove the wheel event while we fake moving
      slideshowDiv.removeEventListener('wheel', startTransitionSlideshow);
      firstScrollTimeStamp = 0;
      wheelIsNotEnough = false;
      fakeScroll(e);
      return;
    }
  } else {
    firstScrollTimeStamp = 0;
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

function fakeScroll (e) {
  allLetters = [];

  //Get hotel letters
  const nameLetters = [];
  const hotelEstablishmentName = document.querySelector('.slideshow__description--establishment-name');
  [...hotelEstablishmentName.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

  //Get slogan letters
  const hotelSlogan = document.querySelector('.slideshow__description--slogan');
  const sloganLetters = [...hotelSlogan.children];

  //Get option letters
  const hotelOption = document.querySelector('.showOption');
  const optionLetters = [...hotelOption.children];

  //Gather all letters
  allLetters = [...nameLetters, ...optionLetters, ...sloganLetters];
  for (var i = 0; i < allLetters.length; i++) {
    e.deltaY > 0 
      ? allLetters[i].classList.add(`move-letter-up-first-${i + 1}`)
      : allLetters[i].classList.add(`move-letter-down-first-${i + 1}`);
      if (i === allLetters.length - 1) {
        allLetters[i].addEventListener('animationend', removeFakeScroll);
      };
  };
};

function removeFakeScroll (e) {

  for (var i = 0; i < allLetters.length; i++) {
    allLetters[i].classList.remove(`move-letter-down-first-${i + 1}`);
    allLetters[i].classList.remove(`move-letter-up-first-${i + 1}`);
  }
  if (this === allLetters[allLetters.length - 1]) {
    this.removeEventListener('animationend', removeFakeScroll);
    dividerInDescription.addEventListener('animationend', removeTransitForDivider);
    // dividerInDescription.addEventListener('animationend', removeTransitForDivider);
  }
  this.removeEventListener('animationend', removeFakeScroll);
}

function removeTransitForDivider() {
  dividerInDescription.classList.remove('inTransition');
  dividerInDescription.removeEventListener('animationend', removeTransitForDivider);
  slideshowDiv.addEventListener('wheel', startTransitionSlideshow);
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

  /****** DOM *******/
  const nameLetters = [];
  [...hotelEstablishmentName.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));
  const nameLength = nameLetters.length;
  const sloganLetters = [...hotelSlogan.children];

  const prevOptionLettersDiv = anyHotelOptions[prevIndex];
  const prevOptionLetters = [...prevOptionLettersDiv.children];
  const prevOptionLength = prevOptionLetters.length;

  const nextOptionLettersDiv = anyHotelOptions[nextIndex];
  const nextOptionLetters = [...nextOptionLettersDiv.children];

  /******   NAME    ******/
  for (var k = 0; k < nameLength; k++) {
    const letter = nameLetters[k];
    up 
      ? letter.classList.add(`move-letter-up-first-${k + 1}`) 
      : letter.classList.add(`move-letter-down-first-${k + 1}`);
  }
  
  /******   CURRENT OPTION   ******/
  for (let i = 0; i < prevOptionLength; i++) {
    const letter = prevOptionLetters[i];
    up 
      ? letter.classList.add(`fade-out-letter-up-${i + nameLength + 1}`) 
      : letter.classList.add(`fade-out-letter-down-${i + nameLength + 1}`);
  }

  /******   NEXT OPTION   ******/
  nextOptionLettersDiv.classList.add('showOption');
  nextOptionLettersDiv.classList.add('perpetual-translation');

  for (let j = 0; j < nextOptionLetters.length; j++) {
    const letter = nextOptionLetters[j];
    up 
      ? letter.classList.add(`fade-in-letter-up-${j + nameLength + 1}`) 
      : letter.classList.add(`fade-in-letter-down-${j + nameLength + 1}`);
  }

  /****** SLOGAN ************/
  for (var h = 0; h < sloganLetters.length; h++) {
    const letter = sloganLetters[h];
    up 
      ? letter.classList.add(`move-letter-up-first-${h + nameLength + prevOptionLength + 1}`) 
      : letter.classList.add(`move-letter-down-first-${h + nameLength + prevOptionLength + 1}`);
  }
}

function resetHotelOptions(index){
  /****** DOM *******/
  const nameLetters = [];
  [...hotelEstablishmentName.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));
  const nameLength = nameLetters.length;
  const sloganLetters = [...hotelSlogan.children];
  let prevOptionLength;

  /******   NAME    ******/
  for (var k = 0; k < nameLength; k++) {
    const letter = nameLetters[k];
    letter.classList.remove(`move-letter-up-first-${k + 1}`);
    letter.classList.remove(`move-letter-down-first-${k + 1}`);
  }
  
  hotelOptions.forEach(option => {
    const optionIsVisible = option.classList.contains('showOption');
    const optionNeedToStayVisible = hotelOptions.indexOf(option) === index;
    const letters = [...option.children];
    if (optionIsVisible && !optionNeedToStayVisible) {
      prevOptionLength = [...option.children].length;
    }
    if (optionIsVisible) {
      /******   NEXT OPTION   ******/
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letter.classList.remove(`fade-in-letter-up-${i + nameLength + 1}`);
        letter.classList.remove(`fade-in-letter-down-${i + nameLength + 1}`);
        letter.classList.remove(`fade-out-letter-up-${i + nameLength + 1}`);
        letter.classList.remove(`fade-out-letter-down-${i + nameLength + 1}`);
      }
      if (!optionNeedToStayVisible) {
      /******   CURRENT OPTION   ******/
        option.classList.remove('showOption');
        option.classList.remove('perpetual-translation');
      } else {
        return;
      }
    } else {
      return;
    };
  });
  /****** SLOGAN ************/
  for (var h = 0; h < sloganLetters.length; h++) {
    const letter = sloganLetters[h];
    letter.classList.remove(`move-letter-up-first-${h + nameLength + prevOptionLength + 1}`);
    letter.classList.remove(`move-letter-down-first-${h + nameLength + prevOptionLength + 1}`);
  }
};


/*------ SCROLLING FUNCTIONS ------*/
function scrollFromSlideshowToFirstVideo() {
  CURRENT_INDEX++;
  // [...wholeContent.children].forEach(child => child.classList.remove('perpetual-translation'));
  wholeContent.classList.add('from_slideshow_to_first_video');
  wholeContent.classList.remove('from_first_video_to_slideshow');
  wholeContent.classList.remove('from_first_video_to_second_video');
  wholeContent.classList.remove('from_second_video_to_first_video');


  controlVideo1PointerEvents.addEventListener('wheel', startTransitionSlideshow);
  playerPlay(player1);
}

function scrollFromFirstVideoToSlideshow() {
  CURRENT_INDEX--;

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

  wholeContent.classList.remove('from_slideshow_to_first_video');
  wholeContent.classList.remove('from_first_video_to_slideshow');
  wholeContent.classList.add('from_first_video_to_second_video');
  wholeContent.classList.remove('from_second_video_to_first_video');
  playerPlay(player2);
  playerPause(player1);
}

function scrollFromSecondToFirstVideo() {
  CURRENT_INDEX--;

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

function showFooter () {
  CURRENT_INDEX++;
  footer.classList.add('visible');
}

function hideFooter () {
  CURRENT_INDEX--;
  footer.classList.remove('visible');
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

closeFooter.addEventListener('click', startTransitionSlideshow);
// export { totemDiv };
