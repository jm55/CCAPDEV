console.log("script.js loaded!s");
const alertsound = new Audio("./PGA1.wav");

//abstracting a long function statement into a simpler one
function getValueById(elementName){
    return document.getElementById(elementName).value;
}

//onmouseover();
function titleHover(){
    console.log("Hovering at title");
    document.getElementById("title").style = "color: green";
}

//onmouseaway();
function titleAway(){
    console.log("Away at title");
    document.getElementById("title").style = "color: black";
}

//onclick();
function submitButton(){
    var fname = getValueById("fname");
    var mname = getValueById("mname");
    var lname = getValueById("lname");
    var age = Number(getValueById("age"));
    var uni = getValueById("university");

    //Sound: https://gomakethings.com/how-to-play-a-sound-with-javascript/
    if(fname.length===0 && mname.length===0 && lname.length===0){
        alertsound.currentTime = 0; //Recommendation: https://stackoverflow.com/a/17636398
        alertsound.play();
        alert("Invalid name input!");
        return null;
    }else if((age%1) !== 0){ //Suggestion: https://stackoverflow.com/a/35068845
        alertsound.currentTime = 0;
        alertsound.play();
        alert("Invalid age, try typing a number!");
        return null;
    }

    var formalname = lname + ", " + fname + " " + mname[0] + ".";
    
    let output = "The student's name is " + formalname + " (" + age + ").<br>University of choice: " + uni;
    document.getElementById("output").innerHTML = output;
    console.log(output);
    
    var color = "black"; //default color
    var uniList = [["DLSU","green"], ["ADMU","blue"], ["UP","maroon"], ["UST","yellow"]];
    for(c of uniList){
        if(c[0]===uni) //color if specific univeristy has been selected;
            color = c[1];
    }

    //Let's add おいしいくなるもえもえきゅんー!;
    //Tag Specification: <p class="oishii" id="oishii" style="color=color">[CONTENT]</p>
    let oishi = document.createElement("p");
    oishi.className = "oishii";
    oishi.id = "oishii";
    oishi.style.color = color;
    let oishi_text = document.createTextNode("おいしいくなるもえもえきゅんー！");
    oishi.appendChild(oishi_text);
    document.getElementsByClassName("output")[0].appendChild(oishi);
}

function clearButton(){
    /*
    Former implementation:  Removes the element itself which 
                            means it could not be reused, thus 
                            it is more proper to set the 
                            innerHTML as empty string instead.
    Code:
        let out = document.getElementById("output");
        document.getElementsByClassName("output")[0].removeChild(out);
    */
    let out = document.getElementById("output");
    out.innerHTML = "";

    let out2 = document.getElementsByClassName("oishii");
    while(out2.length > 0){ //remove all oishii kunare instances
        document.getElementsByClassName("output")[0].removeChild(out2[0]);
    }

    //clear form input data
    let elemIds = ["fname", "mname", "lname", "age", "university"];
    for(e of elemIds){
        document.getElementById(e).value="";
    }
    

    console.log("clear clicked!");
}