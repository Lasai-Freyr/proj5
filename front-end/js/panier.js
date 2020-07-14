btn = document.getElementById("submitpanier");
chName = document.getElementById("name");
chEmail = document.getElementById("email");
chNumTel = document.getElementById("numtel");
chAdress = document.getElementById("adress");
chVile = document.getElementById("ville");
contentList = document.getElementById("contentList");
let errorColor='rgb('+(222)+','+(43)+','+(31)+')';
let okColor='rgb('+(31)+','+(210)+','+(222)+')';
let commandList=[];
  


// localStorage.clear();
ajax(`http://localhost:3000/api/teddies/`)           
   .then((products)=>{
   displaylist();  
   });

btn.addEventListener("click",(e)=>{   
   console.log(commandList);
   localStorage.setItem('command',JSON.stringify(commandList));  
   console.log('ajout fait'+commandList);
});

chName.addEventListener('onchange', verifNom(name));
chEmail.addEventListener('onchange',   verifMail(mail));
chNumTel.addEventListener('onchange',  verifTel(numtel));
chAdress.addEventListener('onchange',  verifAdress(adress));
chVile.addEventListener('onchange',  verifVille(ville));
verif_panier(f);
console.log(name);


function displaylist(){
   let prixTotal=0;
   let listing=localStorage.getItem('list');
   let list = JSON.parse(listing);
   console.log(list);
   commandList=list;
   let ligneList="<div>";   
   for(let i=0;i<list.length;i++){
      let idproduct=list[i];
      for(j=0;j<products.length;j++){ 
         let product=products[j];
         if(product._id==idproduct){ 
         
            ligneList+=
            `<div class='row'>        
            <img src=${product.imageUrl}>
            <p>
               ${product.name}<br>
               <br>${product.price}€
            </p>
         </div>`
            let prixUnitaire = parseInt(product.price);
            prixTotal=prixTotal+prixUnitaire;   
         }     
      }
   }
   ligneList+=
   `</div>
   <div class="row">
      <p> Prix total= ${prixTotal} €</p>
   </div>`
   contentList.innerHTML+=ligneList; 
}



//fonctions pour la   validation du formulaire//

 function verifNom(name) //vérification validité du champ nom//
{   
    var nom = /^[a-zA-Z]{2,}/;
    if(!nom.test(name.value))
   {
      name.style.backgroundColor='#DE2B1F';
      return false;
   }
   else
   {
      name.style.backgroundColor=okColor;
      return true;
   }
}

 function verifMail(mail) //vérification validité du champ email//
{
   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   if(!regex.test(mail.value))
   {
      mail.style.backgroundColor='#DE2B1F';
      return false;
   }
   else
   {
      mail.style.backgroundColor=okColor;
      return true;
   }
}

 function verifTel(numtel) //vérification validité du champ numéro de téléphone//
{
    var tel = /^[0-9]{10,10}/;
   if(!tel.test(numtel.value))
   {
      numtel.style.backgroundColor='#DE2B1F';
      return false;
   }
   else
   {
      numtel.style.backgroundColor=okColor;
      return true;
   }
}

 function verifAdress(adress) //vérification validité du champ adresse postale//
{
    var adresse = /^[a-zA-Z0-9._-]{2,}/;
    if(!adresse.test(adress.value))
   {
      adress.style.backgroundColor='#DE2B1F';
      return false;
   }
   else
   {
      adress.style.backgroundColor=okColor;
      return true;
   }
}

 function verifVille(ville) //vérification validité du champ ville//
{
    var city = /^[a-zA-Z0-9._-]{2,}/;
    if(!city.test(ville.value))
   {
      ville.style.backgroundColor='#DE2B1F';
      return false;
   }
   else
   {
      ville.style.backgroundColor=okColor;
      return true;
   }
}

function verif_panier(f) //fonction de déverouillage du bouton submit si tout les champs valides//
{    
   var nomOk = verifNom(f.name);
   var mailOk = verifMail(f.mail);
   var telOk = verifTel(f.numtel);
   var adressOk = verifAdress(f.adress);
   var cityOk = verifVille(f.ville);
   
   if(nomOk && mailOk && telOk && adressOk && cityOk)
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
