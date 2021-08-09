function getDataFromLocalStorage(key){ /*Get local storage data to parse them*/

    const data=localStorage.getItem(key);

    if(data){

        return JSON.parse(data)

    }
    return null
}

const productArray = [];

for (let i =0; i<window.localStorage.length; i++){ /*Run local storage data and store them in productArray*/

    productArray.push(getDataFromLocalStorage(window.localStorage.key(i)));

}

const orderContainer = document.getElementById('order_container');

function displayOrder(){

    for(let i = 0; i<productArray.length; i++){

        orderContainer.innerHTML += `<div class="card">
        <div class="row g-0">
          <div class="col-sm-4">
            <img src="${[i].imageUrl}" class="img-fluid rounded-start basket_img_height" alt="...">
          </div>
          <div class="col-sm-8">
            <div class="card-body product_caption">
              <h3 class="card-title fs-3">Teddy Bear</h3>
              <div>
                <p class="basket-font">Modèle : <span class="model">Chocolat</span></p>
              </div>
              <div class="d-flex basket_quantity_responsive">
                <div class="me-3">
                    <p class="basket-font">Quantité : <span class="quantity">2</span></p>
                </div> 
                <label for="quantity_change" class="basket_input_position">
                    <input class="w-50 basket-font" type="number" min="0" maxlength="2" id="quantity_changer" value="2">
                </label>
              </div>
              <div>
                <p class="basket-font">Prix unitaire : <span class="price">29€</span></p>
              </div>
              <div>
                <p class="basket-font">Prix total : <span class="this_basket_total_price">58€</span></p>
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


console.log(productArray);




