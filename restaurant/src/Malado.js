(function () {
  function c(a) {
    this.t = a;
  }
  function l(a, b) {
    for (var e = b.split("."); e.length; ) {
      if (!(e[0] in a)) return !1;
      a = a[e.shift()];
    }
    return a;
  }
  function d(a, b) {
    return a
      .replace(h, function (e, a, i, f, c, h, k, m) {
        var f = l(b, f),
          j = "",
          g;
        if (!f) return "!" == i ? d(c, b) : k ? d(m, b) : "";
        if (!i) return d(h, b);
        if ("@" == i) {
          e = b._key;
          a = b._val;
          for (g in f)
            f.hasOwnProperty(g) &&
              ((b._key = g), (b._val = f[g]), (j += d(c, b)));
          b._key = e;
          b._val = a;
          return j;
        }
      })
      .replace(k, function (a, c, d) {
        return (a = l(b, d)) || 0 === a
          ? "%" == c
            ? new Option(a).innerHTML.replace(/"/g, "&quot;")
            : a
          : "";
      });
  }
  var h = /\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,
    k = /\{\{([=%])(.+?)\}\}/g;
  c.prototype.render = function (a) {
    return d(this.t, a);
  };
  window.t = c;
})();
// end of 't';

Number.prototype.to_$ = function () {
  return "$" + parseFloat(this).toFixed(2);
};
String.prototype.strip$ = function () {
  return this.split("$")[1];
};

var app = {
  shipping: 5.0,
  products: [
    // {
    //   name: "Spicy Salmon Roll",
    //   price: "17.99",
    //   img:
    //     "https://www.getfish.com.au/wp-content/uploads/2017/09/fresh-salmon-sushi-rolls.jpg",
    //   desc: " Hellll yaaaaaaaaaaaaaaa",
    // },
    // {
    //   name: "Avocado Roll",
    //   price: "15.99",
    //   img:
    //     "https://www.alyonascooking.com/wp-content/uploads/2018/05/caterpillar-roll-11.jpg",
    //   desc: " FKKKKKKKKKKKKKK YEAAAAAAAAAAA",
    // },
    // {
    //   name: "Sashimi Boat",
    //   price: "41.99",
    //   img: "https://juinkadsuki.files.wordpress.com/2012/01/dscf1125vw3.jpg",
    //   desc: "SOOOOO COOOOOLLLLLLLLLLLLLLL",
    // },
    // {
    //   name: "BLANK",
    //   img:
    //     "http://community.netfu.co.kr/n_comu/data/tmp/20120927144041_6306.jpg",
    //   price: "1.11",
    //   desc: "Don't get tired!",
    // },
  ],

  removeProduct: function () {
    "use strict";

    var item = $(this).closest(".shopping-cart--list-item");

    item.addClass("closing");
    window.setTimeout(function () {
      item.remove();
      app.updateTotals();
    }, 500); // Timeout for css animation
  },

  addProduct: function () {
    "use strict";

    var qtyCtr = $(this).prev(".product-qty"),
      quantity = parseInt(qtyCtr.html(), 10) + 1;

    app.updateProductSubtotal(this, quantity);
  },

  subtractProduct: function () {
    "use strict";

    var qtyCtr = $(this).next(".product-qty"),
      num = parseInt(qtyCtr.html(), 10) - 1,
      quantity = num <= 0 ? 0 : num;

    app.updateProductSubtotal(this, quantity);
  },

  updateProductSubtotal: function (context, quantity) {
    "use strict";

    var ctr = $(context).closest(".product-modifiers"),
      productQtyCtr = ctr.find(".product-qty"),
      productPrice = parseFloat(ctr.data("product-price")),
      subtotalCtr = ctr.find(".product-total-price"),
      subtotalPrice = quantity * productPrice;

    productQtyCtr.html(quantity);
    subtotalCtr.html(subtotalPrice.to_$());

    app.updateTotals();
  },

  updateTotals: function () {
    "use strict";

    var products = $(".shopping-cart--list-item"),
      subtotal = 0,
      shipping;

    for (var i = 0; i < products.length; i += 1) {
      subtotal += parseFloat(
        $(products[i]).find(".product-total-price").html().strip$()
      );
    }

    shipping = subtotal > 0 && subtotal < 100 / 1.13 ? app.shipping : 0;

    $("#subtotalCtr").find(".cart-totals-value").html(subtotal.to_$());
    $("#taxesCtr")
      .find(".cart-totals-value")
      .html((subtotal * 0.13).to_$());
    $("#totalCtr")
      .find(".cart-totals-value")
      .html((subtotal * 1.13 + shipping).to_$());
    $("#shippingCtr").find(".cart-totals-value").html(shipping.to_$());
  },

  attachEvents: function () {
    "use strict";

    $(".product-remove").on("click", app.removeProduct);
    $(".product-plus").on("click", app.addProduct);
    $(".product-subtract").on("click", app.subtractProduct);
  },

  setProductImages: function () {
    "use strict";

    var images = $(".product-image"),
      ctr,
      img;

    for (var i = 0; i < images.length; i += 1) {
      (ctr = $(images[i])), (img = ctr.find(".product-image--img"));

      ctr.css("background-image", "url(" + img.attr("src") + ")");
      img.remove();
    }
  },

  renderTemplates: function (more = []) {
    // "use strict";

    var products = [...more],
      content = [],
      template = new t($("#shopping-cart--list-item-template").html());

    if (products != undefined && products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        content[i] = template.render(products[i]);
      }
    }

    $("#shopping-cart--list").html(content.join(""));
  },
};

