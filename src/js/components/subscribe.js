import {templates, select} from '../settings.js';
import utils from '../utils.js';

class Subscribe {
  constructor(){
    const thisSub = this;

    thisSub.render();
  }

  render(){
    const thisSub = this;
    const subHTML = templates.subscribe();
    thisSub.element = utils.createDOMFromHTML(subHTML);
    const container = document.querySelector(select.containerOf.home);
    container.appendChild(thisSub.element).innerHTML;
  }
}

export default Subscribe;