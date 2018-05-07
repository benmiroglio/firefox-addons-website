// n-day and n-week retention for users with and without add-ons

const updateLegendExpanded = (target) => {
	let legend = d3.selectAll(target + " span")

	legend.each(function(d, i) {
		let inner = this.innerHTML
		if (inner.indexOf("56") > 0) {
			d3.select(this).text("  - - " + inner.substring(2, inner.length - 7));
		}
	})
}

const getNewLabelsExpanded = (userType, retentionType) => {
	let prefixes = ["57_addons-we", "57_addons-leg", '56_addons-we', '56_addons-leg']
    return prefixes.map(i => i + '-' + userType + '-' + retentionType + '-expanded')
}



const getTitleExpanded = (userType, retentionType) => {
	userType = titleMapExpanded[userType]
    retentionType = retentionType.charAt(0).toUpperCase() + retentionType.slice(1);

	return `N ${retentionType} Retention for <b> ${userType} </b> Users with 
	 only WebExtensions/Legacy Add-ons for Version 56/57`
}

const titleMapExpanded = {
	light: 'Infrequent',
	all: 'All',
	medium: 'Occasional',
	heavy: 'Frequent'
}


let parentDisplayExpanded = 'all'
let childDisplayExpanded = 'week'


const updatesExpanded = {
	"week": {
		x_label: "Weeks Since Release",
		min_y: .25,
		max_x: new Date('2017-01-05T8:00:00.000Z'),					
		xax_count: 5,
		x_mouseover: function(d, i) {
				return "Weeks: " + d3.timeFormat("%d")(d.key)
			}

	}, 
	'day': {
		min_y: 0,
		max_x: new Date('2017-01-06T8:00:00.000Z'),
		x_label: "Days Since Update",
		xax_count: 6,
		x_mouseover: function(d, i) {
				return "Days: " + d3.timeFormat("%d")(d.key)
			}
		}
	}


const drawExpanded = (userType, retentionType) => {
	d3.json('./data/retention-expanded.json', data => {
		console.log(data)
	    MG.convert.date(data, 'date', "%Y%m%d")
	    const split_by_params = {
	    	data: data,
			target: ".retention_expanded",
			max_y: 1.1,
			max_x: new Date('2017-01-05T8:00:00.000Z'),
			min_y: .25,
			chart_type:'line',
			linked: false,
			x_label: "Weeks Since Release",
			y_label: "Percent Users Active",
			x_accessor: 'date',
			y_accessor: getNewLabelsExpanded(userType, retentionType),
			legend: ["Users with WebExtensions (57)", 
				     "Users with Legacy Add-ons(57)",
				     "Users with WebExtensions(56)", 
				     "Users with Legacy Add-ons (56)"],
			legend_target: ".legend_expanded",
			aggregate_rollover: true,
			format: "percentage",
			x_axis: true,
			color: ["#05b378", "#db4437", "#acabab", "#d7d7d7"],
			show_secondary_x_label: false,
			xax_format: d3.timeFormat("%d"),
			point_size: 5,
			full_width: true,
			xax_count: 5,
			left: 90,
			right: 90,
			height: 450,
			x_mouseover: function(d, i) {
				return "Week: " + d3.timeFormat("%d")(d.key)
			}
		};

		 for (var i in updatesExpanded[retentionType]) {
	    	split_by_params[i] = updatesExpanded[retentionType][i];
	    }

	    d3.select('.title-container-expanded')
	      .select('h4').html(getTitleExpanded(userType, retentionType))
		MG.data_graphic(split_by_params);
		updateLegendExpanded('.legend_expanded')
	});
}

$( document ).ready(function() {
	$('.split-by-controls-gen-expanded button').click(function() {
	    const target = $(this).data('y_accessor');
	    const currently_active = d3.select("button.btn.btn-default.active").node().dataset.y_accessor
	    $(this).addClass('active').siblings().removeClass('active');
	    $(this).addClass('expanded').siblings().removeClass('expanded');
	    drawExpanded(parentDisplayExpanded, target);
	    childDisplayExpanded = target;

	});
})

$( document ).ready(function() {
	$('.split-by-freq-expanded button').click(function() {
	    const target = $(this).data('user_type');
	    const currently_active = d3.select("button.btn.btn-default.active").node().dataset.user_type
	    $(this).addClass('active').siblings().removeClass('active');
	    drawExpanded(target, childDisplayExpanded);
	    parentDisplayExpanded = target;

	});
})


drawExpanded('all', 'week')




