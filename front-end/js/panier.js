//déclaration des variables//
btn = document.getElementById("submitpanier");
chName = document.getElementById("name");
chFirstName = document.getElementById("firstname");
chEmail = document.getElementById("email");
chAdress = document.getElementById("adress");
chVille = document.getElementById("ville");
formPanier = document.getElementById("formPanier");
contentList = document.getElementById("contentList");

var nomOk = 0;
var prenomOk = 0;
var mailOk = 0;
var adressOk = 0;
var cityOk = 0;
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

btn.addEventListener("click",(e)=>{  
//e.preventDefault();
sendContact();
localStorage.removeItem("list");
});

formPanier.addEventListener('input',()=>{ verifPanier()});

//Déclaration des fonctions//

function getProductsInCart(teddies){
   let ProductdIds =  get('list');  
   let products = [];
   for (let i = 0 ; i < ProductdIds.length ; i++) { 
      let productId = ProductdIds[i];
      let teddy = filterProductByID(teddies, productId);  
      products.push(teddy);
   }
   return products;
}

 function verifInput(){  //vérification validité des champs du formulaire//
   var regex = /^[a-zA-Z]{2,}/;   
   switch ( this){
      case chName :       //vérification validité des champ nom//
         if(!regex.test(this.value)) {
            this.setAttribute("class","form-control is-invalid");
            return  nomOk = false;
         }
         else
         {
            this.setAttribute("class","form-control is-valid");
            return  nomOk = true;
         }          
      break;
      case chFirstName :            //vérification validité des champ prénom//
         if(!regex.test(this.value)) {
            this.setAttribute("class","form-control is-invalid");
            return  prenomOk = false;
         }
         else
         {
            this.setAttribute("class","form-control is-valid");
            return  prenomOk = true;
         }
      break;
      case chVille :    //vérification validité des champ ville//
         if(!regex.test(this.value))
         {
            this.setAttribute("class","form-control is-invalid");
            return cityOk = false;
         }
         else
         {
            this.setAttribute("class","form-control is-valid");
            return  cityOk = true;
         }
      break;
      case chEmail :    //vérification validité des champ email//
         regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
         if(!regex.test(this.value))
         {
            this.setAttribute("class","form-control is-invalid");
            return mailOk = false;
         }
         else
         {
            this.setAttribute("class","form-control is-valid");
            return  mailOk = true;
         }
      break;
      case chAdress ://vérification validité des champ adresse//
         regex = /^[a-zA-Z0-9._-]{2,}/;
         if(!regex.test(this.value))
         {
            this.setAttribute("class","form-control is-invalid");
            return adressOk = false;
         }
         else
         {
            this.setAttribute("class","form-control is-valid");
            return  adressOk = true;
         }
      break;
   }   
}

function verifPanier() //fonction de déverouillage du bouton submit si tout les champs du formulaire sont valides//
{
   chName.oninput = verifInput;
   chFirstName.oninput = verifInput;
   chEmail.oninput = verifInput;
   chAdress.oninput = verifInput;
   chVille.oninput = verifInput;
   if(nomOk && prenomOk && mailOk && adressOk && cityOk )
   {
      btn.removeAttribute("disabled");
      return true;
   } 
   btn.setAttribute("disabled","true");
   return false;     
}

function sendContact(){  //fonction d'envoie des données de la commande au serveur et récupération de la réponse
   let contact = {
      firstName : chFirstName.value,
      lastName : chName.value,
      address : chAdress.value,
      city : chVille.value,
      email : chEmail.value,
   };
   var body = {
      "contact" : contact,
      "products" : products,
   };
   ajax("POST", `${basePath}/order`, JSON.stringify(body))
      .then( (response) => {
         console.log(response);
         store("order",response);
      })
}