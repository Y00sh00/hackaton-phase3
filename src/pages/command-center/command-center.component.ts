import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCartShopping, faWarning} from "@fortawesome/free-solid-svg-icons";
import {CountdownComponent} from "../../components/countdown/countdown.component";
import {InitMascotState, MascotState, ResetState, RevertLoaded} from "../../states/mascot-state.service";
import {IMASCOT_CREATOR_ABI} from "../../contracts/IMascotCreator";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Web3Service} from "../../services/web3.service";
import {Observable} from "rxjs";
import {NgbModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {TraitData} from "../../model/Mascot";

@Component({
  selector: 'app-command-center',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent,
    CountdownComponent,
    AsyncPipe,
    NgbTooltip,
    NgClass,
  ],
  templateUrl: './command-center.component.html',
  styleUrl: './command-center.component.scss'
})
export class CommandCenterComponent {
  alertIcon = faWarning;
  @Select(MascotState.campaignClaimed) campaignClaimed$: Observable<boolean>;
  @Select(MascotState.loaded) isLoaded$: Observable<boolean>;
  @Select(MascotState.traitsInInventory(false)) traitsUnlocked$: Observable<TraitData[]>
  placeholder = "Placeholder, this will holds text explaining the term";
  private modalService = inject(NgbModal);
  closeResult = '';
  @ViewChild('content') content: TemplateRef<any>;

  constructor(private store: Store, private router: Router, private web3Service: Web3Service) {
  }


  protected readonly faWarning = faWarning;
  shopIcon = faCartShopping;


  getWidthClass(unlocked:number): string {
    const percentage = (unlocked / 4 * 100);
    if (percentage >= 75) {
      return 'w-75';
    } else if (percentage >= 50) {
      return 'w-50';
    } else if (percentage >= 25) {
      return 'w-25';
    } else {
      return 'w-0';  // Assuming you have a class for 0%
    }
  }

  async claimCampaign(number: number) {
    try {
      await this.store.dispatch(new ResetState());

      // TODO claimCampaign returns data but I can't read that yet
      const claimFunction = this.web3Service.withNameSpaceAndName('claimCampaign');
      await this.web3Service.writeContract(IMASCOT_CREATOR_ABI, claimFunction, [number]);
      this.store.dispatch([new InitMascotState()]).subscribe(() => {
        this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
      });
    } catch (e) {
      await this.store.dispatch([new RevertLoaded(), new InitMascotState()]);
    }

  }
}