// app.renderTemplates();
var firstSeatLabel = 1;

$(document).ready(function(){
  $("#cart-cont").on('click', () => {
    $(".cover").fadeIn('slow');
    $(".popup").addClass('first-popup-hide');
    $(".popup-2").fadeIn('slow');
  });

  $("#popup2-cont").on('click', () => {
    $(".popup-2").addClass('second-popup-hide');
    $(".reservation-popup").fadeIn('slow');
  });

  $("#reservation-cont").on('click', () => {
    console.log('yeah')
    $(".reservation-popup").fadeOut('fast');
    $(".popup-3").fadeIn('slow');
  });

  $(".item-img").on('click', function(){
    $(".cover").fadeIn('slow');
    $(".popup").fadeIn('slow');
    app.renderTemplates(
      [
        {
          name: "Salmon Roll",
          price: "17.99",
          img:
            "https://www.getfish.com.au/wp-content/uploads/2017/09/fresh-salmon-sushi-rolls.jpg",
          desc: "Spicy",
        }
      ]
    );
    app.setProductImages();
    app.attachEvents();
  });

  $(".popup").on('click', function(){
    if($(event.target).is("#close")){
        $(".cover").fadeOut('slow');    
        $(".popup").fadeOut('slow'); 
    }
  });
  
  $('.cover').on('click', function(){
     $(".cover").fadeOut('slow');    
     $(".popup").fadeOut('slow'); 
     $(".popup-2").fadeOut('slow'); 
     $(".reservation-popup").fadeOut('slow');
     $(".popup-3").fadeOut('slow'); 
  });

  $('#final-popup-complete').on('click', () => {
    $(".cover").fadeOut('slow');    
    $(".popup-3").fadeOut('slow'); 
  });

  var $cart = $("#selected-seats"),
    $counter = $("#counter"),
    $total = $("#total"),
    sc = $("#seat-map").seatCharts({
      map: [
        "pp_____pp________pp",
        "pp_____pp________pp",
        "kkk____kk_______kkk",
        "jjj___jjj_______jjj",
        "",
        "ii_____ii________ii",
        "hh_____hh________hh",
        "_________________gg",
        "",
        "c_c_c_c_c_c_c_c_c_c",
      ],
      seats: {
        p: {
          price: 10,
          classes: "vip-class",
          category: "T1 space",
        },
        k: {
          price: 10,
          classes: "standard-balcony-class",
          category: "T2 space",
        },
        j: {
          price: 10,
          classes: "standard-balcony-class",
          category: "T2 space",
        },
        i: {
          price: 10,
          classes: "standard-ground-class",
          category: "T3 space",
        },
        h: {
          price: 10,
          classes: "standard-ground-class",
          category: "T3 space",
        },
        g: {
          price: 10,
          classes: "standard-ground-class",
          category: "T3 space",
        },
        c: {
          price: 10,
          classes: "student-class",
          category: "Bar",
        },
      },
      naming: {
        rows: ["T1", "", "T2", "", "", "T3", "", "", "", "Bar"],
        top: false,
        getLabel: function (character, row, column) {
          if (row == "T1") {
            return column;
          } else if (row == "" || row == "T2") {
            return column;
          } else if (row == " " || row == "T3" || row == "") {
            return column;
          } else if (row == "Bar") {
            return column;
          }
        },
      },
      legend: {
        node: $("#legend"),
        items: [
          ["p", "available", "Table 1-3"],
          ["k", "available", "Table 4-6"],
          ["i", "available", "Table 7-8"],
          ["c", "available", "Bar"],
          ["f", "unavailable", "Already Booked"],
        ],
      },
      click: function () {
        if (this.status() == "available") {
          $(
            "<li>" +
              this.data().category +
              " Seat #" +
              this.settings.label +
              "  " +
              "Deposit $" +
              this.data().price +
              '</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>'
          )
            .attr("id", "cart-item-" + this.settings.id)
            .data("seatId", this.settings.id)
            .appendTo($cart);

          $counter.text(sc.find("selected").length + 1);
          $total.text(recalculateTotal(sc) + this.data().price);

          return "selected";
        } else if (this.status() == "selected") {
          //update the counter
          $counter.text(sc.find("selected").length - 1);
          //and total
          $total.text(recalculateTotal(sc) - this.data().price);

          $("#cart-item-" + this.settings.id).remove();

          return "available";
        } else if (this.status() == "unavailable") {
          return "unavailable";
        } else {
          return this.style();
        }
      },
    });

  $("#selected-seats").on("click", ".cancel-cart-item", function () {
    sc.get($(this).parents("li:first").data("seatId")).click();
  });

  sc.get(["1_2", "4_1", "7_1", "7_2"]).status("unavailable");
});

function recalculateTotal(sc) {
  var total = 0;

  sc.find("selected").each(function () {
    total += this.data().price;
  });

  return total;
}
