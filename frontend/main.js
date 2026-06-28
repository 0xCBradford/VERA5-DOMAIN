/* Vera5 — progressive enhancement.
   Small, deferred, first-party. The page is fully functional without it. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  /* ----------------------------------------------------------
     Scrollspy: highlight the in-page nav link for the section
     currently in view.
     ---------------------------------------------------------- */
  (function scrollspy() {
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.primary-nav a[href^="#"]')
    );
    if (!navLinks.length || !("IntersectionObserver" in window)) return;

    var linkForSection = new Map();
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = id && document.getElementById(id);
      if (section) linkForSection.set(section, link);
    });
    if (!linkForSection.size) return;

    function setActive(link) {
      navLinks.forEach(function (l) {
        l.classList.remove("is-active");
        l.removeAttribute("aria-current");
      });
      if (link) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "true");
      }
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(linkForSection.get(entry.target));
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    linkForSection.forEach(function (link, section) {
      observer.observe(section);
    });
  })();

  /* ----------------------------------------------------------
     Command palette (⌘K / Ctrl+K / "/") — fuzzy jump to any
     section or to the repo. Keyboard-first, accessible.
     ---------------------------------------------------------- */
  (function commandPalette() {
    var ICONS = {
      section:
        '<svg class="cmdk-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></svg>',
      top:
        '<svg class="cmdk-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
      link:
        '<svg class="cmdk-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M12 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>'
    };

    var COMMANDS = [
      { kind: "top", label: "Top", tag: "Page", keywords: "home start hero top beginning" },
      { kind: "section", target: "problem", label: "The friction", tag: "Section", keywords: "friction problem context cost scattered" },
      { kind: "section", target: "product", label: "What Vera5 does", tag: "Section", keywords: "tool product features enrichment context" },
      { kind: "section", target: "trust", label: "Trust model", tag: "Section", keywords: "trust privacy security keys local telemetry" },
      { kind: "section", target: "audience", label: "Built for", tag: "Section", keywords: "audience analysts soc cti dfir hunters who" },
      { kind: "section", target: "status", label: "Current status", tag: "Section", keywords: "status roadmap development surfaces tracked" },
      { kind: "section", target: "principles", label: "Design principles", tag: "Section", keywords: "principles design decisions philosophy" },
      { kind: "link", target: "https://github.com/0xCBradford/Vera5", label: "View on GitHub", tag: "GitHub", keywords: "github source code repo open" }
    ];

    var overlay = document.createElement("div");
    overlay.className = "cmdk";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Command palette");
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="cmdk-backdrop" data-cmdk-close></div>' +
      '<div class="cmdk-panel">' +
      '<div class="cmdk-input-row">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<input class="cmdk-input" type="text" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Jump to\u2026" aria-label="Jump to">' +
      '<kbd>esc</kbd>' +
      "</div>" +
      '<ul class="cmdk-list" id="cmdk-list" role="listbox" aria-label="Commands"></ul>' +
      '<div class="cmdk-empty" hidden>No matches</div>' +
      '<div class="cmdk-foot">' +
      "<span><kbd>\u2191</kbd><kbd>\u2193</kbd> navigate</span>" +
      "<span><kbd>\u21B5</kbd> select</span>" +
      "<span><kbd>esc</kbd> close</span>" +
      "</div>" +
      "</div>";
    document.body.appendChild(overlay);

    var input = overlay.querySelector(".cmdk-input");
    var list = overlay.querySelector(".cmdk-list");
    var empty = overlay.querySelector(".cmdk-empty");

    var isOpen = false;
    var lastFocused = null;
    var filtered = [];
    var selected = 0;

    function matches(cmd, query) {
      if (!query) return true;
      var hay = (cmd.label + " " + cmd.keywords).toLowerCase();
      return query.split(/\s+/).every(function (tok) {
        return hay.indexOf(tok) !== -1;
      });
    }

    function render() {
      var query = input.value.trim().toLowerCase();
      filtered = COMMANDS.filter(function (c) {
        return matches(c, query);
      });
      list.innerHTML = "";
      filtered.forEach(function (cmd, i) {
        var li = document.createElement("li");
        li.className = "cmdk-item";
        li.id = "cmdk-opt-" + i;
        li.setAttribute("role", "option");
        li.innerHTML =
          ICONS[cmd.kind] +
          '<span class="cmdk-label"></span>' +
          '<span class="cmdk-tag"></span>';
        li.querySelector(".cmdk-label").textContent = cmd.label;
        li.querySelector(".cmdk-tag").textContent = cmd.tag;
        li.addEventListener("mousemove", function () {
          setSelected(i);
        });
        li.addEventListener("click", function () {
          activate(cmd);
        });
        list.appendChild(li);
      });
      empty.hidden = filtered.length > 0;
      list.hidden = filtered.length === 0;
      selected = 0;
      setSelected(0);
    }

    function setSelected(i) {
      if (!filtered.length) {
        input.removeAttribute("aria-activedescendant");
        return;
      }
      selected = (i + filtered.length) % filtered.length;
      var items = list.children;
      for (var j = 0; j < items.length; j++) {
        var on = j === selected;
        items[j].classList.toggle("is-selected", on);
        items[j].setAttribute("aria-selected", on ? "true" : "false");
      }
      input.setAttribute("aria-activedescendant", "cmdk-opt-" + selected);
      items[selected].scrollIntoView({ block: "nearest" });
    }

    function open() {
      if (isOpen) return;
      lastFocused = document.activeElement;
      input.value = "";
      overlay.hidden = false;
      isOpen = true;
      render();
      input.focus();
    }

    function close() {
      if (!isOpen) return;
      overlay.hidden = true;
      isOpen = false;
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    function activate(cmd) {
      close();
      var behavior = reduceMotion.matches ? "auto" : "smooth";
      if (cmd.kind === "top") {
        window.scrollTo({ top: 0, behavior: behavior });
      } else if (cmd.kind === "section") {
        var el = document.getElementById(cmd.target);
        if (el) {
          el.scrollIntoView({ behavior: behavior, block: "start" });
          if (history.replaceState) {
            history.replaceState(null, "", "#" + cmd.target);
          }
          el.setAttribute("tabindex", "-1");
          el.focus({ preventScroll: true });
        }
      } else if (cmd.kind === "link") {
        window.open(cmd.target, "_blank", "noopener");
      }
    }

    function isTypingTarget(el) {
      if (!el) return false;
      var tag = el.tagName;
      return (
        el.isContentEditable ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT"
      );
    }

    input.addEventListener("input", render);

    overlay.addEventListener("click", function (e) {
      if (e.target && e.target.hasAttribute("data-cmdk-close")) close();
    });

    overlay.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected(selected + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected(selected - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selected]) activate(filtered[selected]);
      } else if (e.key === "Tab") {
        e.preventDefault();
      }
    });

    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        isOpen ? close() : open();
      } else if (e.key === "/" && !isOpen && !isTypingTarget(e.target)) {
        e.preventDefault();
        open();
      }
    });
  })();

  /* ----------------------------------------------------------
     Hero demo: the mock enrichment card "resolves" on a gentle
     loop — sources shimmer, then settle, then the verdict lands.
     Decorative (the visual is aria-hidden); never runs under
     reduced motion, so the static resolved state is the default.
     ---------------------------------------------------------- */
  (function heroDemo() {
    if (reduceMotion.matches) return;

    var card = document.querySelector(".hv-card");
    var stage = document.querySelector(".hv-stage");
    if (!card || !stage) return;

    var rows = Array.prototype.slice.call(card.querySelectorAll(".hv-sources li"));
    var verdict = card.querySelector(".hv-verdict");
    if (!rows.length || !verdict) return;

    var verdictResolved = verdict.textContent;
    var timers = [];
    var inView = true;
    var playing = false;

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }
    function later(fn, ms) {
      timers.push(setTimeout(fn, ms));
    }

    function settle() {
      clearTimers();
      playing = false;
      card.classList.remove("is-scanning");
      verdict.classList.remove("is-analyzing");
      verdict.textContent = verdictResolved;
      rows.forEach(function (li) {
        li.classList.remove("is-loading");
      });
    }

    function cycle() {
      if (!inView || document.hidden) {
        playing = false;
        return;
      }
      playing = true;
      clearTimers();

      card.classList.add("is-scanning");
      verdict.classList.add("is-analyzing");
      verdict.textContent = "Analyzing";
      rows.forEach(function (li) {
        li.classList.add("is-loading");
      });

      rows.forEach(function (li, i) {
        later(function () {
          li.classList.remove("is-loading");
        }, 560 + i * 360);
      });

      var doneAt = 560 + rows.length * 360 + 220;
      later(function () {
        verdict.classList.remove("is-analyzing");
        verdict.textContent = verdictResolved;
        card.classList.remove("is-scanning");
      }, doneAt);

      later(cycle, doneAt + 5200);
    }

    function start() {
      if (!playing) cycle();
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          inView = entries[0].isIntersecting;
          if (inView && !document.hidden) start();
          else settle();
        },
        { threshold: 0.35 }
      ).observe(stage);
    } else {
      start();
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) settle();
      else if (inView) start();
    });

    // Re-trigger on intentional hover.
    stage.addEventListener("pointerenter", function () {
      clearTimers();
      cycle();
    });
  })();

  /* ----------------------------------------------------------
     Pointer flourishes: magnetic hero CTAs + a faint accent
     cursor glow. Fine-pointer devices only; off under reduced
     motion. Purely decorative — clicks are never intercepted.
     ---------------------------------------------------------- */
  (function pointerFx() {
    if (reduceMotion.matches) return;
    if (
      !window.matchMedia ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    // Magnetic CTAs.
    var STRENGTH = 0.25;
    var MAX = 7;
    Array.prototype.slice
      .call(document.querySelectorAll(".hero-actions .btn"))
      .forEach(function (btn) {
        btn.addEventListener("pointermove", function (e) {
          var r = btn.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) * STRENGTH;
          var dy = (e.clientY - (r.top + r.height / 2)) * STRENGTH;
          dx = Math.max(-MAX, Math.min(MAX, dx));
          dy = Math.max(-MAX, Math.min(MAX, dy));
          btn.style.setProperty("--mag-x", dx.toFixed(1) + "px");
          btn.style.setProperty("--mag-y", dy.toFixed(1) + "px");
        });
        btn.addEventListener("pointerleave", function () {
          btn.style.setProperty("--mag-x", "0px");
          btn.style.setProperty("--mag-y", "0px");
        });
      });

    // Accent cursor glow.
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    var tx = 0, ty = 0, lx = 0, ly = 0, visible = false, raf = 0;

    function frame() {
      lx += (tx - lx) * 0.18;
      ly += (ty - ly) * 0.18;
      glow.style.transform =
        "translate(" + lx.toFixed(1) + "px," + ly.toFixed(1) + "px) translate(-50%,-50%)";
      raf = requestAnimationFrame(frame);
    }

    function hide() {
      visible = false;
      glow.classList.remove("is-visible");
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        if (e.pointerType === "touch") return;
        tx = e.clientX;
        ty = e.clientY;
        if (!visible) {
          visible = true;
          lx = tx;
          ly = ty;
          glow.classList.add("is-visible");
        }
        var hot =
          e.target && e.target.closest
            ? e.target.closest("a, button, .cmdk-item")
            : null;
        glow.classList.toggle("is-active", !!hot);
        if (!raf) raf = requestAnimationFrame(frame);
      },
      { passive: true }
    );

    window.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) hide();
    });
  })();
})();
