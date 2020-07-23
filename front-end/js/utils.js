const basePath = 'http://localhost:3000/api/teddies/';

function ajax(url){ // fonction de récupérations des données de l'API//
    return new Promise((resolve,reject)=>{
        let req = new XMLHttpRequest();
        req.open('GET',url);
        req.addEventListener("load",()=>{
            teddies = JSON.parse(req.responseText);
            resolve(teddies);
        });
        req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        req.send();
    });
}
function displayProduct(teddy, type){ //fonction pour afficher le produit
    if (type === 'card') { // affichage pour la page index
        return`
        <li class="list-unstyled col-12 col-lg-6">
            <div class="card border-success col-11   mb-3 mb-md-5">
                <a href="ourson.html?_id=${teddy._id}" class="stretched-link" id="lien">
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

    if(type=== 'cart'){  // affichage pour les pages panier et commande
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

function filterProductByID(teddies, id){ // fonction pour filtrer la liste de l'API pour ressortir les produits sélectionnés
    let teddy = teddies.filter(function(teddy){
       if (teddy._id === id){
          return true;
       }
       return false;
    });
    return teddy[0];
 }

function get(item) { //fonction récupération d'un objet en sauvegarde locale
    if (localStorage.getItem(item)) {
        return JSON.parse(localStorage.getItem(item));
    }
    return null
}

function store(name, value) {//fonction d'ajout d'un objet en sauvegarde locale
    localStorage.setItem( name, value);
}