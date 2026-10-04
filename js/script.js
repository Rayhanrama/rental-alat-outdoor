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

      var toolName = select && select.value ? select.options[select.selectedIndex].textContent.trim() : "alat";

      // --- Simpan pengajuan ke riwayat (localStorage) ---
      var qtyEl = form.querySelector("[data-field='jumlah']");
      var startEl = form.querySelector("[data-field='mulai']");
      var endEl = form.querySelector("[data-field='kembali']");
      var catatanEl = form.querySelector("#catatan");
      var waEl = form.querySelector("#wa");
      var emailEl = form.querySelector("#email");

      var record = {
        id: "R" + Date.now(),
        nama: nama && nama.value ? nama.value.trim() : "",
        wa: waEl && waEl.value ? waEl.value.trim() : "",
        email: emailEl && emailEl.value ? emailEl.value.trim() : "",
        alat: toolName,
        jumlah: qtyEl ? Math.max(1, parseInt(qtyEl.value, 10) || 1) : 1,
        mulai: startEl ? startEl.value : "",
        kembali: endEl ? endEl.value : "",
        lamaHari: days ? (parseInt(days.textContent, 10) || 0) : 0,
        total: total ? total.textContent : formatRupiah(0),
        catatan: catatanEl && catatanEl.value ? catatanEl.value.trim() : "",
        status: "menunggu",
        dibuat: new Date().toISOString()
      };
      addRiwayat(record);

      if (feedback && feedbackText) {
        feedbackText.innerHTML =
          "Terima kasih, <strong>" + (record.nama ? record.nama : "Kak") + "</strong>! " +
          "Pengajuan sewa <strong>" + toolName + "</strong> " +
          (days ? "(<strong>" + days.textContent + "</strong>) " : "") +
          "dengan estimasi <strong>" + (total ? total.textContent : "-") + "</strong> " +
          "telah dicatat pada <strong>riwayat</strong> di bawah. Tim RimbaRent akan menghubungimu via WhatsApp untuk konfirmasi.";
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
  /* 7. Riwayat sewa (localStorage — prototype, tanpa backend)          */
  /* ------------------------------------------------------------------ */
  var RIWAYAT_KEY = "rimbarent-rentals";

  function getRiwayat() {
    try {
      var raw = window.localStorage.getItem(RIWAYAT_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (err) {
      return [];
    }
  }

  function saveRiwayat(list) {
    try {
      window.localStorage.setItem(RIWAYAT_KEY, JSON.stringify(list));
      return true;
    } catch (err) {
      return false;
    }
  }

  function addRiwayat(record) {
    var list = getRiwayat();
    list.unshift(record);
    saveRiwayat(list);
    renderRiwayat();
  }

  function formatTanggal(iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  }

  function statusLabel(status) {
    if (status === "selesai") return { text: "Selesai", cls: "badge--ok" };
    if (status === "batal") return { text: "Dibatalkan", cls: "badge--maint" };
    return { text: "Menunggu Konfirmasi", cls: "badge--busy" };
  }

  function renderRiwayat() {
    var listEl = document.querySelector("[data-history-list]");
    if (!listEl) return;
    var emptyEl = document.querySelector("[data-history-empty]");
    var clearBtn = document.querySelector("[data-clear]");
    var sumCount = document.querySelector("[data-summary-count]");
    var sumTotal = document.querySelector("[data-summary-total]");

    var list = getRiwayat();

    // Ringkasan
    if (sumCount) sumCount.textContent = list.length + " pengajuan";
    if (sumTotal) {
      var grand = 0;
      list.forEach(function (r) {
        var n = parseInt(String(r.total).replace(/[^\d]/g, ""), 10);
        if (Number.isFinite(n)) grand += n;
      });
      sumTotal.textContent = formatRupiah(grand);
    }

    // Empty state & tombol hapus semua
    if (emptyEl) emptyEl.hidden = list.length !== 0;
    if (clearBtn) clearBtn.hidden = list.length === 0;

    // Kartu
    listEl.innerHTML = "";
    list.forEach(function (r) {
      var st = statusLabel(r.status);
      var card = document.createElement("article");
      card.className = "history-card";
      card.setAttribute("data-history-id", r.id);

      card.innerHTML =
        '<div class="history-card__head">' +
          '<div>' +
            '<h3 class="history-card__tool">' + escapeHtml(r.alat) + "</h3>" +
            '<p class="history-card__date">Diajukan ' + formatTanggal(r.dibuat) + " · " + escapeHtml(r.id) + "</p>" +
          "</div>" +
          '<span class="badge ' + st.cls + ' history-card__badge"><span class="badge__dot"></span>' + st.text + "</span>" +
        "</div>" +
        '<div class="history-card__rows">' +
          '<div><span>Jumlah</span><b>' + r.jumlah + " unit</b></div>" +
          '<div><span>Lama sewa</span><b>' + (r.lamaHari ? r.lamaHari + " hari" : "—") + "</b></div>" +
          '<div><span>Mulai</span><b>' + formatTanggal(r.mulai) + "</b></div>" +
          '<div><span>Kembali</span><b>' + formatTanggal(r.kembali) + "</b></div>" +
          '<div><span>Total estimasi</span><b class="history-card__total">' + escapeHtml(r.total) + "</b></div>" +
        "</div>" +
        '<div class="history-card__actions">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-rebook="' + escapeHtml(r.id) + '">Sewa lagi</button>' +
          (r.status === "menunggu"
            ? '<button class="btn btn--ghost btn--sm" type="button" data-done="' + escapeHtml(r.id) + '">Tandai selesai</button>'
            : "") +
          '<button class="btn btn--ghost btn--sm history-card__remove" type="button" data-remove="' + escapeHtml(r.id) + '">Hapus</button>' +
        "</div>";

      listEl.appendChild(card);
    });
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initRiwayat() {
    var listEl = document.querySelector("[data-history-list]");
    if (!listEl) return;

    renderRiwayat();

    // Delegasi klik untuk aksi di kartu
    listEl.addEventListener("click", function (e) {
      var rebook = e.target.closest("[data-rebook]");
      var remove = e.target.closest("[data-remove]");
      var done = e.target.closest("[data-done]");

      if (rebook) {
        rebookItem(rebook.getAttribute("data-rebook"));
      } else if (done) {
        updateStatus(done.getAttribute("data-done"), "selesai");
      } else if (remove) {
        var list = getRiwayat().filter(function (r) {
          return r.id !== remove.getAttribute("data-remove");
        });
        saveRiwayat(list);
        renderRiwayat();
      }
    });

    // Hapus semua
    var clearBtn = document.querySelector("[data-clear]");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        if (window.confirm("Hapus semua riwayat pengajuan? Tindakan ini tidak bisa dibatalkan.")) {
          saveRiwayat([]);
          renderRiwayat();
        }
      });
    }
  }

  function updateStatus(id, status) {
    var list = getRiwayat().map(function (r) {
      if (r.id === id) r.status = status;
      return r;
    });
    saveRiwayat(list);
    renderRiwayat();
  }

  function rebookItem(id) {
    var form = document.querySelector("[data-rental-form]");
    if (!form) return;
    var r = getRiwayat().filter(function (x) { return x.id === id; })[0];
    if (!r) return;

    // Cocokkan nama alat ke <option>
    var select = form.querySelector("[data-field='alat']");
    if (select) {
      var opt = Array.prototype.slice.call(select.options).filter(function (o) {
        return o.textContent.trim() === r.alat;
      })[0];
      if (opt) select.value = opt.value;
    }
    var qty = form.querySelector("[data-field='jumlah']");
    if (qty) qty.value = r.jumlah || 1;
    var catatan = form.querySelector("#catatan");
    if (catatan) catatan.value = r.catatan || "";
    var nama = form.querySelector("[data-field='nama']");
    if (nama && r.nama) nama.value = r.nama;
    var wa = form.querySelector("#wa");
    if (wa && r.wa) wa.value = r.wa;
    var email = form.querySelector("#email");
    if (email && r.email) email.value = r.email;

    form.dispatchEvent(new Event("input", { bubbles: true }));
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    var namaField = form.querySelector("[data-field='nama']");
    if (namaField) namaField.focus({ preventScroll: true });
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
    initRiwayat();
    initYear();
  });
})();
