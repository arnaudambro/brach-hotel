'use strict';

import { exactCapitalLetterSize } from './_measureFont.js'; 
import { populateHotelOptions } from './slideshow/_populateLetters';
import PerfectScrollbar from 'perfect-scrollbar';
import { slideshowParams, hotelFixedCharacters } from './slideshow/_params';
import 'match-media';  
// import { whenLoadedData } from './firstAnim';
import { CURRENT_INDEX, colorsChange, cursorMove, startTransitionSlideshow } from './slideshow/slideshow';
import { playerLoad, playerPlay, playerPause, player1, player1firstStart, player2, player2firstStart  } from './_video1';


const animVideo = document.querySelector('#video-anim');
const wholeContentDiv = document.querySelector('#wholeContent')
const videoSubcontainers = [...document.querySelectorAll('.video__subcontainer')];
const verticalDividerInMouseScroll = document.querySelector('.verticalDivider');
const footer = document.querySelector('.footer');
const theme = Object.keys(slideshowParams)[CURRENT_INDEX];
const controlVideoPointerEvents = [...document.querySelectorAll('.transparent_filter-for-allow-scrolling')];
/*** LANDSCAPE ***/
const slideshowDiv = document.querySelector(".slideshow");
const slideshowDescriptionLandscape = document.querySelector('.slideshow__description.landscape');
const hotelOptionsContainerLandscape = document.querySelector('.slideshow__description--optionsContainer.landscape');
const hotelOptionsContentLandscape = [...document.querySelectorAll('.slideshow__description--options.landscape')];
const totemsLandscape = [...document.querySelectorAll('.slideshow__totem.landscape')];
const hotelEstablishmentNameLandscape = document.querySelector('.slideshow__description--establishment-name.landscape');
const firstAndLastHotelLetterLandscape = document.querySelectorAll('.first-last-letter.landscape');
const middleHotelLettersLandscape = document.querySelector('.middle-letters.landscape');
const hotelSloganLandscape = document.querySelector('.slideshow__description--slogan.landscape');
const dividerInDescriptionLandscape = slideshowDiv.querySelector('.slideshow__description--divider.landscape');
/***PORTRAIT***/
const slideshowBackup = document.querySelector('.slideshow__backup');
const totemsPortrait = [...document.querySelectorAll('.slideshow__totem.portrait')];
const slideshowDescriptionPortrait = [...document.querySelectorAll('.slideshow__description.portrait')];
const dividersInDescriptionPortrait = [...document.querySelectorAll('.slideshow__description--divider.portrait')];
const hotelOptionsContainerPortrait = [...document.querySelectorAll('.slideshow__description--optionsContainer.portrait')];
const hotelEstablishmentNamePortrait = document.querySelector('.slideshow__description--establishment-name.portrait');
const firstAndLastHotelLetterPortrait = [...document.querySelectorAll('.first-last-letter.portrait')];
const middleHotelLettersPortrait = [...document.querySelectorAll('.middle-letters.portrait')];
const hotelSloganPortrait = [...document.querySelectorAll('.slideshow__description--slogan.portrait')];
const hotelOptionsContentPortrait = [...document.querySelectorAll('.slideshow__description--options.portrait')];

/* As it takes too long on a mobile to do the calculations below, we put directly inside the HTML code the properties we need.
In case we need to do it all again, here is the code. + line 321 */
// const firstAndLastHotelLetterPortraitLetters = [];
// const middleHotelLettersPortraitLetters = [];
// const hotelSloganPortraitLetters = [];
// const hotelOptionsContentPortraitLetters = [];

// firstAndLastHotelLetterPortrait.forEach(letterContainer => firstAndLastHotelLetterPortraitLetters.push(letterContainer));
// middleHotelLettersPortrait.forEach(letterContainer => middleHotelLettersPortraitLetters.push(letterContainer));
// hotelSloganPortrait.forEach(letterContainer => hotelSloganPortraitLetters.push(letterContainer));
// hotelOptionsContentPortrait.forEach(letterContainer => hotelOptionsContentPortraitLetters.push(letterContainer));

let allLetters = [];


