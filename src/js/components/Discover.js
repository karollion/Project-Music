import {templates, select} from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

class Discover {
  constructor(element,songs, authors){
    const thisDiscover = this;
    thisDiscover.songs = songs;
    thisDiscover.authors = authors;
    thisDiscover.render(element);
    thisDiscover.getRandomSong();
  }

  render(element){
    const thisDiscover = this;
    
    const discoverHTML = templates.discoverPage();
    thisDiscover.element = utils.createDOMFromHTML(discoverHTML);
    const discoverContainer = document.querySelector(select.containerOf.discover);
    discoverContainer.appendChild(thisDiscover.element).innerHTML;

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
  }

  getRandomSong() {
    const thisDiscover = this;

    const max = thisDiscover.songs.length;
    const randomSongId = Math.floor(Math.random() * max) + 1;
    thisDiscover.showSong(randomSongId);
  }
  

  showSong(id){
    const thisDiscover = this;

    new Song(thisDiscover.songs[id -1], thisDiscover.dom.wrapper, thisDiscover.authors);
  }
}
export default Discover;