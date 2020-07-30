const basePath = 'http://localhost:3000/api/teddies/';

function ajax(verb, url, payload = null){ // fonction de récupérations des données de l'API//
    return new Promise((resolve,reject)=>{
        let req = new XMLHttpRequest();
        req.open(verb ,url);
        req.addEventListener("load",() => {
            response = JSON.parse(req.responseText);
            resolve(response);
        });
        req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        req.send(payload);
    });
}

function displayProduct(teddy, type)    { //fonction pour afficher le produit
    if (type === 'card') { // affichage pour la page index
        return`
        <li class="list-unstyled col-12 col-lg-6">
            <div class="card border-success col-11   mb-3 mb-md-5">
                <a href="produit.html?_id=${teddy._id}" class="stretched-link" id="lien">
                    <div class="image">
                        <img src="${teddy.imageUrl}" >
                    </div>
                </a>
                <div class="card-body">
                    <h5 class="card-title">${teddy.name}</h5>
                    <p class="card-text ">
                        ${teddy.price}€<br>
                        ${teddy.description}
                    </p>
                </div>
        </div>
        </li>
        `;
    } 

    if (type === 'featured'){ // affichage pour la page ourson
        return`
        <div  class="border border-black px-2">
            <div class="image d-flex justify-content-center mt-1">
               <img src=${teddy.imageUrl} class="image-ourson">
            </div>
            <p>
                ${teddy.name}
                <br>${teddy.price}€
                <br>${teddy.description}</p>
        </div>`;
    }

    if(type === 'cart'){  // affichage pour les pages panier et commande
        return`
        <div class='row border border-dark col-12 col-lg-8 px-0 mx-auto'> 
            <div class="col-6" >
                <img src=${teddy.imageUrl} class="image-panier">
            </div>
            <div class="col-6 text-right mt-3" id="text">
                <p>
                    ${teddy.name}<br>
                    ${teddy.price} €
                </p>
            </div>
        </div>`
    }
}

function displayProductsInCart(products){ //fonction d'affichage de la liste des produits mis en panier
   let ligneList = ""; 

   for (let i = 0 ; i < products.length ; i++) { 
     let product = products[i];
      ligneList += displayProduct(product, 'cart');   
   }  

   ligneList += `</div>`;
   contentList.innerHTML += ligneList;
}

function displayTotal(products){ 
   document.getElementById('total').innerHTML = "Prix total : "+ countTotal(products) +" €"
}

function countTotal(products){ // fonction de calcul du prix total de la commande   
    const reducer = (acc, product) => acc + product.price; 
    return  products.reduce((reducer),0)
}

function redirectTo(page)   {
   window.location.href = `./${page}.html`;
}