export class ProcessDTO {

  constructor(
    public uid: string,
    public name: string,
    public code: number,
    public description: string,
    // tslint:disable-next-line:variable-name
    public enable_chat: boolean,
    public state: { uid: string, name: string },
    // tslint:disable-next-line:variable-name
    public process_type: { uid: string, name: string },
    public createdAt: Date,
    public updatedAt: Date
  ) { }

}
