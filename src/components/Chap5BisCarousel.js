'use strict';
import 'dragscroll';


/*---------------- Variables ---------------------*/
const carousel5BisContainer = document.querySelector('.chap-text-5-bis-carousel-container');

const arrowRightChap5Bis = document.querySelector('#chap-5-bis-arrow-right');
const arrowLeftChap5Bis = document.querySelector('#chap-5-bis-arrow-left');
const buttonsToClick = [...document.querySelectorAll('[data-button]')];
const buttons = document.querySelector('.container-buttons').firstElementChild;


let clickedIndex = 0;
let counterScroll;


let carouselContentObjects = [
{
  name: `Laurent Chiabotto`,
  text: `Laurent Chiabotto est Chef du Département Méthodes au sein de Total Exploration-Production à Pau. Il est en charge de sujets transverses comme le Système de Management de l’Exploitation, les données et Solutions Métiers ou encore les Opérations pour le futur. <br>
  Entré dans le Groupe Total en 1994, Il occupe plusieurs postes en expatriation, notamment au Venezuela, au Myanmar, au Cameroun, au Nigeria et dernièrement aux Emirats-Arabes-Unis en tant que Field Opérations Manager.<br><br>
  « Travaillant au service exploitation de Total, je me considère comme un potentiel futur client. Je serai donc très attentif à l’évolution de ces solutions robotiques. Le robot ARGOS doit avant tout renforcer la sécurité des opérateurs et permettre de gagner en efficacité. »`
},
{
  name: `Etienne Dombre`,
  text: `Laurent Chiabotto est Chef du Département Méthodes au sein de Total Exploration-Production à Pau. Il est en charge de sujets transverses comme le Système de Management de l’Exploitation, les données et Solutions Métiers ou encore les Opérations pour le futur. <br>
  Entré dans le Groupe Total en 1994, Il occupe plusieurs postes en expatriation, notamment au Venezuela, au Myanmar, au Cameroun, au Nigeria et dernièrement aux Emirats-Arabes-Unis en tant que Field Opérations Manager.<br><br>
  « Travaillant au service exploitation de Total, je me considère comme un potentiel futur client. Je serai donc très attentif à l’évolution de ces solutions robotiques. Le robot ARGOS doit avant tout renforcer la sécurité des opérateurs et permettre de gagner en efficacité. »`
},
{
  name: `Philippe GIRARD `,
  text: `Philippe Girard est en charge des « Prospective Labs » au sein de la R&D du Groupe Total et à ce titre, s’intéresse aux possibilités de développement de la robotique et des systèmes autonomes complexes  en coordination avec les entités et les responsables de développement de logiciels de pilotage. Ingénieur mécanicien, il apporte au Challenge robotique ARGOS ses connaissances en gestion de l’énergie et des systèmes mécaniques automatisés.
«  La robotique est un élément important des développements technologiques  devant contribuer à sécuriser et automatiser nos plateformes industrielles. En ce sens, l’initiative de l’EP permet de défricher des domaines nouveaux et nous fera progresser pour mieux définir nos besoins futurs. »
`
},
{
  name: `Serge Macrez`,
  text: `Serge Macrez travaille à la division Technologies de l’Exploration-Production de Total. Il est expert en instrumentation et systèmes de commande-contrôle et a plus de 40 ans d’expérience dans l’industrie de l’automatisation. Il promeut l’utilisation des technologies mobiles ou portatives, nouvelles ou récentes, participe à la mise en œuvre du concept des opérations intégrées et contribue à différents projets de R&D.  
“ Il est essentiel que les robots soient capables de se déplacer en sécurité et d’éviter des situations préjudiciables pour les opérateurs.”
`
},
{
  name: `Jean-Paul Monet`,
  text: `Le lieutenant-colonel Jean-Paul Monet est chef du Groupement Territorial des Sapeurs-Pompiers des  Bouches-du-Rhône. Il gère 13 casernes, 1 000 sapeurs-pompiers (200 à temps-plein ; 800 à mi-temps), assure la protection d’une population de 250 000 habitants. Il est également conseiller départemental et régional CBRNe (Risques de nature chimique, biologique, radiologique, nucléaire ou explosif) pour le Secrétariat Général de la Protection Civile.
« Je représente la communauté des utilisateurs des services publics. Mon groupement dispose de moyens d’imagerie aérienne, de deux drones aériens légers et d’un drone terrestre ; je considère donc les robots comme des outils stratégiques, au-delà de leurs aspects tendance. »
`
},
{
  name: `Claudio Moriconi`,
  text: `Claudio Moriconi est le délégué Italien de l’International Advanced Robotics Program. Il est aussi directeur du Laboratoire de robotique (UTTEI-ROB) à l’ENEA, récemment rebaptisé IDRA (Distributed Intelligence and Autonomous Robots). Auteur de plusieurs publications internationales et co-auteur de deux ouvrages, relecteur pour les projets de recherche du Ministère italien, il a aussi piloté l’Antarctica Italian Robotics Project ainsi que des dizaines de projets sur la robotique.
« J’espère que ce challenge nous donnera un nouveau moyen de soutenir la recherche industrielle de pointe dans la communauté éminemment  concurrentielle de la robotique internationale. » 
`
},
{
  name: `Geoff Pegman`,
  text: `Geoff Pegman est Directeur Général de RU Robots et un expert avec plus de 26 ans d’expérience dans l’industrie de la robotique avancée. Il est le représentant du Royaume-Uni dans l’International Advanced Robotics Programme, un organisme international qui comprend 15 États membres, et dont il est également Vice-Président.
« Je m’intéresse beaucoup aux interfaces utilisateur qui sont développées pour chacun de ces robots pour assurer la clarté des informations présentées à l’opérateur, et lui permettre de contrôler facilement le robot. »
`
},
{
  name: `Pascal Pourcel`,
  text: `Pascal Pourcel est membre de la division Risques Majeurs au sein de la direction HSE du Groupe TOTAL. Spécialiste de l’ingénierie de sécurité et des études de risques, il fournit l’expertise technique aux projets et filiales, participe à l’élaboration de référentiels et d’outils de calculs internes, et assure des formations aux différentes entités du Groupe.
 « Je souhaite que ce Challenge ARGOS nous permettra de mettre en place des solutions novatrices et sûres, pour le suivi de nos installations, et pour nous assister à l’intervention dans des situations de crises. »

`
},
{
  name: `Pascal Pourcel`,
  text: `Pascal Pourcel est membre de la division Risques Majeurs au sein de la direction HSE du Groupe TOTAL. Spécialiste de l’ingénierie de sécurité et des études de risques, il fournit l’expertise technique aux projets et filiales, participe à l’élaboration de référentiels et d’outils de calculs internes, et assure des formations aux différentes entités du Groupe.
 « Je souhaite que ce Challenge ARGOS nous permettra de mettre en place des solutions novatrices et sûres, pour le suivi de nos installations, et pour nous assister à l’intervention dans des situations de crises. »

`
}
];


