const Obj = function(id, likes){
    this.id = id;
    this.likes = likes;
    this.idString = "obj-"+id;
}

var objNumber = 0;
var objects = [];

$(document).ready(()=>{
    $("#add-obj").click(()=>{
        console.log("Add Object");
        placeObject(buildObject());
        //addObjectListener(objects[objects.length-1].idString);
    });

    console.log("Dynamic Event Handlers Ready!");
});

function addObjectListener(idString){
    document.getElementById(idString).addEventListener("click", function(e){
        if(e.target && e.target.matches("button.like"))
            console.log(idString + "clicked");
    });
}

function placeObject(obj){
    document.getElementById("container").append(obj);
}

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
    $(btn).addClass("like");
    $(btn).text("Click me (" + id + ")");
    
    //create parent object (card)
    var object = document.createElement("div");
    var objID = "obj-"+id;
    $(object).attr("id",objID);
    $(object).addClass("card");
    
    //append subcomponents to object
    $(object).append(identifier);
    $(object).append(counter);
    $(object).append(btn);

    //build object data
    objects.push(new Obj(id,0));

    //return finish page element
    return object; 
}