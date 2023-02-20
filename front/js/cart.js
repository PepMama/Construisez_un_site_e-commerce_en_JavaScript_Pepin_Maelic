// Création d'une fonction pour la récupération des données du local storage
function getFromBasket() {
    let basket = localStorage.getItem("basket");
    return (basket != null)? JSON.parse(basket):[];
}

// fonction afficher les elements du html
// function displayOneProduct () {
//     return `<article class="cart__item" data-id="${this._id}" data-color="${this.color}">
//                 <div class="cart__item__img">
//                 <img src="${this.imageUrl}" alt="${this.altTxt}.">
//                 </div>
//                 <div class="cart__item__content">
//                 <div class="cart__item__content__description">
//                     <h2>${this.name}</h2>
//                     <p>${this.color}</p>
//                     <p>${this.price}</p>
//                 </div>
//                 <div class="cart__item__content__settings">
//                     <div class="cart__item__content__settings__quantity">
//                     <p>Qté : </p>
//                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${this.quantity}">
//                     </div>
//                     <div class="cart__item__content__settings__delete">
//                     <p class="deleteItem">Supprimer</p>
//                     </div>
//                 </div>
//                 </div>
//             </article>`
// }

function displayOneProduct (itemId, itemColor, articleImage, itemAlt, itemName, itemPrice, itemQuantity) {
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
    articleImage.src = articleImage;
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
    articlePrice.textContent = `${itemPrice} €`
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
    articleQuantity.textContent = `Quantity : ${itemQuantity}`;
    divQuantity.appendChild(articleQuantity);

    // création de la balise input 
    let articleInput = document.createElement("input");
    articleInput.className = "itemQuantity";
    articleInput.type = "number";
    articleInput.name = "itemQuantity";
    articleInput.min = 1;
    articleInput.max = 100;
    articleInput.value = 42;
    divQuantity.appendChild(articleInput);

    
    // Création de la div supprimer
    let divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    divContent.appendChild(divDelete);

}


// function display () {
//     fetch(`http://localhost:3000/api/products/${id}`)
//         .then(response => response.json()) // on le met sous format json
//         .then(product => {
//             let cartItem 
//         }
// }

// function displayAllProducts(){
//     let item = document.querySelector("#cart__items");
//     let products = this.getFromBasket();

//     for (let prod of products){
//         prod = Object.assign(this, prod);
//         item.insertAdjacentHTML("beforeend", prod.displayOneProduct);
//     }
// }

displayAllProducts();