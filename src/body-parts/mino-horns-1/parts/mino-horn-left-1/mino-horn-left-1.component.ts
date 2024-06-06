import {Component, Input} from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import {BaseComponent} from "../../../../base-component.directive";
import {RenderComponent} from "../../../../render/render.component";

@Component({
  selector: 'app-mino-horn-left-1',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule,
    RenderComponent
  ],
  templateUrl: './mino-horn-left-1.component.html',
  styleUrl: './mino-horn-left-1.component.scss'
})
export class MinoHornLeft1Component extends BaseComponent {
  color1 = "#47433c";
  override x: number = -20;
  override y: number = -10;

  getProperties(){
    return ['color1']
  }
}


