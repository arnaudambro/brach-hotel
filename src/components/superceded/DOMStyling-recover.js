'use strict';

import { exactCapitalLetterSize } from './_measureFont.js'; 
import { populateHotelOptions } from './slideshow/_populateLetters';
import PerfectScrollbar from 'perfect-scrollbar';
import { slideshowParams, hotelFixedCharacters } from './slideshow/_params';
import 'match-media';  
import { playerLoad, player1, player2  } from './_video1';
import { startTransitionSlideshow, togglePlayPause } from './slideshow/slideshow';


const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowDescriptions = [...document.querySelectorAll('.slideshow__description')];
const hotelOptionsContent = [...document.querySelectorAll('.slideshow__description--options')];
const videoSubcontainers = [...document.querySelectorAll('.video__subcontainer')];
const totems = [...document.querySelectorAll('.slideshow__totem')];
const firstAndLastHotelLetter = [...document.querySelectorAll('.first-last-letter')];
const allMiddleHotelLetters = [...document.querySelectorAll('.middle-letters')];
const hotelSlogans = [...document.querySelectorAll('.slideshow__description--slogan')];
const animVideo = document.querySelector('#video-anim');
const dividerInDescriptions = [...document.querySelectorAll('.slideshow__description--divider')];
const verticalDividerInMouseScroll = document.querySelector('.verticalDivider');
const slideshowBackup = document.querySelector('.slideshow__backup');
const footer = document.querySelector('.footer');
const videoFilters = document.querySelectorAll('.transparent_filter-for-allow-scrolling');
const video1Div = document.querySelector('#video1');
const video2Div = document.querySelector('#video2');
const controlVideo1PointerEvents = document.querySelector('.video1').querySelector('.transparent_filter-for-allow-scrolling');
const controlVideo2PointerEvents = document.querySelector('.video2').querySelector('.transparent_filter-for-allow-scrolling');
const closeFooter = footer.querySelector('.footer-cross');
const formFrench = document.querySelector('.formContainer');

