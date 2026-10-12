---
layout: page
title: Blog
permalink: /blog/
---
{%- comment -%} Drafts only exist in local previews (`jekyll serve --drafts`); GitHub Pages never builds them. {%- endcomment -%}
{% assign published = site.posts | where_exp: "p", "p.draft != true" %}
{% assign drafts = site.posts | where_exp: "p", "p.draft == true" %}
{% assign years = published | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in years %}
<h2 class="year">{{ year.name }}</h2>
<ul class="post-list">
  {% for post in year.items %}
  <li>
    <time class="post-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d" }}</time>
    <div class="post-entry">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      {% if post.description %}<div class="post-desc">{{ post.description }}</div>{% endif %}
    </div>
  </li>
  {% endfor %}
</ul>
{% endfor %}
{% if published.size == 0 %}<p class="muted">Nothing here yet.</p>{% endif %}

{% if drafts.size > 0 %}
<h2 class="year">Drafts <span class="draft-badge">local preview only</span></h2>
<ul class="post-list">
  {% for post in drafts %}
  <li>
    <span class="post-date">draft</span>
    <div class="post-entry">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      {% if post.description %}<div class="post-desc">{{ post.description }}</div>{% endif %}
    </div>
  </li>
  {% endfor %}
</ul>
{% endif %}
