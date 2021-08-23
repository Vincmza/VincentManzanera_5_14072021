const teddyProductPage = document.getElementById('teddy-container');

const id = new URLSearchParams(document.location.search).get('_id');

const localhosturl = 'http://localhost:3000/api/teddies/' + id;

let basket = [];


function getTeddiesInfos(){

    fetch (localhosturl).then(function(response){

        if (response.ok){
            return response.json()
        }
    })
    .then(function(data){

        //console.log(data);

        chooseTeddyColor(data);

        increaseQuantity(data);
                
    })
}

function increaseQuantity(teddy){

    const addButton = document.getElementById('add_button');

    addButton.addEventListener('click', function(){

        let inputQuantity = parseInt(document.getElementById('quantity').value);

        if(inputQuantity > 0){

            teddy.quantity += inputQuantity;
        
            window.localStorage.setItem(teddy.name, JSON.stringify(teddy));
        }
    });

    const localStorageInfos = JSON.parse(window.localStorage.getItem(teddy.name));

    if(localStorageInfos != null){

       teddy.quantity = localStorageInfos.quantity;

    } else {

    teddy.quantity = 0;

    } 
}

function clickOnRemoveButton(teddy){

    const removeButton = document.getElementById('remove_button');

    removeButton.addEventListener('click', function(){

        teddy.quantity = 0;

        window.localStorage.removeItem(teddy.name);
    });

}

function chooseTeddyColor(color){

    let colorModel = '';

        color.colors.forEach(teddy_color => {

            colorModel += `<option value="${teddy_color}">${teddy_color}</option>`
          
        });

            teddyProductPage.innerHTML = `<article class="card mb-3 d-flex flex-column align-items-center card-by-default shadow col-10 col-sm-10 col-md-8 col-xl-6" style="background-color: rgb(243, 233, 241);">

            <div>
                <img src="${color.imageUrl}" class="img-fluid product_img_height" alt="photo teddy_1">
            </div>

            <div class="card-body">
                <h2 class="card-title">${color.name}</h2>
            </div>
            
            <div class="ps-2 pe-2">
                <p class="card-text product_page_description">${color.description}</p>
                <p class="text-center fs-2">${color.price/100} €</p>
            </div>
            

            <!-- COLOR OPTION -->

            <h3 class="fs-6 pb-4 ps-2 pe-2">Choisissez la couleur qui vous plaît !</h3>

            <select name="item_choice" id="item_choice">

                ${colorModel}


            </select>

            <!-- ADD AND REMOVE BUTTONS -->

            <h3 class="fs-6 mt-4 ps-2 pe-2">Combien en voulez vous ?</h3>

            <div class="d-flex flex-column align-items-center col-8">

                <input id="quantity" class="mt-4 col-xl-2 col-md-4 col-xs-5" type="number" min="1" placeholder="Choisissez" maxlength="2" value="1">

                <button type="button" id="add_button" class="btn btn-success rounded-pill more-details-button mt-4 col-xl-4 product_page_font">
                    Ajouter au panier
                </button>

            </div>

            <!-- BACK AND BASKET BUTTONS -->

            <div class="d-flex justify-content-between col-11 pb-4 back_and_basket_button_position">

                <button type="button" class="btn btn-secondary fs-5 col-xl-2 prodcut_page_back_button">
                    <a href="/pages/view_page/index.html" class="text-reset text-decoration-none">Retour</a>
                </button>


                <button type="button" class="btn btn-primary fs-5 col-xl-1">
                    <a href="/pages/basket_page/basket_page.html" class="text-reset"><i class="fas fa-shopping-cart"></i></a>
                </button>

            </div>
        </article>`

}

getTeddiesInfos();






