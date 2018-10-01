import * as System from "./system";
let mySystem = new System.System(`
  var x = input[0] + parameters.a * Math.sin(input[0] + input[1]);
  var y = input[0] + input[1];
  x = ((x + Math.PI) % (2 * Math.PI)) - Math.PI;
  y = ((y + Math.PI) % (2 * Math.PI)) - Math.PI;
  return [x,y];
`,[[-Math.PI,Math.PI],[-Math.PI,Math.PI]],
'{"a":-0.7}');
//mySystem.voidOrbitDraw()
mySystem.voidKPeriodDraw(4)
