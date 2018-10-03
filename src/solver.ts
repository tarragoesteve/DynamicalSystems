export class Solver {
  private function: (X: number[]) => number
  private domain: [number, number][]
  private parameters: {};
  // constants
  private epsilon = 10E-4
  private minimal_step = 10E-12
  private initial_step = 10E-2
  private number_of_seeds = 10E3

  constructor(zero_function: (X: number[]) => number, domain: [number, number][], parameters:any){
    this.function = zero_function;
    this.domain = domain;
    this.parameters = parameters

  }

  private isPointInDomain(x: number[]): boolean
  {
    for (let i = 0; i < x.length; i++) {
        if(x[i] < this.domain[i][0]) return false
        if(x[i] > this.domain[i][1]) return false
    }
    return true
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

  private getNeighbours(point: number[], step : number) : number[][]
  {
    let neighbours = []
    for (let i = 0; i < point.length; i++) {
        let aux_point = point
        aux_point[i] += step
        if(this.isPointInDomain(aux_point)){
          neighbours.push(JSON.parse(JSON.stringify(aux_point)))
        }
        aux_point = point
        aux_point[i] -= step
        if(this.isPointInDomain(aux_point)){
          neighbours.push(JSON.parse(JSON.stringify(aux_point)))
        }
    }
    return neighbours
  }


  private findZero(seed: number[]) : [boolean, number[]]
  {
    let point = seed
    let improvable = true;
    let step = this.initial_step;
    let steps = 0
    while (this.function(point) > this.epsilon
    && (improvable || step > this.minimal_step) && steps < 100) {
      /*console.log("Point: ", point, " function:", this.function(point),
        " step:", step)*/
      let neighbours = this.getNeighbours(point,step)
      let best_value = this.function(point)
      let best_neighbour = point
      improvable = false
      for (let neighbour of neighbours) {
        if(this.function(neighbour) < best_value)
        {
          improvable = true;
          best_neighbour = neighbour
          best_value = this.function(neighbour)
        }
      }
      point = best_neighbour
      if(! improvable){
        step = step/2
      }
      ++steps
    }
    return [this.function(point) < this.epsilon, point]
  }

  //Simulated annyaling to find minimums of the function or gradient decent? Random gradient decents?
  public getSolutions() : number[][]
  {
    let seeds = this.getRandomPoints(this.number_of_seeds)
    let solutions = []
    for (let key in seeds) {
      if (parseInt(key) % 100 == 0) console.log(key)
      let seed = seeds[key]
      let [found, zero] = this.findZero(seed)
      if (found) console.log(zero, this.function(zero))
      if (found) solutions.push(zero)
    }
    return solutions
  }
}
