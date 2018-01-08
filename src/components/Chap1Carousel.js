'use strict';
import 'dragscroll';

//If no-JS, keep scrollbar. If JS, remove scrollbar in CSS do this script.
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

/*---------------- Variables ---------------------*/
const carouselContainer = document.querySelector('.chap-1-carousel-thumbnails-container');
const carouselContent = document.querySelector('.chap-1-carousel-thumbnails');
const carouselDisplay = document.querySelector('.chap-1-carousel-display');
const carouselPicDisplay = document.querySelector('.chap-1-carousel-pic-display');
const carouselDescDisplay = document.querySelector('.chap-1-carousel-desc-display').firstElementChild;
const carouselThumbnails = [...document.querySelectorAll('.carousel-thumbnail-pic')];
const carouselFirstThumbnail = carouselThumbnails[0];
let thumbnailWidth;
let dotlinkWidth;

const arrowRightChap1 = document.querySelector('#chap-1-arrow-right');
const arrowLeftChap1 = document.querySelector('#chap-1-arrow-left');
let carouselMoving;
let clickedIndex = 0;
let counterScroll;

let carouselContentObjects = [
{
  date: `Décembre 2013`,
  pictureUrl: `./src/img/chap-1-carouselpic-1.jpg`,
  description: `Lancement de l’appel à projet international`
},
{
  date: `Juin 2014`,
  pictureUrl: `./src/img/chap-1-carouselpic-2.jpg`,
  description: `Sélection des cinq équipes parmi 31 dossiers de candidature`
},
{
  date: `Septembre 2014`,
  pictureUrl: `./src/img/chap-1-carouselpic-3.jpg`,
  description: `Lancement officiel du Challenge ARGOS`
},
{
  date: `Septembre 2014`,
  pictureUrl: `./src/img/chap-1-carouselpic-4.jpg`,
  description: `Réunions techniques et visite du site de compétition avec les équipes sélectionnées`
},
{
  date: `Avril 2015`,
  pictureUrl: `./src/img/chap-1-carouselpic-5.jpg`,
  description: `Semaine d’entraînement sur le site de compétition à Lacq (Sud Ouest de la France)`
},
{
  date: `Juin 2015`,
  pictureUrl: `./src/img/chap-1-carouselpic-6.jpg`,
  description: `1ère compétition : des résultats prometteurs en navigation autonome`
},
{
  date: `Avril 2016`,
  pictureUrl: `./src/img/chap-1-carouselpic-7.jpg`,
  description: `2ème compétition : confronter les robots à la réalité du terrain`
},
{
  date: `Mars 2017`,
  pictureUrl: `./src/img/chap-1-carouselpic-8.jpg`,
  description: `3ème compétition : opérer en toute sécurité sur un site industriel`
},
{
  date: `Mai 2017`,
  pictureUrl: `./src/img/chap-1-carouselpic-9.jpg`,
  description: `Remise des trophées. ARGONAUTS (Autriche/Allemagne) remporte le Challenge`
},

];


/*----------------- Scroll and drag and hide scrollbar of carousel ----------------*/
//We imported drascroll which makes almost all the business...

function determineOverflow(content, container) {
  const containerMetrics = container.getBoundingClientRect();
  const containerMetricsLeft = Math.floor(containerMetrics.left);
  const containerMetricsRight = Math.floor(containerMetrics.right);
  const contentMetrics = content.getBoundingClientRect();
  const contentMetricsRight = Math.floor(contentMetrics.right);
  const contentMetricsLeft = Math.floor(contentMetrics.left);
  if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
    return "both";
  } else if (contentMetricsLeft < containerMetricsLeft) {
    return "left";
  } else if (contentMetricsRight > containerMetricsRight) {
    return "right";
  } else {
    return "none";
  }
}

carouselContent.style.cssFloat = 'left';
carouselContainer.setAttribute("data-overflowing", determineOverflow(carouselContent, carouselContainer));


// Handle the scroll of the horizontal container
let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {

  carouselContainer.setAttribute("data-overflowing", determineOverflow(carouselContent, carouselContainer));
}

carouselContainer.addEventListener("scroll", function() {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});


/*-------------- Load Carousel --------------*/

//Create carousel object content

