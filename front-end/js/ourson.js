const params = new URLSearchParams(window.location.search);
let identifiant = params.get('_id');
let products=[];
let found=[];
let list=[];

btnPanier = document.getElementById("envoiePanier");

listcouleur = document.getElementById("listcouleur");
console.log(identifiant);


getProducts();  
btnPanier.addEventListener("click",()=>{
   let newarr =[{name:found.name,description : found.description, color :listcouleur.value,price:found.price, id : found._id, image : found.imageUrl}];
   console.table(newarr);
   let longueur = (JSON.parse( localStorage.getItem('list')));
   list=longueur;
   console.log(longueur);
   localStorage.removeItem('list');
   if (longueur==null){
       list=newarr;
   }else{
 
let i=1;
let j=1;
do{
    if(list[i]==null){
        console.table(list);   
        list=list.concat(newarr);
        j=-1
    }else{
        i++;
    }
}while (j>0);
}
localStorage.setItem('list',JSON.stringify(list));
console.table(list);
 

});

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
        console.table(found);
        displayProducts();        
    });
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send();
} 

 function displayProducts(){
    
   
    let content ='<div  class="col-12 col-md-6">';
    content+='<div class="image">';
    content+='<img src="'+found.imageUrl+'">';
    content+='</div>';
    content +='<p>'+found.name;
    content +='<br>'+found.price+'€';
    content+='<br>'+found.description+'</p></div>';

    
    document.getElementById('shit').innerHTML = content;
    document.getElementById("idteddy").setAttribute("value",found._id);
    document.getElementById("nameteddy").setAttribute("value",found.name);
    document.getElementById("priceteddy").setAttribute("value",found.price);
    document.getElementById("imgteddy").setAttribute("value",found.imageUrl);
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
