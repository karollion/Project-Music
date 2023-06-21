export const select = {
  templateOf: {
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
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
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