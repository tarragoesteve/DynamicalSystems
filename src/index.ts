import * as System from "./system";
let mySystem = new System.System(`
  function mod(n, m) {
    return ((n % m) + m) % m;
  }
  var x = input[0] + parameters.a * Math.sin(input[0] + input[1]);
  var y = input[0] + input[1];
  x = mod(x + Math.PI,2 * Math.PI) - Math.PI;
  y = mod(y + Math.PI,2 * Math.PI) - Math.PI;
  return [x,y];
`,[[-Math.PI,Math.PI],[-Math.PI,Math.PI]],
'{"a":-0.7}');
mySystem.voidOrbitDraw('#f06')
mySystem.voidKPeriodDraw(4, '#00f')
mySystem.voidKPeriodDraw(3, '#0f0')
mySystem.voidKPeriodDraw(2, '#f2f40b')
