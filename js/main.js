/* ============================================================
   LUMIÈRE JEWELRY – JS DÙNG CHUNG (bản demo tĩnh)
   Mọi thao tác chỉ là giả lập: alert / toast rồi chuyển trang.
   Trang "đã đăng nhập" đánh dấu bằng <body data-logged-in>.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Trạng thái đăng nhập giữa các trang ----------
     Trang dành riêng cho thành viên có sẵn data-logged-in và ghi cờ; vào login.html là xóa cờ.
     Các trang dùng chung (sản phẩm, phân loại, giới thiệu…) đọc cờ để đổi header và cho mua hàng. */
  var LOGIN_FLAG = "lumiereLoggedIn";
  var isAdmin = document.body.classList.contains("admin");
  var isLoginPage = /\/login\.html$/.test(window.location.pathname);
  var hasLoginMark = document.body.hasAttribute("data-logged-in");
  var loginFlag = false;
  try {
    if (!isAdmin) {
      if (isLoginPage) localStorage.removeItem(LOGIN_FLAG);
      else if (hasLoginMark) localStorage.setItem(LOGIN_FLAG, "1");
    }
    loginFlag = !isAdmin && !isLoginPage && localStorage.getItem(LOGIN_FLAG) === "1";
  } catch (err) {}

  var ACCOUNT_MENU =
    '<div class="account-menu">' +
    '  <a href="thongtintaikhoan.html" class="icon-btn" aria-label="Tài khoản">' +
    '    <svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z"/></svg>' +
    '  </a>' +
    '  <span class="account-name">Nguyễn Văn A ▾</span>' +
    '  <ul class="dropdown">' +
    '    <li><a href="thongtintaikhoan.html">Thông tin tài khoản</a></li>' +
    '    <li><a href="lichsumuahang.html">Lịch sử mua hàng</a></li>' +
    '    <li><a href="wishlist.html">Sản phẩm yêu thích</a></li>' +
    '    <li><a href="login.html" data-confirm="Bạn có chắc chắn muốn đăng xuất?" data-redirect="login.html">Đăng xuất</a></li>' +
    '  </ul>' +
    '</div>';

  function applyLoginState() {
    document.body.setAttribute("data-logged-in", "");
    var login = document.querySelector('.header-right > a[href="login.html"]');
    if (login) login.outerHTML = ACCOUNT_MENU;
    var wish = document.querySelector('.header-right a[href="wishlist.html"] .badge');
    var bag = document.querySelector('.header-right a[href="cart.html"] .badge');
    if (wish) wish.textContent = "4";
    if (bag) bag.textContent = "3";
    document.querySelectorAll('a[href^="index.html"]').forEach(function (a) {
      a.setAttribute("href", a.getAttribute("href").replace("index.html", "index2.html"));
    });
    document.querySelectorAll('a[href="contactkhongtk.html"]').forEach(function (a) { a.setAttribute("href", "contact.html"); });
  }
  if (loginFlag && !hasLoginMark) applyLoginState();

  var isLoggedIn = document.body.hasAttribute("data-logged-in");
  var searchPage = isLoggedIn ? "searchcotaikhoan.html" : "searchkhongtk.html";

  /* ---------- 1. Toast thông báo ---------- */
  function showToast(msg, time) {
    var toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () { toast.classList.remove("is-show"); }, time || 1600);
  }
  window.showToast = showToast;

  function requireLogin(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    alert("Vui lòng đăng nhập để tiếp tục");
    window.location.href = "login.html";
  }

  /* ---------- 2. Định dạng số tiền khi nhập (1000000 -> 1.000.000) ---------- */
  function formatNumber(value) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  window.formatNumber = formatNumber;
  document.addEventListener("input", function (e) {
    if (!e.target.classList.contains("js-price")) return;
    e.target.value = formatNumber(e.target.value.replace(/[^0-9]/g, ""));
  });

  /* ---------- 3. Ô tìm kiếm + modal tìm kiếm nâng cao ---------- */
  var ADV_SEARCH_HTML =
    '<div class="adv-modal" id="advancedSearchModal" role="dialog" aria-modal="true" aria-labelledby="adv-title">' +
    '  <div class="adv-dialog">' +
    '    <div class="adv-head"><h3 id="adv-title">Tìm kiếm nâng cao</h3>' +
    '      <button type="button" class="adv-close" aria-label="Đóng">&times;</button></div>' +
    '    <form class="adv-form" id="advancedSearchForm">' +
    '      <div class="form-group"><label for="adv-keyword">Từ khóa</label>' +
    '        <input type="text" id="adv-keyword" name="keyword" placeholder="Nhập tên sản phẩm..."></div>' +
    '      <div class="form-group"><label for="adv-category">Danh mục</label>' +
    '        <select id="adv-category" name="category">' +
    '          <option value="">Tất cả</option>' +
    '          <option value="nhan-cuoi">Nhẫn cưới</option>' +
    '          <option value="nhan-cau-hon">Nhẫn cầu hôn</option>' +
    '          <option value="day-chuyen">Dây chuyền</option>' +
    '          <option value="bong-tai">Bông tai</option>' +
    '          <option value="bac-tang-be">Trang sức bạc tặng bé</option>' +
    '        </select></div>' +
    '      <div class="form-grid">' +
    '        <div class="form-group"><label for="adv-material">Chất liệu</label>' +
    '          <select id="adv-material" name="material"><option value="">Tất cả</option>' +
    '            <option value="vang-14k">Vàng 14K</option><option value="vang-18k">Vàng 18K</option>' +
    '            <option value="vang-24k">Vàng 24K</option><option value="bac-925">Bạc 925</option></select></div>' +
    '        <div class="form-group"><label for="adv-stone">Loại đá</label>' +
    '          <select id="adv-stone" name="stone"><option value="">Tất cả</option>' +
    '            <option value="kim-cuong">Kim cương Lab-grown</option><option value="moissanite">Moissanite</option>' +
    '            <option value="cz">Đá CZ</option><option value="ngoc">Ngọc bích</option></select></div>' +
    '      </div>' +
    '      <div class="form-group"><label>Khoảng giá (VNĐ)</label>' +
    '        <div class="price-range"><input type="text" class="js-price" name="minPrice" placeholder="Từ">' +
    '          <span>–</span><input type="text" class="js-price" name="maxPrice" placeholder="Đến"></div></div>' +
    '      <div class="form-group"><label for="adv-sort">Sắp xếp theo</label>' +
    '        <select id="adv-sort" name="sort"><option value="">Mặc định</option>' +
    '          <option value="price_asc">Giá tăng dần</option><option value="price_desc">Giá giảm dần</option>' +
    '          <option value="name_asc">Tên A-Z</option><option value="best_seller">Bán chạy nhất</option></select></div>' +
    '      <div class="adv-actions"><button type="reset" class="btn-outline">Đặt lại</button>' +
    '        <button type="submit" class="btn-primary">Tìm kiếm</button></div>' +
    '    </form>' +
    '  </div>' +
    '</div>';

  function initSearch() {
    var box = document.querySelector(".site-header .search-box");
    if (!box) return;

    box.addEventListener("submit", function (e) {
      e.preventDefault();
      var kw = box.querySelector("input").value.trim();
      window.location.href = searchPage + (kw ? "?keyword=" + encodeURIComponent(kw) : "");
    });

    document.body.insertAdjacentHTML("beforeend", ADV_SEARCH_HTML);
    var form = document.getElementById("advancedSearchForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var params = new URLSearchParams();
      new FormData(form).forEach(function (value, key) {
        if (String(value).trim() !== "") params.append(key, value);
      });
      closeModal(document.getElementById("advancedSearchModal"));
      window.location.href = searchPage + "?" + params.toString();
    });
  }

  /* ---------- Modal dùng chung: [data-open-modal="id"] mở .adv-modal#id ---------- */
  function openModal(modal) { modal.classList.add("is-open"); document.body.style.overflow = "hidden"; }
  function closeModal(modal) { modal.classList.remove("is-open"); document.body.style.overflow = ""; }
  window.openModal = openModal;
  window.closeModal = closeModal;

  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-open-modal]");
    if (opener) {
      e.preventDefault();
      var m = document.getElementById(opener.getAttribute("data-open-modal"));
      if (m) openModal(m);
      return;
    }
    if (e.target.classList.contains("adv-modal")) closeModal(e.target);
    var closer = e.target.closest(".adv-close");
    if (closer) closeModal(closer.closest(".adv-modal"));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".adv-modal.is-open").forEach(closeModal);
  });

  /* ---------- 4. Nút "Thêm vào giỏ" / "Xem nhanh" trên mỗi product card ---------- */
  function initCardActions() {
    document.querySelectorAll(".product-card").forEach(function (card) {
      if (card.closest("[data-no-card-actions]")) return;
      var info = card.querySelector(".product-info");
      if (!info || info.querySelector(".card-actions")) return;
      info.insertAdjacentHTML("beforeend",
        '<div class="card-actions">' +
        '  <button type="button" class="card-act js-add-cart" title="Thêm vào giỏ hàng">Thêm vào giỏ</button>' +
        '  <button type="button" class="card-act is-ghost js-quick-view" title="Xem nhanh">Xem nhanh</button>' +
        '</div>');
    });
  }

  /* ---------- 5. Quick View ---------- */
  function openQuickView(card) {
    var root = document.querySelector(".qv-overlay");
    if (!root) {
      root = document.createElement("div");
      root.className = "qv-overlay";
      document.body.appendChild(root);
    }
    var thumb = card.querySelector(".product-thumb");
    var detailHref = thumb ? thumb.getAttribute("href") : "product.html";
    var name = card.querySelector(".product-name");
    var price = card.querySelector(".product-price");
    var old = card.querySelector(".price-old");
    var art = "";
    if (thumb) {
      var clone = thumb.cloneNode(true);
      clone.querySelectorAll("button, .sale-badge").forEach(function (el) { el.remove(); });
      art = clone.innerHTML;
    }

    root.innerHTML =
      '<div class="qv-card" role="dialog" aria-modal="true" aria-label="Xem nhanh sản phẩm">' +
      '  <button type="button" class="qv-close" aria-label="Đóng">&times;</button>' +
      '  <div class="qv-body">' +
      '    <div class="qv-img">' + art + '</div>' +
      '    <div class="qv-content">' +
      '      <h2 class="qv-title">' + (name ? name.textContent.trim() : "Sản phẩm") + '</h2>' +
      '      <p class="qv-price">' + (price ? price.textContent : "") +
               (old ? ' <del>' + old.textContent + '</del>' : "") + '</p>' +
      '      <p class="qv-desc">Thiết kế độc quyền Lumière, chế tác thủ công tỉ mỉ. Sản phẩm kèm hộp quà, giấy kiểm định và chế độ bảo hành trọn đời.</p>' +
      '      <ul class="qv-meta">' +
      '        <li>✦ Miễn phí khắc tên theo yêu cầu</li>' +
      '        <li>✦ Đổi size miễn phí trong 72 giờ</li>' +
      '        <li>✦ Làm sạch, đánh bóng miễn phí trọn đời</li>' +
      '      </ul>' +
      '      <div class="qv-actions">' +
      '        <button type="button" class="btn-primary js-add-cart">Thêm vào giỏ hàng</button>' +
      '        <a href="' + detailHref + '" class="btn-outline">Xem chi tiết</a>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>';
    root.classList.add("is-open");

    function close() { root.classList.remove("is-open"); root.innerHTML = ""; }
    root.querySelector(".qv-close").addEventListener("click", close);
    root.onclick = function (e) { if (e.target === root) close(); };
    document.addEventListener("keydown", function onEsc(e) {
      if (e.key === "Escape") { close(); document.removeEventListener("keydown", onEsc); }
    });
  }

  /* ---------- 6. Bắt click toàn trang ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target;

    // Xem nhanh
    var qv = t.closest(".js-quick-view");
    if (qv) {
      e.preventDefault();
      openQuickView(qv.closest(".product-card"));
      return;
    }

    // Thêm vào giỏ (card, quick view, nút mua ở product.html)
    if (t.closest(".js-add-cart, .product-page .btn-buy, .product-page .btn-cart, #choose-modal .modal-buy")) {
      if (!isLoggedIn) return requireLogin(e);
      if (t.closest(".js-add-cart")) {
        e.preventDefault();
        alert("Thêm vào giỏ hàng thành công!");
      }
      // Mua ngay trong popup: báo thành công rồi chuyển vào giỏ hàng
      if (t.closest("#choose-modal .modal-buy")) {
        e.preventDefault();
        alert("Mua hàng thành công!");
        window.location.href = "cart.html";
      }
      return;
    }

    // Icon giỏ hàng / yêu thích trên header khi chưa đăng nhập
    var headerLink = t.closest('.header-right a[href="cart.html"], .header-right a[href="wishlist.html"]');
    if (headerLink && !isLoggedIn) return requireLogin(e);

    // Nút trái tim
    var wish = t.closest(".card-wish, .wish-btn");
    if (wish) {
      e.preventDefault();
      if (!isLoggedIn) return requireLogin(e);
      wish.classList.toggle("is-active");
      showToast(wish.classList.contains("is-active") ? "Đã thêm vào danh sách yêu thích" : "Đã bỏ khỏi danh sách yêu thích");
      return;
    }

    // Nút cần xác nhận: <a|button data-confirm="..." data-success="..." data-redirect="...">
    var cf = t.closest("[data-confirm]");
    if (cf) {
      e.preventDefault();
      if (confirm(cf.getAttribute("data-confirm"))) {
        if (cf.getAttribute("data-success")) alert(cf.getAttribute("data-success"));
        var to = cf.getAttribute("data-redirect");
        if (to) window.location.href = to;
      }
      return;
    }

    // Nút chỉ thông báo: <a|button data-alert="..." data-redirect="...">
    var al = t.closest("[data-alert]");
    if (al) {
      e.preventDefault();
      alert(al.getAttribute("data-alert"));
      if (al.getAttribute("data-redirect")) window.location.href = al.getAttribute("data-redirect");
      return;
    }

    // Menu Sản phẩm trên header: trang có khung danh mục thì xử lý giống bấm Danh mục
    var navLink = t.closest(".nav-list .has-dropdown a");
    if (navLink) {
      var navBtn = document.querySelector('.catalog .cat-btn[href="' + navLink.getAttribute("href") + '"]');
      if (navBtn) {
        e.preventDefault();
        navBtn.click();
        window.scrollTo({ top: document.querySelector(".catalog").getBoundingClientRect().top + window.pageYOffset - 110, behavior: "smooth" });
        return;
      }
    }

    // Danh mục: chỉ đổi nút đang chọn và tên hiển thị, danh sách sản phẩm giữ nguyên (web tĩnh)
    var cat = t.closest(".cat-btn");
    if (cat) {
      e.preventDefault();
      cat.closest("ul").querySelectorAll(".cat-btn").forEach(function (b) { b.classList.remove("is-active"); });
      cat.classList.add("is-active");
      var isAll = cat.getAttribute("href") === "all-products.html";
      var name = isAll ? "Tất cả sản phẩm" : cat.textContent;
      var title = document.querySelector(".catalog .page-heading, .catalog .section-title");
      if (title) {
        if (title.classList.contains("section-title") && !title.hasAttribute("data-home-title")) {
          title.setAttribute("data-home-title", title.textContent);
        }
        title.textContent = (isAll && title.getAttribute("data-home-title")) || name;
      }
      var sub = document.querySelector(".catalog .page-sub");
      if (sub && cat.getAttribute("data-desc")) sub.textContent = cat.getAttribute("data-desc");
      var crumb = document.querySelector(".breadcrumb ol");
      if (crumb) {
        var home = crumb.querySelector("a").getAttribute("href");
        crumb.innerHTML = '<li><a href="' + home + '">Trang chủ</a></li>' +
          (isAll ? '<li aria-current="page">Sản phẩm</li>'
            : '<li><a href="all-products.html">Sản phẩm</a></li><li aria-current="page">' + name + "</li>");
      }
      return;
    }
  });

  /* ---------- 7. Form demo: <form data-demo data-success="..." data-redirect="..."> ---------- */
  function initDemoForms() {
    document.querySelectorAll("form[data-demo]").forEach(function (form) {
      form.removeAttribute("onsubmit");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var missing = Array.prototype.some.call(form.querySelectorAll("[required]"), function (el) {
          return el.type === "checkbox" || el.type === "radio"
            ? !form.querySelector('[name="' + el.name + '"]:checked')
            : !String(el.value).trim();
        });
        if (missing) { alert(form.getAttribute("data-error") || "Vui lòng nhập đầy đủ thông tin!"); return; }
        var pass = form.querySelector("[data-password]");
        var again = form.querySelector("[data-password-confirm]");
        if (pass && again && pass.value !== again.value) { alert("Mật khẩu xác nhận không khớp!"); return; }
        if (form.getAttribute("data-ask") && !confirm(form.getAttribute("data-ask"))) return;
        alert(form.getAttribute("data-success") || "Thao tác thành công!");
        if (form.getAttribute("data-redirect")) window.location.href = form.getAttribute("data-redirect");
      });
    });
  }

  /* ---------- 8. Tabs: [data-tabs] > .tab-btn[data-tab="id"] + .tab-panel#id ---------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var btns = group.querySelectorAll(".tab-btn");
      function activate(id) {
        btns.forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-tab") === id); });
        document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.toggle("is-active", p.id === id); });
      }
      btns.forEach(function (b) {
        b.addEventListener("click", function (e) { e.preventDefault(); activate(b.getAttribute("data-tab")); });
      });
      // Nhớ tab khi quay lại từ trang khác (giống Web1: localStorage activeTab)
      var saved = null;
      try { saved = localStorage.getItem("activeTab"); localStorage.removeItem("activeTab"); } catch (err) {}
      var hash = window.location.hash.slice(1);
      var want = [hash, saved].filter(function (id) { return id && group.querySelector('[data-tab="' + id + '"]'); })[0];
      if (want) activate(want);
      window.addEventListener("hashchange", function () {
        var id = window.location.hash.slice(1);
        if (group.querySelector('[data-tab="' + id + '"]')) activate(id);
      });
    });
    document.querySelectorAll("[data-remember-tab]").forEach(function (a) {
      a.addEventListener("click", function () {
        try { localStorage.setItem("activeTab", a.getAttribute("data-remember-tab")); } catch (err) {}
      });
    });
  }

  /* ---------- 9. Phân trang tĩnh: chỉ đổi nút active ---------- */
  function initPagination() {
    document.querySelectorAll(".pagination").forEach(function (box) {
      var nums = box.querySelectorAll(".page-link:not([aria-label])");
      var prev = box.querySelector('.page-link[aria-label="Trang trước"]');
      var next = box.querySelector('.page-link[aria-label="Trang sau"]');
      box.addEventListener("click", function (e) { if (e.target.closest(".page-link")) e.preventDefault(); });
      function setActive(i) {
        nums.forEach(function (b, j) { b.classList.toggle("is-active", i === j); });
        if (prev) prev.classList.toggle("is-disabled", i === 0);
        if (next) next.classList.toggle("is-disabled", i === nums.length - 1);
      }
      function current() {
        return Array.prototype.findIndex.call(nums, function (b) { return b.classList.contains("is-active"); });
      }
      nums.forEach(function (b, i) { b.addEventListener("click", function () { setActive(i); }); });
      if (prev) prev.addEventListener("click", function () { if (current() > 0) setActive(current() - 1); });
      if (next) next.addEventListener("click", function () { if (current() < nums.length - 1) setActive(current() + 1); });
      setActive(0);
    });
  }

  /* ---------- 10. Banner slider trang chủ ---------- */
  function initHeroSlider() {
    var slider = document.querySelector(".hs-slider");
    if (!slider) return;
    var slides = slider.querySelectorAll(".hs-slide");
    var dots = slider.querySelectorAll(".hs-dot");
    var idx = 0;
    function go(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) { s.classList.toggle("is-active", j === idx); });
      dots.forEach(function (d, j) { d.classList.toggle("is-active", j === idx); });
    }
    dots.forEach(function (d, j) { d.addEventListener("click", function () { go(j); restart(); }); });
    var prev = slider.querySelector(".hs-prev");
    var next = slider.querySelector(".hs-next");
    if (prev) prev.addEventListener("click", function () { go(idx - 1); restart(); });
    if (next) next.addEventListener("click", function () { go(idx + 1); restart(); });
    var timer;
    function restart() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 5000); }
    go(0);
    restart();
  }

  /* ---------- Menu Sản phẩm luôn về một danh sách cố định ---------- */
  function initProductMenu() {
    var catalog = document.querySelector(".catalog");
    if (!catalog) {
      // Trang không có khung danh mục: mở trang tất cả sản phẩm với đúng tên loại đã chọn
      document.querySelectorAll(".nav-list .dropdown a").forEach(function (a) {
        var page = a.getAttribute("href").match(/^(nhan-cuoi|proposal|day-chuyen|bong-tai|collection)\.html$/);
        if (page) a.setAttribute("href", "all-products.html?cat=" + page[1]);
      });
      return;
    }
    var wanted = new URLSearchParams(window.location.search).get("cat");
    var btn = wanted && catalog.querySelector('.cat-btn[href="' + wanted + '.html"]');
    if (btn) btn.click();
  }

  initSearch();
  initProductMenu();
  initCardActions();
  initDemoForms();
  initTabs();
  initPagination();
  initHeroSlider();
})();
