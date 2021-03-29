export class User {

  constructor(
    public uid: string,
    public email: string,
    public password: string,
    public admin: boolean,
    public name: string,
    // tslint:disable-next-line:variable-name
    public personal_id: string,
    public phone: string,
    // tslint:disable-next-line:variable-name
    public photo_url: string,
    public bio: string,
    // tslint:disable-next-line:variable-name
    public user_type_id: string,
    public enable: boolean,
    // tslint:disable-next-line:variable-name
    public personal_id_type: string,
    // tslint:disable-next-line:variable-name
    public company_id: string
  ) { }

}
