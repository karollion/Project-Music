import {templates, select, classNames} from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';
import Subscribe from './subscribe.js';

class Home {
  constructor(element,songs, authors, categories, mostListened){
    const thisHome = this;
    
    thisHome.songs = songs;
    thisHome.authors = authors;
    thisHome.categories = categories;
    thisHome.mostListened = mostListened;
    thisHome.render(element);
    thisHome.initListSongs();
    thisHome.initActions();
    thisHome.initSubscribe();
  }

  render(element){
    const thisHome = this;


    const homeHTML = templates.homePage(thisHome.categories);
    thisHome.element = utils.createDOMFromHTML(homeHTML);
    const homeContainer = document.querySelector(select.containerOf.home);
    homeContainer.appendChild(thisHome.element).innerHTML;
    
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.linksCategories = thisHome.dom.wrapper.querySelectorAll(select.all.links);
  }

  initActions() {
    const thisHome = this;

    for(let category of thisHome.dom.linksCategories){
      category.addEventListener('click', function(event){
        event.preventDefault();
        thisHome.categoryClickHandler(event);
      });
    }

    const audList = thisHome.dom.wrapper.getElementsByTagName('audio');

    for (let i = 0; i < audList.length; i++) {
      audList[i].addEventListener('play', function(){
        thisHome.mostListened.push(audList[i]);
        //console.log(thisHome.mostListened);
      });
    }
  }

  /**
   * The method changes the color of the selected category, 
   * shows songs that have that category and hides the others
   * @param {*} event 
   */
  categoryClickHandler(event) {
    const thisHome = this;

    const categoryClass = event.target.getAttribute('class');
    const categoryName = event.target.textContent;
    const allSongs = thisHome.dom.wrapper.querySelectorAll('.song');

    for(let category of thisHome.dom.linksCategories){
      category.classList.remove(classNames.categories.selected);
    }

    if( categoryClass == classNames.categories.selected) {
      event.target.classList.remove(classNames.categories.selected);
      for(let song of allSongs){
        song.classList.remove(classNames.categories.hidden);
      }
    } else {
      event.target.classList.add(classNames.categories.selected);
      for(let song of allSongs){
        let cat = song.querySelector('.song_categories');

        if(cat.textContent.search(categoryName) >= 0){
          song.classList.remove(classNames.categories.hidden);
        } else {
          song.classList.add(classNames.categories.hidden);
        }
      }
    }
  }
  
  initListSongs(){
    const thisHome = this;
    
    for(let songData in thisHome.songs){
      //console.log(thisHome.songs[songData]);
      new Song(thisHome.songs[songData], thisHome.dom.wrapper, thisHome.authors);
    }
  }

  initSubscribe(){
    new Subscribe();
  }
}
export default Home;