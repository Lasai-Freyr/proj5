
function ajax(url){
    return new Promise((resolve,reject)=>{
        let req = new XMLHttpRequest();
        req.open('GET',url);
        req.addEventListener("load",()=>{
            products = JSON.parse(req.responseText);
            resolve(products);
            
    console.log(products);
        });
        req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        req.send();
    });
}
function displayProduct(product){
    
    console.log('pinguin');
    
    return`
    <li class="list-unstyled">
        <div class="card border-success col-6  mb-3 mb-md-5">
            <a href="panier.html?_id=${product._id}" class="stretched-link" id="lien">
                <img src="${product.imageUrl}">
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

