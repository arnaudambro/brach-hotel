'use strict';

import { exactCapitalLetterSize } from './_measureFont.js'; 
import { populateHotelOptions } from './slideshow/_populateLetters';
import PerfectScrollbar from 'perfect-scrollbar';
import { slideshowParams, hotelFixedCharacters } from './slideshow/_params';
import 'match-media';  


const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowDescription = document.querySelector('.slideshow__description');
const hotelOptionsContainer = document.querySelector('.slideshow__description--optionsContainer');
const hotelOptionHotel = document.querySelector('.option_hotel');
const hotelOptionsContent = [...document.querySelectorAll('.slideshow__description--options')];
const videoSubcontainers = [...document.querySelectorAll('.video__subcontainer')];
const totems = [...document.querySelectorAll('.slideshow__totem')];
const firstAndLastHotelLetter = document.querySelectorAll('.first-last-letter');
const middleHotelLetters = document.querySelector('.middle-letters');
const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const animVideo = document.querySelector('#video-anim');
const dividerInDescription = slideshowDiv.querySelector('.slideshow__description--divider');
const verticalDividerInMouseScroll = document.querySelector('.verticalDivider');

/***** MEDIA QUERIES ******/
const smallwidth = 550;
const smallmediumwidth = 800;
const mediumwidth = 990;
const largewidth = 2 * smallwidth / 0.9; // = 1333
const ratioVideo1 = '21/9'; //~ 21/9 
const ratioVideo2 = ratioVideo1; 
/*Special ratio between portrait and landscape because to keep the video fullscreen whatever size of the screen (like in bigmammagroup.com/it/accueil), because video1 has white lines on top and bottom. We would need to increase from 1.3125 the height of the video to make the white line disappear, and as the ratio is 0.5625 already, the ratio we want is 12800/5625, this is the ratio we want.*/

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

  /********* VIDEO 1 ************/
  //If 1.28 * window.innerHeight < window.innerWidth * 0.5625 <=> if width / height > 12800 / 5625
  if (mqvideo1landscape.matches || (1.3125 * window.innerHeight < window.innerWidth * 0.5625)) {
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('portrait');
  };
  if(mqvideo1portrait.matches || (1.3125 * window.innerHeight >= window.innerWidth * 0.5625)) {
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('portrait');
  };

  /********* VIDEO 2 ************/
  //If 1.3125 * window.innerHeight < window.innerWidth * 0.5625 <=> if width / height > 12800 / 5625
  if (mqvideo2landscape.matches || (1.3125 * window.innerHeight < window.innerWidth * 0.5625)) {
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.remove('portrait');
  };
  if (mqvideo2portrait.matches || (1.3125 * window.innerHeight >= window.innerWidth * 0.5625)) {
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.remove('landscape-max');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.add('portrait');
  };

  /********* SLIDESHOW ************/
  /***** TOTEMS ************/
  if (mqsm.matches) {
    //Description
    slideshowDescription.style.marginBottom = ``;
    slideshowDescription.classList.add('portrait');
    slideshowDescription.classList.remove('landscape');
    //Divider
    dividerInDescription.classList.add('portrait');
    dividerInDescription.classList.remove('landscape');
    //Mouse
    verticalDividerInMouseScroll.classList.add('portrait');
    verticalDividerInMouseScroll.classList.remove('landscape');
    //Slogan
    hotelSlogan.classList.add('portrait');
    hotelSlogan.classList.remove('landscape');
    //Totem
    totems.forEach(totem => {
      totem.classList.add('portrait');
      totem.classList.remove('landscape');
      const theme = Object.keys(slideshowParams)[totems.indexOf(totem)];
      const offsetLeft = slideshowParams[theme].imageMainLineFromLeft / slideshowParams[theme].imageHeight * window.getComputedStyle(totem)['height'].replace('px', '');
      totem.style.left = `calc(50vw - ${offsetLeft}px)`;
    });
  } else {
    slideshowDescription.classList.remove('portrait');
    slideshowDescription.classList.add('landscape');
    dividerInDescription.classList.remove('portrait');
    dividerInDescription.classList.add('landscape');
    verticalDividerInMouseScroll.classList.remove('portrait');
    verticalDividerInMouseScroll.classList.add('landscape');
    hotelSlogan.classList.remove('portrait');
    hotelSlogan.classList.add('landscape');
    totems.forEach(totem => {
      totem.classList.remove('portrait');
      totem.classList.add('landscape');
      totem.style.left = ``;
    });
  };
};


