// const { json } = require("body-parser");

// Création d'une fonction pour la récupération des données du local storage
/**
 * If the basket is not empty, return the basket, otherwise return an empty array.
 * @returns the basket.
 */
function getFromBasket() {
    let basket = localStorage.getItem("basket");
    // return (basket != null)? JSON.parse(basket):[];
    if (basket == null){
        return [];
    }
    else{
        return JSON.parse(basket);
    }
}

let basket = getFromBasket();
function displayOneProduct (itemId, itemColor, itemImage, itemAlt, itemName, itemPrice, itemQuantity) {
    let articleLink = document.createElement("a");
    articleLink.className = "cart__item";
    articleLink.setAttribute("data-id", itemId);
    articleLink.setAttribute("data-color", itemColor);
    document.getElementById("cart__items").appendChild(articleLink);

    //création de la balise div img:
    let divImage = document.createElement("div");
    divImage.className = "cart__item__img";
    articleLink.appendChild(divImage);

    // Création de la balise img dans la div
    let articleImage = document.createElement("img");
    articleImage.src = itemImage;
    articleImage.alt = itemAlt;
    divImage.appendChild(articleImage);

    // création de la div content
    let divContent = document.createElement("div");
    divContent.className = "cart__item__content";
    articleLink.appendChild(divContent);

    // création de la balise div pour la description
    let divDescription =  document.createElement("div");
    divDescription.className = "cart__item__content__description";
    divContent.appendChild(divDescription);

    // Création du title h2
    let articleTitle = document.createElement ("h2");
    articleTitle.textContent = itemName;
    divDescription.appendChild(articleTitle);

    // Création du paragraphe
    let articleColor = document.createElement ("p");
    articleColor.textContent = itemColor;
    divDescription.appendChild(articleColor);

    // Création du title h2
    let articlePrice = document.createElement ("p");
    articlePrice.textContent = `${itemPrice} €`;
    divDescription.appendChild(articlePrice);

    // Création de la div content settings
    let divSetting = document.createElement("div");
    divSetting.className = "cart__item__content__settings";
    divContent.appendChild(divSetting);

    // Création de la div content quantity
    let divQuantity = document.createElement("div");
    divQuantity.className = "cart__item__content__settings__quantity";
    divContent.appendChild(divQuantity);

    // création de la balise p pour la quantité
    let articleQuantity = document.createElement("p");
    articleQuantity.textContent = `Qté :`;
    divQuantity.appendChild(articleQuantity);

    // création de la balise input 
    let inputQuantity = document.createElement("input");
    inputQuantity.className = "itemQuantity";
    inputQuantity.type = "number";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = "1";
    inputQuantity.max = "100";
    inputQuantity.value = itemQuantity;
    inputQuantity.addEventListener('change', () => {
        if (inputQuantity.value < 1 || inputQuantity.value > 100){
            alert("La quantité doit être comprise entre 1 et 100");
        }
        else{
            let sameProduct = basket.find(p => (p.id == itemId && p.color == itemColor));
            sameProduct.quantity = parseInt(inputQuantity.value);
            localStorage.setItem("basket",JSON.stringify(basket));
            totalArticleQuantity();
            let basketTotalPrice = document.getElementById('totalPrice');
            newTotalPrice = basketTotalPrice.textContent - (itemQuantity * itemPrice) + (inputQuantity.value * itemPrice);
            itemQuantity = inputQuantity.value;
            basketTotalPrice.innerHTML = newTotalPrice;
        }
    });
    divQuantity.appendChild(inputQuantity);
    
    // Création de la div supprimer
    let divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    divContent.appendChild(divDelete);

    let articleDelete = document.createElement("p");
    articleDelete.className = "deleteItem";
    articleDelete.textContent = "Supprimer";
    articleDelete.addEventListener('click', ()=>{
        if (window.confirm("Voulez vous supprimer le produit selectionné ?")){
            basket = basket.filter(p => (p.id != itemId || p.color != itemColor));
            localStorage.setItem("basket",JSON.stringify(basket));
            // refreshBasket();
            location.reload();
        }
    })
    divDelete.appendChild(articleDelete);

}


/**
 * It loops through the basket array, adds the quantity of each product to the totalQuantity variable,
 * and then displays the totalQuantity variable in the HTML.
 */
