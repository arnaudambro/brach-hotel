import YTPlayer from 'yt-player';   //https://github.com/feross/yt-player

/*------------------------------------*\
    PLAYER 1
\*------------------------------------*/


let player1start = 0;
let player1autoplay = false;
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
// player1.load('M6kQi1_Btqg');  


/*------------------------------------*\
    PLAYER 2
\*------------------------------------*/


let player2start = 0;
let player2autoplay = false;
let player2loaded = false;
let player2firstStart = false;
let player2;

const player2options = {
    height: '100%',
    width: '100%',
    autoplay: player2autoplay,
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

player2 = new YTPlayer('#video__video2', player2options);
// player2.load('M6kQi1_Btqg');  


/*------------------------------------*\
    FUNCTIONS
\*------------------------------------*/

let player1StartLoad = 0;
let player2StartLoad = 0;

function playerLoad(player) {
  if (player === player1) {
    console.log('loading player 1')
    player1StartLoad = Date.now();
    player1.load('M6kQi1_Btqg');  
  } else if (player === player2) {
    console.log('loading player 2')
    player2StartLoad = Date.now();
    player2.load('M6kQi1_Btqg');  
  }
}

// function playerPlay(player, playerFirstStart) {
//   if (playerFirstStart && player.getCurrentTime() > 0) {
//     player.seek(0);
//     playerFirstStart = false;
//     player.play();
//   } else if (playerFirstStart && player.getCurrentTime() === 0) {
//     playerFirstStart = false;
//     player.play();
//   } else {
//     player.play();
//   }
// };

function playerPlay(player) {
  console.log('play', player)
  player.play();
}

function playerPause(player) {
  player.pause();
}

// function player1ResetOnFirstLoad(seconds, player) {
//   if (player1loaded === false) {
//     player1loaded = true;
//     player.pause();
//     player.seek(0);
//     console.log(`player 1 loaded in ${Date.now() - player1StartLoad}ms`, player1);
//   } else {
//     return
//   }
// }

// player1._onReady = console.log(`player 1 loaded in ${Date.now() - player1StartLoad}ms`, player1);

// function player2ResetOnFirstLoad(seconds, player) {
//   if (player2loaded === false) {
//     player2loaded = true;
//     player.pause();
//     player.seek(0);
//     console.log(`player 2 loaded in ${Date.now() - player2StartLoad}ms`);
//   } else {
//     return
//   }
// }

/*------------------------------------*\
    EVENTLISTENERS
\*------------------------------------*/

if (player1) {
  // console.log('player 1')
  // player1.on('timeupdate', (seconds) => {
  //   player1ResetOnFirstLoad(seconds, player1);
  // })

  player1.on('ended', () => {
    player1.seek(0);
  })
}

if (player2) {
  // console.log('player 2')
  // player2.on('timeupdate', (seconds) => {
  //   player2ResetOnFirstLoad(seconds, player2);
  // })

  player2.on('ended', () => {
    player2.seek(0);
  })
}

/*------------------------------------*\
    RESIZE VIDEO - ALWAYS FULL WINDOW - cf CSS
\*------------------------------------*/
const video1iFrameContainer = document.querySelector('.video__subcontainer');
const wholeContentDiv = document.querySelector('#wholeContent');


export { playerLoad, playerPlay, playerPause, player1, player1firstStart, player2, player2firstStart, player2ResetOnFirstLoad,  player1ResetOnFirstLoad };

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



























