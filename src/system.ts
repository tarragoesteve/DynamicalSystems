import {Solver} from "./solver";
import * as Mathjs from 'mathjs';
import * as SVG from 'svg.js';

  export class System {
      private parameters: {};
      private equations: string;
      private domain: [number, number][];
      private width = 500
      private height = 500

      public constructor(equations: string,domain: [number, number][] ,parameters:string)
      {
        this.equations = equations
        this.parameters = JSON.parse(parameters)
        this.domain = domain
      }

      //Given X we compute F(X) where F is defined in the equations
      getNextState(point: number[]): number[]
      {
        var fnc = new Function ('parameters', 'input', this.equations)
        return fnc(this.parameters, point)
      }

      setParameters(parameters:string): void
      {
        this.parameters = JSON.parse(parameters)
      }

      getNextTrajectory(point: number[], n:number) : number[][]
      {
        let result = [];
        let previous = point;
        result.push(point);
        for (let i = 0; i < n; i++) {
          let nextPoint = this.getNextState(previous)
          result.push(nextPoint);
          previous = nextPoint
        }
        return result;
      }

      getPointInDomain() : number[]
      {
        let point = []
        for (let dimensionIt in this.domain) {
          let dimension= this.domain[dimensionIt]
          let [init, final] = dimension
          let value = Math.random() * (final-init) + init;
          point.push(value)
        }
        return point;
      }

      getRandomPoints (n: number) : number[][]
      {
        let result = []
        for (let i = 0; i < n; i++) {
            result.push(this.getPointInDomain());
        }
        return result;
      }

      //X = F^k(X) => F^k(X)-X == 0
      getKPeriodicPoints(k: number) : number[][]
      {
        var equations_function = new Function ('parameters', 'input', this.equations)

        var zero_function = function (X:number) {
          let aux_point = X;
          for (let i = 0; i < k; i++) {
            aux_point = equations_function(this.parameters, aux_point)
          }
          //aux_point now contains F^K(X)
          return Mathjs.norm(aux_point - X)
        }

        let mysolver = new Solver(zero_function, this.domain)
        return mysolver.getSolutions()
      }

      private changeReferenceToDrawing(point:number[]) : number[]
      {
        let x = (point[0] - this.domain[0][0]) / (this.domain[0][1]-this.domain[0][0]) * this.width
        let y = (point[1] - this.domain[1][0]) / (this.domain[1][1]-this.domain[1][0]) * this.height
        return [x,y]
      }

      public getDrawing(): any
      {
        var draw = SVG('drawing').size(this.width, this.height)
        let rp = this.getRandomPoints(500)
        for (let pointIt in rp){
          let point = rp[pointIt]
          let trajectory = this.getNextTrajectory(point, 10)
          let drawPoint = this.changeReferenceToDrawing(point)
          //draw.circle(10).fill('#f06').move(drawPoint[0], drawPoint[1])
          let trajectoryDraw = []
          for(let pointTraIt in trajectory){
            trajectoryDraw.push(this.changeReferenceToDrawing(trajectory[pointTraIt]))
          }
          draw.polyline(trajectoryDraw).fill('none').stroke({ width: 1 })
        }


      }
  }
