'use strict';

//DATA
import { slideshowParams } from './_params';

const slideshowDiv = document.querySelector(".slideshow__backup--content");

  Object.keys(slideshowParams).forEach(option => {
    const newOptionDiv = document.createElement('div');
    newOptionDiv.style.backgroundImage = `url('${slideshowParams[option].backupPictureUrl()}')`;
    newOptionDiv.style.backgroundRepeat = 'no-repeat';
    newOptionDiv.style.backgroundSize = 'auto 100%';
    newOptionDiv.style.backgroundPositionY = 'bottom';
    newOptionDiv.style.width = '100%';
    newOptionDiv.style.height = `${slideshowDiv.getBoundingClientRect().width / 1.75}px`;
    slideshowDiv.appendChild(newOptionDiv);
  });

function statisSlidewhow () {
  [...slideshowDiv.children].forEach(div => {
    div.style.width = '100%';
    div.style.height = `${slideshowDiv.getBoundingClientRect().width / 1.75}px`;
  });
};

statisSlidewhow();
window.addEventListener('resize', statisSlidewhow);
