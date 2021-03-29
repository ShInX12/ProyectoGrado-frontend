export class UserProcess {

  constructor(
    public uid: string,
    public user: string,
    public process: string,
    public owner: boolean,
    // tslint:disable-next-line:variable-name
    public can_edit: boolean
  ) { }

}
