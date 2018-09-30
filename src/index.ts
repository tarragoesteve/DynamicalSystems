import {System} from "system";
let mySystem = new System(`
return [input[0] + parameters.a * Math.sin(input[0] + input[1]),input[0] + input[1]];
`,[[-3.14,3.14],[-3.14,3.14]],
'{"a":-0.7}');
mySystem.getDrawing()
console.log("Hello World")
