
(function ($) {

  let list = []; //mang chua ma cac sp can duoc so sanh

  /* function to be executed when product is selected for comparision*/
  $(document).on('click', '.addToCompare', function () {
      $(".comparePanel").show();
      $(this).toggleClass("rotateBtn");
      $(this).parents(".divImage").toggleClass("selected");
      var productID = $(this).parents('.product-list').attr('data-id');

      var inArray = $.inArray(productID, list); // check selected product existed in array list ?
      if (inArray < 0) {
          if (list.length < 3) {
              list.push(productID);

              var displayName = $(this).parents('.product-list').attr('data-name');

              var image = $(this).siblings(".product-img").children('.productImg').attr('src');

              $(".comparePan").append('<div id="' + productID + '" class="relPos titleMargin w3-margin-bottom ps-5 col-lg-3 col-md-4 col-sm-4"><div class="w3-white titleMargin"><a class="selectedItemCloseBtn w3-closebtn cursor">&times</a><img src="' + image + '" alt="image" style="max-height:100px;max-width=100px"/><p id="' + productID + '" class="titleMargin1">' + displayName + '</p></div></div>');
          }
          else {
              alert("Maximum of Three products are allowed for comparision");
              $("#WarningModal").modal();
              
              $(this).toggleClass("rotateBtn");
              $(this).parents(".divImage").toggleClass("selected");
              return;
          }


      } else {
          list.splice($.inArray(productID, list), 1);
          $('#' + productID).remove();
          hideComparePanel();
      }


      if (list.length > 1) {
          $(".cmprBtn").addClass("active");
          $(".cmprBtn").removeAttr('disabled');
      } else {
          $(".cmprBtn").removeClass("active");
          $(".cmprBtn").attr('disabled', '');
      }

  });


  /*function to be executed when compare button is clicked*/
  $(document).on('click', '.cmprBtn', function () {
      if ($(".cmprBtn").hasClass("active")) {

          /* this is to print the  features list statically*/
          $(".contentPop").append('<div class="col-sm-3 compareItemParent relPos">' + '<ul class="product">' + '<li class="relPos compHeader"><p class="w3-display-middle">Features</p></li>' + '<li>Name</li>' + '<li>Price</li>'  + '<li class="description">Description</li>' + '</div>');

          for (var i = 0; i < list.length; i++) {
              /* this is to add the items to popup which are selected for comparision */
              product = $('.product-list[data-id="' + list[i] + '"]');
              var image = $('[data-id=' + list[i] + ']').find(".productImg").attr('src');
              var title = $('[data-id=' + list[i] + ']').attr('data-name');
              /*appending to div*/
              $(".contentPop").append('<div class="col-sm-3 compareItemParent relPos">' + '<ul class="product">' + '<li class="compHeader"><img src="' + image + '" class="compareThumb"></li>' + '<li>' + title + '</li>' + '<li>' + $(product).data('price') + '</li>' + '<li class="description">' + $(product).data('description') + '</li>' + '</ul>' + '</div>');
          }
      }
      $(".modPos").show();
  });


  /* function to close the comparision popup */
  $(document).on('click', '.closeBtn', function () {
      $(".contentPop").empty();
      $(".comparePan").empty();
      $(".comparePanel").hide();
      $(".modPos").hide();
      $(".divImage").removeClass("selected");
      $(".cmprBtn").attr('disabled', '');
      list.length = 0;
      $(".rotateBtn").toggleClass("rotateBtn");
      window.location = 'stellar_product.html'
  });

  /*function to remove item from preview panel*/
  $(document).on('click', '.selectedItemCloseBtn', function () {

      var test = $(this).siblings("p").attr('id');
      $('[data-id=' + test + ']').find(".addToCompare").click();
      hideComparePanel();
  });

  function hideComparePanel() {
      if (!list.length) {
          $(".comparePan").empty();
          $(".comparePanel").hide();
      }
  }
})(jQuery);
