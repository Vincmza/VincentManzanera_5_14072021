function getDataFromLocalStorage(key){ /*Get local storage data to parse them*/

    const data=localStorage.getItem(key);

    if(data){

        return JSON.parse(data)

    }
    return null
}

const productArray = []; /*local storage data storage*/

for (let i =0; i<window.localStorage.length; i++){ /*Run local storage data and store them in productArray*/

    productArray.push(getDataFromLocalStorage(window.localStorage.key(i)));

}

const orderContainer = document.getElementById('order_container');

function displayOrder(productArray, orderContainer){ /*Display what customer chose from product_page*/

    for(let i = 0; i<productArray.length; i++){

        orderContainer.innerHTML += `<div class="card mb-4">
        <div class="row g-0">
          <div class="col-sm-4">
            <img src="${productArray[i].imageUrl}" class="img-fluid rounded-start basket_img_height" alt="...">
          </div>
          <div class="col-sm-8">
            <div class="card-body product_caption">
              <h3 class="card-title fs-3">${productArray[i].name}</h3>
              <div>
                <p class="basket-font">Modèle : <span class="model">${productArray[i].colors}</span></p>
              </div>
              <div class="d-flex basket_quantity_responsive">
                <div class="me-3">
                    <p class="basket-font">Quantité : <span class="teddy_quantity">${productArray[i].quantity}</span></p>
                </div> 
                <label for="quantity_change" class="basket_input_position">
                    <input class="w-50 basket-font quantity_changer" type="number" min="0" maxlength="2" value="${productArray[i].quantity}">
                </label>
              </div>
              <div>
                <p class="basket-font">Prix unitaire : <span class="teddy_price">${productArray[i].price/100} €</span></p>
              </div>
              <div>
                <p class="basket-font">Prix total : <span class="this_basket_total_price">${productArray[i].quantity*productArray[i].price/100} €</span></p>
              </div>
              
            </div>
          </div>
        </div>
    </div>`
    
    }
}
displayOrder(productArray, orderContainer);

const listInputQuantity = document.querySelectorAll('.quantity_changer'); /*get input value*/

const listQuantityDisplayed = document.querySelectorAll('.teddy_quantity'); /*get quantity displayed in the quantity slot*/

const listTeddyPrice = document.querySelectorAll('.this_basket_total_price'); /*get price for all teddies in relation to 1 teddy model*/

let totalPrice = document.getElementById('total_price');

const removeButton = document.getElementById('remove_button');

/*INPUT QUANTITY AND TOTAL PRICE CHANGE PROCESS */

listInputQuantity.forEach((inputQuantity, i) => {

  inputQuantity.addEventListener('change', function(){

    listQuantityDisplayed[i].innerHTML = this.value;

    let data = parseInt(this.value);

    listTeddyPrice[i].innerHTML = (data*productArray[i].price)/100;

    const keyLocalStorage = window.localStorage.key(i);

    const teddy = JSON.parse(window.localStorage.getItem(keyLocalStorage));

    teddy.quantity = data;

    window.localStorage.setItem(keyLocalStorage, JSON.stringify(teddy));

    displayFinalResult(listTeddyPrice, totalPrice);

  })
  
  /*DATA ERASED FROM BASKET AND LOCAL STORAGE ONCE REMOVE BUTTON CLIKED*/

  removeButton.addEventListener('click', function(){ 
    
    orderContainer.innerHTML = `<h1 class="text-center pb-4">Votre panier est vide désormais</h1>`;
    window.localStorage.clear();
    totalPrice.innerHTML = `<span>0 €</span>`;
  
  })
  
});


/*FINAL RESULT OF ALL BASKETS*/

function displayFinalResult(listTeddyPrice, totalPrice){

  let totalResult = 0;

  for( let i = 0; i<listTeddyPrice.length; i++){

    totalResult += parseInt(listTeddyPrice[i].innerHTML);
  }

  totalPrice.innerHTML = `<span>${totalResult} €</span>`;
  
}

displayFinalResult(listTeddyPrice, totalPrice);

/*GET ID FROM LOCAL STORAGE DATA STORED IN PRODUCT ARRAY*/

const itemIdArray =[];

for (let itemId of productArray){

  let dataItem = itemId._id;

  itemIdArray.push(dataItem);
}

//console.log(itemIdArray);

/*CUSTOMER INFORMATIONS STORED HERE IN ORDER TO POST WITH FETCH*/

const formSubmitButton = document.getElementById('customer_data_submit_button');

const form = document.getElementById('customer_data_form');

/*POST REQUEST IF FORM VALIDATION IS TRUE*/

formSubmitButton.addEventListener('click', function(e){

  e.preventDefault();

  const customerOrderData = {
    contact: {
      firstName: document.getElementById('firstname').value,
      lastName: document.getElementById('lastname').value,
      address: document.getElementById('inputAddress').value + document.getElementById('inputAddress2').value,
      city: document.getElementById('inputCity').value,
      email: document.getElementById('email').value,
      price : parseInt(totalPrice.textContent),
    },
    products: itemIdArray,
  };

  if(form.checkValidity() == true ){

    fetch("http://localhost:3000/api/teddies/order",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(customerOrderData)
    }).then(response => {

      if(response.ok == true){

        return response.json();
            
      }
    }).then(response => {

      window.sessionStorage.setItem('order', JSON.stringify(response));
      window.localStorage.clear();
      window.location.assign('http://127.0.0.1:5500/pages/confirm_page/confirm_page.html');

    })
    
    //console.log('Tu es un winner');

  } 
  else {
    window.alert('Les données saisies sont incorrectes')
  }
})










