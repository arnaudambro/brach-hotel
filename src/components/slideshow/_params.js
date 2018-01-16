'use strict';
import { buildFakeTotem } from './_fakeDom';

const totemDiv = document.querySelector('.slideshow__totem');
const white = 'rgba(250,250,250,1.00)';

const slideshowParams = {
  hotel: {
    position: 0,
    frenchName: 'hôtel', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(38,5%,65%,1.00)',
    fontSizeLargeScreen: 53.5,
    optionsLetterSpacingLargeScreen: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    // fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
    imageWidth: 940,
    imageHeight: 1144,
    imageMainLineFromLeft: 210
  },
  clubDeSport: {
    position: 1,
    frenchName: 'club de sport', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(194,11%,63%,1.00)',
    fontSizeLargeScreen: 53.5,
    optionsLetterSpacingLargeScreen: 3,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    // fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
    imageWidth: 1135,
    imageHeight: 1113,
    imageMainLineFromLeft: 225
  },
  restaurant: {
    position: 2,
    frenchName: 'restaurant', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(2,41%,82%,1.00)',
    fontSizeLargeScreen: 53.5,
    optionsLetterSpacingLargeScreen: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    // fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
    imageWidth: 1048,
    imageHeight: 1174,
    imageMainLineFromLeft: 150
  },
  bar: {
    position: 3,
    frenchName: 'bar', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(2,41%,82%,1.00)',
    fontSizeLargeScreen: 53.5,
    optionsLetterSpacingLargeScreen: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_hotel.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/hotel.png` },
    // fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
    imageWidth: 940,
    imageHeight: 1144,
    imageMainLineFromLeft: 210
  },
  patisserie: {
    position: 4,
    frenchName: 'pâtisserie', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(55,76%,82%,1.00)',
    fontSizeLargeScreen: 53.5,
    optionsLetterSpacingLargeScreen: 8,
    textColor: 'rgba(151,105,80,1.00)',
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    // fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
    imageWidth: 1039,
    imageHeight: 1162,
    imageMainLineFromLeft: 194
  },
  evenementiel: {
    position: 5,
    frenchName: 'évènementiel', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(33,57%,84%,1.00)',
    fontSizeLargeScreen: 53.5,
    optionsLetterSpacingLargeScreen: 4,
    textColor: 'rgba(151,105,80,1.00)',
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    // fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
    imageWidth: 1415,
    imageHeight: 1195,
    imageMainLineFromLeft: 141
  },
  potager: {
    position: 6,
    frenchName: 'potager', 
    totemDiv: function() { return document.querySelector(`.totem_${Object.keys(slideshowParams)[this.position]}`)},
    backgroundColor: 'hsla(107,12%,72%,1.00)',
    fontSizeLargeScreen: 53.5,
    optionsLetterSpacingLargeScreen: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    // fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
    imageWidth: 1155,
    imageHeight: 1245,
    imageMainLineFromLeft: 237
  }
};


const hotelFixedCharacters = {
  brachFirstLast: {
    position: 0,
    frenchName: 'b', 
    fontSizeLargeScreen: 26.750,
    optionsLetterSpacingLargeScreen: 3,
    textColor: white,
  },
  brachLast: {
    position: 1,
    frenchName: 'h', 
    fontSizeLargeScreen: 26.750,
    optionsLetterSpacingLargeScreen: 0,
    textColor: white,
  },
  brachMiddle: {
    position: 2,
    frenchName: 'rac', 
    fontSizeLargeScreen: 23,
    optionsLetterSpacingLargeScreen: 3,
    textColor: white,
  },
  slogan: {
    position: 3,
    frenchName: 'un style de vie à paris', 
    fontSizeLargeScreen: 9.3625,
    optionsLetterSpacingLargeScreen: 3,
    textColor: white, 
  }
};

export { slideshowParams, hotelFixedCharacters };

