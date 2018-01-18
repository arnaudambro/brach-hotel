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
import { mqsm } from '../DOMStyling';

//DOM
const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowDivBackgroundLandscape = document.querySelector(".slideshow__background.landscape");
const movingCursorDiv = document.querySelector('.slideshow__cursor--moving');
const hotelOptions = [...document.querySelectorAll('.slideshow__description--options.landscape')];
const hotelSloganLandscape = slideshowDiv.querySelector('.slideshow__description--slogan.landscape');
const hotelEstablishmentNameLandscape = slideshowDiv.querySelector('.slideshow__description--establishment-name');
const slideshowDescriptionLandscape = slideshowDiv.querySelector('.slideshow__description.landscape');
const dividerInDescriptionLandscape = slideshowDiv.querySelector('.slideshow__description--divider.landscape');
const video1Div = document.querySelector('#video1');
const video2Div = document.querySelector('#video2');
const video1iFrame = document.querySelector('.video__video1');
const video2iFrame = document.querySelector('.video__video2');
const controlVideo1PointerEvents = document.querySelector('.video1').querySelector('.transparent_filter-for-allow-scrolling');
const controlVideo2PointerEvents = document.querySelector('.video2').querySelector('.transparent_filter-for-allow-scrolling');
const footer = document.querySelector('.footer');
const closeFooter = footer.querySelector('.footer-cross');
const animVideo = document.querySelector('#video-anim');
const slideshowBackup = document.querySelector('.slideshow__backup');

let allLetters;
//CSS
const cursorVerticalSpacing = 20;
const transitionDurationBetweenVIdeos = 1000;  //A bit higher than the one in CSS for a proper totem transition

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
    /*  CURSOR  SHADOW */
// movingCursorDiv.style.boxShadow = `0px ${(cursorVerticalSpacing * 0)}px, 0px ${(cursorVerticalSpacing * 1)}px, 0px ${(cursorVerticalSpacing * 2)}px, 0px ${(cursorVerticalSpacing * 3)}px, 0px ${(cursorVerticalSpacing * 4)}px, 0px ${(cursorVerticalSpacing * 5)}px, 0px ${(cursorVerticalSpacing * 6)}px`;
movingCursorDiv.style.height = `${(numberOfSlides - 1) * (cursorVerticalSpacing) + 2}px`;


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
  slideshowDescriptionLandscape.style.color = slideshowParams[theme].textColor;
  dividerInDescriptionLandscape.style.borderColor = slideshowParams[theme].textColor;
  hotelOptions[index].style.color = slideshowParams[theme].textColor;


  /* BACKGROUND */
  slideshowDivBackgroundLandscape.style.backgroundColor = slideshowParams[theme].backgroundColor;

  /* CURSOR  */
  movingCursorDiv.querySelectorAll('.cursor').forEach(cursor => cursor.style.color = slideshowParams[theme].textColor);
  movingCursorDiv.querySelectorAll('.cursor').forEach(cursor => cursor.style.borderColor = slideshowParams[theme].textColor);

  /* BACKUP */
  Object.keys(slideshowParams).map(theme =>  {
    const option = slideshowBackup.querySelector(`.slideshow__description.option_${theme}`);
    option.style.color = slideshowParams[theme].textColor;
    option.querySelector('.slideshow__description--divider').style.borderColor = slideshowParams[theme].textColor;

    const background = slideshowBackup.querySelector(`.slideshow__background--${theme}`);
    background.style.backgroundColor = slideshowParams[theme].backgroundColor;
  })
}

//function to use also on transition and init
function cursorMove(index) {
  movingCursorDiv.style.transform = `translateY(${-cursorVerticalSpacing * index}px)`;
  movingCursorDiv.addEventListener('transitionend', endTransition, false);
}

