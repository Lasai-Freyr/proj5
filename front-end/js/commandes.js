ajax(basePath)
.then((teddies)=>{
   let prixTotal=0;
   let list =  get('list');      
   let ligneList="";  

   for (let i=0 ; i < list.length ; i++) { 
      let productId = list[i];
      let product = filterProductByID(teddies, productId);
   
      ligneList+=displayProduct(product, 'cart');
      
      let prixUnitaire = parseInt(product.price);
      prixTotal=prixTotal+prixUnitaire;           
   }
   
   ligneList+= `</div>`;
   document.getElementById('total').innerHTML ="Coût total de la commande : "+ prixTotal+" €";
   document.getElementById("content-order").innerHTML =ligneList;  
});