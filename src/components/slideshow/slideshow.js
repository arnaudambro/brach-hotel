'use strict';

import { buildFakeTotem, buildFakeHotelOptionLetters} from './fakeDom';
import { populateHotelOptions } from './populateLetters';
import { alSize } from '../DOMStyling';
/*------------------------------------*\
    VARIABLES & DATA
\*------------------------------------*/

//DATA
import { slideshowParams } from './params';

//DOM
const slideshowDiv = document.querySelector(".slideshow");
const totemDiv = document.querySelector('.slideshow__totem');
const movingCursorDiv = document.querySelector('.slideshow__cursor--moving');
const hotelOptions = document.querySelector('.slideshow__description--options');
const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const hotelName = slideshowDiv.querySelector('.slideshow__description');
const dividerInDescription = slideshowDiv.querySelector('.slideshow__description--divider');

//CSS
const totemDivHeight = 90;
const cursorVerticalSpacing = 20;
const transitionDuration = 1000;

    /*  CURSOR  */
movingCursorDiv.style.boxShadow = `0px ${(cursorVerticalSpacing * 0)}px, 0px ${(cursorVerticalSpacing * 1)}px, 0px ${(cursorVerticalSpacing * 2)}px, 0px ${(cursorVerticalSpacing * 3)}px, 0px ${(cursorVerticalSpacing * 4)}px, 0px ${(cursorVerticalSpacing * 5)}px`;


//SLIDESHOW PARAMS
let currentIndex = 0;
const numberOfSlides = Object.keys(slideshowParams).length;
let biggestWordLength = 0;
let biggestWordParam = 0;
Object.keys(slideshowParams).map(param => {
  if (slideshowParams[param].frenchName.length > biggestWordLength) {
    biggestWordLength = slideshowParams[param].frenchName.length; 
    biggestWordParam = slideshowParams[param].position;
  }; 
});

hotelOptions.style.width = `750px`


/*------------------------------------*\
    INIT
\*------------------------------------*/


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

function cursorMove(index) {
  movingCursorDiv.style.transform = `translateY(${-cursorVerticalSpacing * index}px)`;
  window.setTimeout(() => {
    // console.log('step 5 end: cursor moved')
  }, transitionDuration);
}


const init = (index) => {

  const theme = Object.keys(slideshowParams)[index];
  /* BACKGROUND AND TEXT COLORS */
  colorsChange(index);

  /*  CURSOR  */
  cursorMove(index);

  /*   TOTEM   */
  totemDiv.style.backgroundImage = `url('${slideshowParams[theme].totemPicture()}')`;

  /*  OPTIONS  */
  populateHotelOptions(hotelOptions, index, slideshowParams, alSize, true);

  /* SLOGAN   */
  hotelSlogan.firstChild.textContent = 'un style de vie à paris';
};

init(currentIndex);


/*------------------------------------*\
    SLIDESHOW
\*------------------------------------*/


function startTransition(e) {
  //console.log(`${e.code}: ${e.keyCode}`);
  //Prevent pressing any other key
  if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32) { 
    // console.error('ni space, ni flèche haut, ni flèche bas')
    return; 
  };

  if (!document.body.classList.contains('slideshow__landscape')) {
    return
  }
  //Prevent transit while already transiting
  if (slideshowDiv.classList.contains('inTransition')) {
    // console.error('déjà en transition')
    return;
  } else {
    // console.log('step 1: add class transition')
    slideshowDiv.classList.add('inTransition');
    [slideshowDiv, movingCursorDiv, dividerInDescription, hotelName].forEach(item => {
      item.style.transition = `all ${transitionDuration}ms ease-in-out`;
    })
  }

  const previousIndex = currentIndex;
  // console.log(`step 2: define previous index: ${previousIndex}`)
  let direction;
  if (!(e.keyCode === 38)) {
    currentIndex === numberOfSlides - 1 ? currentIndex = 0 : currentIndex++;
    // console.log(`step 3: define next index: ${currentIndex}`)
    direction = 'up';
    // console.log(`step 4: define direction: ${direction}`)
  } else {
    currentIndex === 0 ? currentIndex = numberOfSlides - 1 : currentIndex--;
    // console.log(`step 3: define next index: ${currentIndex}`)
    direction = 'down';
    // console.log(`step 4: define direction: ${direction}`)
  }

  //Cursor move
  // console.log('step 5: moving the cursor');
  cursorMove(currentIndex);
  
  //Totem move
  // console.log('step 6: moving the totem');
  totemMove(currentIndex, direction);
  
  //Hotel Options change
  hotelOptionsTransit(e, currentIndex, hotelOptions, direction);

  //Background color change
  // console.log('step 7: changing the colors');
  colorsChange(currentIndex);

  // window.setTimeout(() => {
  //   debugger
  // }, transitionDuration / 2)

  //Make the slideshow ready for new transition
  window.setTimeout(() => {
    slideshowDiv.classList.remove('inTransition');
    // console.log('step 8: taking out the transition class');
  }, transitionDuration);
}



