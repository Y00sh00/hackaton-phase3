import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotSelectorComponent } from './mascot-selector.component';

describe('MascotSelectorComponent', () => {
  let component: MascotSelectorComponent;
  let fixture: ComponentFixture<MascotSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MascotSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
