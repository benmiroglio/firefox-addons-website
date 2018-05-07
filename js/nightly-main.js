d3.json('webextdata.json', function(data){
	MG.convert.date(data, "date", "%Y%m%d")
	for (i in data) {
		data[i]['pct_nightly_webext'] = 
		 data[i]['nightly_count_webext'] / data[i]["nightly_count_total"]

		data[i]["pct_nightly_addons_webext"] = 
			data[i]['nightly_count_addons_webext'] / data[i]["nightly_count_addons"]
	}
	console.log(data);


	MG.data_graphic({
		target:'.graph1',
		title: "% Nightly Users with WebExtensions",
		data: data,
		chart_type:'line',
		x_accessor: 'date',
		linked: true,
		y_accessor: 'pct_nightly_webext',
		format: "percentage",
		x_axis: true,
		full_width: true,
		point_size: 5,
		interpolate: d3.curveLinear,
		right: 100,
		y_mouseover: function(d,i) {
			return  d.nightly_count_webext + " / " + d.nightly_count_total + 
			 " = " + Math.round(d.pct_nightly_webext * 1000) / 10 + '%'
		}
	});

	MG.data_graphic({
		target:'.graph',
		title: "% Nightly Add-on Users with WebExtensions",
		data: data,
		chart_type:'line',
		x_accessor: 'date',
		linked: true,
		y_accessor: 'pct_nightly_addons_webext',
		format: "percentage",
		x_axis: true,
		full_width: true,
		point_size: 5,
		interpolate: d3.curveLinear,
		right: 100,
		y_mouseover: function(d,i) {
			return  d.nightly_count_addons_webext + " / " + d.nightly_count_addons + 
			 " = " + Math.round(d.pct_nightly_addons_webext * 1000) / 10 + '%'
		}
	});


	

	
});


