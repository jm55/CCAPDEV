$(document).ready(()=>{
    console.log("jquery.js via jquery");

    $("#bioCounter").text("0/255");

    $("#set-config").click(()=>{
        setConfig();
    });

    $("#defaults").click(()=>{
        setDefaults();
    });

    $("#submit").click(()=>{
        submitForm();
    });

    $("#clear").click(()=>{
        clearForm();
    });

    $("#bio").keyup(()=>{
        updateBio();
    })
});

const list = ["fname","mname","lname","age","university"]; //form element id list

function updateBio(){
    console.log("#bio keypress");
    let c = $("#bio").val().length;
    $("#bioCounter").text(c + "/" + 255);
}

function clearForm(){
    for(l of list)
        $("#" + l).val("");
}

function submitForm(){
    console.log("#submit clicked");
    
    let input = [];
    for(l of list){
        let val = $("#" + l).val();
        input.push(val);
    }
    console.log(input);
}

function setConfig(){
    console.log("#set-config clicked");

    let f = $("#font-selection").val();
    if(f === "")
        f = "Poppins";
    $("body").css("font-family",f);

    let c = "#" + CheckColorHEXInput($("#bg-color").val().substring(1));
    $("body").css("background-color",c);
}

function setDefaults(){
    console.log("#defaults clicked");
    //input defaults
    $("#font-selection").val("");
    $("#bg-color").val("");
    //page defaults
    $("#bg-color").val("");
    $("body").css("background-color","whitesmoke");
    $("body").css("font-family","Poppins");
}

function CheckColorHEXInput(input){
    var min = parseInt("000000", 16), max = parseInt("FFFFFF",16);
    /**
     * Will resort to Naive Approach 
     * since the initial implementation
     * of Regex does not work properly on all cases. 
     * 
     * If there are better solutions that does the same thing
     * albeit faster, please do add.
     * 
     * Simply check if it only contains the characters: ABCDEF0123456789 Non-Case Sensitive
     */
    var inputCaps = input.toUpperCase(); //just to simplify conditions (will only check ascii values of uppercase letters and numbers)
    if(inputCaps.length === 0)
        return null;
    inputCaps = inputCaps.replace(/\s/gm,""); //remove any whitespaces
    if(inputCaps.length === 4 && (inputCaps==="U+0X" || inputCaps === "0XU+")) //check if the only contents of input are U+0x or 0xU+
        return null;
    if(inputCaps.length>=4) 
        if(inputCaps.substring(0,4)===("U+0X") || inputCaps.substring(0,4)===("0XU+")) //remove prefixes U+0x and 0xU+
            inputCaps = inputCaps.substring(4,input.length);
    else if(inputCaps.substring(0,2)===("U+") || inputCaps.substring(0,2)===("0X")) //length is less than 4, remove prefixes U+ and 0x
        inputCaps = inputCaps.substring(2, inputCaps.length);

    if(inputCaps.length === 0) //if trimming resulted to empty string
        return null;

    for(var i = 0; i < inputCaps.length; i++) //65-70 = A-F & 48-57 = 0-9
        if((inputCaps.charCodeAt(i) < 48 || inputCaps.charCodeAt(i) > 57) && (inputCaps.charCodeAt(i) < 65 || inputCaps.charCodeAt(i) > 70))
            return null;

    if(parseInt(inputCaps,16) < min || parseInt(inputCaps, 16) > max) //equivalent hex value exceeds valid range of 0x0 and 0x10FFFFF
        return null;
    
    return inputCaps;
}