/***** MEDIA QUERIES ******/
const smallwidth = 550;
const smallmediumwidth = 800;
const mediumwidth = 990;
const largewidth = 2 * smallwidth / 0.9; // = 1333
const ratioVideo1 = '18/9';
const ratioVideo2 = ratioVideo1; 

// const mqsmax = window.matchMedia( `(max-width: ${smallwidth}px)` );
// const mqsmin = window.matchMedia( `(min-width: ${smallwidth}px)` );
const mqsmax = window.matchMedia( `(max-width: ${smallmediumwidth}px)` );
const mqsmin = window.matchMedia( `(min-width: ${smallmediumwidth}px)` );
const mqm = window.matchMedia( `(min-width: ${mediumwidth}px)` );
const mql = window.matchMedia( `(min-width: ${largewidth}px)` );
const mqvideo1portrait = window.matchMedia(`(max-aspect-ratio: ${ratioVideo1}`);   //Aspect ratio = width / height.
const mqvideo1landscape = window.matchMedia(`(min-aspect-ratio: ${ratioVideo1}`);
const mqvideo2portrait = window.matchMedia(`(max-aspect-ratio: ${ratioVideo2}`);   //Aspect ratio = width / height.
const mqvideo2landscape = window.matchMedia(`(min-aspect-ratio: ${ratioVideo2}`);

/*------------------------------------*\
    VIDEO LANDSCAPE OR PORTRAIT
\*------------------------------------*/
let loaded = 0;
let portraitFirst = 0;

function handleMediaQueries(e) {
  loaded++;
  // console.log('window loaded');
  // console.log('loadingstep 1');
  // console.log(e);
  /********* VIDEO 1 ************/
  if (mqsmin.matches && (mqvideo1landscape.matches || (1.13 * window.innerHeight < window.innerWidth * 0.5625))) {
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('portrait');
  };
  if (mqsmin.matches && (mqvideo1portrait.matches || (1.13 * window.innerHeight >= window.innerWidth * 0.5625))) {
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('portrait');
  };
  // console.log('loadingstep 2');
  /********* VIDEO 2 ************/
  if (mqsmin.matches && (mqvideo2landscape.matches || (1.13 * window.innerHeight < window.innerWidth * 0.5625))) {
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.remove('portrait');
  };
  if (mqsmin.matches && (mqvideo2portrait.matches || (1.13 * window.innerHeight >= window.innerWidth * 0.5625))) {
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.remove('landscape-max');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.add('portrait');
  };
  // console.log('loadingstep 3');
  /********* SLIDESHOW ************/
  /***** TOTEMSLandscape ************/
  if (mqsmax.matches) {
    // console.log('loadingstep 4');
    if (loaded === 1) {
      portraitFirst = 1;
    } else {
      portraitFirst = 2;
    }
    // console.log('changing landscape to portrait');
    // console.log(`CURRENT_INDEX: ${CURRENT_INDEX}`);

    /****LANDSCAPE****/
    verticalDividerInMouseScroll.classList.add('portrait');
    verticalDividerInMouseScroll.classList.remove('landscape');

    //Body
    document.body.classList.add('portrait');
    document.body.classList.remove('landscape');
    slideshowDiv.classList.add('portrait');
    slideshowDiv.classList.remove('landscape');
    slideshowBackup.classList.add('portrait');
    slideshowBackup.classList.remove('landscape');
    footer.classList.add('portrait');
    footer.classList.remove('landscape');
    wholeContentDiv.classList.add('portrait');
    videoSubcontainers.forEach(container => container.classList.add('fixed'));
    controlVideoPointerEvents.forEach(controller => controller.classList.add('portrait'));
    controlVideoPointerEvents.forEach(controller => controller.classList.remove('landscape'));
    // console.log('loadingstep 5');
  } else {
    if (portraitFirst === 1 && (!player1.playing || !player2.playing)) {
      document.location.reload(false);
    }
    // console.log('loadingstep 6');
    window.scrollTo(0,0);
    // console.log('changing portrait to landscape');
    verticalDividerInMouseScroll.classList.remove('portrait');
    verticalDividerInMouseScroll.classList.add('landscape');
    document.body.classList.remove('portrait');
    document.body.classList.add('landscape');
    slideshowDiv.classList.add('landscape');
    slideshowDiv.classList.remove('portrait');
    slideshowBackup.classList.add('landscape');
    slideshowBackup.classList.remove('portrait');
    footer.classList.add('landscape');
    footer.classList.remove('portrait');
    wholeContentDiv.classList.remove('portrait');
    videoSubcontainers.forEach(container => container.classList.remove('fixed'));
    controlVideoPointerEvents.forEach(controller => controller.classList.remove('portrait'));
    controlVideoPointerEvents.forEach(controller => controller.classList.add('landscape'));
    // console.log('loadingstep 7');
  };

  if ((loaded === 1)) {
    // console.log('loadingstep 8');
    whenLoadedData(e);
    populateLetters(11, 26.750);
  }
};