function endTransition(e) {
  if (CURRENT_INDEX === (numberOfSlides - 1)  && (!player1.videoId)) {
    playerLoad(player1);
    playerLoad(player2);
  }
  [slideshowDivBackgroundLandscape, movingCursorDiv, dividerInDescriptionLandscape, slideshowDescriptionLandscape].forEach(item => {
    item.classList.remove('inTransition');
  });
  resetHotelOptions(CURRENT_INDEX);
  movingCursorDiv.removeEventListener('transitionend', endTransition, false);
}

function init(index) {
  // console.log('init');
  const initPromise = new Promise ((res, rej) => {
    // const adjustedIndex = /*index - 1*/ index //if we use animationsController, we use index - 1;
    const theme = Object.keys(slideshowParams)[/*adjustedIndex*/index];

    // /*    SCROLLBAR   */
    const ps = new PerfectScrollbar(footer, {
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      suppressScrollX: true
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
    [...hotelEstablishmentNameLandscape.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

    //Get slogan letters
    const hotelSloganLandscape = document.querySelector('.slideshow__description--slogan');
    const sloganLetters = [...hotelSloganLandscape.children];

    //Get option letters
    const hotelOption = document.querySelector('.showOption');
    const optionLetters = [...hotelOption.children];

    //Gather all letters
    allLetters = [...nameLetters, ...optionLetters, ...sloganLetters];
    for (let index = 0; index < allLetters.length; index++) {
      allLetters[index].addEventListener('animationend', removeInitAnimationClasses)
      if (index === (allLetters.length - 1)) {
        res(index);
      }
    }
    rej('it didn\'t work there');
    
  })
};

function removeInitAnimationClasses() {
  //For hotel description (slogan, name and option)
  for (let index = 0; index < allLetters.length; index++) {
    this.classList.remove(`fade-in-letter-up-${index + 1}`);
  }

  //For totem
  this.classList.remove('fakeTotemUp');
  //For divider in
  if (this === allLetters[allLetters.length - 1]) {

  }
  //FOr everybody
  this.removeEventListener('animationend', removeInitAnimationClasses);
}

function removeInitForDivider() {
  // console.log('we remove the init for divider');
  // if (dividerInDescriptionLandscape.classList.contains('inTransition') && !dividerInDescriptionLandscape.classList.contains('coming-in')) {
  //   console.log('end of first transition');
  //   dividerInDescriptionLandscape.classList.add('coming-in');
  // } else {
  //   console.log('end of second transition');
    this.classList.remove('init');
    this.classList.remove('coming-in');
    this.removeEventListener('animationend', removeInitForDivider);
  // }
}


/*------------------------------------*\
    SLIDESHOW & SCROLLING
\*------------------------------------*/

let transitionStarted = transitionDurationBetweenVIdeos + 1;
let firstScrollTimeStamp = 0;
let wheelIsNotEnough = false;
let touchYOnScreen = 0;

function startTransitionSlideshow(e) {
  if (document.body.classList.contains('portrait') || slideshowDivBackgroundLandscape.classList.contains('inTransition') || dividerInDescriptionLandscape.classList.contains('inTransition')) {
    // console.log('case 1');
    return;
  } 
  // console.log(e);
  e.preventDefault();
  // player1 ? '': throw new Error('Video not loaded')
  //Prevent transit while already transiting
  if (e.type === "touchstart") {
    // console.log('touchstart');
    touchYOnScreen = e.changedTouches[0].clientY;
    return;
  } else if (e.type === "touchend" && e.changedTouches[0].clientY === touchYOnScreen) {
    // console.log('touchend same same');
    return;
  }
  //Prevent pressing any other key
  const minScroll = 8;
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
    clickedMouseForDown: ((e.type === 'click' && e.srcElement.className === 'mouse') || (e.type === 'touchend') && e.srcElement.className === 'mouse'),
    clickedCrossForUp: ((e.type === 'click' && e.srcElement.nodeName === 'svg') || (e.type === 'touchend') && (e.srcElement.nodeName === 'svg')),
    touchedForDown: (e.type === 'touchend' && e.changedTouches[0].clientY < touchYOnScreen),
    touchedForUp: (e.type === 'touchend' && e.changedTouches[0].clientY > touchYOnScreen)
  };

  const eventGoUp = (eventCases.keyUp || eventCases.wheeledUp || eventCases.clickedCrossForUp || eventCases.touchedForUp);
  const eventGoDown = (eventCases.keyDown || eventCases.wheeledDown || eventCases.clickedMouseForDown || eventCases.touchedForDown);

  // console.log(`CURRENT_INDEX: ${CURRENT_INDEX}`);
  // console.log(`eventGoUp: ${eventGoUp}`);
  // console.log(`eventGoDown: ${eventGoDown}`);
  //If portrait or mobile
 if (eventGoUp && CURRENT_INDEX === 0) {
    // console.log('case 2');
    return;
  /**** Transition in videos   ****/
  //From slideshow to first video
  } else if (eventGoDown && CURRENT_INDEX === (numberOfSlides - 1)) {
    // console.log('case 3');
    //If case 5, we prevent to scroll directly more down and go to case 3
    if (Date.now() - transitionStarted < 1000) {
      return;
    } else {
      //We keep in mind we started transition
      transitionStarted = Date.now();
      //We keep the totem slideshow mute from scrolling
      slideshowDiv.removeEventListener('wheel', startTransitionSlideshow);
      //We do what we need to do
      scrollFromSlideshowToFirstVideo();
      return;
    }
  //From first video to slideshow
  } else if (eventGoUp && CURRENT_INDEX === (numberOfSlides)) {
    // console.log('case 4');
    //If case 6, we prevent to scroll directly more up and go to case 4
    if (Date.now() - transitionStarted < transitionDurationBetweenVIdeos + 100) {
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
    // console.log('case 5');
    //If case 3, we prevent to scroll directly more down and go to case 5
    if (Date.now() - transitionStarted < transitionDurationBetweenVIdeos + 100) {
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
    // console.log('case 6');
    //If case 8, we prevent to scroll directly more up and go to case 6
    if (Date.now() - transitionStarted < transitionDurationBetweenVIdeos + 100) {
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
    // console.log('case 7');
    //If case 5, we prevent to scroll directly more down and go to case 7
    if (Date.now() - transitionStarted < transitionDurationBetweenVIdeos + 100) {
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
    // console.log('case 8');
    transitionStarted = Date.now();
    hideFooter();
    return;
    //From second video to footer
  }else if (eventGoDown && CURRENT_INDEX === (numberOfSlides + 2)) {
    // console.log('case 9');
    return;
  /**** Transition in slideshow   ****/
  } else if (wheelIsNotEnough) {
    // console.log('case 10');
    if (dividerInDescriptionLandscape.classList.contains('inTransition')) {
      return;
    } else {
      //Tell everybody we started the transition and prevent any other transition
      dividerInDescriptionLandscape.classList.add('inTransition');
      //Remove the wheel event while we fake moving
      slideshowDiv.removeEventListener('wheel', startTransitionSlideshow);
      firstScrollTimeStamp = 0;
      wheelIsNotEnough = false;
      fakeScroll(e);
      return;
    }
  } else {
    // console.log('case 11');
    firstScrollTimeStamp = 0;
    if (Date.now() - transitionStarted < transitionDurationBetweenVIdeos + 100) {
      return; 
    } else {
      transitionStarted = transitionDurationBetweenVIdeos + 1;
      [slideshowDivBackgroundLandscape, movingCursorDiv, dividerInDescriptionLandscape, slideshowDescriptionLandscape].forEach(item => {
        item.classList.add('inTransition');
        dividerInDescriptionLandscape.addEventListener('animationend', removeInitForDivider);
      });
    };
  }

  // if (!wholeContentDiv.classList.contains('slideshow__landscape')) {
  //   return
  // }
  const previousIndex = CURRENT_INDEX;
  let direction;
  if (eventGoUp && CURRENT_INDEX > 0 && CURRENT_INDEX < numberOfSlides) { 
    CURRENT_INDEX--;
    direction = 'down';
  } else if (eventGoDown && CURRENT_INDEX < numberOfSlides)  {
    CURRENT_INDEX === numberOfSlides - 1 ? CURRENT_INDEX = 0 : CURRENT_INDEX++;
    direction = 'up';
  } else if (e.target.classList.contains('cursor')) {
    // console.log(e.target);
    // debugger;
    CURRENT_INDEX < parseInt(e.target.dataset.slideposition) ? direction = 'up' : direction = 'down';
    CURRENT_INDEX = parseInt(e.target.dataset.slideposition);
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

  //Get totem
  e.deltaY > 0
    ? document.querySelector('.showTotem').classList.add(`move-letter-up-first-1`)
    : document.querySelector('.showTotem').classList.add(`move-letter-down-first-1`);

  //Get hotel letters
  const nameLetters = [];
  [...hotelEstablishmentNameLandscape.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

  //Get slogan letters
  const hotelSloganLandscape = document.querySelector('.slideshow__description--slogan');
  const sloganLetters = [...hotelSloganLandscape.children];

  //Get option letters
  const hotelOption = document.querySelector('.showOption');
  const optionLetters = [...hotelOption.children];

  //Gather all letters
  allLetters = [...nameLetters, ...optionLetters, ...sloganLetters];
  for (let index = 0; index < allLetters.length; index++) {
    e.deltaY > 0 
      ? allLetters[index].classList.add(`move-letter-up-first-${index + 1}`)
      : allLetters[index].classList.add(`move-letter-down-first-${index + 1}`);
      if (index === allLetters.length - 1) {
        allLetters[index].addEventListener('animationend', removeFakeScroll);
      };
  };

};

function removeFakeScroll (e) {
  // debugger
  document.querySelector('.showTotem').classList.remove(`move-letter-up-first-1`);
  document.querySelector('.showTotem').classList.remove(`move-letter-down-first-1`);
  for (let index = 0; index < allLetters.length; index++) {
    allLetters[index].classList.remove(`move-letter-down-first-${index + 1}`);
    allLetters[index].classList.remove(`move-letter-up-first-${index + 1}`);
  }
  if (this === allLetters[allLetters.length - 1]) {
    this.removeEventListener('animationend', removeFakeScroll);
    dividerInDescriptionLandscape.addEventListener('animationend', removeTransitForDivider);
    // dividerInDescriptionLandscape.addEventListener('animationend', removeTransitForDivider);
  }
  this.removeEventListener('animationend', removeFakeScroll);
}

function removeTransitForDivider() {
  dividerInDescriptionLandscape.classList.remove('inTransition');
  dividerInDescriptionLandscape.removeEventListener('animationend', removeTransitForDivider);
  slideshowDiv.addEventListener('wheel', startTransitionSlideshow);
}

/*----- TOTEM FUNCTIONS-----*/

function totemMove(prevIndex, nextIndex, direction) {
  const up = direction === 'up' ? true : false;

  const prevTheme = Object.keys(slideshowParams)[prevIndex];
  const nextTheme = Object.keys(slideshowParams)[nextIndex];

  const prevTotemDiv = document.querySelector(`.totem_${prevTheme}`);
  const nextTotemDiv = document.querySelector(`.totem_${nextTheme}`);

  prevTotemDiv.classList.remove('fakeTotemUp');
  prevTotemDiv.classList.remove('fakeTotemDown');
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
  [...hotelEstablishmentNameLandscape.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));
  const nameLength = nameLetters.length;
  const sloganLetters = [...hotelSloganLandscape.children];

  const prevOptionLettersDiv = anyHotelOptions[prevIndex];
  const prevOptionLetters = [...prevOptionLettersDiv.children];
  const prevOptionLength = prevOptionLetters.length;

  const nextOptionLettersDiv = anyHotelOptions[nextIndex];
  const nextOptionLetters = [...nextOptionLettersDiv.children];

  /******   NAME    ******/
  for (let kndex = 0; kndex < nameLength; kndex++) {
    const letter = nameLetters[kndex];
    up 
      ? letter.classList.add(`move-letter-up-first-${kndex + 1}`) 
      : letter.classList.add(`move-letter-down-first-${kndex + 1}`);
  }
  
  /******   CURRENT OPTION   ******/
  for (let index = 0; index < prevOptionLength; index++) {
    const letter = prevOptionLetters[index];
    up 
      ? letter.classList.add(`fade-out-letter-up-${index + nameLength + 1}`) 
      : letter.classList.add(`fade-out-letter-down-${index + nameLength + 1}`);
  }

  /******   NEXT OPTION   ******/
  nextOptionLettersDiv.classList.add('showOption');
  nextOptionLettersDiv.classList.add('perpetual-translation');

  for (let jndex = 0; jndex < nextOptionLetters.length; jndex++) {
    const letter = nextOptionLetters[jndex];
    up 
      ? letter.classList.add(`fade-in-letter-up-${jndex + nameLength + 1}`) 
      : letter.classList.add(`fade-in-letter-down-${jndex + nameLength + 1}`);
  }

  /****** SLOGAN ************/
  for (let hndex = 0; hndex < sloganLetters.length; hndex++) {
    const letter = sloganLetters[hndex];
    up 
      ? letter.classList.add(`move-letter-up-first-${hndex + nameLength + prevOptionLength + 1}`) 
      : letter.classList.add(`move-letter-down-first-${hndex + nameLength + prevOptionLength + 1}`);
  }
}

function resetHotelOptions(index){
  /****** DOM *******/
  const nameLetters = [];
  [...hotelEstablishmentNameLandscape.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));
  const nameLength = nameLetters.length;
  const sloganLetters = [...hotelSloganLandscape.children];
  let prevOptionLength;

  /******   NAME    ******/
  for (let kndex = 0; kndex < nameLength; kndex++) {
    const letter = nameLetters[kndex];
    letter.classList.remove(`move-letter-up-first-${kndex + 1}`);
    letter.classList.remove(`move-letter-down-first-${kndex + 1}`);
  }
  
  hotelOptions.forEach(option => {
    const optionIsVisible = option.classList.contains('showOption');
    const optionNeedToStayVisible = hotelOptions.indexOf(option) === index;
    const letters = [...option.children];
    if (optionIsVisible && !optionNeedToStayVisible) {
      prevOptionLength = [...option.children].length;
    }
    if (optionIsVisible) {
      option.classList.remove('hideLetter');
      /******   NEXT OPTION   ******/
      for (let index = 0; index < letters.length; index++) {
        const letter = letters[index];
        letter.classList.remove(`fade-in-letter-up-${index + nameLength + 1}`);
        letter.classList.remove(`fade-in-letter-down-${index + nameLength + 1}`);
        letter.classList.remove(`fade-out-letter-up-${index + nameLength + 1}`);
        letter.classList.remove(`fade-out-letter-down-${index + nameLength + 1}`);
      }
      if (!optionNeedToStayVisible) {
      /******   CURRENT OPTION   ******/
        option.classList.remove('showOption');
        option.classList.add('hideLetter');
        option.classList.remove('perpetual-translation');
      } else {
        return;
      }
    } else {
      return;
    };
  });
  /****** SLOGAN ************/
  for (let hndex = 0; hndex< sloganLetters.length; hndex++) {
    const letter = sloganLetters[hndex];
    letter.classList.remove(`move-letter-up-first-${hndex + nameLength + prevOptionLength + 1}`);
    letter.classList.remove(`move-letter-down-first-${hndex + nameLength + prevOptionLength + 1}`);
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
  // controlVideo1PointerEvents.addEventListener('touchstart', startTransitionSlideshow);
  // controlVideo1PointerEvents.addEventListener('touchend', startTransitionSlideshow);
  playerPlay(player1);
}

function scrollFromFirstVideoToSlideshow() {
  wholeContent.classList.remove('from_slideshow_to_first_video');
  wholeContent.classList.add('from_first_video_to_slideshow');
  wholeContent.classList.remove('from_first_video_to_second_video');
  wholeContent.classList.remove('from_second_video_to_first_video');

  playerPause(player1);
  wholeContent.addEventListener('animationend', getOutOfVideos);

  controlVideo1PointerEvents.removeEventListener('wheel', startTransitionSlideshow);
  // controlVideo1PointerEvents.removeEventListener('touchstart', startTransitionSlideshow);
  // controlVideo1PointerEvents.removeEventListener('touchend', startTransitionSlideshow);
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
  CURRENT_INDEX--;
  wholeContent.classList.remove('from_slideshow_to_first_video');
  wholeContent.classList.remove('from_first_video_to_slideshow');
  wholeContent.classList.remove('from_first_video_to_second_video');
  wholeContent.classList.remove('from_second_video_to_first_video');
  wholeContent.removeEventListener('animationend', getOutOfVideos);
}

function togglePlayPause(e) {
  if (document.body.classList.contains('portrait')) {
    return;
  }
  if (this.classList.contains('video1')) {
    if (player1.getState() === 'playing') {
      // console.log(e);
      // console.log('pause');
      playerPause(player1);
    } else {
      // console.log(e);
      // console.log('play');
      playerPlay(player1);
    };
  } else if (this.classList.contains('video2')) {
    player2.getState() === 'playing' ? playerPause(player2) : playerPlay(player2);
  }
}

function showFooter () {
  CURRENT_INDEX++;
  playerPause(player2);
  footer.classList.add('visible');
}

function hideFooter () {
  CURRENT_INDEX--;
  playerPlay(player2);
  footer.classList.remove('visible');
}
/*------------------------------------*\
    EVENT LISTENERS
\*------------------------------------*/

window.addEventListener('keyup', startTransitionSlideshow);
slideshowDiv.addEventListener('wheel', startTransitionSlideshow);
// slideshowDiv.addEventListener('touchmove', startTransitionSlideshow);


[...document.querySelectorAll('.slideshow__totem.landscape')].forEach(totem => {
  totem.addEventListener('touchstart', startTransitionSlideshow);
  totem.addEventListener('touchend', startTransitionSlideshow);
});


document.querySelector('.scroll-btn').addEventListener('click', startTransitionSlideshow);
document.querySelector('.scroll-btn').addEventListener('touchstart', startTransitionSlideshow);
document.querySelector('.scroll-btn').addEventListener('touchend', startTransitionSlideshow);
video1Div.addEventListener('wheel', startTransitionSlideshow);
video1Div.addEventListener('touchstart', startTransitionSlideshow);
video1Div.addEventListener('touchend', startTransitionSlideshow);
video2Div.addEventListener('wheel', startTransitionSlideshow);
video2Div.addEventListener('touchstart', startTransitionSlideshow);
video2Div.addEventListener('touchend', startTransitionSlideshow);

controlVideo1PointerEvents.addEventListener('click', togglePlayPause);
// controlVideo1PointerEvents.addEventListener('touchstart', togglePlayPause);
controlVideo2PointerEvents.addEventListener('click', togglePlayPause);
// controlVideo2PointerEvents.addEventListener('touchstart', togglePlayPause);

closeFooter.addEventListener('click', startTransitionSlideshow);
closeFooter.addEventListener('touchstart', startTransitionSlideshow);
closeFooter.addEventListener('touchend', startTransitionSlideshow);

document.querySelectorAll('.cursor').forEach(cursor => cursor.addEventListener('click', startTransitionSlideshow))


export {  CURRENT_INDEX, colorsChange, cursorMove, startTransitionSlideshow, togglePlayPause };
