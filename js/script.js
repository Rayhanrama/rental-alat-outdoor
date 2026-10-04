/* ==========================================================================
   RimbaRent — script.js
   Interaksi sederhana tanpa backend:
   - mobile menu toggle
   - filter kategori (katalog)
   - galeri thumbnail (detail)
   - estimasi rental (rental)
   - feedback submit form (prototype)
   ========================================================================== */
(function () {
  "use strict";

  var rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  });

  function formatRupiah(n) {
    return rupiah.format(Number.isFinite(n) ? n : 0);
  }

  /* ------------------------------------------------------------------ */
  /* 1. Mobile menu                                                     */
  /* ------------------------------------------------------------------ */
  function initMobileMenu() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var drawer = document.querySelector("[data-nav-drawer]");
    if (!toggle || !drawer) return;

    function close() {
      toggle.setAttribute("aria-expanded", "false");
      drawer.classList.remove("is-open");
    }
    function open() {
      toggle.setAttribute("aria-expanded", "true");
      drawer.classList.add("is-open");
    }

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    });

    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 992) close();
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2. Filter kategori (katalog)                                       */
  /* ------------------------------------------------------------------ */
  function initFilter() {
    var bar = document.querySelector("[data-filter-bar]");
    if (!bar) return;

    var chips = bar.querySelectorAll("[data-filter]");
    var grid = document.querySelector("[data-product-grid]");
    var items = grid ? grid.querySelectorAll("[data-category]") : [];
    var empty = document.querySelector("[data-empty-state]");
    var countEl = document.querySelector("[data-result-count]");

    function apply(value) {
      var shown = 0;
      items.forEach(function (item) {
        var cats = (item.getAttribute("data-category") || "").split(" ");
        var match = value === "all" || cats.indexOf(value) !== -1;
        item.hidden = !match;
        if (match) shown += 1;
      });

      chips.forEach(function (chip) {
        var active = chip.getAttribute("data-filter") === value;
        chip.classList.toggle("is-active", active);
        chip.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (empty) empty.hidden = shown !== 0;
      if (countEl) countEl.textContent = shown;
    }

    bar.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-filter]");
      if (!chip) return;
      apply(chip.getAttribute("data-filter"));
    });

    apply("all");
  }

  /* ------------------------------------------------------------------ */
  /* 3. Galeri thumbnail (detail)                                       */
  /* ------------------------------------------------------------------ */
  function initDetailGallery() {
    var thumbs = document.querySelectorAll("[data-thumb]");
    var main = document.querySelector("[data-detail-image]");
    if (!thumbs.length || !main) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var src = thumb.getAttribute("data-thumb");
        main.setAttribute("src", src);
        thumbs.forEach(function (t) { t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 4. Estimasi rental                                                 */
  /* ------------------------------------------------------------------ */
  function initEstimate() {
    var form = document.querySelector("[data-rental-form]");
    if (!form) return;

    var select = form.querySelector("[data-field='alat']");
    var qty = form.querySelector("[data-field='jumlah']");
    var start = form.querySelector("[data-field='mulai']");
    var end = form.querySelector("[data-field='kembali']");

    var outPerDay = document.querySelector("[data-estimate='perday']");
    var outDays = document.querySelector("[data-estimate='days']");
    var outQty = document.querySelector("[data-estimate='qty']");
    var outTotal = document.querySelector("[data-estimate='total']");
    var outName = document.querySelector("[data-estimate='name']");

    function priceOf(option) {
      if (!option) return 0;
      var direct = option.getAttribute("data-price");
      if (direct) return parseInt(direct, 10) || 0;
      var value = option.value || "";
      var parsed = parseInt(value.replace(/[^\d]/g, ""), 10);
      return Number.isFinite(parsed) ? parsed : 0;
    }

    function daysBetween(a, b) {
      if (!a || !b) return 0;
      var d1 = new Date(a);
      var d2 = new Date(b);
      if (isNaN(d1) || isNaN(d2)) return 0;
      var diff = Math.round((d2 - d1) / 86400000);
      return diff > 0 ? diff : 0;
    }

    function update() {
      var option = select && select.selectedIndex >= 0 ? select.options[select.selectedIndex] : null;
      var perDay = priceOf(option);
      var qtyVal = qty ? Math.max(1, parseInt(qty.value, 10) || 1) : 1;
      var days = daysBetween(start && start.value, end && end.value);
      var total = perDay * qtyVal * days;

      if (outPerDay) outPerDay.textContent = perDay ? formatRupiah(perDay) : "—";
      if (outQty) outQty.textContent = qty ? qtyVal + " unit" : "—";
      if (outDays) outDays.textContent = days ? days + " hari" : "—";
      if (outTotal) outTotal.textContent = total ? formatRupiah(total) : formatRupiah(0);
      if (outName) {
        var label = option && option.value ? option.textContent.trim() : "—";
        outName.textContent = label || "—";
      }
    }

    [select, qty, start, end].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    });

    // Sinkronkan tanggal minimum
    if (start && end) {
      var today = new Date().toISOString().split("T")[0];
      if (!start.min) start.min = today;
      start.addEventListener("change", function () {
        if (!end.min || end.min < start.value) end.min = start.value;
        if (end.value && end.value < start.value) end.value = start.value;
        update();
      });
    }

    update();
  }

  /* ------------------------------------------------------------------ */
  /* 5. Submit form (prototype — tanpa backend)                         */
  /* ------------------------------------------------------------------ */
  function initFormSubmit() {
    var form = document.querySelector("[data-rental-form]");
    if (!form) return;
    var feedback = document.querySelector("[data-form-feedback]");
    var feedbackText = feedback ? feedback.querySelector("[data-feedback-text]") : null;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var select = form.querySelector("[data-field='alat']");
      var nama = form.querySelector("[data-field='nama']");
      var days = document.querySelector("[data-estimate='days']");
      var total = document.querySelector("[data-estimate='total']");

      if (feedback && feedbackText) {
        var toolName = select && select.value ? select.options[select.selectedIndex].textContent.trim() : "alat";
        feedbackText.innerHTML =
          "Terima kasih, <strong>" + (nama && nama.value ? nama.value : "Kak") + "</strong>! " +
          "Pengajuan sewa <strong>" + toolName + "</strong> " +
          (days ? "(<strong>" + days.textContent + "</strong>) " : "") +
          "dengan estimasi <strong>" + (total ? total.textContent : "-") + "</strong> " +
          "telah dicatat sebagai <em>prototype</em>. Tim RimbaRent akan menghubungimu via WhatsApp untuk konfirmasi.";
        feedback.classList.add("is-visible");
        feedback.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      form.reset();
      var qty = form.querySelector("[data-field='jumlah']");
      if (qty) qty.value = 1;
      form.dispatchEvent(new Event("input"));
    });
  }

  /* ------------------------------------------------------------------ */
  /* 6. Tahun footer otomatis                                           */
  /* ------------------------------------------------------------------ */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initFilter();
    initDetailGallery();
    initEstimate();
    initFormSubmit();
    initYear();
  });
})();
