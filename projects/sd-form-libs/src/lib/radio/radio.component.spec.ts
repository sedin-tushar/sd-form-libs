import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupInputComponent } from './radio.component';

describe('RadioGroupInputComponent', () => {
  let component: RadioGroupInputComponent;
  let fixture: ComponentFixture<RadioGroupInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioGroupInputComponent]
    });
    fixture = TestBed.createComponent(RadioGroupInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
