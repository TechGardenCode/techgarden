import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SproutComponent } from './sprout.component';

describe('SproutComponent', () => {
  let component: SproutComponent;
  let fixture: ComponentFixture<SproutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SproutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SproutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
