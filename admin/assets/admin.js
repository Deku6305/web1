/* ============================================================
   LUMIÈRE ADMIN – JS riêng cho trang quản trị (bản demo tĩnh)
   Dùng kèm ../js/main.js (data-demo, data-confirm, tabs, js-price, toast)
   ============================================================ */
(function () {
  "use strict";

  function toNumber(text) { return parseInt(String(text).replace(/[^0-9]/g, ""), 10) || 0; }
  function vnd(n) { return window.formatNumber(String(Math.round(n))) + " VNĐ"; }

  /* ---------- Bộ lọc: <form class="js-filter"> (kiểm tra khoảng ngày) ---------- */
  document.querySelectorAll("form.js-filter").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var from = form.querySelector('[name="from"]');
      var to = form.querySelector('[name="to"]');
      if (from && to && from.value && to.value && from.value > to.value) {
        alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
        return;
      }
      showToast("Đã áp dụng bộ lọc (dữ liệu mẫu)");
    });
    form.addEventListener("reset", function () { setTimeout(function () { showToast("Đã đặt lại bộ lọc"); }, 0); });
  });

  /* ---------- Hiện / ẩn mật khẩu ---------- */
  document.querySelectorAll(".js-toggle-pass").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = document.getElementById(btn.getAttribute("data-target"));
      input.type = input.type === "password" ? "text" : "password";
      btn.textContent = input.type === "password" ? "Hiện" : "Ẩn";
    });
  });

  /* ---------- Chọn ảnh sản phẩm ---------- */
  document.querySelectorAll(".js-image-input").forEach(function (input) {
    input.addEventListener("change", function () {
      if (input.files.length) showToast("Đã chọn ảnh: " + input.files[0].name);
    });
  });

  /* ---------- Lưu tỷ lệ lợi nhuận (giaban.html) ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".js-save-profit");
    if (!btn) return;
    var row = btn.closest("tr");
    var name = row.querySelector("[data-name]").getAttribute("data-name");
    var input = row.querySelector(".cell-input");
    var pct = input.value;
    if (pct === "" || pct < 0 || pct > 300) { alert("Tỷ lệ lợi nhuận phải nằm trong khoảng 0% – 300%"); return; }

    // Demo: vẫn báo thành công nhưng giữ nguyên số ban đầu
    input.value = input.defaultValue;                              // trả ô nhập về số gốc trong HTML
    input.dispatchEvent(new Event("input", { bubbles: true }));    // tính lại giá bán theo số gốc
    alert("Đã lưu tỷ lệ lợi nhuận " + input.defaultValue + "% cho " + name);
  });

  // Giá bán tự tính lại khi đổi tỷ lệ: giá bán = giá vốn × (1 + tỷ lệ)
  document.addEventListener("input", function (e) {
    if (!e.target.classList.contains("cell-input")) return;
    var row = e.target.closest("tr");
    var cost = row.querySelector("[data-cost]");
    var sell = row.querySelector(".js-sell-price");
    if (cost && sell) sell.textContent = vnd(toNumber(cost.getAttribute("data-cost")) * (1 + (parseFloat(e.target.value) || 0) / 100));
  });

  /* ---------- Cập nhật trạng thái đơn (order-detail.html) ---------- */
  var statusBtn = document.getElementById("btn-update-status");
  if (statusBtn) {
    statusBtn.addEventListener("click", function () {
      var sel = document.getElementById("statusSelect");
      if (!sel.value) { alert("⚠️ Vui lòng chọn trạng thái!"); return; }
      alert(" Cập nhật trạng thái thành công: " + sel.options[sel.selectedIndex].text);
      window.location.href = "order.html";
    });
  }

  /* ---------- Thêm phiếu nhập (themphieunhap.html) ---------- */
  var rowsBox = document.getElementById("import-rows");
  if (rowsBox) {
    var template = document.getElementById("import-row-template");

    function calc() {
      var count = 0, qtyAll = 0, sum = 0;
      rowsBox.querySelectorAll(".import-row").forEach(function (row) {
        var price = toNumber(row.querySelector(".price-input").value);
        var qty = parseInt(row.querySelector(".qty-input").value, 10) || 0;
        row.querySelector(".row-total").textContent = vnd(price * qty);
        count++; qtyAll += qty; sum += price * qty;
      });
      document.getElementById("total-products").textContent = count;
      document.getElementById("total-quantity").textContent = qtyAll;
      document.getElementById("total-value").textContent = vnd(sum);
    }

    function addRow() {
      rowsBox.appendChild(template.content.cloneNode(true));
      calc();
    }

    document.getElementById("btn-add-row").addEventListener("click", addRow);
    rowsBox.addEventListener("input", calc);
    rowsBox.addEventListener("change", function (e) {
      // Gợi ý giá nhập theo sản phẩm đã chọn
      if (!e.target.classList.contains("product-select")) return;
      var opt = e.target.options[e.target.selectedIndex];
      var price = e.target.closest(".import-row").querySelector(".price-input");
      if (opt.getAttribute("data-cost") && !price.value) price.value = window.formatNumber(opt.getAttribute("data-cost"));
      calc();
    });
    rowsBox.addEventListener("click", function (e) {
      if (!e.target.closest(".row-remove")) return;
      if (rowsBox.querySelectorAll(".import-row").length === 1) { alert("Phiếu nhập phải có ít nhất một sản phẩm"); return; }
      e.target.closest(".import-row").remove();
      calc();
    });

    document.getElementById("importForm").addEventListener("submit", function (e) {
      e.preventDefault();
      if (!document.getElementById("import-date").value) { alert("Vui lòng chọn ngày nhập"); return; }
      var rows = rowsBox.querySelectorAll(".import-row");
      if (!rows.length) { alert("Vui lòng thêm ít nhất một sản phẩm"); return; }
      for (var i = 0; i < rows.length; i++) {
        if (!rows[i].querySelector(".product-select").value) { alert("Vui lòng chọn sản phẩm cho hàng " + (i + 1)); return; }
        if (toNumber(rows[i].querySelector(".price-input").value) <= 0) { alert("Vui lòng nhập giá nhập hợp lệ cho hàng " + (i + 1)); return; }
        if ((parseInt(rows[i].querySelector(".qty-input").value, 10) || 0) <= 0) { alert("Vui lòng nhập số lượng hợp lệ cho hàng " + (i + 1)); return; }
      }
      alert("Phiếu nhập đã được lưu thành công!");
      window.location.href = "phieunhap.html";
    });

    addRow();
  }

  /* ============================================================
     CÁC TRANG HIỂN THỊ THEO DỮ LIỆU CHUNG (js/data.js)
     ============================================================ */
  var DATA = window.LUMIERE;
  var query = new URLSearchParams(window.location.search);

  function byId(id) { return document.getElementById(id); }
  function money(n) { return vnd(n); }
  function dateVN(iso) { return iso.split("-").reverse().join("/"); }
  function findProduct(code) { return DATA.products.filter(function (p) { return p.code === code; })[0]; }
  function findCustomer(id) { return DATA.customers.filter(function (c) { return c.id === id; })[0]; }
  function statusBadge(st) { return '<span class="status status-' + st + '">' + DATA.status[st] + "</span>"; }
  function emptyRow(cols, text) { return '<tr><td colspan="' + cols + '" class="text-center">' + text + "</td></tr>"; }
  function infoRow(label, value, full) {
    return "<div" + (full ? ' style="grid-column:1/-1;"' : "") + "><dt>" + label + "</dt><dd>" + value + "</dd></div>";
  }

  /* ---------- Danh sách đơn hàng (order.html) ---------- */
  var orderForm = byId("order-filter");
  if (orderForm) {
    var renderOrders = function () {
      var rows = DATA.orders;
      byId("order-rows").innerHTML = rows.length ? rows.map(function (o, i) {
        var c = findCustomer(o.customer);
        return "<tr><td>" + (i + 1) + "</td><td><strong>#" + o.id + '</strong></td><td class="cell-name">' + c.name + "</td><td>" + c.address + "</td><td>" + c.phone + "</td><td>" + dateVN(o.date) +
          '</td><td class="text-right price-text">' + money(o.total) + "</td><td>" + statusBadge(o.status) +
          '</td><td><a href="order-detail.html?id=' + o.id + '" class="ad-btn is-sm is-info">Chi tiết</a></td></tr>';
      }).join("") : emptyRow(9, "Không có đơn hàng phù hợp");
    };
    renderOrders();
  }

  /* ---------- Chi tiết đơn hàng (order-detail.html?id=) ---------- */
  if (byId("od-items")) {
    var order = DATA.orders.filter(function (o) { return o.id === query.get("id"); })[0] || DATA.orders[0];
    var buyer = findCustomer(order.customer);
    document.title = "Đơn #" + order.id + " | Lumière Admin (Demo)";
    byId("page-title").textContent = "Thông tin đơn hàng #" + order.id;
    byId("page-sub").textContent = "Đặt ngày " + dateVN(order.date) + " · Thanh toán: " + order.pay;
    byId("od-customer").innerHTML = infoRow("Họ và tên", buyer.name) + infoRow("Số điện thoại", buyer.phone) +
      infoRow("Email", buyer.email) + infoRow("Hạng thành viên", buyer.tier) + infoRow("Địa chỉ giao hàng", buyer.address, true);
    byId("od-status").className = "status status-" + order.status;
    byId("od-status").textContent = DATA.status[order.status];
    byId("od-items").innerHTML = order.items.map(function (item, i) {
      var p = findProduct(item.code);
      var cat = DATA.categories.filter(function (c) { return c.id === p.cat; })[0];
      return "<tr><td>" + (i + 1) + "</td><td>" + p.code + '</td><td><div class="cell-product"><span class="cell-thumb"><img class="prod-img" src="' + p.images[0] + '" alt="' + p.name + '"></span><div><p class="cell-name">' + p.name + '</p><p class="cell-sub">' + cat.name + "</p></div></div></td>" +
        '<td class="text-center">' + item.qty + '</td><td class="text-right">' + money(item.price) + '</td><td class="text-right price-text">' + money(item.price * item.qty) + "</td></tr>";
    }).join("");
    byId("od-totals").innerHTML = "<div><dt>Tạm tính</dt><dd>" + money(order.total + order.discount) + "</dd></div>" +
      (order.discount ? '<div><dt>Giảm giá</dt><dd class="is-discount">-' + money(order.discount) + "</dd></div>" : "") +
      "<div><dt>Phí vận chuyển</dt><dd>Miễn phí</dd></div>" +
      '<div class="is-total"><dt>Tổng cộng</dt><dd>' + money(order.total) + "</dd></div>";
  }

  /* ---------- Lịch sử đặt hàng của một khách (user-orders.html?user=) ---------- */
  var userOrderForm = byId("user-order-filter");
  if (userOrderForm) {
    var customer = findCustomer(query.get("user")) || DATA.customers[0];
    byId("page-sub").textContent = "Các đơn hàng của khách hàng " + customer.name + ".";
    byId("uo-info").innerHTML = infoRow("Họ và tên", customer.name) + infoRow("Tài khoản", customer.id) +
      infoRow("Email", customer.email) + infoRow("Số điện thoại", customer.phone) + infoRow("Hạng thành viên", customer.tier) +
      infoRow("Trạng thái", '<span class="status status-' + customer.status + '">' + (customer.status === "locked" ? "Đã khóa" : "Hoạt động") + "</span>");
    var mine = DATA.orders.filter(function (o) { return o.customer === customer.id; });
    var renderUserOrders = function () {
      var rows = mine;
      byId("uo-count").textContent = rows.length;
      byId("uo-spent").textContent = money(rows.reduce(function (sum, o) { return o.status === "cancelled" ? sum : sum + o.total; }, 0));
      byId("uo-done").textContent = rows.filter(function (o) { return o.status === "completed"; }).length;
      byId("uo-rows").innerHTML = rows.length ? rows.map(function (o, i) {
        return "<tr><td>" + (i + 1) + "</td><td><strong>#" + o.id + "</strong></td><td>" + dateVN(o.date) + "</td><td>" + customer.address +
          '</td><td class="text-right price-text">' + money(o.total) + "</td><td>" + statusBadge(o.status) +
          '</td><td><a href="order-detail.html?id=' + o.id + '" class="ad-btn is-sm is-info">Chi tiết</a></td></tr>';
      }).join("") : emptyRow(7, "Không có đơn hàng phù hợp");
    };
    renderUserOrders();
  }

  /* ---------- Sửa khách hàng (edit-user.html?user=) ---------- */
  if (byId("u-acc") && DATA) {
    var editing = findCustomer(query.get("user")) || DATA.customers[0];
    var sub = document.querySelector(".ad-sub");
    if (sub) sub.textContent = "Cập nhật thông tin tài khoản " + editing.name + ".";
    byId("u-name").value = editing.name;
    byId("u-acc").value = editing.id;
    byId("u-email").value = editing.email;
    byId("u-phone").value = editing.phone;
    byId("u-address").value = editing.address;
    byId("u-status").value = editing.status;
  }

  /* ---------- Form sản phẩm: 4 ảnh + thông số giống trang chi tiết ---------- */
  document.querySelectorAll(".js-image-slot").forEach(function (input) {
    input.addEventListener("change", function () {
      if (!input.files.length) return;
      var preview = byId(input.getAttribute("data-preview"));
      preview.src = URL.createObjectURL(input.files[0]);
      preview.hidden = false;
      preview.nextElementSibling.hidden = true;
    });
  });
  if (byId("product-form") && DATA) {
    var item = DATA.products.filter(function (p) { return p.code === query.get("id"); })[0] || DATA.products[0];
    byId("page-sub").textContent = "Cập nhật thông tin sản phẩm " + item.code + ".";
    byId("pf-name").value = item.name;
    byId("pf-code").value = item.code;
    byId("pf-cat").value = item.cat;
    byId("pf-mat").value = item.material;
    byId("pf-stone").value = item.stone;
    byId("pf-weight").value = item.weight.toFixed(2);
    byId("pf-price").value = window.formatNumber(String(item.price));
    byId("pf-maker").value = item.maker;
    byId("pf-address").value = item.makerAddress;
    byId("pf-desc").value = item.desc;
    item.images.forEach(function (src, i) {
      var preview = byId("pf-preview-" + (i + 1));
      preview.src = src;
      preview.alt = item.name + " – ảnh " + (i + 1);
      preview.hidden = false;
      preview.nextElementSibling.hidden = true;
    });
  }

  /* ---------- Thống kê tổng quan theo thời gian (index.html) ---------- */
  var statForm = byId("stat-filter");
  if (statForm) {
    var charts = {};
    var COLORS = ["#ed8383", "#d9b25a", "#8fb3f0", "#b98ae6", "#7fcf9e"];

    var drawChart = function (key, canvasId, config) {
      if (!window.Chart) return;
      if (charts[key]) charts[key].destroy();
      charts[key] = new Chart(byId(canvasId), config);
    };

    var renderStats = function () {
      // Bản demo: số liệu cố định, đổi thời gian không làm đổi thống kê. Không tính đơn đã hủy
      var orders = DATA.orders.filter(function (o) { return o.status !== "cancelled"; });
      var revenue = orders.reduce(function (sum, o) { return sum + o.total; }, 0);
      var buyers = {};
      orders.forEach(function (o) {
        if (!buyers[o.customer]) buyers[o.customer] = { count: 0, total: 0 };
        buyers[o.customer].count++;
        buyers[o.customer].total += o.total;
      });

      byId("stat-customers").textContent = Object.keys(buyers).length;
      byId("stat-orders").textContent = orders.length;
      byId("stat-sold").textContent = orders.reduce(function (sum, o) {
        return sum + o.items.reduce(function (s, it) { return s + it.qty; }, 0);
      }, 0);
      byId("stat-revenue").textContent = money(revenue);
      byId("stat-note").textContent = "Số liệu mẫu · Không tính đơn đã hủy.";

      // Doanh thu theo tháng trong khoảng đã chọn
      var months = [], values = [];
      for (var m = 1; m <= 10; m++) {
        var key = "-" + (m < 10 ? "0" : "") + m + "-";
        months.push("T" + m);
        values.push(orders.reduce(function (sum, o) { return o.date.indexOf(key) === 4 ? sum + o.total : sum; }, 0) / 1000000);
      }
      drawChart("revenue", "revenueChart", {
        type: "bar",
        data: { labels: months, datasets: [{ label: "Doanh thu (triệu VNĐ)", data: values, backgroundColor: "#ed8383", borderRadius: 6 }] },
        options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
      });

      // Tỷ trọng doanh thu theo danh mục
      var byCat = DATA.categories.map(function (c) {
        return orders.reduce(function (sum, o) {
          return sum + o.items.reduce(function (s, it) { return findProduct(it.code).cat === c.id ? s + it.qty * it.price : s; }, 0);
        }, 0);
      });
      var catTotal = byCat.reduce(function (a, b) { return a + b; }, 0) || 1;
      drawChart("category", "categoryChart", {
        type: "doughnut",
        data: {
          labels: DATA.categories.map(function (c) { return c.name; }),
          datasets: [{ data: byCat.map(function (v) { return Math.round(v / catTotal * 1000) / 10; }), backgroundColor: COLORS }]
        },
        options: { maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
      });

      // Top 5 khách hàng: nút Xem mở đúng lịch sử đặt hàng của khách đó
      var top = Object.keys(buyers).sort(function (a, b) { return buyers[b].total - buyers[a].total; }).slice(0, 5);
      byId("top-customers").innerHTML = top.length ? top.map(function (id, i) {
        var c = findCustomer(id);
        return "<tr><td>" + (i + 1) + '</td><td class="cell-name">' + c.name + "</td><td>" + c.email + "</td><td>" + c.phone +
          '</td><td class="text-center">' + buyers[id].count + '</td><td class="text-right price-text">' + money(buyers[id].total) +
          '</td><td class="text-center"><a href="user-orders.html?user=' + id + '" class="ad-btn is-sm is-info">Xem</a></td></tr>';
      }).join("") : emptyRow(7, "Không có dữ liệu trong khoảng thời gian này");
    };

    var chips = statForm.parentNode.querySelectorAll(".range-chip");
    var markChip = function () {
      chips.forEach(function (chip) {
        chip.classList.toggle("is-active", chip.getAttribute("data-from") === statForm.from.value && chip.getAttribute("data-to") === statForm.to.value);
      });
    };
    // Chọn thời gian chỉ đổi ô ngày và nút mốc, không đổi số liệu
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        statForm.from.value = chip.getAttribute("data-from");
        statForm.to.value = chip.getAttribute("data-to");
        markChip();
        showToast("Đã áp dụng bộ lọc (dữ liệu mẫu)");
      });
    });
    statForm.addEventListener("change", markChip);
    statForm.addEventListener("reset", function () { setTimeout(markChip, 0); });
    renderStats();
  }
})();
