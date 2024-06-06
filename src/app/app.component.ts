import {ChangeDetectorRef, Component, importProvidersFrom, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {RenderComponent} from "../render/render.component";
import {CommonModule, JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Observable, of} from "rxjs";
import {Web3Service} from "../services/web3.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CHAIN} from "../config.test";
import {EIP6963ProviderDetail} from "@eveworld/types";
import {EIP1193Provider} from "viem";
import {SsuDescriptionComponent} from "../components/ssu-description/ssu-description.component";
import {EditorPageComponent} from "../pages/editor-page/editor-page.component";
import {NgxsModule, Store} from "@ngxs/store";
import {InitMascotState} from "../states/mascot-state.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, RenderComponent, JsonPipe, CommonModule, FormsModule, SsuDescriptionComponent, EditorPageComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  connected$: Observable<string> = of("unknown");
  public smartObjectId: string | null = null;
  chainName: string = CHAIN.name;
  public availableProviders: EIP6963ProviderDetail[] = [];

  constructor(private web3Service: Web3Service, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private sanitizer: DomSanitizer, private store: Store) {
    this.connected$ = this.web3Service.isConnected$;
    window.addEventListener("eip6963:announceProvider", async (event: any) => {
      this.availableProviders.push(event.detail);
    });
    window.dispatchEvent(new Event("eip6963:requestProvider"));
  }

  // This entire change detection none-sense shouldn't be possible
  async ngOnInit(): Promise<void> {
    await this.web3Service.init();

    this.store.dispatch(new InitMascotState());

    this.route.queryParamMap.subscribe((params) => {
      this.smartObjectId = params.get('smartObjectId');
    });
  }

  async connect(): Promise<void> {
    if(this.availableProviders.length > 0){
      await this.web3Service.connect(this.availableProviders[0]);
    }
    await this.web3Service.connect();
  }

  async disconnect() {
    await this.web3Service.disconnect();
  }

  installVault() {
    window.open("https://docs.projectawakening.io/EveVault/installation", "_blank");
  }
}

