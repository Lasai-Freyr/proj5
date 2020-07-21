ajax(basePath)
.then((products)=>{   
    displayProducts(products);
});

function displayProducts(products){
    let teddyList = "<ul class='products text-center align-content-center col-12'>";    
   for(let i=0;i<products.length; i++){  
       let product=products[i];     
       teddyList +=displayProduct(product , 'card');
   }    
    teddyList +='</ul>';
    document.getElementById('productsListing').innerHTML =  teddyList;
}