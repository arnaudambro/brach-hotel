const english = document.querySelector('.change-language').querySelector('.english');
const french = document.querySelector('.change-language').querySelector('.french');
document.querySelectorAll('.french').forEach(element => element.classList.remove('inactive'));
document.querySelectorAll('.english').forEach(element => element.classList.add('inactive'));

function changeLanguage(e) {
  console.log(e.target.classList);
  console.log(e.target.classList.contains('french'));
  if (e.target.classList.contains('french')) {
    document.querySelectorAll('.french').forEach(element => element.classList.remove('inactive'));
    document.querySelectorAll('.english').forEach(element => element.classList.add('inactive'));
  } else if (e.target.classList.contains('english')) {
    document.querySelectorAll('.french').forEach(element => element.classList.add('inactive'));
    document.querySelectorAll('.english').forEach(element => element.classList.remove('inactive'));
  }
}


english.addEventListener('click', changeLanguage);
french.addEventListener('click', changeLanguage);

