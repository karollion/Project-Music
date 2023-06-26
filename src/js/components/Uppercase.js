import {select} from '../settings.js';

/**
 * The class changes the letters in the selected text elements to uppercase.
 */
class Uppercase {
  constructor(){
    const thisUppercase = this;
    
    thisUppercase.selectElements();
  }

  selectElements(){
    const thisUppercase = this;

    thisUppercase.dom = {};
    thisUppercase.dom.headerTitle = document.querySelector(select.uppercase.headerTitle);
    thisUppercase.dom.headerSubtitle = document.querySelector(select.uppercase.headerSubtitle);
    thisUppercase.dom.main_nav_a_home = document.querySelector(select.uppercase.main_nav_a_home);
    thisUppercase.dom.main_nav_a_search = document.querySelector(select.uppercase.main_nav_a_search);
    thisUppercase.dom.main_nav_a_discover = document.querySelector(select.uppercase.main_nav_a_discover);
    thisUppercase.dom.homeSubscribe = document.querySelector(select.uppercase.homeSubscribe);
    thisUppercase.dom.homeJoinButton = document.querySelector(select.uppercase.homeJoinButton);
    thisUppercase.dom.homeAlbum = document.querySelector(select.uppercase.homeAlbum);
    thisUppercase.dom.searchTitle = document.querySelector(select.uppercase.searchTitle);
    thisUppercase.dom.searchButton = document.querySelector(select.uppercase.searchButton);
    thisUppercase.dom.discoverTitle = document.querySelector(select.uppercase.discoverTitle);
    
    thisUppercase.changeToUppercase();
  }

  changeToUppercase(){
    const thisUppercase = this;
    for(let element in thisUppercase.dom){
      //console.log(element);
      thisUppercase.dom[element].style.textTransform = 'uppercase';
    }
  }
  
}
export default Uppercase;