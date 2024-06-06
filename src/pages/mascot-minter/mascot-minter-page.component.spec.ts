import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotMinterPageComponent } from './mascot-minter-page.component';

describe('CharacterCreationComponent', () => {
  let component: MascotMinterPageComponent;
  let fixture: ComponentFixture<MascotMinterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotMinterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotMinterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
