'use strict';
import 'dragscroll';


/*---------------- Variables ---------------------*/
const carouselContainer = document.querySelector('.chap-text-carousel-container');

// const textColor = window.getComputedStyle(carouselContainer).getPropertyValue('color');

const arrowRightChap5 = document.querySelector('#chap-5-arrow-right');
const arrowLeftChap5 = document.querySelector('#chap-5-arrow-left');

let clickedIndex = 0;
let counterScroll;


let carouselContentObjects = [
{
  number: `1`,
  text: `Navigate and perform inspections autonomously in complete safety and deliver reliable information and analyses.`
},
{
  number: `2`,
  text: `Manage internal and external events correctly: anomalies at inspection point, internal malfunctions, emergency shut-downs, low battery, alarms, static or moving obstacles such as detecting the presence of an operator...`
},
{
  number: `3`,
  text: `Operate in a degraded situation (loss of wifi connection, unknown obstacle detection and navigation).`
},
{
  number: `4`,
  text: `Monitor the environment by analysing the sounds coming from pumps.`
},
{
  number: `5`,
  text: `Demonstrate the robot's reactivity: programming speed, rapid switch between autonomous mode and teleoperated mode.`
},
{
  number: `6`,
  text: `Develop a man-machine interface that is easy to use and intuitive.`
}
];


/*-------------- Load Carousel --------------*/


let currentDisplayedIndex;


carouselContentObjects.forEach(object => {

  const carouselSubcontainer = document.createElement('div');
  carouselSubcontainer.classList.add('chap-5-text-carousel-subcontainer');
  carouselContainer.appendChild(carouselSubcontainer);

  const carouselDisplayNumber = document.createElement('span');
  carouselDisplayNumber.classList.add('chap-text-carousel-text-number');
  carouselDisplayNumber.textContent = object.number;
  carouselSubcontainer.appendChild(carouselDisplayNumber);

  const carouselDisplayText = document.createElement('p');
  carouselDisplayText.classList.add('chap-text-carousel-text-text');
  carouselDisplayText.textContent = object.text;
  carouselSubcontainer.appendChild(carouselDisplayText);

  // if (carouselContainer.scrollLeft === 0) {
  //   arrowLeftChap5.style.color = 'white';
  //   arrowLeftChap5.style.cursor = 'auto';
  // }

})

// function initCarousel (index) {
//   currentDisplayedIndex = index;
//   carouselDisplayNumber.textContent = carouselContentObjects[currentDisplayedIndex].number;
//   carouselDisplayText.textContent = carouselContentObjects[currentDisplayedIndex].text;
// }
// initCarousel(0);
// /*---------- IF CLICKED ON THE ARROWS ---------------*/

function clickingOnArrow (e) {

  //Variables spécifiques
  const arrowClicked = this;
  const currentScrolled = carouselContainer.scrollLeft;
  const widthOfSubcontainer = window.getComputedStyle(carouselContainer).getPropertyValue('width').replace('px', '');
  const carouselContainerMaxScroll  = Math.floor(widthOfSubcontainer * (carouselContentObjects.length - 1));
  const previousIndex = Math.floor(currentScrolled / widthOfSubcontainer);

  //Variables scrolling animation
  const timeScale = 50;
  let scrollIsUpToDate = false;
  let counterScroll = 0;
  const transitionDuration = 500;
  let scrolled;
  let toScroll;
  let newScrollPosition;
  let carouselMoving;

  //Define if need to scroll and to where need to scroll
  //Define newScrollPosition and toScroll

  if ((arrowClicked === arrowRightChap5 && currentScrolled === carouselContainerMaxScroll) || (arrowClicked === arrowLeftChap5 && currentScrolled === 0) || ((100 * currentScrolled) % (100 * widthOfSubcontainer) != 0)) {
    e.preventDefault();
    return;
  } else if (arrowClicked === arrowRightChap5) {
    const nextIndex = (previousIndex === 0 ? 1 : Math.ceil((currentScrolled + 1) / widthOfSubcontainer));
    const nextScroll = (currentScrolled === Math.floor(nextIndex * widthOfSubcontainer) ? Math.floor((nextIndex + 1) * widthOfSubcontainer) : Math.floor(nextIndex * widthOfSubcontainer));
    const remainingScroll = nextScroll - carouselContainer.scrollLeft;
    newScrollPosition = nextScroll;
    toScroll = remainingScroll;
    // if (nextScroll === carouselContainerMaxScroll) {
    //   arrowClicked.style.color = 'white';
    //   arrowClicked.style.cursor = 'auto';
    // } else if (Math.floor(nextScroll) === Math.floor(widthOfSubcontainer)) {
    //   arrowLeftChap5.style.color = `${textColor}`;
    //   arrowLeftChap5.style.cursor = 'pointer';
    // }
    animateScrolling ();
  } else if (arrowClicked === arrowLeftChap5) {
    const previousScroll = Math.floor((previousIndex - 1) * widthOfSubcontainer);
    const remainingScroll = previousScroll - carouselContainer.scrollLeft;
    newScrollPosition = previousScroll;
    toScroll = remainingScroll;
    // if (previousScroll === 0) {
    //   arrowClicked.style.color = 'white';
    //   arrowClicked.style.cursor = 'auto';
    // } else if (Math.floor(previousScroll) === Math.floor(carouselContainerMaxScroll - widthOfSubcontainer)) {
    //   arrowRightChap5.style.color = `${textColor}`;
    //   arrowRightChap5.style.cursor = 'pointer';
    // }
    animateScrolling ();
  }

  //Functions animation
  function scrollSpeed (alreadyScrolled) {
    //Equation du second degré : on veut une fonction en -x2 pour laquelle f(0) = 0, f(toScroll) = 0, f(toScroll/2) = maxSpeed
    return 3 * alreadyScrolled / transitionDuration * (1 - alreadyScrolled / toScroll);
  }

  function calculateScrollingToDo () {
    scrollIsUpToDate = (carouselContainer.scrollLeft == newScrollPosition);
    animateScrolling();
  }

  function animateScrolling () {
    counterScroll++;
    if (scrollIsUpToDate) {
      return;
    }
    counterScroll === 1 ? scrolled = 1 : scrolled = (toScroll - (newScrollPosition - carouselContainer.scrollLeft));
    Math.abs(scrollSpeed(scrolled) * timeScale) < 1 ? carouselContainer.scrollLeft += (Math.abs(toScroll) / toScroll) : carouselContainer.scrollLeft += scrollSpeed(scrolled) * timeScale;
    carouselMoving = window.requestAnimationFrame(calculateScrollingToDo);
  }

}

arrowRightChap5.addEventListener('click', clickingOnArrow)
arrowLeftChap5.addEventListener('click', clickingOnArrow)








