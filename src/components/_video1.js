import PerfectScrollbar from 'perfect-scrollbar';
require('smoothscroll-polyfill').polyfill();   //https://github.com/iamdustan/smoothscroll
import YTPlayer from 'yt-player';   //https://github.com/feross/yt-player



let player1start = 0;
let player1autoplay = true;
let player1loaded = false;
let player1firstStart = false;
const player1 = new YTPlayer('#video__video1', {
  height: '100%',
  width: '100%',
  autoplay: player1autoplay,
  captions: false,
  controls: true,
  keyboard: false,
  fullscreen: true,
  annotations: false,
  modestBranding: true,
  related: false,
  info: false,
  timeupdateFrequency: 1000,  // default: 1000
  // enablejsapi: 1, //default: they say 0 but it's 1
  start: player1start,
});

player1.load('M6kQi1_Btqg');

function playerPlay(player) {
  if (player1firstStart && player1.getCurrentTime() > 0) {
    player1.seek(0);
    player1firstStart = false;
    player.play();
  } else if (player1firstStart && player1.getCurrentTime() === 0) {
    player1firstStart = false;
    player.play();
  } else {
    player.play();
  }
};

function playerResetOnFirstLoad(seconds, player) {
  if (player1loaded === false) {
    player1loaded = true;
    player1.pause();
    player1.seek(0);
  } else {
    console.log('let`s go');
    return
  }
}

player1.on('timeupdate', (seconds) => {
  playerResetOnFirstLoad(seconds, player1);
})

player1.on('ended', () => {
  player1.seek(0);
})

/*------------------------------------*\
    RESIZE VIDEO - ALWAYS FULL WINDOW
\*------------------------------------*/
let videoRatio = 0.5625;  //width * 0.5625 = height 
const video1Div = document.querySelector('.video1');
const wholeContentDiv = document.querySelector('#wholeContent')

function resizeVideo(e, div) {
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  if (windowHeight < windowWidth * videoRatio) {
    //cas extrême: mini-hauteur, maxi-largeur
    div.style.width = `100vw`;
    div.style.height = `${100 * videoRatio}vw`;
  } else if (windowHeight < windowWidth * videoRatio) {
    div.style.height = `100vh`;
    div.style.width = `${100 / videoRatio}vh`;
  } else if (windowHeight === windowWidth * videoRatio) {
    div.style.height = `100vh`;
    div.style.width = `100vw`;
  }

    if (e.type != 'load') {
      wholeContentDiv.scrollBy({
        left: 0,
        top: div.getBoundingClientRect().top
        // behavior: 'smooth'
      });
    };
};

window.addEventListener('resize', function(e) { resizeVideo(e, video1Div) });
window.addEventListener('load', function(e) { resizeVideo(e, video1Div) });

export { player1, playerPlay };



// player.play()
// player.pause()
// player.stop()
// player.seek(seconds)
// player.setVolume(volume) ////between 0 and 100
// player.setPlaybackRate(rate)
// player.getVolume() //between 0 and 100
// player.getPlaybackRate()
// player.getDuration() //seconds
// player.getProgress() //Percentage
// player.getState() // Possible values are: 'unstarted', 'ended', 'playing', 'paused', 'buffering', or 'cued'.
// player.getCurrentTime()
// player.destroy()
// player.destroyed (boolean)
// player.videoId (string)
// player.on('error', (err) => {})
// player.on('unplayable', (videoId) => {})
// player.on('timeupdate', (seconds) => {})
// player.on('unstarted', () => {})
// player.on('ended', () => {})
// player.on('playing', () => {})
// player.on('paused', () => {})
// player.on('buffering', () => {})
// player.on('cued', () => {})
// player.on('playbackQualityChange', (quality) => {})
// player.on('playbackRateChange', (playbackRate) => {})



























