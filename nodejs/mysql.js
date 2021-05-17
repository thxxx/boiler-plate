//mysql 모듈을 mysql이라는 변수로 사용하겠다.
var mysql = require('mysql');
//mysql의 메소드 creaConnection 사용 객체 전달
var connection = mysql.createConnection({
    host: 'localhost', //데이터 베이스 서버가 어떤 서버에 있는지. 노드와 같은 서버면 로컬호스트
    user: 'root', // -uroot
    password: 'dataghwls159@', // -p 'password'
    database: 'first' // 내가 사용할 데이터베이스 use first
});
// 앞으로 connection객체 사용해서 connect로 접속
connection.connect();
// query!
// 첫번째 인자로 sql 코드를 주고, 두번째 인자로 해당 코드 실행 후 
// 실행될 콜백함수를 전달해준다.
connection.query('SELECT * FROM topic', function(error, results, fields) {
    if (error) {
        console.log("error is ", error);
    }
    console.log('The solution is: ', results);
});

connection.end();