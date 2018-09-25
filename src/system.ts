class System {

    private parameters: {};
    private equations: string;

    constructor(equations: string, parameters:string) {
      this.equations = equations
      this.parameters = JSON.parse(parameters)
    }

    //Given X we compute F(X) where F is defined in the equations
    getNextState(point: number){
      var fnc = new Function ('parameters', 'input', this.equations)
      return fnc(this.parameters, point)
    }

    setParameters(parameters:string){
      this.parameters = JSON.parse(parameters)
    }

    getNextNStates(point: number, n:number){
      let result = [];
      let previous = point;
      for (let i = 0; i < n; i++) {
        let nextPoint = this.getNextState(previous)
        result.push(nextPoint);
        previous = nextPoint
      }
    }

}
/*
let mySystem = new System(2,
  `
  return [input[0] + parameters.a * Math.sin(input[0] + input[1]),input[0] + input[1]];
  `,
  '{"a":2}')
*/
