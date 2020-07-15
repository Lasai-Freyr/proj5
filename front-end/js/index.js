let products = [];

ajax("http://localhost:3000/api/teddies")
.then((products)=>{
   
    displayProducts();
});


function displayProducts(){
    let teddyList = "<ul classe='products text-center d-flex align-content-center'>";    
   for(let i=0;i<products.length; i++){
       console.log('salamandre');
  
       let product=products[i];
       console.log('_id dans displayProducts() : '+ product._id);
       teddyList +=displayProduct(product);
   }    
    teddyList +='</ul>';
    document.getElementById('productsListing').innerHTML =  teddyList;
}