function totemMove(index, direction) {
  const up = direction === 'up' ? true : false;
  // console.log(`step 6.1: direction up ? ${up}`)
  const theme = Object.keys(slideshowParams)[index];
  totemDiv.style.transition = `all ${transitionDuration}ms cubic-bezier(0.64, 0.46, 0.38, 1.41)`;
  // if (totemDiv.style.transition === `all ${transitionDuration}ms cubic-bezier(0.64, 0.46, 0.38, 1.41)`) {
  //   // console.log(`step 6.2: transition set`)
  // } else {
  //   // console.error(`step 6.2: transition not set: ${totemDiv.style.transition}`)
  // }
  //Building the new totem
  const newTotemDiv = buildFakeTotem(/*totem*/totemDiv, /*motherDiv*/slideshowDiv, /*data*/slideshowParams, index, up);
  document.body.append(newTotemDiv);
  // if (newTotemDiv.style.transition === `all ${transitionDuration}ms cubic-bezier(0.64, 0.46, 0.38, 1.41)`) {
  //   // console.log(`step 6.3: new totem created with transition set`)
  // } else {
  //   // console.error(`step 6.3: new totem created without transition set: ${newTotemDiv.style.transition}`)
  // }
  window.setTimeout(() => {
    totemDiv.style.transform = `translateY(${(up ? -1 : 1) * 100}vh)`;
    // if (totemDiv.style.transform === `translateY(${(up ? -1 : 1) * 100}vh)`) {
    //   // console.log(`step 6.4: totem instructed to move`)
    // } else {
    //   // console.error(`step 6.4: totem not instructed to move: ${totemDiv.style.transform}`)
    // }
    newTotemDiv.style.transform = `translateY(${(up ? -1 : 1) * 100}vh)`;
    // if (newTotemDiv.style.transform === `translateY(${(up ? -1 : 1) * 100}vh)`) {
    //   // console.log(`step 6.5: newTotemDiv instructed to move`)
    // } else {
    //   // console.error(`step 6.5: newTotemDiv not instructed to move: ${newTotemDiv.style.transform}`)
    // }
    window.setTimeout(() => {
      // debugger
      totemDiv.style.transition = '';
      totemDiv.style.transform = '';
      totemDiv.style.backgroundImage = `url('${slideshowParams[theme].totemPicture()}')`;
      document.body.removeChild(newTotemDiv);
      // console.log('step 6 end: totem moved')
    }, transitionDuration);
  });
}

function hotelOptionsTransit(e, index, anyHotelOptions, direction) {
  /*    TRANSITION PARAMTERS    */
  let i = 0;
  const offset = direction === 'up' ? 10 : -10;
  const letterTimeout = 20;
  //target: timeout of the last letter + transition of the last letter = 1/2 transition
  const letterTransitionDuration = transitionDuration * (1/2) - letterTimeout * biggestWordLength;
  
  /*    FAKE DOM     */
  const newHotelOptions = buildFakeHotelOptionLetters(anyHotelOptions, slideshowParams, index, offset, alSize);
  document.body.append(newHotelOptions);

  //STEP 1: move up the existing letter and transit opacity from 1 to 0 during 1/2 transition
  [...anyHotelOptions.children].forEach(letter => {
    i++;
    window.setTimeout(() => {
    letterDisappear(letter, letterTransitionDuration, offset);
    }, letterTimeout * i);
  });

  //STEP 2: move up the new letter and transit opacity from 0 to 1 during 1/2 transition
  window.setTimeout(() => {
    //debugger
    newHotelOptions.style.opacity = 1;
    [...newHotelOptions.children].forEach(letter => {
      // debugger
      i++;
      window.setTimeout(() => {
      letterAppear(letter, letterTransitionDuration, offset);
      }, letterTimeout * i);
    });
  }, transitionDuration * (1/2))

  window.setTimeout(() => {
    populateHotelOptions(anyHotelOptions, index, slideshowParams, alSize);
    document.body.removeChild(newHotelOptions);
  }, transitionDuration)
}

function letterDisappear(letter, transition, offset) {
  // console.log(`offset: ${offset}`);

  // console.log(`letter.textContent: ${letter.textContent}`);
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
  // console.log(`offset: ${offset}`);

  // console.log(`letter.textContent: ${letter.textContent}`);
  letter.style.transition = `transform ${transition * 2 / 3}ms cubic-bezier(0.64, 0.46, 0.4, 2.19), opacity ${transition * 2 / 3}ms linear`;
  //STEP 1: move it up
  letter.style.transform = `translateY(${-offset}px)`;
  //STEP 2: fade out
  letter.style.opacity =  1;

  window.setTimeout(() => {
    // letter.style.transition = ``;
  }, transition);
}




window.addEventListener('keyup', function(e) {
  //Prevent scrolling when pressing space
  e.preventDefault();
  startTransition(e);
})

// window.addEventListener('load', function(e) {
//   e.preventDefault();
//   hotelOptionsTransit(e, currentIndex, hotelOptions);
// })



