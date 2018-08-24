import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpIwantComponent } from './top-up-iwant.component';

describe('TopUpIwantComponent', () => {
  let component: TopUpIwantComponent;
  let fixture: ComponentFixture<TopUpIwantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUpIwantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpIwantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
