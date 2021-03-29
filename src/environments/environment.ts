// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  firebaseConfig: {
    apiKey: 'AIzaSyB9ry6qTPp1esur33Wd-Z2JiPz4eDvpQkY',
    authDomain: 'proyecto-grado-usb.firebaseapp.com',
    projectId: 'proyecto-grado-usb',
    storageBucket: 'proyecto-grado-usb.appspot.com',
    messagingSenderId: '951286489878',
    appId: '1:951286489878:web:f439ef3499b1ae5b33a637'
  },

  CASE_CODE: '5f7a6d69f25d4e299c5123e0',
  MOVEMENT_CODE: '5fa5ce14d1b9482940dab8d2',
  DEFAULT_DOCUMENT_TYPE: '5fc1cd87a44f630e7c7f23b4',
  DEFAULT_OBSERVATION_TYPE: '5fbbf599966a870fd8ce7c1c',
  DEAFULT_ACTIVE_PROCESS_STATE: '5f7a72038b735b2100ec5324',

  USER_TYPE_ADMINISTRADOR: '603fac7b04f6d02958bf6dcc',
  USER_TYPE_ASISTENTE: '5f7a561c4e6f69092c0c8c9e',
  USER_TYPE_ABOGADO: '5f7a55f94e6f69092c0c8c9d'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
