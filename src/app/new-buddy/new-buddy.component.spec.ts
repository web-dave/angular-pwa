import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBuddyComponent } from './new-buddy.component';

describe('NewBuddyComponent', () => {
  let component: NewBuddyComponent;
  let fixture: ComponentFixture<NewBuddyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBuddyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBuddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
