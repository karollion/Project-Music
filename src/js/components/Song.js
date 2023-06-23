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
    wrapper.appendChild(thisSong.element).innerHTML;

    thisSong.dom = {};
    thisSong.dom.wrapper = wrapper;
  }

}

export default Song;