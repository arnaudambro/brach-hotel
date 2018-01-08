/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return exactCapitalLetterSize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_measure_font__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_measure_font___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_measure_font__);




//pseudostyle
// http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/
// var a={_b:0,c:function(){this._b++;return this.b;}};HTMLElement.prototype.pseudoStyle=function(d,e,f){var g="pseudoStyles";var h=document.head||document.getElementsByTagName('head')[0];var i=document.getElementById(g)||document.createElement('style');i.id=g;var j="pseudoStyle"+a.c();this.className+=" "+j;i.innerHTML+=" ."+j+":"+d+"{"+e+":"+f+"}";h.appendChild(i);return this;}

function exactCapitalLetterSize (element, fontFamily, size, lineHeight) {
  const fontMeasurements = __WEBPACK_IMPORTED_MODULE_0_measure_font___default()(fontFamily, {
      fontSize: 50,
      tolerance: 6
  });  

  // https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align
  //BUG : even with constant parameters, results are not the same... sadness
  const fmCapitalHeight = ((fontFamily === 'Portrait') || (fontFamily === 'Portrait-light')) ? 0.68 : -fontMeasurements.capHeight;
  const fmDescender = ((fontFamily === 'Portrait') || (fontFamily === 'Portrait-light')) ? 0.2 : fontMeasurements.descender;
  const fmAscender = ((fontFamily === 'Portrait') || (fontFamily === 'Portrait-light')) ? 0.7 : -fontMeasurements.topBounding;
  const fmEmSquare = (fmDescender - fmAscender);
  const fmLinegap = 0;

  /* compute needed values */
  const lineheightNormal = ((element.firstChild.offsetHeight) + (fmLinegap)) / size;
  const distanceBottom = ((fmDescender) + (lineheightNormal - fmEmSquare) / 2);
  const distanceTop = ((-fmAscender + fmCapitalHeight) + (lineheightNormal - fmEmSquare) / 2);
  const computedFontSize = ((size) / (fmCapitalHeight)); 
  const contentArea = ((lineheightNormal) * (computedFontSize));
  const valign = (((distanceBottom) - (distanceTop)) * (computedFontSize));  
  const computedLineheight = (((lineHeight) * (size)) - (valign));

  /* FOR DEBUGGING
  const parameters = {
    element,
    elementFirstChild: element.firstChild,
    fontFamily,
    size,
    lineHeight,
    fmEmSquare,
    fmCapitalHeight,
    fmDescender,
    fmAscender,
    fmLinegap,
    valign,
    computedLineheight,
    computedFontSize
  }
  console.log(parameters) */

  /* set font family */
  element.style.fontFamily = fontFamily;

  /* set capital height to equal font-size */
  element.style.fontSize = `${computedFontSize}px`;

  /* set computed line-height */
  element.style.lineHeight = `${computedLineheight}px`;

  // element.firstChild.style.height = `${size}px`;
  element.firstChild.style.verticalAlign = `${-valign}px`;
  // element.style.height = `${size}px`;
  // element.firstChild
  //   .pseudoStyle('before', 'content', '')
  //   .pseudoStyle('before', 'dispaly', 'inline-block')
  //   .pseudoStyle('before', 'height', `${size}px`);
}





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return alSize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__measureFont__ = __webpack_require__(0);


 



const slideshowDiv = document.querySelector(".slideshow");
const slideshowDescription = document.querySelector('.slideshow__description');
const hotelOptions = document.querySelector('.slideshow__description--options');
const hotelOptionsLetters = [...hotelOptions.children];
/*------------------------------------*\
    SLIDESHOW LANDSCAPE OR PORTRAIT
\*------------------------------------*/


function landscapeOrPortrait() {
  let landscapeOrientation = window.innerHeight <= window.innerWidth;
  if ((window.innerWidth > 1024) && landscapeOrientation) {
    document.body.classList.add('slideshow__landscape');
    document.body.classList.remove('slideshow__portrait');
  } else {
    document.body.classList.remove('slideshow__landscape');
    document.body.classList.add('slideshow__portrait');  
  };
};

landscapeOrPortrait()
window.addEventListener('resize', landscapeOrPortrait);
/*------------------------------------*\
    BRACH LETTERS
\*------------------------------------*/

const firstAndLastHotelLetter = document.querySelectorAll('.first-last-letter');
const middleHotelLetters = document.querySelectorAll('.middle-letters');
const flSize = 26.750;
const mlSize = 23;

