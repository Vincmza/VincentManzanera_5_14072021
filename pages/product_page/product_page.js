const teddyProductPage = document.getElementById('teddy-container');

const id = new URLSearchParams(document.location.search).get('_id');

const localhosturl = 'http://localhost:3000/api/teddies/' + id;


function getTeddiesInfos(){

    fetch (localhosturl).then(function(response){

        if (response.ok){
            return response.json()
        }
    })
    .then(function(data){

        console.log(data);

        let colorModel = '';

        data.colors.forEach(teddy_color => {

            colorModel += `<option value="${teddy_color}">${teddy_color}</option>`
          
        });

            teddyProductPage.innerHTML = `<article class="card mb-3 d-flex flex-column align-items-center card-by-default shadow col-10 col-sm-10 col-md-8 col-xl-6" style="background-color: rgb(243, 233, 241);">

            <div>
                <img src="${data.imageUrl}" class="img-fluid product_img_height" alt="photo teddy_1">
            </div>

            <div class="card-body">
                <h2 class="card-title">${data.name}</h2>
            </div>
            
            <div class="ps-2 pe-2">
                <p class="card-text product_page_description">${data.description}</p>
                <p class="text-center fs-2">29€</p>
            </div>
            

            <!-- COLOR OPTION -->

            <h3 class="fs-6 pb-4 ps-2 pe-2">Choisissez la couleur qui vous plaît !</h3>

            <select name="item_choice" id="item_choice">

                ${colorModel}


            </select>

            <!-- ADD AND REMOVE BUTTONS -->

            <h3 class="fs-6 mt-4 ps-2 pe-2">Combien en voulez vous ?</h3>

            <div class="d-flex flex-column align-items-center col-8">

                <input class="mt-4 col-xl-2 col-md-4 col-xs-5" type="number" min="0" placeholder="Choisissez" maxlength="2">

                <button type="button" class="btn btn-success rounded-pill more-details-button mt-4 col-xl-4 product_page_font">
                    Ajouter au panier
                </button>

                <button type="button" class="btn btn-danger rounded-pill more-details-button mt-4 col-xl-4 product_page_font">
                    Retirer du panier
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
                
    })
}

getTeddiesInfos();



