function graphic(data, channel, target, tSuff, title, pct, num, denom) {
	var channelTitle = channel[0].toUpperCase() + channel.substring(1)
	var displayTitle = channelTitle + " " + title
	if (title.substr(0, 5) == "Users") {
	  displayTitle = "TOTAL " + displayTitle
	}
	var lab = "Submission Date"
	if (channel == 'nightly') {
		lab = "Build Id Date"
	}

	var markers = [{}];

	if (channel == "beta") {
		markers = [{
	        'submission_date': new Date('2017-09-26T00:00:00.000Z'),
	        'label': 'Beta 57'
	    	}]
	}
	else if (channel == "release") {
		markers = [
		{
	        'submission_date': new Date('2017-11-06T00:00:00.000Z'),
	        'label': 'ABP Migrated to WE'
	    	},
	    {
	        'submission_date': new Date('2017-11-14T00:00:00.000Z'),
	        'label': 'Release 57'
	    	},

	    	]
	}

	console.log("markers", markers)

	MG.data_graphic({
			target:'.graph' + target +  tSuff,
			title: "% " + displayTitle,
			data: data,
			chart_type:'line',
			linked: true,
			x_label: lab,
			x_accessor: 'submission_date',
			y_accessor: 'pct_' + channel + pct,
			format: "percentage",
			x_axis: true,
			full_width: true,
			point_size: 5,
			interpolate: d3.curveLinear,
			right: 100,
			markers: markers,
			y_mouseover: function(d,i) {
				return  d[channel + num].toLocaleString() + 
				         " / " + 
				        d[channel + denom].toLocaleString() + 
				         " = " + 
				         Math.round(d["pct_" + channel + pct] * 1000) / 10 + '%'
			}
		});

}

function channelGraph(channel, target, path="data/addon-counts.json") {
	d3.json(path, function(data){
		MG.convert.date(data, "submission_date", "%Y%m%d")
		pct_channel = "pct_" + channel 
		for (i in data) {
			data[i][pct_channel + "_webext"] = 
			 data[i][channel + '_any_webext'] / data[i][channel + "_total"]

			data[i][pct_channel + "_addons_webext"] = 
				data[i][channel + "_any_webext"] / data[i][channel + "_addons"]

			data[i][pct_channel + "_any_legacy"] = 
				data[i][channel + "_any_legacy"] / data[i][channel + "_total"]

			data[i][pct_channel + "_addons_any_legacy"] = 
				data[i][channel + "_any_legacy"] / data[i][channel + "_addons"]

			data[i][pct_channel + "_only_webext"] = 
				data[i][channel + "_only_webext"] / data[i][channel + "_total"]

			data[i][pct_channel + "_addons_only_webext"] = 
				data[i][channel + "_only_webext"] / data[i][channel + "_addons"]

			data[i][pct_channel + "_only_level1"] = 
				data[i][channel + "_only_level1"] / data[i][channel + "_total"]

			data[i][pct_channel + "_addons_only_level1"] = 
				data[i][channel + "_only_level1"] / data[i][channel + "_addons"]

			data[i][pct_channel + "_only_level12"] = 
				data[i][channel + "_only_level12"] / data[i][channel + "_total"]

			data[i][pct_channel + "_addons_only_level12"] = 
				data[i][channel + "_only_level12"] / data[i][channel + "_addons"]

		    data[i][pct_channel + "_addons_total"] = 
		    	data[i][channel + "_addons"] / data[i][channel + "_total"]




		}

		if (channel == "nightly") {
			//capitalize for graph title
			graphic(data, channel, target, 1, 
				"Users with 1+ WebExtensions", 
				"_webext", "_any_webext", "_total")
		}

		if (channel != "nightly") {

			graphic(data, channel, target, 2, 
				"Add-on Users with 1+ WebExtensions",
				"_addons_webext", "_any_webext", "_addons")
		}

		graphic(data, channel, target, 3,
			"Users with 1+ Legacy Add-Ons",
			"_any_legacy", "_any_legacy", "_total")
			
		if (channel != "nightly") {

		graphic(data, channel, target, 4,
		 "Add-on Users with 1+ Legacy Add-Ons",
		 "_addons_any_legacy", "_any_legacy", "_addons")
		}


		graphic(data, channel, target, 5,
		 "Users with ONLY WebExtensions",
		 "_only_webext", "_only_webext", "_total")

		if (channel != "nightly") {

		graphic(data, channel, target, 6,
		 "Add-on Users with ONLY WebExtensions",
		 "_addons_only_webext", "_only_webext", "_addons")
	}

		if (channel == "nightly") {
			graphic(data, channel, target, 7,
			 "Users with ONLY Level 1 Add-ons",
			 "_only_level1", "_only_level1", "_total")
		}

	    if (channel != "nightly") {

		graphic(data, channel, target, 8,
		 "Add-on Users with ONLY Level 1 Add-ons",
		 "_addons_only_level1", "_only_level1", "_addons")
		}

		if (channel == "nightly") {
			graphic(data, channel, target, 9,
			 "Users with ONLY Level 1 or 2 Add-ons",
			 "_only_level12", "_only_level12", "_total")
		}

		if (channel != "nightly") {

		graphic(data, channel, target, 10,
		 "Add-on Users with ONLY Level 1 or 2 Add-ons",
		 "_addons_only_level12", "_only_level12", "_addons")
	}

	   graphic(data, channel, target, 11,
	   	"Users with Self-Installed Add-ons",
	   	"_addons_total", "_addons", "_total")
		
	});






}








