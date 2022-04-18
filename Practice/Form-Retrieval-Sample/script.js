console.log("hello doctor...");

const alertsound = new Audio("./PGA1.wav");

function getValueById(elementName){
    return document.getElementById(elementName).value;
}

function submitButton(){
    var fname = getValueById("fname");
    var mname = getValueById("mname");
    var lname = getValueById("lname");

    
    if(fname.length===0 && mname.length===0 && lname.length===0){
        //Sound: https://gomakethings.com/how-to-play-a-sound-with-javascript/
        alertsound.play();
        alert("Invalid name input!");
        return null;
    }

    var formalname = lname + ", " + fname + " " + mname[0] + ".";
    console.log("formalname: " + formalname);

    var age = getValueById("age");
    console.log("age: " + age)

    var uni = getValueById("university");
    console.log("university: " + uni);

    let output = "The student's name is " + formalname + " (" + age + ").<br>University of choice: " + uni;
    console.log(output);

    document.getElementById("output").innerHTML = output;
    
    //Let's add おいしいくなるもえもえきゅんー！
    let oishi = document.createElement("p");
    oishi.id = "oishii";
    let oishi_text = document.createTextNode("おいしいくなるもえもえきゅんー！");
    oishi.appendChild(oishi_text);
    document.getElementsByClassName("output")[0].appendChild(oishi);
}

function clearButton(){
    let out = document.getElementById("output")
    let out2 = document.getElementById("oishii");
    document.getElementsByClassName("output")[0].removeChild(out); //removes output statement
    document.getElementsByClassName("output")[0].removeChild(oishii); //removes oishii kunare

    document.getElementById("fname").value="";
    document.getElementById("mname").value="";
    document.getElementById("lname").value="";
    document.getElementById("age").value="";
    document.getElementById("university").value="";

    console.log("clear clicked!");
}