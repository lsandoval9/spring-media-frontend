import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsciiFilterComponent } from './ascii-filter.component';

describe('AsciiFilterComponent', () => {
  let component: AsciiFilterComponent;
  let fixture: ComponentFixture<AsciiFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsciiFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsciiFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
