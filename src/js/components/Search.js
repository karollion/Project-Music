import {templates, select} from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

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

  searchTitleSong(){
    const thisSearch = this;
    let searchedSongs = [];
    let counterSongs = 0;

    for(let author of thisSearch.authors){
      console.log(author.name.search(thisSearch.dom.searchInput.value));
      if(author.name.search(thisSearch.dom.searchInput.value) >= 0 
        && 
        thisSearch.dom.searchInput.value != '')
      {
        //console.log(author.name);
        for(let song of thisSearch.songs){
          if(song.author == author.id || song.title.search(thisSearch.dom.searchInput.value) >= 0 
            && 
            thisSearch.dom.searchInput.value != '')
          {
            searchedSongs.push(song.id);
            counterSongs += 1;
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

    if(counterSongs > 0){
      thisSearch.dom.counterSongs.innerHTML = 'We have found ' + counterSongs + ' songs...';
    } else {
      thisSearch.dom.counterSongs.innerHTML = 'We have not found any song';
    }

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