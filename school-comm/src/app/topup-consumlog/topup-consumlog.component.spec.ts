import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupConsumlogComponent } from './topup-consumlog.component';

describe('TopupConsumlogComponent', () => {
  let component: TopupConsumlogComponent;
  let fixture: ComponentFixture<TopupConsumlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupConsumlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupConsumlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
