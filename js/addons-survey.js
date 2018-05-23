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
    
    output.sort(function(a, b) {
        return b.n - a.n
    })
    
    params = {
        title: title,
        data: output,
        chart_type: 'bar',
        y_accessor: 'n',
        x_accessor: 'resp',
        height:500,
        width:800,
        target: target
        }
        
    if (coord_flip) {
         params.x_accessor = 'n'
         params.y_accessor = 'resp'
         params.left = 200
    } 
    
    MG.data_graphic(params)
}

d3.csv("./data/addonsSurveyExport.csv", function(data) {

    input0 = {};
    input1 = {};
    input2 = {};
    input3 = {};
    
    questions = [
        'Did your employer purchase the computer you are using to complete this survey?',
        'How recently was Firefox installed on the computer you are using to complete this survey?',
        'Have you added any add-ons or extensions to Firefox on the computer you are using to complete this survey?',
        'How soon after installing Firefox did you install the first add-on / extension?'
    ]

    
    console.log(data)
    for (i=0;i < data.length;i++) {
        for (j=0;j < questions.length;j++) {
            resp_j = data[i][questions[j]]
            if (resp_j !== '') {
                input = eval('input'+j)
                input[resp_j] = (input[resp_j] || 0) + 1;
            }
        }
    }
    coords = [false, false, false, true]
    for (q=0;q < questions.length;q++) {
        draw(eval("input" + q), '.input' + q, questions[q], coords[q])
        
    }
});