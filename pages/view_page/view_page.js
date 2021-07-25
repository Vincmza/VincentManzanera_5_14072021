function getTeddiesInfos () {

    fetch ('http://localhost:3000/api/teddies').then(function(response){
        if (response.ok){
            return response.json()
        }
    })
    .then(function(data){

        console.log(data)

        const teddyContainer = document.getElementById('teddy-container');

        data.forEach(teddy => {

            teddyContainer.innerHTML += `
            
            <article class="card card-by-default shadow" style="width: 20rem;">
            
            <img src="${teddy.imageUrl}" class="card-img-top height-by-default teddy_view_page_img" alt="photo de l'ours en peluche teddy">
            <div class="card-body" style="background-color: rgb(243, 233, 241);">
              <h2 class="card-title">${teddy.name}</h2>
              <p class="card-text">${teddy.description}</p>
              <p class="text-center fs-3">${teddy.price/100}€</p>
              <div class="d-flex justify-content-end"><a href="/pages/product_page/product_page.html?id=${teddy._id}" class="btn btn-primary rounded-pill more-details-button">Plus de détails</a></div>                    
            </div>

            </article>`
            
        });

        return data
    })
}  
getTeddiesInfos();




