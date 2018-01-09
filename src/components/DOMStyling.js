'use strict';

import { exactCapitalLetterSize } from './_measureFont.js'; 
import PerfectScrollbar from 'perfect-scrollbar';


const wholeContentDiv = document.querySelector('#wholeContent')
const slideshowDiv = document.querySelector(".slideshow");
const slideshowDescription = document.querySelector('.slideshow__description');
const hotelOptions = document.querySelector('.slideshow__description--options');
const hotelOptionsLetters = [...hotelOptions.children];
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
};

landscapeOrPortrait()
window.addEventListener('resize', landscapeOrPortrait);
/*------------------------------------*\
    BRACH LETTERS
\*------------------------------------*/

const firstAndLastHotelLetter = document.querySelectorAll('.first-last-letter');
const middleHotelLetters = document.querySelectorAll('.middle-letters');
const flSize = 26.750;
const mlSize = 23;

firstAndLastHotelLetter.forEach(letter => exactCapitalLetterSize(letter, 'Portrait-light', flSize, 1));
middleHotelLetters.forEach(letter => exactCapitalLetterSize(letter, 'Portrait-light', mlSize, 1));

/*------------------------------------*\
    HÔTEL OPTIONS LETTERS
\*------------------------------------*/

const alSize = 2 * flSize;
hotelOptionsLetters.forEach(letter => {
  exactCapitalLetterSize(letter, 'Portrait', alSize, 1);
});


/*------------------------------------*\
    SLOGAN LETTERS
\*------------------------------------*/

const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const sloganAlSize = 0.35 * flSize;
exactCapitalLetterSize(hotelSlogan, 'Cogito', sloganAlSize, 1)


/*------------------------------------*\
    DESCRIPTION POSITION
\*------------------------------------*/

function alignDescriptionWithCursorOnMiddle () {
  const hotelOptionsBottom = hotelOptions.offsetTop + hotelOptions.offsetHeight;
  const windowHeight = window.innerHeight;
  const differenceWithMiddle = hotelOptionsBottom - windowHeight / 2;
  slideshowDescription.style.marginBottom = `${differenceWithMiddle * 2 - 4}px`;
}

alignDescriptionWithCursorOnMiddle();

/*------------------------------------*\
    HIDE SCROLLBAR
\*------------------------------------*/

export { alSize };
