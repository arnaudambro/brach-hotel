const reservationButton = document.querySelector('.reservationButton');
const reservation = document.querySelector('.reservation');
const formFrench = document.querySelector('.formContainer');
const closeReservationButton = reservationButton.querySelector('.svgcross');
import PerfectScrollbar from 'perfect-scrollbar';



/*------------------------------------*\
    SHOW RESERVATION
\*------------------------------------*/
function hideReservationButton(e) {
  reservationButton.querySelector('.reservationButton--parent1').classList.remove('visible');
  reservationButton.querySelector('.reservationButton--parent3').classList.remove('visible');
  reservationButton.addEventListener('transitionend', showReservation);
  reservationButton.removeEventListener('click', hideReservationButton);
  reservationButton.removeEventListener('touchend', hideReservationButton);
}

function showReservation(e) {
  reservation.classList.add('visible');
  reservation.addEventListener('transitionend', showReservationButton);
  reservationButton.removeEventListener('transitionend', showReservation);
}

function showReservationButton(e) {
  if (e.srcElement.className === "reservation visible") {
  reservationButton.querySelector('.reservationButton--parent1').classList.add('visible');
  reservationButton.querySelector('.reservationButton--parent3').classList.add('visible');
  reservationButton.style.cursor = 'default';
  closeReservationButton.classList.add('visible');
  reservation.removeEventListener('transitionend', showReservationButton);
  } else {
    return;
  }
}


/*------------------------------------*\
    HIDE RESERVATION
\*------------------------------------*/

function hideReservationButtonThenHide(e) {
  reservationButton.querySelector('.reservationButton--parent1').classList.remove('visible');
  reservationButton.querySelector('.reservationButton--parent3').classList.remove('visible');
  reservationButton.addEventListener('transitionend', hideReservation);
}

function hideReservation(e) {
  reservation.classList.remove('visible');
  reservation.addEventListener('transitionend', showReservationButtonWithoutReservationPannel);
  reservationButton.removeEventListener('transitionend', hideReservation);
}

function showReservationButtonWithoutReservationPannel(e) {
  if (e.srcElement.className === "reservation") {
  reservationButton.querySelector('.reservationButton--parent1').classList.add('visible');
  reservationButton.querySelector('.reservationButton--parent3').classList.add('visible');
  reservationButton.querySelector('.svgcross').classList.remove('visible');
  reservation.removeEventListener('transitionend', showReservationButtonWithoutReservationPannel);
  reservationButton.style.cursor = 'pointer';
  reservationButton.addEventListener('click', hideReservationButton);
  reservationButton.addEventListener('touchend', hideReservationButton);
  } else {
    return;
  }
}


reservationButton.addEventListener('click', hideReservationButton);
reservationButton.addEventListener('touchend', hideReservationButton);
closeReservationButton.addEventListener('click', hideReservationButtonThenHide);
closeReservationButton.addEventListener('touchend', hideReservationButtonThenHide);
