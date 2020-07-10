btn = document.getElementById("submitpanier");
chName = document.getElementById("name");
chEmail = document.getElementById("email");
chNumTel = document.getElementById("numtel");
chAdress = document.getElementById("adress");
chVile = document.getElementById("ville");
contentList = document.getElementById("contentList");
const params = new URLSearchParams(window.location.search);
let color = params.get('couleur');
let identifiant = params.get('_id');
let name = params.get('name');
let price = params.get('price');
let image = params.get('imageUrl');
let errorColor='rgb('+(222)+','+(43)+','+(31)+')';
let okColor='rgb('+(31)+','+(210)+','+(222)+')';
let list=[];
   let eltlist=[color,identifiant,name,price,image];
let bear=[];
let keyValue='';






listpanier();
//localStorage.clear();  
console.log(identifiant);
chName.addEventListener('onchange', verifNom(name));
chEmail.addEventListener('onchange',   verifMail(mail));
chNumTel.addEventListener('onchange',  verifTel(numtel));
chAdress.addEventListener('onchange',  verifAdress(adress));
chVile.addEventListener('onchange',  verifVille(ville));
verif_panier(f);
console.log(name);





function listpanier(){  
   let resultb = window.localStorage.getItem('bear');
   let resultbok = JSON.parse(resultb);
   console.log(resultbok);
   list.push(eltlist);
   console.log(list);
let i=1;
let key=0;
do{
   console.log('key='+key);
   let varrabl=window.localStorage.getItem(key);
   let varrablok = JSON.parse(varrabl);
   console.log(varrablok);
   if(varrablok==null){
      window.localStorage.setItem(key,JSON.stringify(list));
      console.log("ajouté");
      i=0;
   }else{
      console.log("un de présent");      
      key=key+1;
      console.log("key prend la valeur "+key) ;     
   }
}while(i>0);
keyValue=key;
console.log(keyValue);

   console.log(JSON.parse(window.localStorage.getItem(0)));
   console.log(JSON.parse(window.localStorage.getItem(1)));
   console.log(JSON.parse(window.localStorage.getItem(2)));

   window.localStorage.setItem('liste',JSON.stringify(list));
   let result = window.localStorage.getItem('liste');
   let resultok = JSON.parse(result); 
   console.log(resultok);
   displaylist();   
}

function displaylist(){
  

let ligneList="<div>";
   for (let j=0;j<keyValue+1;j++){
      let keydisplay=j;
      console.log('keydisplay='+keydisplay);
      let varrabl=window.localStorage.getItem(keydisplay);
      let varrablok = JSON.parse(varrabl);
      console.log(varrablok);   
         for(let i=0;i<varrablok.length;i++){
            let ligne=varrablok[i];
         ligneList+="<div class='row'>";
        
         ligneList+='<img src='+ligne[4]+'>';
         ligneList+=ligne[2]+'<br>';
         ligneList+='couleur '+ligne[0];
         ligneList+='<br>'+ligne[3]+'€</p>';
         ligneList+="</div>";
         console.log(ligne[0]);
         console.log(ligne[2]);        
         }         
      }
         ligneList+="</div>";
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
