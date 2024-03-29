document.addEventListener("DOMContentLoaded", function (event) {
    const postBtn = document.getElementById("postBtn");
    postBtn.onclick = (e) => {
        console.log('click');
        const formData = new FormData(document.getElementById("postForm"));
        console.log(formData.getAll);
        var reqBody = {}
        for(var data of formData) {  
            reqBody[data[0]] = data[1];
        }
        reqBody['like'] = 0;
        reqBody['epoch'] = new Date().getTime();
        reqBody['author'] = 
        console.log(reqBody);
        const myJSONbody = JSON.stringify(reqBody);
        fetch("/forms/add", {
            method: "POST",
            body: myJSONbody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                // SUCCESS
                location.reload();
            } else {
                // ERROR
                console.log("response error: " + res.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    };
});