import {Component} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../../../base-component.directive";
import {RenderComponent} from "../../../../render/render.component";

@Component({
  selector: 'app-mino-left-arm-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-left-arm-1.component.html',
  styleUrl: './mino-left-arm-1.component.scss'
})
export class MinoLeftArm1Component extends BaseComponent {
  override x: number = 240;
  override y: number = 315;
  bodyColor = "#724035";

  getProperties(){
    return ['bodyColor']
  }
}


