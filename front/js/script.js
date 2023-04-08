const url = "http://localhost:3000/api/products";
async function getProducts (){
    const response = await fetch(url);
    let data = await response.json();

    return data;
}

/**
 * This function displays a list of products on a webpage by fetching product data and generating HTML
 * code for each product.
 */
async function displayProducts (){
    const listProducts = await getProducts(); 
    let html = '';
    listProducts.forEach(product => {
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
    const listItems = document.querySelector("#items");
    listItems.innerHTML = html;
} 

displayProducts();