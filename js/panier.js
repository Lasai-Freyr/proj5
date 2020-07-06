
btn = document.getElementById("submitpanier");

async function surligne(champ, erreur) //fonction de vérification validité du champ//
{
   if(erreur)
      champ.style.backgroundColor = "#fba";
   else
      champ.style.backgroundColor = "";
}

async function verifNom(name) //vérification validité du champ nom//
{   
    var nom = /^[a-zA-Z]{2,}/;
    if(!nom.test(name.value))
   {
      surligne(name, true);
      return false;
   }
   else
   {
      surligne(name, false);
      return true;
   }
}

async function verifMail(mail) //vérification validité du champ email//
{
   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   if(!regex.test(mail.value))
   {
      surligne(mail, true);
      return false;
   }
   else
   {
      surligne(mail, false);
      return true;
   }
}

async function verifTel(numtel) //vérification validité du champ numéro de téléphone//
{
    var tel = /^[0-9]{10,10}/;
   if(!tel.test(numtel.value))
   {
      surligne(numtel, true);
      return false;
   }
   else
   {
      surligne(numtel, false);
      return true;
   }
}

async function verifAdress(adress) //vérification validité du champ adresse postale//
{
    var adresse = /^[a-zA-Z0-9._-]{2,}/;
    if(!adresse.test(adress.value))
   {
      surligne(adress, true);
      return false;
   }
   else
   {
      surligne(adress, false);
      return true;
   }
}

    function verif_panier(f) //fonction de déverouillage du bouton submit si tout les champs valides//
{
    
    var nomOk = verifNom(f.name);
    var mailOk = verifMail(f.mail);
    var telOk = verifTel(f.numtel);
    var adressOk = verifAdress(f.adress);
    
    if(nomOk && mailOk && telOk && adressOk)
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

