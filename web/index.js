var n = 100;
var x = [], y = [];
var dt = 0.015;
mySystem = new System(`
return [input[0] + parameters.a * Math.sin(input[0] + input[1]),input[0] + input[1]];
`,
'{"a":2}');

for (i = 0; i < n; i++) {
  x[i] = Math.random() * 2 - 1;
  y[i] = Math.random() * 2 - 1;
}

Plotly.plot('graph', [{
  x: x,
  y: y,
  mode: 'markers'
}], {
  xaxis: {range: [-40, 40]},
  yaxis: {range: [0, 60]}
})

function compute () {
  for (var i = 0; i < n; i++) {
    next = mySystem.getNextState([x[i],y[i]])
    x[i] = next[0]
    y[i] = next[1]
  }
}

function update () {
  compute();

  Plotly.animate('graph', {
    data: [{x: x, y: y}]
  }, {
    transition: {
      duration: 0,
    },
    frame: {
      duration: 0,
      redraw: false,
    }
  });

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
