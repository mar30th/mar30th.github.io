
var product = [];
fetch("json/product.json")
.then(function (response) { 
  return response.json ();  
})
.then(data =>{ 
  displayImages(data);
  localStorage.setItem('productList', JSON.stringify(data))
});
product = JSON.parse(localStorage.getItem('productList'))

// search specific product
$("#formSearch").submit(function (e) {
  e.preventDefault();
  let search = $("#search").val();
  let re = new RegExp(search, "ig");
  let subdata = product.filter(item => item.name.search(re) >= 0);
  displayImages(subdata);
});


// Filter for product brands
$("input[type=checkbox]").click(function () {

  let brands = $(".chk-brand:checked").map(function () { return $(this).val() }).toArray().toString();
  
  let subdatas = (brands.length==0)?product: product.filter(item => brands.search(item.brand) >= 0);
  
  displayImages(subdatas);

});


// Display product list
function displayImages (item) {
  let placeholder = document.querySelector(".product-display");
  let out = "";
  for (let i = 0; i < item.length; i++) {
    out += `
    <div class="divImage row">
      <div class="product-list" data-id="${item[i].id}" data-name="${item[i].name}" data-price="${item[i].price}" data-description="${item[i].description}">
      <a class="addButtonCircular addToCompare float-end">+</a>
        <a href="product_detail.html?id=${i}" class="product-img">              
            <img src="${item[i].img}" alt="img" class="productImg">    
          <div class="mt-3 ">
            <div class="product-name">${item[i].name}</div>
            <div class="product-price">$${item[i].price}</div>
          </div>
        </a>
      </div>
    </div>
      `;
  }
  placeholder.innerHTML = out;
};