export class User {

  constructor(
    public uid: string,
    public email: string,
    public password: string,
    public admin: boolean,
    public name: string,
    public phone: string,
    // tslint:disable-next-line:variable-name
    public photo_url: string,
    public bio: string,
    // tslint:disable-next-line:variable-name
    public user_type: number
  ) {}

}
