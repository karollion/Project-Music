import {templates} from '../settings.js';
import utils from '../utils.js';

/**
 * The class renders the 'song' template in selected container.
 * The song data comes from the app.json/songs, 
 * the author data comes from the app.json/authors.
 * Player plugin: GreenAudioPlayer.
 */
class Song {
  constructor(data, wrapper, authors){
    const thisSong = this;

    thisSong.data = data;
    thisSong.authors = authors;
    thisSong.render(wrapper);
    //thisSong.initAction();
  }

  render(wrapper){
    const thisSong = this;
    
    /** Search author name to author number in song data */
    let authorOfSong = '';
    for(let author of thisSong.authors){
      if(thisSong.data.author === author.id){
        authorOfSong = author.name;
      }
    }
    
    /** Add author name and className of player to  thisSong.data,
     *  next send thisSong.data to template
    */
    let className = thisSong.data.filename.replace('.', '').replaceAll('_', '');
    thisSong.data.authorName = authorOfSong;
    thisSong.data.player = className;
    const songHTML = templates.song(thisSong.data);
    thisSong.element = utils.createDOMFromHTML(songHTML);
    const wrapperclass = wrapper.getAttribute('class');
    const container = document.querySelector('.' + wrapperclass + ' .container_songs') ;
    container.appendChild(thisSong.element).innerHTML;

    /** create class name for plugin  GreenAudioPlayer and create it in selected element(class)*/
    thisSong.dom = {};
    thisSong.dom.wrapper = wrapper;
    thisSong.dom.player = thisSong.dom.wrapper.querySelector('.player'); 
    thisSong.dom.audio = thisSong.dom.wrapper.querySelector('audio');
    
    const playerWrapper = '.' + wrapperclass + ' .' + thisSong.data.player;
    new GreenAudioPlayer(playerWrapper); // eslint-disable-line

  }

  initAction(){
    const thisSong = this;

    const player = thisSong.dom.wrapper.getElementsByTagName('audio');

    console.log(player);
    console.log(thisSong.dom.audio);
    player[0].addEventListener('play', function(){
      //event.preventDefault();
      console.log('Klik', thisSong.data.title);
    });

    //thisSong.dom.audio.addEventListener('play', console.log('pik'));

  }
}

export default Song;