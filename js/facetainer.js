function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

	markers = {
	  'dau': [],
	  'wau':
	          [
                {
                'date': new Date('2018-04-03T8:00:00.000Z'),
                'label': '7 Days since Release'
                }
            ],
    'mau': 
            [
                {
                'date': new Date('2018-04-24T8:00:00.000Z'),
                'label': '28 Days since Release'
                }
            ]
	}


function channelGraphFacetainer(channel, metric, path="data/facetainer.json") {
	d3.json(path, function(data){
		channel_data = data[channel]
		MG.convert.date(channel_data, "date", "%Y%m%d")
		MG.data_graphic({
			target:'.' + channel,
			title: cap(channel) + ' ' + metric.toUpperCase(),
			data: channel_data,
			chart_type:'line',
			linked: true,
			x_label: "date",
			x_accessor: 'date',
			y_accessor: metric,
			x_axis: true,
			full_width: true,
			point_size: 5,
			height: 250,
			markers: markers[metric],
			interpolate: d3.curveLinear,
			right: 200
		});

		});
}

function draw(metric) {
  channelGraphFacetainer("release", metric)
  channelGraphFacetainer("beta", metric)
  channelGraphFacetainer("nightly", metric)
  channelGraphFacetainer("esr", metric)
}

draw('dau')

$( document ).ready(function() {
	$('.split-by-freq button').click(function() {
	    const target = $(this).data('user_type');
	    const currently_active = d3.select("button.btn.btn-default.active").node().dataset.user_type
	    $(this).addClass('active').siblings().removeClass('active');
	    draw(target);

	});
})
