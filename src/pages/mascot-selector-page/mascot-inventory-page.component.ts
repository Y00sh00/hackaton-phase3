import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {MascotState, SelectMascot} from "../../states/mascot-state.service";
import {Observable} from "rxjs";
import {Mascot, SlotData, TraitData} from "../../model/Mascot";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {RenderComponent} from "../../render/render.component";
import {
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLinkBase,
  NgbNavLinkButton, NgbNavOutlet,
  NgbTooltip
} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faLock, faWarning} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mascot-inventory-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RenderComponent, NgbTooltip, FormsModule, NgbNav, NgbNavContent, NgbNavLinkBase, NgbNavLinkButton, NgbNavItem, NgbNavOutlet, FaIconComponent],
  templateUrl: './mascot-inventory-page.component.html',
  styleUrl: './mascot-inventory-page.component.scss'
})
export class MascotInventoryPageComponent implements OnInit {
  @Select(MascotState.mascots) mascots$: Observable<Mascot[]>;
  @Select(MascotState.traitsInInventory(false)) traitsInInventory$: Observable<TraitData[]>;
  @Select(MascotState.traitsInInventory(true)) allTraits$: Observable<TraitData[]>;
  @Select(MascotState.slotsAvailableForSelectedMascot) slotsAvailableForSelectedMascot$: Observable<string[]>;
  @Select(MascotState.loaded) isLoaded$: Observable<boolean>;
  slotsInInventory$: Observable<SlotData[]>;
  slotsNotInInventory$: Observable<SlotData[]>;
  traits$: Observable<TraitData[]>;
  placeholder = "Placeholder, this will holds text explaining the term";
  active = 1;
  viewAllTraits = false;
  viewAllSlots = false;
  previewTrait: TraitData[];
  lockIcon = faLock;
  alertIcon = faWarning;

  constructor(private store: Store, private router: Router) {
    this.previewTrait = [];
    this.previewTrait.push({
      id: 1,
      traitSlot: "bodyColor",
      optionName: "brown",
      optionValue: "#724035"
    })
  }

  ngOnInit(): void {
    this.traits$ = this.traitsInInventory$;
    this.slotsInInventory$ = this.store.select(MascotState.slotsInInventory(false, "Empty"))
    this.slotsNotInInventory$ = this.store.select(MascotState.slotsInInventory(true, "Empty"))
  }

  modify(id: number) {
    this.store.dispatch([new SelectMascot(id)]).subscribe(item => {
      this.router.navigateByUrl('/editor')
    });
  }

  toggleViewAllTraits() {
    this.viewAllTraits = !this.viewAllTraits;

    if (this.viewAllTraits) {
      this.traits$ = this.allTraits$;
    } else {
      this.traits$ = this.traitsInInventory$;
    }
  }

  toggleViewAllSlots() {
    this.viewAllSlots = !this.viewAllSlots;
  }


  onSlotChange($event: Event) {
    const value = ($event.target as HTMLSelectElement).value;
    this.slotsInInventory$ = this.store.select(MascotState.slotsInInventory(false, value))
    this.slotsNotInInventory$ = this.store.select(MascotState.slotsInInventory(true, value))
  }
}
