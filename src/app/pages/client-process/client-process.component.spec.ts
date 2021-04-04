import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProcessComponent } from './client-process.component';

describe('ClientProcessComponent', () => {
  let component: ClientProcessComponent;
  let fixture: ComponentFixture<ClientProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
