const animVideo = document.querySelector('#video-anim');
animVideo.addEventListener('loadeddata', whenLoadedData);
animVideo.addEventListener('ended', whenEnded);

function whenLoadedData(e) {
  console.log('loaded')
  console.log(e);
}
function whenEnded(e) {
  console.log('ended');
  console.log(e);
  animVideo.parentNode.classList.add('hide');
  document.querySelector('.showTotem').classList.add('fakeTotemUp');
  populateLettersFirstTime();
  window.setTimeout(() => {
    document.body.removeChild(animVideo.parentNode);
  }, 500);
}

function populateLettersFirstTime() {
  //Get hotel letters
  const nameLetters = [];
  const hotelEstablishmentName = document.querySelector('.slideshow__description--establishment-name');
  [...hotelEstablishmentName.children].forEach(node => [...node.children].forEach(letter => nameLetters.push(letter)));

  //Get slogan letters
  const hotelSlogan = document.querySelector('.slideshow__description--slogan');
  const sloganLetters = [...hotelSlogan.children];

  //Get option letters
  const hotelOption = document.querySelector('.showOption');
  const optionLetters = [...hotelOption.children];

  //Gather all letters
  const allLetters = [...nameLetters, ...optionLetters, ...sloganLetters];
  for (var i = 0; i < allLetters.length; i++) {
    allLetters[i].classList.add(`fade-in-letter-up-${i + 1}`)
  }


}
