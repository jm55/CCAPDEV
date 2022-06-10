var appendFirst = false;


// @ts-ignore
document.addEventListener("DOMContentLoaded", function (event) {
    const refnoInput = document.querySelector('#refno');
    refnoInput.addEventListener('keyup', function () {
        // @ts-ignore
        var refno = document.getElementById('refno').value;
        console.log('RefNo Keyup: ' + refno);
        if(refno != ''){
            var formdata = {};
            formdata['refno'] = refno;
            fetch('/getCheckRefNo',{
                method: "GET",
                headers: {
                    data: JSON.stringify(formdata),   
                }
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                if(data['exists']){
                    document.getElementById('refno').style.backgroundColor = 'red';
                    document.getElementById('error').textContent = "Reference number already in the database.";
                    // @ts-ignore
                    document.getElementById('submit').disabled = true;
                }else{
                    document.getElementById('refno').style.backgroundColor = '#E3E3E3';
                    document.getElementById('error').textContent = "";
                    // @ts-ignore
                    document.getElementById('submit').disabled = false;
                }
            }).catch((err)=>{
                //Notify error
                console.error('Error occured while adding transaction: ' + err);
            });
        }else{
            document.getElementById('refno').style.backgroundColor = '#E3E3E3';
            document.getElementById('error').textContent = "";
            // @ts-ignore
            document.getElementById('submit').disabled = false;
        }
    });

    const submitBtn = document.querySelector('#submit');
    submitBtn.addEventListener('click', function () {
        var formdata = {};
        // @ts-ignore
        formdata['name'] = document.getElementById('name').value;
        // @ts-ignore
        formdata['refno'] = Number(document.getElementById('refno').value);
        // @ts-ignore
        formdata['amount'] = Number(Number(document.getElementById('amount').value).toFixed(2)); 
        console.log(formdata);

        if(formdata['name'] == '' || formdata['refno'] == 0 || formdata['amount'] == 0){
            console.log('Incomplete data');
            document.getElementById('error').textContent = "Fill up all fields.";
        }else{
            document.getElementById('error').textContent = "";
            fetch('/add',{
                method: "GET",
                headers: {
                    data: JSON.stringify(formdata),   
                }
            }).then((res)=>{
                if(res.status >= 200 && res.status < 300)
                    return res.json();
                else    
                    console.error(res.status + ': ' + res.statusText);
            }).then((data)=>{
                console.log('Adding transaction successful!');
                console.log(data);
                // @ts-ignore
                var newCard = buildCard(data);
                var listElement = document.getElementById('cards');
                if(appendFirst){
                    listElement.prepend(newCard);
                }else{
                    listElement.append(newCard);
                }
                
                // @ts-ignore
                document.getElementById('name').value = "";
                // @ts-ignore
                document.getElementById('refno').value = "";
                // @ts-ignore
                document.getElementById('amount').value = "";
            }).catch((err)=>{

                console.error('Error occured while adding transaction: ' + err);
            });
        }
    });

    const cardsDiv = document.querySelector('#cards');
    cardsDiv.addEventListener('click', function (e) {
        if (e.target instanceof Element && e.target.matches('.remove')) {
            var divparent = e.target.parentElement.parentElement; //div cards
            var parent = e.target.parentElement; //card pointed by e
            var refno = parent.children[1].children[1].textContent;
            var formdata = {};
            formdata['refno'] = refno;
            fetch('/delete',{
                method:'GET',
                headers: {
                    data: JSON.stringify({refno:refno}),   
                }
            }).then(()=>{
                divparent.removeChild(parent);
            }).catch((error)=>{
                console.error('Error deleting transaction entry: ' + error);
            })
        }
    }, true);
});

/**
 * Builds and returns a .card element with 
 * the corresponding data provided by the json parameter.
 * @param {JSON} json JSON object that contains the details about the transaction. It follows the Transaction Mongoose model.
 */
function buildCard(json){
    /**
     * <div class="card">
     *      <img src="/images/icon.webp" class="icon">
     *      <div class="info">
     *          <p class="text"> {{name this}} </p>
     *          <p class="text"> {{refno this}} </p>
     *          <p class="text"> Php {{amount this}} </p>
     *      </div>
     *      <button class="remove"> X </button>
     * </div>
     */
    //Divs
    var card = document.createElement('div');
    var img = document.createElement('img');
    var info = document.createElement('div');

    card.className = 'card';
    img.className = 'icon';
    info.className = 'info';

    img.src = '/images/icon.webp';

    //Ps
    var vals = [json['name'], json['refno'], json['amount']];
    var p = [];
    for(var i = 0;  i < 3; i++){
        p.push(document.createElement('p'));
        p[i].className = 'text';
        p[i].textContent = vals[i];
        info.append(p[i]);
    }

    //Button
    var x = document.createElement('button');
    x.className = 'remove';

    card.append(img);
    card.append(info);
    card.append(x);

    return card;
}