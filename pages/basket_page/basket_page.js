/*Récupérer les données du local storage et les traiter avec JSON.parse()*/
function getDataFromLocalStorage(key){ 
    const data=localStorage.getItem(key);
    if(data){
        return JSON.parse(data)
    }
    return null
}

/*Stockage des données récupérées dans le local storage*/
const productArray = []; 
for (let i =0; i<window.localStorage.length; i++){ /*Run local storage data and store them in productArray*/
    productArray.push(getDataFromLocalStorage(window.localStorage.key(i)));
}

const orderContainer = document.getElementById('order_container');
/*Résumé du panier de l'utilisateur*/
function displayOrder(productArray, orderContainer){ 
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

/*Récupération de la valeur de l'input*/
const listInputQuantity = document.querySelectorAll('.quantity_changer'); 
/*Récupération de la quantité affichée à gauche de l'input*/
const listQuantityDisplayed = document.querySelectorAll('.teddy_quantity'); 
/*Prix affiché d'un seul produit multiplié par la quantité*/
const listTeddyPrice = document.querySelectorAll('.this_basket_total_price');
/*Prix total du panier*/
let totalPrice = document.getElementById('total_price');
/*Bouton de supression des données du panier*/
const removeButton = document.getElementById('remove_button');

/*Quantité de l'input impactant les prix affichés, sous-total et prix du panier total */
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

  /*Suppression des données du panier et du local storage au clic sur le bouton corbeille*/
  removeButton.addEventListener('click', function(){    
    orderContainer.innerHTML = `<h1 class="text-center pb-4 fs-4">Votre panier est vide désormais</h1>`;
    window.localStorage.clear();
    totalPrice.innerHTML = `<span>0 €</span>`; 
  }) 
});

/*Prix total additionnant tous les sous-totaux*/
function displayFinalResult(listTeddyPrice, totalPrice){
  let totalResult = 0;
  for( let i = 0; i<listTeddyPrice.length; i++){
    totalResult += parseInt(listTeddyPrice[i].innerHTML);
  }
  totalPrice.innerHTML = `<span>${totalResult} €</span>`;
}

displayFinalResult(listTeddyPrice, totalPrice);

/*Stockage de l'id des produits contenus dans le local storage*/
const itemIdArray =[];
for (let itemId of productArray){
  let dataItem = itemId._id;
  itemIdArray.push(dataItem);
}

/*Récupération du bouton de soumission du formulaire*/
const formSubmitButton = document.getElementById('customer_data_submit_button');
/*Récupération du formulaire entier*/
const form = document.getElementById('customer_data_form');

/*Envoi des données du formulaire si ces dernières sont conformes*/
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
  if(form.reportValidity() == true ){
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
    .catch(error => {console.log(error)});   
  } 
})










