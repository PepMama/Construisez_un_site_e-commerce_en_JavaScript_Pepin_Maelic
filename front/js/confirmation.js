// on récupère les id 
const order = window.location.search;
const urlSearchParams = new URLSearchParams(order);
const id= urlSearchParams.get("id");

// on récupère le numéro de commande 
let orderId = document.getElementById("orderId");
orderId.textContent = id;

localStorage.clear();// supprimer le localStorage
