import {templates, select} from '../settings.js';
import utils from '../utils.js';

class Search {
  constructor(element,app){
    const thisSearch = this;
    thisSearch.app = app;
    thisSearch.render(element);
  }

  render(element){
    const thisSearch = this;
    const searchHTML = templates.searchPage();
    thisSearch.element = utils.createDOMFromHTML(searchHTML);
    const searchContainer = document.querySelector(select.containerOf.search);
    searchContainer.appendChild(thisSearch.element).innerHTML;

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
  }
}
export default Search;