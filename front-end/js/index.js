let products = [];

getProducts();

function getProducts(){
    let req = new XMLHttpRequest();
    req.open("GET","http://localhost:3000/api/teddies");
    req.addEventListener("load", () => {
        products = JSON.parse(req.responseText);
        displayProducts();
    });
    req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    req.send();
}

function displayProducts(){
    console.log("products contient "+products.length+" éléments");
    let teddyList = "<ul classe='products '>";    
    console.log('pinguin');
    
    for (let i=0;i<products.length;i++){
        console.log('pinguin2');
        
        console.log(products)
        let product=products[i];       
        teddyList +='<li class="list-unstyled list'+i+' ">';
        teddyList += '<div class="card border-success col-6  mb-3 mb-md-5">';
        teddyList +='<a href="ourson.html?_id='+product._id+'" class="stretched-link" id="lien"><img src="../images/teddy_'+[i+1]+'b.jpg"></a>';        
        teddyList+='</form>';
        teddyList +='<div class="card-body">';
        teddyList +='<h5 class="card-title">'+product.name;
        teddyList +='</h5>';
        teddyList += '<p class="card-text ">';
        teddyList +=product.price+"€<br>";
        teddyList +=product.description;
        teddyList +='</p>';
        teddyList +='</div>';
        teddyList +='</div>';
        teddyList +='</li>'; 
       
    }
    teddyList +='</ul>';
    document.getElementById('productsListing').innerHTML =  teddyList;
};
