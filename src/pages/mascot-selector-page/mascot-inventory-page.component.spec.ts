import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotInventoryPageComponent } from './mascot-inventory-page.component';

describe('MascotSelectorComponent', () => {
  let component: MascotInventoryPageComponent;
  let fixture: ComponentFixture<MascotInventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotInventoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
