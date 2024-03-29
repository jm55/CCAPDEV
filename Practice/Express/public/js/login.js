console.log("login.js loaded!");
alert("====Test Credentials====\nUsername: dlsu\nPassword: manila");

var sampleKeys = [{"username":"dlsu","password":"manila"},
                  {"username":"leni","password":"robredo"}];

/**"Main" */
$(document).ready(()=>{
    console.log("jquery.js");
    console.log("sampleKeys for login: \n");
    console.log(sampleKeys);

    $("#signup-btn").click(()=>{
        window.location.href = "/signup";
    });

    $("#login-btn").click((e)=>{
        e.preventDefault();
        login();
    });
    $("#password").keyup((e)=>{
        e.preventDefault();
        if(e.key === "Enter")
            login();
    });
    $("#username").keyup((e)=>{
        e.preventDefault();
        if(e.key === "Enter")
            login();
    });
});

/**
 * Process entire login process
 * @returns Null if user credentials are invalid, redirects user to home otherwise.
 */
function login(){
    let formData = new FormData(document.forms.loginform)

    for (let f of formData){
        $("#" + f[0]).css("background-color", "rgba(255,255,255,30%)");
    }

    c = [];
    for(let f of formData)
        if(f[1].length === 0)
            $("#" + f[0]).css("background-color", "var(--warning-light)");
        else
            c.push(f[1]);

    //counts empty inputs
    let counter = 0;
    for(let x of formData){
        if(x[1] == ""){
            counter++;
        }
    }

    if(counter === 0){
        //PROCESS FOR PROPER LOGGING IN OF USER
        if(sampleAuth(c[0], c[1]))
            window.location.href = "../html/home.html";
        else{
            for(let f of formData){
                $("#" + f[0]).css("background-color", "var(--warning-light)");
            }
            errMessage("login","Authentication Failed");
        }
    }
    else if(counter === 2){
        errMessage("login", "Username and password are missing.")
    }
    else{
        if($("#username").val() == ""){
            errMessage("login", "Username is missing.");
        }
        else{
            errMessage("login", "Password is missing.");
        }
    }
    
}

/**
 * Sample Authentication Procedure
 * Should follow: PARSING, HASHING, ACCEPTANCE
 * @param {string} uname 
 * @param {string} pwrd 
 * @returns True if accepted, false if otherwise
 */
function sampleAuth(uname, pwrd){
    pwrd = hash(pwrd);
    
    var sampleHashes = [{"username":"dlsu","password":"237392540"},{"username":"leni","password":"98866205"}]; //LINKED TO SAMPLEKEYS

    for(h of sampleHashes)
        if(h["username"] == uname && h["password"] == pwrd)
            return true;

    return false;
}



/**
 * Simple Hash Function (for emulation purposes)
 * Reference: https://gist.github.com/iperelivskiy/4110988
 * @param {string} s String to be hashed
 * @returns Numeric hash string equivalent of s
 */
 function hash(s) {
    /* Simple hash function. */
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
}

/**
 * Prints err message on console
 * Use for silent invalid input messages
 * @param {string} functionName Name of function that called this. Don't include '()'
 * @param {string} msg Details of error
 */
 function errMessage(functionName, msg){
    $("#errorText").text("* " + msg);
    console.error(functionName + "(): ", msg);
}