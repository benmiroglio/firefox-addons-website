# Firefox Addons Webpage

Code that generates the RMarkdown website that lives here: https://metrics.mozilla.com/protected/bmiroglio/firefox-addons/_site/ (Mozilla LDAP credentials required)

This is updated daily by the following steps:
 * Schedule notebooks to run daily on [ATMO](https://analysis.telemetry.mozilla.org)
     + The notebooks write json to s3
 * Setup a cron on dashboard1 to pull from s3 daily
 * Re-render the site from dashboard1
 
 
 You can build part of this site locally from R by:
  * cloning the repo
  * install R + rmarkdown package if not already installed
  * change the data souce in [this line](https://github.com/benmiroglio/firefox-addons/blob/master/js/main.js#L32) in `js/main.js` to `addon-counts-new-randomized.json`. This is random data not indicative of Firefox usage whatsoever.
  * run `$ Rscript -e "rmarkdown::render_site()" && open _site/index.html` from the top level directory.
