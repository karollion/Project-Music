import {templates, select} from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

/** 
 * Randomizes a song from all songs in the database 
 * and displaying it on the page.
 * */

class Discover {
  constructor(element,songs, authors, mostListened){
    const thisDiscover = this;
    thisDiscover.songs = songs;
    thisDiscover.authors = authors;
    thisDiscover.mostListened = mostListened;

    thisDiscover.render(element);
    thisDiscover.getRandomSong();
    thisDiscover.initActions();
  }

  render(element){
    const thisDiscover = this;
    
    const discoverHTML = templates.discoverPage();
    thisDiscover.element = utils.createDOMFromHTML(discoverHTML);
    const discoverContainer = document.querySelector(select.containerOf.discover);
    discoverContainer.appendChild(thisDiscover.element).innerHTML;

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.containerSongs = thisDiscover.dom.wrapper.querySelector('.container_songs');
    thisDiscover.dom.title = document.querySelector('.main_nav_a_discover');
  }

  initActions() {
    const thisDiscover = this;

    thisDiscover.dom.title.addEventListener('click', function(event){
      event.preventDefault();
      thisDiscover.findCategory();
      thisDiscover.getRandomSong();
    });


    const audList = thisDiscover.dom.wrapper.getElementsByTagName('audio');

    for (let i = 0; i < audList.length; i++) {
      audList[i].addEventListener('play', function(){
        thisDiscover.mostListened.push(audList[i]);
      });
    }
  }
  
  /** The function searches categories of all played songs */
  findCategory() {
    const thisDiscover = this;
    let allPlayedCat = [];
    
    for(let song of thisDiscover.mostListened) {
      let source = song.querySelector('source');
      let nameSong = source.src.slice(source.src.search('songs') + 6);
      
      for(let song of thisDiscover.songs) {
        if(song.filename == nameSong){
          allPlayedCat = allPlayedCat.concat(song.categories);
        }
      }
    }

    thisDiscover.favCategory =  thisDiscover.mode(allPlayedCat);
  }

  /** The function searches for the most frequent element in the array */
  mode(array){
    if(array.length == 0)
      return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
      var el = array[i];
      if(modeMap[el] == null)
        modeMap[el] = 1;
      else
        modeMap[el]++;  
      if(modeMap[el] > maxCount)
      {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  /** Randomizes a song from all songs in the database */
  getRandomSong() {
    const thisDiscover = this;

    if(thisDiscover.favCategory == null){
      //console.log('Brak faworyta');
      const max = thisDiscover.songs.length;
      const randomSongId = Math.floor(Math.random() * max) + 1;
      thisDiscover.dom.containerSongs.innerHTML = '';
      thisDiscover.showSong(randomSongId);
    } else {
      let favSongs = [];
      //console.log('Fav: ', thisDiscover.favCategory);
      for(let song of thisDiscover.songs) {
        if(song.categories.indexOf(thisDiscover.favCategory) > -1) {
          favSongs.push(song.id);
        }
      }
      const randomSongId = favSongs[Math.floor(Math.random() * favSongs.length)];
      thisDiscover.dom.containerSongs.innerHTML = '';
      thisDiscover.showSong(randomSongId);
    }
  }
  
  /** Displaying the song with the given 'id' and in the selected place */
  showSong(id){
    const thisDiscover = this;

    new Song(thisDiscover.songs[id -1], thisDiscover.dom.wrapper, thisDiscover.authors);
  }
}
export default Discover;