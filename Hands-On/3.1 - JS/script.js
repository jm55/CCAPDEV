$(document).ready(()=>{
    console.log("jQuery Ready!");
    $("#submit").click((e)=>{
        e.preventDefault();
        checkInput();
    });
    $("#clear").click((e)=>{
        e.preventDefault();
        clearInput();
    })
    $("#registerform input").keyup(()=>{
        updateColor();
    });
});

function clearInput(){
    console.log("clearInput()");
    for(f of new FormData(document.forms.registerform))
        document.getElementById(f[0]).value = "";
}

submitClicked = false;

function changeColor(id, color){
    document.getElementById(id).style.backgroundColor = color;
}

function updateColor(){
    console.log("updateColor()");
    var empties = [];
    if(submitClicked){
        for(f of new FormData(document.forms.registerform)){
            if(f[1] == ""){
                changeColor(f[0], "var(--accent)");
                empties.push(f[0]);
            }
            else
            changeColor(f[0], "white");
        }
    }
    //console.log(empties);
    return empties;
}

function collectForm(){
    var form = new FormData(document.forms.registerform);
    output = [];
    for(f of form)
        output.push([f[0],f[1]])
    return output;
}

function checkInput(){
    console.log("checkInput()");
    submitClicked = true;
    empties = updateColor();

    //Check empties
    if(empties.length > 0)
        console.log("Empty inputs: ", empties);
    else{ //'validate' password
        collection = collectForm("registerform");
        if($("#pass1").val()=== $("#pass2").val()){
            fname = $("#fname").val();
            lname = $("#lname").val();
            alert("Hello " + fname + " " + lname + "!");
            redirect();
        }else{
            alert("Password mismatch, please try again.");
        }
    }
}

function redirect(){
    window.location.href = "https://google.com"
}