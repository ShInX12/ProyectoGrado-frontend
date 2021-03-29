import { Document } from '../models/document';

export class SendDocumentsDTO {

  constructor(
    public documents: Document[],
    public code: string,
    public observation: string
  ) { }

}
