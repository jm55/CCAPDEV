const Expense = function(date, category, amount, description){
    this.date = date;
    this.category = category;
    this.amount = amount;
    this.description = description;
}

$(document).ready(()=>{
    $("#submitBtn").click((e)=>{
        e.preventDefault();
        if(validateInputs()){
            var item = gatherInputs();
            var element = createFinanceItem(item); //Append this to: $(".itemsList").append();
            $(".itemsList").append(element);
            addTotal(item.amount);
            inputDefaults();
        }
    });

    $("#filter").on("change",(e)=>{
        resetFilter();
        applyFilter($("#filter").val());
    });

    //console.log("JQuery Ready");
});

function resetFilter(){
    var items = document.getElementsByClassName("itemHeader");
    for (var i=0; i < items.length; i++)
            items[i].parentElement.style="display:block";
}

function applyFilter(filter){
    //Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName & https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement
    ////console.log(document.getElementsByClassName("itemHeader").length);
    var items = document.getElementsByClassName("itemHeader");
    var filterTotal = 0.00;
    if(filter=="All"){
        for (var i=0; i < items.length; i++){
            items[i].parentElement.style="display:block";
            filterTotal += parseFloat(items[i].parentElement.getElementsByClassName("itemBody")[0].getElementsByClassName("itemAmount")[0].innerHTML);
        }
    }else{
        for(var i=0; i < items.length; i++) {
            var itemClass = items[i].classList[1];
            if(itemClass != filter)
                items[i].parentElement.style="display:none";
            if(itemClass == filter){
                filterTotal += parseFloat(items[i].parentElement.getElementsByClassName("itemBody")[0].getElementsByClassName("itemAmount")[0].innerHTML);
            }
        }
    }
    //console.log(filterTotal);
    $("#financesTotal").text(parseFloat(filterTotal).toFixed(2));
}

function addTotal(amount){
    var currTotal = parseFloat($("#financesTotal").text());
    ////console.log("currTotal: " + currTotal + " " + typeof(currTotal));
    currTotal += parseFloat(amount);
    ////console.log("new currTotal: " + currTotal);
    $("#financesTotal").text((currTotal).toFixed(2));
}

function inputDefaults(){
    for(f of new FormData(document.forms.financesForm)){
        if(f[0] == "category")
            $("#" + f[0]).val("Bills");    
        else
            $("#" + f[0]).val("");
    }
    displayError("");
}

function createFinanceItem(expense){
    //console.log(expense);
    
    //spans
    var itemDate = document.createElement("span");
    var itemDescription = document.createElement("span");
    var itemAmount = document.createElement("span");
    var itemCategory = document.createElement("span");

    itemDate.className = "itemDate";
    itemDescription.className = "itemDescription";
    itemAmount.className = "itemAmount";
    itemCategory.className = "itemCategory";

    $(itemDate).text(expense.date);
    $(itemDescription).text(expense.description);
    $(itemAmount).text(expense.amount);
    $(itemCategory).text(expense.category);

    //divs > !.financeItem
    var itemHeader = document.createElement("div");
    var itemBody = document.createElement("div");

    itemHeader.className = "itemHeader " + expense.category;
    itemBody.className = "itemBody";

    itemHeader.append(itemCategory);
    itemBody.append(itemDate,itemDescription,itemAmount);

    //divs > .financeItem
    var financeItem = document.createElement("div");
    financeItem.className = "financeItem";
    financeItem.append(itemHeader, itemBody);
    
    return financeItem;

    /**
        <div class="financeItem">
            <div class="itemHeader Bills"> 
                <span class="itemCategory">Bills</span>
            </div>
            <div class="itemBody">
                <span class="itemDate">2020-03-05</span>
                <span class="itemDescription">Rent Payment for March</span>
                <span class="itemAmount">25550.00</span>
            </div>
        </div>
     */
}

function validateInputs(){
    var validity = true;
    var invalids = 0;
    var flagged = "";
    var formLength = 3; //id:categoy has a default value of Bills which is not strictly empty

    for(f of new FormData(document.forms.financesForm)){
        if(f[1] == ""){
            flagged = f[0];
            invalids++;
        }
    }
    if(invalids > 0)
        validity = false;
    if(invalids > 1)
        flagged = "multiple";
    if(invalids == formLength)
        flagged = "fullblank";
    displayError(selectError(flagged));

    return validity;
}

function displayError(msg){
    document.getElementById("errorText").innerHTML = msg;
}

function selectError(flag){
    var list = ["Date cannot be left unset.",               //0
                 "Description is blank.",                   //1
                 "Amount is blank.",                        //2
                 "Two or more errors occured at a time.",   //3
                 "Multiple input fileds are blank/unset!"]; //4
    if(flag == "date")
        return list[0];
    else if(flag == "desc")
        return list[1];
    else if(flag == "amount")
        return list[2];
    else if(flag == "multiple")
        return list[3];
    else if(flag == "fullblank");
        return list[4]
}

function gatherInputs(){
    //ids/names: date, category, amount, desc
    let date = $("#date").val();
    let category = $("#category").val();
    let amount = parseFloat($("#amount").val()).toFixed(2); //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    let desc = $("#desc").val();
    return new Expense(date,category, amount, desc);
}