/* Small progressive enhancements: theme toggle, heading anchors, TOC, copy buttons. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---- theme toggle ---- */
  function effectiveTheme() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---- copy buttons: post code blocks and BibTeX entries ---- */
  function addCopyButton(block) {
    var pre = block.querySelector('pre');
    if (!pre) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy to clipboard');
    btn.addEventListener('click', function () {
      var text = pre.innerText.replace(/\n$/, '');
      var done = function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
    block.appendChild(btn);
  }
  Array.prototype.forEach.call(document.querySelectorAll('.bibtex .code-block'), addCopyButton);

  var content = document.querySelector('.post-content');
  if (!content) return;

  /* ---- heading anchors ---- */
  var headings = content.querySelectorAll('h2[id], h3[id], h4[id]');
  Array.prototype.forEach.call(headings, function (h) {
    var a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + h.id;
    a.setAttribute('aria-label', 'Link to this section');
    a.textContent = '#';
    h.insertBefore(a, h.firstChild);
  });

  /* ---- table of contents (only when the layout rendered a <nav class="toc">) ---- */
  var toc = document.querySelector('nav.toc');
  if (toc) {
    var items = content.querySelectorAll('h2[id], h3[id]');
    if (items.length) {
      var list = toc.querySelector('.toc-list');
      var sub = null;
      Array.prototype.forEach.call(items, function (h) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/^#/, '');
        li.appendChild(a);
        if (h.tagName === 'H2') {
          list.appendChild(li);
          sub = null;
        } else {
          if (!sub) {
            sub = document.createElement('ol');
            var parent = list.lastElementChild;
            if (parent) parent.appendChild(sub); else list.appendChild(sub);
          }
          sub.appendChild(li);
        }
      });
      toc.hidden = false;

      /* scrollspy: highlight the last heading that has scrolled past the top */
      var links = {};
      Array.prototype.forEach.call(toc.querySelectorAll('a'), function (a) {
        links[a.getAttribute('href').slice(1)] = a;
      });
      var inner = toc.querySelector('.toc-inner');
      var current = null;
      var ticking = false;
      var update = function () {
        ticking = false;
        var active = null;
        var offset = 80;
        for (var i = 0; i < items.length; i++) {
          if (items[i].getBoundingClientRect().top - offset <= 0) active = items[i]; else break;
        }
        // at the very bottom, the last section wins even if its heading can't reach the top
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
          active = items[items.length - 1];
        }
        var link = active ? links[active.id] : null;
        if (link === current) return;
        if (current) current.classList.remove('active');
        if (link) {
          link.classList.add('active');
          // keep the active entry visible when the TOC itself scrolls
          if (inner && inner.scrollHeight > inner.clientHeight) {
            var top = link.offsetTop - inner.offsetTop;
            if (top < inner.scrollTop || top > inner.scrollTop + inner.clientHeight - 30) {
              inner.scrollTop = top - inner.clientHeight / 3;
            }
          }
        }
        current = link;
      };
      var onScroll = function () {
        if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    }
  }

  Array.prototype.forEach.call(content.querySelectorAll('div.highlighter-rouge'), addCopyButton);
})();