function whenLoadedData(e) {
  // console.log('loadingstep 9');
  if (loaded === 1) {
    // console.log('loadingstep 10');
    
    // /*    SCROLLBAR   */
    const ps = new PerfectScrollbar(footer, {
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      suppressScrollX: true
    });
    /* BACKGROUND AND TEXT COLORS */
    colorsChange(CURRENT_INDEX);
    // console.log('loadingstep 11');
    
  }

  /*------------------------------------*\
      LANDSCAPE
  \*------------------------------------*/
   if (document.body.classList.contains('landscape')) {
      /*  CURSOR  */
      cursorMove(CURRENT_INDEX);

      /*   TOTEM   */
      document.querySelector(`.totem_${theme}.landscape`).classList.add('showTotem');
      document.querySelector(`.totem_${theme}.landscape`).addEventListener('animationend', removeInitAnimationClasses);
      document.querySelector(`.totem_${theme}.landscape`).classList.add('perpetual-translation');
      /*  OPTIONS  */
      hotelOptionsContentLandscape.forEach(option => {
        option.classList.contains(`.option_${theme}`) ? '' : option.classList.add('hideLetter');
      });
      document.querySelector(`.option_${theme}.landscape`).classList.add('showOption');

      //REMOVE ALL CLASSES AFTER ENTRANCE

      window.setTimeout(() => {
        //Get hotel letters
        // console.log('step 1');
        const nameLetters = [];
        [...hotelEstablishmentNameLandscape.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

        window.setTimeout(() => {
          // console.log('step 2');
          //Get slogan letters
          const sloganLetters = [...hotelSloganLandscape.children];

          window.setTimeout(() => {
            // console.log('step 3');
            //Get option letters
            const hotelOption = document.querySelector('.showOption.landscape');
            const optionLetters = [...hotelOption.children];

            window.setTimeout(() => {
              // console.log('step 4');
              window.setTimeout(() => {
                // console.log('step 5');
                for (let letter of [...nameLetters, ...optionLetters, ...sloganLetters]) {
                  letter.addEventListener('animationend', removeInitAnimationClasses);
                  allLetters.push(letter);
                }
                // console.log(allLetters);
                window.setTimeout(() => {
                  // console.log('step 6');
                  alignDescriptionWithCursorOnMiddle();
                  // console.log('it worked !');
                  // console.log(allLetters);
                }, 200);
              }, 500);
            });
          }, 20);
        }, 20);
      }, 100);
    
   }

    /*------------------------------------*\
        PORTRAIT
    \*------------------------------------*/
    /*   TOTEM   */
    totemsPortrait.forEach(totem => {
      // console.log('loadingstep 12');
      
      const theme = Object.keys(slideshowParams)[totem.dataset.slideposition];
      const offsetLeft = slideshowParams[theme].imageMainLineFromLeft / slideshowParams[theme].imageHeight * window.getComputedStyle(totem)['height'].replace('px', '');
      totem.style.left = `calc(50vw - ${offsetLeft}px)`;
    });


    return;
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
    dividerInDescriptionLandscape.classList.add('coming-in');
    dividerInDescriptionLandscape.addEventListener('animationend', removeInitForDivider);
  }
  //FOr everybody
  this.removeEventListener('animationend', removeInitAnimationClasses);
}

function removeInitForDivider() {
  // console.log('we remove the init for divider');
  this.classList.remove('init');
  this.classList.remove('coming-in');
  this.removeEventListener('animationend', removeInitForDivider);
}


/*------------------------------------*\
    BRACH LETTERS + SLOGAN
\*------------------------------------*/

