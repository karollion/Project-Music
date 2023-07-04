import {select, classNames, settings} from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
import Uppercase from './components/Uppercase.js';

const app = {
  initPages: function(){
    const thisApp = this;
    //select all children of container "pages" (order i booking)
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    /* get id from hash page*/ 
    const idFromHash = window.location.hash.replace('#/', ''); 
    let pageMatchingHash = thisApp.pages[0].id;
    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);
    
    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');
        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);
        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;
    /* add class 'active* to matching pages, remove from non-matching */
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* add class 'active* to matching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initData: function() {
    const thisApp = this;
    thisApp.data = {};
    
    const urla = settings.db.url + '/' + settings.db.authors;
    
    fetch(urla)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.authors = parsedResponse;
        //console.log(thisApp.data.authors);
      });

    const url = settings.db.url + '/' + settings.db.songs;
    
    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;
        
        thisApp.categoriesOfSongs();
        thisApp.initHome();
        thisApp.initSearch();
        thisApp.initDiscover();
        thisApp.initUppercase();
      });
  },


  initHome: function(){
    const thisApp = this;

    const homeHtml = document.querySelector(select.containerOf.home);
    thisApp.homePage = new Home(homeHtml, thisApp.data.songs, thisApp.data.authors);
  },

  initSearch: function(){
    const thisApp = this;

    const searchHtml = document.querySelector(select.containerOf.search);
    thisApp.searchPage = new Search(searchHtml, thisApp.data.songs, thisApp.data.authors, thisApp.uniqueCategories);
  },

  initDiscover: function(){
    const thisApp = this;

    const discoverHtml = document.querySelector(select.containerOf.discover);
    thisApp.discoverPage = new Discover(discoverHtml, thisApp.data.songs, thisApp.data.authors);
  },

  initUppercase: function(){
    const thisApp = this;

    thisApp.uppercase = new Uppercase();
  },

  categoriesOfSongs: function(){
    const thisApp = this;
    let categories = [];
    for(let song of thisApp.data.songs) {
      for(let cat of song.categories){
        categories.push(cat);
      }
    }
    thisApp.uniqueCategories = [];
    categories.forEach((element) => {
      if (!thisApp.uniqueCategories.includes(element)) {
        thisApp.uniqueCategories.push(element);
      }
    });
  },

  init: function(){
    const thisApp = this;

    thisApp.initData();
    thisApp.initPages();
  }
};

app.init();