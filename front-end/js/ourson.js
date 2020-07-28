ajax("GET",`${basePath}/${ getId()}`)
.then((teddy) => {
    document.getElementById('contenu').innerHTML = displayProduct(teddy, 'featured');
    listColors(teddy.colors);
    listenForCartAddition();
    //redirectTo('panier');
    
});

function listenForCartAddition() { // fonction d'ajout d'évènement au click sur le bouton
    const btnPanier = document.getElementById("envoiePanier");
    btnPanier.addEventListener("click",addProductToCart);
}
  
function addProductToCart(e) { // fonction d'ajout d'un produit dans le panier avec contrôle de doublon
    products = get('list');

    if (!products){
        products = [];
    }

    if ( products.includes( getId())){
        alert("vous ne pouvez achetez qu'un exemplaire de chaque modèle de peluche.");
        return;
    }

    products.push( getId());
    store(  'list', products );        
}

function listColors(colors){ //fonction création de la liste déroulante des couleurs de personnalisation du produit
    listcouleur = document.getElementById("listcouleur");
   
    for (let i = 0; i < colors.length; i++){
        let color = colors[i];
        let opt = document.createElement("option");
        opt.textContent = color;
        opt.value = color;
        listcouleur.appendChild(opt);
    }
}

function getId(){ // fonction de récupération de la variable Id de l'URL
    const params = new URLSearchParams(window.location.search);
    return params.get('_id');
}
