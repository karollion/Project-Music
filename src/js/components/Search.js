import {templates, select} from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

class Search {
  constructor(element,songs){
    const thisSearch = this;
    thisSearch.songs = songs;
    thisSearch.render(element);
  }

  render(element){
    const thisSearch = this;
    const searchHTML = templates.searchPage();
    thisSearch.element = utils.createDOMFromHTML(searchHTML);
    const searchContainer = document.querySelector(select.containerOf.search);
    searchContainer.appendChild(thisSearch.element).innerHTML;

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;

    thisSearch.showSong();
  }

  showSong(){
    const thisDiscover = this;
    //console.log(thisDiscover.songs[1], thisDiscover.dom.wrapper);
    new Song(thisDiscover.songs[3], thisDiscover.dom.wrapper);
    //console.log(song);
  }
}
export default Search;