firstAndLastHotelLetter.forEach(letter => Object(__WEBPACK_IMPORTED_MODULE_0__measureFont__["a" /* exactCapitalLetterSize */])(letter, 'Portrait-light', flSize, 1));
middleHotelLetters.forEach(letter => Object(__WEBPACK_IMPORTED_MODULE_0__measureFont__["a" /* exactCapitalLetterSize */])(letter, 'Portrait-light', mlSize, 1));

/*------------------------------------*\
    HÔTEL OPTIONS LETTERS
\*------------------------------------*/

const alSize = 2 * flSize;
hotelOptionsLetters.forEach(letter => {
  Object(__WEBPACK_IMPORTED_MODULE_0__measureFont__["a" /* exactCapitalLetterSize */])(letter, 'Portrait', alSize, 1);
});


/*------------------------------------*\
    SLOGAN LETTERS
\*------------------------------------*/

const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const sloganAlSize = 0.35 * flSize;
Object(__WEBPACK_IMPORTED_MODULE_0__measureFont__["a" /* exactCapitalLetterSize */])(hotelSlogan, 'Cogito', sloganAlSize, 1)


/*------------------------------------*\
    DESCRIPTION POSITION
\*------------------------------------*/

function alignDescriptionWithCursorOnMiddle () {
  const hotelOptionsBottom = hotelOptions.offsetTop + hotelOptions.offsetHeight;
  const windowHeight = window.innerHeight;
  const differenceWithMiddle = hotelOptionsBottom - windowHeight / 2;
  slideshowDescription.style.marginBottom = `${differenceWithMiddle * 2 - 4}px`;
}

alignDescriptionWithCursorOnMiddle();

/*------------------------------------*\
    HIDE SCROLLBAR
\*------------------------------------*/

window.addEventListener('resize', function (e) {
  const slideshowBackupContainer = document.querySelector('.slideshow__backup--content');
  console.log(`slideshowBackupContainer.offsetWidth: ${slideshowBackupContainer.offsetWidth}`);
  console.log(`slideshowBackupContainer.clientWidth: ${slideshowBackupContainer.clientWidth}`);
  slideshowBackupContainer.style.paddingRight = `${slideshowBackupContainer.offsetWidth - slideshowBackupContainer.clientWidth}px`
});




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return populateHotelOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__measureFont__ = __webpack_require__(0);


 

function populateHotelOptions (motherDiv, index, data, size) {
  while (motherDiv.firstChild) {
      motherDiv.removeChild(motherDiv.firstChild);
  };
  
  const theme = Object.keys(data)[index];
  
  // we do <p><span>'letter'</span></p> for each letter, in order to create an animation on each letter
  for (let i = 0; i < data[theme].frenchName.length; i++) {
    const newLetterP = document.createElement('p');
    const newLetterSpan = document.createElement('span');
    newLetterP.appendChild(newLetterSpan);
    newLetterSpan.textContent = data[theme].frenchName.charAt(i);
    motherDiv.appendChild(newLetterP);
  }
  //then letter spacing with margin
  [...motherDiv.children].forEach(letter => {
    Object(__WEBPACK_IMPORTED_MODULE_0__measureFont__["a" /* exactCapitalLetterSize */])(letter, 'Portrait', size, 1);
    //If the character is a space, make it clear to the eye by enlarging it 
    if (letter.firstChild.textContent.charCodeAt(0) === 32) {
      letter.style.marginRight = `${5 * data[theme].optionsLetterSpacing}px`;
    } else {
      letter.style.marginRight = `${data[theme].optionsLetterSpacing}px`;
    }
  })
};





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slideshowParams; });


const white = 'rgba(250,250,250,1.00)';

