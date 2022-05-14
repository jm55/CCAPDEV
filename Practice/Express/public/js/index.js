console.log("index.js");

$(document).ready(()=>{
    console.log("jquery connected!");

    $("#share").click((e)=>{
        e.preventDefault();
        console.log("share member");
    });
});