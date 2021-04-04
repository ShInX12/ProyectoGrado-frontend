import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProcessesListComponent } from './client-processes-list.component';

describe('ClientProcessesListComponent', () => {
  let component: ClientProcessesListComponent;
  let fixture: ComponentFixture<ClientProcessesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProcessesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProcessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
