export class Message {

  constructor(
    public id: string,
    public body: string,
    public from: string,
    // tslint:disable-next-line:variable-name
    public person_id: string,
    // tslint:disable-next-line:variable-name
    public is_lawyer: boolean,
    public process: string,
    public createdAt?: Date
  ) { }

}
