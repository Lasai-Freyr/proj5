let products=[];
let found=[];

btnPanier = document.getElementById("envoiePanier");

listcouleur = document.getElementById("listcouleur");
console.log(identifiant);

getId();
getProducts();  


function getProducts(){
    ajax(`http://localhost:3000/api/${identifiant}`)
    .then((products)=>{
        displayProducts();
        btnPanier.addEventListener("click",(e)=>{
            e.preventDefault();
         let list = [];
           console.log(list);
          
           if (localStorage.getItem('list')){
            console.log("deja quelque chose");
            list = JSON.parse( localStorage.getItem('list'));
            console.log(list);
           }
               list.push(identifiant);
               console.log("ajouté" + identifiant );
            localStorage.setItem('list',JSON.stringify(list));
        
        console.log('ajout fait'+list);
        });
    });        
        console.table(found);    
}

  function displayProducts(){
    
   
    let content ='<div  class="col-12 col-md-6">';
    content+='<div class="image">';
    content+='<img src="'+found.imageUrl+'">';
    content+='</div>';
    content +='<p>'+found.name;
    content +='<br>'+found.price+'€';
    content+='<br>'+found.description+'</p></div>';

    
    document.getElementById('shit').innerHTML = content;
    document.getElementById("idteddy").setAttribute("value",found._id);
    document.getElementById("nameteddy").setAttribute("value",found.name);
    document.getElementById("priceteddy").setAttribute("value",found.price);
    document.getElementById("imgteddy").setAttribute("value",found.imageUrl);
    console.log('remplissage');
    listing();
  
}
function listing(){
    let list=[] = found.colors;
    console.log('list des options : '+list);
    for (let i =0;i<list.length;i++){
        let color = list[i];
        let opt = document.createElement("option");
        opt.textContent=color;
        opt.value=color;
        listcouleur.appendChild(opt);
    }
}

function getId(){
    const params = new URLSearchParams(window.location.search);
    return params.get('_id');
}
