import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableChatMessageComponent } from './enable-chat-message.component';

describe('EnableChatMessageComponent', () => {
  let component: EnableChatMessageComponent;
  let fixture: ComponentFixture<EnableChatMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableChatMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
