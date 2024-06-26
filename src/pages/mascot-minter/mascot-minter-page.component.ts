import {Component} from '@angular/core';
import {SsuDescriptionComponent} from "../../components/ssu-description/ssu-description.component";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {Web3Service} from "../../services/web3.service";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {InitMascotState, MascotState, ResetState, RevertLoaded} from "../../states/mascot-state.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IMASCOT_CREATOR_ABI} from "../../contracts/IMascotCreator";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faClose, faGift} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mascot-minter-page',
  standalone: true,
  imports: [
    SsuDescriptionComponent,
    NgbTooltip,
    AsyncPipe,
    NgIf,
    FormsModule,
    FaIconComponent
  ],
  templateUrl: './mascot-minter-page.component.html',
  styleUrl: './mascot-minter-page.component.scss'
})
export class MascotMinterPageComponent {
  placeholder = "Placeholder, this will holds text explaining the term";
  @Select(MascotState.loaded) isLoaded$: Observable<boolean>;
  name: string;
  giftIcon = faGift;
  crossIcon = faClose;
  gift = false;
  address: any;

  constructor(private store: Store, private web3Service: Web3Service, private router: Router) {
  }


  async mint(characterType: string) {
    try {
      await this.store.dispatch(new ResetState());


      let currentUserAddress;
      if (this.gift) {
        currentUserAddress = this.address;
      } else {
        //@ts-ignore TODO FIX ME
        currentUserAddress = this.web3Service?.account?.address;
      }
      const mintFunction = this.web3Service.withNameSpaceAndName('createMascot');
      await this.web3Service.writeContract(IMASCOT_CREATOR_ABI, mintFunction, [currentUserAddress, this.name, characterType]);
      this.store.dispatch([new InitMascotState()]).subscribe(() => {
        this.router.navigateByUrl("inventory");
      });
    } catch (e) {
      await this.store.dispatch([new RevertLoaded(), new InitMascotState()]);
    }
  }

  toggleGift() {
    this.gift = !this.gift;
  }
}
