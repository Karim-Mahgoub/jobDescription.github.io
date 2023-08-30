import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyReportComponent } from './apply-report.component';

describe('ApplyReportComponent', () => {
  let component: ApplyReportComponent;
  let fixture: ComponentFixture<ApplyReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyReportComponent]
    });
    fixture = TestBed.createComponent(ApplyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
