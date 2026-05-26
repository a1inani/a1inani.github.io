# Configure a stable temp directory on Windows to avoid intermittent
# ExecJS temp-file permission/missing-file errors during JS minification.
if Gem.win_platform?
  require 'fileutils'

  Jekyll::Hooks.register :site, :after_init do |site|
    tmp_dir = File.join(site.source, '.jekyll-tmp')
    FileUtils.mkdir_p(tmp_dir)

    ENV['TMPDIR'] = tmp_dir
    ENV['TMP'] = tmp_dir
    ENV['TEMP'] = tmp_dir
  end
end