const slideshowParams = {
  hotel: {
    position: 0,
    frenchName: 'hôtel', 
    backgroundColor: 'hsla(38,5%,65%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPicture: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPicture: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
  },
  restaurant: {
    position: 1,
    frenchName: 'restaurant', 
    backgroundColor: 'hsla(2,41%,82%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPicture: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPicture: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
  },
  clubDeSport: {
    position: 2,
    frenchName: 'club de sport', 
    backgroundColor: 'hsla(194,11%,63%,1.00)',
    optionsLetterSpacing: 3,
    textColor: white,
    totemPicture: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPicture: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
  },
  potager: {
    position: 3,
    frenchName: 'potager', 
    backgroundColor: 'hsla(107,12%,72%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPicture: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPicture: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
  },
  patisserie: {
    position: 4,
    frenchName: 'pâtisserie', 
    backgroundColor: 'hsla(55,76%,82%,1.00)',
    optionsLetterSpacing: 8,
    textColor: 'rgba(151,105,80,1.00)',
    totemPicture: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPicture: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
  },
  evenementiel: {
    position: 5,
    frenchName: 'évènementiel', 
    backgroundColor: 'hsla(33,57%,84%,1.00)',
    optionsLetterSpacing: 8,
    textColor: 'rgba(151,105,80,1.00)',
    totemPicture: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPicture: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
  },
}





/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(22);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bling__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__measureFont__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DOMStyling__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__slideshow_slideshow__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__slideshow_slideshowPortrait__ = __webpack_require__(21);
// import { uniq } from 'lodash';
// import jsonp from 'jsonp';
// import insane from 'insane';
// import 'bootstrap';
// import './Chap1Carousel';
// import './Chap5Carousel';
// import './Chap5BisCarousel';


/*------------------------------------*\
    utilities
\*------------------------------------*/



/*------------------------------------*\
    modules
\*------------------------------------*/







/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export $ */
/* unused harmony export $$ */
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach((elem) => {
    elem.on(name, fn);
  });
};




/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(8);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultValue = __webpack_require__(9);

var findEdge = __webpack_require__(13);
var drawCharacter = __webpack_require__(16);
var resetCanvas = __webpack_require__(17);
var createCanvas = __webpack_require__(18);

module.exports = function measureFont(fontFamily) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var fontSize = defaultValue(options.fontSize, 20);
	var canvasSize = defaultValue(options.tolerance, 6) * fontSize;

	var descenderCharacters = ["g", "j", "p", "q", "y"];
	var ascenderCharacters = ["h", "d", "t", "l"];
	var capHeightCharacters = ["H", "I", "T"];
	var medianCharacters = ["x", "v", "w", "z"];
	var topBoundingCharacters = ["O", "A", "8", "#", "%", "^", "!", "/", "|", "]"];

	var testingCanvas = createCanvas(canvasSize);

	function getLowest(characters) {
		resetCanvas(testingCanvas);

		characters.forEach(function (character) {
			drawCharacter(testingCanvas, character, fontFamily, fontSize);
		});

		return findEdge.lowest(testingCanvas);
	}

	function getHighest(characters) {
		resetCanvas(testingCanvas);

		characters.forEach(function (character) {
			drawCharacter(testingCanvas, character, fontFamily, fontSize);
		});

		return findEdge.highest(testingCanvas);
	}

	var lowestDescenderPoint = getLowest(descenderCharacters) - testingCanvas.height / 2;
	var highestAscenderPoint = testingCanvas.height / 2 - getHighest(ascenderCharacters);
	var highestCapHeightPoint = testingCanvas.height / 2 - getHighest(capHeightCharacters);
	var highestMedianPoint = testingCanvas.height / 2 - getHighest(medianCharacters);
	var highestTopBoundingPoint = testingCanvas.height / 2 - getHighest(topBoundingCharacters);

	return {
		descender: lowestDescenderPoint / fontSize,
		ascender: -highestAscenderPoint / fontSize,
		capHeight: -highestCapHeightPoint / fontSize,
		median: -highestMedianPoint / fontSize,
		topBounding: -highestTopBoundingPoint / fontSize
	};
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(10);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var promiseTry = __webpack_require__(11);

function evaluateValue(value) {
	if (typeof value === "function") {
		return value();
	} else {
		return value;
	}
}

function maybeEvaluateValue(value, evaluate) {
	if (evaluate === true) {
		return evaluateValue(value);
	} else {
		return value;
	}
}

function defaultValue(value, fallbackValue) {
	var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	value = maybeEvaluateValue(value, options.evaluate);

	if (value != null) {
		return value;
	} else {
		return maybeEvaluateValue(fallbackValue, options.evaluate);
	}
}

defaultValue.async = function defaultAsyncValue(value, fallbackValue) {
	var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	return promiseTry(function () {
		return maybeEvaluateValue(value, options.evaluate);
	}).then(function (resultValue) {
		if (resultValue != null) {
			return resultValue;
		} else {
			return maybeEvaluateValue(fallbackValue, options.evaluate);
		}
	});
};

