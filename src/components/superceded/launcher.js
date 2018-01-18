'use strict';

import { alignDescriptionWithCursorOnMiddle } from './DOMStyling.js';
import { init, CURRENT_INDEX } from './slideshow/slideshow';

const animVideo = document.querySelector('#video-anim');

function whenLoadedData(e) {
  animVideo.play();
  init(CURRENT_INDEX)
    .then(console.log('it worked !');)
    .then(alignDescriptionWithCursorOnMiddle());
}
