import {templates, select} from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

class Search {
  constructor(element,songs, authors){
    const thisSearch = this;
    thisSearch.songs = songs;
    thisSearch.authors = authors;
    thisSearch.render(element);
    thisSearch.searchTitleSong();
  }

  render(element){
    const thisSearch = this;
    const searchHTML = templates.searchPage();
    thisSearch.element = utils.createDOMFromHTML(searchHTML);
    const searchContainer = document.querySelector(select.containerOf.search);
    searchContainer.appendChild(thisSearch.element).innerHTML;

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
  }

  searchTitleSong(){
    const thisSearch = this;
    //console.log(thisSearch.songs);
    let searchedSongs = [];

    for(let author of thisSearch.authors){
      if(author.name.search('Dav') >= 0){
        //console.log(author.name);
        for(let song of thisSearch.songs){
          if(song.author == author.id || song.title.search('Bass') >= 0){
            searchedSongs.push(song.id);
            //console.log(searchedSongs);
          }
        }
      }
    }

    let uniqueSongs = [];
    searchedSongs.forEach((element) => {
      if (!uniqueSongs.includes(element)) {
        uniqueSongs.push(element);
      }
    });

    uniqueSongs.forEach((element) => {
      thisSearch.showSong(element);
    });
    //console.log(uniqueSongs);
  }

  showSong(id){
    const thisSearch = this;
    
    new Song(thisSearch.songs[id - 1], thisSearch.dom.wrapper, thisSearch.authors);
  }
}
export default Search;