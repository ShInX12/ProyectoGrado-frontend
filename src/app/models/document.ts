export class Document {

  constructor(
    public uid: string,
    public title: string,
    public description: string,
    public url: string,
    // tslint:disable-next-line:variable-name
    public upload_date: Date,
    // tslint:disable-next-line:variable-name
    public from_lawyer: boolean,
    public process: string,
    // tslint:disable-next-line:variable-name
    public document_type?: string
  ) {}

}
