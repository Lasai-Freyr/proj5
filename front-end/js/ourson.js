const params = new URLSearchParams(window.location.search);
let identifiant = params.get('_id');
let products=[];
let found=[];
listcouleur = document.getElementById("listcouleur");
console.log(identifiant);


getProducts();  

function getProducts(){
    let req = new XMLHttpRequest();
    req.open("GET","http://localhost:3000/api/teddies");
    req.addEventListener("load", () => {
        products = JSON.parse(req.responseText);
        console.log(products);
        for(let i=0; i<products.length;i++){
           let product = products[i];
           if (product._id==identifiant){
                found=product;
               console.log("boucle en cours");
          }
        }        
        console.log(found);
        displayProducts();
        
    });
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send();
} 

async function displayProducts(){
    
   
    let content ='<div  class="col-12 col-md-6">';
    content+='<div class="image">';
    content+='<img src="'+found.imageUrl+'">';
    content+='</div>';
    content +='<p>'+found.name;
    content +='<br>'+found.price+'€';
    content+='<br>'+found.description+'</p></div>';

    
    document.getElementById('shit').innerHTML = content;
    console.log('remplissage');
    listing();
}
function listing(){
    let list=[] = found.colors;
    console.log('list des options : '+list);
    for (let i =0;i<list.length;i++){
        let color = list[i];
        let opt = document.createElement("option");
        opt.textContent=color;
        opt.value=color;
        listcouleur.appendChild(opt);
    }
}