function totalArticleQuantity (){
    let totalQuantity = 0;
    for(let product of basket){
        totalQuantity += parseInt(product.quantity);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
}

/* permet d'afficher la page web avec les produits */
function displayPage() {
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(products => {
        let totalPrice = 0;
        for(let productOfBasket of basket){
            for(let product of products){
                if(productOfBasket.id == product._id){
                    displayOneProduct (
                    productOfBasket.id, 
                    productOfBasket.color,
                    product.imageUrl,
                    product.altTxt,
                    product.name,
                    product.price,
                    productOfBasket.quantity
                    );
                    totalPrice += product.price * productOfBasket.quantity;
                }
            }
        }
        totalArticleQuantity();
        let basketTotalPrice = document.getElementById('totalPrice');
        basketTotalPrice.innerHTML = totalPrice;
    }).catch((error) => {
        console.log(`Erreur : ${error}`)
    })
}

displayPage();

// Gestion de la commande => remplir le formulaire 
let contact = {
    firstName: "",
    lastName: "",
    adress: "",
    city: "",
    email: ""
};

// Création des expressions régulières
let mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let letterRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

// Validation du prénom 
let firstName = document.getElementById('firstName');
let firstNameErrorMessage = document.getElementById('firstNameErrorMsg');
firstName.addEventListener('input', function(i) {
    validFirstName(i.target.value);
    contact.firstName = i.target.value;
});
/**
 * If the first name is valid, then the error message is cleared and the function returns true. If the
 * first name is not valid, then the error message is set and the function returns false.
 * @param firstName - the value of the first name input field.
 * @returns a boolean value.
 */
function validFirstName(firstName) {  
    let valid = false;
    let testName = letterRegExp.test(firstName);
    if(testName){
        firstNameErrorMessage.textContent = "";
        valid = true;
    }
    else{
        firstNameErrorMessage.textContent = "Entrez un prénom valable";
        valid = false;
    }
    return valid;
}

// Validation du Nom 
let lastName = document.getElementById('lastName');
let lastNameErrorMessage = document.getElementById('lastNameErrorMsg');
lastName.addEventListener('input', function(e) {
    validLastName(e.target.value);
    contact.lastName = e.target.value;
});
function validLastName(lastName) {  
    let valid = false;
    let testName = letterRegExp.test(lastName);
    if(testName){
        lastNameErrorMessage.textContent = "";
        valid = true;
    }
    else{
        lastNameErrorMessage.textContent = "Entrez un nom valable";
        valid = false;
    }
    return valid;
}

// Validation de l'adresse  
let adress = document.getElementById('address');
let addressErrorMessage = document.getElementById('addressErrorMsg');
adress.addEventListener('input', function(a) {
    validAdress(a.target.value);
    contact.address = a.target.value;
});
function validAdress(adress) {  
    let valid = false;
    let testAdresse = addressRegExp.test(adress);
    if(testAdresse){
        addressErrorMessage.textContent = "";
        valid = true;
    }
    else{
        addressErrorMessage.textContent = "Entrez une adresse valide";
        valid = false;
    }
    return valid;
}

// Validation de la ville  
let city = document.getElementById('city');
let cityErrorMessage = document.getElementById('cityErrorMsg');
city.addEventListener('input', function(c) {
    validCity(c.target.value);
    contact.city = c.target.value;
});
function validCity(city) {  
    let valid = false;
    let testCity = letterRegExp.test(city);
    if(testCity){
        cityErrorMessage.textContent = "";
        valid = true;
    }
    else{
        cityErrorMessage.textContent = "Entrez une ville valide";
        valid = false;
    }
    return valid;
}

// Validation de l'adresse mail  
let email = document.getElementById('email');
let emailErrorMessage = document.getElementById('emailErrorMsg');
email.addEventListener('input', function(c) {
    validEmail(c.target.value);
    contact.email = c.target.value;
});
function validEmail(email) {  
    let valid = false;
    let testEmail = mailRegExp.test(email);
    if(testEmail){
        emailErrorMessage.textContent = "";
        valid = true;
    }
    else{
        emailErrorMessage.textContent = "Entrez une adresse mail valide, ex : exemple@exemple.fr";
        valid = false;
    }
    return valid;
}

function order () {  
    let products = [];
    orderBtn = document.getElementById('order').addEventListener("click", (e)=> {
        e.preventDefault();
        if(letterRegExp.test(firstName.value) == false || letterRegExp.test(lastName.value) == false || addressRegExp.test(adress.value) == false || letterRegExp.test(city.value) == false || mailRegExp.test(email.value) == false){
            alert("Veuillez vérifier le formulaire !");
        }
        else{
            if(firstName.value == "" || lastName.value == "" || address.value == "" || city.value == "" ||email.value == ""){
                alert("Veuillez renseigner les champs manquants !");
            }
            else{
                localStorage.setItem("contact", JSON.stringify(contact));// initialiser le panier
                if(basket && basket.length){
                    for( let basketItem of basket ){
                        products.push(basketItem.id); 
                    };
                    let order = {
                        contact: contact,
                        products: products
                    };
                    fetch("http://localhost:3000/api/products/order", {
                        method: "POST",
                        body: JSON.stringify(order),
                        headers: {
                            "Accept": "application/json",
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        let orderId = data.orderId;
                        window.location.assign("confirmation.html?id=" + orderId);
                    }).catch((error) => {
                        console.log(`Erreur : ${error}`)
                    })
                }
                else{
                    alert("Le panier est vide");
                }
            }
        }
    });
}

order();