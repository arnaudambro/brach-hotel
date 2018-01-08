'use strict';

//DATA
import { slideshowParams } from './params';

const slideshowDiv = document.querySelector(".slideshow__backup--content");

Object.keys(slideshowParams).forEach(option => {
  const newOptionDiv = document.createElement('div');
  newOptionDiv.style.backgroundImage = `url('${slideshowParams[option].backupPicture()}')`;
  newOptionDiv.style.backgroundRepeat = 'no-repeat';
  newOptionDiv.style.backgroundSize = 'auto 100%';
  newOptionDiv.style.backgroundPositionY = 'bottom';
  newOptionDiv.style.width = '100%';
  newOptionDiv.style.height = `${slideshowDiv.getBoundingClientRect().width / 1.75}px`;
  slideshowDiv.appendChild(newOptionDiv);
})

console.log(slideshowDiv)
