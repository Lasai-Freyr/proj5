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
    let teddyList = "<ul classe='products list-unstyled'>";
    console.log('pinguin');
    for (let i=0;i<products.length;i++){
        console.log('pinguin2');
        console.log(products)
        let product=products[i];        
        teddyList +='<li>';
        teddyList += '<div class="card border-success  mb-3 mb-md-5">';
        teddyList +='<a href="ourson.html" class="stretched-link"><img src="../images/teddy_'+[i+1]+'b.jpg"></a>';
        teddyList +='<div class="card-body">';
        teddyList +='<h5 class="card-title">'+product.name;
        teddyList +='</h5>';
        teddyList += '<p class="card-text text-break">';
        teddyList +='Magnifique Ourson en peluche fait main.';
        teddyList +='</p>';
        teddyList +='</div>';
        teddyList +='</div>';
        teddyList +='</li>';       
    }
    teddyList +='</ul>';
    document.getElementById('productsListing').innerHTML =  teddyList;
};