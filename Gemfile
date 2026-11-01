source 'https://rubygems.org'

gem 'jekyll'

# Core plugins that directly affect site building
group :jekyll_plugins do
    gem 'jekyll-archives-v2'
    gem 'jekyll-email-protect'
    gem 'jekyll-feed'
    gem 'jekyll-get-json'
    gem 'jekyll-imagemagick'
    gem 'jekyll-jupyter-notebook'
    gem 'jekyll-link-attributes'
    gem 'jekyll-minifier'
    gem 'jekyll-paginate-v2'
    gem 'jekyll-regex-replace'
    gem 'jekyll-scholar'
    gem 'jekyll-sitemap'
    gem 'jekyll-tabs'
    gem 'jekyll-terser', :git => "https://github.com/RobertoJBeltran/jekyll-terser.git"
    gem 'jekyll-toc'
    gem 'jekyll-twitter-plugin'
    gem 'jemoji'

    gem 'classifier-reborn'  # used for content categorization during the build
end

# Gems for development or external data fetching (outside :jekyll_plugins)
group :other_plugins do
    gem 'css_parser'
    gem 'feedjira'
    gem 'httparty'
    gem 'observer'       # used by jekyll-scholar
    gem 'ostruct'        # used by jekyll-twitter-plugin
    # gem 'terser'         # used by jekyll-terser
    # gem 'unicode_utils' -- should be already installed by jekyll
    # gem 'webrick' -- should be already installed by jekyll
end

# Plugin gems that provide managed runtime assets and build-time helpers.
group :al_folio_plugins do
    gem 'al_folio_core',    '= 1.0.9'
    gem 'al_folio_distill', '= 1.0.1'
    gem 'al_citations',     '= 1.0.1'
    gem 'al_ext_posts',     '= 1.0.1'
    gem 'al_search',        '= 1.0.2'
    gem 'al_icons',         '= 1.0.0'
end

# Upgrade tooling for incremental migration toward al-folio v1.x.
group :al_folio_tools do
    gem 'al_folio_upgrade', '= 1.0.3'
end
