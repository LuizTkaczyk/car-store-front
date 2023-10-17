import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoInputComponent } from './logo-input.component';

describe('LogoInputComponent', () => {
  let component: LogoInputComponent;
  let fixture: ComponentFixture<LogoInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoInputComponent]
    });
    fixture = TestBed.createComponent(LogoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
