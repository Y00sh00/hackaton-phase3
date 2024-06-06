import {Component, Input} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf} from "@angular/common";
import {BaseComponent} from "../../../../base-component.directive";
import {RenderComponent} from "../../../../render/render.component";

@Component({
  selector: 'app-mino-horn-right-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-horn-right-1.component.html',
  styleUrl: './mino-horn-right-1.component.scss'
})
export class MinoHornRight1Component extends BaseComponent {
  color1 = "#47433c";
  override x: number = 200;
  override y: number = -10;

  getProperties(){
    return ['color1']
  }
}


