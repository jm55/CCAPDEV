console.log("script2.js loaded!");

function CheckInput(input){
    var min = parseInt("0000", 16), max = parseInt("FFFFFF",16);
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

function setConfiguration(){
    var body = document.getElementById("body");
    var fontList = [["", "Poppins"],
                    ["Default", "Times New Roman"],
                    ["Poppins", "Poppins"],
                    ["Sans-Serif", "sans-serif"]
                    ]
    var font = document.getElementById("font-selection").value;
    for(f of fontList){
        if(f[0] === font)
            body.style.fontFamily = f[1];
    }

    var bgcolor = document.getElementById("bg-color").value;

    if(bgcolor.charAt(0) === "#")
        bgcolor = CheckInput(bgcolor.substring(1, bgcolor.length));
    if(bgcolor !== null){
        if(parseInt(bgcolor,16) <= parseInt("555555",16)){
            alertsound.currentTime = 0;
            alertsound.play();
            alert("bg value will be limited to #555555");
            bgcolor = "555555";
        }
        bgcolor = "#" + bgcolor;
        document.getElementById("body").style.backgroundColor = bgcolor;
    }
}

function setDefaults(){
    document.getElementById("body").style.color = "black";
    document.getElementById("body").style.fontFamily = "Poppins";
    document.getElementById("body").style.backgroundColor = "whitesmoke";
}