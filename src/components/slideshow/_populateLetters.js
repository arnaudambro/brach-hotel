'use strict';

import { exactCapitalLetterSize } from '../_measureFont'; 
import "babel-polyfill";

function populateHotelOptions (motherDiv, index, data, size, ffamily, anyLetterSpacing = 0) {
  const theme = Object.keys(data)[index];
  
  // we do <p><span>'letter'</span></p> for each letter, in order to create an animation on each letter
  for (let i = 0; i < data[theme].frenchName.length; i++) {
    const newLetterP = document.createElement('p');
    const newLetterSpan = document.createElement('span');
    newLetterP.appendChild(newLetterSpan);
    newLetterSpan.textContent = data[theme].frenchName.charAt(i);
    motherDiv.appendChild(newLetterP);
  }
  //then letter spacing with margin
  [...motherDiv.children].forEach(letter => {
    exactCapitalLetterSize(letter, ffamily, size, 1);
    //If the character is a space, make it clear to the eye by enlarging it 
    const letterSpacing = data[theme].optionsLetterSpacingLargeScreen * size / data[theme].fontSizeLargeScreen
    if (letter.firstChild.textContent.charCodeAt(0) === 32) {
      letter.style.marginRight = `${5 * (anyLetterSpacing === 0 ? letterSpacing : anyLetterSpacing)}px`;
    } else {
      letter.style.marginRight = `${anyLetterSpacing === 0 ? letterSpacing : anyLetterSpacing}px`;
    }
  })
};


export { populateHotelOptions };
