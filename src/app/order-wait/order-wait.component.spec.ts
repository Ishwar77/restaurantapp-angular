import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWaitComponent } from './order-wait.component';

describe('OrderWaitComponent', () => {
  let component: OrderWaitComponent;
  let fixture: ComponentFixture<OrderWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
