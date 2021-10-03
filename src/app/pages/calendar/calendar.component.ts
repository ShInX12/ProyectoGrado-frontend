import { Component, OnDestroy } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/angular';
import { createEventId } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { EventRemoveArg } from '@fullcalendar/common';
import { CalendarEvent } from '../../models/calendarEvent';
import { CalendarService } from '../../services/calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnDestroy {

  public subscriptions: Subscription[] = [];

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: esLocale,
    // eventAdd: this.handleEventAdd.bind(this),
    eventRemove: this.handleEventRemove.bind(this),
    events: this.handleEvents.bind(this)
  };

  constructor(public calendarService: CalendarService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb?.unsubscribe());
  }

  handleWeekendsToggle(): void {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    const title = prompt('Titulo del evento:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title){

      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay
      };

      const addSub = this.calendarService.save(newEvent).subscribe(
        (event: CalendarEvent) => calendarApi.addEvent(event)
      );
      this.subscriptions.push(addSub);
    }

  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (confirm(`¿Deseas borrar el evento '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(info, successCallback: (events: EventInput[]) => void): void {
    const eventsSub = this.calendarService.findByUser().subscribe(
      (events: CalendarEvent[]) => {
        try {
          successCallback(events);
        } catch (e) { }
      },
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(eventsSub);
  }

  // handleEventAdd(arg: EventAddArg): void {
  //   const addEventSub = this.calendarService.save(arg.event).subscribe(
  //     () => { },
  //     error => console.warn(error)
  //   );
  //   this.subscriptions.push(addEventSub);
  // }

  handleEventRemove(arg: EventRemoveArg): void {
    const removeEventSub = this.calendarService.delete(arg.event.id).subscribe(
      () => { },
      error => console.warn(error)
    );
    this.subscriptions.push(removeEventSub);
  }
}
