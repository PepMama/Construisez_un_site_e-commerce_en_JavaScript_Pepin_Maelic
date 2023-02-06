const url = "http://localhost:3000/api/products";

// async : les fonctions se lancent en même temps
async function getProducts (){
    const response = await fetch(url); // on récupère les données // await: on attend que l'url soit chargé
    let data = await response.json(); // on les transforme en json

    return data;
}

async function displayProducts (){
    const listProducts = await getProducts(); 
    let html = '';
    listProducts.forEach(product => { // on parcourt la liste de tous les produits (afficher chaque produit)
        let htmlSegment = 
        `
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap ${product.name}">
          <h3 class="productName">${product.name}</h3>
          <p>${product.description}</p>
        </article>
        </a>
        `;
        html += htmlSegment;
    });
    // récupérer l'id du html et l'ajouter dans une variable
    const listItems = document.querySelector("#items");
    listItems.innerHTML = html;
} 

displayProducts();