/*-------------- Load Carousel --------------*/


let currentDisplayedIndex;
  let carouselMoving;



carouselContentObjects.forEach(object => {

  const carouselSubcontainer = document.createElement('div');
  carouselSubcontainer.classList.add('chap-5-bis-text-carousel-subcontainer');
  carouselSubcontainer.classList.add('mr-4');
  if (carouselContentObjects.indexOf(object) === carouselContentObjects.length - 1) {
    carouselSubcontainer.id = `last-container`;
  }
  carousel5BisContainer.appendChild(carouselSubcontainer);

  const carouselDisplayNumber = document.createElement('p');
  carouselDisplayNumber.classList.add('title')
  carouselDisplayNumber.innerHTML = object.name;
  carouselSubcontainer.appendChild(carouselDisplayNumber);

  const carouselDisplayText = document.createElement('p');
  carouselDisplayText.classList.add('chap-text-carousel-text-text');
  carouselDisplayText.innerHTML = object.text;
  carouselSubcontainer.appendChild(carouselDisplayText);


});

buttonsToClick[0].classList.add('active')

// function initCarousel (index) {
//   currentDisplayedIndex = index;
//   carouselDisplayNumber.textContent = carouselContentObjects[currentDisplayedIndex].number;
//   carouselDisplayText.textContent = carouselContentObjects[currentDisplayedIndex].text;
// }
// initCarousel(0);
// /*---------- IF CLICKED ON THE ARROWS ---------------*/

