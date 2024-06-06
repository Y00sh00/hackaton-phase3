import {Component} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../../../base-component.directive";
import {RenderComponent} from "../../../../render/render.component";

@Component({
  selector: 'app-mino-left-arm-3',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-left-arm-3.component.html',
  styleUrl: './mino-left-arm-3.component.scss'
})
export class MinoLeftArm3Component extends BaseComponent {
  override x: number = 240;
  override y: number = 315;
  bodyColor = "#724035";
  color1 = "#b0af9b";
  color2 = "#8e7c75"; // hoof color

  getProperties() {
    return ['bodyColor', 'color1', 'color2']
  }
}


