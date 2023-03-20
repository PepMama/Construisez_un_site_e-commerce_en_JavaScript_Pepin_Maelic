// on récupère les id 
const str=window.location.search;
const urlSearchParams = new URLSearchParams(str);
const id= urlSearchParams.get("id");
const url = "http://localhost:3000/api/products";

/**
 * If the id exists, fetch the product from the API, then convert the response to JSON, then display
 * the product's image, title, price, description, and colors.
 */
function getProduct () {
    if(id){
        fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json()) // on le met sous format json
        .then(product => {
            let imageProduct = document.createElement("img");
            imageProduct.src = product.imageUrl;
            imageProduct.alt = product.altTxt;
            let classImage = document.getElementsByClassName("item__img");
            classImage[0].appendChild(imageProduct);

            document.getElementById("title").innerHTML = product.name;
            document.getElementById("price").innerHTML = product.price;
            document.getElementById("description").innerHTML = product.description;

            setColor(product.colors);
        }).catch((error) => {
            console.log(`Erreur : ${error}`)
        })
    }
    else{
        console.log("Id introuvable !")
    }
}

// création d'une fonction pour le choix des couleurs
function setColor(colors) {
    for (let color of colors){
        let option = document.createElement("option");
        option.value = color;
        option.textContent = color;

        document.getElementById("colors").appendChild(option);
    }
}

getProduct();

// fonction qui permet de sauvegarder dans le panier
function saveInBasket (basket) { 
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Création d'une fonction pour la récupération des données
function getFromBasket() {
    let basket = localStorage.getItem("basket");

    return (basket != null)? JSON.parse(basket):[];
}


//Ajouter un produit dans le panier
function addProductInBasket() {
    const colorSelected = document.getElementById("colors").value;
    const quantitySelected = document.getElementById("quantity").value;

    if (colorSelected == ""){
        if (quantitySelected < 1 || quantitySelected > 100){
            alert("Veuillez sélectionner une couleur et une quantité comprise entre 1 et 100 !");
        }    
        else{
            alert("Veuillez sélectionner une couleur !");
        }
    }
    else{
        if (quantitySelected < 1 || quantitySelected > 100){
            alert("Veuillez sélectionner une quantité comprise entre 1 et 100 !");
        }
        else{
            let basket = getFromBasket();
            let sameProduct = basket.find(p => (p.id == id && p.color == colorSelected));
            if (sameProduct != undefined){
                sameProduct.quantity = parseInt(sameProduct.quantity) + parseInt(quantitySelected);
            }
            else{
                let product = {
                    id : id,
                    color : colorSelected,
                    quantity : quantitySelected
                }
                basket.push(product);
            }
            saveInBasket(basket);
            alert("Le produit a bien été ajouté dans le panier ! ");
        }
    }
}


const btnAddInBasket = document.getElementById("addToCart");

btnAddInBasket.addEventListener('click', () => {
    addProductInBasket();
})