function clickingSomewhere (e) {
  window.cancelAnimationFrame(carouselMoving);
  //Variables spécifiques
  const arrowClicked = e.target;
  const currentScrolled = carousel5BisContainer.scrollLeft;
  const widthOfSubcontainer = parseFloat(window.getComputedStyle(carousel5BisContainer.firstElementChild).getPropertyValue('width').replace('px', '')) + parseFloat(window.getComputedStyle(carousel5BisContainer.firstElementChild).getPropertyValue('margin-right').replace('px', ''));
  const carouselContainerMaxScroll  = Math.floor(widthOfSubcontainer * (carouselContentObjects.length - 2));
  const previousIndex = Math.floor(currentScrolled / widthOfSubcontainer);
  const currentDisplayedIndex = Math.floor(currentScrolled / Math.floor(widthOfSubcontainer));

  //Variables scrolling animation
  const timeScale = 50;
  let scrollIsUpToDate = false;
  let counterScroll = 0;
  const transitionDuration = 500;
  let scrolled;
  let toScroll;
  let newScrollPosition;

  //Define if need to scroll and to where need to scroll
  //Define newScrollPosition and toScroll
  if ((arrowClicked === arrowRightChap5Bis && currentScrolled === carouselContainerMaxScroll) || (arrowClicked === arrowLeftChap5Bis && currentScrolled === 0)) {
    return;
  } else if (arrowClicked.dataset.button > 0) {
    const clickedIndex = arrowClicked.dataset.button - 1;
    const previousScroll = Math.floor(clickedIndex * widthOfSubcontainer);
    const remainingScroll = previousScroll - carousel5BisContainer.scrollLeft;
    buttonsToClick.forEach(button => {
      (button.dataset.button === arrowClicked.dataset.button) ? button.classList.add('active') : (button.classList.contains('active') ? button.classList.remove('active') : '');
    })
    newScrollPosition = previousScroll;
    toScroll = remainingScroll;
    animateScrolling ();
  } else if (arrowClicked === arrowRightChap5Bis) {
    const nextIndex = currentDisplayedIndex + 1;
    const nextScroll = (currentScrolled === Math.floor(nextIndex * widthOfSubcontainer) ? Math.floor((nextIndex + 1) * widthOfSubcontainer) : Math.floor(nextIndex * widthOfSubcontainer));
    const remainingScroll = nextScroll - carousel5BisContainer.scrollLeft;
    buttonsToClick.forEach(button => {
      (parseInt(button.dataset.button) - 1 === nextIndex) ? button.classList.add('active') : (button.classList.contains('active') ? button.classList.remove('active') : '');
    })
    newScrollPosition = nextScroll;
    toScroll = remainingScroll;
    animateScrolling ();
  } else if (arrowClicked === arrowLeftChap5Bis) {
    const previousScroll = Math.floor(previousIndex * widthOfSubcontainer);
    const remainingScroll = previousScroll - carousel5BisContainer.scrollLeft;
    buttonsToClick.forEach(button => {
      (parseInt(button.dataset.button) - 1 === previousIndex) ? button.classList.add('active') : (button.classList.contains('active') ? button.classList.remove('active') : '');
    })
    newScrollPosition = previousScroll;
    toScroll = remainingScroll;
    animateScrolling ();
  }

  //Functions animation
  function scrollSpeed (alreadyScrolled) {
    //Equation du second degré : on veut une fonction en -x2 pour laquelle f(0) = 0, f(toScroll) = 0, f(toScroll/2) = maxSpeed
    return 3 * alreadyScrolled / transitionDuration * (1 - alreadyScrolled / toScroll);
  }

  function calculateScrollingToDo () {
    scrollIsUpToDate = (carousel5BisContainer.scrollLeft == newScrollPosition);
    animateScrolling();
  }

  function animateScrolling () {
    counterScroll++;
    if (scrollIsUpToDate) {
      return;
    }
    counterScroll === 1 ? scrolled = 1 : scrolled = (toScroll - (newScrollPosition - carousel5BisContainer.scrollLeft));
    Math.abs(scrollSpeed(scrolled) * timeScale) < 1 ? carousel5BisContainer.scrollLeft += (Math.abs(toScroll) / toScroll) : carousel5BisContainer.scrollLeft += scrollSpeed(scrolled) * timeScale;
    carouselMoving = window.requestAnimationFrame(calculateScrollingToDo);
  }

}

arrowRightChap5Bis.addEventListener('click', clickingSomewhere)
arrowLeftChap5Bis.addEventListener('click', clickingSomewhere)
buttons.addEventListener('click', clickingSomewhere)







