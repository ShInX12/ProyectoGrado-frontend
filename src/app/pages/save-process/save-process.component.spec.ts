import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProcessComponent } from './save-process.component';

describe('SaveProcessComponent', () => {
  let component: SaveProcessComponent;
  let fixture: ComponentFixture<SaveProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
