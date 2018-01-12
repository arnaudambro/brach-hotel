'use strict';

import { exactCapitalLetterSize } from './_measureFont.js'; 
import { populateHotelOptions } from './slideshow/_populateLetters';
import PerfectScrollbar from 'perfect-scrollbar';
import { slideshowParams } from './slideshow/_params';


const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowDescription = document.querySelector('.slideshow__description');
const hotelOptionsContainer = document.querySelector('.slideshow__description--optionsContainer');
const hotelOptionHotel = document.querySelector('.option_hotel');
const hotelOptionsContent = [...document.querySelectorAll('.slideshow__description--options')];
const videoSubcontainers = [...document.querySelectorAll('.video__subcontainer')];

const white = 'rgba(250,250,250,1.00)';
const hotelFixedCharacters = {
  brachFirstLast: {
    position: 0,
    frenchName: 'b', 
    optionsLetterSpacing: 3,
    textColor: white,
  },
  brachLast: {
    position: 1,
    frenchName: 'h', 
    optionsLetterSpacing: 3,
    textColor: white,
  },
  brachMiddle: {
    position: 2,
    frenchName: 'rac', 
    optionsLetterSpacing: 3,
    textColor: white,
  },
  slogan: {
    position: 3,
    frenchName: 'un style de vie à paris', 
    optionsLetterSpacing: 3,
    textColor: white, 
  }
}


/*------------------------------------*\
    SLIDESHOW LANDSCAPE OR PORTRAIT
\*------------------------------------*/


function landscapeOrPortrait() {
  let landscapeOrientation = window.innerHeight <= window.innerWidth;
  if ((window.innerWidth > 1024) && landscapeOrientation) {
    wholeContentDiv.classList.add('slideshow__landscape');
    wholeContentDiv.classList.remove('slideshow__portrait');
  } else {
    wholeContentDiv.classList.remove('slideshow__landscape');
    wholeContentDiv.classList.add('slideshow__portrait');
  };

  if (1.28 * window.innerHeight < window.innerWidth * 0.5625) {
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('portrait');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.add('landscape-max');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.remove('portrait');

  } else {
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.remove('landscape-max');
    document.querySelector('.video1').querySelector('.video__subcontainer').classList.add('portrait');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.remove('landscape-max');
    document.querySelector('.video2').querySelector('.video__subcontainer').classList.add('portrait');
  }
};

landscapeOrPortrait()
window.addEventListener('resize', landscapeOrPortrait);
window.addEventListener('load', landscapeOrPortrait);
/*------------------------------------*\
    BRACH LETTERS
\*------------------------------------*/

const firstAndLastHotelLetter = document.querySelectorAll('.first-last-letter');
const middleHotelLetters = document.querySelector('.middle-letters');
const flSize = 26.750;
const mlSize = 23;

for (let i = 0; i < firstAndLastHotelLetter.length; i++) {
   const letter = firstAndLastHotelLetter[i]
  populateHotelOptions(letter, i, hotelFixedCharacters, flSize, 'Portrait');
};
populateHotelOptions(middleHotelLetters, 2, hotelFixedCharacters, mlSize, 'Portrait');

/*------------------------------------*\
    HÔTEL OPTIONS
\*------------------------------------*/

//SIZE for population in slideshow.js
const alSize = 2 * flSize;
hotelOptionsContent.forEach(hotelOption => {
  populateHotelOptions(hotelOption, hotelOption.dataset['slideposition'], slideshowParams, alSize, 'Portrait');
});


/*------------------------------------*\
    DESCRIPTION POSITION
\*------------------------------------*/

hotelOptionsContainer.style.height = `${hotelOptionHotel.getBoundingClientRect().height}px`

function alignDescriptionWithCursorOnMiddle () {
  const hotelOptionsBottom = hotelOptionsContainer.getBoundingClientRect().bottom;
  const hotelDescriptionBottom = slideshowDescription.getBoundingClientRect().bottom;
  const differenceWithMiddle = hotelDescriptionBottom - hotelOptionsBottom;
  slideshowDescription.style.marginBottom = `${-differenceWithMiddle}px`;
}

alignDescriptionWithCursorOnMiddle();

/*------------------------------------*\
    SLOGAN LETTERS
\*------------------------------------*/

const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const sloganAlSize = 0.35 * flSize;
populateHotelOptions(hotelSlogan, 3, hotelFixedCharacters, sloganAlSize, 'Cogito');




/*------------------------------------*\
    HIDE SCROLLBAR
\*------------------------------------*/

export { alSize };
