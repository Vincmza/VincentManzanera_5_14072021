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

function displayOrder(){ /*Display what customer chose from product_page*/

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
              <div>
                
                <button id="remove_button" type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
                  
              </div>
              
            </div>
          </div>
        </div>
    </div>`
    }
}
displayOrder();

const listInputQuantity = document.querySelectorAll('.quantity_changer'); /*get input value*/

const listQuantityDisplayed = document.querySelectorAll('.teddy_quantity'); /*get quantity displayed in the quantity slot*/

const listTeddyPrice = document.querySelectorAll('.this_basket_total_price'); /*get price for all teddies in relation to 1 teddy model*/

let totalPrice = document.getElementById('total_price');


/*INPUT QUANTITY AND TOTAL PRICE CHANGE PROCESS */

listInputQuantity.forEach((inputQuantity, i) => {

  inputQuantity.addEventListener('change', function(){

    listQuantityDisplayed[i].innerHTML = this.value;

    let data = parseInt(this.value);

    listTeddyPrice[i].innerHTML = (data*productArray[i].price)/100;

  })
});
function totalResultDisplay(){

  let totalResult = 0;

  for(let i = 0; i<listTeddyPrice.length; i++){

      totalResult += parseInt(listTeddyPrice[i].innerHTML);
  }

  totalPrice.innerHTML += `<span>${totalResult} €</span>`
}

totalResultDisplay();











//console.log(productArray);




