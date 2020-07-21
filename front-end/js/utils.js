const basePath = 'http://localhost:3000/api/teddies/';

function ajax(url){
    return new Promise((resolve,reject)=>{
        let req = new XMLHttpRequest();
        req.open('GET',url);
        req.addEventListener("load",()=>{
            products = JSON.parse(req.responseText);
            resolve(products);
        });
        req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        req.send();
    });
}
function displayProduct(product, type){
    if (type === 'card') {
        return`
        <li class="list-unstyled col-12 col-lg-6">
            <div class="card border-success col-11   mb-3 mb-md-5">
                <a href="ourson.html?_id=${product._id}" class="stretched-link" id="lien">
                    <div class="image">
                        <img src="${product.imageUrl}" >
                    </div>
                </a>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text ">
                        ${product.price}€<br>
                        ${product.description}
                    </p>
                </div>
        </div>
        </li>
        `;
    } 

    if (type === 'featured'){
        return`
        <div  class="border border-black px-2">
            <div class="image d-flex justify-content-center mt-1">
               <img src=${product.imageUrl} class="image-ourson">
            </div>
            <p>
                ${product.name}
                <br>${product.price}€
                <br>${product.description}</p>
        </div>`;
    }

    if(type=== 'cart'){
        return`
        <div class='row border border-dark col-12 col-lg-8 px-0 mx-auto'> 
            <div class="col-6" >
                <img src=${product.imageUrl} class="image-panier">
            </div>
            <div class="col-6 text-right mt-3" id="text">
                <p>
                    ${product.name}<br>
                    ${product.price} €
                </p>
            </div>
        </div>`
    }
}

function filterProductByID(products, id){
    let product = products.filter(function(product){
       if (product._id === id){
          return true;
       }
       return false;
    });
    return product[0];
 }

function get(item) {
    if (localStorage.getItem(item)) {
        return JSON.parse(localStorage.getItem(item));
    }
    return null
}

function store(name, value) {
    localStorage.setItem( name, value);
}