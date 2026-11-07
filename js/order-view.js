/* ============================================================
   Chi tiết đơn phía khách: hiện đúng đơn theo chitietdonhang2.html?id=MÃ
   ============================================================ */
(function () {
  "use strict";

  var data = window.LUMIERE;
  var id = new URLSearchParams(window.location.search).get("id");
  var order = data.orders.filter(function (o) { return o.id === id; })[0] ||
    data.orders.filter(function (o) { return o.id === "DH1018"; })[0];
  var customer = data.customers.filter(function (c) { return c.id === order.customer; })[0];

  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"; }
  function date(iso) { return iso.split("-").reverse().join("/"); }
  function product(code) { return data.products.filter(function (p) { return p.code === code; })[0]; }

  document.title = "Đơn hàng #" + order.id + " | Lumière Jewelry (Demo)";
  document.getElementById("ov-crumb").textContent = "Đơn hàng #" + order.id;
  document.getElementById("ov-title").textContent = "Chi tiết đơn hàng #" + order.id;
  var status = document.getElementById("ov-status");
  status.className = "status status-" + order.status;
  status.textContent = data.status[order.status];

  // Tiến trình đơn hàng (đơn đã hủy thì không có tiến trình)
  var steps = ["Đã đặt hàng", "Đã xác nhận", "Đang vận chuyển", "Đã giao hàng"];
  var reached = { pending: 1, processing: 2, shipping: 3, delivered: 4, completed: 4, cancelled: 0 }[order.status];
  var track = document.getElementById("ov-track");
  if (order.status === "cancelled") {
    track.parentNode.removeChild(track);
  } else {
    track.innerHTML = steps.map(function (label, i) {
      var done = i < reached;
      return '<div class="track-step' + (done ? " is-done" : "") + '"><span class="track-dot">' + (done ? "✓" : i + 1) + "</span>" + label + "</div>";
    }).join("");
  }

  var rows = [["Họ và tên", customer.name], ["Số điện thoại", customer.phone], ["Địa chỉ giao hàng", customer.address],
    ["Phương thức thanh toán", order.pay], ["Ngày đặt", date(order.date)]];
  if (order.note) rows.push(["Ghi chú", order.note]);
  document.getElementById("ov-info").innerHTML = rows.map(function (r) {
    var cell = document.createElement("dd");
    cell.textContent = r[1];
    return "<div><dt>" + r[0] + "</dt>" + cell.outerHTML + "</div>";
  }).join("");

  document.getElementById("ov-items").innerHTML = order.items.map(function (item) {
    var p = product(item.code);
    var href = "product.html";
    return '<tr><td><div class="cell-product"><a class="cell-thumb" href="' + href + '"><img class="prod-img" src="' + p.images[0] + '" alt="' + p.name + '"></a>' +
      '<div><p class="cell-name"><a href="' + href + '">' + p.name + '</a></p><p class="cell-sub">Mã: ' + p.code + "</p></div></div></td>" +
      '<td class="text-right">' + money(item.price) + '</td><td class="text-center">' + item.qty + "</td>" +
      '<td class="text-right price-text">' + money(item.price * item.qty) + "</td></tr>";
  }).join("");

  document.getElementById("ov-totals").innerHTML =
    "<div><dt>Tạm tính</dt><dd>" + money(order.total + order.discount) + "</dd></div>" +
    (order.discount ? '<div><dt>Giảm giá</dt><dd class="is-discount">-' + money(order.discount) + "</dd></div>" : "") +
    "<div><dt>Phí vận chuyển</dt><dd>Miễn phí</dd></div>" +
    '<div class="is-total"><dt>Tổng cộng</dt><dd>' + money(order.total) + "</dd></div>";
})();
