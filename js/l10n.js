function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

addon_lst = {
    "jid1-NIfFY2CA8fy1tg@jetpack": "Adblock",
    "YoutubeDownloader@PeterOlayev.com": "1-Click Youtube Video Downloader",
    "{e4a8a97b-f2ed-450b-b12d-ee082ba24781}": "Greasemonkey",
    "{bee6eb20-01e0-ebd1-da83-080329fb9a3a}": "Flash and Video Download",
    "{73a6fe31-595d-460b-a920-fcc0f8843232}": "NoScript",
    "jid1-FkPKYIvh3ElkQO@jetpack": "signTextJS plus",
    "jid1-93WyvpgvxzGATw@jetpack": "To Google Translate",
    "{bc919484-f20e-48e2-a7c8-6642e111abce}": "Pinterest Save Button",
    "newtaboverride@agenedia.com": "New Tab Override",
    "https-everywhere@eff.org": "HTTPS Everywhere"}

locales = {    
    "zh-CN": "Chinese",
    "nl": "Dutch",
    "fr": "French",
    "de": "German",
    "it": "Italian",
    "pt-BR": "Portuguese Brazil",
    "es-ES": "Spanish"
}

markers = [
      {
        'date': new Date('2018-07-16T8:00:00.000Z'),
        'label': 'Campaign Starts'
      }
]


function localeGraph(locale,  path="data/l10n-localization-campaign.json") {
  d3.json(path, function(data){
    locale_data = data["locale"].filter(x => x['locale'] == locale)
    MG.convert.date(locale_data, "date", "%Y%m%d")
    
    console.log(locale_data)
    MG.data_graphic({
      target:'.' + locale,
      title: "Percent of " +locales[locale] + " Users with Add-ons By Day",
      data: locale_data,
      chart_type:'line',
      linked: true,
      x_label: "date",
      x_accessor: 'date',
      y_accessor: 'pct_addon_users',
      x_axis: true,
      full_width: true,
      format: "percentage",
      point_size: 5,
      height: 250,
      markers: markers,
      y_mouseover: function(d,i) {
				return  d['n_addon_users'].toLocaleString() + 
				         " / " + 
				        d["n_total_users"].toLocaleString() + 
				         " = " + 
				         Math.round(d["pct_addon_users"] * 1000) / 10 + '%'
			},
      interpolate: d3.curveLinear,
      right: 200
    });
    
    MG.data_graphic({
      target:'.' + locale + "-n",
      title: "Number of Total " + locales[locale] + " Add-on Installs by Day",
      data: locale_data,
      chart_type:'line',
      linked: true,
      x_label: "date",
      x_accessor: 'date',
      y_accessor: 'n_installs',
      x_axis: true,
      full_width: true,
      point_size: 5,
      height: 250,
      markers: markers,
      interpolate: d3.curveLinear,
      right: 200
    });
    
  });
}

function addonGraph(addon,  path="data/l10n-localization-campaign.json") {
  d3.json(path, function(data){
    addon_data = data["addon_id"].filter(x => x['addon_id'] == addon)
    MG.convert.date(addon_data, "date", "%Y%m%d")
    
    MG.data_graphic({
      target:'.' + addon_lst[addon].replace(/\s+/g, '').replace('-', '').replace("1", '') + '_pct',
      title: "Percent of Users in Qualifying Locale with " + addon_lst[addon] + " By Day",
      data: addon_data,
      chart_type:'line',
      linked: true,
      x_label: "date",
      x_accessor: 'date',
      y_accessor: 'pct_addon_users',
      x_axis: true,
      full_width: true,
      format: "percentage",
      point_size: 5,
      height: 250,
      markers: markers,
      y_mouseover: function(d,i) {
				return  d['n_addon_users'].toLocaleString() + 
				         " / " + 
				        d["n_total_users"].toLocaleString() + 
				         " = " + 
				         Math.round(d["pct_addon_users"] * 1000) / 10 + '%'
			},
      interpolate: d3.curveLinear,
      right: 200
    });
    
    
    MG.data_graphic({
      target:'.' + addon_lst[addon].replace(/\s+/g, '').replace('-', '').replace("1", ''),
      title: "Number of Total " + addon_lst[addon] + " Installs by Day",
      data: addon_data,
      chart_type:'line',
      linked: true,
      x_label: "date",
      x_accessor: 'date',
      y_accessor: 'n_installs',
      x_axis: true,
      full_width: true,
      point_size: 5,
      height: 250,
      markers: markers,
      interpolate: d3.curveLinear,
      right: 200
    });
    
  });
}


function draw() {
  let localeList = Object.keys(locales);
  let addonList = Object.keys(addon_lst);
  for (i=0; i<localeList.length; i++) {
    let l = localeList[i]
    console.log("drawing:", l)
    localeGraph(l)
  }
  for (i=0; i<addonList.length; i++) {
    let a = addonList[i]
    console.log("drawing:", a)
    addonGraph(a)
  }
  
  
}

draw()

