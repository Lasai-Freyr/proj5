let order = get("order");
console.log(order);

   let prixTotal=0;
   let list =  order.products;
   console.log(list);
   let ligneList="";
   document.getElementById('order_id').innerHTML = " numéro de commande : "+order.orderId;

   for (let i=0 ; i < list.length ; i++) {     
   
      ligneList+=displayProduct(list[i], 'cart');
      
      let prixUnitaire = parseInt(list[i].price);
      prixTotal=prixTotal+prixUnitaire;           
   }
   
   ligneList+= `</div>`;
   document.getElementById('total').innerHTML ="Coût total de la commande : "+ prixTotal+" €";
   document.getElementById("content-order").innerHTML =ligneList;