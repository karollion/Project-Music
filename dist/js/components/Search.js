import {templates, select} from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

/** 
 * Search a song from all songs in the database,
 * based on a string of characters provided by the user, 
 * and displaying it on the page.
 * */
class Search {
  constructor(element,songs, authors){
    const thisSearch = this;
    thisSearch.songs = songs;
    thisSearch.authors = authors;
    thisSearch.render(element);
    thisSearch.initActions();
  }

  render(element){
    const thisSearch = this;
    const searchHTML = templates.searchPage();
    thisSearch.element = utils.createDOMFromHTML(searchHTML);
    const searchContainer = document.querySelector(select.containerOf.search);
    searchContainer.appendChild(thisSearch.element).innerHTML;

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.searchButton = thisSearch.dom.wrapper.querySelector(select.search.button);
    thisSearch.dom.containerOfSongs = thisSearch.dom.wrapper.querySelector(select.search.containerSongs);
    thisSearch.dom.searchInput = thisSearch.dom.wrapper.querySelector(select.search.searchInput);
    thisSearch.dom.counterSongs = thisSearch.dom.wrapper.querySelector(select.search.counterSongs);
  }

  initActions(){
    const thisSearch = this;
    thisSearch.dom.searchButton.addEventListener('click', function(event){
      event.preventDefault();
      thisSearch.dom.containerOfSongs.innerHTML = '';
      thisSearch.searchTitleSong();
    });
  }

  /** Find a song if its title or author contains the phrase you are looking for */
  searchTitleSong(){
    const thisSearch = this;
    let searchedSongs = [];
    let counterSongs = 0;

    /** Searching for a given phrase in a song title */
    for(let song of thisSearch.songs){
      let songAuthor = '';
      for(let author of thisSearch.authors){
        if(song.author == author.id){
          songAuthor = author.name;
        }
      }

      /** Searching for a given phrase in the author of the song */
      if(songAuthor.search(thisSearch.dom.searchInput.value) >= 0 
        || 
        song.title.search(thisSearch.dom.searchInput.value) >= 0 
        && 
        thisSearch.dom.searchInput.value != '')
      {
        searchedSongs.push(song.id);
        counterSongs += 1;
        //console.log(searchedSongs);
      }
    }

    /** Remove repeated songs from the array */
    let uniqueSongs = [];
    searchedSongs.forEach((element) => {
      if (!uniqueSongs.includes(element)) {
        uniqueSongs.push(element);
      }
    });

    if(counterSongs > 0){
      thisSearch.dom.counterSongs.innerHTML = 'We have found ' + counterSongs + ' songs...';
    } else {
      thisSearch.dom.counterSongs.innerHTML = 'We have not found any song';
    }

    /** Show all found songs */
    uniqueSongs.forEach((element) => {
      thisSearch.showSong(element);
    });
  }

  /** Displaying the song with the given 'id' and in the selected place */
  showSong(id){
    const thisSearch = this;
    
    new Song(thisSearch.songs[id - 1], thisSearch.dom.wrapper, thisSearch.authors);
  }
}
export default Search;