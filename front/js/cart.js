// Création d'une fonction pour la récupération des données du local storage
function getFromBasket() {
    let basket = localStorage.getItem("basket");
    return (basket != null)? JSON.parse(basket):[];
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
            basketTotalPrice.innerHTML(newTotalPrice);
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
        basket = basket.filter(p => (p.id != itemId || p.color != itemColor));
        localStorage.setItem("basket",JSON.stringify(basket));
        refreshBasket();
    })
    divDelete.appendChild(articleDelete);

}


function totalArticleQuantity (){
    let totalQuantity = 0;
    for(let product of basket){
        totalQuantity += parseInt(product.quantity);
    }
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
}

// fonction qui permet de rafraichir le panier quand on quitte la page
function refreshBasket(){
    let clearSection = document.getElementById('cart__items');
    if(window.confirm("Voulez vous supprimer ?")){
        alert("Vous avez bien supprimé l'article ! ")
        clearSection.innerHTML = "";
        displayPage();
    }
    else{
        alert("Vous n'avez pas supprimé !")
    }
}

function displayPage() {
    fetch(`http://localhost:3000/api/products`)
    .then(response => response.json()) // on le met sous format json
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
