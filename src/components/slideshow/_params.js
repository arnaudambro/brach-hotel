'use strict';
import { buildFakeTotem } from './_fakeDom';

const totemDiv = document.querySelector('.slideshow__totem');
const white = 'rgba(250,250,250,1.00)';

const slideshowParams = {
  hotel: {
    position: 0,
    frenchName: 'hôtel', 
    backgroundColor: 'hsla(38,5%,65%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
  },
  restaurant: {
    position: 1,
    frenchName: 'restaurant', 
    backgroundColor: 'hsla(2,41%,82%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
  },
  clubDeSport: {
    position: 2,
    frenchName: 'club de sport', 
    backgroundColor: 'hsla(194,11%,63%,1.00)',
    optionsLetterSpacing: 3,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
  },
  potager: {
    position: 3,
    frenchName: 'potager', 
    backgroundColor: 'hsla(107,12%,72%,1.00)',
    optionsLetterSpacing: 8,
    textColor: white,
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
  },
  patisserie: {
    position: 4,
    frenchName: 'pâtisserie', 
    backgroundColor: 'hsla(55,76%,82%,1.00)',
    optionsLetterSpacing: 8,
    textColor: 'rgba(151,105,80,1.00)',
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
  },
  evenementiel: {
    position: 5,
    frenchName: 'évènementiel', 
    backgroundColor: 'hsla(33,57%,84%,1.00)',
    optionsLetterSpacing: 8,
    textColor: 'rgba(151,105,80,1.00)',
    totemPictureUrl: function() { return `./src/img/totems/totem_${Object.keys(slideshowParams)[this.position]}.png` },
    backupPictureUrl: function() { return `./src/img/responsive_pictures/${Object.keys(slideshowParams)[this.position]}.png` },
    fakeTotem: function() { return buildFakeTotem(totemDiv, slideshowParams, this.position) },
  },
}

export { slideshowParams };

