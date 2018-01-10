import YTPlayer from 'yt-player';   //https://github.com/feross/yt-player

let player1start = 0;
let player1autoplay = true;
let player1loaded = false;
let player1firstStart = false;
let player1;
let videoRatio = 0.5625;  //width * 0.5625 = height 

const player1options = {
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
}


player1 = new YTPlayer('#video__video1', player1options);
player1.load('M6kQi1_Btqg');  

// player1.style.left = {}

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
    return
  }
}

if (player1) {
  player1.on('timeupdate', (seconds) => {
    playerResetOnFirstLoad(seconds, player1);
  })

  player1.on('ended', () => {
    player1.seek(0);
  })
}

/*------------------------------------*\
    RESIZE VIDEO - ALWAYS FULL WINDOW
\*------------------------------------*/
const video1iFrameContainer = document.querySelector('.video__subcontainer');
const wholeContentDiv = document.querySelector('#wholeContent');



export { player1, playerPlay };

// function resizeVideo(e, div) {
//   let windowHeight = window.innerHeight;
//   let windowWidth = window.innerWidth;
//   console.log(`windowHeight: ${windowHeight}`);
//   console.log(`windowWidth: ${windowWidth}`);
//   console.log(`windowWidth * videoRatio: ${windowWidth * videoRatio}`);
//   const minHeightMaxWidth = (windowHeight < windowWidth * videoRatio);
//   const minWidthMaxHeight = (windowHeight > windowWidth * videoRatio);

//   if (windowHeight < windowWidth * videoRatio) {
//     console.log('cas extrême: mini-hauteur, maxi-largeur');
//     const newHeight = 128;
//     div.style.width = `${newHeight / videoRatio}vh`;
//     div.style.height = `${newHeight}vh`;
//   } else if (windowHeight > windowWidth * videoRatio) {
//     console.log('cas extrême: mini-largeur, maxi-hauteur');
//     const newHeight = 128;
//     div.style.width = `${newHeight / videoRatio}vh`;
//     div.style.height = `${newHeight}vh`;
//   } else if ((windowHeight < windowWidth * (videoRatio + 0.01)) && (windowHeight > windowWidth * (videoRatio - 0.01)))  {
//     console.log('cas extrême: perfet ratio');
//     div.style.height = `128%`;
//     div.style.width = `128%`;
//   }
// };

// // window.addEventListener('load', function(e) { resizeVideo(e, video1iFrameContainer) });
// // window.addEventListener('load', function(e) { resizeVideo(e, video1Div) });

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



























