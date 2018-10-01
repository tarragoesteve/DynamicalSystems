export class Solver {
  private function: (X: number[]) => number
  private domain: [number, number][]
  private epsilon = 10E-6
  private minimul_step = 10E-6
  private initial_step = 10E-6
  private number_of_seeds = 1000

  constructor(zero_function: (X: number[]) => number, domain: [number, number][]){
    this.function = zero_function;
    this.domain = domain;
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
        neighbours.push(aux_point)
        aux_point = point
        aux_point[i] -= step
        neighbours.push(aux_point)
    }
    return neighbours
  }


  private findZero(seed: number[]) : [boolean, number[]]
  {
    let point = seed
    let improvable = true;
    let step = this.initial_step;
    while (this.function(point) < this.epsilon
    && (improvable || step < this.initial_step)) {
      let neighbours = this.getNeighbours(point,step)
      let best_value = this.function(point)
      let best_neighbour = point
      improvable = false
      for (let key in neighbours) {
        let neighbour = neighbours[key];
        if(this.function(neighbour) < best_value)
        {
          improvable = true;
          best_neighbour = neighbour
          best_value = this.function(neighbour)
        }
      }
      point = best_neighbour
      step = step/2
    }
    return [this.function(point) < this.epsilon, point]
  }

  //Simulated annyaling to find minimums of the function or gradient decent? Random gradient decents?
  public getSolutions() : number[][]
  {
    let seeds = this.getRandomPoints(this.number_of_seeds)
    let solutions = []
    for (let key in seeds) {
      let seed = seeds[key]
      let [found, zero] = this.findZero(seed)
      if (found) solutions.push(zero)
    }
    return solutions
  }
}
