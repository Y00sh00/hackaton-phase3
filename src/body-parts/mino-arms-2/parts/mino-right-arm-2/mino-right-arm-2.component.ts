import {Component} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {BaseComponent} from "../../../../base-component.directive";
import {RenderComponent} from "../../../../render/render.component";

@Component({
  selector: 'app-mino-right-arm-2',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-right-arm-2.component.html',
  styleUrl: './mino-right-arm-2.component.scss'
})
export class MinoRightArm2Component extends BaseComponent {
  override x: number = 75;
  override y: number = 310;
  bodyColor = "#724035";
  color1 = "#b0af9b";

  getProperties(){
    return ['bodyColor', 'color1']
  }
}


