btn = document.getElementById("submitpanier");
chName = document.getElementById("name");
chFirstName = document.getElementById("firstname");
chEmail = document.getElementById("email");
chAdress = document.getElementById("adress");
chVile = document.getElementById("ville");
formPanier = document.getElementById("formPanier");
contentList = document.getElementById("contentList");
let products=[];
let list =[];


// localStorage.clear();
ajax(basePath)  //fonction appelant les données des produits ours au server         
   .then((teddies)=>{
      let prixTotal=0;
      list =  get('list'); 
      console.log(list);     
      let ligneList=""; 
      if (list.length==null){
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

chName.addEventListener('onchange',() =>{ verifNom(name)});
chFirstName.addEventListener('onchange',()=>{ verifPrenom(firstname)});
chEmail.addEventListener('onchange',  ()=>{ verifMail(email)});
chAdress.addEventListener('onchange',()=>{ verifAdress(adress)});
chVile.addEventListener('onchange', ()=>{ verifVille(ville)});
formPanier.addEventListener('input',()=>{ verifPanier()});

//fonctions pour la   validation du formulaire//

 function verifNom(name) //vérification validité du champ nom//
{   
    var nom = /^[a-zA-Z]{2,}/;
    if(!nom.test(chName.value))
   {
      chName.setAttribute("class","form-control is-invalid");
      return false;
   }
   else
   {
      chName.setAttribute("class","form-control is-valid");
      return true;
   }
}

function verifPrenom(firstname) //vérification validité du champ prénom//
{   
    var prenom = /^[a-zA-Z]{2,}/;
    if(!prenom.test(chFirstName.value))
   {
      chFirstName.setAttribute("class","form-control is-invalid");
      return false;
   }
   else
   {
      chFirstName.setAttribute("class","form-control is-valid");
      return true;
   }
}

 function verifMail(chEmail) //vérification validité du champ email//
{
   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   if(!regex.test(chEmail.value))
   {
      chEmail.setAttribute("class","form-control is-invalid");
      return false;
   }
   else
   {
      chEmail.setAttribute("class","form-control is-valid");
      return true;
   }
}

 
 function verifAdress(adress) //vérification validité du champ adresse postale//
{
    var adresse = /^[a-zA-Z0-9._-]{2,}/;
    if(!adresse.test(adress.value))
   {
      adress.setAttribute("class","form-control is-invalid");
      return false;
   }
   else
   {
      adress.setAttribute("class","form-control is-valid");
      return true;
   }
}

 function verifVille(ville) //vérification validité du champ ville//
{
    var city = /^[a-zA-Z0-9._-]{2,}/;
    if(!city.test(ville.value))
   {
      ville.setAttribute("class","form-control is-invalid");
      return false;
   }
   else
   {
      ville.setAttribute("class","form-control is-valid");
      return true;
   }
}

function verifPanier() //fonction de déverouillage du bouton submit si tout les champs valides//
{    
   var nomOk = verifNom(name);
   var prenomOk = verifPrenom(firstname);
   var mailOk = verifMail(email);
   var adressOk = verifAdress(adress);
   var cityOk = verifVille(ville);
   
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
      city:chVile.value,
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
  
   console.log(body.contact);
   console.log(body.contact.firstName);
   console.log(body.products);

   req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
   req.send(JSON.stringify(body));
}