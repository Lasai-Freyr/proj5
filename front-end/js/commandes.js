//déclaration des variables//
contentList = document.getElementById("content-order");
let order = get("order");

//scénario//

if (!order){
   document.getElementById("alert").innerText = " Vous n'avez passé aucune commande";
}else{
   let products = order.products;
   document.getElementById('order_id').innerHTML = " numéro de commande : "+order.orderId;

   displayProductsInCart(products);
   displayTotal(products);
}