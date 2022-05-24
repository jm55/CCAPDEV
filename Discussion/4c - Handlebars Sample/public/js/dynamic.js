console.log("dynamic.js");
var likes = $("p").children();

$(document).ready((e)=>{
    console.log("JQuery Connected!");
});

$(".layoutBody").ready((e)=>{
    //renderLike();
});

//Pre-load likes
function renderLike(){
    const posts = $(".layoutBody").children(".posts");
    for(var i = 0; i < posts.length; i++){
        var like = posts.children(".like")[i];
        var likeVal = like.innerHTML.substring(like.innerHTML.lastIndexOf(':')+2);
    }
}


function pluralInator(word, val){
    if(val > 1)
        return word + "s";
    else
        return word;
}

function updateLike(id){
    const like = document.getElementById("like" + id);
    const likeBtn = document.getElementById("likeBtn" + id);
    var likeStr = like.innerHTML;
    console.log(likeStr);
    likeStr = likeStr.substring(likeStr.lastIndexOf(':')+2);
    var likeVal = Number(likeStr);
    //Check if button is "Liked" or "Like"
    if(likeBtn.innerHTML == "Like"){
        likeVal = likeVal + 1;
        likeBtn.innerHTML = "Liked";
    }
    else{
        likeVal = likeVal - 1;
        likeBtn.innerHTML = "Like";
    }
    //Update on screen value
    like.innerHTML = pluralInator("Like", likeVal) + ": " + String(likeVal);

    //Update server
    var list = {};
    list["id"] = id;
    list["like"] = likeVal;
    const jsonLike = JSON.stringify(list);
    console.log(jsonLike);
    fetch("/forms/like", {
        method: "PUT",
        body: jsonLike,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log("awaiting response...");
        if (res.status >= 200 && res.status < 300) {// SUCCESS
            location.reload();
        } else {// ERROR
            console.log("response error: " + res.status);
        }
    }).catch((error) => {
        console.error(error);
    });
    console.log("like completed!");
}

function submitComment(id){
    var commentField = document.getElementById('commentField' + id);
    var comment = String($(commentField).val());
}

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