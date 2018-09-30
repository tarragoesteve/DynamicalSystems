import * as System from "./system";
let a = new System.System(`
return [input[0] + parameters.a * Math.sin(input[0] + input[1]),input[0] + input[1]];
`,[[-3.14,3.14],[-3.14,3.14]],
'{"a":-0.7}');
a.getDrawing()
console.log("Hello World")
console.log(a.getPointInDomain())
