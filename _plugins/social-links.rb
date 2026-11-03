# Renders social links through the existing social include while keeping
# upstream al_folio_core templates unchanged.
module Jekyll
  class SocialLinksTag < Liquid::Tag
    def render(context)
      site = context.registers[:site]
      return '' unless site

      include_path = File.join(site.source, '_includes', 'social.liquid')
      return '' unless File.exist?(include_path)

      include_source = File.read(include_path)
      template = Liquid::Template.parse(include_source)
      template.render!(context.environments.first, registers: context.registers)
    end
  end
end

Liquid::Template.register_tag('social_links', Jekyll::SocialLinksTag)
