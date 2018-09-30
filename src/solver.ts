export class Solver {
  private function: any
  private domain: [number, number][]

  constructor(zero_function: any, domain: [number, number][]){
    this.function = zero_function;
    this.domain = domain;
  }


//Simulated annyaling to find minimums of the function or gradient decent? Random gradient decents?
  public getSolutions(){
    return [[0.0,0.0]]
  }
}