window.addEventListener('resize', handleMediaQueries);
window.addEventListener('load', handleMediaQueries);

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
  // console.log('letters')
  //HOTEL NAME FIRST AND LAST LETTERS
  if (e.type === 'load') {
    if (mqsmax.matches) {
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
  } else {
    let removeLetters = new Promise ((resolve, reject) => {
      const lettersToRemove = [...firstAndLastHotelLetter, middleHotelLetters, hotelSlogan, ...hotelOptionsContent];
      let counter = 0;
      [...firstAndLastHotelLetter, middleHotelLetters, hotelSlogan, ...hotelOptionsContent].forEach(letter => {
        while (letter.firstChild) {
          letter.removeChild(letter.firstChild);
        }
        counter++;
      });
      if (counter === lettersToRemove.length) {
        resolve([counter, lettersToRemove.length]);
      } else {
        reject([counter, lettersToRemove.length]);
      };
    });
    removeLetters
      .then((a) => {
        // console.log(`${a[0]} letters upon ${a[1]} have been removed`)
      })
      .then(() => {
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
        // console.log('we did the job');
        populateLetters();
        return;
      })
      .catch((a) => {
        // console.error(`only ${a[0]} letters upon ${a[1]} have been removed`);
        return;
      });
  };
};

function populateLetters() {

  for (let i = 0; i < firstAndLastHotelLetter.length; i++) {
    const letter = firstAndLastHotelLetter[i];
    populateHotelOptions(letter, i, hotelFixedCharacters, flSize, 'Portrait');
  };

  //HOTEL NAME MIDDLE LETTERS
  mlSize = flSize * 0.86;
  populateHotelOptions(middleHotelLetters, 2, hotelFixedCharacters, mlSize, 'Portrait');

  //SLOGAN
  sloganAlSize = 0.35 * flSize;
  populateHotelOptions(hotelSlogan, 3, hotelFixedCharacters, sloganAlSize, 'Cogito');

  //OPTIONS
  alSize = 2 * flSize;
  hotelOptionsContent.forEach(hotelOption => {
    populateHotelOptions(hotelOption, hotelOption.dataset['slideposition'], slideshowParams, alSize, 'Portrait');
  });

  const giveContainerAHeight = new Promise ((res, rej) => {
    let optionHeight;
    hotelOptionsContent.forEach(option => {
      if (option.getBoundingClientRect().height > 0) {
        optionHeight = option.getBoundingClientRect().height;
      }
    })
    optionHeight > 0 ? hotelOptionsContainer.style.height = `${optionHeight}px` : '';
    if (window.getComputedStyle(hotelOptionsContainer)['height'].replace('px', '') > 0) {
      res(hotelOptionsContainer.style.height);
    } else {
      rej(optionHeight);
    };
  });
  giveContainerAHeight
    .then(h => {
      if (slideshowDescription.classList.contains('landscape')) {
        console.log('landscape');
        alignDescriptionWithCursorOnMiddle();
        return;
      } else {
        return;
      }
    })
    .catch(h => {
      return;
    });

  if (mqm.matches) {
    hotelOptionsContent.forEach(hotelOption => {
      hotelOption.classList.remove('portrait');
    });
  } else {
    hotelOptionsContent.forEach(hotelOption => {
      hotelOption.classList.add('portrait');
    });
  };
}
function alignDescriptionWithCursorOnMiddle () {
  console.log('now we do our fucknig job');
  let optionHeight;
  hotelOptionsContent.forEach(option => {
    if (option.getBoundingClientRect().height > 0) {
      optionHeight = option.getBoundingClientRect().height;
    }
  })
  optionHeight > 0 ? hotelOptionsContainer.style.height = `${optionHeight}px` : '';
  if (slideshowDescription.classList.contains('portrait')) {
    return;
  } else {
    const hotelOptionsBottom = hotelOptionsContainer.getBoundingClientRect().bottom;
    const hotelDescriptionBottom = slideshowDescription.getBoundingClientRect().bottom;
    const differenceWithMiddle = hotelDescriptionBottom - hotelOptionsBottom;
    slideshowDescription.style.marginBottom = `${-differenceWithMiddle}px`;
  }
};

mqsmax.addListener(handleMediaQueriesForLetters);
mqsmin.addListener(handleMediaQueriesForLetters);
mqm.addListener(handleMediaQueriesForLetters);
mql.addListener(handleMediaQueriesForLetters);

window.addEventListener('load', handleMediaQueriesForLetters);
// animVideo.addEventListener('playing', function(e) {
//   window.setTimeout(() => {
//     alignDescriptionWithCursorOnMiddle()
//   }, 500);
// });

export { alignDescriptionWithCursorOnMiddle };