for (var i = 0; i < carouselThumbnails.length; i++) {
  carouselThumbnails[i].style.backgroundImage = `url(${carouselContentObjects[i].pictureUrl})`;
  carouselThumbnails[i].firstElementChild.firstElementChild.textContent = carouselContentObjects[i].date;
}

let currentDisplayedIndex;

function initCarousel (index) {
  carouselPicDisplay.style.backgroundImage = `url(${carouselContentObjects[index].pictureUrl})`;
  carouselDescDisplay.textContent = `${carouselContentObjects[index].description}`;
  currentDisplayedIndex = index + 1;
  document.querySelector(`[data-thumbnail='${currentDisplayedIndex}']`).firstElementChild.classList.add('active');
}
initCarousel(0);

function adaptCarouselToWindowSize() {
  thumbnailWidth = Math.round(parseFloat(window.getComputedStyle(carouselFirstThumbnail).getPropertyValue('width').replace('px', '')));
  dotlinkWidth = Math.round(parseFloat(window.getComputedStyle(document.querySelector('#first-link')).getPropertyValue('width').replace('px', '')));
  const documentWidth = window.getComputedStyle(document.querySelector('.chap-container')).getPropertyValue('width').replace('px', '') / 100;
  const newScrollPosition = Math.round(((currentDisplayedIndex - 1) * (thumbnailWidth + dotlinkWidth)));
  carouselContainer.scrollLeft = newScrollPosition;
}
adaptCarouselToWindowSize();

//This variable to check wether the user clicked or dragged.
let carouselScrollLeft = carouselContainer.scrollLeft;
const transitionDuration = 500;


/*---------- IF CLICKED ON A THUMBNAIL ---------------*/
function clickingOnThumbnail (e) {
  const thumbnailClicked = e.target.parentElement;
  clickedIndex = thumbnailClicked.dataset.thumbnail;
  //If carouselContainer.scrollLeft > carouselScroll, the user dragged, didn't clicked.
  //User clicked if carouselScroll == carouselContainer.scrollLeft. Then we change the picture.
  const changeIndex = currentDisplayedIndex != clickedIndex;
  const noScroll = carouselScrollLeft == carouselContainer.scrollLeft;
  const noScrollAccident = (Math.abs(carouselScrollLeft - carouselContainer.scrollLeft) < 10);
  const clickedIsThumbnail = e.target.parentElement.classList.contains('carousel-thumbnail-pic');

  if (!(changeIndex && (noScroll || noScrollAccident) && clickedIsThumbnail)) {
    //If dragged and not clicked, update carouselScroll only
    carouselScrollLeft = carouselContainer.scrollLeft;
  } else {
    loadCarousel(thumbnailClicked, clickedIndex);
  }
}

/*---------- IF CLICKED ON THE ARROWS ---------------*/

function clickingOnArrow () {
  window.cancelAnimationFrame(carouselMoving);
  if ((this === arrowRightChap1 && currentDisplayedIndex >= carouselThumbnails.length) || (this === arrowLeftChap1 && currentDisplayedIndex <= 1)) {
    return;
  } else if (this === arrowRightChap1) {
    const thumbnailClicked = carouselThumbnails[((clickedIndex === 0 ? currentDisplayedIndex - 1 : clickedIndex - 1)) + 1];
    loadCarousel(thumbnailClicked, thumbnailClicked.dataset.thumbnail);
  } else if (this === arrowLeftChap1) {
    const thumbnailClicked = carouselThumbnails[((clickedIndex === 0 ? currentDisplayedIndex - 1 : clickedIndex - 1)) - 1];
    loadCarousel(thumbnailClicked, thumbnailClicked.dataset.thumbnail);
  }
}


