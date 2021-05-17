//Signup Form

function form2() {

    var user_name = document.forms["signupform"]["name"].value;
    var user_id = document.forms["signupform"]["post_id"].value;
    var user_nickname = document.forms["signupform"]["nickname"].value;
    // var user_sex = document.forms["signupform"].country.option[signupform.country.selectedIndex].text;
    //var user_country = document.forms["signupform"]["country"].value;
    //var user_birth = document.forms["signupform"]["birth"].value;
    var signup_pwd = document.forms["signupform"]["pw"].value;
    //var signup_pwd_again = document.forms["signupform"]["pw_check"].value;

    var body = {
        user_name: user_name,
        user_id: user_id,
        user_nickname: user_nickname,

        //user_birth: user_birth,
        signup_pwd: signup_pwd
    };

    console.log(body);

    console.log("asdow");
    // var repwd = document.forms["signupform"]["repwd"].value;
    /*

    if (signup_pwd != signup_pwd_again) {
        document.getElementById("errorbox").innerHTML = "Password don't match";
        setTimeout(function() {
            var errorbox = document.getElementById("errorbox");
            errorbox.innerHTML = "";
        }, 5000);
        return false;
    } else if (user_name == "" || user_name == null || user_nickname == "" || user_nickname == null || user_id == "" || user_id == null || user_birth == "" || user_birth == null) {
        alert("작성을 완료해주세요");
        return false;
    } else {
        db.query(`INSERT INTO User (User_name, User_country, User_nikcname, User_id, User_passwod, User_sex, User_birth) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`, []);
        axios.post("/test", body).then((res) => {
            if (res == "success") {
                alert("회원가입을 성공했습니다");
                document.location.href("/index.html");
            } else {
                alert("회원가입을 성공했습니다");
            }
        }).catch(error => {
            console.log(error);
            throw new Error(error);
        });
        return true;
    }
        */


    /*
        document.getElementById("errorbox").innerHTML = "Password don't match";
        setTimeout(function() {
            var errorbox = document.getElementById("errorbox");
            errorbox.innerHTML = "";
        }, 5000);
        return false;
        //alert("비밀번호가 다릅니다!");
    } else {
        document.getElementById("errorbox").innerHTML = " you are right! ";
        db.query(`INSERT INTO User (User_name, User_country, User_nikcname, User_id, User_passwod, User_sex, User_birth) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`, []);
        db.query(`SELECT * FROM User;`, (error, user) => {
            if (error) {
                throw error;
            }
            alert("dqw");
        })

    }*/
    return false;
}