'use strict';

import { populateHotelOptions } from './populateLetters';
  //Building the new totem

function buildFakeTotem (totemDiv, motherDiv, data, index, up) {
  let newTotemDiv;
  newTotemDiv = totemDiv.cloneNode(true);
  newTotemDiv.style.position = `absolute`;
  newTotemDiv.style.height = `${totemDiv.getBoundingClientRect().height}px`;
  newTotemDiv.style.left = `${totemDiv.getBoundingClientRect().left}px`;
  newTotemDiv.style.right = `${totemDiv.getBoundingClientRect().right}px`;
  newTotemDiv.style.top = `${totemDiv.getBoundingClientRect().top + (up ? 1 : -1) * motherDiv.getBoundingClientRect().height}px`;
  newTotemDiv.style.width = `${totemDiv.getBoundingClientRect().width}px`;
  newTotemDiv.style.backgroundRepeat = 'no-repeat';
  newTotemDiv.style.backgroundSize = 'auto 100%';
  newTotemDiv.style.backgroundPositionY = 'bottom';
  const theme = Object.keys(data)[index];
  newTotemDiv.style.backgroundImage = `url('${data[theme].totemPicture()}')`;

  return newTotemDiv;
  //TO DO IN THE FUNCTION
  // document.body.append(newTotemDiv);
};

function buildFakeHotelOptionLetters (motherDiv, data, index, offset, size) {
  // console.log(`offset: ${offset}`);
  let newHotelOptions;
  newHotelOptions = motherDiv.cloneNode(false);

  populateHotelOptions(newHotelOptions, index, data, size);

  const divHorizontalCenter = (motherDiv.getBoundingClientRect().right - motherDiv.getBoundingClientRect().left) / 2;

  // console.log(motherDiv);
  // console.log(newHotelOptions);
  // console.log(`motherDiv.getBoundingClientRect().width: ${motherDiv.getBoundingClientRect().width}`);
  // console.log(`motherDiv.style.width: ${motherDiv.style.width}`);
  // console.log(`newHotelOptions.style.width: ${newHotelOptions.style.width}`);

  newHotelOptions.style.position = `absolute`;
  newHotelOptions.style.height = `${motherDiv.getBoundingClientRect().height}px`;
  newHotelOptions.style.width = `${motherDiv.getBoundingClientRect().width}px`;
  newHotelOptions.style.left = `${motherDiv.getBoundingClientRect().left}px`;
  newHotelOptions.style.top = `${motherDiv.getBoundingClientRect().top + offset}px`;
  [...newHotelOptions.children].forEach(letter => {
    letter.style.opacity = `0`;
  });
  const theme = Object.keys(data)[index];
  newHotelOptions.style.color = data[theme].textColor;


  return newHotelOptions;
  //TO DO IN THE FUNCTION
  // document.body.append(newHotelOptions);
};



export { buildFakeTotem, buildFakeHotelOptionLetters };
