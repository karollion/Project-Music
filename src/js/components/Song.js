import {templates} from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(data, wrapper){
    const thisSong = this;

    thisSong.data = data;
    thisSong.render(wrapper);

  }

  render(wrapper){

    const thisSong = this;
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