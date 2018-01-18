'use strict';

import { exactCapitalLetterSize } from './_measureFont.js'; 
import { populateHotelOptions } from './slideshow/_populateLetters';
import PerfectScrollbar from 'perfect-scrollbar';
import { slideshowParams, hotelFixedCharacters } from './slideshow/_params';
import 'match-media';  
// import { whenLoadedData } from './firstAnim';
import { CURRENT_INDEX, colorsChange, cursorMove, startTransitionSlideshow } from './slideshow/slideshow';


const animVideo = document.querySelector('#video-anim');
const wholeContentDiv = document.querySelector('#wholeContent')
const videoSubcontainers = [...document.querySelectorAll('.video__subcontainer')];
const verticalDividerInMouseScroll = document.querySelector('.verticalDivider');
const footer = document.querySelector('.footer');
const theme = Object.keys(slideshowParams)[CURRENT_INDEX];
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

const firstAndLastHotelLetterPortraitLetters = [];
const middleHotelLettersPortraitLetters = [];
const hotelSloganPortraitLetters = [];
const hotelOptionsContentPortraitLetters = [];

firstAndLastHotelLetterPortrait.forEach(letterContainer => firstAndLastHotelLetterPortraitLetters.push(letterContainer));
middleHotelLettersPortrait.forEach(letterContainer => middleHotelLettersPortraitLetters.push(letterContainer));
hotelSloganPortrait.forEach(letterContainer => hotelSloganPortraitLetters.push(letterContainer));
hotelOptionsContentPortrait.forEach(letterContainer => hotelOptionsContentPortraitLetters.push(letterContainer));

let allLetters = [];


/***** MEDIA QUERIES ******/
const smallwidth = 550;
const smallmediumwidth = 800;
const mediumwidth = 990;
const largewidth = 2 * smallwidth / 0.9; // = 1333
// const ratioVideo1 = '21/9'; //~ 21/9 
/*Special ratio between portrait and landscape because to keep the video fullscreen whatever size of the screen (like in bigmammagroup.com/it/accueil), because video1 has white lines on top and bottom. We would need to increase from 1.3125 the height of the video to make the white line disappear, and as the ratio is 0.5625 already, the ratio we want is 12800/5625, this is the ratio we want.*/
const ratioVideo1 = '18/9';
const ratioVideo2 = ratioVideo1; 

const mqsmax = window.matchMedia( `(max-width: ${smallwidth}px)` );
const mqsmin = window.matchMedia( `(min-width: ${smallwidth}px)` );
const mqsm = window.matchMedia( `(max-width: ${smallmediumwidth}px)` );
const mqm = window.matchMedia( `(min-width: ${mediumwidth}px)` );
const mql = window.matchMedia( `(min-width: ${largewidth}px)` );
const mqvideo1portrait = window.matchMedia(`(max-aspect-ratio: ${ratioVideo1}`);   //Aspect ratio = width / height.
const mqvideo1landscape = window.matchMedia(`(min-aspect-ratio: ${ratioVideo1}`);
const mqvideo2portrait = window.matchMedia(`(max-aspect-ratio: ${ratioVideo2}`);   //Aspect ratio = width / height.
const mqvideo2landscape = window.matchMedia(`(min-aspect-ratio: ${ratioVideo2}`);

/*------------------------------------*\
    VIDEO LANDSCAPE OR PORTRAIT
\*------------------------------------*/
function handleMediaQueries(e) {
  console.log('window loaded');
  if (mqsm.matches && (e.type === 'resize')) {
      console.log(e.type);
      document.location.reload(false);
      // window.setTimeout(() => {
      //   whenLoadedData(e);
      // })
      // return;
    }
  /********* VIDEO 1 ************/
  //If 1.28 * window.innerHeight < window.innerWidth * 0.5625 <=> if width / height > 12800 / 5625
  // if (mqvideo1landscape.matches || (1.3125 * window.innerHeight < window.innerWidth * 0.5625)) {   <= pour les vidéos avec des lignes noires au dessus et en dessous
  if (mqvideo1landscape.matches || (1.13 * window.innerHeight < window.innerWidth * 0.5625)) {
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('portrait');
  };
  if(mqvideo1portrait.matches || (1.13 * window.innerHeight >= window.innerWidth * 0.5625)) {
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('portrait');
  };

  /********* VIDEO 2 ************/
  //If 1.3125 * window.innerHeight < window.innerWidth * 0.5625 <=> if width / height > 12800 / 5625
  // if (mqvideo2landscape.matches || (1.3125 * window.innerHeight < window.innerWidth * 0.5625)) {
  if (mqvideo2landscape.matches || (1.13 * window.innerHeight < window.innerWidth * 0.5625)) {
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.remove('portrait');
  };
  if (mqvideo2portrait.matches || (1.13 * window.innerHeight >= window.innerWidth * 0.5625)) {
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.remove('landscape-max');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.add('portrait');
  };

  /********* SLIDESHOW ************/
  /***** TOTEMSLandscape ************/
  if (mqsm.matches) {

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
  } else {
    if (e.type === 'resize') {
      console.log(e.type);
    }
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
  };

  if ((e.type === 'load')) {
    console.log('window handled media queries on loading: ', document.body.classList.contains('landscape'));
    whenLoadedData(e);
    handleMediaQueriesForLetters(e);
  }
};

