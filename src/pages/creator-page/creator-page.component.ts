import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {
  AdjustColorOnCreatorMascotSlot, AdjustSlotOnCreatorMascot, CreateCosmeticFromSlotUnderEdit,
  MascotState, ResetCreatorMascot, ResetLoaded, ResetState,
  UpdateSlotOnCreatorMascot
} from "../../states/mascot-state.service";
import {Observable} from "rxjs";
import {Mascot, SlotData, TraitMappedBySlot} from "../../model/Mascot";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MascotSelectorComponent} from "../../components/mascot-selector/mascot-selector.component";
import {NgbNav, NgbNavContent, NgbNavLinkBase, NgbNavLinkButton, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {RenderComponent} from "../../render/render.component";
import {ColorPickerModule} from 'ngx-color-picker';
import {FormsModule} from "@angular/forms";
import {Web3Service} from "../../services/web3.service";
import {faWarning} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-creator-page',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MascotSelectorComponent,
    NgForOf,
    NgIf,
    NgbNav,
    NgbNavContent,
    NgbNavLinkBase,
    NgbNavLinkButton,
    RenderComponent,
    NgbTooltip,
    ColorPickerModule,
    FormsModule,FaIconComponent
  ],
  templateUrl: './creator-page.component.html',
  styleUrl: './creator-page.component.scss'
})
export class CreatorPageComponent implements OnInit {
  @Select(MascotState.creatorMascot) creatorMascot$: Observable<Mascot>;
  @Select(MascotState.loaded) isLoaded$: Observable<boolean>;
  @Select(MascotState.creatorAvailableSlots) allCosmetics$: Observable<SlotData[]>;
  @Select(MascotState.slotUnderEdit) slotUnderEdit$: Observable<SlotData>;
  placeholder = "Placeholder, this will holds text explaining the term";
  displayName: string;
  zIndex: number;
  x: any;
  y: any;
  selectedComponent: any;

  constructor(private store: Store, private web3Service: Web3Service) {
  }

  ngOnInit(): void {
    this.slotUnderEdit$.subscribe(item => {
      if (item && typeof item.zIndex === 'number' && !isNaN(item.zIndex)) {
        this.zIndex = item.zIndex
      }

      if (item && item.displayName) {
        this.displayName = item.displayName
      }

      if (item && item.selectedComponent) {
        this.selectedComponent = item.selectedComponent
      }

      if (item) {
        this.x = item.x
      }

      if (item) {
        this.y = item.y
      }
    })
  }

  resetCosmetic() {
    this.store.dispatch([new ResetCreatorMascot()]);
  }

  async createCosmetic() {
    await this.store.dispatch(new ResetLoaded());
    this.store.dispatch(new CreateCosmeticFromSlotUnderEdit());
  }

  setCosmetic($event: Event) {
    const selectedId = ($event.target as HTMLSelectElement).value;
    this.store.dispatch([new UpdateSlotOnCreatorMascot(Number(selectedId))]);
  }

  changeColor(colorField: string, $event: string) {
    this.store.dispatch([new AdjustColorOnCreatorMascotSlot(colorField, $event)]);
  }

  changeDisplayName($event: string) {
    const newSlot = { ...this.store.snapshot().characters.slotUnderEdit };
    newSlot.displayName = $event;
    this.store.dispatch([new AdjustSlotOnCreatorMascot(newSlot)]);
  }

  changeZIndex($event: string) {
    const newSlot = { ...this.store.snapshot().characters.slotUnderEdit };
    newSlot.zIndex = $event;
    this.store.dispatch([new AdjustSlotOnCreatorMascot(newSlot)]);
  }

  changeSelectedComponent($event: string) {
    const newSlot = { ...this.store.snapshot().characters.slotUnderEdit };
    newSlot.selectedComponent = $event;
    this.store.dispatch([new AdjustSlotOnCreatorMascot(newSlot)]);
  }

  changeXComponent($event: string) {
    const newSlot = { ...this.store.snapshot().characters.slotUnderEdit };
    newSlot.x = $event;
    this.store.dispatch([new AdjustSlotOnCreatorMascot(newSlot)]);
  }

  changeYComponent($event: string) {
    const newSlot = { ...this.store.snapshot().characters.slotUnderEdit };
    newSlot.y = $event;
    this.store.dispatch([new AdjustSlotOnCreatorMascot(newSlot)]);
  }

  protected readonly faWarning = faWarning;
}
