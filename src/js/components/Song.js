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

    //thisSong.data.author = thisSong.author;
    let authorOfSong = '';
    for(let author of thisSong.authors){

      if(thisSong.data.author === author.id){
        authorOfSong = author.name;
      }
    }

    thisSong.data.authorName = authorOfSong;

    const songHTML = templates.song(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(songHTML);
    const wrapperclass = wrapper.getAttribute('class');
    const container = document.querySelector('.' + wrapperclass + ' .container_songs') ;
    container.appendChild(thisSong.element).innerHTML;
    thisSong.dom = {};
    thisSong.dom.wrapper = wrapper;
  }

}

export default Song;