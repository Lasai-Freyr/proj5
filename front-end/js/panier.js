//déclaration des variables//
btn = document.getElementById("submitpanier");
formPanier = document.getElementById("formPanier");
contentList = document.getElementById("contentList");

//scénario//

// localStorage.clear();
ajax("GET", basePath)  
   .then((teddies) => {
      if (!get('list')) {
         document.getElementById("empty_cart").classList.add("visible");
         document.getElementById("container_form").classList.add("invisible");
         return
      }
      
      document.getElementById("empty_cart").classList.add("invisible");
      products = getProductsInCart(teddies);     
       
      displayProductsInCart(products);
      displayTotal(products);
});

btn.addEventListener("click",(e) =>  {  
sendContact();
});

formPanier.addEventListener('input',() =>  { 
   btn.setAttribute("disabled","true");

   if (verifPanier()) {      
      btn.removeAttribute("disabled");
   }
});

//Déclaration des fonctions//

function getProductsInCart(teddies) {
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
   let regextext = /^[a-zA-Z]{2,}/;
   let regexemail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   let regexaddress = /^[a-zA-Z0-9._-]{2,}/;
   let status = false;
   
   status = eval('regex' + type).test(value);
   
   if (!status){
      element.setAttribute("class", "form-control is-invalid");
   } else{
      element.setAttribute("class", "form-control is-valid");
   }

   return status;
}

function verifPanier() //fonction de déverouillage du bouton submit si tout les champs du formulaire sont valides//
{
return(
   isInputValid('name', "text")
   && isInputValid('firstname', 'text') 
   && isInputValid('email', 'email') 
   && isInputValid('address', 'address')
   && isInputValid('ville', 'text') );    
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
         console.log(response);
         store("order",response);
         remove("list");
         redirectTo('commandes');
      })
}

function filterProductByID(teddies, id){ // fonction pour filtrer la liste de l'API pour ressortir les produits sélectionnés
   let teddy = teddies.filter( function(teddy) {

      if (teddy._id === id){
         return true;
      }

   return false;
    });
    return teddy[0];
 }