function whenLoadedData(e) {
  console.log('play');
  if (e.type === 'load') {
    animVideo.play();
    // /*    SCROLLBAR   */
    const ps = new PerfectScrollbar(footer, {
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      suppressScrollX: true
    });
    /* BACKGROUND AND TEXT COLORS */
    colorsChange(/*adjustedIndex*/CURRENT_INDEX);
  }

  /*------------------------------------*\
      LANDSCAPE
  \*------------------------------------*/
  console.log(`document.body.classList.contains('landscape'): ${document.body.classList.contains('landscape')}`);
  if (document.body.classList.contains('landscape')) {
    console.log('body moving');
    
    /*  CURSOR  */
    cursorMove(/*adjustedIndex*/CURRENT_INDEX);

    /*   TOTEM   */
    console.log(`theme: ${theme}`);
    console.log(document.querySelector(`.totem_${theme}.landscape`));
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
      console.log('step 1');
      const nameLetters = [];
      [...hotelEstablishmentNameLandscape.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

      window.setTimeout(() => {
        console.log('step 2');
        //Get slogan letters
        const sloganLetters = [...hotelSloganLandscape.children];

        window.setTimeout(() => {
          console.log('step 3');
          //Get option letters
          const hotelOption = document.querySelector('.showOption.landscape');
          const optionLetters = [...hotelOption.children];

          window.setTimeout(() => {
            console.log('step 4');
            window.setTimeout(() => {
              console.log('step 5');
              for (let letter of [...nameLetters, ...optionLetters, ...sloganLetters]) {
                letter.addEventListener('animationend', removeInitAnimationClasses);
                allLetters.push(letter);
              }
              console.log(allLetters);
              window.setTimeout(() => {
                console.log('step 6');
                alignDescriptionWithCursorOnMiddle();
                console.log('it worked !');
                console.log(allLetters);
              }, 200);
            }, 500);
          });
        }, 20);
      }, 20);
    }, 100);

    /*------------------------------------*\
        PORTRAIT
    \*------------------------------------*/
  } else if (document.body.classList.contains('portrait')) {
    /*   TOTEM   */
    totemsPortrait.forEach(totem => {
      const theme = Object.keys(slideshowParams)[totem.dataset.slideposition];
      const offsetLeft = slideshowParams[theme].imageMainLineFromLeft / slideshowParams[theme].imageHeight * window.getComputedStyle(totem)['height'].replace('px', '');
      totem.style.left = `calc(50vw - ${offsetLeft}px)`;
    });

    return;
  }
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
  console.log('we remove the init for divider');
  this.classList.remove('init');
  this.classList.remove('coming-in');
  this.removeEventListener('animationend', removeInitForDivider);
}

/*********** NOT WORKING **************/
// mqvideo1landscape.addListener(handleMediaQueries);
// mqvideo1portrait.addListener(handleMediaQueries);
// mqvideo2landscape.addListener(handleMediaQueries);
// mqvideo2portrait.addListener(handleMediaQueries);


/*------------------------------------*\
    BRACH LETTERS + SLOGAN
\*------------------------------------*/
let flSize = 0;
let mlSize = 0;
let sloganAlSize = 0;
let alSize = 0;


