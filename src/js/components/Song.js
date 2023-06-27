import {templates} from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(data, wrapper, authors){
    const thisSong = this;

    thisSong.data = data;
    thisSong.authors = authors;
    thisSong.render(wrapper);
  }

  render(wrapper){
    const thisSong = this;
    
    let authorOfSong = '';
    for(let author of thisSong.authors){
      if(thisSong.data.author === author.id){
        authorOfSong = author.name;
      }
    }
    let className = thisSong.data.filename.replace('.', '').replaceAll('_', '');
    
    thisSong.data.authorName = authorOfSong;
    thisSong.data.player = className;
    
    const songHTML = templates.song(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(songHTML);
    const wrapperclass = wrapper.getAttribute('class');
    const container = document.querySelector('.' + wrapperclass + ' .container_songs') ;
    container.appendChild(thisSong.element).innerHTML;
    thisSong.dom = {};
    thisSong.dom.wrapper = wrapper;
    thisSong.dom.player = thisSong.dom.wrapper.querySelector('.player'); 
    
    const playerWrapper = '.' + wrapperclass + ' .' + thisSong.data.player;
    new GreenAudioPlayer(playerWrapper); // eslint-disable-line
  }
}

export default Song;