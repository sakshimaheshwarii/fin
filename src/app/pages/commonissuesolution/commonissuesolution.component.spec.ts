import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonissuesolutionComponent } from './commonissuesolution.component';

describe('CommonissuesolutionComponent', () => {
  let component: CommonissuesolutionComponent;
  let fixture: ComponentFixture<CommonissuesolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonissuesolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonissuesolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
