source "https://rubygems.org"

# Match what GitHub Pages runs so local builds == deployed builds.
# Update with: bundle update github-pages
gem "github-pages", group: :jekyll_plugins

# Plugins (all whitelisted by GitHub Pages)
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end

# Needed by `jekyll serve` on Ruby >= 3.0
gem "webrick"
# Needed by the github-pages stack on newer Ruby versions
gem "faraday-retry"

# Windows and JRuby does not include zoneinfo files
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
