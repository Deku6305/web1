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

  /* ---------- Biểu đồ tổng quan (index.html) ---------- */
  if (window.Chart && document.getElementById("revenueChart")) {
    Chart.defaults.font.family = '"Mulish", Arial, sans-serif';
    new Chart(document.getElementById("revenueChart"), {
      type: "bar",
      data: {
        labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
        datasets: [{
          label: "Doanh thu (triệu VNĐ)",
          data: [62, 48, 71, 85, 93, 104, 88, 97, 126, 152, 0, 0],
          backgroundColor: "#ed8383",
          borderRadius: 6
        }]
      },
      options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
    new Chart(document.getElementById("categoryChart"), {
      type: "doughnut",
      data: {
        labels: ["Nhẫn cưới", "Nhẫn cầu hôn", "Dây chuyền", "Bông tai", "Bạc tặng bé"],
        datasets: [{ data: [46, 21, 14, 9, 10], backgroundColor: ["#ed8383", "#d9b25a", "#8fb3f0", "#b98ae6", "#7fcf9e"] }]
      },
      options: { maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
    });
  }
})();
