const alertsound = new Audio("./PGA1.wav");
const advisesound = new Audio("./EEW1.wav");

$(document).ready(()=>{
    console.log("jquery.js via jquery");
    
    $("#row_count").text("0 Rows");
    $("#bioCounter").text("0/255");

    $("#add-row-table").click(()=>{
        addRow();
    });

    $("#delete-row-table").click(()=>{
        if(deleteRow())
            playSound(advisesound);
    });

    $("#collect-table-data").click(()=>{
        collectTableData();
    });

    $("#set-config").click(()=>{
        setConfig();
    });

    $("#font-selection").on("change",()=>{
        console.log("#font-selection select")
        $("body").css("font-family",$("#font-selection").val());
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

const list = ["fname","mname","lname","age","university","bio"]; //form element id list
var row_count = 0;

function collectTableData(){
    if(row_count === 0)
        return null;
    var collection = [];
    for(let r = 0; r < row_count; r++){
        let instance = []; //resets the instance for the next input
        instance[0] = $("#label_input_" + r).val();
        instance[1] = $("#link_input_" + r).val();
        collection.push(instance);
    }
    deleteAllRow();
    console.log(collection);
    alert("Check console for data collection");
}

function updateRowCounter(){
    $("#row_count").text(row_count + " Rows");
}

function deleteAllRow(){
    for(let r = row_count; r >= 0; r--)
        deleteRow();
}

function deleteRow(){
    if(row_count===0)
        return false;
    row_count = row_count - 1;
    $("#row_" + row_count).remove();
    updateRowCounter();
    return true;
}

function addRow(){
    var label_input = document.createElement("input");
    var link_input = document.createElement("input");
	var link_discount = document.createElement("input");
	var link_description = document.createElement("input");
	var link_image = document.createElement("input");
    
	label_input.id = "label_input_" + row_count;
    link_input.id = "link_input_" + row_count;
    
	label_input.type = "text";
    link_input.type = "text";
	link_discount.type = "text";
	link_description.type = "text";
	link_image.type = "text";

    var label_td = document.createElement("td");
    var link_td = document.createElement("td");
	var discount_td = document.createElement("td");
	var description_td = document.createElement("td");
	var image_td = document.createElement("td");	
	
	label_td.appendChild(label_input);
    link_td.appendChild(link_input);
	discount_td.appendChild(link_discount);
	description_td.appendChild(link_description);
	image_td.appendChild(link_image);
	

    var tr = document.createElement("tr");
    tr.id = "row_" + row_count;
    tr.appendChild(label_td);
    tr.appendChild(link_td);
	tr.appendChild(discount_td);
	tr.appendChild(description_td);
	tr.appendChild(image_td);

    $("#table").append(tr);

    row_count = row_count + 1;
    updateRowCounter();
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();    
}

function updateBio(){
    let c = $("#bio").val().length;
    if((255-c) < 0){
        playSound(alertsound);
        alert("Number of characters for bio has exceeded its limit.");
    }
    console.log($("#bioCounter").text());
    $("#bioCounter").text(c + "/" + 255);
}

function clearForm(){
    for(l of list)
        $("#" + l).val("");
}

function submitForm(){
    let input = [];
    for(l of list){
        let val = $("#" + l).val();
        input.push(val);
    }
    console.log(input);
}

function setConfig(){
   let f = $("#font-selection").val();
    if(f === "")
        f = "Poppins";
    $("body").css("font-family",f);

    let c = "#" + CheckColorHEXInput($("#bg-color").val().substring(1),"000000","FFFFFF");
    $("body").css("background-color",c);
}

function setDefaults(){
    //input defaults
    $("#font-selection").val("");
    $("#bg-color").val("");
    //page defaults
    $("#bg-color").val("");
    $("body").css("background-color","whitesmoke");
    $("body").css("font-family","Poppins");
}

function CheckColorHEXInput(input, minVal, maxVal){
    var min = parseInt(minVal, 16), max = parseInt(maxVal,16);
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
