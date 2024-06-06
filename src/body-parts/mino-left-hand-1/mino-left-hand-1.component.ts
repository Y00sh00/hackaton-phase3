import {Component} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../base-component.directive";
import {RenderComponent} from "../../render/render.component";

@Component({
  selector: 'app-mino-left-hand-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-left-hand-1.component.html',
  styleUrl: './mino-left-hand-1.component.scss'
})
export class MinoLeftHand1Component extends BaseComponent {
  override x: number = 245;
  override y: number = 365;
  bodyColor = "#724035";

  getProperties(){
    return ['bodyColor']
  }
}


