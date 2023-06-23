import {templates, select} from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';
import Subscribe from './subscribe.js';

class Home {
  constructor(element,songs){
    const thisHome = this;
    
    thisHome.songs = songs;
    thisHome.render(element);
    thisHome.initListSongs();
    thisHome.initSubscribe();
  }

  render(element){
    const thisHome = this;
    const homeHTML = templates.homePage();
    thisHome.element = utils.createDOMFromHTML(homeHTML);
    const homeContainer = document.querySelector(select.containerOf.home);
    homeContainer.appendChild(thisHome.element).innerHTML;
    
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
  }
  
  initListSongs(){
    const thisHome = this;
    
    for(let songData in thisHome.songs){
      //console.log(thisHome.songs[songData]);
      new Song(thisHome.songs[songData], thisHome.dom.wrapper);
    }
  }

  initSubscribe(){
    new Subscribe();
  }
}
export default Home;