---
title: Tags
---


  <div class="card categories">
{% assign tags = "" | split: "" %}
{% for t in site.tags %}
  {% assign tags = tags | push: t[0] %}
{% endfor %}

  <div id="l_{{ sorted_tags }}" class="collapse show" aria-expanded="true">
    <ul class="list-group">
      {% assign sorted_tags = tags | sort_natural %}
      {% for t in sorted_tags %}
      <li class="list-group-item">
        <i class="far fa-folder fa-fw"></i>
        <a href="{{ site.baseurl }}/tags/{{ t | replace: ' ', '-' | downcase | url_encode }}/"
          class="ml-1 mr-2">{{ t }}</a>
        <span class="text-muted small font-weight-light">{{ site.tags[t].size }}
          post{% if site.tags[t].size  > 1 %}s{% endif %}
        </span>
      </li>
      {% endfor %}
    </ul>
  </div>

  </div> <!-- .card -->
