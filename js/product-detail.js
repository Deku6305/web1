/* ============================================================
   Trang chi tiết sản phẩm: hiện đúng sản phẩm theo product.html?id=MÃ
   ============================================================ */
(function () {
  "use strict";

  var data = window.LUMIERE;
  var id = new URLSearchParams(window.location.search).get("id");
  var product = data.products.filter(function (p) { return p.code === id; })[0] || data.products[0];
  var category = data.categories.filter(function (c) { return c.id === product.cat; })[0];

  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"; }
  function text(elId, value) { document.getElementById(elId).textContent = value; }

  document.title = product.name + " | Lumière Jewelry (Demo)";

  // Thanh định vị: Trang chủ › Sản phẩm › Danh mục › Tên sản phẩm
  document.getElementById("pd-crumb").innerHTML =
    '<li><a href="index.html">Trang chủ</a></li>' +
    '<li><a href="all-products.html">Sản phẩm</a></li>' +
    '<li><a href="' + category.page + '">' + category.name + "</a></li>" +
    '<li aria-current="page">' + product.name + "</li>";

  // 4 ảnh sản phẩm
  product.images.forEach(function (src, i) {
    ["pd-img-", "pd-thumb-"].forEach(function (prefix) {
      var el = document.getElementById(prefix + (i + 1));
      el.src = src;
      el.alt = product.name;
    });
  });

  // Thông tin + giá
  text("pd-name", product.name);
  text("pd-code", product.code);
  text("pd-price", money(product.price));
  if (product.old) {
    text("pd-old", money(product.old));
    text("pd-off", "-" + Math.round((1 - product.price / product.old) * 100) + "%");
  } else {
    document.getElementById("pd-old").remove();
    document.getElementById("pd-off").remove();
  }
  var stock = document.querySelector(".stock-status");
  if (stock && product.stock === 0) stock.textContent = "Hết hàng";

  // Bảng thông số (khớp với form sản phẩm ở admin)
  text("pd-spec-code", product.code);
  text("pd-spec-cat", category.name);
  text("pd-spec-material", product.material);
  text("pd-spec-stone", product.stone);
  text("pd-spec-weight", "≈ " + product.weight.toFixed(2) + " gram");
  text("pd-spec-maker", product.maker);
  text("pd-spec-address", product.makerAddress);

  // Modal mua ngay
  document.getElementById("pd-pick-img").src = product.images[0];
  document.getElementById("pd-pick-img").alt = product.name;
  text("pd-pick-name", product.name);
  text("pd-pick-code", product.code);
  text("pd-pick-price", money(product.price));

  // Sản phẩm tương tự + gợi ý thêm
  function card(p) {
    var href = "product.html?id=" + p.code;
    return '<article class="product-card">' +
      '<a href="' + href + '" class="product-thumb"><img class="prod-img" src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy"></a>' +
      '<div class="product-info"><h3 class="product-name"><a href="' + href + '">' + p.name + "</a></h3>" +
      '<p class="product-price">' + money(p.price) + "</p></div></article>";
  }
  var others = data.products.filter(function (p) { return p.code !== product.code; });
  document.getElementById("pd-related").innerHTML = others
    .filter(function (p) { return p.cat === product.cat; }).slice(0, 6).map(card).join("");
  document.getElementById("pd-more").innerHTML = others
    .filter(function (p) { return p.cat !== product.cat; })
    .filter(function (p, i) { return i % 6 === 0; }).slice(0, 5).map(card).join("");
})();
