/* Night Java — static site behaviour (no dependencies) */
(function () {
  "use strict";
  var KEY = "nightjava.read";
  var read = {};
  try { read = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { read = {}; }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(read)); } catch (e) { /* private mode */ }
  }

  var topicLinks = Array.prototype.slice.call(document.querySelectorAll("a[href*='.html'][href*='topics/']"));
  var allSlugs = [];
  document.querySelectorAll("[data-check], [data-read-btn]").forEach(function (el) {
    var s = el.getAttribute("data-check") || el.getAttribute("data-slug");
    if (s && allSlugs.indexOf(s) === -1) allSlugs.push(s);
  });
  topicLinks.forEach(function (a) {
    var m = a.getAttribute("href").match(/topics\/(.+)\.html/);
    if (m && allSlugs.indexOf(m[1]) === -1) allSlugs.push(m[1]);
  });

  function render() {
    // sidebar + index checkmarks
    document.querySelectorAll("[data-check]").forEach(function (el) {
      el.classList.toggle("read", !!read[el.getAttribute("data-check")]);
      el.textContent = read[el.getAttribute("data-check")] ? "✓" : "";
    });
    // index cards
    topicLinks.forEach(function (a) {
      var m = a.getAttribute("href").match(/topics\/(.+)\.html/);
      if (m) a.classList.toggle("is-read", !!read[m[1]]);
    });
    // read buttons
    document.querySelectorAll("[data-read-btn]").forEach(function (btn) {
      var slug = btn.getAttribute("data-slug");
      var isRead = !!read[slug];
      btn.classList.toggle("read", isRead);
      btn.querySelector(".read-icon").textContent = isRead ? "✓" : "○";
      btn.childNodes[btn.childNodes.length - 1].textContent = isRead ? " Read" : " Mark as read";
    });
    // progress text + bar
    var count = allSlugs.filter(function (s) { return read[s]; }).length;
    var total = allSlugs.length || 40;
    document.querySelectorAll("[data-progress-text]").forEach(function (el) {
      el.textContent = count + " / " + total + " topics read";
    });
    document.querySelectorAll("[data-progress-bar]").forEach(function (el) {
      el.style.width = total ? (count / total) * 100 + "%" : "0";
    });
  }

  document.querySelectorAll("[data-read-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var slug = btn.getAttribute("data-slug");
      read[slug] = !read[slug];
      if (!read[slug]) delete read[slug];
      save();
      render();
    });
  });

  // tabs (notes / code examples)
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".panel").forEach(function (p) {
        var on = p.getAttribute("data-panel") === tab.getAttribute("data-tab");
        p.classList.toggle("active", on);
        p.hidden = !on;
      });
    });
  });

  // index search: filter topic cards, hide empty phases
  var search = document.querySelector(".search");
  if (search) {
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      document.querySelectorAll(".phase").forEach(function (phase) {
        var visible = 0;
        phase.querySelectorAll(".topic-card").forEach(function (card) {
          var hit = !q || (card.getAttribute("data-search") || "").indexOf(q) !== -1;
          card.hidden = !hit;
          if (hit) visible++;
        });
        phase.hidden = visible === 0;
      });
    });
  }

  // sidebar filter + phase jump
  var filter = document.querySelector(".side-filter");
  if (filter) {
    filter.addEventListener("input", function () {
      var q = filter.value.trim().toLowerCase();
      document.querySelectorAll(".side-link").forEach(function (a) {
        a.hidden = q && a.textContent.toLowerCase().indexOf(q) === -1;
      });
    });
  }
  var phaseSel = document.querySelector(".side-phase");
  if (phaseSel) {
    phaseSel.addEventListener("change", function () {
      var here = location.pathname.replace(/topics\/[^/]+\.html$/, "");
      location.href = here + "../index.html#phase-" + phaseSel.value;
    });
  }

  render();
})();
