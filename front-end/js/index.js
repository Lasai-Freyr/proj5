let products = [];

ajax("http://localhost:3000/api/teddies")
.then((products)=>{
   
    displayProducts();
});


function displayProducts(){
    let teddyList = "<ul class='products text-center align-content-center col-12'>";    
   for(let i=0;i<products.length; i++){
       console.log('salamandre');
  
       let product=products[i];
       console.log('_id dans displayProducts() : '+ product._id);
       teddyList +=displayProduct(product);
   }    
    teddyList +='</ul>';
    document.getElementById('productsListing').innerHTML =  teddyList;
}
