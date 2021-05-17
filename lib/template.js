module.exports = {
    HTML: function(title, list, body, control) {
        return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
    },
    list: function(topics) {
        var list = '<ul>';
        var i = 0;
        while (i < topics.length) {
            list = list + `<li><a href="/?id=${topics[i]}">${topics[i]}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    },
    authorSelect: function(authors, author_id) {
        var tag = '';
        var i = 0;
        var selected = '';
        // select 태그에 selected 속성이 있으면 가장 먼저 나오는듯.
        while (i < authors.length) {
            if (author[i].id === author_id) {
                selected = ' selected';
            }
            tag += `<option value="${author[i].id}">${author[i].name}</option>`;
            i++;
        }

        return `

      <!-- select가 뭐지? -->
      <select name="author">
          ${tag}
      </select>
      `
    }
}