/*---------- LOAD CAROUSEL ---------------*/
function loadCarousel (thumbnailClicked, parameterClickedIndex) {
  counterScroll = 0;

  clickedIndex = parameterClickedIndex;
  const startingDate = Date.now();

  window.cancelAnimationFrame(carouselMoving);
  //Picture first
  carouselPicDisplay.style.backgroundImage = window.getComputedStyle(thumbnailClicked).getPropertyValue('background-image');
  carouselPicDisplay.style.transition = `background-image ${transitionDuration}ms`;
  //Remove old description
  carouselDescDisplay.style.transition = `all ${transitionDuration / 2}ms`;
  carouselDescDisplay.style.opacity = 0;
  //Filters
  const filterPreviousThumbnail = document.querySelector(`[data-thumbnail='${currentDisplayedIndex}']`).firstElementChild;
  const filterNextThumbnail = document.querySelector(`[data-thumbnail='${clickedIndex}']`).firstElementChild;
  filterPreviousThumbnail.classList.toggle('active');
  filterPreviousThumbnail.style.transition = `all ${transitionDuration}ms`;
  filterNextThumbnail.classList.add('active');
  filterNextThumbnail.style.transition = `all ${transitionDuration}ms`;

  //Description treatment with timeout
  window.setTimeout(() => {
    // Show new description
    carouselDescDisplay.textContent = `${carouselContentObjects[clickedIndex - 1].description}`;
    carouselDescDisplay.style.opacity = 1;
    //Update idnex of thumbnail shown
    currentDisplayedIndex = clickedIndex;
  }, transitionDuration / 2);

  /*------------ Scroll to the thumbnail -----------------*/
  //0-1 - Get the values from unit vw to px (javascript doesn't understand vw or vh)
  const documentWidth = window.getComputedStyle(document.querySelector('.chap-container')).getPropertyValue('width').replace('px', '') / 100;
  //0-2 - Get the future final position of the thumbnail scrolling
  const newScrollPosition = Math.round(((clickedIndex - 1) * (thumbnailWidth + dotlinkWidth)))
  //0-3 - Get the total distance to scroll (negative or positive)
  const toScroll = newScrollPosition - carouselContainer.scrollLeft;
  //0-4 - This value is actually giving the transitionDuration its real duration. The value is based on the time intervals requestAnimationFrame is called.
  const timeScale = 50;
  //0-5 - Init variable to check if the scrolling is over or not
  let scrollIsUpToDate = false;
  //0-6 - Init variable to record how much has been scrolled yet
  let scrolled;

  //Speed calculation to have an ease-in and ease-out transition
  function scrollSpeed (alreadyScrolled) {
    //Equation du second degré : on veut une fonction en -x2 pour laquelle f(0) = 0, f(toScroll) = 0, f(toScroll/2) = maxSpeed
    const maxSpeed = toScroll / transitionDuration;
    return 3 * maxSpeed / toScroll * alreadyScrolled * (1 - alreadyScrolled / toScroll);
  }

  //Because RequestAnimationFrame works only if we 'do something' while we work
  function resetScrollUpadte () {
    //6 - Scrolling is over ?
    scrollIsUpToDate = (carouselContainer.scrollLeft == newScrollPosition);
    //7 - Updated the scroll position of the carousel
    carouselScrollLeft = carouselContainer.scrollLeft;
    //8 - Move the carousel again
    repositionCarousel();
  }



  //Function to rescroll the Carousel
  function repositionCarousel() {
    counterScroll++;
    // 2 - If the carousel is all scrolled, nothing to do anymore
    if (scrollIsUpToDate) {
      //Rest clickedIndex to allow scrolling
      clickedIndex = 0;
      return;
    }
    //3 - Set or update the scrolled value
    counterScroll === 1 ? scrolled = 1 : scrolled = (toScroll - (newScrollPosition - carouselScrollLeft));
    //4 - Increment the scroll : 1 px. If less, we force the move.
    Math.abs(scrollSpeed(scrolled) * timeScale) < 1 ? carouselContainer.scrollLeft += (Math.abs(toScroll) / toScroll) : carouselContainer.scrollLeft += scrollSpeed(scrolled) * timeScale;
    //5 - We go to resetScrollUpdate and redo repositionCarousel over and over again and again
    carouselMoving = window.requestAnimationFrame(resetScrollUpadte);
  };
  //1 - We launch the reposition of the carousel
  repositionCarousel();
}



carouselContainer.addEventListener('click', clickingOnThumbnail)
arrowRightChap1.addEventListener('click', clickingOnArrow)
arrowLeftChap1.addEventListener('click', clickingOnArrow)

window.addEventListener('resize', adaptCarouselToWindowSize)





