export class UserProcessDTO {

  constructor(
    public uid: string,
    public owner: boolean,
    // tslint:disable-next-line:variable-name
    public can_edit: boolean,
    public user: { _id: string, name: string, email: string, phone: string },
  ) { }

}
