
ajax(`${basePath}/${ getId()}`)
.then((product)=>{
    document.getElementById('contenu').innerHTML = displayProduct(product, 'featured');
    listColors(product.colors);
    listenForCartAddition();
    //redirectToCart();
    
});
function redirectToCart(){
    window.location.href = './panier.html'
}
function listenForCartAddition() {
    const btnPanier = document.getElementById("envoiePanier");
    btnPanier.addEventListener("click",addProductToCart);
}
  
function addProductToCart(e) {
    list = get('list');

    if (!list){
        list=[];
    }

    if ( list.includes( getId())){
        alert("vous ne pouvez achetez qu'un exemplaire de chaque modèle de peluche.");
    }else{
        list.push( getId());
    }   
    
    store( 'list',JSON.stringify(list));        
}

function listColors(colors){
    listcouleur = document.getElementById("listcouleur");
   
    for (let i =0;i<colors.length;i++){
        let color = colors[i];
        let opt = document.createElement("option");
        opt.textContent=color;
        opt.value=color;
        listcouleur.appendChild(opt);
    }
}

function getId(){
    const params = new URLSearchParams(window.location.search);
    return params.get('_id');
}
