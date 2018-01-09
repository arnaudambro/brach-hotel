import { slideshowParams } from './params';

  //https://github.com/mdn/js-examples/blob/master/promises-test/index.html
  //https://developer.mozilla.org/en-US/docs/Web/API/Body/blob
  //https://github.com/mdn/fetch-examples/blob/master/fetch-request/index.html
const start = Date.now();
console.log(`start: ${start}`);

function loadTotemPic(startDate, anyKey) {
  return new Promise((resolve, reject) => {
    const anyTotemPictureUrl = slideshowParams[anyKey].totemPictureUrl();
    const totemPicPromise = fetch(anyTotemPictureUrl);
    if (totemPicPromise) {
      // resolve({key: anyKey, totemPic: totemPicPromise});
      resolve(totemPicPromise);
    } else {
      reject(Error(`The img ${anyKey} hasn\'t been loaded`))
    }
  });
};

function loadBackupPic(startDate, anyKey) {
  return new Promise((resolve, reject) => {
    const anyBackupPictureUrl = slideshowParams[anyKey].backupPictureUrl();
    const backupPicPromise = fetch(anyBackupPictureUrl);
    if (backupPicPromise) {
      // resolve({key: anyKey, backupPic: backupPicPromise});
      resolve(backupPicPromise);
    } else {
      reject(Error(`The img ${anyKey} hasn\'t been loaded`))
    }
  });
};

const filesToLoad = [
  ...Object.keys(slideshowParams).map(key => slideshowParams[key].totemPictureUrl()), 
  ...Object.keys(slideshowParams).map(key => slideshowParams[key].backupPictureUrl())
  ];
const numberOfItemsToLoad = filesToLoad.length;
let itemsLoaded = 0;

const slideshowParamsWithLoadedFiles = Object.assign(slideshowParams);

Object.keys(slideshowParams).map(key => {
  // const element = slideshowParams[key];
  // console.log(element)
  loadTotemPic(start, key)
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(object => {
      console.log(object);
      slideshowParamsWithLoadedFiles[key]['totemPicture'] = object;
    })
    .then(itemsLoaded++)
    .then(console.log(`itemsLoaded: ${itemsLoaded}`))
    .then(console.log(slideshowParamsWithLoadedFiles[key]['totemPicture']))

  loadBackupPic(start, key)
    .then(res => res.blob())
    .then(blob => slideshowParamsWithLoadedFiles[key]['backupPicture'] = blob)
    .then(itemsLoaded++)
    .then(console.log(`itemsLoaded: ${itemsLoaded}`))
})


console.log(slideshowParamsWithLoadedFiles['hotel'].backupPicture)

export { slideshowParamsWithLoadedFiles, numberOfItemsToLoad, itemsLoaded};



  // Promise
  //   .all(Object.keys(slideshowParams).map(key => loadTotemPic(start, key)))
  //   .then(responses => {
  //     return responses.map(res => {
  //       console.log(res)
  //       res.blob()
  //     });
  //     // return [...responses.map(res =>  {
  //     //   console.log(res['totemPic']);
  //     //   res['totemPic'].blob() ;
  //     // })];
  //   })
  //   .then(blobs => {
  //     console.log(blobs);
  //   })
  //   .then(console.log(`done at ${Date.now()}`))



// let dataLoaded = 0;

// function loadImage(startDate, anyUrl) {
//   return new Promise((resolve, reject) => {
//     const url = fetch(anyUrl);
//     if (url) {
//       resolve(url);
//     } else {
//       reject(Error(`The img ${anyUrl} hasn\'t been loaded`))
//     }
//   });
// };

// const picUrls = [
//   ...Object.keys(slideshowParams).map(key => slideshowParams[key].totemPictureUrl()), 
//   ...Object.keys(slideshowParams).map(key => slideshowParams[key].backupPictureUrl())
//   ];

// const loadImagesPromise = [];
// picUrls.forEach(url => {
//   loadImagesPromise.push(loadImage(start, url));
// });

// Promise
//   .all(loadImagesPromise)
//   .then(res => {
//     res.map(promise => {
//       console.log(promise);

//     });
//   })
//   .catch(err => console.error(err))



// //https://stackoverflow.com/questions/44756277/javascript-display-dynamic-changing-image
// function loadImagesPromise (start) {
//   let loadPromise = new Promise (resolve, reject) => {
//     Object.keys(slideshowParams).map(key => {
//       const url = slideshowParams[key].totemPicture();
//       const img = new Image();
//       img.src = url;
//       img.addEventListener('load', function() {
//           console.log(`image ${slideshowParams[key].position} loaded after ${Date.now() - start}`);
//           console.log(img.complete);

//       });
//       const backupUrl = slideshowParams[key].backupPicture();
//       const backupImg = new Image();
//       backupImg.src = url;
//       backupImg.addEventListener('load', function() {
//           console.log(`image ${slideshowParams[key].position} loaded after ${Date.now() - start}`);
//           console.log(backupImg.complete);
//       });
//     });
//   } 
// };

// loadImages(Date.now());






//https://ourcodeworld.com/articles/read/571/how-to-verify-when-multiple-images-have-been-loaded-in-javascript


// /**
//  * Loader function that helps to trigger a callback when multiple images has been loaded. Besides
//  * indicates which images were correctly/wrong loaded.
//  * 
//  * @param {Array} Images An array of strings with the paths to the images.
//  * @param {Function} Callback Callback function executed when all images has been loaded or not.
//  */
// function ImageLoader(Images, Callback){
//     // Keep the count of the verified images
//     var allLoaded = 0;

//     // The object that will be returned in the callback
//     var _log = {
//         success: [],
//         error: []
//     };

//     // Executed everytime an img is successfully or wrong loaded
//     var verifier = function(){
//         allLoaded++;

//         // triggers the end callback when all images has been tested
//         if(allLoaded == Images.length){
//             Callback.call(undefined, _log);
//         }
//     };

//     // Loop through all the images URLs
//     for (var index = 0; index < Images.length; index++) {
//         // Prevent that index has the same value by wrapping it inside an anonymous fn
//         (function(i){
//             // Image path providen in the array e.g image.png
//             var imgSource = Images[i];
//             var img = new Image();
            
//             img.addEventListener("load", function(){
//                 _log.success.push(imgSource);
//                 verifier();
//             }, false); 
            
//             img.addEventListener("error", function(){
//                 _log.error.push(imgSource);
//                 verifier();
//             }, false); 
           
//             img.src = imgSource;
//         })(index);
//     }
// }

// ImageLoader(totemPictures, function(result){
//     if(result.error){
//         // outputs: ["example.png", "example.jpg"]
//         console.log("The following images couldn't be properly loaded: ", result.error);
//     }

//     // outputs: ["http://i.imgur.com/fHyEMsl.jpg"]
//     console.log("The following images were succesfully loaded: ", result.success);
// });
