import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorCardResultComponent } from './detector-card-result.component';

describe('DetectorCardResultComponent', () => {
  let component: DetectorCardResultComponent;
  let fixture: ComponentFixture<DetectorCardResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorCardResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorCardResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
