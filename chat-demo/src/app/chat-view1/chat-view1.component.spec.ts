import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatView1Component } from './chat-view1.component';

describe('ChatView1Component', () => {
  let component: ChatView1Component;
  let fixture: ComponentFixture<ChatView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatView1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
