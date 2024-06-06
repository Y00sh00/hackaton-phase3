import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsuDescriptionComponent } from './ssu-description.component';

describe('SsuDescriptionComponent', () => {
  let component: SsuDescriptionComponent;
  let fixture: ComponentFixture<SsuDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsuDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SsuDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
