import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesBoxComponent } from './files-box.component';

describe('FilesBoxComponent', () => {
  let component: FilesBoxComponent;
  let fixture: ComponentFixture<FilesBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
