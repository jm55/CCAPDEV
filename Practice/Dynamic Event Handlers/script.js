const Obj = function(id, likes){
    this.id = id;
    this.likes = likes;
    this.idString = "obj-"+id;
}

var objNumber = 0;
var objects = [];

$(document).ready(()=>{
    $("#add-obj").click(()=>{
        placeObject(buildObject());
        console.log(objects);
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
    //get id number and update id-counter
    var id = this.objNumber;
    this.objNumber++;

    var identifier = document.createElement("p");
    var counter = document.createElement("p");
    var btn = document.createElement("button");
    var deleteBtn = document.createElement("button");
    var object = document.createElement("div");
    var objID = "obj-"+id;

    {
        $(identifier).attr("id","identifier-"+id);
        $(identifier).text("Identifier: " + id);
        $(counter).attr("id","counter-"+id);
        $(counter).text(0 + "");
        $(btn).attr("id","identifier-"+id);
        $(btn).addClass("like");
        $(btn).text("Click me (" + id + ")");
        $(deleteBtn).attr("id","del_identifier-"+id);
        $(deleteBtn).addClass("delete");
        $(deleteBtn).text("Delete me (" + id + ")");
        $(object).attr("id",objID);
        $(object).addClass("card");
        $(object).append(identifier);
        $(object).append(counter);
        $(object).append(btn);
        $(object).append(deleteBtn);
    }

    btn.addEventListener("click",function(e){
        var thisID = object.id.substring(4);
        var counter_val = parseInt($(counter).text());
        counter_val++;
        $(counter).text(counter_val);
        var index = searchIndex(thisID);
        objects[index].likes = counter_val;
        console.log(objects);
    });

    deleteBtn.addEventListener("click", function(e){
        var thisID = object.id.substring(4);
        console.log("thisID = " + thisID);
        for(var o = 0; o < objects.length; o++){
            console.log(objects[o]);
            if(objects[o].id == thisID)
                objects.splice(o);
        }
        console.log($(this).parent()[0].remove());
    });

    //build object data
    objects.push(new Obj(id,0));

    //return finish page element
    return object; 
}

function searchIndex(thisID){
    for(var o = 0; o < objects.length; o++){
        if(thisID == objects[o].id)
            return o;
    }
    return -1;
}