---
layout: page
title: Publications
permalink: /publications/
---
{%- comment -%} Entries in _research_projects with `type: thesis` go under Theses. {%- endcomment -%}
{% assign sorted = site.research_projects | sort: "order" | reverse %}
{% assign pubs = sorted | where_exp: "p", "p.type != 'thesis'" %}
{% assign theses = sorted | where_exp: "p", "p.type == 'thesis'" %}

<ul class="entry-list">
{% for item in pubs %}{% include entry.html item=item %}{% endfor %}
</ul>

## Theses

<ul class="entry-list">
{% for item in theses %}{% include entry.html item=item %}{% endfor %}
</ul>

## Projects

{% assign projs = site.projects | sort: "order" | reverse %}
<ul class="entry-list">
{% for item in projs %}{% include entry.html item=item %}{% endfor %}
</ul>

## Software

{% assign tools = site.tools | sort: "order" | reverse %}
<ul class="entry-list">
{% for item in tools %}{% include entry.html item=item %}{% endfor %}
</ul>
