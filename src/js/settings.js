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