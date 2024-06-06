import {Component} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {BaseComponent} from "../../../../base-component.directive";
import {RenderComponent} from "../../../../render/render.component";

@Component({
  selector: 'app-mino-right-arm-3',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-right-arm-3.component.html',
  styleUrl: './mino-right-arm-3.component.scss'
})
export class MinoRightArm3Component extends BaseComponent {
  override x: number = 75;
  override y: number = 310;
  bodyColor = "#724035";
  color1 = "#b0af9b";
  color2 = "#8e7c75"; // hoof color

  getProperties(){
    return ['bodyColor', 'color1', 'color2']
  }
}