function handleMediaQueriesForLetters (e) {
  console.log('letters')
  //HOTEL NAME FIRST AND LAST LETTERS
  if (e.type === 'load') {
    // if (mqsmax.matches) {
    if (mqsm.matches) {
      flSize = 11;
      populateLetters();
      return;
    } else if (mql.matches) {
      flSize = 26.750;
      populateLetters();
      return;
    } else if (mqm.matches) {
      flSize = 18;
      populateLetters();
      return;
    } else if (mqsmin.matches) {
      flSize = 18;
      populateLetters();
      return;
    };
    // } else {
    //   flSize = 26.750;
    //   populateLetters();
    //   return;
    // }
  } else {
    console.log('delete and rebuild letters');
    // debugger
    let lettersToRemove = Promise.resolve([
          ...firstAndLastHotelLetterLandscape, 
          middleHotelLettersLandscape, 
          hotelSloganLandscape, 
          ...hotelOptionsContentLandscape, 
          // ...[...firstAndLastHotelLetterPortrait.children],
          // [...middleHotelLettersPortrait.children],
          // [...hotelSloganPortrait.children],
          // ...[...hotelOptionsContentPortrait.children]
        ])
      /******** LANDSCAPE *********/
      lettersToRemove.then(letters => {
        console.log('we got it !');
        console.log(letters);
        // new Promise((resolve, reject) => {
          let counter = 0;
          letters.forEach(letter => {
          while (letter.firstChild) {
            letter.removeChild(letter.firstChild);
          }
        //   counter++;
        //   console.log(`counter: ${counter}`);
        //   });
        //   if (counter === lettersToRemove.length) {
        //     resolve([counter, lettersToRemove.length]);
        //   } else {
        //     reject('didnt do it')
        //   } 
        })
      }) 
      .then((a) => {
        console.log('we did it again !');
        console.log(a);
        if (e.media === mqsmax.media) {
          // console.log('mqsmax')
          flSize = 11;
        } else if (e.media === mql.media) {
          // console.log('mql')
          flSize = 26.750;
        } else if (e.media === mqm.media) {
          // console.log('mqm')
          flSize = 18;
        } else if (e.media === mqsmin.media) {
          // console.log('mqmin')
          flSize = 18;
        } else {
          // console.log('nothing')
          return;
        }
      })
      .then(() => {
        console.log('we did the job');
        populateLetters();
        return;
      })
      .catch((a) => {
        console.error(`only ${a[0]} letters upon ${a[1]} have been removed`);
        return;
      });
  };
};

function populateLetters() {

  if (document.body.classList.contains('landscape')) {
    /******* LANDSCAPE ***********/
    //HOTEL NAME FIRST AND LAST LETTERS
    for (let i = 0; i < firstAndLastHotelLetterLandscape.length; i++) {
      const letter = firstAndLastHotelLetterLandscape[i];
      populateHotelOptions(letter, i, hotelFixedCharacters, flSize, 'Portrait');
    };

    //HOTEL NAME MIDDLE LETTERS
    mlSize = flSize * 0.86;
    populateHotelOptions(middleHotelLettersLandscape, 2, hotelFixedCharacters, mlSize, 'Portrait');

    //SLOGAN
    sloganAlSize = 0.35 * flSize;
    populateHotelOptions(hotelSloganLandscape, 3, hotelFixedCharacters, sloganAlSize, 'Cogito');

    //OPTIONS
    alSize = 2 * flSize;
    hotelOptionsContentLandscape.forEach(hotelOption => {
      populateHotelOptions(hotelOption, hotelOption.dataset['slideposition'], slideshowParams, alSize, 'Portrait');
    });

    //GIVE OPTIONSCONTAINER A HEIGHT LANDSCAPE
    const giveContainerAHeight = new Promise ((res, rej) => {
      let optionHeight;
      hotelOptionsContentLandscape.forEach(option => {
        if (option.getBoundingClientRect().height > 0) {
          optionHeight = option.getBoundingClientRect().height;
        }
      })
      optionHeight > 0 ? hotelOptionsContainerLandscape.style.height = `${optionHeight}px` : '';
      if (window.getComputedStyle(hotelOptionsContainerLandscape)['height'].replace('px', '') > 0) {
        res(hotelOptionsContainerLandscape.style.height);
      } else {
        rej(optionHeight);
      };
    });
    giveContainerAHeight
      .then(h => {
          alignDescriptionWithCursorOnMiddle();
      })
      .catch(h => {
        return;
      });
  } else {

    /********* PORTRAIT*******/
    firstAndLastHotelLetterPortraitLetters.forEach(letterGroup => {
      populateHotelOptions(letterGroup, letterGroup.dataset['letterindex'],hotelFixedCharacters, flSize, 'Portrait')
    });

    mlSize = flSize * 0.86;
    middleHotelLettersPortraitLetters.forEach(letterGroup => {
      populateHotelOptions(letterGroup, 2 ,hotelFixedCharacters, mlSize, 'Portrait')
    });

    sloganAlSize = 0.35 * flSize;
    hotelSloganPortraitLetters.forEach(letterGroup => {
      populateHotelOptions(letterGroup, 3 ,hotelFixedCharacters, sloganAlSize, 'Cogito')
    });
    alSize = 2 * flSize;
    hotelOptionsContentPortraitLetters.forEach(letterGroup => {
      populateHotelOptions(letterGroup, letterGroup.dataset['slideposition'] ,slideshowParams, alSize, 'Portrait');
    });
  }
}

function alignDescriptionWithCursorOnMiddle () {
  console.log('now we do our fucknig job');
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


// mqsmax.addListener(handleMediaQueriesForLetters);
// mqsm.addListener(handleMediaQueriesForLetters);
// mqsmin.addListener(handleMediaQueriesForLetters);
// mqm.addListener(handleMediaQueriesForLetters);
// mql.addListener(handleMediaQueriesForLetters);

window.addEventListener('resize', handleMediaQueries);
window.addEventListener('load', handleMediaQueries);

export { alignDescriptionWithCursorOnMiddle };
export { mqsm };
