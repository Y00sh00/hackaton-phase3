import { Component } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {MascotState, SelectMascot} from "../../states/mascot-state.service";
import {Mascot} from "../../model/Mascot";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {RenderComponent} from "../../render/render.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mascot-selector',
  standalone: true,
  imports: [CommonModule, RenderComponent],
  templateUrl: './mascot-selector.component.html',
  styleUrl: './mascot-selector.component.scss'
})
export class MascotSelectorComponent {
  @Select(MascotState.mascots) mascots$: Observable<Mascot[]>;

  constructor(private store: Store, private router: Router) {
  }

  select(id: number) {
    this.store.dispatch([new SelectMascot(id)]).subscribe(item => {
      this.router.navigateByUrl('/editor')
    });

  }
}