module.exports = defaultValue;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(12);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function promiseTry(func) {
	return new Promise(function (resolve, reject) {
		resolve(func());
	});
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getImageData = __webpack_require__(14);
var scanRow = __webpack_require__(15);

function findEdge(canvas, firstRow, lastRow, step) {
	var imageData = getImageData(canvas).data;
	var valuesPerRow = canvas.width * 4;
	var hitEnd = false;

	if (step === 0) {
		throw new Error("Step cannot be 0");
	}

	var row = firstRow;

	while (!hitEnd) {
		var highestValue = scanRow(imageData, row * valuesPerRow, canvas.width);

		/* 240 is a somewhat randomly picked value to deal with anti-aliasing. */
		if (highestValue > 240) {
			return row;
		}

		row += step;

		if (step > 0) {
			hitEnd = row > lastRow;
		} else if (step < 0) {
			hitEnd = row < lastRow;
		}
	}
}

module.exports = {
	lowest: function findLowestEdge(canvas) {
		return findEdge(canvas, canvas.height - 1, 0, -1);
	},
	highest: function findHighestEdge(canvas) {
		return findEdge(canvas, 0, canvas.height - 1, 1);
	}
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function getImageData(canvas) {
	var context = canvas.getContext("2d");
	return context.getImageData(0, 0, canvas.width, canvas.height);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function scanRow(imageData, offset, length) {
	var highestValue = 0;

	for (var column = 0; column < length; column += 1) {
		var pixelValue = imageData[offset + column * 4];

		if (pixelValue > highestValue) {
			highestValue = pixelValue;
		}
	}

	return highestValue;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function drawCharacter(canvas, character, fontFamily, fontSize) {
	var context = canvas.getContext("2d");
	context.textAlign = "center";
	context.textBaseline = "alphabetic";
	context.font = fontSize + "px '" + fontFamily + "'";
	context.fillStyle = "white";
	context.fillText(character, canvas.width / 2, canvas.height / 2);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function resetCanvas(canvas) {
	var context = canvas.getContext("2d");
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function createCanvas(size) {
	var canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	return canvas;
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fakeDom__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__populateLetters__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DOMStyling__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__params__ = __webpack_require__(3);





/*------------------------------------*\
    VARIABLES & DATA
\*------------------------------------*/

//DATA


//DOM
const slideshowDiv = document.querySelector(".slideshow");
const totemDiv = document.querySelector('.slideshow__totem');
const movingCursorDiv = document.querySelector('.slideshow__cursor--moving');
const hotelOptions = document.querySelector('.slideshow__description--options');
const hotelSlogan = document.querySelector('.slideshow__description--slogan');
const hotelName = slideshowDiv.querySelector('.slideshow__description');
const dividerInDescription = slideshowDiv.querySelector('.slideshow__description--divider');

//CSS
const totemDivHeight = 90;
const cursorVerticalSpacing = 20;
const transitionDuration = 1000;

    /*  CURSOR  */
movingCursorDiv.style.boxShadow = `0px ${(cursorVerticalSpacing * 0)}px, 0px ${(cursorVerticalSpacing * 1)}px, 0px ${(cursorVerticalSpacing * 2)}px, 0px ${(cursorVerticalSpacing * 3)}px, 0px ${(cursorVerticalSpacing * 4)}px, 0px ${(cursorVerticalSpacing * 5)}px`;


//SLIDESHOW PARAMS
let currentIndex = 0;
const numberOfSlides = Object.keys(__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */]).length;
let biggestWordLength = 0;
let biggestWordParam = 0;
Object.keys(__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */]).map(param => {
  if (__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][param].frenchName.length > biggestWordLength) {
    biggestWordLength = __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][param].frenchName.length; 
    biggestWordParam = __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][param].position;
  }; 
});

hotelOptions.style.width = `750px`


/*------------------------------------*\
    INIT
\*------------------------------------*/


function colorsChange(index) {
  const theme = Object.keys(__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */])[index];

  /*  TEXTS COLOR  */
  hotelName.style.color = __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][theme].textColor;
  dividerInDescription.style.borderColor = __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][theme].textColor;

  /* BACKGROUND */
  slideshowDiv.style.backgroundColor = __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][theme].backgroundColor;
  movingCursorDiv.style.color = __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][theme].textColor;
  movingCursorDiv.style.borderColor = __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][theme].textColor;
}

