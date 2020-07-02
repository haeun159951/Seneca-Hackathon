var firstSeatLabel = 1;

$(document).ready(function () {
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
