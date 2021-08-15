let orderData = JSON.parse(sessionStorage.getItem('order')); /*GET DATA FROM SESSION STORAGE*/

console.log(orderData)

let orderConfirmation = document.getElementById('order_confirmation'); /*GET ID CONTAINING ORDER CONFIRMATION TEMPLATE*/

orderConfirmation.innerHTML += `<div>
<h1 class="fs-3">Votre commande a bien été prise en compte</h1>
</div>
<div>
<p>Merci pour votre achat !</p>
</div>
<div>
<p>Votre commande dont l'identifiant est <span class="order_number">${orderData.orderId}</span> vous sera expédiée dans un délai de 5 jours ouvrés à l'adresse suivante :</p>
</div>
<div class="customer_address">
<p>${orderData.contact.firstName} ${orderData.contact.lastName}, ${orderData.contact.address}, ${orderData.contact.city}</p>
</div>
<div>
<p>Vous recevrez un mail de confirmation à l'adresse suivante :<span class="customer_email"> ${orderData.contact.email}</span></p>
</div>`

//console.log(orderConfirmation)