import {Solver} from "./solver";
import * as Mathjs from 'mathjs';
import * as SVG from 'svg.js';

  export class System {
      private parameters: {};
      private equations: string;
      private domain: [number, number][];

      //constants
      private width = 500
      private height = 500
      private number_of_seeds = 250
      private number_of_iterations = 100

      //drawing
      private drawing = SVG('drawing').size(this.width, this.height)

      public constructor(equations: string,domain: [number, number][] ,parameters:string)
      {
        this.equations = equations
        this.parameters = JSON.parse(parameters)
        this.domain = domain
      }

      //Given X we compute F(X) where F is defined in the equations
      private getNextState(point: number[]): number[]
      {
        var fnc = new Function ('parameters', 'input', this.equations)
        return fnc(this.parameters, point)
      }

      //change de parameter of the function
      public setParameters(parameters:string): void
      {
        this.parameters = JSON.parse(parameters)
      }

      //compute the trajectory of the point using F(X) iteratively
      private getTrajectory(point: number[], n:number) : number[][]
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

      private getPointInDomain() : number[]
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

      private getRandomPoints (n: number) : number[][]
      {
        let result = []
        for (let i = 0; i < n; i++) {
            result.push(this.getPointInDomain());
        }
        return result;
      }

      //X = F^k(X) => F^k(X)-X == 0
      private getKPeriodicPoints(k: number) : number[][]
      {
        let equations_function = new Function ('parameters', 'input', this.equations)

        let zero_function = function (X: number[]) : number {
          let aux_point : number [] = X;
          for (let i = 0; i < k; i++) {
            aux_point = equations_function(this.parameters, aux_point)
          }
          //aux_point now contains F^K(X)
          let modul = 0;
          for (let i = 0; i < X.length; i++) {
              modul += Math.abs(X[i]-aux_point[i]);
          }
          return modul
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

      public voidOrbitDraw(): any
      {
        let rp = this.getRandomPoints(this.number_of_seeds)
        for (let pointIt in rp){
          let point = rp[pointIt]
          let trajectory = this.getTrajectory(point, this.number_of_iterations)
          for(let pointTraIt in trajectory){
            let [x, y] = this.changeReferenceToDrawing(trajectory[pointTraIt])
            this.drawing.circle(1).fill('#f06').move(x, y)
          }
        }
      }

      public voidKPeriodDraw(k :number){
        let points = this.getKPeriodicPoints(k)
        console.log('Periodic points of k' + k + ': ' + points)
        for(let key in points){
          let [x, y] = this.changeReferenceToDrawing(points[key])
          this.drawing.circle(10).fill('#f06').move(x, y)
        }
      }

      public voidClearDraw(k :number){
      }
  }
