export const select = {
  templateOf: {
    song:         '#template-song',
    subscribe:    '#template-subscribe-widget',
    homePage:     '#template-home-widget',
    searchPage:   '#template-search-widget',
    discoverPage: '#template-discover-widget',
  },
  containerOf: {
    home:     '.home-wrapper',
    search:   '.search-wrapper',
    discover: '.discover-wrapper',
    pages:    '#pages',
  },
  nav: {
    links: '.main-nav a',
  },
  search: {
    button: '.searchbar_button',
    containerSongs: '.container_songs',
    searchInput: '[name="search_song_label"]',
    searchSelect: '[name="search_song_select"]',
    counterSongs: '.searchbar_counter_songs',
  },
  uppercase: {
    headerTitle: '.logo__title',
    headerSubtitle: '.logo__subtitle',
    main_nav_a_home: '.main_nav_a_home',
    main_nav_a_search: '.main_nav_a_search',
    main_nav_a_discover: '.main_nav_a_discover',
    searchTitle: '.search_title',
    searchButton: '.searchbar_button',
    discoverTitle: '.discover_title',
    homeSubscribe: '.subscribe_title',
    homeJoinButton: '.subscribe_button',
    homeAlbum: '.subscribe_album',
  }
};

export  const templates = {
  song: Handlebars.compile(document.querySelector(select.templateOf.song).innerHTML),
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
  subscribe: Handlebars.compile(document.querySelector(select.templateOf.subscribe).innerHTML),
  searchPage: Handlebars.compile(document.querySelector(select.templateOf.searchPage).innerHTML),
  discoverPage: Handlebars.compile(document.querySelector(select.templateOf.discoverPage).innerHTML),
};

export  const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  }
};

export  const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
    authors: 'authors',
  },
};