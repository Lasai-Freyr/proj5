btn = document.getElementById("submitpanier");
chName = document.getElementById("name");
chFirstName = document.getElementById("firstname");
chEmail = document.getElementById("email");
chAdress = document.getElementById("adress");
chVile = document.getElementById("ville");
formPanier = document.getElementById("formPanier");
contentList = document.getElementById("contentList");
let commandList=[];
  


// localStorage.clear();
ajax(`http://localhost:3000/api/teddies/`)  //fonction appelant les données des produits ours au server         
   .then((products)=>{
   displaylist();  
   });

btn.addEventListener("click",(e)=>{  
  // e.preventDefault();
   console.log(commandList);
   let idOrder =  makeIdOrder(length=8);
   commandList.unshift(idOrder);
   localStorage.setItem('command',JSON.stringify(commandList));  
   console.log('commande réalisée '+commandList);
   localStorage.removeItem("list");
   sendContact();
});

chName.addEventListener('onchange',() =>{
   verifNom(name)});
chFirstName.addEventListener('onchange',()=>{
 verifPrenom(firstname)});
chEmail.addEventListener('onchange',  ()=>{
 verifMail(email)});
chAdress.addEventListener('onchange',()=>{
     verifAdress(adress)});
chVile.addEventListener('onchange', ()=>{
    verifVille(ville)});
formPanier.addEventListener('input',()=>{
verif_panier()});

function displaylist() // fonction d'affichage de la liste du panier
{
   let prixTotal=0;
   let listing=localStorage.getItem('list');
   let list = JSON.parse(listing);
   console.log(list);   
   let ligneList="";   
   for(let i=0;i<list.length;i++){
      let idproduct=list[i];
      for(j=0;j<products.length;j++){ 
         let product=products[j];
         if(product._id==idproduct){ 
         
          ligneList+=
            `<div class='row border border-dark col-12 col-lg-8 px-0 mx-auto'> 
               <div class="col-6" >
                  <img src=${product.imageUrl} class="image-panier">
               </div>
               <div class="col-6 text-right mt-3" id="text">
                  <p>
                     ${product.name}<br>
                     ${product.price} €
                  </p>
               </div>
            </div>`
            let prixUnitaire = parseInt(product.price);
            prixTotal=prixTotal+prixUnitaire;   
         }     
      }
   }
   ligneList+=
   `</div>
   <div class="row col-12 d-flex text-right px-0 mx-0">
      <div class="col-12 col-lg-10 px-3">
         <p> Prix total= ${prixTotal} €</p>
      </div>
   </div>`
   contentList.innerHTML+=ligneList;
   commandList.push(prixTotal); 
   commandList.push(list);
}

function makeIdOrder(length=8) //création du numéro de l'identification de la commande
{
   let number = Math.random().toString(20).substr(2,length);
   let idcom = "ID"+number;
   return idcom;
}

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

function verif_panier() //fonction de déverouillage du bouton submit si tout les champs valides//
{    
   var nomOk = verifNom(name);
   var prenomOk = verifPrenom(firstname);
   var mailOk = verifMail(email);
   var adressOk = verifAdress(adress);
   var cityOk = verifVille(ville);
   
   if(nomOk && prenomOk && mailOk && adressOk && cityOk)
   {
      btn.removeAttribute("disabled");
      return true;
   }
   else
   {
      btn.setAttribute("disabled","true")
      return false;
   }
   
}

function sendContact() // envoie des données du client au serveur
{
   let reqContact = new XMLHttpRequest();
   reqContact.open('POST',`http://localhost:3000/api/teddies/order`);
   let contact = [{"nom": chName.value,"prénom":chFirstName.value,"adresse":chAdress.value,"ville" : chVile.value,"email":chEmail.value}];          
   console.table(contact);
   reqContact.setRequestHeader("Content-Type","application/json;charset=UTF-8");
   reqContact.send(JSON.stringify(contact));
}