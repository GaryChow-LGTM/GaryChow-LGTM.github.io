(function () {
  'use strict';

  var LANGS = ['en', 'zh-CN'];
  var SWITCHER_PATHS = { '/en/': 1, '/zh-CN/': 1 };

  function detectLang() {
    var path = window.location.pathname;
    for (var i = 0; i < LANGS.length; i++) {
      var prefix = '/' + LANGS[i] + '/';
      if (path === prefix || path.indexOf(prefix) === 0) return LANGS[i];
    }
    return null;
  }

  function stripLangPrefix(href) {
    for (var i = 0; i < LANGS.length; i++) {
      var prefix = '/' + LANGS[i];
      if (href === prefix + '/') return '/';
      if (href.indexOf(prefix + '/') === 0) return href.substring(prefix.length);
    }
    return href;
  }

  function rewriteHref(href, currentLang) {
    if (!href || href.charAt(0) !== '/') return href;
    if (SWITCHER_PATHS[href]) return href;
    if (!currentLang) return href;

    var stripped = stripLangPrefix(href);
    if (stripped === '/') return '/' + currentLang + '/';
    return '/' + currentLang + stripped;
  }

  function rewriteNavbar() {
    var nav = document.getElementById('navbar');
    if (!nav) return;
    var lang = detectLang();
    var links = nav.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      var next = rewriteHref(href, lang);
      if (next !== href) links[i].setAttribute('href', next);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rewriteNavbar);
  } else {
    rewriteNavbar();
  }
})();
