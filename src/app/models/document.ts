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
    // tslint:disable-next-line:variable-name
    public from_process_owner: boolean,
    public user: { uid: string, name: string },
    public process: string,
    // tslint:disable-next-line:variable-name
    public document_type?: string
  ) { }

}