let ps;

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
  console.log('handle media query');
  console.log(`mqvideo1landscape.matches: ${mqvideo1landscape.matches}`);
  /********* VIDEO 1 ************/
  //If 1.28 * window.innerHeight < window.innerWidth * 0.5625 <=> if width / height > 12800 / 5625
  if ((1.3125 * window.innerHeight < window.innerWidth * 0.5625)) {
    console.log('resize video landscape');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('portrait');
  };
  if((1.3125 * window.innerHeight >= window.innerWidth * 0.5625)) {
    console.log('resize video portrait');
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
    //Backup
    slideshowBackup.classList.add('portrait');
    slideshowBackup.classList.remove('landscape');
    //Main
    slideshowDiv.classList.add('portrait');
    slideshowDiv.classList.remove('landscape');
    //Description
    slideshowDescriptions.forEach(slideshowDescription => {
      slideshowDescription.style.marginBottom = ``;
      slideshowDescription.classList.add('portrait');
      slideshowDescription.classList.remove('landscape');
    });
    //Divider
    dividerInDescriptions.forEach(dividerInDescription => {
      dividerInDescription.classList.add('portrait');
      dividerInDescription.classList.remove('landscape');
    });
    //Mouse
    verticalDividerInMouseScroll.classList.add('portrait');
    verticalDividerInMouseScroll.classList.remove('landscape');
    //Slogan
    hotelSlogans.forEach( hotelSlogan => {
      hotelSlogan.classList.add('portrait');
      hotelSlogan.classList.remove('landscape');
    });
    //Totem
    totems.forEach(totem => {
      totem.classList.add('portrait');
      totem.classList.remove('landscape');
      const theme = Object.keys(slideshowParams)[totem.dataset.slideposition];
      const offsetLeft = slideshowParams[theme].imageMainLineFromLeft / slideshowParams[theme].imageHeight * window.getComputedStyle(totem)['height'].replace('px', '');
      totem.style.left = `calc(50vw - ${offsetLeft}px)`;
    });

    //Video playing
    playerLoad(player1);
    playerLoad(player2);
    //FOoter
    footer.classList.add('portrait');
    footer.classList.remove('landscape');
    //Body
    document.body.classList.add('portrait');
    document.body.classList.remove('landscape');
    //Whiole content
    wholeContentDiv.classList.add('portrait');
    wholeContentDiv.classList.remove('landscape');
    //Video
    // videoFilters.forEach(filter => filter.classList.add('portrait'));

  } else {
    slideshowBackup.classList.remove('portrait');
    slideshowBackup.classList.add('landscape');
    slideshowDiv.classList.remove('portrait');
    slideshowDiv.classList.add('landscape');
    slideshowDescriptions.forEach(slideshowDescription => {
      slideshowDescription.classList.remove('portrait');
      slideshowDescription.classList.add('landscape');
    });

    dividerInDescriptions.forEach(dividerInDescription => {
      dividerInDescription.classList.remove('portrait');
      dividerInDescription.classList.add('landscape');
    });
    verticalDividerInMouseScroll.classList.remove('portrait');
    verticalDividerInMouseScroll.classList.add('landscape');
    hotelSlogans.forEach( hotelSlogan => {
      hotelSlogan.classList.remove('portrait');
      hotelSlogan.classList.add('landscape');
    });
    totems.forEach(totem => {
      totem.classList.remove('portrait');
      totem.classList.add('landscape');
      totem.style.left = ``;
    });
    footer.classList.remove('portrait');
    footer.classList.add('landscape');
    document.body.classList.remove('portrait');
    document.body.classList.add('landscape');
    wholeContentDiv.classList.remove('portrait');
    wholeContentDiv.classList.add('landscape');
    // videoFilters.forEach(filter => filter.classList.remove('portrait'));

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
  console.log('letters')
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
      const lettersToRemove = [...firstAndLastHotelLetter, ...allMiddleHotelLetters, ...hotelSlogans, ...hotelOptionsContent];
      let counter = 0;
      [...firstAndLastHotelLetter, ...middleHotelLetters, ...hotelSlogans, ...hotelOptionsContent].forEach(letter => {
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
    populateHotelOptions(letter, letter.dataset.letterindex, hotelFixedCharacters, flSize, 'Portrait');
  };

  //HOTEL NAME MIDDLE LETTERS
  mlSize = flSize * 0.86;
  allMiddleHotelLetters.forEach(middleHotelLetters => {
    populateHotelOptions(middleHotelLetters, 2, hotelFixedCharacters, mlSize, 'Portrait');
  });

  //SLOGAN
  sloganAlSize = 0.35 * flSize;
  hotelSlogans.forEach(hotelSlogan => {
    populateHotelOptions(hotelSlogan, 3, hotelFixedCharacters, sloganAlSize, 'Cogito');
  });
  //OPTIONS
  alSize = 2 * flSize;
  hotelOptionsContent.forEach(hotelOption => {
    populateHotelOptions(hotelOption, hotelOption.dataset['slideposition'], slideshowParams, alSize, 'Portrait');
  });

  const giveContainerAHeight = new Promise ((res, rej) => {
    // console.log('trying in promise');
    let optionHeight;
    hotelOptionsContent.forEach(option => {
      if (option.getBoundingClientRect().height > 0) {
        optionHeight = option.getBoundingClientRect().height;
      }
    })
    slideshowDescriptions.forEach(slideshowDescription => {
      const hotelOptionsContainer = slideshowDescription.querySelector('.slideshow__description--optionsContainer');
      optionHeight > 0 ? hotelOptionsContainer.style.height = `${optionHeight}px` : '';
      if (window.getComputedStyle(hotelOptionsContainer)['height'].replace('px', '') > 0) {
        res(hotelOptionsContainer.style.height);
      } else {
        rej(optionHeight);
      };
    });
  });
  giveContainerAHeight
    .then(h => {
      slideshowDescriptions.forEach(slideshowDescription => {
        if (slideshowDescription.classList.contains('landscape')) {
          // console.log('landscape');
          alignDescriptionWithCursorOnMiddle();
          return;
        } else {
          return;
        };
      });
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
};


function alignDescriptionWithCursorOnMiddle () {
  // console.log('now we do our fucknig job');
  let optionHeight;
  hotelOptionsContent.forEach(option => {
    if (option.getBoundingClientRect().height > 0) {
      optionHeight = option.getBoundingClientRect().height;
      // console.log(`optionHeight: ${optionHeight}`);
    }
  });
  slideshowDescriptions.forEach(slideshowDescription => {
    if (slideshowDescription.classList.contains('portrait')) {
      optionHeight > 0 ? slideshowDescription.querySelector('.slideshow__description--optionsContainer').style.height = `${optionHeight}px` : '';
      return;
    } else {
      optionHeight > 0 ? slideshowDescription.querySelector('.slideshow__description--optionsContainer').style.height = `${optionHeight}px` : '';
      const hotelOptionsBottom = slideshowDescription.querySelector('.slideshow__description--optionsContainer').getBoundingClientRect().bottom;
      const hotelDescriptionBottom = slideshowDescription.getBoundingClientRect().bottom;
      const differenceWithMiddle = hotelDescriptionBottom - hotelOptionsBottom;
      slideshowDescription.style.marginBottom = `${-differenceWithMiddle}px`;
    };
  });
};

mqsmax.addListener(handleMediaQueriesForLetters);
mqsmin.addListener(handleMediaQueriesForLetters);
mqm.addListener(handleMediaQueriesForLetters);
mql.addListener(handleMediaQueriesForLetters);

window.addEventListener('load', handleMediaQueriesForLetters);

export { alignDescriptionWithCursorOnMiddle };
