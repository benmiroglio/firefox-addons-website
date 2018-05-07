// n-day and n-week retention for users with and without add-ons

const updateLegend = function(target) {
	let legend = d3.selectAll(target + " span")

	legend.each(function(d, i) {
		let inner = this.innerHTML
		if (inner.indexOf("56") > 0) {
			d3.select(this).text("  - - " + inner.substring(2, inner.length - 7));
		}
	})
}

const getNewLabels = (userType, retentionType) => {
	let prefixes = ["57_True", "57_False", '56_True', '56_False']
    return prefixes.map(i => i + '-' + userType + '-' + retentionType)
}


const getTitle = (userType, retentionType) => {
	userType = titleMap[userType]
    retentionType = retentionType.charAt(0).toUpperCase() + retentionType.slice(1);

	return `N ${retentionType} Retention for 
	<b>${userType}</b> Users with/without Add-ons for Version 56/57`
}


const titleMap = {
	light: 'Infrequent',
	all: 'All',
	medium: 'Occasional',
	heavy: 'Frequent'
}

// groups.forEach(i => {
let parentDisplay = 'all'
let childDisplay = 'week'


const updates = {
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


const draw = (userType, retentionType) => {
	d3.json('./data/retention.json', data => {
	    MG.convert.date(data, 'date', "%Y%m%d")
	    const split_by_params = {
	    	data: data,
			target: ".retention",
			max_y: 1.1,
			max_x: new Date('2017-01-05T8:00:00.000Z'),
			min_y: .25,
			chart_type:'line',
			linked: false,
			x_label: "Weeks Since Release",
			y_label: "Percent Users Active",
			x_accessor: 'date',
			y_accessor: getNewLabels(userType, retentionType),
			legend: ["Users with Add-ons (57)", 
				     "Users without Add-ons (57)",
				     "Users with Add-ons (56)", 
				     "Users without Add-ons (56)"],
			legend_target: ".legendMain",
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

		 for (var i in updates[retentionType]) {
	    	split_by_params[i] = updates[retentionType][i];
	    }


		MG.data_graphic(split_by_params);
		d3.select('.title-container-main')
		  .select('h4').html(getTitle(userType, retentionType))
		updateLegend('.legendMain')
	});
}

$( document ).ready(function() {
	$('.split-by-controls-gen button').click(function() {
	    const target = $(this).data('y_accessor');
	    const currently_active = d3.select("button.btn.btn-default.active").node().dataset.y_accessor
	    $(this).addClass('active').siblings().removeClass('active');
	    draw(parentDisplay, target);
	    childDisplay = target;

	});
})

$( document ).ready(function() {
	$('.split-by-freq button').click(function() {
	    const target = $(this).data('user_type');
	    const currently_active = d3.select("button.btn.btn-default.active").node().dataset.user_type
	    $(this).addClass('active').siblings().removeClass('active');
	    draw(target, childDisplay);
	    parentDisplay = target;

	});
})


draw('all', 'week')




