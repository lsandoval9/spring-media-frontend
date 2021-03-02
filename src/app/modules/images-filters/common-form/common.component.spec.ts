import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonFormComponent } from './common-form.component';

describe('FormComponent', () => {
  let component: CommonFormComponent;
  let fixture: ComponentFixture<CommonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