function cursorMove(index) {
  movingCursorDiv.style.transform = `translateY(${-cursorVerticalSpacing * index}px)`;
  window.setTimeout(() => {
    // console.log('step 5 end: cursor moved')
  }, transitionDuration);
}


const init = (index) => {

  const theme = Object.keys(__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */])[index];
  /* BACKGROUND AND TEXT COLORS */
  colorsChange(index);

  /*  CURSOR  */
  cursorMove(index);

  /*   TOTEM   */
  totemDiv.style.backgroundImage = `url('${__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][theme].totemPicture()}')`;

  /*  OPTIONS  */
  Object(__WEBPACK_IMPORTED_MODULE_1__populateLetters__["a" /* populateHotelOptions */])(hotelOptions, index, __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */], __WEBPACK_IMPORTED_MODULE_2__DOMStyling__["a" /* alSize */], true);

  /* SLOGAN   */
  hotelSlogan.firstChild.textContent = 'un style de vie à paris';
};

init(currentIndex);


/*------------------------------------*\
    SLIDESHOW
\*------------------------------------*/


function startTransition(e) {
  //console.log(`${e.code}: ${e.keyCode}`);
  //Prevent pressing any other key
  if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 32) { 
    // console.error('ni space, ni flèche haut, ni flèche bas')
    return; 
  };

  if (!document.body.classList.contains('slideshow__landscape')) {
    return
  }
  //Prevent transit while already transiting
  if (slideshowDiv.classList.contains('inTransition')) {
    // console.error('déjà en transition')
    return;
  } else {
    // console.log('step 1: add class transition')
    slideshowDiv.classList.add('inTransition');
    [slideshowDiv, movingCursorDiv, dividerInDescription, hotelName].forEach(item => {
      item.style.transition = `all ${transitionDuration}ms ease-in-out`;
    })
  }

  const previousIndex = currentIndex;
  // console.log(`step 2: define previous index: ${previousIndex}`)
  let direction;
  if (!(e.keyCode === 38)) {
    currentIndex === numberOfSlides - 1 ? currentIndex = 0 : currentIndex++;
    // console.log(`step 3: define next index: ${currentIndex}`)
    direction = 'up';
    // console.log(`step 4: define direction: ${direction}`)
  } else {
    currentIndex === 0 ? currentIndex = numberOfSlides - 1 : currentIndex--;
    // console.log(`step 3: define next index: ${currentIndex}`)
    direction = 'down';
    // console.log(`step 4: define direction: ${direction}`)
  }

  //Cursor move
  // console.log('step 5: moving the cursor');
  cursorMove(currentIndex);
  
  //Totem move
  // console.log('step 6: moving the totem');
  totemMove(currentIndex, direction);
  
  //Hotel Options change
  hotelOptionsTransit(e, currentIndex, hotelOptions, direction);

  //Background color change
  // console.log('step 7: changing the colors');
  colorsChange(currentIndex);

  // window.setTimeout(() => {
  //   debugger
  // }, transitionDuration / 2)

  //Make the slideshow ready for new transition
  window.setTimeout(() => {
    slideshowDiv.classList.remove('inTransition');
    // console.log('step 8: taking out the transition class');
  }, transitionDuration);
}



