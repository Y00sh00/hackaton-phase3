import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-gotee-1',
  standalone: true,
  imports: [
    JsonPipe,
    RenderComponent,
  ],
  templateUrl: './mino-gotee-1.component.html',
  styleUrl: './mino-gotee-1.component.scss'
})
export class MinoGotee1Component extends BaseComponent {
  override x: number = 0;
  override y: number = 0;
  beardColor = "#4f312c";

  getProperties(){
    return ['beardColor']
  }
}


