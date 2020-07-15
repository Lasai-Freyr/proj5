let order = localStorage.getItem("command");
console.log("la commande contient" +order);
let contentOrder = document.getElementById("content-order");


ajax("http://localhost:3000/api/teddies")
.then((products)=>{
   
    displayOrder();
});

function displayOrder(){
    let listing=localStorage.getItem('command');
    let list = JSON.parse(listing);
    console.log(list);
    let ligneList="<div class='col-12 px-0 justify-content-center'>"; 
    ligneList+=`
      <div class='row col-12 px-0'> 
         <div class="col-12 text-center">         
               <p>
                  Numéro de la commande : ${list[0]}
               </p>
         </div>
      </div>`
    for(let i=0;i<list[2].length;i++){
       let idproduct=list[2][i];
       for(j=0;j<products.length;j++){ 
          let product=products[j];
          if(product._id==idproduct){ 
          
             ligneList+=
             `<div class='row justify-content-center col-12 border border-dark'> 
                <div class="col-6" >
                   <img src=${product.imageUrl} class="image-panier">
                </div>
                <div class="col-6 text-right" id="text">
                   <p>
                      ${product.name}<br>
                      <br>${product.price} €
                   </p>
                </div>
             </div>`
          }
        }
    }
      ligneList+=`
      <div class='row col-12'> 
         
         <div class="col-12 text-right">
            <p>
               Coût de la commande : ${list[1]} €
            </p>
         </div>
      </div>`
    contentOrder.innerHTML=ligneList;  
}
   