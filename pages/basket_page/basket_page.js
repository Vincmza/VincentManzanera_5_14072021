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
                    <p class="basket-font">Quantité : <span id="quantity">${productArray[i].quantity}</span></p>
                </div> 
                <label for="quantity_change" class="basket_input_position">
                    <input class="w-50 basket-font" type="number" min="0" maxlength="2" id="quantity_changer" value="${productArray[i].quantity}">
                </label>
              </div>
              <div>
                <p class="basket-font">Prix unitaire : <span class="price">${productArray[i].price/100} €</span></p>
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

    const inputQuantity = parseInt(document.getElementById('quantity_changer').value); /*get input value*/

    console.log(inputQuantity);

    const quantityDisplayed = document.getElementById('quantity'); /*get quantity displayed next to input*/

    console.log(quantityDisplayed);



    }
}

displayOrder();

console.log(productArray);




