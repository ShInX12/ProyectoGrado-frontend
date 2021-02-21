export class Observation {

  constructor(
    public uid: string,
    public date: Date,
    public body: string,
    public process: string,
    // tslint:disable-next-line:variable-name
    public from_lawyer: boolean,
    // tslint:disable-next-line:variable-name
    public observation_type?: string,
  ) {}

}
