import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesFiltersComponent } from './images-filters.component';

describe('ImagesFiltersComponent', () => {
  let component: ImagesFiltersComponent;
  let fixture: ComponentFixture<ImagesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
