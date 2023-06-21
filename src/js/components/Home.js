import {templates, select} from '../settings.js';
import utils from '../utils.js';

class Home {
  constructor(element,app){
    const thisHome = this;
    thisHome.app = app;
    thisHome.render(element);
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
}
export default Home;