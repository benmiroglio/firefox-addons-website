function channelGraphESR(channel, target, path="data/addon-counts-new-comb.json") {
	d3.json(path, function(data){

		MG.convert.date(data, "submission_date", "%Y%m%d")
		pct_channel = "pct_" + channel 
		new_data = []
		for (i in data) {
			if (data[i]['esr_total']) {
		    	data[i][pct_channel + "_addons_total"] = 
		    	data[i][channel + "_addons"] / data[i][channel + "_total"]
		    	new_data.push(data[i])
			}
		}

		MG.data_graphic({
			target:'.graphe12',
			title: "ESR User Counts Since 57 Release",
			data: new_data,
		    aggregate_rollover: true,
			chart_type:'line',
			linked: false,
			x_label: "submission_date",
			markers: [{
                'submission_date': new Date('2017-11-14T8:00:00.000Z'),
                'label': 'Release 57'
                }],
			x_accessor: 'submission_date',
			baselines: [{value: 3568949, label: 'Baseline ESR Add-on User Count'}],
			y_accessor: ["esr_total", "esr_addons"],
			x_axis: true,
			full_width: true,
			point_size: 5,
			height: 400,
			legend: ["Total", "Add-ons Users"],
			interpolate: d3.curveLinear,
			right: 200
		});

		});
}
channelGraphESR("esr", "e")
