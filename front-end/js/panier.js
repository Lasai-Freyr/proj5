//scénario//

//localStorage.clear();
ajax("GET", basePath)  
   .then((teddies) => {
      if (!get('list')) {
        makeVisible("empty_cart");
         makeInvisible("container_form");
         return
      }
      
      makeInvisible("empty_cart");
      products = getProductsInCart(teddies);     
       
      displayProductsInCart(products);// fonction dans utils.js
      displayTotal(products);// fonction dans utils.js
});

document.getElementById("submitpanier").addEventListener("click",() =>  {  
   if (isPanierValid()) {  
      sendContact();
   }

});

//Déclaration des fonctions//

function getProductsInCart(teddies) {// fonction pour récupéré les données des produit en fonction des id sauvegardés dans list
   let ProductdIds =  get('list');  
   let products = [];

   for (let i = 0 ; i < ProductdIds.length ; i++) { 
      let productId = ProductdIds[i];
      let teddy = filterProductByID(teddies, productId);  
      products.push(teddy);
   }

   return products;
}

 function isInputValid(idElement , type){  //vérification validité des champs du formulaire
   let element = document.getElementById(idElement);
   let value = element.value;
   let regexes = {
   "text" : /^[a-zA-Z]{2,}/,
   "email" : /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,
   "address" : /^[a-zA-Z0-9._-]{2,}/
   };
   
   let status = false;
   
   status = regexes[type].test(value);
   
   if (!status){
      element.setAttribute("class", "form-control is-invalid");
   } else{
      element.setAttribute("class", "form-control is-valid");
   }

   return status;
}

function isPanierValid() //fonction de déverouillage du bouton submit si tout les champs du formulaire sont valides//
{  let testName = isInputValid('name', "text");
   let testFirstname = isInputValid('firstname', 'text'); 
   let testEmail = isInputValid('email', 'email') ;
   let testAddress = isInputValid('address', 'address');
   let testVille = isInputValid('ville', 'text')

   if(testName && testFirstname && testEmail && testAddress && testVille)  {
         return true;
      }else{
         return false;
      }
}

function sendContact()  {  //fonction d'envoie des données de la commande au serveur et récupération de la réponse
   let contact = {
      firstName : document.getElementById("firstname").value,
      lastName : document.getElementById("name").value,
      address : document.getElementById("address").value,
      city : document.getElementById("ville").value,
      email : document.getElementById("email").value,
   };

   var body = {
      "contact" : contact,
      "products" : products,
   };

   ajax("POST", `${basePath}/order`, JSON.stringify(body))
      .then( (response) => {
         store("order",response);
         remove("list"); 
         redirectTo('commandes');
      })
}

function filterProductByID(teddies, id){ // fonction pour filtrer la liste de l'API pour ressortir le produit sélectionné
   let teddy = teddies.filter( function(teddy) {

      if (teddy._id === id){
         return true;
      }

   return false;
    });
    return teddy[0];
 }