export class Process {

  constructor(
    public uid: string,
    public name: string,
    public code: number,
    public description: string,
    public state: string,
    // tslint:disable-next-line:variable-name
    public process_type: string
  ) { }

}
