import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleconfirmationComponent } from './roleconfirmation.component';

describe('RoleconfirmationComponent', () => {
  let component: RoleconfirmationComponent;
  let fixture: ComponentFixture<RoleconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleconfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