function totemMove(index, direction) {
  const up = direction === 'up' ? true : false;
  // console.log(`step 6.1: direction up ? ${up}`)
  const theme = Object.keys(__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */])[index];
  totemDiv.style.transition = `all ${transitionDuration}ms cubic-bezier(0.64, 0.46, 0.38, 1.41)`;
  // if (totemDiv.style.transition === `all ${transitionDuration}ms cubic-bezier(0.64, 0.46, 0.38, 1.41)`) {
  //   // console.log(`step 6.2: transition set`)
  // } else {
  //   // console.error(`step 6.2: transition not set: ${totemDiv.style.transition}`)
  // }
  //Building the new totem
  const newTotemDiv = Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["b" /* buildFakeTotem */])(/*totem*/totemDiv, /*motherDiv*/slideshowDiv, /*data*/__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */], index, up);
  document.body.append(newTotemDiv);
  // if (newTotemDiv.style.transition === `all ${transitionDuration}ms cubic-bezier(0.64, 0.46, 0.38, 1.41)`) {
  //   // console.log(`step 6.3: new totem created with transition set`)
  // } else {
  //   // console.error(`step 6.3: new totem created without transition set: ${newTotemDiv.style.transition}`)
  // }
  window.setTimeout(() => {
    totemDiv.style.transform = `translateY(${(up ? -1 : 1) * 100}vh)`;
    // if (totemDiv.style.transform === `translateY(${(up ? -1 : 1) * 100}vh)`) {
    //   // console.log(`step 6.4: totem instructed to move`)
    // } else {
    //   // console.error(`step 6.4: totem not instructed to move: ${totemDiv.style.transform}`)
    // }
    newTotemDiv.style.transform = `translateY(${(up ? -1 : 1) * 100}vh)`;
    // if (newTotemDiv.style.transform === `translateY(${(up ? -1 : 1) * 100}vh)`) {
    //   // console.log(`step 6.5: newTotemDiv instructed to move`)
    // } else {
    //   // console.error(`step 6.5: newTotemDiv not instructed to move: ${newTotemDiv.style.transform}`)
    // }
    window.setTimeout(() => {
      // debugger
      totemDiv.style.transition = '';
      totemDiv.style.transform = '';
      totemDiv.style.backgroundImage = `url('${__WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */][theme].totemPicture()}')`;
      document.body.removeChild(newTotemDiv);
      // console.log('step 6 end: totem moved')
    }, transitionDuration);
  });
}

function hotelOptionsTransit(e, index, anyHotelOptions, direction) {
  /*    TRANSITION PARAMTERS    */
  let i = 0;
  const offset = direction === 'up' ? 10 : -10;
  const letterTimeout = 20;
  //target: timeout of the last letter + transition of the last letter = 1/2 transition
  const letterTransitionDuration = transitionDuration * (1/2) - letterTimeout * biggestWordLength;
  
  /*    FAKE DOM     */
  const newHotelOptions = Object(__WEBPACK_IMPORTED_MODULE_0__fakeDom__["a" /* buildFakeHotelOptionLetters */])(anyHotelOptions, __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */], index, offset, __WEBPACK_IMPORTED_MODULE_2__DOMStyling__["a" /* alSize */]);
  document.body.append(newHotelOptions);

  //STEP 1: move up the existing letter and transit opacity from 1 to 0 during 1/2 transition
  [...anyHotelOptions.children].forEach(letter => {
    i++;
    window.setTimeout(() => {
    letterDisappear(letter, letterTransitionDuration, offset);
    }, letterTimeout * i);
  });

  //STEP 2: move up the new letter and transit opacity from 0 to 1 during 1/2 transition
  window.setTimeout(() => {
    //debugger
    newHotelOptions.style.opacity = 1;
    [...newHotelOptions.children].forEach(letter => {
      // debugger
      i++;
      window.setTimeout(() => {
      letterAppear(letter, letterTransitionDuration, offset);
      }, letterTimeout * i);
    });
  }, transitionDuration * (1/2))

  window.setTimeout(() => {
    Object(__WEBPACK_IMPORTED_MODULE_1__populateLetters__["a" /* populateHotelOptions */])(anyHotelOptions, index, __WEBPACK_IMPORTED_MODULE_3__params__["a" /* slideshowParams */], __WEBPACK_IMPORTED_MODULE_2__DOMStyling__["a" /* alSize */]);
    document.body.removeChild(newHotelOptions);
  }, transitionDuration)
}

function letterDisappear(letter, transition, offset) {
  // console.log(`offset: ${offset}`);

  // console.log(`letter.textContent: ${letter.textContent}`);
  letter.style.transition = `all ${transition * 2 / 3}ms linear`;
  //STEP 1: move it up
  letter.style.transform = `translateY(${-offset}px)`;
  //STEP 2: fade out
  window.setTimeout(() => {
    letter.style.opacity =  0;
  }, transition / 3);

  window.setTimeout(() => {
    letter.style.transition = ``;
  }, transition);
}

function letterAppear(letter, transition, offset) {
  // console.log(`offset: ${offset}`);

  // console.log(`letter.textContent: ${letter.textContent}`);
  letter.style.transition = `transform ${transition * 2 / 3}ms cubic-bezier(0.64, 0.46, 0.4, 2.19), opacity ${transition * 2 / 3}ms linear`;
  //STEP 1: move it up
  letter.style.transform = `translateY(${-offset}px)`;
  //STEP 2: fade out
  letter.style.opacity =  1;

  window.setTimeout(() => {
    // letter.style.transition = ``;
  }, transition);
}




