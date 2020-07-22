//déclaration des variables//
btn = document.getElementById("submitpanier");
chName = document.getElementById("name");
chFirstName = document.getElementById("firstname");
chEmail = document.getElementById("email");
chAdress = document.getElementById("adress");
chVille = document.getElementById("ville");
formPanier = document.getElementById("formPanier");
contentList = document.getElementById("contentList");
let products=[];
let list =[];
var nomOk =0;
var prenomOk=0;
var mailOk = 0;
var adressOk = 0;
var cityOk = 0;

//scénario//

// localStorage.clear();
ajax(basePath)  //fonction appelant les données des produits ours au server         
   .then((teddies)=>{
      let prixTotal=0;
      list =  get('list'); 
      console.log(list);     
      let ligneList=""; 
      if (!list){
         document.getElementById("empty_cart").classList.add("visible");

      }else{ 
         document.getElementById("empty_cart").classList.add("invisible");
         for (let i=0 ; i < list.length ; i++) { 
            let productId = list[i];
            let teddy = filterProductByID(teddies, productId);
         
            ligneList+=displayProduct(teddy, 'cart');
            
            let prixUnitaire = parseInt(teddy.price);
            prixTotal=prixTotal+prixUnitaire;           
         }
         
         ligneList+= `</div>`;
         document.getElementById('total').innerHTML = prixTotal+" €";
         contentList.innerHTML+=ligneList;
         products=list;  
      }    
   });

btn.addEventListener("click",(e)=>{  
e.preventDefault();

localStorage.removeItem("list");
sendContact();
});

chName.oninput= verifInput;
chFirstName.oninput= verifInput;
chEmail.oninput = verifInput;
chAdress.oninput = verifInput;
chVille.oninput = verifInput;

formPanier.addEventListener('input',()=>{ verifPanier()});

//Déclaration desfonctions//

 function verifInput() //vérification validité des champs du formulaire//
{
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
   if(nomOk && prenomOk && mailOk && adressOk && cityOk && list.length!==null)
   {
      btn.removeAttribute("disabled");
      return true;
   }
   else
   {
      btn.setAttribute("disabled","true");
      return false;
   }
   
}

function sendContact() // envoie des données du client au serveur
{
   let req = new XMLHttpRequest();   
   req.open('POST',`${basePath}/order`);
   let contact = {
      firstName:chFirstName.value,
      lastName:chName.value,
      address:chAdress.value,
      city:chVille.value,
      email:chEmail.value,
   };

   var body = {
      "contact":contact,
      "products":products,
   };
   req.onreadystatechange = function() {
      console.log(req.status);
      if (req.readyState == 4 && req.status == 201) {
          var response = JSON.parse(req.responseText);
          console.log(response);
          store("order",JSON.stringify(response));
      }else{console.log("retour requete mais problème réponse")}
  };
   console.log(JSON.stringify(body));  
   console.log(body); 

   req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
   req.send(JSON.stringify(body));
}