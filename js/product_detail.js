function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

const id = getParameterByName('id');

fetch("json/product.json")
.then(function (response) { 
  return response.json ();  
})
.then(function (product) {
  console.log(product[id]);
  let placeholder = document.querySelector(".product-detail");
  let out = 
  `
  <div class="row">
    <div class="col-md-6 img-div mt-3 p-3">
      <div class ="img-detail">
        <img src="${product[id].img}" alt='img'>
      </div>
    </div>
    
    <div class="col-md-6 mt-3">
      <div class ="detail-info">
        <div class ="row info-contain mb-4">
          <div><h1>${product[id].name}</h1></div>
          <div><h4>$${product[id].price}</h4></div>
          <div><b>Color:</b> ${product[id].color}</div>
        </div>
        <div class ="row desc-info mb-4">
          <div><b>Description:</b> ${product[id].description}</div>
        </div>
        <p><a href="#" class="add-to-cart addCart btn btn-secondary" data-image="${product[id].img}" data-name="${product[id].name}" data-price="${product[id].price}" onclick="addCart('${product[id].img}','${product[id].name}','${product[id].price}')">Add to cart</a></p>
        </div>
    </div>
  </div>
    `
  placeholder.innerHTML = out
});
// =============================
// Add Item Cart
// =============================


var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  function Item(img, name, price, count) {
    this.img = img
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(img, name, price, count) {
    for(var i in cart) {
      if(cart[i].name === name) {
        cart[i].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(img, name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var i in cart) {
        if(cart[i].name === name) {
          cart[i].count --;
          if(cart[i].count === 0) {
            cart.splice(i, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var i in cart) {
      if(cart[i].name === name) {
        cart.splice(i, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var i in cart) {
      totalCount += cart[i].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var i in cart) {
      totalCart += cart[i].price * cart[i].count;
    }
    return Number(totalCart);
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
function addCart (img, name, price) {
  shoppingCart.addItemToCart(img, name, price, 1);
  displayCart();
  var sizeProduct = sessionStorage.getItem("sizeItem")
  alert("Product added to cart successfully!");
  window.location = 'stellar_product.html'
}

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i = 0; i < cartArray.length; i++) {
    output += 
    `<div class="cart row mb-5">
    <div class="col-md-5">
      <div class="product-img"><img src="${cartArray[i].img}" alt="img"></div>
    </div>
    <div class="col-md-7">
    <button class='delete-item btn float-end' data-name="${cartArray[i].name}">
    X
    </button>
      <div>
        <div class="product-name"><h1>${cartArray[i].name.toUpperCase()}</h1></div>
        <div class="product-price"><h4>$${cartArray[i].price}</h4></div>
        
      </div>
      <div>
        <div class="input-group">
          <span class='minus-item input-group-addon btn btn-secondary' data-name="${cartArray[i].name}">
            -
          </span>
            <input type='text' class='item-count form-control' data-name="${cartArray[i].name}" value="${cartArray[i].count}">
          <span class='plus-item input-group-addon btn btn-secondary' data-name="${cartArray[i].name}">
          +
          </span>
        </div>
        </div>
      </div>
    </div>`
  }
  
  $('.show-item').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button
$('.show-item').on("click", ".delete-item", function(event) {
  var name = $(this).data('name');
  alert("Delete " + name);
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-item').on("click", ".minus-item", function(event) {
  var name = $(this).data('name');
 
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-item').on("click", ".plus-item", function(event) {
  var name = $(this).data('name');
  var img =  $(this).data('image');
  shoppingCart.addItemToCart(img, name);
  displayCart();
})

// Item count input
$('.show-item').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();