function populateLetters(sizePortrait, sizeLandscape) {
  // console.log('loadingstep 13');
  
  if (document.body.classList.contains('landscape')) {
    /******* LANDSCAPE ***********/
    //HOTEL NAME FIRST AND LAST LETTERS
    // console.log('loadingstep 13.1');

    for (let i = 0; i < firstAndLastHotelLetterLandscape.length; i++) {
      const letter = firstAndLastHotelLetterLandscape[i];
      populateHotelOptions(letter, i, hotelFixedCharacters, sizeLandscape, 'Portrait');
    };

    //HOTEL NAME MIDDLE LETTERS
    const mlSizeLandscape = sizeLandscape * 0.86;
    populateHotelOptions(middleHotelLettersLandscape, 2, hotelFixedCharacters, mlSizeLandscape, 'Portrait');

    //SLOGAN
    const sloganAlSizeLandscape = 0.35 * sizeLandscape;
    populateHotelOptions(hotelSloganLandscape, 3, hotelFixedCharacters, sloganAlSizeLandscape, 'Cogito');

    //OPTIONS
    const alSizeLandscape = 2 * sizeLandscape;
    hotelOptionsContentLandscape.forEach(hotelOption => {
      populateHotelOptions(hotelOption, hotelOption.dataset['slideposition'], slideshowParams, alSizeLandscape, 'Portrait');
      if (hotelOption.dataset['slideposition'] === 1) { alignDescriptionWithCursorOnMiddle() };
    });
  }
  // console.log('loadingstep 14');
  
    /********* PORTRAIT*******/
    /* As it takes too long on a mobile to do the calculations below, we put directly inside the HTML code the properties we need.
    In case we need to do it all again, here is the code. + line 44 */
    // firstAndLastHotelLetterPortraitLetters.forEach(letterGroup => {
      // console.log('loadingstep 15');
      
    //   populateHotelOptions(letterGroup, letterGroup.dataset['letterindex'],hotelFixedCharacters, sizePortrait, 'Portrait')
    // });

    // const mlSizePortrait = sizePortrait * 0.86;
    // middleHotelLettersPortraitLetters.forEach(letterGroup => {
      // console.log('loadingstep 16');
      
    //   populateHotelOptions(letterGroup, 2 ,hotelFixedCharacters, mlSizePortrait, 'Portrait')
    // });

    // const sloganAlSizePortrait = 0.35 * sizePortrait;
    // hotelSloganPortraitLetters.forEach(letterGroup => {
      // console.log('loadingstep 17');
      
    //   populateHotelOptions(letterGroup, 3 ,hotelFixedCharacters, sloganAlSizePortrait, 'Cogito')
    // });
    // const alSizePortrait = 2 * sizePortrait;
    // hotelOptionsContentPortraitLetters.forEach(letterGroup => {
      // console.log('loadingstep 18');
      
    //   populateHotelOptions(letterGroup, letterGroup.dataset['slideposition'] ,slideshowParams, alSizePortrait, 'Portrait');
    // });
  // }
}

function alignDescriptionWithCursorOnMiddle () {
  // console.log('now we do our fucknig job');
  let optionHeight;
  hotelOptionsContentLandscape.forEach(option => {
    if (option.getBoundingClientRect().height > 0) {
      optionHeight = option.getBoundingClientRect().height;
    }
  })
  optionHeight > 0 ? hotelOptionsContainerLandscape.style.height = `${optionHeight}px` : '';
  const hotelOptionsBottom = hotelOptionsContainerLandscape.getBoundingClientRect().bottom;
  const hotelDescriptionBottom = slideshowDescriptionLandscape.getBoundingClientRect().bottom;
  const differenceWithMiddle = hotelDescriptionBottom - hotelOptionsBottom;
  slideshowDescriptionLandscape.style.marginBottom = `${-differenceWithMiddle}px`;
};


mqsmax.addListener(handleMediaQueries);
// window.addEventListener('resize', handleMediaQueries);
window.addEventListener('load', handleMediaQueries);
window.setTimeout(() => {
  if (loaded === 0) {
    // console.log('loaded manually');
    handleMediaQueries();
  };
}, 1000);
export { alignDescriptionWithCursorOnMiddle };
export { mqsmax };
