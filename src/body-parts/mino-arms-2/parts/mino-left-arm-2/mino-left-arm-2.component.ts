import {Component} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../../../base-component.directive";
import {RenderComponent} from "../../../../render/render.component";

@Component({
  selector: 'app-mino-left-arm-2',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-left-arm-2.component.html',
  styleUrl: './mino-left-arm-2.component.scss'
})
export class MinoLeftArm2Component extends BaseComponent {
  override x: number = 240;
  override y: number = 315;
  bodyColor = "#724035";
  color1 = "#b0af9b";

  getProperties() {
    return ['bodyColor', 'color1']
  }
}


