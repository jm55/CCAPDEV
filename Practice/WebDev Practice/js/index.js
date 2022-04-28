function displayCredentials(){
    var uname = document.getElementById("username-input").value;
    var pword = document.getElementById("password-input").value;
    console.log(uname+'\n'+pword);
    document.getElementById('username-receive').innerHTML = uname;
    document.getElementById('password-receive').innerHTML = pword;
}