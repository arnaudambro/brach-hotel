import { slideshowParams } from './slideshow/_params';


/*------------------------------------*\
    VARIABLES - QUERYSELECTORS
\*------------------------------------*/

const wholeContentDiv = document.querySelector('#wholeContent')

/*********SLIDESHOW*************/
const slideshowDiv = document.querySelector(".slideshow");
const slideshowContentDiv = document.querySelector(".slideshow__content");

const slideshowBackupDiv = document.querySelector(".slideshow__backup--container");

/**********VIDEOS**************/
const video1 = document.querySelector('.video__video1');
const video2 = document.querySelector('.video__video2');



/*------------------------------------*\
    VARIABLES - CONTROLLER
\*------------------------------------*/

const numberOfSlides = Object.keys(slideshowParams).length;

/** CURRENT_INDEX VALUES **/
/** CURRENT_INDEX = 0  <=>  loading anim
/** CURRENT_INDEX = 1  <=>  slideshow pic 1
/** CURRENT_INDEX = 2  <=>  slideshow pic 2
/** CURRENT_INDEX = 3  <=>  slideshow pic 3
/** CURRENT_INDEX = 4  <=>  slideshow pic 4
/** CURRENT_INDEX = 5  <=>  slideshow pic 5
/** CURRENT_INDEX = 6  <=>  slideshow pic 6
/** CURRENT_INDEX = 7  <=>  video 1
/** CURRENT_INDEX = 8  <=>  video 2
/** CURRENT_INDEX = 9  <=>  footer **/


let CURRENT_INDEX = 1 ;


function dispatchAnimation(e) {
  switch (true) {
    case (CURRENT_INDEX > 0 && CURRENT_INDEX < numberOfSlides):
      const keyPressedIsNoGood = (e.type === 'keyup') && (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32);
      if (keyPressedIsNoGood) { break };
      const eventCases = {
        wheeledUp: (e.type === 'mousewheel' && e.deltaY < 0),
        wheeledDown: (e.type === 'mousewheel' && e.deltaY > 0),
        keyDown: (e.type === 'keyup' && ((e.keyCode === 40) || (e.keyCode === 32))),
        keyUp: (e.type === 'keyup' && (e.keyCode === 38)),  //38 = arrow up
        clickedMouseForDown: (e.type === 'click' && e.srcElement.className === 'mouse'),
      };
      const eventGoUp = (eventCases.keyUp || eventCases.wheeledUp);
      const eventGoDown = (eventCases.keyDown || eventCases.wheeledDown || eventCases.clickedMouseForDown);
  }
}


/*------------------------------------*\
    EVENT LISTENERS
\*------------------------------------*/
window.addEventListener('keyup', function(e) {
    //Prevent scrolling when pressing space
  e.preventDefault();
  dispatchAnimation(e);
})

wholeContentDiv.addEventListener('mousewheel', function(e) {
    e.preventDefault();

  dispatchAnimation(e);
})

document.querySelector('.scroll-btn').addEventListener('click', function(e) {
    e.preventDefault();

  dispatchAnimation(e);
})


/*------------------------------------*\
    EXPORTS
\*------------------------------------*/

export { wholeContentDiv,
         slideshowDiv,
         slideshowContentDiv,
         slideshowBackupDiv,
         video1,
         video2,
         numberOfSlides,
         CURRENT_INDEX 
       };
