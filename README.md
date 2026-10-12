# Personal website

Minimal, blog-first Jekyll site (no remote theme). Layouts, includes and CSS live in
this repo and build with the `github-pages` gem, so local output matches GitHub Pages.

## Local setup

```sh
# Ruby >= 3.0 (e.g. `brew install ruby`, then put it on PATH)
gem install bundler
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve            # http://localhost:4000
bundle exec jekyll serve --drafts   # also show posts from _drafts/
```

`_config.yml` is not live-reloaded; restart `jekyll serve` after editing it.

## Writing a post

Create `_posts/YYYY-MM-DD-my-slug.md` (URL becomes `/blog/my-slug/`). Start from
`_drafts/post-template.md`, which demonstrates every supported feature.

```yaml
---
title: "Post title"          # required
date: 2026-01-31 10:00:00 -0800
description: "One line shown under the title on /blog/ and used for SEO"  # optional
tags: [cuda, robotics]       # optional, shown in the meta line
toc: true                    # optional, table of contents from h2/h3 (default false)
math: true                   # optional, KaTeX (default true for posts; false to skip loading it)
---
```

Posts get `layout: post` and `math: true` by default (see `defaults` in `_config.yml`).

- **Drafts**: put files in `_drafts/` (no date in the filename) and preview with `--drafts`.
- **TOC**: `toc: true` renders an empty `<nav class="toc">` that `assets/js/main.js`
  fills from the post's `h2`/`h3` headings in the browser (no plugin needed).
- **Code**: fenced blocks with a language (` ```cuda `, ` ```cpp `, ` ```python `) are highlighted by Rouge.
  Colors are in `assets/css/syntax.css`. A copy button appears on hover.
- **Callout**: put `{: .note}` on the line directly after a paragraph or blockquote.
- **Figure with caption**: use raw HTML
  `<figure><img src="{{ '/assets/images/x.png' | relative_url }}" alt="..."><figcaption>...</figcaption></figure>`.
- **Liquid gotcha**: `{{`, `{%` inside code or math are parsed by Liquid; wrap such blocks in `{% raw %}...{% endraw %}`.

## Math

KaTeX (pinned to 0.16.11 via jsDelivr, see `_includes/math.html`) auto-renders in the browser.

- Prefer **`$$ ... $$`**. kramdown handles it before Markdown, so `_`, `*`, `\\` and `&` are safe.
  Inline: `$$x_i$$` in a sentence. Display: put `$$` on its own paragraph (blank lines around it).
- Single `$x$` also renders, but kramdown runs first and may eat underscores/asterisks as emphasis
  (`$a_i + b_i$` can break). Use `$$` or escape with `\_`.
- `\( ... \)` and `\[ ... \]` work too. Use `aligned`/`bmatrix` environments inside `$$`.
- Wide display equations scroll horizontally instead of overflowing the page.

## Content data

`_research_projects`, `_projects`, `_company_projects` and `_tools` are *data only*
(`output: false`); they are listed on `/` (experience) and `/publications/`.
Use `order:` to sort (higher first). The abstract goes in front matter as `section.abstract`
(or `sections.abstract`); the body is the authors line plus a `{: .links}` paragraph.

## Deploy

Push to the branch GitHub Pages builds from; the site builds with the stock `github-pages`
environment (only `jekyll-feed` and `jekyll-seo-tag` plugins are used). `url`/`baseurl`
are set in `_config.yml` (`baseurl: ""` for a user site; use `/repo-name` for a project site).