window.addEventListener('keyup', function(e) {
  //Prevent scrolling when pressing space
  e.preventDefault();
  startTransition(e);
})

// window.addEventListener('load', function(e) {
//   e.preventDefault();
//   hotelOptionsTransit(e, currentIndex, hotelOptions);
// })





/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return buildFakeTotem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildFakeHotelOptionLetters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__populateLetters__ = __webpack_require__(2);



  //Building the new totem

function buildFakeTotem (totemDiv, motherDiv, data, index, up) {
  let newTotemDiv;
  newTotemDiv = totemDiv.cloneNode(true);
  newTotemDiv.style.position = `absolute`;
  newTotemDiv.style.height = `${totemDiv.getBoundingClientRect().height}px`;
  newTotemDiv.style.left = `${totemDiv.getBoundingClientRect().left}px`;
  newTotemDiv.style.right = `${totemDiv.getBoundingClientRect().right}px`;
  newTotemDiv.style.top = `${totemDiv.getBoundingClientRect().top + (up ? 1 : -1) * motherDiv.getBoundingClientRect().height}px`;
  newTotemDiv.style.width = `${totemDiv.getBoundingClientRect().width}px`;
  newTotemDiv.style.backgroundRepeat = 'no-repeat';
  newTotemDiv.style.backgroundSize = 'auto 100%';
  newTotemDiv.style.backgroundPositionY = 'bottom';
  const theme = Object.keys(data)[index];
  newTotemDiv.style.backgroundImage = `url('${data[theme].totemPicture()}')`;

  return newTotemDiv;
  //TO DO IN THE FUNCTION
  // document.body.append(newTotemDiv);
};

function buildFakeHotelOptionLetters (motherDiv, data, index, offset, size) {
  // console.log(`offset: ${offset}`);
  let newHotelOptions;
  newHotelOptions = motherDiv.cloneNode(false);

  Object(__WEBPACK_IMPORTED_MODULE_0__populateLetters__["a" /* populateHotelOptions */])(newHotelOptions, index, data, size);

  const divHorizontalCenter = (motherDiv.getBoundingClientRect().right - motherDiv.getBoundingClientRect().left) / 2;

  // console.log(motherDiv);
  // console.log(newHotelOptions);
  // console.log(`motherDiv.getBoundingClientRect().width: ${motherDiv.getBoundingClientRect().width}`);
  // console.log(`motherDiv.style.width: ${motherDiv.style.width}`);
  // console.log(`newHotelOptions.style.width: ${newHotelOptions.style.width}`);

  newHotelOptions.style.position = `absolute`;
  newHotelOptions.style.height = `${motherDiv.getBoundingClientRect().height}px`;
  newHotelOptions.style.width = `${motherDiv.getBoundingClientRect().width}px`;
  newHotelOptions.style.left = `${motherDiv.getBoundingClientRect().left}px`;
  newHotelOptions.style.top = `${motherDiv.getBoundingClientRect().top + offset}px`;
  [...newHotelOptions.children].forEach(letter => {
    letter.style.opacity = `0`;
  });
  const theme = Object.keys(data)[index];
  newHotelOptions.style.color = data[theme].textColor;


  return newHotelOptions;
  //TO DO IN THE FUNCTION
  // document.body.append(newHotelOptions);
};






/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__params__ = __webpack_require__(3);


//DATA


const slideshowDiv = document.querySelector(".slideshow__backup--content");

Object.keys(__WEBPACK_IMPORTED_MODULE_0__params__["a" /* slideshowParams */]).forEach(option => {
  const newOptionDiv = document.createElement('div');
  newOptionDiv.style.backgroundImage = `url('${__WEBPACK_IMPORTED_MODULE_0__params__["a" /* slideshowParams */][option].backupPicture()}')`;
  newOptionDiv.style.backgroundRepeat = 'no-repeat';
  newOptionDiv.style.backgroundSize = 'auto 100%';
  newOptionDiv.style.backgroundPositionY = 'bottom';
  newOptionDiv.style.width = '100%';
  newOptionDiv.style.height = `${slideshowDiv.getBoundingClientRect().width / 1.75}px`;
  slideshowDiv.appendChild(newOptionDiv);
})

console.log(slideshowDiv)


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map