---
title: Writing
---

{% assign sort_categories = site.categories | sort %}

{% for category in sort_categories %}
  {% assign category_name = category | first %}
  {% assign posts_of_category = category | last %}
  {% assign first_post = posts_of_category | first %}

  {% if category_name == first_post.categories[0] %}
    {% assign sub_categories = "" | split: "" %}

    {% for post in posts_of_category %}
      {% assign second_category = post.categories[1] %}
      {% if second_category %}
        {% unless sub_categories contains second_category %}
          {% assign sub_categories = sub_categories | push: second_category %}
        {% endunless %}
      {% endif %}
    {% endfor %}

    {% assign sub_categories = sub_categories | sort %}
    {% assign sub_categories_size = sub_categories | size %}

  <div class="card categories">

    <!-- Sub-categories -->
    {% if sub_categories_size > 0 %}
    <div id="l_{{ category_name }}" class="collapse show" aria-expanded="true">
      <ul class="list-group">
        {% for sub_category in sub_categories %}
        <li class="list-group-item">
          <i class="far fa-folder fa-fw"></i>
          <a href="{{ site.baseurl }}/categories/{{ sub_category | replace: ' ', '-' | downcase | url_encode }}/"
            class="ml-1 mr-2">{{ sub_category }}</a>
          {% assign posts_size = site.categories[sub_category] | size %}
          <span class="text-muted small font-weight-light">{{ posts_size }}
            post{% if posts_size > 1 %}s{% endif %}
          </span>
        </li>
        {% endfor %}
      </ul>
    </div>
    {% endif %}

  </div> <!-- .card -->

  {% endif %}
{% endfor %}
