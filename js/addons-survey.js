d3.csv("./data/Days_Until First Self-Install_2018_06_25.csv", function(data) {
  filtered = data.filter(x => x['channel::filter'] === 'release' & +x['days_to_first_install'] <= 7)
  for (i=0;i<filtered.length;i++) {
     filtered[i]['pct_addon_users'] = Math.ceil(filtered[i]['pct_addon_users'] * 100) / 100
     filtered[i]['days_to_first_install'] += ' Days'
  }
  
  console.log("dayss", filtered)

  params0 = {
        title: "Days Until First Self-Install",
        description: "Takes the minimum difference of a client's profile_creation_date and the install_day(s) associated with each non-system, non-foreign-installed, non-shield add-on",
        data: filtered,
        chart_type: 'bar',
        y_accessor: 'pct_addon_users',
        x_accessor: 'days_to_first_install',
        height:500,
        width:700,
        mouseover: function(d, i) {
          d3.select(".daysInstallChart svg .mg-active-datapoint")
            .text(d['days_to_first_install'] + ': ' + d['pct_addon_users'] + '%')
        },
        target: ".daysInstallChart"
        }
        
    console.log("PARAMS", params0);
    MG.data_graphic(params0)
  
});



function Counter(array) {
  var count = {};
  array.forEach(val => count[val] = (count[val] || 0) + 1);
  return count;
}

function draw(input, target, title, coord_flip=false) {
    
    var output = [], item;
    

    for (var type in input) {
        item = {};
        item.resp = type;
        item.n = input[type]
        output.push(item);
    }
    
    output.sort( (a, b) => b.n - a.n)
    let N = output.map(x => x.n)
                  .reduce( (i, j) => i + j);
    params = {
        title: '',
        data: output,
        chart_type: 'bar',
        y_accessor: 'n',
        x_accessor: 'resp',
        height:400,
        width:800,
        mouseover: function(d, i) {
          d3.select(target + ' svg .mg-active-datapoint')
            .text(d['resp'] + ': ' + d['n'] + ' (' + Math.ceil(d['n'] / N * 100) + '%)')        },
        target: target
        }
        
    if (coord_flip) {
         params.x_accessor = 'n'
         params.y_accessor = 'resp'
         params.left = 300
         params.axes_not_compact = false
    }
    
    MG.data_graphic(params)
}

d3.csv("./data/addonsSurveyExport.csv", function(data) {

    input0 = {};
    input1 = {};
    input2 = {};
    input3 = {};
    input4 = {};
    input5 = {};

    questions = [
        //'Did your employer purchase the computer you are using to complete this survey?',
        //'How recently was Firefox installed on the computer you are using to complete this survey?',
        'Why was Firefox installed on the computer you are using to complete this survey?',
        'How soon after installing Firefox did you install the first add-on / extension?',
        'Have you used the add-ons / extensions you installed before?',
    ]
    
    horiz_coords = [
      //false, 
      //false, 
      true, 
      true, 
      true, 
      ]
      
      
    console.log('data', data)
    for (i=0;i < data.length;i++) {
        for (j=0;j < questions.length;j++) {
            resp_j = data[i][questions[j]]
            if (resp_j !== '') {
                input = eval('input'+j)
                input[resp_j] = (input[resp_j] || 0) + 1;
            }
        }
    }
    console.log(input0)

    for (q=0;q < questions.length;q++) {
//        questionText = questions[q];
//        questionNode = document.createElement("h4");
//        questionNode.innerHTML = questionText + '<br>';
//        parentNode = document.getElementsByClassName("questionIndex")[0]
//        parentNode.appendChild(questionNode)
//
//        agg = eval("input"+q)
//        opts = Object.keys(agg)
//        
//        let s = document.createElement("select");
//        def = document.createElement("option");
//        def.value = 'default'
//        def.innerHTML = 'Select'
//        s.append(def)
//        for (opt=0; opt < opts.length; opt++) {
//            let o = document.createElement("option")
//            o.value = opt
//            o.innerHTML = opts[opt];
//            s.appendChild(o)
//            questionNode.appendChild(s)
//        }
        
        draw(eval("input" + q), '.input' + q, questions[q], horiz_coords[q])
        
    }
});






  
  
  
  
  
  
  
  
  