// 选网页语言，规则跟 App 一样：浏览器首选语言是中文就显示中文，否则显示英文。
// 网址里带 ?lang=zh / ?lang=en，或者点了顶上的切换按钮，就以它为准（记在这台设备上）。
(function () {
  var KEY = 'onescroll-lang';

  function choose() {
    var fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl === 'zh' || fromUrl === 'en') return fromUrl;
    try {
      var saved = window.localStorage.getItem(KEY);
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (e) {}
    var first = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return first.toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function apply(lang) {
    var root = document.documentElement;
    root.setAttribute('data-lang', lang);
    root.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
  }

  apply(choose());

  window.setLang = function (lang) {
    try {
      window.localStorage.setItem(KEY, lang);
    } catch (e) {}
    apply(lang);
  };
})();
