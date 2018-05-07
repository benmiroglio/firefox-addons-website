// Uptake data comparing 56 to 57

d3.json("./data/release_version_pcts_comb.json", function(data){
		MG.convert.date(data, "submission_date", "%Y-%m-%d");

		// filter data, no more than 30 days
		let maxDate = new Date('2017-01-31T4:00:00.000Z');
		data = data.filter(function(d) {
			return d.submission_date <= maxDate;
		})
		
		var split_by_params = {
					target:'.summary',
					data: data,
					y_nudge: 3,
					chart_type:'line',
					linked: true,
					min_x: new Date('2017-01-01T4:00:00.000Z'),
					min_y: 0,
					max_y: 1,
					x_label: "Days Since Release",
					y_label: "Percent Users on Given Version",
					x_accessor: 'submission_date',
					y_accessor: ['57_57_addons', '57_57_no_addons', '56_56_addons', '56_56_no_addons'],
					legend: ["Users with Add-ons (57)", 
						     "Users without Add-ons (57)",
						     "Users with Add-ons (56)", 
						     "Users without Add-ons (56)"],
					legend_target: ".legendUptake",
					aggregate_rollover: true,
					format: "percentage",
					x_axis: true,
					color: ["#05b378", "#db4437", "#acabab", "#d7d7d7"],
					show_secondary_x_label: false,
					xax_format: d3.timeFormat("%d"),
					point_size: 5,
					full_width: true,
					left: 90,
					right: 90,
					height: 450,
					x_mouseover: function(d, i) {
						return "Days Since Release: " + d3.timeFormat("%d")(d.key)
					}
				};

		MG.data_graphic(split_by_params)

		let legend = d3.selectAll(".legendUptake span")
		legend.each(function(d, i) {
			let inner = this.innerHTML
			if (inner.indexOf("56") > 0) {
				d3.select(this).text("  - - " + inner.substring(2, inner.length - 7));
			}
		})
});

