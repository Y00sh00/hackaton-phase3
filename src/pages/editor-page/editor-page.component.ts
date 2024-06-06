import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterService} from "../../services/character.service";
import {HttpClientModule} from "@angular/common/http";
import {RenderComponent} from "../../render/render.component";
import {CommonModule, JsonPipe} from "@angular/common";
import {EditorService} from "../../services/editor.service";
import {FormsModule} from "@angular/forms";
import {Web3Service} from "../../services/web3.service";
import {MascotMinterPageComponent} from "../mascot-minter/mascot-minter-page.component";
import {SsuDescriptionComponent} from "../../components/ssu-description/ssu-description.component";
import {
  ModalDismissReasons,
  NgbModal,
  NgbNav,
  NgbNavContent, NgbNavLinkBase,
  NgbNavOutlet,
  NgbNavItem,
  NgbNavLinkButton, NgbTooltip
} from "@ng-bootstrap/ng-bootstrap";
import {
  MascotState,
  ResetSelectedMascot,
  RevertSlotModifications,
  RevertTraitModifications,
  SaveMascotSlots,
  SaveMascotTraits,
  SelectMascot,
  SyncActiveTraits,
  UpdateSlotOnSelectedMascot,
  UpdateTraitOnSelectedMascot
} from "../../states/mascot-state.service";
import {Select, Store} from "@ngxs/store";
import {Observable, Subscription} from "rxjs";
import {Mascot, SlotsMappedBySlotType, TraitData, TraitMappedBySlot} from "../../model/Mascot";
import {MascotSelectorComponent} from "../../components/mascot-selector/mascot-selector.component";

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [HttpClientModule, RenderComponent, JsonPipe, CommonModule, FormsModule, MascotMinterPageComponent, SsuDescriptionComponent, NgbNav, NgbNavItem, NgbNavOutlet, NgbNavContent, NgbNavLinkBase, NgbNavLinkButton, NgbTooltip, MascotSelectorComponent],
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.scss'
})
export class EditorPageComponent implements OnInit, OnDestroy {
  @Select(MascotState.mascots) mascots$: Observable<Mascot[]>;
  @Select(MascotState.loaded) isLoaded$: Observable<boolean>;
  @Select(MascotState.selectedMascot) selectedMascot$: Observable<Mascot>;

  // Traits
  @Select(MascotState.availableTraits) availableTraits$: Observable<TraitMappedBySlot>;
  @Select(MascotState.traitSlotsAvailableForSelectedMascot) traitSlotsAvailableForSelectedMascot$: Observable<string[]>;
  @Select(MascotState.selectedTraitValues) selectedTraitValues$: Observable<{ [key: string]: number }>;

  // Slots
  @Select(MascotState.availableSlots) availableSlots$: Observable<SlotsMappedBySlotType>;
  @Select(MascotState.slotsAvailableForSelectedMascot) slotsAvailableForSelectedMascot$: Observable<string[]>;
  @Select(MascotState.selectedSlotValues) selectedSlotValues$: Observable<{ [key: string]: number }>;

  // Tab variables
  active: number = 1;

  // Modal Info
  private modalService = inject(NgbModal);
  closeResult = '';

  // Tooltip info
  placeholder = "Placeholder, this will holds text explaining the term";
  subscription: Subscription;
  preview: boolean = false;
  constructor(private store: Store,private router: Router, private characterService: CharacterService, private slotEditor: EditorService, private cdr: ChangeDetectorRef, private web3Service: Web3Service, private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store.dispatch([new ResetSelectedMascot()]);
  }

  ngOnInit(): void {
    this.subscription = this.store.select(MascotState.hasMascotsOrLoading).subscribe((hasMascotsOrLoading) => {
      if(!hasMascotsOrLoading) {
        this.router.navigateByUrl("/mint");
      }
    });
    this.store.dispatch([new SyncActiveTraits()]);
  }

  onSlotChange(slotName: string, $event: Event): void {
    const selectedId = ($event.target as HTMLSelectElement).value;
    this.store.dispatch([new UpdateSlotOnSelectedMascot(slotName, Number(selectedId))]);
  }

  onTraitChange(traitSlot: string, $event: Event) {
    const selectedId = ($event.target as HTMLSelectElement).value;
    this.store.dispatch([new UpdateTraitOnSelectedMascot(traitSlot, Number(selectedId))]);
  }

  onMascotChange($event: Event) {
    const selectedId = ($event.target as HTMLSelectElement).value;
    this.store.dispatch([new SelectMascot(Number(selectedId))]);
  }

  openDebugModel(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  saveTraits() {
    this.store.dispatch(new SaveMascotTraits());
  }

  cancelTraits() {
    this.store.dispatch(new ResetSelectedMascot());
  }

  revertTraits() {
    this.store.dispatch(new RevertTraitModifications());
  }

  revertSlots() {
    this.store.dispatch(new RevertSlotModifications());
  }

  cancelSlots() {
    this.store.dispatch(new ResetSelectedMascot());
  }

  saveSlots() {
    this.store.dispatch(new SaveMascotSlots());
  }
}
