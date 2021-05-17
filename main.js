var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var db = require('./lib/db');
var topic = require('./lib/topic');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        if (queryData.id === undefined) {
            topic.home();
        } else {
            db.query(`SELECT * FROM topic`, function(error, topics) {
                if (error) {
                    throw error;
                }
                // 상세보기 눌렀을 때 거기랑 연관되는 작성자의 정보랑 맞춰서 가져오기
                db.query(`SELECT * FROM topic LEFT JOIN autohr ON topic.author_id=author.id 
                WHERE topic.id=?`, [queryData.id], function(error2, topic) { //[quetData.id] 를 뒤로 빼서 인자로 전달한 이유는 데이터베이스를 보호하기 위해서.
                    if (error2) {
                        throw error2;
                    }
                    console.log(topic); // 합쳐진 정보가 topic에 담기는 건가?
                    var title = topic[0].title;
                    var description = topic[0].description;
                    var list = template.list(topics);
                    var html = template.HTML(title, list,
                        `<h2>${title}</h2>${description}
                        <p< by ${topic[0].name} </p>
                        `, // 한번에 토픽에 합쳐진 테이블이 되는거구나
                        ` <a href="/create">create</a>
                        <a href="/update?id=${queryData.id}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${queryData.id}">
                            <input type="submit" value="delete">
                        </form>`
                    );
                    response.writeHead(200);
                    response.end(html);
                })
            });
        }
    } else if (pathname === '/create') {
        db.query(`SELECT * FROM topic`, function(error, topics) {
            db.query(`SELECT * FROM topic`, function(error, topics) {
                var title = 'Create';
                var description = 'Create';
                var list = template.list(topics);
                var html = template.HTML(title, list, // create_process 에 post로 전달된다.
                    `<form action="/create_process" method="post"> 
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                  <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    ${template.authorSelect(authors, topic[0].author_id)}
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>`,
                    `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(html);
            })
        });
    } else if (pathname === '/create_process') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`INSERT INTO topic (title,description, created, author_id) 
            VALUES (?, ?, NOW(), ?);`, [post.title, post.description, post.author], // template의 name과 일치하게
                function(error3, result) {
                    if (error3) {
                        throw error3;
                    }
                    response.writeHead(302, { Location: `/?id=${result.insertId}` }); // 추가된 행에 대한 id값으로 바로 리다이렉션해준다.
                    response.end();
                })
        });
    } else if (pathname === '/update') {
        db.query(`SELECT * FROM topic`, (error, topics) => {
            if (error) {
                throw error;
            }
            //fs.readdir('./data', function(error, filelist) {
            db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], (err2, topic) => {
                if (err2) {
                    throw err2;
                }
                //fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
                var list = template.list(filelist);
                var html = template.HTML(topic[0].title, list,
                    `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
              <p>
                <textarea name="description" placeholder="description">${topic[0].description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
                    `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathname === '/update_process') { // 수정버튼을 눌렀을 때 데이터가 넘어온다.
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            fs.rename(`data/${id}`, `data/${title}`, function(error) {
                fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                })
            });

            db.query(`UPDATE topic SET title=?, decription=?, author_id=? WHERE id=?`, [post.title, post.description, post.author, post.id], (error, result) => {
                response.writeHead(302, { Location: `/?id=${title}` });
                response.end();
            })
        });
    } else if (pathname === '/delete_process') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, function(error) {
                response.writeHead(302, { Location: `/` });
                response.end();
            })
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);