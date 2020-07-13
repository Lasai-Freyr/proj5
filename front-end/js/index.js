let products = [];

ajax("http://localhost:3000/api/teddies")
.then((products)=>{
    displayProducts();
});


function displayProducts(){
    let teddyList = "<ul classe='products '>";    
   for(let i=0; products.length; i++){
       console.log('salamandre');
       let product=products[i];
       teddyList +=displayProduct(product);
   }    
    teddyList +='</ul>';
    document.getElementById('productsListing').innerHTML =  teddyList;
}
