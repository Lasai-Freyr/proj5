let products=[];
let found=[];
btnPanier = document.getElementById("envoiePanier");

listcouleur = document.getElementById("listcouleur");



identifiant = getId();
getProduct();  


function getProduct(){
    ajax(`http://localhost:3000/api/teddies/${identifiant}`)
    .then((products)=>{
        displayProducts();
    });
        btnPanier.addEventListener("click",(e)=>{
         let list = [];
           console.log(list);
          
           if (localStorage.getItem('list')){
            console.log("deja quelque chose");
            list = JSON.parse( localStorage.getItem('list'));
            console.log(list);
           }
            list.push(identifiant);
            console.log("ajouté" + identifiant );
            localStorage.setItem('list',JSON.stringify(list));
        
        console.log('ajout fait'+list);
        });
          
}

  function displayProducts(){
    
   
    let content =
    `<div  class="border border-black px-2">
        <div class="image d-flex justify-content-center mt-1">
           <img src=${products.imageUrl} class="image-ourson">
        </div>
        <p>
            ${products.name}
            <br>${products.price}€
            <br>${products.description}</p>
    </div>`
    document.getElementById('contenu').innerHTML = content;
    listing();
  
}
function listing(){
    let list=[] = products.colors;
    console.log('list des options : '+list);
    for (let i =0;i<list.length;i++){
        let color = list[i];
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
