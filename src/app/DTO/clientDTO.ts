export class ClientDTO {

  constructor(
    public uid: string,
    public name: string,
    // tslint:disable-next-line:variable-name
    public personal_id: string,
    public phone: string,
    // tslint:disable-next-line:variable-name
    public photo_url: string,
    public bio: string,
    // tslint:disable-next-line:variable-name
    public personal_id_type: { uid: string, name: string }
  ) { }

}
