import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsPageComponent } from './ans-page.component';

describe('AnsPageComponent', () => {
  let component: AnsPageComponent;
  let fixture: ComponentFixture<AnsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
