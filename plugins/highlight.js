const hljs = require("highlight.js/lib/highlight.js");
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))

module.exports = hljs