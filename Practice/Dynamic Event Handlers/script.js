var objNumber = 0;

$(document).ready(()=>{
    $("#add-obj").click(()=>{
        console.log("Add Object");
        var obj = buildObject();
        document.getElementById("container").append(obj);
    });

    $("button").click((e)=>{
        e.preventDefault();
        console.log("button clicked");
    });

    console.log("Dynamic Event Handlers Ready!");
});

function buildObject(){
    console.log("buildObject(): " + objNumber);

    //get id number and update id-counter
    var id = this.objNumber;
    this.objNumber++;

    //build identifier-text
    var identifier = document.createElement("p");
    $(identifier).attr("id","identifier-"+id);
    $(identifier).text("Identifier: " + id);

    //build counter
    var counter = document.createElement("p");
    $(counter).attr("id","counter-"+id);
    $(counter).text(0 + "");

    //build button
    var btn = document.createElement("button");
    $(btn).attr("id","identifier-"+id);
    $(btn).text("Click me (" + id + ")");
    
    //create parent object (card)
    var object = document.createElement("div");
    $(object).attr("id","obj-"+id);
    $(object).addClass("card");
    

    $(object).append(identifier);
    $(object).append(counter);
    $(object).append(btn);

    //return finish page element
    return object; 
}