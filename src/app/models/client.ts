import { Person } from './person';

export class Client extends Person {

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
    verified_email: boolean,
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
      company_id,
      verified_email
    );
  }

}

// export class Client {
//
//   constructor(
//     public uid: string,
//     public name: string,
//     // tslint:disable-next-line:variable-name
//     public personal_id: string,
//     public phone: string,
//     // tslint:disable-next-line:variable-name
//     public photo_url: string,
//     public bio: string,
//     public enable: true,
//     // tslint:disable-next-line:variable-name
//     public personal_id_type: string,
//     // tslint:disable-next-line:variable-name
//     public company_id: string,
//   ) { }
//
// }
