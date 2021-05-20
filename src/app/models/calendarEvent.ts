export class CalendarEvent {

  constructor(
    public id: string,
    public title: string,
    public start: Date,
    public end: Date,
    public allDay: boolean,
    public user?: string
  ) { }

}
