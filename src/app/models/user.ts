import { Person } from './person';

export class User extends Person {

  constructor(
    uid: string,
    email: string,
    password: string,
    name: string,
    // tslint:disable-next-line:variable-name
    personal_id: string,
    phone: string,
    // tslint:disable-next-line:variable-name
    photo_url: string,
    bio: string,
    enable: boolean,
    // tslint:disable-next-line:variable-name
    personal_id_type: string,
    // tslint:disable-next-line:variable-name
    company_id: string,
    // tslint:disable-next-line:variable-name
    public user_type_id: string,
    public admin: boolean
  ) {
    super(
      uid,
      email,
      password,
      name,
      personal_id,
      phone,
      photo_url,
      bio,
      enable,
      personal_id_type,
      company_id
    );
  }

}

// export class User {
//
//   constructor(
//     public uid: string,
//     public email: string,
//     public password: string,
//     public admin: boolean,
//     public name: string,
//     // tslint:disable-next-line:variable-name
//     public personal_id: string,
//     public phone: string,
//     // tslint:disable-next-line:variable-name
//     public photo_url: string,
//     public bio: string,
//     // tslint:disable-next-line:variable-name
//     public user_type_id: string,
//     public enable: boolean,
//     // tslint:disable-next-line:variable-name
//     public personal_id_type: string,
//     // tslint:disable-next-line:variable-name
//     public company_id: string
//   ) { }
//
// }
