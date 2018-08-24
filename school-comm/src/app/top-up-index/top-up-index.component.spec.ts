import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpIndexComponent } from './top-up-index.component';

describe('TopUpIndexComponent', () => {
  let component: TopUpIndexComponent;
  let fixture: ComponentFixture<TopUpIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUpIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
