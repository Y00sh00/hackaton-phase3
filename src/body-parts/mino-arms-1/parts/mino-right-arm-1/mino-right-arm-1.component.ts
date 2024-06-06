import {Component} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../../../base-component.directive";
import {RenderComponent} from "../../../../render/render.component";

@Component({
  selector: 'app-mino-right-arm-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-right-arm-1.component.html',
  styleUrl: './mino-right-arm-1.component.scss'
})
export class MinoRightArm1Component extends BaseComponent {
  override x: number = 75;
  override y: number = 310;
  bodyColor = "#724035";

  getProperties(){
    return ['bodyColor']
  }
}


