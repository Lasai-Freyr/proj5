ajax(basePath)
.then((teddies)=>{   
    displayProducts(teddies);
});

function displayProducts(teddies){
    let teddyList = "<ul class='products text-center align-content-center col-12'>";    
   for(let i=0;i<teddies.length; i++){  
       let teddy=teddies[i];     
       teddyList +=displayProduct(teddy , 'card');
   }    
    teddyList +='</ul>';
    document.getElementById('productsListing').innerHTML =  teddyList;
}