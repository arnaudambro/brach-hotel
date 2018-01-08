'use strict';

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


export { slideshowParams };
